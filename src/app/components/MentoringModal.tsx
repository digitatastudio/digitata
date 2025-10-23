"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // ESC k zavření
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // LOCK scrollu pozadí (funguje i na iOS)
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollY}px`;

    // Zamez posouvání pozadí přes overlay na touch zařízeních
    const overlay = document.getElementById("modal-overlay");
    const stopTouch = (e: TouchEvent) => e.preventDefault();
    overlay?.addEventListener("touchmove", stopTouch, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      overlay?.removeEventListener("touchmove", stopTouch);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* overlay + zavírání klikem mimo */}
      <div
        id="modal-overlay"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* modal wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* samotný panel – vlastní scroll, pozadí zamknuté */}
        <div
          ref={panelRef}
          className="w-full max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain touch-pan-y"
          onClick={(e) => e.stopPropagation()} // ať klik uvnitř nezavírá
        >
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold">Žádost o mentoring 1:1</h2>
            <button
              onClick={onClose}
              aria-label="Zavřít"
              className="p-2 rounded-lg hover:bg-black/5"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
