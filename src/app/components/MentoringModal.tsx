"use client";

import { useEffect, useState, useCallback } from "react";
import MentoringForm from "./MentoringForm";

export default function MentoringModal() {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-2xl bg-[#002D62] px-8 py-4 text-white font-bold transition-all hover:scale-105 hover:bg-[#003B88] shadow-lg active:scale-95"
        >
          Chci začít s mentoringem
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-xl animate-in zoom-in-95 duration-200">
            {/* Tlačítko křížku – umístěné v pravém horním rohu NAD panelem */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl font-light text-slate-900 shadow-xl hover:bg-slate-100 md:-right-12 md:top-0"
              aria-label="Zavřít"
            >
              ×
            </button>

            {/* Bílý panel modalu */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div
                className="overflow-y-auto px-6 pb-8 pt-10 sm:px-10"
                style={{ maxHeight: "min(85dvh, 750px)" }}
              >
                <MentoringForm onClose={onClose} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}