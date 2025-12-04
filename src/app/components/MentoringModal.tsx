"use client";

import { useState } from "react";
import MentoringForm from "../components/MentoringForm";

export default function MentoringSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Chci mentoring
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)} // klik mimo formulář zavře
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()} // klik dovnitř NEzavírá
          >
            <MentoringForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
