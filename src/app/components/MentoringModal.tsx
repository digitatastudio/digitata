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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
      onPointerDown={onClose} // klik/tap mimo zavře (mobil friendly)
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl"
        onPointerDown={(e) => e.stopPropagation()} // klik dovnitř nezavře
      >
        {/* Panel */}
        <div className="relative rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.25)]">
          {/* Header s křížkem (sticky) */}
          <div className="sticky top-0 z-20 flex items-center justify-end rounded-t-2xl bg-white/95 px-4 py-3 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none hover:bg-slate-200"
              aria-label="Zavřít"
            >
              ×
            </button>
          </div>

          {/* Obsah se scrollováním */}
          <div className="max-h-[85vh] overflow-y-auto px-5 pb-6 sm:px-6">
            <MentoringForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
