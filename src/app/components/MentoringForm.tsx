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
    <div className="px-1">
      <h2 className="text-2xl font-extrabold mb-2 text-slate-900">Přihláška</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" placeholder="Jméno" required className="w-full rounded-xl border p-3" />
        <input name="email" type="email" placeholder="E-mail" required className="w-full rounded-xl border p-3" />
        
        <div className="grid grid-cols-2 gap-2">
          <input name="age" type="number" placeholder="Věk" className="rounded-xl border p-3" />
          <select name="format" className="rounded-xl border p-3 bg-white">
            <option value="online">1:1 Online</option>
            <option value="chat">Chat</option>
          </select>
        </div>

        <textarea name="goal" placeholder="Co řešíš?" required rows={3} className="w-full rounded-xl border p-3" />

        {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {status === "ok" && <p className="text-emerald-600 font-bold">Odesláno!</p>}

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-[#002D62] text-white py-3 font-bold hover:bg-[#003B88] disabled:opacity-50"
          >
            {status === "sending" ? "Odesílám..." : "Odeslat"}
          </button>
          
          {/* Tlačítko Zavřít pro mobilní uživatele */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-slate-500 text-sm font-medium hover:text-slate-800"
          >
            Zavřít okno
          </button>
        </div>
      </form>
    </div>
  );
}