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
        setMessage("Skvělé! E-book je na cestě.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Něco se pokazilo.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Chyba při odesílání.");
    }
  };

  return (
    <section id="ebooks" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-[#002D62] mb-16 text-center md:text-left">
          Moje knihy & e-booky
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* 1) Emoční restart - AKTIVNÍ FORMULÁŘ */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 flex flex-col md:flex-row gap-8 items-start border border-slate-100">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src="/emocnirestart.jpg"
                alt="Emoční restart"
                className="w-full rounded-2xl shadow-lg object-cover aspect-[3/4]"
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-[#002D62] mb-3 leading-tight">
                Emoční restart:<br/>7 dní k sobě
              </h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Krátký program pro rodiče po těžkých chvílích. Zadej e-mail a pošlu ti ho zdarma.
              </p>

              {status === "success" ? (
                <div className="mt-auto p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-pulse">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-auto space-y-3">
                  <input
                    type="text"
                    placeholder="Tvé jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none transition-all text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Tvůj e-mail *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl bg-[#002D62] text-white font-bold hover:bg-[#003d85] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
                  >
                    {status === "loading" ? "Odesílám..." : "Získat E-book zdarma"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2) Táta na furt - JIŽ BRZY */}
          <div className="bg-white/60 p-8 rounded-[2.5rem] shadow-md flex flex-col md:flex-row gap-8 items-start border border-slate-100 opacity-80">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src="/tatanafurt.jpg"
                alt="Táta na furt"
                className="w-full rounded-2xl shadow-lg grayscale-[20%] object-cover aspect-[3/4]"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">
                Táta na furt<br/>(kniha)
              </h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu. Autentická a lidská.
              </p>
              <button
                disabled
                className="w-full py-4 rounded-xl bg-slate-200 text-slate-500 font-bold cursor-not-allowed"
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