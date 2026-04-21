"use client";

import { useState } from "react";

export default function Ebook() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        // Pokud to nevyjde, tlačítko se odsekne a ukáže chybu
        const errorData = await res.json().catch(() => ({}));
        setStatus("idle");
        alert("Chyba API: " + (errorData.error || res.statusText || "Neznámá chyba serveru"));
      }
    } catch (err: any) {
      setStatus("idle");
      alert("Kritická chyba: " + err.message);
    }
  };

  return (
    <section id="ebooks" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-10 text-center md:text-left">
          Moje knihy & e-booky
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 1) Emoční restart */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src="/emocnirestart.jpg" alt="Emoční restart" className="w-64 rounded-xl shadow-lg flex-shrink-0" />
            <div className="relative">
              <h3 className="text-xl font-bold mb-2">Emoční restart: 7 dní k sobě</h3>
              <p className="text-gray-700 mb-4">Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní.</p>
              
              {status === "success" ? (
                <p className="text-green-600 font-bold text-sm absolute">✓ Máš to v mailu!</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-[200px]">
                  <input
                    type="email"
                    placeholder="Tvůj e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-2 rounded-xl bg-[#002D62] text-white font-semibold hover:bg-[#003d85] transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    {status === "loading" ? "Posílám..." : "Stáhnout zdarma"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src="/tatanafurt.jpg" alt="Táta na furt" className="w-64 rounded-xl shadow-lg flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Táta na furt (kniha)</h3>
              <p className="text-gray-700 mb-4">Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu. Autentická, praktická, lidská.</p>
              <button className="px-6 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed text-gray-500 shadow-sm" disabled>
                Koupit (již brzy)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}