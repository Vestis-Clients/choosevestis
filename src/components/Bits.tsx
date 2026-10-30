"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";

/** Header that gains a border and blur once the page scrolls. */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));
  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-line bg-white/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}

/** Counts up to a number the first time it scrolls into view. */
export function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(to);
  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, to, { duration: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toLocaleString("en-US")}
    </span>
  );
}

/** Fade-up once on first view. Used sparingly for section headings. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Hero headline: words rise in one after another, once. */
export function HeroTitle({ lines, className }: { lines: string[]; className?: string }) {
  let n = 0;
  return (
    <h1 className={className}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split(" ").map((w) => {
            const i = n++;
            return (
              <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
