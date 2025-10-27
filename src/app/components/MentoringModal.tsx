"use client";

import { useEffect, useRef } from "react";

export default function MentoringModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const scrollYRef = useRef(0);

  // Zavření na ESC
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // Lock scrollu na pozadí (Android + iOS)
  useEffect(() => {
    if (!open) return;
    const body = document.body;

    scrollYRef.current =
      window.scrollY || document.documentElement.scrollTop || 0;

    // iOS-friendly lock
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay blokuje gesta a klik mimo zavře */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] touch-none"
        aria-hidden
        onClick={onClose}
      />

      {/* Kontejner modalu */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="
            w-full max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl
            max-h-[90vh] overflow-y-auto overscroll-contain
          "
        >
          {/* Sticky header, aby byl křížek vždy po ruce */}
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

          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
