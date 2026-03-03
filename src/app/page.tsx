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

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }
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

      <MentoringModal open={isModalOpen} onClose={closeModal} />

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">
          {/* KONTEJNER MODÁLU - Na mobilu na celou obrazovku, na PC jako okno */}
          <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-md md:rounded-[2rem] relative flex flex-col shadow-2xl">
            
            {/* FIXNÍ TLAČÍTKO ZAVŘÍT - Vždy viditelné v pravém rohu */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] bg-slate-100 p-3 rounded-full text-black hover:bg-slate-200 transition-all shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* SCROLLOVACÍ OBLAST FORMULÁŘE */}
            <div className="flex-1 overflow-y-auto custom-form-scroll px-6 py-20 md:py-12">
              <div className="max-w-sm mx-auto">
                <MentoringForm onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}