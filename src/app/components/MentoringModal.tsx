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

  // ESC zavření
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // HARD LOCK – na <html> + vrácení pozice
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (!open) return;

    scrollYRef.current =
      window.scrollY || document.documentElement.scrollTop || 0;

    html.classList.add("modal-open");
    body.classList.add("modal-open");
    html.style.setProperty("--lock-top", `-${scrollYRef.current}px`);

    return () => {
      html.classList.remove("modal-open");
      body.classList.remove("modal-open");
      html.style.removeProperty("--lock-top");
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop – zabije gesta + klik ven zavře */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] modal-backdrop"
        aria-hidden
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* modal wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl modal-content"
        >
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
