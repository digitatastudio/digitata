"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Books from "./components/Books";
import Ebook from "./components/Ebook";
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Books />
      <Ebook />

      {/* Modál a formulář pro mentoring */}
      <MentoringModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-2xl"
            >
              ×
            </button>
            <MentoringForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}