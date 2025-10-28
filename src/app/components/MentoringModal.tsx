"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  // Zavření na ESC
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // Tvrdý lock pozadí (funguje i na iOS)
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;

    savedScrollY.current =
      window.scrollY || document.documentElement.scrollTop || 0;

    html.classList.add("modal-open");
    body.classList.add("modal-open");
    // „připíchneme“ dokument v aktuální pozici
    (body.style as any).top = `-${savedScrollY.current}px`;

    // 1) Zamezíme scrollu mimo obsah modalu (touch + wheel)
    //    Povolit chceme jen eventy, které začínají uvnitř .modal-scroll
    const allowInside = (el: EventTarget | null) =>
      !!(el instanceof Node && contentRef.current?.contains(el));

    const preventScroll = (e: Event) => {
      if (!allowInside(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
    };

    // Pozor: musíme mít { passive: false }, jinak preventDefault na mobilech neprojde
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventScroll as any);
      document.removeEventListener("wheel", preventScroll as any);

      html.classList.remove("modal-open");
      body.classList.remove("modal-open");
      body.style.top = "";
      // Vrátíme uživatele tam, kde byl
      window.scrollTo(0, savedScrollY.current);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay (klik mimo zavírá) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-hidden
        onClick={onClose}
      />

      {/* Modal shell */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl"
        >
          {/* Sticky header a křížek */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white/95">
            <h2 className="text-xl font-bold">Žádost o mentoring 1:1</h2>
            <button
              onClick={onClose}
              aria-label="Zavřít"
              className="p-2 rounded-lg hover:bg-black/5"
            >
              ✕
            </button>
          </div>

          {/* !!! VLASTNÍ SCROLL UVNITŘ MODALU !!! */}
          <div ref={contentRef} className="modal-scroll px-6 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

