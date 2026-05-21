"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ─────────────────────────────────────────────
// STRUCTURED DATA (JSON-LD)
// ─────────────────────────────────────────────

const LocalBusinessJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: "The Ground",
        description:
          "A specialty coffee shop in Rourkela, Odisha, serving single-origin, ethically sourced beans with precision brewing methods.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Civil Township",
          addressLocality: "Rourkela",
          addressRegion: "Odisha",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.2333",
          longitude: "84.8500",
        },
        servesCuisine: "Specialty Coffee",
        url: "https://theground.coffee", // update to real URL
      }),
    }}
  />
);

// ─────────────────────────────────────────────
// MOTION VARIANTS
// ─────────────────────────────────────────────

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.65, ease: [0.32, 0, 0.18, 1] as const },
  }),
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

interface ImageCellProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const ImageCell: React.FC<ImageCellProps> = ({ src, alt, priority = false }) => (
  <div className="relative w-full h-full overflow-hidden group">
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      // Improve LCP for the hero image; lazy-load the rest
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      whileHover={{ scale: 1.045 }}
      transition={{ duration: 0.7, ease: [0.32, 0, 0.18, 1] as const }}
      draggable={false}
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
  </div>
);

const Rule: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`block w-8 h-px bg-[#27272a] ${className}`} />
);

// ─────────────────────────────────────────────
// BENTO GRID
// ─────────────────────────────────────────────

