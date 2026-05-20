"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;
const MONTH_SHORT = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
] as const;

const SLOTS: { t: string; avail: boolean }[] = [
  { t: "8:00 AM",  avail: true  }, { t: "9:00 AM",  avail: true  },
  { t: "10:00 AM", avail: true  }, { t: "11:00 AM", avail: false },
  { t: "12:00 PM", avail: true  }, { t: "1:00 PM",  avail: false },
  { t: "2:00 PM",  avail: true  }, { t: "3:00 PM",  avail: true  },
  { t: "4:00 PM",  avail: true  }, { t: "5:00 PM",  avail: false },
  { t: "6:00 PM",  avail: true  }, { t: "7:00 PM",  avail: true  },
  { t: "8:00 PM",  avail: true  }, { t: "9:00 PM",  avail: true  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const genRef = (): string =>
  "TG-" + Math.random().toString(36).slice(2, 7).toUpperCase();

// ─────────────────────────────────────────────
// STEP LABEL
// ─────────────────────────────────────────────

const StepLabel: React.FC<{
  n: string;
  label: string;
  optional?: boolean;
}> = ({ n, label, optional }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="font-inter text-[9px] font-light uppercase tracking-[0.25em] text-[#3f3f46]">
      {n}&nbsp;&nbsp;{label}
    </span>
    {optional && (
      <span className="font-inter text-[9px] font-light tracking-[0.15em] text-[#27272a]">
        optional
      </span>
    )}
    <span className="h-px flex-1 bg-[#1c1c1e]" />
  </div>
);

// ─────────────────────────────────────────────
// SUCCESS VIEW
// ─────────────────────────────────────────────

interface SuccessProps {
  dateLabel: string;
  slot: string;
  guests: number;
  bookingRef: string;
  onReset: () => void;
}

const SuccessView: React.FC<SuccessProps> = ({
  dateLabel,
  slot,
  guests,
  bookingRef,
  onReset,
}) => (
  <motion.div
    key="success"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: [0.32, 0, 0.18, 1] }}
    className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center"
  >
    {/* Animated checkmark circle */}
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.32, 0, 0.18, 1] }}
      className="relative mb-10 flex h-20 w-20 items-center justify-center"
    >
      {/* Outer ring — draws itself */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="40" cy="40" r="38"
          stroke="#27272a"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      {/* Checkmark */}
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
        <motion.path
          d="M1 10L9 18L25 1"
          stroke="#f4f4f5"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.55, duration: 0.55, ease: "easeOut" }}
        />
      </svg>
    </motion.div>

    {/* Headline */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.55, ease: [0.32, 0, 0.18, 1] }}
      className="font-cormorant font-light text-[#f4f4f5]"
      style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.01em", lineHeight: 1.1 }}
    >
      Your table is confirmed.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="mt-3 font-cormorant font-light italic text-[#71717a]"
      style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
    >
      We look forward to hosting you.
    </motion.p>

    {/* Booking summary card */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 0.5 }}
      className="mt-10 inline-flex flex-wrap items-stretch justify-center divide-x divide-[#1c1c1e] border border-[#1c1c1e]"
    >
      {[
        ["Date", dateLabel],
        ["Time", slot],
        ["Guests", `${guests}`],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1.5 px-7 py-5 text-center">
          <span className="font-inter text-[8.5px] font-light uppercase tracking-[0.25em] text-[#3f3f46]">
            {k}
          </span>
          <span className="font-cormorant text-xl font-light text-[#a1a1aa]">
            {v}
          </span>
        </div>
      ))}
    </motion.div>

    {/* Ref + reset */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className="mt-8 flex flex-col items-center gap-5"
    >
      <p className="font-inter text-[9px] font-light uppercase tracking-[0.3em] text-[#27272a]">
        Booking ref&nbsp;·&nbsp;{bookingRef}
      </p>

      {/* Divider */}
      <span className="block h-px w-8 bg-[#1c1c1e]" />

      <button
        onClick={onReset}
        className="font-inter text-[9px] font-light uppercase tracking-[0.22em] text-[#3f3f46] transition-colors duration-300 hover:text-[#71717a]"
      >
        Make another reservation
      </button>
    </motion.div>
  </motion.div>
);

