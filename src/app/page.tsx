"use client";

import { useState, useEffect } from "react"; // 1. Přidán useEffect

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

  // 2. Logika pro zamknutí scrollování pozadí
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup funkce při odpojení komponenty
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
        /* 3. Úprava obalu modálu: items-start pro mobily + overflow-y-auto */
        <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-black/60 p-0 md:p-4 overflow-y-auto">
          
          {/* 4. Úprava kontejneru: margin nahoře na mobilu + zaoblení jen horních rohů na mobilu */}
          <div className="bg-white p-6 pt-14 rounded-t-3xl md:rounded-2xl max-w-md w-full relative shadow-2xl mt-10 md:mt-0 mb-10">
            
            {/* 5. Vylepšené zavírací tlačítko (větší plocha pro palec) */}
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl p-2 transition-colors"
              aria-label="Zavřít"
            >
              ✕
            </button>

            <MentoringForm onClose={closeModal} />
          </div>
        </div>
      )}
    </main>
  );
}