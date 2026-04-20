"use client";

import { useState } from "react";

export default function Ebook() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/ebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setStatus("success");
  };

  return (
    <section id="ebooks" className="section">
  <div className="wrap">
    <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-10">
      Moje knihy & e-booky
    </h2>

        <div className="grid md:grid-cols-2 gap-12">

      {/* 1) Emoční restart */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src="/emocnirestart.jpg"
          alt="Emoční restart"
          className="w-64 rounded-xl shadow-lg"
        />
        <div>
          <h3 className="text-xl font-bold mb-2">Emoční restart: 7 dní k sobě</h3>
          <p className="text-gray-700 mb-4">
            Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní.
          </p>
              
              {status === "success" ? (
                <p className="text-green-600 font-bold text-sm">Odesláno do mailu!</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Tvůj e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none text-sm w-full"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-block px-6 py-2 rounded-xl bg-[#002D62] text-white font-semibold hover:bg-[#003d85] transition-all shadow-md text-sm text-center"
                  >
                    {status === "loading" ? "..." : "Stáhnout zdarma"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src="/tatanafurt.jpg"
          alt="Táta na furt"
          className="w-64 rounded-xl shadow-lg"
        />
        <div>
          <h3 className="text-xl font-bold mb-2">Táta na furt (kniha)</h3>
          <p className="text-gray-700 mb-4">
            Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu.
            Autentická, praktická, lidská.
          </p>
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed"
          >
            Koupit (již brzy)
          </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}