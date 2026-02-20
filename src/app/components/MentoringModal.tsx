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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              
              {/* Header s křížkem pro snadné zavírání */}
              <div className="flex items-center justify-between border-b px-5 py-3 text-slate-400">
                <span className="text-xs font-bold uppercase tracking-widest">Mentoring</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>

              <div
                className="overflow-y-auto px-5 pb-8 pt-6 sm:px-10"
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