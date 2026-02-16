"use client";

import { useEffect, useState } from "react";
import MentoringForm from "./MentoringForm";

export default function MentoringModal() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  // ESC zavře + zamknout body scroll
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
  }, [open]);

  return (
    <>
      {/* Trigger tlačítko */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-2xl bg-[#002D62] px-6 py-3 text-white font-semibold hover:bg-[#003B88]"
        >
          Chci začít s mentoringem
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Mentoring formulář"
          onClick={(e) => {
            // zavře jen když klikneš na backdrop (mimo panel)
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-xl">
            {/* Panel */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.35)]">
              {/* Header s X */}
              <div className="flex items-center justify-end border-b border-slate-100 px-3 py-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-slate-100 px-3 py-1 text-2xl leading-none hover:bg-slate-200"
                  aria-label="Zavřít"
                >
                  ×
                </button>
              </div>

              {/* Scroll uvnitř (mobile safe) */}
              <div
                className="overflow-y-auto overscroll-contain px-5 pb-6 pt-4 sm:px-6"
                style={{
                  maxHeight: "min(85dvh, 720px)",
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
