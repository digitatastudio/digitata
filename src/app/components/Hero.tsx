"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center text-white">
      {/* Pozadí: čistý CSS gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#053569,_#00152a)]" />

  

      {/* Obsah uprostřed */}
      <div className="relative z-10 px-4">
        <p className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
          Všechno začíná u tebe
          <br />
          Ty jsi úspěch
        </p>

        <button
          className="rounded-xl bg-[#002D62] px-10 py-4 text-sm font-semibold shadow-xl transition hover:scale-105 hover:bg-[#003b8f]"
          onClick={() => {
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Začni teď
        </button>
      </div>

     <div className="absolute bottom-6 right-6 z-20 opacity-80">
  <Image
    src="/digitata-logo-vertical.png"
    width={90}
    height={300}
    alt="Digitáta logo"
    className="rotate-90"
  />
</div>
    </section>
  );
}
