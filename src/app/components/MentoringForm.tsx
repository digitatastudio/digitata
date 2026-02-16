"use client";

import { useState } from "react";

type MentoringFormProps = {
  onClose?: () => void;
};

export default function MentoringForm({ onClose }: MentoringFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
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

      const body = await res.json().catch(() => null);

      if (!res.ok || !body?.ok) {
        setStatus("error");
        setErrorMsg(body?.error || "Něco se pokazilo při odesílání.");
        return;
      }

      setStatus("ok");
      form.reset();

      if (onClose) {
        setTimeout(() => onClose(), 1200);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Server spadl na hubu. Zkus to prosím znovu.");
    }
  }

  return (
    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,.08)] max-h-[80vh] overflow-y-auto">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl leading-none text-gray-400 hover:text-gray-700"
          aria-label="Zavřít formulář"
        >
          ×
        </button>
      )}

      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
        Přihláška na mentoring DIGITÁTA
      </h2>

      <p className="text-gray-700 mb-6 text-center">
        Pár otázek, abych pochopil, kde teď jsi. Odpovídej v klidu a upřímně.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Jméno
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div>
          <label htmlFor="age" className="block font-semibold mb-1">
            Věk <span className="text-gray-400 text-sm">(volitelné)</span>
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={10}
            max={120}
            className="w-40 rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div>
          <label htmlFor="goal" className="block font-semibold mb-1">
            Co teď nejvíc řešíš?
          </label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div>
          <label htmlFor="format" className="block font-semibold mb-1">
            Formát
          </label>
          <select
            id="format"
            name="format"
            defaultValue="online"
            className="w-full rounded-lg border border-gray-300 px-4 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          >
            <option value="online">1:1 online (video/call)</option>
            <option value="osobne">1:1 osobně</option>
            <option value="mix">Kombinace</option>
            <option value="domluva">Domluvíme se</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full rounded-2xl bg-[#002D62] text-white px-5 py-3 font-semibold ${
            status === "sending" ? "opacity-80 cursor-wait" : "hover:bg-[#003B88]"
          }`}
        >
          {status === "sending" ? "Odesílám…" : "Chci začít s mentoringem"}
        </button>

        {status === "ok" && (
          <p className="text-green-600 font-semibold">
            Díky! Ozvu se ti co nejdřív na e-mail.
          </p>
        )}
        {status === "error" && <p className="text-red-600">{errorMsg}</p>}
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Nebo napiš rovnou na{" "}
        <a className="font-semibold" href="mailto:info@digitatastudio.cz">
          info@digitatastudio.cz
        </a>
        .
      </p>
    </div>
  );
}
