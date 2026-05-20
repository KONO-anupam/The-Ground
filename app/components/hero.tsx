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
    <section className="relative w-full h-screen min-h-150 flex flex-col overflow-hidden bg-[#0d0d0e]">
      {/* ── Video / Image Backdrop ── */}
      {/* ── Image Backdrop ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=90&auto=format&fit=crop"
          alt="The Ground espresso bar interior"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIxAAAQMEAgMBAAAAAAAAAAAAAQIDBAAFEiExBhNBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwCuXK/2+3LLcZSW3EpJShtO6lqA7AAZJrO2viO3WorMaSFOyFjKlrOST7kkmpLVljjWqCiOhSlKUkqUpXJJPc1JrKUpQf/Z"
        />

        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>
      {/* ── Thin horizontal rule — architectural detail ── */}

      {/* ── Headline — lower third ── */}
      <div className="relative z-30 mt-auto px-6 md:px-14 pb-16 md:pb-20 max-w-5xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#a1a1aa] font-inter font-light  mb-3"
        >
          Single Origin · Small Batch
        </motion.p>

        {/* Main headline */}
        <h1 className="font-cormorant font-light leading-[1.08] overflow-hidden">
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
                  fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
                  color:
                    i === 2
                      ? "rgba(244,244,245,0.55)" // dimmed last line for rhythm
                      : "rgba(244,244,245,0.93)",
                  fontStyle: i === 1 ? "italic" : "normal",
                  letterSpacing: "-0.01em",
                }}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Divider + sub */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center gap-4 mt-8"
        >
          <span className="block w-10 h-px bg-[#27272a]" />
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#a1a1aa] font-inter font-light">
            Open daily — 7am to 10pm
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.55 }}
          className="mt-8 flex items-center gap-5"
        >
          <a
            href="#menu"
            className="inline-flex items-center gap-3 group text-[11px] tracking-[0.22em] uppercase text-[#f4f4f5] font-inter font-light hover:text-[#a1a1aa] transition-colors duration-300"
          >
            Explore the Menu
            <svg
              className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
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

      {/* ── Bottom scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-12 z-30 flex flex-col items-center gap-2"
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
