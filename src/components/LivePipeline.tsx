"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const STAGES = ["New lead", "Contacted", "Estimate sent", "Booked"] as const;

const LEADS = [
  { name: "Johnson", job: "Roof leak over garage", amount: "$8,450", trade: "Roofing" },
  { name: "Martinez", job: "Water heater replacement", amount: "$2,180", trade: "Plumbing" },
  { name: "Nguyen", job: "Full HVAC replacement", amount: "$11,900", trade: "HVAC" },
];

// Background jobs that sit in each column so the board looks like a real week.
const OTHERS: Record<number, { name: string; job: string }[]> = {
  0: [{ name: "Patel", job: "AC not cooling" }],
  1: [{ name: "Rivera", job: "Panel upgrade" }],
  2: [
    { name: "Kim", job: "Bathroom remodel" },
    { name: "Brooks", job: "Gutter guards" },
  ],
  3: [{ name: "Owens", job: "Deck repair" }],
};

const STEP_MS = 2300;
const HOLD_MS = 3200;

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const t = () => setNow(new Date());
    t();
    const id = setInterval(t, 20_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function statusFor(stage: number, lead: (typeof LEADS)[number], now: Date) {
  const booked = new Date(now);
  booked.setDate(booked.getDate() + (booked.getDay() >= 4 ? 4 : 2));
  const day = booked.toLocaleDateString("en-US", { weekday: "short" });
  switch (stage) {
    case 0:
      return { dot: "bg-[#d64545]", text: `Missed call, ${fmtTime(now)}` };
    case 1:
      return { dot: "bg-[#d99a1e]", text: "Auto-text sent in 1 min" };
    case 2:
      return { dot: "bg-navy", text: `${lead.amount} estimate sent` };
    default:
      return { dot: "bg-[#1f9d63]", text: `Booked ${day}, 8:00 AM` };
  }
}

const NOTES = [
  { icon: "call", tone: "bg-[#fdeaea] text-[#c23a3a]", title: "Missed call", body: (l: string) => `${l} called while you were on a roof.` },
  { icon: "text", tone: "bg-[#fdf3e1] text-[#a86f0b]", title: "Text sent automatically", body: () => `"Sorry we missed you! What can we help with?"` },
  { icon: "doc", tone: "bg-navy-tint text-navy", title: "Estimate follow-up", body: () => "Day 2 reminder scheduled. Nothing to remember." },
  { icon: "check", tone: "bg-[#e3f5ec] text-[#16794b]", title: "Job booked", body: (l: string) => `${l} picked a time. It's on the calendar.` },
];

function Icon({ name }: { name: string }) {
  const p: Record<string, React.ReactNode> = {
    call: <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z" />,
    text: <path d="M4 5h16v11H9l-5 4z" />,
    doc: <path d="M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7M9 17h5" />,
    check: <path d="M4 12.5l5 5L20 6" />,
    star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
}

function Float({
  depth,
  mx,
  my,
  className,
  bob = 0,
  children,
}: {
  depth: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
  className: string;
  bob?: number;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v: number) => v * depth);
  const y = useTransform(my, (v: number) => v * depth);
  const reduced = useReducedMotion();
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${className}`}>
      <motion.div
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5 + bob, repeat: Infinity, ease: "easeInOut", delay: bob * 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Notification({ i, lead }: { i: number; lead: string }) {
  const n = NOTES[i];
  return (
    <motion.div
      key={`${lead}-${i}`}
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="w-[17.5rem] rounded-2xl border border-white/70 bg-white/85 p-3.5 shadow-[0_20px_40px_-18px_rgba(21,25,30,0.35),0_2px_6px_rgba(21,25,30,0.06)] backdrop-blur-xl"
    >
      <div className="flex gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${n.tone}`}>
          <Icon name={n.icon} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[0.88rem] font-semibold">{n.title}</p>
            <p className="text-[0.75rem] text-slate">now</p>
          </div>
          <p className="mt-0.5 text-[0.84rem] leading-snug text-slate">{n.body(lead)}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LivePipeline() {
  const now = useClock();
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [leadIdx, setLeadIdx] = useState(0);

  // Move the featured job one column at a time, hold on Booked, then start the next lead.
  useEffect(() => {
    if (!now || reduced) return;
    const t = setTimeout(
      () => {
        if (stage < 3) setStage((s) => s + 1);
        else {
          setStage(0);
          setLeadIdx((i) => (i + 1) % LEADS.length);
        }
      },
      stage < 3 ? STEP_MS : HOLD_MS,
    );
    return () => clearTimeout(t);
  }, [now, stage, reduced]);

  const shown = reduced ? 3 : stage;
  const lead = LEADS[leadIdx];

  // Mouse parallax for the floating cards
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  const today = useMemo(() => now?.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }), [now]);

  return (
    <div
      className="relative mx-auto w-full max-w-[64rem]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {/* soft glow behind the board */}
      <div aria-hidden className="absolute inset-x-[10%] top-[12%] h-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(29,58,92,0.14),transparent)] blur-2xl" />

      {/* The board */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ transformPerspective: 1400 }}
        className="relative z-10 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-40px_rgba(21,25,30,0.4),0_2px_6px_rgba(21,25,30,0.05)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line bg-[#fafbfc] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e5e9]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e5e9]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e5e9]" />
            <p className="ml-3 text-[0.85rem] font-medium">Lead board</p>
          </div>
          <p className="flex items-center gap-2 text-[0.8rem] text-slate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d63] opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f9d63]" />
            </span>
            <span className={now ? "" : "opacity-0"}>Live, {today}</span>
          </p>
        </div>

        <LayoutGroup>
          {/* Desktop: four columns */}
          <div className="hidden grid-cols-4 gap-3 p-4 md:grid">
            {STAGES.map((s, col) => (
              <div key={s} className="h-[22rem] overflow-hidden rounded-xl bg-mist p-2.5">
                <div className="flex items-center justify-between px-1.5 pb-2.5 pt-1">
                  <p className="text-[0.8rem] font-semibold text-slate">{s}</p>
                  <p className="text-[0.75rem] tabular-nums text-slate">{OTHERS[col].length + (shown === col ? 1 : 0)}</p>
                </div>
                <div className="grid gap-2">
                  {shown === col && now && (
                    <motion.div
                      layoutId="featured"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className="rounded-lg border-[1.5px] border-navy bg-white p-3 shadow-[0_10px_24px_-12px_rgba(29,58,92,0.5)]"
                    >
                      <p className="text-[0.86rem] font-semibold">{lead.name}</p>
                      <p className="text-[0.8rem] text-slate">{lead.job}</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={col}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, delay: 0.25 }}
                          className="mt-2 flex items-center gap-1.5 text-[0.76rem] font-medium"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusFor(col, lead, now).dot}`} />
                          {statusFor(col, lead, now).text}
                        </motion.p>
                      </AnimatePresence>
                    </motion.div>
                  )}
                  {OTHERS[col].map((o) => (
                    <div key={o.name} className="rounded-lg border border-line bg-white p-3">
                      <p className="text-[0.86rem] font-medium text-ink/80">{o.name}</p>
                      <p className="text-[0.8rem] text-slate">{o.job}</p>
                      <div className="mt-2 h-1.5 w-2/3 rounded-full bg-mist" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: one card with a stage track */}
          <div className="p-4 md:hidden">
            <div className="grid grid-cols-4 gap-1.5">
              {STAGES.map((s, i) => (
                <div key={s}>
                  <div className="h-1 overflow-hidden rounded-full bg-mist">
                    <motion.div className="h-full bg-navy" initial={false} animate={{ width: i <= shown ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                  </div>
                  <p className={`mt-1.5 text-[0.68rem] leading-tight ${i === shown ? "font-semibold text-ink" : "text-slate"}`}>{s}</p>
                </div>
              ))}
            </div>
            {now && (
              <div className="mt-4 min-h-[7.25rem] rounded-lg border-[1.5px] border-navy bg-white p-3.5">
                <p className="font-semibold">{lead.name}</p>
                <p className="text-[0.88rem] text-slate">{lead.job}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[0.82rem] font-medium">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusFor(shown, lead, now).dot}`} />
                  {statusFor(shown, lead, now).text}
                </p>
              </div>
            )}
            <div className="mt-3 h-[6.5rem]">
              <AnimatePresence mode="wait">{now && <Notification i={shown} lead={lead.name} key={`${leadIdx}-${shown}`} />}</AnimatePresence>
            </div>
          </div>
        </LayoutGroup>
      </motion.div>

      {/* Floating cards (desktop) */}
      <div className="pointer-events-none hidden lg:block">
        <Float depth={-26} mx={mx} my={my} className="-right-16 top-6" bob={0}>
          <div className="min-h-[5.5rem]">
            <AnimatePresence mode="wait">{now && <Notification i={shown} lead={lead.name} key={`${leadIdx}-${shown}`} />}</AnimatePresence>
          </div>
        </Float>

        <Float depth={34} mx={mx} my={my} className="-left-20 bottom-14" bob={1.5}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="w-[13.5rem] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_20px_40px_-18px_rgba(21,25,30,0.35)] backdrop-blur-xl"
          >
            <p className="text-[0.78rem] font-medium text-slate">This lead</p>
            <p className="mt-1 text-[0.95rem] font-semibold">{lead.trade}</p>
            <div className="mt-3 grid gap-1.5">
              {["Answered", "Quoted", "Followed up", "Booked"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-[0.8rem]">
                  <motion.span
                    initial={false}
                    animate={{ backgroundColor: i <= shown ? "#1d3a5c" : "#e2e5e9" }}
                    className="grid h-4 w-4 place-items-center rounded-full text-white"
                  >
                    {i <= shown && (
                      <svg viewBox="0 0 20 20" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                    )}
                  </motion.span>
                  <span className={i <= shown ? "text-ink" : "text-slate"}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Float>

        <Float depth={-18} mx={mx} my={my} className="-left-12 -top-10" bob={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-center gap-3 rounded-full border border-white/70 bg-white/90 py-2 pl-2 pr-4 shadow-[0_16px_32px_-16px_rgba(21,25,30,0.35)] backdrop-blur-xl"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff6dc] text-[#b7860b]">
              <Icon name="star" />
            </span>
            <span className="text-[0.84rem]">
              <span className="font-semibold">New 5-star review</span>
              <span className="text-slate"> requested after the job</span>
            </span>
          </motion.div>
        </Float>
      </div>

      <p className="mt-6 text-center text-[0.8rem] text-slate lg:mt-12">An example of a lead flow I set up. Names are illustrative.</p>
    </div>
  );
}
