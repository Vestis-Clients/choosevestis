"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";

const STEPS = [
  { from: 0, title: "Find the constraint", when: "Day 1", body: "Set a baseline and agree on the highest-impact priority." },
  { from: 8, title: "Build the fix", when: "Then", body: "Implement one scoped improvement at a time." },
  { from: 30, title: "Measure progress", when: "Every 30 days", body: "Track conversion, time saved, or gross profit on a monthly scorecard." },
];

const MILESTONES = [
  { day: 1, label: "Baseline set" },
  { day: 5, label: "Priority agreed" },
  { day: 21, label: "First fix live" },
  { day: 30, label: "Scorecard, month 1" },
  { day: 60, label: "Scorecard, month 2" },
  { day: 90, label: "Scorecard, month 3" },
];

export default function NinetyDays() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const dayMV = useTransform(smooth, [0.05, 0.92], [0, 90], { clamp: true });
  const width = useTransform(dayMV, (d) => `${(d / 90) * 100}%`);
  const [day, setDay] = useState(0);
  useMotionValueEvent(dayMV, "change", (v) => setDay(Math.round(v)));

  const active = day >= 30 ? 2 : day >= 8 ? 1 : 0;

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center py-12">
        <div className="mx-auto grid w-full max-w-[74rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em]">How the 90 days run.</h2>
            <p className="mt-3 text-[1.05rem] text-slate">Keep scrolling to move through the partnership.</p>

            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-[0.95rem] font-medium text-slate">Day</span>
              <span className="min-w-[1.25em] text-[clamp(4.5rem,10vw,7rem)] font-semibold leading-[0.85] tracking-[-0.05em] tabular-nums">{day}</span>
              <span className="text-[0.95rem] text-slate">of 90</span>
            </div>
            <div className="relative mt-6 h-2 overflow-hidden rounded-full bg-line">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-navy" style={{ width }} />
            </div>
            <div className="mt-2 flex justify-between text-[0.78rem] tabular-nums text-slate">
              <span>0</span>
              <span>30</span>
              <span>60</span>
              <span>90</span>
            </div>

            <ol className="mt-10 grid gap-3">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={`rounded-xl border p-5 transition-all duration-500 ${
                    i === active ? "border-navy bg-white shadow-[0_16px_32px_-20px_rgba(29,58,92,0.45)]" : "border-line bg-transparent opacity-55"
                  }`}
                >
                  <p className="text-[0.85rem] font-medium text-slate">
                    Step {i + 1}, {s.when.toLowerCase()}
                  </p>
                  <p className="mt-0.5 text-[1.2rem] font-semibold tracking-tight">{s.title}</p>
                  <p className={`overflow-hidden text-slate transition-all duration-500 ${i === active ? "mt-1.5 max-h-20" : "max-h-0"}`}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Scorecard that fills in as the days pass */}
          <div className="hidden items-center lg:flex">
            <div className="w-full rounded-2xl border border-line bg-white p-7 shadow-[0_40px_80px_-48px_rgba(21,25,30,0.45)]">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Partnership checklist</p>
                <p className="rounded-full bg-mist px-3 py-1 text-[0.8rem] tabular-nums text-slate">
                  {MILESTONES.filter((m) => day >= m.day).length} of {MILESTONES.length}
                </p>
              </div>
              <ul className="mt-6 grid gap-1">
                {MILESTONES.map((m) => {
                  const done = day >= m.day;
                  return (
                    <li key={m.label} className="flex items-center gap-4 rounded-lg px-2 py-3">
                      <motion.span
                        initial={false}
                        animate={{ scale: done ? [1, 1.25, 1] : 1, backgroundColor: done ? "#1d3a5c" : "#ffffff", borderColor: done ? "#1d3a5c" : "#c9ced5" }}
                        transition={{ duration: 0.35 }}
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-[1.5px] text-white"
                      >
                        {done && (
                          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 10.5l4 4 8-9" />
                          </svg>
                        )}
                      </motion.span>
                      <span className={`flex-1 transition-colors ${done ? "font-medium text-ink" : "text-slate"}`}>{m.label}</span>
                      <span className="text-[0.82rem] tabular-nums text-slate">Day {m.day}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
