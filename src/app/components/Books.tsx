"use client";
import Image from "next/image";

export default function Books() {
  return (
    <section id="books" className="section">
      <div className="wrap">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-10">
          Moje knihy & e-booky
        </h2>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Emoční restart */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/emocnirestart.jpg"
              alt="Emoční restart"
              width={260}
              height={350}
              className="rounded-xl shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Emoční restart: 7 dní k sobě</h3>
              <p className="text-gray-700 mb-4">
                Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní.
              </p>
              <button className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed">
                Stáhnout zdarma (brzy)
              </button>
            </div>
          </div>

          {/* Táta na furt */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/tatanafurt.jpg"
              alt="Táta na furt"
              width={260}
              height={350}
              className="rounded-xl shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Táta na furt</h3>
              <p className="text-gray-700 mb-4">
                Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu.
              </p>
              <button className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed">
                Koupit (již brzy)
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
