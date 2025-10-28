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

  // ✅ Lock scrollu na pozadí
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    scrollYRef.current =
      window.scrollY || document.documentElement.scrollTop || 0;

    // Uzamkne body, ale zachová pozici
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.touchAction = "none"; // ✅ blokuje posouvání na mobilech

    return () => {
      // Reset
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.touchAction = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ overscrollBehavior: "none" }} // ✅ zabraňuje "poskočení" na iOS
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-lg p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full rounded-2xl bg-white text-[#002D62] shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Sticky header */}
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

          {/* Scrollovací část */}
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}