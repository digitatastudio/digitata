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

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 p-3 sm:p-4"
      onClick={onClose} // klik na backdrop zavře
      role="dialog"
      aria-modal="true"
    >
      <div
        className="mx-auto flex min-h-full max-w-xl items-center justify-center"
        // nic
      >
        <div
          className="relative w-full rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.30)]"
          onClick={(e) => e.stopPropagation()} // klik do panelu nezavírá
        >
          {/* X */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none hover:bg-slate-200"
            aria-label="Zavřít"
          >
            ×
          </button>

          {/* Scroll uvnitř */}
          <div
            className="max-h-[85vh] overflow-y-auto p-5 sm:p-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <MentoringForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
