"use client";

import { useEffect, useState } from "react";
import MentoringForm from "./MentoringForm";

export default function MentoringModal() {
  const [open, setOpen] = useState(false);

  // ESC zavře modal
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // zamknout scroll když je otevřeno
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Chci mentoring
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)} // klik mimo zavře
        >
          <div
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()} // klik dovnitř nezavře
          >
            <MentoringForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
