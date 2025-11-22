"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center text-white">
      {/* Pozadí: čistý CSS gradient, žádný obrázek */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#053569,_#00152a)]" />

      {/* Jemné stmavení */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Obsah */}
      <div className="relative z-10 px-4">
        <h1 className="mb-4 text-5xl font-extrabold tracking-[0.15em] md:text-7xl">
          DIGITÁTA
        </h1>

        <p className="mb-4 text-2xl md:text-3xl font-semibold">
          Všechno začíná u <span className="text-blue-300">tebe</span>.
          <br />
          Ty jsi <span className="text-blue-300">úspěch</span>.
        </p>

        <p className="mx-auto mb-8 max-w-2xl text-base md:text-lg text-slate-100">
          Mentoring, inspirace a nástroje pro rodiče, kteří chtějí růst a
          budovat lepší život pro sebe i své děti.
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
    </section>
  );
}
