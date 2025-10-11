// src/app/components/Contact.tsx
import { FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-8">
          Kontakt
        </h2>

        <div className="flex flex-col gap-4 text-lg text-gray-800">
          <a
            href="mailto:info@digitatastudio.cz"
            className="flex items-center gap-3 hover:text-brand transition"
          >
            <FaEnvelope className="text-brand text-xl" />
            info@digitatastudio.cz
          </a>

          <a
            href="https://www.instagram.com/digitata_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-brand transition"
          >
            <FaInstagram className="text-brand text-xl" />
            @digitata_studio
          </a>

          <a
            href="https://www.google.com/maps/place/Rumburk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-brand transition"
          >
            <FaMapMarkerAlt className="text-brand text-xl" />
            Rumburk (mapa)
          </a>
        </div>
      </div>
    </section>
  );
}
