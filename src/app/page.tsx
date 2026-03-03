"use client";

import { useState, useEffect } from "react";

// Importy všech sekcí webu
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

  // --- ZÁMEK POZADÍ (Safari friendly verze) ---
  useEffect(() => {
    if (isModalOpen) {
      // Zapamatujeme si pozici scrollu, aby web neposkočil nahoru
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "hidden";
    } else {
      // Vrátíme web do normálu a odrolujeme zpět
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <main className="min-h-screen">
      {/* 1. Obsah webu */}
      <Hero />
      <About />
      <Services />
      <Books />
      <Contact />

      {/* 2. Fixní prvky */}
      <CookieConsent />

      <MentoringModal 
        open={isModalOpen} 
        onClose={closeModal} 
      />

      {/* 3. MODÁL S FORMULÁŘEM - Opravené scrollování */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          
          {/* Bílý box modálu */}
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative flex flex-col"
            style={{ maxHeight: '90vh' }} 
          >
            {/* Horní fixní lišta se zavíracím křížkem */}
            <div className="flex justify-end p-4 absolute top-0 right-0 z-[110]">
              <button 
                onClick={closeModal}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full p-3 transition-colors shadow-sm"
                aria-label="Zavřít"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* VNITŘNÍ SCROLLOVACÍ ČÁST FORMULÁŘE */}
            <div className="overflow-y-auto p-6 pt-16 scrollbar-hide">
              <MentoringForm onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}