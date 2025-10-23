"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  // Zavírání pomocí ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // ✅ zablokuje posun stránky
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="relative bg-white text-[#002D62] rounded-2xl shadow-2xl w-[90%] max-w-lg max-h-[80vh] overflow-y-scroll touch-pan-y"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hlavička */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 className="text-xl font-bold">Žádost o mentoring 1:1</h2>
          <button
            onClick={onClose}
            aria-label="Zavřít"
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Obsah */}
        <div className="px-6 py-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}
