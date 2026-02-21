"use client";

import { useState } from "react";

type Props = { onClose: () => void };

export default function MentoringForm({ onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      age: (form.elements.namedItem("age") as HTMLInputElement).value.trim(),
      format: (form.elements.namedItem("format") as HTMLSelectElement).value,
      goal: (form.elements.namedItem("goal") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/mentoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!res.ok || !body?.ok) {
        setStatus("error");
        setErrorMsg(body?.error || `Odeslání selhalo (HTTP ${res.status}).`);
        return;
      }

      setStatus("ok");
      form.reset();
      setTimeout(onClose, 900);
    } catch {
      setStatus("error");
      setErrorMsg("Síť/Server problém. Zkus to za chvíli.");
    }
  }

  return (
    <div className="bg-white">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
        Přihláška na mentoring DIGITÁTA
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Pár otázek, abych věděl, kde jsi. Upřímně a v klidu.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">Jméno</label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block font-semibold mb-1" htmlFor="age">
              Věk <span className="text-gray-400 text-sm">(volitelné)</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={10}
              max={120}
              inputMode="numeric"
              className="w-40 rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
            />
          </div>

          <div className="flex-1 min-w-[220px]">
            <label className="block font-semibold mb-1" htmlFor="format">Formát</label>
            <select
              id="format"
              name="format"
              defaultValue="online"
              className="w-full rounded-lg border border-gray-300 px-4 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
            >
              <option value="online">1:1 online (call/video)</option>
              <option value="chat">Chat / zprávy</option>
              <option value="mix">Kombinace</option>
              <option value="domluva">Domluvíme se</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="goal">Co teď nejvíc řešíš?</label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>

        {status === "error" && <p className="text-red-600">{errorMsg}</p>}
        {status === "ok" && <p className="text-emerald-600 font-semibold">Díky. Ozvu se ti.</p>}

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full rounded-2xl bg-[#002D62] text-white px-5 py-3 font-semibold ${
            status === "sending" ? "opacity-70 cursor-wait" : "hover:bg-[#003B88]"
          }`}
        >
          {status === "sending" ? "Odesílám…" : "Odeslat"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Nebo rovnou mail:{" "}
          <a className="font-semibold" href="mailto:info@digitatastudio.cz">
            info@digitatastudio.cz
          </a>
        </p>
      </form>
    </div>
  );
}