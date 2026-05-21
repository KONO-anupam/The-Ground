"use client";
const PHRASES = [
  { text: "Roasted Weekly", outline: false },
  { text: "Ethically Sourced", outline: true },
  { text: "Open Daily 8AM – 10PM", outline: false },
];

const MarqueeUnit = () => (
  <div className="flex items-center whitespace-nowrap shrink-0">
    {PHRASES.map(({ text, outline }, i) => (
      <div key={i} className="flex items-center">
        <span
          className="font-inter font-black uppercase"
          style={{
            fontSize: "clamp(1.15rem, 3.2vw, 2rem)",
            letterSpacing: "0.18em",
            lineHeight: 1,
            ...(outline
              ? {
                  color: "transparent",
                  WebkitTextStroke: "1px #3f3f46",
                }
              : { color: "#f4f4f5" }),
          }}
        >
          {text}
        </span>
        {/* Separator dot */}
        <span
          className="rounded-full bg-[#3f3f46] shrink-0 mx-8"
          style={{ width: 7, height: 7, position: "relative", top: -1 }}
        />
      </div>
    ))}
  </div>
);

export const Marquee = () => {
  return (
    <section
      aria-label="Marquee banner"
      className="relative w-full overflow-hidden bg-[#0d0d0e] border-t border-b border-[#27272a] py-7"
    >
      <div
        className="flex w-max"
        style={{
          animation: "marquee-scroll 28s linear infinite",
          willChange: "transform",
        }}
      >
        <MarqueeUnit />
        <MarqueeUnit />
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Marquee;