"use client";

import { useState } from "react"; // 1. Musíme importovat useState
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm"; // 2. Potřebujeme i ten formulář dovnitř

export default function HomePage() {
  // 3. Vytvoříme si stav pro otevření modálu
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-black tracking-tight text-[#002D62] md:text-6xl">
          DIGITÁTA STUDIO
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-slate-600 md:text-xl">
          Tvůj parťák pro digitální růst. Mentoring, který má hlavu a patu.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          {/* 4. Tlačítko, které modál skutečně otevře */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-[#002D62] text-white px-8 py-4 font-bold hover:bg-[#003B88] transition-all"
          >
            Chci mentoring
          </button>

          {/* 5. Opravené volání modálu se všemi povinnými props */}
          <MentoringModal 
            open={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
          >
            <MentoringForm onClose={() => setIsModalOpen(false)} />
          </MentoringModal>
        </div>
      </section>
    </main>
  );
}