"use client";

import { useEffect, useRef } from "react";
import MentoringForm from "./MentoringForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MentoringModal({ open, onClose }: Props) {
  const downOnBackdrop = useRef(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock body scroll (ale necháme scroll uvnitř modalu)
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
      className="fixed inset-0 z-[9999] bg-black/60 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // zavírat jen když down začal na backdropu (ne uvnitř panelu)
        downOnBackdrop.current = e.target === e.currentTarget;
      }}
      onMouseUp={(e) => {
        if (downOnBackdrop.current && e.target === e.currentTarget) onClose();
        downOnBackdrop.current = false;
      }}
      onTouchStart={(e) => {
        downOnBackdrop.current = e.target === e.currentTarget;
      }}
      onTouchEnd={(e) => {
        if (downOnBackdrop.current && e.target === e.currentTarget) onClose();
        downOnBackdrop.current = false;
      }}
    >
      <div className="mx-auto flex min-h-full max-w-xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.35)]">
          {/* header */}
          <div className="sticky top-0 z-10 flex items-center justify-end bg-white/95 px-3 py-3 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none text-slate-800 hover:bg-slate-200"
              aria-label="Zavřít"
            >
              ×
            </button>
          </div>

          {/* scroll area */}
          <div
            className="max-h-[calc(100dvh-7rem)] overflow-y-auto px-5 pb-6 sm:px-6"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
            }}
          >
            <MentoringForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}