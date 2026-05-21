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
      className="group inline-flex items-center gap-2 font-inter text-[11px] font-light uppercase tracking-[0.12em] text-[#52525b] hover:text-[#f4f4f5] transition-colors duration-300"
    >
      <span className="block h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
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
    <div className="border-t border-[#27272a] pb-16 pt-16">
      <p className="mb-8 font-inter text-[10px] font-light uppercase tracking-[0.2em] text-[#52525b]">
        Opening Hours
      </p>

      <div className="space-y-4">
        {DAYS_HOURS.map(({ days, hours }) => (
          <div
            key={days}
            className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="font-inter text-[11px] font-light uppercase tracking-[0.18em] text-[#71717a] whitespace-nowrap">
              {days}
            </span>

            {/* Dotted connector — desktop only */}
            <span className="hidden sm:block flex-1 border-b border-dotted border-[#27272a] mb-1" />

            {/* ── FIX: was font-serif (broken), now font-cormorant ── */}
            <span
              className="font-cormorant font-light leading-none tabular-nums text-[#f4f4f5]"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.01em" }}
            >
              {hours}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 font-inter text-[10px] font-light uppercase leading-relaxed tracking-[0.15em] text-[#52525b]">
        Last order 30 min before close · Holiday hours may vary
      </p>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-4 font-inter text-[10px] font-light uppercase tracking-[0.2em] text-[#52525b]">
          Find Us
        </p>

        <address className="not-italic space-y-1">
          <p className="font-cormorant text-[17px] font-light leading-relaxed text-[#f4f4f5]">
            The Ground
          </p>
          <p className="font-inter text-[13px] font-light leading-relaxed text-[#a1a1aa]">
            Civil Township, Sector 6
          </p>
          <p className="font-inter text-[13px] font-light leading-relaxed text-[#a1a1aa]">
            Rourkela, Odisha — 769 004
          </p>
        </address>
      </div>

      <div className="space-y-2">
        <p className="mb-4 font-inter text-[10px] font-light uppercase tracking-[0.2em] text-[#52525b]">
          Get in Touch
        </p>

        <a
          href="mailto:hello@theground.in"
          className="group block font-inter text-[13px] font-light tracking-wide text-[#a1a1aa] transition-colors duration-300 hover:text-[#f4f4f5]"
        >
          <span className="border-b border-transparent pb-px transition-all duration-300 group-hover:border-[#f4f4f5]">
            hello@theground.in
          </span>
        </a>

        <a
          href="tel:+916370000000"
          className="group block font-inter text-[13px] font-light tracking-wide text-[#a1a1aa] transition-colors duration-300 hover:text-[#f4f4f5]"
        >
          <span className="border-b border-transparent pb-px transition-all duration-300 group-hover:border-[#f4f4f5]">
            +91 63700 00000
          </span>
        </a>
      </div>

      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow The Ground on Instagram"
        className="group inline-flex items-center gap-3"
      >
        <span className="block w-[22px] text-[#52525b] transition-all duration-500 group-hover:scale-110 group-hover:text-[#f4f4f5]">
          <InstagramIcon />
        </span>

        <span className="font-inter text-[10px] font-light uppercase tracking-[0.18em] text-[#52525b] transition-colors duration-300 group-hover:text-[#a1a1aa]">
          @theground.rourkela
        </span>
      </a>
    </div>
  );
}

function MapBlock() {
  return (
    <div className="w-full">
      <p className="mb-4 font-inter text-[10px] font-light uppercase tracking-[0.2em] text-[#52525b]">
        Navigate
      </p>

      <div className="relative h-56 w-full overflow-hidden border border-[#27272a] sm:h-64">
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
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(13,13,14,0.18)", mixBlendMode: "multiply" }}
        />
      </div>

      <a
        href="https://maps.google.com/?q=Civil+Township+Rourkela+Odisha"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 inline-flex items-center gap-2 font-inter text-[10px] font-light uppercase tracking-[0.18em] text-[#52525b] transition-colors duration-300 hover:text-[#f4f4f5]"
      >
        <span className="block h-px w-3 bg-current transition-all duration-300 group-hover:w-5" />
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
      className="relative overflow-hidden bg-[#0d0d0e] text-[#f4f4f5]"
    >
      {/* ── Wordmark band ── */}
      {/* FIX: was font-serif (broken) — now font-cormorant */}
      <div className="px-6 pb-2 pt-16 md:px-12 lg:px-20">
        <p
          className="pointer-events-none select-none font-cormorant font-light leading-none text-[#18181b]"
          style={{
            fontSize: "clamp(42px, 9vw, 120px)",
            letterSpacing: "-0.03em",
          }}
        >
          The Ground
        </p>
      </div>

      {/* ── Main content ── */}
      <div className="px-6 md:px-12 lg:px-20">
        <HoursBlock />

        {/* Contact + Map */}
        <div className="grid grid-cols-1 gap-12 border-t border-[#27272a] pb-16 pt-16 md:gap-20 lg:grid-cols-2">
          <ContactBlock />
          <MapBlock />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1c1c1e] px-6 py-5 text-center sm:flex-row sm:text-left md:px-12 lg:px-20">
        <p className="font-inter text-[10px] font-light uppercase tracking-[0.12em] text-[#3f3f46]">
          © {year} The Ground · Rourkela · All rights reserved
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}