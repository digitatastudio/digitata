// src/app/components/Services.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FaUserFriends, FaVideo, FaPodcast } from "react-icons/fa";
import MentoringForm from "./MentoringForm"; // máš už hotový

// Jednoduchý modal přímo v tomhle souboru, ať to hned běží
function MentoringModal({
  open,
  onClose,
  children,
}: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl bg-white text-[#002D62] shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Žádost o mentoring 1:1</h2>
            <button onClick={onClose} aria-label="Zavřít" className="p-2 rounded-lg hover:bg-black/5">✕</button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;     // pro modal
  href?: string;            // pro externí odkaz
  newTab?: boolean;
};

function ServiceCard({ icon, title, description, onClick, href, newTab }: CardProps) {
  const Tag: any = href ? "a" : "button";
  return (
    <Tag
      {...(href
        ? { href, target: newTab ? "_blank" : undefined, rel: newTab ? "noopener noreferrer" : undefined }
        : { onClick })}
      className="group bg-white p-10 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D62]/30"
      aria-label={title}
    >
      <div className="text-6xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" style={{ color: "#002D62" }}>
        {icon}
      </div>
      <h3 className="text-4xl font-extrabold mb-6" style={{ color: "#002D62" }}>
        {title}
      </h3>
      <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </Tag>
  );
}

export default function Services() {
  const [mentorOpen, setMentorOpen] = useState(false);

  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: "#002D62" }}>
          Jak ti pomůžu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Mentoring -> OTEVŘE MODAL S FORMULÁŘEM */}
          <ServiceCard
            icon={<FaUserFriends />}
            title="Mentoring 1:1"
            description="Osobní mentoring pro tvůj růst a disciplínu."
            onClick={() => setMentorOpen(true)}
          />

          {/* Online kurzy -> YouTube kanál */}
          <ServiceCard
            icon={<FaVideo />}
            title="Online kurzy"
            description="Video kurzy plné praktických tipů pro táty"
            href={process.env.NEXT_PUBLIC_YT_URL ?? "https://www.youtube.com/@DIGITATA_studio"}
            newTab
          />

          {/* Podcast -> Spotify (klidně zatím jeden odkaz) */}
          <ServiceCard
            icon={<FaPodcast />}
            title="Podcast"
            description="Otcovství, růst a reálné příběhy bez cenzury."
            href={process.env.NEXT_PUBLIC_SPOTIFY_URL ?? "https://open.spotify.com/"}
            newTab
          />
        </div>
      </div>

      {/* Modal s formulářem */}
      <MentoringModal open={mentorOpen} onClose={() => setMentorOpen(false)}>
        <MentoringForm />
      </MentoringModal>
    </section>
  );
}
