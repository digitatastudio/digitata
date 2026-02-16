"use client";

import { useEffect, useState } from "react";
import MentoringForm from "./MentoringForm";

export default function MentoringModal() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={onOpen}
        className="rounded-2xl bg-[#002D62] text-white px-6 py-3 font-semibold hover:bg-[#003B88]"
      >
        Chci začít s mentoringem
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mentoring formulář"
          onClick={onClose} // klik mimo panel zavře
        >
          <div className="mx-auto flex min-h-full max-w-xl items-start justify-center sm:items-center">
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,.35)]"
              style={{ maxHeight: "calc(100dvh - 2rem)" }} // mobile safe
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
                className="overflow-y-auto p-5 sm:p-6"
                style={{ WebkitOverflowScrolling: "touch" }}
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
