"use client";

import { useState } from "react";

export default function MentoringForm() {
  const [name, setName] = useState("");

  return (
    <form className="space-y-4">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Jméno"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded px-4 py-2 bg-[#002D62] text-white font-semibold"
      >
        Odeslat
      </button>
    </form>
  );
}
