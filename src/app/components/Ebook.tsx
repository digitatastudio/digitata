"use client";

import { useState } from "react";

export default function Ebook() {
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
        setMessage("Skvělé! Je to v mailu.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage("Chyba, zkus to znovu.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Chyba odesílání.");
    }
  };

  return (
    <section id="ebooks" className="section py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-10 text-center md:text-left">
          Moje knihy & e-booky
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* 1) Emoční restart - IDENTICKÝ LAYOUT JAKO ORIGINÁL */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/emocnirestart.jpg"
              alt="Emoční restart"
              className="w-48 md:w-64 rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Emoční restart: 7 dní k sobě</h3>
              <p className="text-gray-700 mb-4 text-sm leading-snug">
                Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní.
              </p>

              {status === "success" ? (
                <p className="text-green-600 font-bold text-sm animate-bounce">{message}</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="email"
                    placeholder="Tvůj e-mail *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002D62] text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-block px-6 py-2 rounded-xl bg-[#002D62] text-white font-semibold hover:bg-[#003d85] transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    {status === "loading" ? "Počkej..." : "Získat zdarma"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt - IDENTICKÝ LAYOUT */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/tatanafurt.jpg"
              alt="Táta na furt"
              className="w-48 md:w-64 rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Táta na furt (kniha)</h3>
              <p className="text-gray-700 mb-4 text-sm leading-snug">
                Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu. Praktická a lidská.
              </p>
              <button
                className="px-6 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed text-gray-500 text-sm shadow-sm"
                disabled
              >
                Koupit (brzy)
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}