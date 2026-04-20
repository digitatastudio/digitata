"use client";

import { useState } from "react";

export default function Ebook() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="ebooks" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-12 text-center">
          Moje knihy & e-booky
        </h2>

        <div className="space-y-16">
          {/* 1) Emoční restart - OBRÁZEK VLEVO, TEXT VPRAVO */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/emocnirestart.jpg"
                alt="Emoční restart"
                className="w-64 md:w-80 rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#002D62] mb-4">
                Emoční restart: 7 dní k sobě
              </h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
                Krátký program pro rodiče po těžkých chvílích. 7 dní, jasné mini-úkoly a návrat k vnitřnímu klidu.
              </p>

              {status === "success" ? (
                <div className="p-4 bg-green-100 text-green-700 rounded-xl font-semibold inline-block">
                  ✓ E-book je na cestě do tvé schránky!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Tvůj e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 bg-[#002D62] text-white font-bold rounded-xl hover:bg-[#003b8f] transition shadow-md whitespace-nowrap disabled:opacity-50"
                  >
                    {status === "loading" ? "Odesílám..." : "Stáhnout zdarma"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt - TEXT VLEVO, OBRÁZEK VPRAVO (ZIGZAG) */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#002D62] mb-4">
                Táta na furt
              </h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
                Praktický průvodce pro tátu po rozchodu. Ego dolů, respekt nahoru. Jak udržet klid a vztah s dítětem.
              </p>
              <button
                disabled
                className="px-8 py-3 bg-[#002D62]/20 text-[#002D62] font-bold rounded-xl cursor-not-allowed"
              >
                Koupit (brzy)
              </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/tatanafurt.jpg"
                alt="Táta na furt"
                className="w-64 md:w-80 rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}