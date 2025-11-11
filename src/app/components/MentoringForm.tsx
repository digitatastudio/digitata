// src/app/components/MentoringForm.tsx
"use client";

import React, { useRef, useState } from "react";

type MentoringFormProps = {
  onSuccess?: () => void;
};

export default function MentoringForm({ onSuccess }: MentoringFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value.trim(),
      age: (form.elements.namedItem("age") as HTMLInputElement)?.value.trim(),
      goal: (form.elements.namedItem("goal") as HTMLTextAreaElement)?.value.trim(),
      format: (form.elements.namedItem("format") as HTMLSelectElement)?.value,
    };

    // validace
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (!emailOk) {
      setStatus("error");
      setErrorMsg("Zadej platný e-mail.");
      firstInputRef.current?.focus();
      return;
    }
    if (!data.name || data.name.length < 2) {
      setStatus("error");
      setErrorMsg("Zadej své jméno.");
      firstInputRef.current?.focus();
      return;
    }
    if (!data.goal || data.goal.length < 10) {
      setStatus("error");
      setErrorMsg("Napiš prosím pár vět o tom, co řešíš.");
      return;
    }

    try {
      const res = await fetch("/api/mentoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let msg = "Chyba serveru";
        try {
          const j = await res.json();
          msg = j?.error || msg;
        } catch {
          msg = await res.text();
        }
        throw new Error(msg);
      }

      setStatus("ok");
      form.reset();

      // případná success logika
      setTimeout(() => onSuccess?.(), 400);
    } catch (err: unknown) {
      let msg = "Něco se pokazilo. Zkus to prosím znovu.";
      if (err instanceof Error) msg = err.message;
      else if (typeof err === "string") msg = err;
      setStatus("error");
      setErrorMsg(msg);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">Jméno a příjmení</label>
        <input
          id="name"
          name="name"
          ref={firstInputRef}
          type="text"
          required
          className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          placeholder="Jan Novák"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          placeholder="jan@example.com"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="age" className="block font-semibold mb-1">
            Věk <span className="text-gray-400">(volitelné)</span>
          </label>
          <input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            min={10}
            className="w-full rounded-lg border border-gray-300 px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
            placeholder="35"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="format" className="block font-semibold mb-1">Preferovaný formát</label>
          <select
            id="format"
            name="format"
            defaultValue="1:1 online"
            className="w-full rounded-lg border border-gray-300 px-4 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          >
            <option>1:1 online</option>
            <option>1:1 osobně</option>
            <option>kombinace</option>
            <option>je mi to jedno</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="goal" className="block font-semibold mb-1">Co řešíš / kam se chceš posunout?</label>
        <textarea
          id="goal"
          name="goal"
          required
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          placeholder="Krátce popiš situaci, ať vím, kde začít…"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending" ? "true" : "false"}
          className={`rounded-2xl bg-[#002D62] text-white px-5 py-3 font-semibold ${
            status === "sending" ? "opacity-80 cursor-wait" : "hover:bg-[#003B88]"`
          }`}
        >
          {status === "sending" ? "Odesílám…" : "Chci začít s mentoringem"}
        </button>
      </div>

      {status === "ok" && (
        <p className="text-green-600 font-semibold">
          Díky! Ozvu se co nejdřív na e-mail.
        </p>
      )}
      {status === "error" && <p className="text-red-600">{errorMsg}</p>}
    </form>
  );
}