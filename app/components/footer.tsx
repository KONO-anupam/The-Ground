"use client";

import { useState } from "react";

const DAYS_HOURS = [
  { days: "MON — FRI", hours: "08:00 — 22:00" },
  { days: "SAT — SUN", hours: "09:00 — 23:00" },
];

function BackToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-2 text-[#52525b] hover:text-[#f4f4f5] transition-colors duration-300 text-[11px] tracking-[0.12em] uppercase font-light"
    >
      <span className="block w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
      Back to Top
    </button>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HoursBlock() {
  return (
    <div className="border-t border-[#27272a] pt-16 pb-16">
      <p className="text-[10px] tracking-[0.2em] text-[#52525b] uppercase mb-8 font-light">
        Opening Hours
      </p>

      <div className="space-y-4">
        {DAYS_HOURS.map(({ days, hours }) => (
          <div
            key={days}
            className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4"
          >
            <span className="text-[11px] tracking-[0.18em] text-[#71717a] uppercase font-light whitespace-nowrap">
              {days}
            </span>

            {/* Divider only on larger screens */}
            <span className="hidden sm:block flex-1 border-b border-dotted border-[#27272a] mb-1" />

            <span className="text-[32px] md:text-[42px] leading-none font-serif tracking-tight text-[#f4f4f5] tabular-nums">
              {hours}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] tracking-[0.15em] text-[#52525b] uppercase mt-6 font-light leading-relaxed">
        Last order 30 min before close · Holiday hours may vary
      </p>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] tracking-[0.2em] text-[#52525b] uppercase mb-4 font-light">
          Find Us
        </p>

        <address className="not-italic space-y-1">
          <p className="text-[15px] text-[#f4f4f5] font-light leading-relaxed">
            The Ground
          </p>
          <p className="text-[13px] text-[#a1a1aa] font-light leading-relaxed">
            Civil Township, Sector 6
          </p>
          <p className="text-[13px] text-[#a1a1aa] font-light leading-relaxed">
            Rourkela, Odisha — 769 004
          </p>
        </address>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] tracking-[0.2em] text-[#52525b] uppercase mb-4 font-light">
          Get in Touch
        </p>

        <a
          href="mailto:hello@theground.in"
          className="block text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300 font-light tracking-wide group"
        >
          <span className="border-b border-transparent group-hover:border-[#f4f4f5] transition-all duration-300 pb-px">
            hello@theground.in
          </span>
        </a>

        <a
          href="tel:+916370000000"
          className="block text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300 font-light tracking-wide group"
        >
          <span className="border-b border-transparent group-hover:border-[#f4f4f5] transition-all duration-300 pb-px">
            +91 63700 00000
          </span>
        </a>
      </div>

      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow The Ground on Instagram"
        className="inline-flex items-center gap-3 group"
      >
        <span className="w-[22px] h-[22px] text-[#52525b] group-hover:text-[#f4f4f5] transition-all duration-500 group-hover:scale-110 transform-gpu block">
          <InstagramIcon />
        </span>

        <span className="text-[10px] tracking-[0.18em] text-[#52525b] group-hover:text-[#a1a1aa] transition-colors duration-300 uppercase font-light">
          @theground.rourkela
        </span>
      </a>
    </div>
  );
}

function MapBlock() {
  return (
    <div className="w-full h-full min-h-[220px] sm:min-h-[240px]">
      <p className="text-[10px] tracking-[0.2em] text-[#52525b] uppercase mb-4 font-light">
        Navigate
      </p>

      <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden border border-[#27272a]">
        <iframe
          title="The Ground location map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.6!2d84.8825!3d22.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201a4a3e5a0001%3A0x1!2sCivil+Township%2C+Rourkela%2C+Odisha!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter:
              "grayscale(100%) invert(90%) contrast(85%) brightness(0.45) sepia(10%)",
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(13,13,14,0.18)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <a
        href="https://maps.google.com/?q=Civil+Township+Rourkela+Odisha"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-[10px] tracking-[0.18em] text-[#52525b] hover:text-[#f4f4f5] transition-colors duration-300 uppercase font-light group"
      >
        <span className="block w-3 h-px bg-current transition-all duration-300 group-hover:w-5" />
        Directions ↗
      </a>
    </div>
  );
}

export default function TheGroundFooter() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer
      id="visit"
      className="relative bg-[#0d0d0e] text-[#f4f4f5] overflow-hidden"
      style={{ fontFamily: "'Inter', 'Geist', sans-serif" }}
    >
      {/* Wordmark band */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 pb-2">
        <p
          className="text-[clamp(42px,9vw,120px)] leading-none tracking-[-0.03em] text-[#18181b] font-serif select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          The Ground
        </p>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 lg:px-20">
        <HoursBlock />

        {/* Contact + Map */}
        <div className="border-t border-[#27272a] pt-16 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <ContactBlock />
          <MapBlock />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1c1c1e] px-6 md:px-12 lg:px-20 py-5 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[10px] tracking-[0.12em] text-[#3f3f46] font-light uppercase">
          © {year} The Ground · Rourkela · All rights reserved
        </p>

        <BackToTop />
      </div>
    </footer>
  );
}