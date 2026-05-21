"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const headlineLines = [
  { text: "Meticulously sourced.", delay: 0.5 },
  { text: "Roasted fresh.", delay: 0.72 },
  { text: "Poured in Rourkela.", delay: 0.94 },
];

export const Hero = () => {
  return (
    <section
      className="relative w-full h-screen min-h-150 flex flex-col overflow-hidden bg-[#0d0d0e]"
      aria-label="The Ground — specialty coffee bar in Rourkela"
    >
      {/* ── Image Backdrop ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=90&auto=format&fit=crop"
          alt="Interior of The Ground espresso bar in Rourkela — warm lighting, minimal décor"
          fill
          priority
          fetchPriority="high"
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIxAAAQMEAgMBAAAAAAAAAAAAAQIDBAAFEiExBhNBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwCuXK/2+3LLcZSW3EpJShtO6lqA7AAZJrO2viO3WorMaSFOyFjKlrOST7kkmpLVljjWqCiOhSlKUkqUpXJJPc1JrKUpQf/Z"
        />

        {/* Base darkening */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Bottom-weighted gradient */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,14,0.92) 0%, rgba(13,13,14,0.55) 40%, rgba(13,13,14,0.15) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-30 flex flex-col justify-center md:justify-end md:mt-auto px-6 md:px-14 pt-24 pb-8 md:pt-0 md:pb-20 h-full md:h-auto max-w-4xl">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#a1a1aa] font-inter font-light mb-4"
        >
          Single Origin · Small Batch
        </motion.p>

        {/* Headline — single h1, text present in DOM from SSR */}
        <h1 className="font-cormorant font-light leading-[1.06] overflow-hidden">
          {headlineLines.map(({ text, delay }, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay,
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                  fontSize:
                    i === 2
                      ? "clamp(1.65rem, 5.6vw, 4.9rem)"
                      : "clamp(1.75rem, 6.2vw, 5.3rem)",
                  color:
                    i === 2
                      ? "rgba(244,244,245,0.45)"
                      : "rgba(244,244,245,0.93)",
                  fontStyle: i === 1 ? "italic" : "normal",
                  letterSpacing: "-0.015em",
                }}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Hours — wrapped in time element for semantic markup */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center gap-4 mt-6 md:mt-7"
        >
          <span className="block w-8 h-px bg-[#3f3f46]" aria-hidden="true" />
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#a1a1aa] font-inter font-light">
            Open daily —{" "}
            <time dateTime="07:00">7am</time> to <time dateTime="22:00">10pm</time>
          </p>
        </motion.div>

        {/* ── CTA Group ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.55 }}
          className="mt-7 md:mt-8 flex flex-row items-center gap-4 md:gap-6"
        >
          <a
            href="#reserve"
            className="
              inline-flex items-center justify-center
              px-6 py-3 md:px-7 md:py-3.5
              border border-[#f4f4f5]/90
              text-[11px] tracking-[0.2em] uppercase
              text-[#f4f4f5] font-inter font-light
              hover:bg-[#f4f4f5]/8 hover:border-[#ffffff]
              active:bg-[#f4f4f5]/12
              transition-all duration-300
              min-h-[44px] md:min-h-0
            "
          >
            Reserve a Table
          </a>

          <a
            href="#menu"
            className="
              inline-flex items-center gap-2.5 group
              text-[11px] tracking-[0.2em] uppercase
              text-[#71717a] font-inter font-light
              hover:text-[#a1a1aa]
              transition-colors duration-300
              min-h-[44px] md:min-h-0
              py-3
            "
          >
            View Menu
            <svg
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              width="16"
              height="10"
              viewBox="0 0 18 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 6H16M11 1L16 6L11 11"
                stroke="currentColor"
                strokeWidth="0.9"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-12 z-30 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="11"
              height="21"
              rx="5.5"
              stroke="#3f3f46"
              strokeWidth="0.8"
            />
            <motion.rect
              x="5"
              y="4"
              width="2"
              height="5"
              rx="1"
              fill="#a1a1aa"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        <p className="text-[9px] tracking-[0.28em] uppercase text-[#3f3f46] font-inter rotate-90 origin-center mt-3">
          Scroll
        </p>
      </motion.div>
    </section>
  );
};