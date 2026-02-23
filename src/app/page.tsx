"use client";

import { useState } from "react";

// Importy sekcí
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";       // Tuhle necháváme
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      
      {/* Sekce s knihami místo Ebooků */}
      <Books />

      {/* Modál a formulář */}
      <MentoringModal 
        open={isModalOpen} 
        onClose={closeModal} 
      />

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