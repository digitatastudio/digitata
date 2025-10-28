"use client";
import MentoringForm from "../components/MentoringForm";

export default function MentoringPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[#002D62] mb-6 text-center">
          Žádost o mentoring 1:1
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Vyplň krátký formulář – ozvu se a domluvíme si první krok. 👍
        </p>
        <div className="rounded-2xl bg-white shadow-2xl p-6 md:p-8">
          <MentoringForm />
        </div>
        <div className="text-center mt-8">
          <a href="/#services" className="text-[#002D62] hover:underline">← Zpět</a>
        </div>
      </div>
    </main>
  );
}
