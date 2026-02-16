"use client";

import { useState } from "react";
import MentoringModal from "./MentoringModal";

export default function MentoringCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-[#002D62] px-6 py-3 font-semibold text-white hover:bg-[#003B88]"
      >
        Chci začít s mentoringem
      </button>

      <MentoringModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
