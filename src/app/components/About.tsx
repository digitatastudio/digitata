// src/app/components/About.tsx
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text vlevo - SEO optimalizovaný obsah */}
        <div className="order-2 md:order-1">
          {/* H2 je pro Google jasný signál, o čem je tato sekce */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-gray-900">
            Digitáta: Podpora a osobní růst pro <span style={{ color: "#002D62" }}>táty (nejen) po rozchodu</span>
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <h3 className="font-bold text-xl text-gray-800">
              Jsem Míra – táta, který našel cestu zpět k sobě i ke své dceři
            </h3>
            
            <p>
              Můj příběh není jen o mně. Je o každém tátovi, který se ocitl na křižovatce. 
              Prošel jsem si <strong>těžkým obdobím po rozchodu</strong> a vím, jaké to je ztratit pevnou půdu pod nohama. 
              Hledal jsem způsob, <strong>jak si udržet zdravý vztah s dcerou</strong> a jak v tom všem neztratit sám sebe.
            </p>

            <p>
              Dnes vím, že i po pádu může přijít nový a silnější začátek. Projekt 
              <span className="font-bold" style={{ color: "#002D62" }}> DIGITÁTA</span> jsem založil pro rodiče, 
              kteří věří, že autenticita, disciplína a láska k dětem dokážou změnit život.
            </p>

            {/* Odrážky zvyšují šanci na lepší pozice ve vyhledávání a čitelnost */}
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: "#002D62" }}>
              <p className="font-bold mb-2">Co v projektu Digitáta najdeš:</p>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li><strong>Praktické tipy</strong>, jak zvládnout otcovství po rozchodu.</li>
                <li><strong>Inspiraci</strong> pro budování vnitřní síly a disciplíny.</li>
                <li><strong>Komunitu</strong>, která ti rozumí a nenechá tě v tom samotného.</li>
              </ul>
            </div>

            <p className="italic font-medium text-gray-600">
              „Mým cílem je, abys byl tátou, na kterého se tvé děti mohou spolehnout. Protože táta je táta na furt.“
            </p>
          </div>
        </div>

        {/* Fotka vpravo - s lepším SEO popisem */}
        <div className="order-1 md:order-2 relative mx-auto w-full max-w-[520px] aspect-[4/5] md:aspect-[4/5]">
          <Image
            src="/mira.jpg" 
            alt="Míra z projektu Digitáta – mentor a průvodce pro táty po rozchodu"
            fill
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, 520px"
            className="rounded-2xl shadow-2xl object-cover transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}