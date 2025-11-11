"use client";

import MentoringForm from "./components/MentoringForm"; // ← tady byla ta minela

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#002D62] mb-6 text-center">
          Žádost o mentoring 1:1
        </h1>
        <MentoringForm />
      </div>
    </main>
  );
}