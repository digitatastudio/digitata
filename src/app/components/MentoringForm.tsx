"use client";

import { useState } from "react";

export default function MentoringForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      age: (form.elements.namedItem("age") as HTMLInputElement).value,
      goal: (form.elements.namedItem("goal") as HTMLTextAreaElement).value,
      format: (form.elements.namedItem("format") as HTMLSelectElement).value,
    };

       try {
      const res = await fetch("/api/mentoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let msg = "Server error";
        try {
          const j = await res.json();
          msg = (j as { error?: string })?.error || msg;
        } catch {
          msg = await res.text();
        }
        throw new Error(msg);
      }

      setStatus("ok");
      form.reset();
    } catch (err: unknown) {                    // ← žádné any
      const msg = err instanceof Error ? err.message : "Něco se pokazilo. Zkus to prosím znovu.";
      setStatus("error");
      setErrorMsg(msg);
    }
  }

  return (
    <section id="mentoring" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-3">
            Přihláška na mentoring
          </h2>
          <p className="text-gray-700 mb-8">
            Vyplň krátký formulář – ozvu se a domluvíme si první krok. 👍
          </p>

          <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,.08)] space-y-6">
            {/* Jméno */}
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">Jméno a příjmení</label>
              <input id="name" name="name" type="text" required
                className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="Jan Novák" />
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">E-mail</label>
              <input id="email" name="email" type="email" required
                className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="jan@example.com" />
            </div>

            {/* Věk (volitelné) */}
            <div>
              <label htmlFor="age" className="block font-semibold mb-1">Věk <span className="text-gray-400">(volitelné)</span></label>
              <input id="age" name="age" type="number" min={10}
                className="w-40 rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="35" />
            </div>

            {/* Cíl / problém */}
            <div>
              <label htmlFor="goal" className="block font-semibold mb-1">Co řešíš / kam se chceš posunout?</label>
              <textarea id="goal" name="goal" required rows={5}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="Krátce popiš situaci, ať vím, kde začít…" />
            </div>

            {/* Formát mentoringu */}
            <div>
              <label htmlFor="format" className="block font-semibold mb-1">Preferovaný formát</label>
              <select id="format" name="format" defaultValue="1:1 online"
                className="w-full rounded-lg border border-gray-300 px-4 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]">
                <option>1:1 online</option>
                <option>1:1 osobně</option>
                <option>kombinace</option>
                <option>je mi to jedno</option>
              </select>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button type="submit" disabled={status === "sending"}
                className={`inline-flex items-center justify-center rounded-2xl bg-[#002D62] text-white px-5 py-3 font-semibold ${status === "sending" ? "opacity-80 cursor-wait" : "hover:bg-[#003B88]"}`}
                aria-busy={status === "sending" ? "true" : "false"}>
                {status === "sending" ? "Odesílám…" : "Chci začít s mentoringem"}
              </button>
            </div>

            {/* Stavy */}
            {status === "ok" && (
              <p className="text-green-600 font-semibold">Díky! Ozvu se co nejdřív na e-mail.</p>
            )}
            {status === "error" && (
              <p className="text-red-600">{errorMsg}</p>
            )}
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Nechceš vyplňovat formulář? Napiš mi na{" "}
            <a className="link-brand font-semibold" href="mailto:info@digitatastudio.cz">info@digitatastudio.cz</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
