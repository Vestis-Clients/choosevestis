"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView } from "motion/react";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

const ART = "relative h-[18.5rem] overflow-hidden rounded-xl bg-mist p-5";

/** 1. More leads: the business climbs the search results and gets named in an AI answer. */
function SearchRank({ go }: { go: boolean }) {
  const [up, setUp] = useState(false);
  useEffect(() => {
    if (!go) return;
    const t = setTimeout(() => setUp(true), 900);
    return () => clearTimeout(t);
  }, [go]);
  const others = [
    { id: "a", name: "Other company", url: "othercompany.com" },
    { id: "b", name: "Another listing", url: "directory.com" },
  ];
  const you = { id: "you", name: "Your business", url: "yourbusiness.com", you: true };
  const order = up ? [you, ...others] : [...others, you];
  return (
    <div className={ART}>
      <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[0.82rem] shadow-sm">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <span className="text-ink">best roofer near me</span>
      </div>
      <LayoutGroup>
        <ul className="mt-3 grid gap-1.5">
          {order.map((r, i) => (
            <motion.li
              layout
              key={r.id}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 ${"you" in r ? "border-[1.5px] border-navy bg-white shadow-[0_8px_20px_-12px_rgba(29,58,92,0.55)]" : "border border-line bg-white/70"}`}
            >
              <span className="w-4 text-[0.75rem] tabular-nums text-slate">{i + 1}</span>
              <span className="min-w-0">
                <span className={`block truncate text-[0.84rem] ${"you" in r ? "font-semibold text-ink" : "text-ink/70"}`}>{r.name}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </LayoutGroup>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={up ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-3 rounded-lg border border-line bg-white px-3 py-2.5"
      >
        <p className="flex items-center gap-1.5 text-[0.72rem] font-medium text-slate">
          <span className="grid h-4 w-4 place-items-center rounded bg-navy text-[0.55rem] font-bold text-white">AI</span>
          ChatGPT / Gemini answer
        </p>
        <p className="mt-1 text-[0.8rem] leading-snug text-ink">
          A good option nearby is <span className="font-semibold">Your business</span>, known for fast, honest work.
        </p>
      </motion.div>
    </div>
  );
}

/** 2. Sales process: more of the leads make it all the way to won. */
function Funnel({ go }: { go: boolean }) {
  const rows = [
    { label: "Leads", before: 100, after: 100 },
    { label: "Answered fast", before: 55, after: 92 },
    { label: "Proposal sent", before: 35, after: 74 },
    { label: "Won", before: 18, after: 52 },
  ];
  return (
    <div className={ART}>
      <div className="grid gap-4 pt-1">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-[0.8rem]">
              <span className={i === rows.length - 1 ? "font-semibold text-[#16794b]" : "text-ink"}>{r.label}</span>
            </div>
            <div className="relative mt-1.5 h-3 overflow-hidden rounded-full bg-white">
              <div className="absolute inset-y-0 left-0 rounded-full bg-line" style={{ width: `${r.before}%` }} />
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${i === rows.length - 1 ? "bg-[#1f9d63]" : "bg-navy"}`}
                initial={{ width: `${r.before}%` }}
                animate={{ width: go ? `${r.after}%` : `${r.before}%` }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-4 text-[0.72rem] text-slate">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-line" />Leaky process</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy" />Fixed process</span>
      </p>
    </div>
  );
}

/** 3. Systems: the tools the business already uses, wired into one flow. */
function Wiring({ go }: { go: boolean }) {
  const nodes = [
    { label: "CRM", x: 17, y: 22 },
    { label: "Website", x: 17, y: 78 },
    { label: "Projects", x: 83, y: 22 },
    { label: "Slack", x: 83, y: 78 },
  ];
  return (
    <div className={`${ART} p-0`}>
      <svg viewBox="0 0 100 62.5" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {nodes.map((n, i) => {
          const y = (n.y / 100) * 62.5;
          const d = `M50 31.25 C ${(50 + n.x) / 2} 31.25, ${(50 + n.x) / 2} ${y}, ${n.x} ${y}`;
          return (
            <g key={n.label}>
              <path d={d} fill="none" stroke="#e2e5e9" strokeWidth="0.6" />
              <motion.path
                d={d}
                fill="none"
                stroke="#1d3a5c"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: go ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.25, ease: "easeInOut" }}
              />
              {go && (
                <motion.circle
                  r="0.9"
                  fill="#1d3a5c"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.2, delay: 1.6 + i * 0.5, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                  style={{ offsetPath: `path("${d}")` }}
                />
              )}
            </g>
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <motion.span
          key={n.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={go ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.25 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-line bg-white px-2.5 py-1.5 text-[0.8rem] font-medium shadow-sm"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </motion.span>
      ))}
      <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-navy text-[0.8rem] font-bold text-white shadow-[0_10px_24px_-8px_rgba(29,58,92,0.6)]">
        AI
      </span>
    </div>
  );
}

/** 4. Culture and conviction: the owner's two decisions, everything else handled. */
function Decisions({ go }: { go: boolean }) {
  const two = ["Raise service-call pricing", "Promote a crew lead"];
  const handled = ["Vendor reply", "Schedule changes", "Supply order", "Invoice follow-up"];
  return (
    <div className={ART}>
      <p className="text-[0.78rem] font-medium text-slate">Today&apos;s two decisions</p>
      <ul className="mt-2.5 grid gap-2">
        {two.map((d, i) => (
          <li key={d} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2.5">
            <motion.span
              initial={false}
              animate={{ backgroundColor: go ? "#1d3a5c" : "#ffffff", borderColor: go ? "#1d3a5c" : "#c9ced5" }}
              transition={{ delay: 0.8 + i * 0.6, duration: 0.3 }}
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-[1.5px] text-white"
            >
              <motion.svg initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ delay: 0.9 + i * 0.6 }} viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10.5l4 4 8-9" />
              </motion.svg>
            </motion.span>
            <span className="text-[0.86rem] font-semibold text-ink">{d}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.78rem] font-medium text-slate">Handled by the team</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {handled.map((h, i) => (
          <motion.span
            key={h}
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 + i * 0.15 }}
            className="rounded-full border border-line bg-white/70 px-2.5 py-1 text-[0.74rem] text-slate"
          >
            {h}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  {
    name: "More leads",
    title: "Get found on Google, ChatGPT and Gemini.",
    points: [
      ["SEO.", "A new website, or a rebuild of yours, set up to rank for the jobs you actually want."],
      ["AEO.", "Show up in AI answers when customers ask who to call."],
    ],
    Art: SearchRank,
  },
  {
    name: "Sales process",
    title: "Turn more of those leads into jobs.",
    points: [
      ["Respond faster.", "Every lead answered and followed up, not just the easy ones."],
      ["Close better.", "Clear proposals and a sales process your team can repeat."],
    ],
    Art: Funnel,
  },
  {
    name: "Systems",
    title: "Make your tools talk to each other.",
    points: [
      ["Connected.", "Your CRM, project management, Slack and website working as one. No double entry."],
      ["AI native.", "Practical AI and automation where it saves real hours. I work with the tools you already use."],
    ],
    Art: Wiring,
  },
  {
    name: "Culture and conviction",
    title: "Lead with conviction.",
    points: [
      ["Clear values.", "A culture and accountability that hold up when you're not in the room."],
      ["Two decisions a day.", "Your job is to make the one or two most important decisions each day. I help you find them."],
    ],
    Art: Decisions,
  },
];

function Card({ c, i }: { c: (typeof CARDS)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const go = useInView(ref, { once: true, amount: 0.3 });
  const { name, title, points, Art } = c;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <p className="text-[1.2rem] font-semibold tracking-tight text-navy">
        {i + 1}. {name}
      </p>
      <h3 className="mt-1 text-[1.55rem] font-semibold leading-tight tracking-tight">{title}</h3>
      <ul className="mt-5 grid gap-3.5">
        {points.map(([lead, rest]) => (
          <li key={lead} className="flex gap-3 text-[1.02rem] leading-relaxed text-slate">
            <Check />
            <span>
              <strong className="font-semibold text-ink">{lead}</strong> {rest}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Art go={go} />
      </div>
    </motion.article>
  );
}

export default function Levers() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {CARDS.map((c, i) => (
        <Card key={c.name} c={c} i={i} />
      ))}
    </div>
  );
}
