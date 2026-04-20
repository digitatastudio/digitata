"use client";

import { useState } from "react";

export default function Ebook() {
  // Stavy pro formulář
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage("Skvělé! E-book je na cestě.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Něco se pokazilo.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Došlo k chybě při odesílání.");
    }
  };

  return (
    <section id="ebooks" className="section py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-16 text-center">
          Moje knihy & e-booky
        </h2>

        <div className="flex flex-col gap-20">
          
          {/* 1) Emoční restart - OBRÁZEK VLEVO, TEXT VPRAVO */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <img
              src="/emocnirestart.jpg"
              alt="Emoční restart"
              className="w-64 md:w-80 rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4 text-[#002D62]">Emoční restart: 7 dní k sobě</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní. Zadej svůj e-mail a pošlu ti ho zdarma.
              </p>

              {status === "success" ? (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl font-semibold">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
                  <input
                    type="text"
                    placeholder="Tvé jméno (nepovinné)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62]"
                  />
                  <input
                    type="email"
                    placeholder="Tvůj e-mail *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-block px-8 py-3 rounded-xl bg-[#002D62] text-white font-bold hover:bg-[#003d85] transition-all shadow-md disabled:opacity-50"
                  >
                    {status === "loading" ? "Odesílám..." : "Získat E-book"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-sm mt-1">{message}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt - TEXT VLEVO, OBRÁZEK VPRAVO (ZIGZAG) */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4 text-[#002D62]">Táta na furt (kniha)</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu. Autentická, praktická, lidská.
              </p>
              <button
                className="px-8 py-3 rounded-xl bg-gray-200 font-bold cursor-not-allowed text-gray-500 shadow-sm"
                disabled
              >
                Koupit (již brzy)
              </button>
            </div>
            <img
              src="/tatanafurt.jpg"
              alt="Táta na furt"
              className="w-64 md:w-80 rounded-xl shadow-lg flex-shrink-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
}