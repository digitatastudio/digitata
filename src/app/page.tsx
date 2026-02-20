"use client";

import MentoringModal from "./components/MentoringModal";

/**
 * POZNÁMKA: Ostatní komponenty (Hero, About, atd.) jsem dočasně odstranil z importů,
 * protože nebyly v kódu použity, což blokovalo build na Vercelu. 
 * Až je budeš chtít vrátit, nezapomeň je vložit i dolů do returnu jako např. <Hero />.
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hlavní sekce s tlačítkem */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-black tracking-tight text-[#002D62] md:text-6xl">
          DIGITÁTA STUDIO
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-slate-600 md:text-xl">
          Tvůj parťák pro digitální růst. Mentoring, který má hlavu a patu.
        </p>
        
        <div className="flex justify-center">
          <MentoringModal />
        </div>
      </section>

      {/* Patička nebo další sekce můžeš přidat sem */}
    </main>
  );
}