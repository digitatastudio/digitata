"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";
import Contact from "./components/Contact";
import MentoringModal from "./components/MentoringModal";
import MentoringCTA from "./components/MentoringCTA";
<MentoringCTA />

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Hero />

      <main>
        <About />
        <Services />

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#002D62] text-white px-6 py-3 rounded-xl"
          >
            Chci mentoring
          </button>
        </div>

        <Books />
        <Contact />
      </main>

      <MentoringModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
