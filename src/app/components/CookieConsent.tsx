// components/CookieConsent.tsx
"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setAccepted(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-[#002D62] text-white rounded-2xl shadow-xl px-6 py-4 z-50 flex flex-col md:flex-row items-center gap-3 md:gap-6">
      <p className="text-sm text-white/90">
        Tento web používá cookies k vylepšení funkčnosti a analýze návštěvnosti.{" "}
        <a href="/privacy" className="underline hover:text-yellow-400">
          Více informací
        </a>
      </p>
      <button
        onClick={acceptCookies}
        className="bg-yellow-400 text-[#002D62] font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
      >
        Souhlasím
      </button>
    </div>
  );
}
