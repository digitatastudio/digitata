"use client";

import { useState } from "react";

export default function Ebook() {
  // --- LOGIKA FORMULÁŘE (přidáno) ---
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
        setMessage("Skvělé! E-book je na cestě do tvého e-mailu.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Něco se pokazilo, zkus to prosím znovu.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Došlo k chybě při odesílání.");
    }
  };

  return (
    <section id="ebooks" className="section py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-10 text-center md:text-left">
          Moje knihy & e-booky
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 1) Emoční restart - S FORMULÁŘEM */}
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
              
              {/* Zobrazení po úspěšném odeslání */}
              {status === "success" ? (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl text-sm">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Tvé jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62] text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Tvůj e-mail *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62] text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-block px-6 py-2 rounded-xl bg-[#002D62] text-white font-semibold hover:bg-[#003d85] transition-all shadow-md disabled:opacity-50"
                  >
                    {status === "loading" ? "Odesílám..." : "Získat zdarma"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt - ZŮSTÁVÁ STEJNÉ */}
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
                className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed text-gray-500"
                disabled
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