export const BentoGallery: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <LocalBusinessJsonLd />

      <section
        id="experience"
        aria-label="The Ground coffee shop experience"
        className="relative overflow-hidden bg-[#0d0d0e] py-24 md:py-32"
      >
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-14"
          >
            <p className="mb-3 font-inter text-[9.5px] font-light uppercase tracking-[0.3em] text-[#52525b]">
              The Experience
            </p>
            {/*
              h2 is intentional here — pair with an h1 higher up the page.
              If this IS the first heading on the page, change to h1.
            */}
            <h2
              className="font-cormorant font-light text-[#f4f4f5]"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              A space for the considered cup.
            </h2>
          </motion.div>

          {/* ── Bento Grid ── */}
          <div
            ref={ref}
            className="grid grid-cols-1 auto-rows-[180px] gap-3 md:grid-cols-4 md:auto-rows-[200px]"
          >
            {/* CELL 1 — hero image, load eagerly for LCP */}
            <motion.div
              custom={0}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 overflow-hidden border border-[#1a1a1b] md:col-span-2 md:row-span-2"
            >
              <ImageCell
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85"
                alt="The Ground specialty coffee shop interior — warm lighting, minimalist design, Rourkela Odisha"
                priority
              />
            </motion.div>

            {/* CELL 2 — current feature lot */}
            <motion.div
              custom={0.08}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 border border-[#1a1a1b] border-t-2 border-t-[#f4f4f5]/10 bg-[#0f0f10] p-5 md:col-span-2 md:p-6 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="font-inter text-[9px] font-light uppercase tracking-[0.3em] text-[#3f3f46]">
                  Current Feature
                </span>
                <span className="font-inter text-[9px] font-light uppercase tracking-[0.2em] text-[#27272a]">
                  Lot №&thinsp;24A
                </span>
              </div>

              <div>
                {/*
                  Use an h3 so this lot name is discoverable in the heading
                  outline — aids both SEO and screen reader navigation.
                */}
                <h3 className="sr-only">
                  Featured Coffee: Yirgacheffe, Ethiopia — Natural Sun-Dried, Lot 24A
                </h3>

                {/* dl/dt/dd gives search engines explicit key-value semantics */}
                <dl className="mb-4 flex flex-col gap-2.5">
                  {[
                    ["Origin", "Yirgacheffe, Ethiopia"],
                    ["Elevation", "2,200 – 2,400 m"],
                    ["Process", "Natural Sun-Dried"],
                    ["Harvest", "November 2024"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-3">
                      <dt className="w-16 shrink-0 font-inter text-[9px] font-light uppercase tracking-[0.2em] text-[#52525b]">
                        {k}
                      </dt>
                      <dd className="font-inter text-[11px] font-light uppercase tracking-[0.12em] text-[#a1a1aa]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Rule />
              </div>
            </motion.div>

            {/* CELL 3 — tasting notes */}
            <motion.div
              custom={0.15}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 overflow-hidden border border-[#1a1a1b] bg-[#111112] p-5 md:p-6 flex flex-col justify-between"
            >
              <span className="font-inter text-[9px] font-light uppercase tracking-[0.28em] text-[#52525b]">
                Tasting Notes
              </span>

              {/* Use ul so notes are individually indexable items */}
              <ul
                aria-label="Coffee tasting notes"
                className="mt-3 flex flex-wrap gap-1.5 list-none p-0 m-0"
              >
                {["Jasmine", "Blueberry", "Lemon Curd", "Dark Honey"].map((note) => (
                  <li
                    key={note}
                    className="border border-[#27272a] px-2.5 py-1 font-inter text-[9.5px] font-light uppercase tracking-[0.14em] text-[#a1a1aa]"
                  >
                    {note}
                  </li>
                ))}
              </ul>

              <Rule className="mt-auto" />
            </motion.div>

            {/* CELL 4 — quote */}
            <motion.div
              custom={0.22}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 border border-[#1a1a1b] bg-[#f4f4f5] p-5 md:p-6 flex flex-col justify-between"
            >
              <span className="font-inter text-[9px] font-light uppercase tracking-[0.28em] text-[#a1a1aa]">
                Our belief
              </span>

              {/* figure + figcaption gives crawlers author attribution */}
              <figure className="m-0 flex flex-col gap-2">
                <blockquote
                  className="font-cormorant font-light leading-[1.3] text-[#111112] m-0"
                  style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                >
                  &ldquo;Good coffee asks nothing of you — only your full
                  attention.&rdquo;
                </blockquote>
                <figcaption className="font-inter text-[9px] font-light uppercase tracking-[0.18em] text-[#a1a1aa]">
                  — The Ground
                </figcaption>
              </figure>
            </motion.div>

            {/* CELL 5 — coffee preparation image */}
            <motion.div
              custom={0.3}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 overflow-hidden border border-[#1a1a1b] md:col-span-2"
            >
              <ImageCell
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85"
                alt="Barista hand-brewing single-origin pour-over coffee at The Ground"
              />
            </motion.div>

            {/* CELL 6 — sourcing stat */}
            <motion.div
              custom={0.36}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 border border-[#1a1a1b] bg-[#0f0f10] p-5 md:p-6 flex flex-col justify-between"
            >
              <span className="font-inter text-[9px] font-light uppercase tracking-[0.28em] text-[#52525b]">
                Sourcing
              </span>

              <div>
                {/* Wrap in a p so the stat reads as a sentence to crawlers */}
                <p className="m-0">
                  <span
                    className="block font-cormorant font-light text-[#f4f4f5]"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1 }}
                    aria-label="12 farms across 6 countries"
                  >
                    12
                  </span>
                  <span className="mt-1 block font-inter text-[10px] font-light uppercase tracking-[0.22em] text-[#52525b]">
                    Farms · 6 countries
                  </span>
                </p>
              </div>

              <Rule />
            </motion.div>

            {/* CELL 7 — method */}
            <motion.div
              custom={0.42}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 border border-[#1a1a1b] border-l-2 border-l-[#f4f4f5]/10 bg-[#111112] p-5 md:p-6 flex flex-col justify-center gap-2"
            >
              <span className="font-inter text-[9px] font-light uppercase tracking-[0.28em] text-[#52525b]">
                Method
              </span>

              <p
                className="font-cormorant italic font-light text-[#d4d4d8] m-0"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.2 }}
              >
                Every gram
                <br />
                weighed twice.
              </p>
            </motion.div>

            {/* CELL 8 — espresso image */}
            <motion.div
              custom={0.48}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 overflow-hidden border border-[#1a1a1b] md:row-span-2"
            >
              <ImageCell
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=85"
                alt="Close-up espresso extraction — rich crema, precision pull at The Ground coffee"
              />
            </motion.div>

            {/* CELL 9 — location */}
            <motion.div
              custom={0.54}
              variants={cellVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="col-span-1 border border-[#1a1a1b] bg-[#0d0d0e] p-5 md:col-span-2 md:p-6 flex items-end justify-between"
            >
              {/* <address> is the correct semantic element for contact/location info */}
              <address className="not-italic flex flex-col gap-1">
                <span className="font-inter text-[9px] font-light uppercase tracking-[0.28em] text-[#3f3f46]">
                  Find us
                </span>

                <span className="font-inter text-[10.5px] font-light uppercase tracking-[0.14em] text-[#71717a]">
                  22°14&prime;N · 84°51&prime;E
                </span>

                <span
                  className="font-cormorant italic font-light text-[#a1a1aa]"
                  style={{ fontSize: "clamp(12px, 1.5vw, 15px)" }}
                >
                  Civil Township, Rourkela, Odisha
                </span>
              </address>

             <a 
                href="#visit"
                aria-label="Get directions to The Ground, Civil Township, Rourkela, Odisha"
                className="border-b border-[#27272a] pb-0.5 font-inter text-[9px] font-light uppercase tracking-[0.22em] text-[#52525b] transition-colors duration-300 hover:border-[#52525b] hover:text-[#a1a1aa]"
              >
                Directions ↗
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BentoGallery;