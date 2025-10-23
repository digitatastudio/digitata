"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  useEffect(() => {
    if (open) {
      // ✅ Zamknutí pozadí
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // ✅ Obnovení při zavření
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-[#002D62] rounded-2xl shadow-2xl w-[92%] max-w-lg h-[80vh] overflow-y-scroll"
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

        {/* Tělo formuláře */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
