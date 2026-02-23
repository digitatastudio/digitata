"use client";

import { useState } from "react";

// Importy všech sekcí webu
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";
import Contact from "./components/Contact"; // Nový import
import CookieConsent from "./components/CookieConsent"; // Nový import
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      {/* Hlavní obsah stránky */}
      <Hero />
      <About />
      <Services />
      <Books />
      <Contact />

      {/* Komponenta pro cookies (zobrazí se jako lišta) */}
      <CookieConsent />

      {/* --- MODÁLNÍ OKNO PRO MENTORING --- */}
      <MentoringModal 
        open={isModalOpen} 
        onClose={closeModal} 
      />

      {/* Formulář v modálu (zobrazí se při stavu isModalOpen) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
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