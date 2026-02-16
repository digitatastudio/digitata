"use client";

import { useEffect } from "react";
import MentoringForm from "./MentoringForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MentoringModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll stránky
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-3 sm:p-4"
      onPointerDown={onClose} // tap/klik mimo zavře (mobil friendly)
      role="dialog"
      aria-modal="true"
      aria-label="Mentoring formulář"
    >
      <div
        className="relative w-full max-w-xl"
        onPointerDown={(e) => e.stopPropagation()} // uvnitř nezavírat
      >
        {/* Panel */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.30)]">
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between bg-white/95 px-4 py-3 backdrop-blur">
            <div className="text-xs font-semibold text-slate-500">
              {/* debug: smaž až to bude ok */}
              MODAL ACTIVE
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none text-slate-800 hover:bg-slate-200"
              aria-label="Zavřít"
            >
              ×
            </button>
          </div>

          {/* Obsah (scroll uvnitř) */}
          <div className="max-h-[85vh] overflow-y-auto px-5 pb-6 sm:px-6">
            <MentoringForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