// ─────────────────────────────────────────────
// MAIN WIDGET
// ─────────────────────────────────────────────

export const ReservationWidget: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef] = useState<string>(genRef);

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const firstDow = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();

  const dateLabel = selectedDate
    ? `${DAY_NAMES[selectedDate.getDay()]} ${selectedDate.getDate()} ${MONTH_SHORT[selectedDate.getMonth()]}`
    : "";

  const canSubmit = Boolean(selectedDate && selectedSlot);

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setGuests(2);
    setNote("");
    setConfirmed(false);
  };

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="relative bg-[#0d0d0e] text-[#f4f4f5] overflow-hidden py-24 md:py-32"
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

      {/* Top border rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-[#1c1c1e] origin-left"
      />

      <div className="relative max-w-2xl mx-auto px-6 md:px-10">
        <AnimatePresence mode="wait">
          {!confirmed ? (
            // ─── FORM ───
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.18, 1] }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <p className="font-inter text-[9.5px] font-light uppercase tracking-[0.3em] text-[#52525b] mb-3">
                  Reserve a Table
                </p>
                <h2
                  className="font-cormorant font-light text-[#f4f4f5]"
                  style={{
                    fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  Plan your visit.
                </h2>
              </motion.div>

              {/* ── STEP 1 — Date ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.55 }}
                className="mb-10"
              >
                <StepLabel n="01" label="Choose a date" />

                {/* Month label */}
                <p className="font-inter text-[9px] font-light uppercase tracking-[0.22em] text-[#52525b] mb-4">
                  {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
                </p>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {DAY_NAMES.map((d) => (
                    <p
                      key={d}
                      className="font-inter text-[8.5px] font-light uppercase tracking-[0.15em] text-[#3f3f46] text-center pb-2"
                    >
                      {d}
                    </p>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDow }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const date = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      day
                    );
                    const isPast = date < today;
                    const isSelected = selectedDate?.getDate() === day;

                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={`
                          py-2.5 text-center font-cormorant text-base font-light border
                          transition-all duration-200 focus:outline-none
                          ${
                            isPast
                              ? "cursor-not-allowed border-[#1c1c1e] text-[#3f3f46] opacity-25"
                              : isSelected
                              ? "border-[#f4f4f5] bg-white/[0.04] text-[#f4f4f5]"
                              : "border-[#1c1c1e] text-[#71717a] hover:border-[#3f3f46] hover:text-[#a1a1aa]"
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── STEP 2 — Time ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18, duration: 0.55 }}
                className="mb-10"
              >
                <StepLabel n="02" label="Pick a time" />
                <div className="flex flex-wrap gap-1.5">
                  {SLOTS.map((s) => (
                    <button
                      key={s.t}
                      disabled={!s.avail}
                      onClick={() => setSelectedSlot(s.t)}
                      className={`
                        px-4 py-2.5 font-inter text-[10px] font-light uppercase
                        tracking-[0.12em] border transition-all duration-200 focus:outline-none
                        ${
                          !s.avail
                            ? "cursor-not-allowed border-[#1c1c1e] text-[#3f3f46] line-through opacity-30"
                            : selectedSlot === s.t
                            ? "border-[#f4f4f5] bg-white/[0.04] text-[#f4f4f5]"
                            : "border-[#1c1c1e] text-[#71717a] hover:border-[#3f3f46] hover:text-[#a1a1aa]"
                        }
                      `}
                    >
                      {s.t}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* ── STEP 3 — Guests ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.26, duration: 0.55 }}
                className="mb-10"
              >
                <StepLabel n="03" label="Number of guests" />
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    aria-label="Decrease guests"
                    className="flex h-9 w-9 items-center justify-center border border-[#27272a] font-cormorant text-xl text-[#71717a] transition-all duration-200 hover:border-[#a1a1aa] hover:text-[#f4f4f5] focus:outline-none"
                  >
                    −
                  </button>
                  <span
                    className="min-w-[2ch] text-center font-cormorant font-light text-[#f4f4f5]"
                    style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1 }}
                  >
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests((g) => Math.min(12, g + 1))}
                    aria-label="Increase guests"
                    className="flex h-9 w-9 items-center justify-center border border-[#27272a] font-cormorant text-xl text-[#71717a] transition-all duration-200 hover:border-[#a1a1aa] hover:text-[#f4f4f5] focus:outline-none"
                  >
                    +
                  </button>
                  <span className="font-inter text-[10px] font-light uppercase tracking-[0.2em] text-[#52525b]">
                    {guests === 1 ? "guest" : "guests"}
                  </span>
                </div>
              </motion.div>

              {/* ── STEP 4 — Notes ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.34, duration: 0.55 }}
                className="mb-10"
              >
                <StepLabel n="04" label="Any notes?" optional />
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Dietary requirements, celebrations, seating preference…"
                  className="
                    w-full resize-none bg-transparent px-4 py-3
                    font-inter text-xs font-light tracking-wide text-[#a1a1aa]
                    border border-[#1f1f20] outline-none
                    placeholder:text-[#3f3f46]
                    focus:border-[#3f3f46] transition-colors duration-200
                  "
                />
              </motion.div>

              {/* ── Booking summary ── */}
              <AnimatePresence>
                {canSubmit && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="mb-8 border-t border-[#1c1c1e] pt-6"
                  >
                    <p className="font-inter text-[9px] font-light uppercase tracking-[0.22em] text-[#3f3f46] mb-4">
                      Summary
                    </p>
                    <div className="flex flex-wrap gap-8">
                      {[
                        ["Date", dateLabel],
                        ["Time", selectedSlot!],
                        ["Guests", `${guests} ${guests === 1 ? "guest" : "guests"}`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-1.5">
                          <span className="font-inter text-[9px] font-light uppercase tracking-[0.22em] text-[#3f3f46]">
                            {k}
                          </span>
                          <span className="font-cormorant text-xl font-light text-[#f4f4f5]">
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Submit CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42, duration: 0.5 }}
              >
                <button
                  disabled={!canSubmit}
                  onClick={() => setConfirmed(true)}
                  className={`
                    group inline-flex items-center gap-3 border
                    px-8 py-3.5 font-inter text-[10px] font-light
                    uppercase tracking-[0.22em] transition-all duration-300
                    focus:outline-none
                    ${
                      canSubmit
                        ? "border-[#f4f4f5] text-[#f4f4f5] hover:bg-[#f4f4f5] hover:text-[#0d0d0e]"
                        : "cursor-not-allowed border-[#27272a] text-[#3f3f46]"
                    }
                  `}
                >
                  Reserve Table
                  <svg
                    className={`transition-transform duration-300 ${canSubmit ? "group-hover:translate-x-1" : ""}`}
                    width="18" height="12" viewBox="0 0 18 12" fill="none"
                  >
                    <path
                      d="M0 6H16M11 1L16 6L11 11"
                      stroke="currentColor"
                      strokeWidth="0.9"
                    />
                  </svg>
                </button>

                {!canSubmit && (
                  <p className="mt-3 font-inter text-[9px] font-light uppercase tracking-[0.18em] text-[#27272a]">
                    {!selectedDate
                      ? "Select a date to continue"
                      : "Select a time to continue"}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            // ─── SUCCESS ───
            <SuccessView
              dateLabel={dateLabel}
              slot={selectedSlot!}
              guests={guests}
              bookingRef={bookingRef}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ReservationWidget;