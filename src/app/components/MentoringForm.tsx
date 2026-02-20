"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function MentoringForm({ onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      age: formData.get("age")?.toString().trim(),
      format: formData.get("format")?.toString(),
      goal: formData.get("goal")?.toString().trim(),
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
        setErrorMsg(body?.error || `Odeslání selhalo (HTTP ${res.status}).`);
        return;
      }

      setStatus("ok");
      form.reset();

      // Po úspěchu zavřít modal po krátké prodlevě
      setTimeout(() => onClose(), 1500);
    } catch {
      setStatus("error");
      setErrorMsg("Problém se spojením. Zkontroluj internet a zkus to znovu.");
    }
  }

  if (status === "ok") {
    return (
      <div className="py-10 text-center animate-in fade-in zoom-in-95">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Odesláno!</h3>
        <p className="mt-2 text-slate-600">Díky za důvěru, brzy se ti ozvu.</p>
      </div>
    );
  }

  return (
    <div className="px-1">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
        Pojďme na to
      </h2>
      <p className="text-slate-500 mb-8 text-sm md:text-base">
        Napiš mi, co tě trápí nebo kam se chceš posunout.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="name">
            Jméno
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Tvoje jméno"
            className="w-full rounded-xl border border-slate-200 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tvuj@email.cz"
            className="w-full rounded-xl border border-slate-200 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62] transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="age">
              Věk <span className="font-normal text-slate-400">(volitelné)</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={10}
              max={120}
              className="w-full rounded-xl border border-slate-200 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="format">
              Formát
            </label>
            <select
              id="format"
              name="format"
              defaultValue="online"
              className="w-full rounded-xl border border-slate-200 px-4 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62] transition-all"
            >
              <option value="online">1:1 online</option>
              <option value="chat">Chat / zprávy</option>
              <option value="domluva">Uvidíme</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="goal">
            Co teď nejvíc řešíš?
          </label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={4}
            placeholder="Popiš mi stručně svoji situaci..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62] transition-all"
          />
        </div>

        {status === "error" && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full rounded-xl bg-[#002D62] text-white px-5 py-4 font-bold shadow-md transition-all ${
            status === "sending" ? "opacity-70 cursor-wait" : "hover:bg-[#003B88] hover:shadow-lg active:translate-y-0.5"
          }`}
        >
          {status === "sending" ? "Odesílám..." : "Odeslat přihlášku"}
        </button>
      </form>
    </div>
  );
}