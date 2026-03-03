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
    const formData = new FormData(form); // Modernější a spolehlivější způsob

    const data = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      age: formData.get("age")?.toString().trim() || null,
      format: formData.get("format")?.toString(),
      goal: formData.get("goal")?.toString().trim(),
    };

    try {
      // DŮLEŽITÉ: Kontrola, zda URL odpovídá tvé route.ts
      const res = await fetch("/api/mentoring", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok || !body?.ok) {
        throw new Error(body?.error || `Chyba ${res.status}`);
      }

      setStatus("ok");
      form.reset();
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Problém s připojením. Zkus to za chvíli.");
    }
  }

  return (
    /* DŮLEŽITÉ PRO SCROLLOVÁNÍ: 
       Přidáváme 'touch-pan-y' pro Safari a 'relative' s vysokým z-indexem.
       Zároveň odstraňujeme bg-white, protože ten už je v page.tsx.
    */
    <div className="w-full touch-pan-y relative z-[10001] pb-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-[#002D62]">
        Přihláška na mentoring
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
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:ring-2 focus:ring-[#002D62] outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:ring-2 focus:ring-[#002D62] outline-none"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-full sm:w-auto">
            <label className="block font-semibold mb-1" htmlFor="age">Věk</label>
            <input
              id="age"
              name="age"
              type="number"
              className="w-full sm:w-32 rounded-lg border border-gray-300 px-4 h-12 outline-none"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block font-semibold mb-1" htmlFor="format">Formát</label>
            <select
              id="format"
              name="format"
              className="w-full rounded-lg border border-gray-300 px-4 h-12 bg-white outline-none"
            >
              <option value="online">1:1 online</option>
              <option value="chat">Chat / zprávy</option>
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
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#002D62]"
          />
        </div>

        {status === "error" && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {errorMsg}
          </div>
        )}

        {status === "ok" && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 font-semibold text-center">
            Díky. Ozvu se ti.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending" || status === "ok"}
          className={`w-full rounded-xl bg-[#002D62] text-white h-14 font-bold text-lg transition-all ${
            status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:bg-[#003B88] active:scale-[0.98]"
          }`}
        >
          {status === "sending" ? "Odesílám..." : "Odeslat přihlášku"}
        </button>

        <p className="text-xs text-gray-400 text-center uppercase tracking-wider">
          nebo rovnou na: info@digitatastudio.cz
        </p>
      </form>
    </div>
  );
}