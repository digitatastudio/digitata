"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  // nic nevykresluj, když je zavřeno
  if (!open) return null;

  // ① Lock scrollu celé stránky (funguje i na iOS)
  useEffect(() => {
    const scrollY = window.scrollY || 0;

    const html = document.documentElement;
    const body = document.body;

    html.style.setProperty("--scroll-lock-top", `-${scrollY}px`);
    html.classList.add("modal-open");
    body.classList.add("modal-open");

    // ② Povolit scroll jen uvnitř elementu s [data-modal-scroll]
    const stopBackgroundTouch = (e: TouchEvent) => {
      const el = (e.target as HTMLElement)?.closest("[data-modal-scroll]");
      if (!el) e.preventDefault();
    };
    document.addEventListener("touchmove", stopBackgroundTouch, { passive: false });

    // ESC
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("touchmove", stopBackgroundTouch);

      html.classList.remove("modal-open");
      body.classList.remove("modal-open");
      html.style.removeProperty("--scroll-lock-top");
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  // ③ Samotný modál (portal do body)
  const overlayClick = () => onClose();
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentoring-modal-title"
      style={{ overscrollBehavior: "contain" }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={overlayClick} />

      {/* wrapper, který se může scrollovat */}
      <div
        className="relative z-10 w-full h-full overflow-y-auto"
        data-modal-scroll
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

          {/* vnitřek – vlastní scroll; svh řeší iOS 100vh problém */}
          <div className="px-6 py-5 max-h-[90svh] overflow-y-auto" data-modal-scroll>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
