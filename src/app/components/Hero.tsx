// src/app/components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      {/* Background image */}
      <Image
  src="sefi2.png"
  alt="Já a dcera"
  fill
  priority
  className="object-cover"
/>
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-6 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
          DIGITÁTA
        </h1>

        <p className="text-2xl md:text-4xl font-bold mb-6">
          Všechno začíná u <span className="drop-shadow-[0_0_6px_blue]">tebe</span>.<br />
          Ty jsi <span className="drop-shadow-[0_0_6px_blue]">úspěch</span>.
        </p>

        <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-10 leading-relaxed font-semibold shadow-text">
          Mentoring, inspirace a nástroje pro rodiče, kteří chtějí růst a
          budovat lepší život pro sebe i své děti.
        </p>

        {/* CTA — brand blue #002D62 with white text */}
        <a
          href="#about"
          className="inline-block rounded-xl font-bold py-4 px-10 shadow-2xl transition-transform hover:scale-105"
          style={{ backgroundColor: "#002D62", color: "#ffffff" }}
        >
          Začni teď
        </a>
      </div>
    </section>
  );
}
