"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type TabId = "brews" | "bakery" | "brunch";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  tag?: string;
  image: string;
}

interface MenuCategory {
  id: TabId;
  label: string;
  items: MenuItem[];
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const MENU_DATA: MenuCategory[] = [
  {
    id: "brews",
    label: "Specialty Brews",
    items: [
      {
        name: "Single Origin Pour Over",
        description: "Ethiopia Yirgacheffe · light roast · floral",
        price: 280,
        tag: "Signature",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
      },
      {
        name: "Cold Brew Reserve",
        description: "18-hour steep · Guatemala · dark",
        price: 300,
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
      },
      {
        name: "Cortado",
        description: "Double ristretto · steamed whole milk",
        price: 240,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      },
      {
        name: "Oat Flat White",
        description: "Double shot · Oatly barista · microfoam",
        price: 260,
        tag: "Popular",
        image:
          "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=80",
      },
      {
        name: "Aeropress Black",
        description: "Kenya AA · bright · fruit-forward",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80",
      },
      {
        name: "Cascara Fizz",
        description: "Coffee cherry tea · soda · lemon",
        price: 270,
        tag: "Seasonal",
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
      },
    ],
  },
  {
    id: "bakery",
    label: "Artisanal Bakery",
    items: [
      {
        name: "Kouign-Amann",
        description: "Laminated dough · caramelised sugar crust",
        price: 180,
        tag: "House Favourite",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
      },
      {
        name: "Dark Rye Sourdough",
        description: "48-hour ferment · sunflower seeds",
        price: 160,
        image:
          "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80",
      },
      {
        name: "Almond Croissant",
        description: "Twice-baked · frangipane · toasted almonds",
        price: 200,
        tag: "Popular",
        image:
          "https://images.unsplash.com/photo-1630428764980-0d0f3c1a3c76?w=400&q=80",
      },
      {
        name: "Cardamom Knot",
        description: "Yeasted dough · green cardamom · pearl sugar",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80",
      },
      {
        name: "Chocolate Babka",
        description: "Dark 70% ganache · twisted brioche",
        price: 190,
        image:
          "https://images.unsplash.com/photo-1606101273945-e9eba89c918a?w=400&q=80",
      },
      {
        name: "Seasonal Tart",
        description: "Pâte sucrée · pastry cream · market fruit",
        price: 210,
        tag: "Seasonal",
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=400&q=80",
      },
    ],
  },
  {
    id: "brunch",
    label: "All-Day Brunch",
    items: [
      {
        name: "Shakshuka",
        description: "Spiced tomato · two eggs · sourdough toast",
        price: 380,
        tag: "Signature",
        image:
          "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&q=80",
      },
      {
        name: "Avocado Toast",
        description: "Dark rye · whipped ricotta · dukkah · chilli oil",
        price: 340,
        tag: "Popular",
        image:
          "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80",
      },
      {
        name: "Granola Bowl",
        description: "House granola · Greek yoghurt · seasonal compote",
        price: 280,
        image:
          "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80",
      },
      {
        name: "Egg & Gruyère Crêpe",
        description: "Buckwheat · Gruyère · chives · crème fraîche",
        price: 360,
        image:
          "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80",
      },
      {
        name: "Smoked Salmon Bagel",
        description: "House-cured · cream cheese · capers · pickled onion",
        price: 420,
        image:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
      },
      {
        name: "Banana Bread French Toast",
        description: "Thick-cut · brown butter · maple · sea salt",
        price: 310,
        tag: "New",
        image:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// HOOK: detect touch / pointer device
// ─────────────────────────────────────────────

function useIsTouchDevice(): boolean {
  // Always initialise as false so server HTML matches the client's first
  // render — the only safe approach with SSR. After hydration the effect
  // reads the real pointer type and does a single corrective re-render if
  // needed. The brief flash (touch device renders as desktop for one frame)
  // is imperceptible because it happens before paint.
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration correction for SSR-safe pointer detection
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isTouch;
}

// ─────────────────────────────────────────────
// CURSOR THUMBNAIL  (desktop-only)
// ─────────────────────────────────────────────

interface CursorThumbnailProps {
  src: string | null;
  visible: boolean;
  x: number;
  y: number;
}

const CursorThumbnail: React.FC<CursorThumbnailProps> = ({
  src,
  visible,
  x,
  y,
}) => {
  const springConfig = { stiffness: 520, damping: 38, mass: 0.6 };

  const motionX = useMotionValue(x);
  const motionY = useMotionValue(y);

  const springX = useSpring(motionX, springConfig);
  const springY = useSpring(motionY, springConfig);

  motionX.set(x);
  motionY.set(y);

  // Offset: 16px right of cursor, 152px up so the thumbnail
  // sits clearly above the pointer rather than overlapping text.
  const translateX = useTransform(springX, (v) => v + 16);
  const translateY = useTransform(springY, (v) => v - 152);

  return (
    <motion.div
      className="fixed top-0 left-0 z-100 pointer-events-none"
      style={{ x: translateX, y: translateY }}
    >
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.82,
          filter: visible ? "blur(0px)" : "blur(4px)",
        }}
        transition={{ duration: 0.22, ease: [0.32, 0, 0.18, 1] }}
        className="relative w-36 h-36 rounded-2xl overflow-hidden border border-[#27272a] shadow-2xl shadow-black/60"
      >
        {src && (
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            draggable={false}
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// TOUCH IMAGE PANEL  (mobile-only)
// Inline reveal that expands below the tapped row.
// ─────────────────────────────────────────────

interface TouchImagePanelProps {
  src: string;
  name: string;
}

const TouchImagePanel: React.FC<TouchImagePanelProps> = ({ src, name }) => (
  <motion.div
    key="touch-panel"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 160 }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.32, ease: [0.32, 0, 0.18, 1] }}
    className="overflow-hidden w-full"
  >
    <div className="relative w-full h-40 rounded-xl overflow-hidden my-2">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        draggable={false}
        unoptimized
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// MENU ITEM ROW
// ─────────────────────────────────────────────

interface MenuItemRowProps {
  item: MenuItem;
  index: number;
  // Desktop props
  onHover: (item: MenuItem | null) => void;
  onMouseMove: (x: number, y: number) => void;
  isHovered: boolean;
  // Touch props
  isTouch: boolean;
  isTapped: boolean;
  onTap: (name: string | null) => void;
}

const MenuItemRow: React.FC<MenuItemRowProps> = ({
  item,
  index,
  onHover,
  onMouseMove,
  isHovered,
  isTouch,
  isTapped,
  onTap,
}) => {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isTouch) onMouseMove(e.clientX, e.clientY);
    },
    [isTouch, onMouseMove]
  );

  const handleTap = useCallback(() => {
    if (!isTouch) return;
    onTap(isTapped ? null : item.name);
  }, [isTouch, isTapped, item.name, onTap]);

  const active = isTouch ? isTapped : isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.055,
        duration: 0.5,
        ease: [0.32, 0, 0.18, 1],
      }}
      // Desktop: cursor-none hides the system cursor so the
      // thumbnail feels like the "real" cursor.
      // Touch: default cursor, tap toggles the inline panel.
      className={isTouch ? "group relative" : "group relative cursor-none"}
      onMouseEnter={() => { if (!isTouch) onHover(item); }}
      onMouseLeave={() => { if (!isTouch) onHover(null); }}
      onMouseMove={handleMouseMove}
      onClick={handleTap}
    >
      <div
        className={`flex items-baseline gap-3 py-4 border-b transition-colors duration-300 ${
          active ? "border-[#3f3f46]" : "border-[#1f1f20]"
        }`}
      >
        <div className="flex flex-col min-w-0 shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className={`font-cormorant text-lg font-light transition-colors duration-200 ${
                active ? "text-[#f4f4f5]" : "text-[#d4d4d8]"
              }`}
            >
              {item.name}
            </span>

            {item.tag && (
              <span className="text-[8.5px] tracking-[0.18em] uppercase text-[#71717a] border border-[#27272a] px-1.5 py-0.5 font-inter font-light">
                {item.tag}
              </span>
            )}

            {/* Tap hint chevron — visible on touch only, rotates when open */}
            {isTouch && (
              <motion.span
                animate={{ rotate: isTapped ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="ml-auto text-[#52525b] text-xs select-none"
                aria-hidden="true"
              >
                ▾
              </motion.span>
            )}
          </div>

          <span className="text-[11px] font-inter font-light text-[#52525b] tracking-wide mt-0.5">
            {item.description}
          </span>
        </div>

        <div className="flex-1 min-w-4 flex items-end pb-1.75">
          <div
            className="w-full h-px transition-colors duration-300"
            style={{
              backgroundImage: active
                ? "repeating-linear-gradient(90deg, #3f3f46 0, #3f3f46 2px, transparent 0, transparent 6px)"
                : "repeating-linear-gradient(90deg, #27272a 0, #27272a 2px, transparent 0, transparent 6px)",
            }}
          />
        </div>

        <span
          className={`font-cormorant text-base font-light shrink-0 tabular-nums transition-colors duration-200 ${
            active ? "text-[#f4f4f5]" : "text-[#71717a]"
          }`}
        >
          ₹{item.price}
        </span>
      </div>

      {/* Inline image panel for touch devices */}
      {isTouch && (
        <AnimatePresence>
          {isTapped && (
            <TouchImagePanel src={item.image} name={item.name} />
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN MENU COMPONENT
// ─────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "brews", label: "Specialty Brews" },
  { id: "bakery", label: "Artisanal Bakery" },
  { id: "brunch", label: "All-Day Brunch" },
];

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("brews");

  // Desktop state
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Touch state — only one row expanded at a time
  const [tappedItemName, setTappedItemName] = useState<string | null>(null);

  const isTouch = useIsTouchDevice();

  const activeCategory = MENU_DATA.find((c) => c.id === activeTab)!;

  const handleTabChange = (id: TabId) => {
    if (id !== activeTab) {
      setHoveredItem(null);
      setTappedItemName(null);
      setActiveTab(id);
    }
  };

  const handleMouseMove = useCallback((x: number, y: number) => {
    setCursorPos({ x, y });
  }, []);

  const handleTap = useCallback((name: string | null) => {
    setTappedItemName(name);
  }, []);

  // Clear hover on scroll (desktop)
  useEffect(() => {
    if (isTouch) return;
    const handleScroll = () => setHoveredItem(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTouch]);

  // Clear tapped item when tab changes or user scrolls (touch)
  useEffect(() => {
    if (!isTouch) return;
    const handleScroll = () => setTappedItemName(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTouch]);

  return (
    <section
      id="menu"
      className="relative bg-[#0d0d0e] min-h-screen py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-[9.5px] tracking-[0.3em] uppercase text-[#52525b] font-inter font-light mb-3">
              The Ground
            </p>
            <h2 className="font-cormorant font-light text-[#f4f4f5] text-4xl">
              What we offer
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-1 mb-12 border-b border-[#1f1f20] pb-0"
          role="tablist"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-3.5 px-1 mr-6 ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16"
          >
            {activeCategory.items.map((item, i) => (
              <MenuItemRow
                key={item.name}
                item={item}
                index={i}
                onHover={setHoveredItem}
                onMouseMove={handleMouseMove}
                isHovered={hoveredItem?.name === item.name}
                isTouch={isTouch}
                isTapped={tappedItemName === item.name}
                onTap={handleTap}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cursor thumbnail only rendered on non-touch devices */}
      {!isTouch && (
        <CursorThumbnail
          src={hoveredItem?.image ?? null}
          visible={!!hoveredItem}
          x={cursorPos.x}
          y={cursorPos.y}
        />
      )}
    </section>
  );
};

export default Menu;