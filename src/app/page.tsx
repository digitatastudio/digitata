"use client";

import { useState } from "react";

// Importy všech potřebných sekcí
import Hero from "./components/Hero";
import About from "./components/About";     // Tato sekce chyběla
import Services from "./components/Services";
import Books from "./components/Books";       // Tato sekce byla 2x, teď je 1x
import Ebook from "./components/Ebook";
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pomocné funkce pro ovládání modálu
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      {/* 1. Úvodní sekce */}
      <Hero />

      {/* 2. Sekce O mně */}
      <About />

      {/* 3. Služby */}
      <Services />

      {/* 4. Knihy a E-booky (v Ebook.tsx máš nadpis "Moje knihy & e-booky") */}
      <Ebook />

      {/* --- MODÁLNÍ OKNO A FORMULÁŘ --- */}
      <MentoringModal 
        open={isModalOpen} 
        onClose={closeModal} 
      />

      {/* Samotný formulář, který se zobrazí při otevření modálu */}
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