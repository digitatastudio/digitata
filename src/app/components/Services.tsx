// src/app/components/Services.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaUserFriends, FaVideo, FaPodcast } from "react-icons/fa";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  newTab?: boolean;
};

function Card({ icon, title, description, href, newTab }: CardProps) {
  const isExternal = /^https?:\/\//i.test(href);
  const className =
    "group bg-white p-10 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D62]/30";

  const Inner = (
    <>
      <div
        className="text-6xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color: "#002D62" }}
      >
        {icon}
      </div>
      <h3 className="text-4xl font-extrabold mb-6" style={{ color: "#002D62" }}>
        {title}
      </h3>
      <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        aria-label={title}
      >
        {Inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      aria-label={title}
    >
      {Inner}
    </Link>
  );
}

export default function Services() {
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
          <Card
            icon={<FaUserFriends />}
            title="Mentoring 1:1"
            description="Osobní mentoring pro tvůj růst a disciplínu."
            href="/mentoring" // jde na stránku, žádný modal
          />

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

          <Card
            icon={<FaPodcast />}
            title="Podcast"
            description="Otcovství, růst a reálné příběhy bez cenzury."
            href={
              process.env.NEXT_PUBLIC_SPOTIFY_URL ?? "https://open.spotify.com/"
            }
            newTab
          />
        </div>
      </div>
    </section>
  );
}
