// src/app/mentoring/page.tsx

import MentoringForm from "../components/MentoringForm";

export default function MentoringPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#002D62] mb-6 text-center">
          Mentoring DIGITÁTA
        </h1>
        <MentoringForm />
      </div>
    </main>
  );
}
