"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUserFriends, FaVideo, FaPodcast } from "react-icons/fa";
import MentoringModal from "./MentoringModal";
import MentoringForm from "./MentoringForm";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  newTab?: boolean;
};

function Card({ icon, title, description, href, onClick, newTab }: CardProps) {
  const content = (
    <div
      onClick={onClick}
      className="group bg-white p-10 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D62]/30"
    >
      <div
        className="text-6xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color: "#002D62" }}
      >
        {icon}
      </div>
      <h3
        className="text-4xl font-extrabold mb-6"
        style={{ color: "#002D62" }}
      >
        {title}
      </h3>
      <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default function Services() {
  const [mentorOpen, setMentorOpen] = useState(false);

  function handleMentoringClick() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Na mobilech rovnou přejdi na stránku /mentoring
      window.location.href = "/mentoring";
    } else {
      setMentorOpen(true);
    }
  }

  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: "#002D62" }}
        >
          Jak ti pomůžu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Mentoring Card */}
          <Card
            icon={<FaUserFriends />}
            title="Mentoring 1:1"
            description="Osobní mentoring pro tvůj růst a disciplínu."
            onClick={handleMentoringClick}
          />

          {/* Online kurzy */}
          <Card
            icon={<FaVideo />}
            title="Online kurzy"
            description="Video kurzy plné praktických tipů pro táty."
            href={
              process.env.NEXT_PUBLIC_YT_URL ??
              "https://www.youtube.com/@digitata_studio"
            }
            newTab
          />

          {/* Podcast */}
          <Card
            icon={<FaPodcast />}
            title="Podcast"
            description="Otcovství, růst a reálné příběhy bez cenzury."
            href={
              process.env.NEXT_PUBLIC_SPOTIFY_URL ??
              "https://open.spotify.com/"
            }
            newTab
          />
        </div>
      </div>

      {/* Mentoring Modal */}
      <MentoringModal open={mentorOpen} onClose={() => setMentorOpen(false)}>
        <MentoringForm onSuccess={() => setMentorOpen(false)} />
      </MentoringModal>
    </section>
  );
}
