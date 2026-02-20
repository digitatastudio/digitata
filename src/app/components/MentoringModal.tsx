"use client";

import { useEffect, useState, useCallback } from "react";
import MentoringForm from "./MentoringForm";

export default function MentoringModal() {
  const [open, setOpen] = useState(false);

  // Stabilní funkce pro otevírání a zavírání
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  // ESC klávesa a zamknutí scrollování pozadí
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
      {/* Trigger tlačítko - opravené bez duplicitních tříd */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-2xl bg-[#002D62] px-8 py-4 text-white font-bold transition-all hover:scale-105 active:scale-95 hover:bg-[#003B88] shadow-lg"
        >
          Chci začít s mentoringem
        </button>
      </div>

      {/* Modal Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // Zavře modal při kliknutí mimo bílý panel
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-xl">
            {/* Bílý panel modalu */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.35)]">
              
              {/* Header s křížkem */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Mentoring</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition-colors hover:bg-red-50"
                  aria-label="Zavřít"
                >
                  <span className="text-2xl leading-none text-slate-400 group-hover:text-red-500">×</span>
                </button>
              </div>

              {/* Scroll vnitřek formuláře */}
              <div
                className="overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:px-10"
                style={{
                  maxHeight: "min(85dvh, 750px)",
                  WebkitOverflowScrolling: "touch",
                }}
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