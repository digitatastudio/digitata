// src/app/mentoring/page.tsx
import React from "react";
import MentoringForm from "@/app/components/MentoringForm"; // pokud to hází chybu, použij relativní: ../../components/MentoringForm

export const metadata = {
  title: "Žádost o mentoring 1:1 | DIGITÁTA",
  description: "Vyplň krátký formulář – ozvu se a domluvíme si první krok.",
};

export default function MentoringPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ color: "#002D62" }}>
          Žádost o mentoring 1:1
        </h1>

        <p className="text-center text-gray-700 mb-10">
          Vyplň krátký formulář – ozvu se co nejdřív a domluvíme si první krok. 👍
        </p>

        <div className="rounded-2xl bg-white shadow-xl p-6 md:p-8">
          <MentoringForm onSuccess={() => { /* případně router.push('/dekuju') */ }} />
        </div>
      </div>
    </main>
  );
}