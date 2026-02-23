"use client";

import { useState } from "react";
import MentoringModal from "./components/MentoringModal";
import MentoringForm from "./components/MentoringForm";

export default function HomePage() {
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-[#002D62] text-white px-8 py-4 font-bold hover:bg-[#003B88] transition-all"
          >
            Chci mentoring
          </button>

          {/* TADY JE OPRAVA: Modál voláme jako samostatný tag, protože neumí přijmout children */}
          <MentoringModal 
            open={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />

          {/* Pokud chceš, aby se po kliknutí ukázal formulář, můžeš ho dát takto pod to: */}
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white p-6 rounded-2xl max-w-md w-full">
                <MentoringForm onClose={() => setIsModalOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}