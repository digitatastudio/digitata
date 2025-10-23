"use client";

import React, { useEffect, useRef } from "react";

type MentoringModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: MentoringModalProps) {
  const scrollYRef = useRef(0);

  // Zavírání na ESC
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // Lock scroll body (správně pro iOS)
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const body = document.body;

    // uložit původní hodnoty
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = (body.style as any).top;

    // fix + offset na aktuální scroll
    body.style.position = "fixed";
    (body.style as any).top = `-${scrollYRef.current}px`;
    body.style.overflow = "hidden";
    // šířka zůstane, aby neskákal layout (pokud by byl scrollbar)

    // iOS: blokace posunu „pozadí“ při touchmove
    const preventTouchMove = (e: TouchEvent) => {
      // necháme scrollovat jen v obsahu modálu
      const target = e.target as HTMLElement;
      const scrollable = target.closest("[data-modal-scroll]");
      if (!scrollable) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", preventTouchMove, { passive: false });

    return () => {
      // obnovit
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      (body.style as any).top = prevTop;
      // vrátit na správnou pozici
      window.scrollTo(0, scrollYRef.current);

      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, [open]);

  if (!open) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentoring-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        // zabrání proklikům a pasivnímu scrollu overlaye
        style={{ touchAction: "none" }}
      />

      {/* Scroll kontejner pro obsah modálu */}
      <div
        className="relative z-10 w-full h-full overflow-y-auto"
        data-modal-scroll // povolíme touch scroll jen tady
      >
        <div
          className="mx-auto my-8 w-[92%] max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl"
          onClick={stop}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 id="mentoring-modal-title" className="text-xl font-bold">
              Žádost o mentoring 1:1
            </h2>
            <button
              onClick={onClose}
              aria-label="Zavřít"
              className="p-2 rounded-lg hover:bg-black/5"
            >
              ✕
            </button>
          </div>

          {/* Vnitřek modálu – vlastní scroll s max výškou */}
          <div
            className="px-6 py-5 max-h-[80vh] overflow-y-auto"
            data-modal-scroll
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
