"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  // ESC na klávesnici
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white text-[#002D62] rounded-2xl shadow-2xl w-[90%] max-w-lg max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#002D62]/40 scrollbar-track-gray-200"
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
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
