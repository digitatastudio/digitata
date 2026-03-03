"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";
import Contact from "./components/Contact";
import CookieConsent from "./components/CookieConsent";
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Zámek scrollování pozadí
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Books />
      <Contact />
      <CookieConsent />

      <MentoringModal 
        open={isModalOpen} 
        onClose={closeModal} 
      />

      {isModalOpen && (
  /* Ztmavující podkres - na mobilu dáváme p-0, aby formulář využil celou šířku */
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-0 md:p-4">
    
    {/* Bílý box s formulářem */}
    <div className="bg-white p-6 rounded-2xl max-w-md w-full relative shadow-2xl 
                    max-h-[95vh] overflow-y-auto flex flex-col">
      
      {/* Zavírací tlačítko - zvětšeno pro lepší klikání palcem */}
      <button 
        onClick={closeModal} 
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl p-2 z-10"
      >
        ✕
      </button>

      {/* Samotný formulář */}
      <div className="mt-4">
        <MentoringForm onClose={closeModal} />
      </div>
    </div>
  </div>
)}
    </main>
  );
}