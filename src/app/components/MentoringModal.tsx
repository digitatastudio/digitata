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
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // FULL scroll lock + iOS touch fix
  useEffect(() => {
    if (!open) return;

    // 1) lock html+body on exact scroll
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    scrollYRef.current = y;
    document.body.style.setProperty("--scroll-y", `-${y}px`);
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    // 2) prevent touch scroll on background (must be non-passive)
    const stopTouch = (e: TouchEvent) => {
      const box = boxRef.current;
      if (!box) {
        e.preventDefault();
        return;
      }
      // když dotyk není uvnitř scrollovatelného boxu => blokuj
      if (!box.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }
    };
    document.addEventListener("touchmove", stopTouch, { passive: false });

    // 3) prevent wheel scroll na overlay (desktop)
    const stopWheel = (e: WheelEvent) => {
      const box = boxRef.current;
      if (!box || !box.contains(e.target as Node)) e.preventDefault();
    };
    document.addEventListener("wheel", stopWheel, { passive: false });

    // cleanup
    return () => {
      document.removeEventListener("touchmove", stopTouch as any);
      document.removeEventListener("wheel", stopWheel as any);
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("--scroll-y");
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* overlay – klik mimo zavře + blokuje interakce */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      />
      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={boxRef}
          role="dialog"
          aria-modal="true"
          className="w-full max-w-lg bg-white text-[#002D62] rounded-2xl shadow-2xl modal-scroll"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
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