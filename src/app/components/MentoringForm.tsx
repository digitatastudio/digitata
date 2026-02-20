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
        setErrorMsg(body?.error || `Odeslání selhalo.`);
        return;
      }

      setStatus("ok");
      setTimeout(() => onClose(), 1500);
    } catch {
      setStatus("error");
      setErrorMsg("Chyba spojení.");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-2xl">
      {/* Designový prvek: Horní barevný gradient bar */}
      <div className="h-2 w-full bg-gradient-to-r from-[#002D62] via-[#003B88] to-[#002D62]" />
      
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Digitáta Mentoring
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Udělej první krok ke svému digitálnímu posunu.
          </p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <input 
              name="name" 
              placeholder="Jméno a příjmení" 
              required 
              className="w-full rounded-xl border border-slate-200 p-3.5 focus:border-[#002D62] focus:ring-2 focus:ring-[#002D62]/10 outline-none transition-all" 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="E-mailová adresa" 
              required 
              className="w-full rounded-xl border border-slate-200 p-3.5 focus:border-[#002D62] focus:ring-2 focus:ring-[#002D62]/10 outline-none transition-all" 
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input 
                name="age" 
                type="number" 
                placeholder="Věk (volitelné)" 
                className="w-full rounded-xl border border-slate-200 p-3.5 focus:border-[#002D62] focus:ring-2 focus:ring-[#002D62]/10 outline-none transition-all" 
              />
              <select 
                name="format" 
                className="w-full rounded-xl border border-slate-200 p-3.5 bg-white focus:border-[#002D62] focus:ring-2 focus:ring-[#002D62]/10 outline-none transition-all"
              >
                <option value="online">1:1 Online</option>
                <option value="chat">Chat / Zprávy</option>
                <option value="osobne">Osobně</option>
              </select>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-1">
              <textarea 
                name="goal" 
                placeholder="Co tě teď nejvíc trápí nebo co bys chtěl změnit?" 
                required 
                rows={4} 
                className="w-full bg-transparent p-3 outline-none resize-none text-slate-700 placeholder:text-slate-400" 
              />
            </div>
          </div>

          {status === "error" && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}
          
          {status === "ok" && (
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm font-bold border border-emerald-100 text-center animate-pulse">
              ✓ Úspěšně odesláno! Ozvu se ti.
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-[#002D62] text-white py-4 font-bold shadow-lg shadow-[#002D62]/20 hover:bg-[#003B88] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              {status === "sending" ? "Odesílám tvou žádost..." : "Odeslat přihlášku"}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
            >
              Zrušit a zavřít
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}