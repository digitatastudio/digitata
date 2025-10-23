"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MentoringModal({ open, onClose, children }: Props) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      const scrollY = window.scrollY;

      html.classList.add("modal-lock");
      body.classList.add("modal-lock");

      // držíme přesnou pozici (jinak to poskočí)
      body.style.top = `-${scrollY}px`;
      body.dataset.scrollY = String(scrollY);
    } else {
      // odemknout a vrátit pozici
      const prev = body.dataset.scrollY ? parseInt(body.dataset.scrollY, 10) : 0;

      html.classList.remove("modal-lock");
      body.classList.remove("modal-lock");

      body.style.top = "";
      delete body.dataset.scrollY;

      window.scrollTo(0, prev);
    }

    return () => {
      html.classList.remove("modal-lock");
      body.classList.remove("modal-lock");
      body.style.top = "";
      delete body.dataset.scrollY;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
      // gestům mimo modal řekneme “ne”
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      onClick={onClose}
    >
      <div
        className="relative w-[92%] max-w-lg bg-white text-[#002D62] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* sticky hlavička */}
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

        {/* scrolluje jen obsah modalu */}
        <div className="modal-scroll px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
