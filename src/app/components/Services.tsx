"use client";

import React, { useState } from "react";
import MentoringModal from "@/app/components/MentoringModal";
import MentoringForm from "@/app/components/MentoringForm";

export default function Services() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    console.log("[Services] Mentoring click"); // sanity log
    setOpen(true);
  }

  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="max-w-xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold" style={{ color: "#002D62" }}>
          Jak ti pomůžu
        </h2>

        <button
          type="button"
          onClick={handleClick}
          className="rounded-2xl bg-[#002D62] text-white px-6 py-4 font-semibold hover:bg-[#003B88]"
        >
          Otevřít Mentoring formulář
        </button>
      </div>

      <MentoringModal open={open} onClose={() => setOpen(false)}>
        <MentoringForm onSuccess={() => setOpen(false)} />
      </MentoringModal>
    </section>
  );
}
