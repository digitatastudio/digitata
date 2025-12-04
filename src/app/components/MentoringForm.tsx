"use client";

import { useState } from "react";

type MentoringFormProps = {
  onClose: () => void;
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
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      age: (form.elements.namedItem("age") as HTMLInputElement)?.value,
      format: (form.elements.namedItem("format") as HTMLSelectElement)?.value,
      goal: (form.elements.namedItem("goal") as HTMLTextAreaElement)?.value,
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

      // po úspěchu formulář automaticky zavřeme s malým delayem
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Server spadl na hubu. Zkus to prosím za chvíli znovu.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-4"
    >
      {/* KŘÍŽEK VPRAVO NAHOŘE */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 text-xl leading-none opacity-70 hover:opacity-100"
        aria-label="Zavřít formulář"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold mb-2">Mentoring – první krok</h2>

      <label className="flex flex-col gap-1 text-sm">
        Jméno
        <input
          name="name"
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        E-mail
        <input
          type="email"
          name="email"
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Věk (nepovinné)
        <input
          type="number"
          name="age"
          min={10}
          max={120}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Formát mentoringu
        <select
          name="format"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          defaultValue=""
        >
          <option value="" disabled>
            Vyber formu…
          </option>
          <option value="online">Online (call / video)</option>
          <option value="chat">Chat / zprávy</option>
          <option value="kombinace">Kombinace</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Popiš, kde jsi a kam chceš dojít
        <textarea
          name="goal"
          required
          rows={4}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 resize-none"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      {status === "ok" && (
        <p className="text-sm text-emerald-600">
          Díky, zpráva dorazila. Ozvu se.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {status === "sending" ? "Odesílám…" : "Odeslat"}
      </button>
    </form>
  );
}
