"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// SMOOTH SCROLL HELPER
// ─────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: { label: string; sectionId: string }[] = [
    { label: "Menu", sectionId: "menu" },
    { label: "Experience", sectionId: "experience" },
    { label: "Visit", sectionId: "visit" },
  ];

  const handleNav = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Main Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-[#0d0d0e]/60 border-[#27272a]/60"
            : "backdrop-blur-sm bg-[#0d0d0e]/10 border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Wordmark — clicks back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-cormorant text-xl tracking-[0.18em] text-[#f4f4f5] uppercase select-none bg-transparent border-none cursor-pointer"
          >
            The Ground
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-9">
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <button
                  onClick={() => handleNav(link.sectionId)}
                  className="group relative text-[11px] tracking-[0.2em] uppercase text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300 font-inter font-light bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f4f4f5] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right — Find Us + Hamburger */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleNav("visit")}
              className="hidden md:inline-flex items-center h-8 px-5 border border-[#27272a] hover:border-[#f4f4f5]/40 text-[10px] tracking-[0.22em] uppercase text-[#a1a1aa] hover:text-[#f4f4f5] transition-all duration-300 font-inter font-light bg-transparent cursor-pointer"
            >
              Find Us
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-end gap-1.25 w-8 h-8 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="block h-px bg-[#f4f4f5] origin-center"
                style={{ width: "24px" }}
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-px bg-[#a1a1aa] origin-right"
                style={{ width: "16px" }}
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="block h-px bg-[#f4f4f5] origin-center"
                style={{ width: "24px" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: [0.76, 0, 0.24, 1],
                duration: 0.45,
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#111112] border-l border-[#27272a] flex flex-col md:hidden"
            >
              {/* Close */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M1 1L17 17M17 1L1 17"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-0 px-8 mt-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.sectionId}
                    onClick={() => handleNav(link.sectionId)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="group flex items-center justify-between py-5 border-b border-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300 bg-transparent border-x-0 border-t-0 cursor-pointer text-left w-full"
                  >
                    <span className="font-cormorant text-2xl font-light italic tracking-wide">
                      {link.label}
                    </span>
                    <svg
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-0 group-hover:translate-x-1 transition-transform"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M1 7H13M8 2L13 7L8 12"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => handleNav("visit")}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38, duration: 0.4 }}
                  className="mt-8 self-start inline-flex items-center h-9 px-6 border border-[#27272a] hover:border-[#f4f4f5]/40 text-[10px] tracking-[0.22em] uppercase text-[#a1a1aa] hover:text-[#f4f4f5] transition-all duration-300 font-inter bg-transparent cursor-pointer"
                >
                  Find Us
                </motion.button>
              </nav>

              {/* Footer tag */}
              <div className="mt-auto px-8 pb-10">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#3f3f46] font-inter">
                  Rourkela, Odisha
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
