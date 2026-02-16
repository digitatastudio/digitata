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
      className="fixed inset-0 z-[999] bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="Mentoring formulář"
    >
      {/* BACKDROP: klik mimo zavře */}
      <button
        type="button"
        aria-label="Zavřít modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      {/* WRAP */}
      <div className="relative z-10 flex min-h-full items-center justify-center p-3 sm:p-4">
        {/* PANEL */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.30)]">
          {/* HEADER */}
          <div className="sticky top-0 z-20 flex items-center justify-end bg-white/95 px-4 py-3 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none text-slate-800 hover:bg-slate-200"
              aria-label="Zavřít"
            >
              ×
            </button>
          </div>

          {/* CONTENT (scroll inside) */}
          <div
            className="max-h-[85vh] overflow-y-auto px-5 pb-6 sm:px-6"
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
          >
            <MentoringForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
