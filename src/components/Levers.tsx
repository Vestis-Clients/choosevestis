"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/** Growth: an estimate that gets followed up until it's won. */
function FollowUp({ go }: { go: boolean }) {
  const steps = [
    { d: "Mon", t: "Estimate sent", tone: "bg-navy" },
    { d: "Wed", t: "Text: any questions?", tone: "bg-navy" },
    { d: "Fri", t: "Call reminder", tone: "bg-navy" },
    { d: "Mon", t: "Job won", tone: "bg-[#1f9d63]" },
  ];
  return (
    <div className="relative rounded-xl bg-mist p-5">
      <div className="absolute bottom-9 left-[2.15rem] top-9 w-px bg-line" />
      <motion.div
        className="absolute left-[2.15rem] top-9 w-px origin-top bg-navy"
        style={{ bottom: "2.25rem" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: go ? 1 : 0 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
      />
      <ul className="relative grid gap-3.5">
        {steps.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.4, duration: 0.4 }}
            className="flex items-center gap-3.5"
          >
            <span className={`relative z-10 h-3.5 w-3.5 rounded-full border-[3px] border-mist ${s.tone} outline outline-1 outline-line`} />
            <span className="w-9 text-[0.8rem] text-slate">{s.d}</span>
            <span className={`rounded-md bg-white px-3 py-1.5 text-[0.86rem] shadow-sm ${i === 3 ? "font-semibold text-[#16794b]" : ""}`}>{s.t}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Efficiency: your tools wired into one flow. */
function Wiring({ go }: { go: boolean }) {
  const nodes = [
    { label: "Calls", x: 15, y: 22 },
    { label: "CRM", x: 15, y: 78 },
    { label: "Quotes", x: 85, y: 22 },
    { label: "Schedule", x: 85, y: 78 },
  ];
  return (
    <div className="relative aspect-[16/10] rounded-xl bg-mist">
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
      <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-navy text-white shadow-[0_10px_24px_-8px_rgba(29,58,92,0.6)]">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
          <path d="M8 24 23 9M11 8h13v13" />
        </svg>
      </span>
    </div>
  );
}

export default function Levers() {
  const ref = useRef<HTMLDivElement>(null);
  const go = useInView(ref, { once: true, amount: 0.35 });

  const levers = [
    {
      name: "Growth",
      title: "Turn interest into jobs.",
      points: [
        ["Get found.", "Improve your website, local visibility, and lead capture."],
        ["Follow through.", "Build faster lead response and more consistent estimate follow-up."],
      ],
      art: <FollowUp go={go} />,
    },
    {
      name: "Efficiency",
      title: "Make work flow better.",
      points: [
        ["Connect the dots.", "Link your CRM, quoting, and job handoffs."],
        ["Cut the busywork.", "Use practical workflows and AI automation to reduce manual tasks."],
      ],
      art: <Wiring go={go} />,
    },
  ];

  return (
    <div ref={ref} className="mt-14 grid gap-5 md:grid-cols-2">
      {levers.map((l, i) => (
        <motion.article
          key={l.name}
          initial={{ opacity: 0, y: 24 }}
          animate={go ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8"
        >
          {l.art}
          <p className="mt-7 text-[0.9rem] font-medium text-navy">{l.name}</p>
          <h3 className="mt-1.5 text-[1.6rem] font-semibold tracking-tight">{l.title}</h3>
          <ul className="mt-5 grid gap-3.5">
            {l.points.map(([lead, rest]) => (
              <li key={lead} className="flex gap-3 text-[1.02rem] leading-relaxed text-slate">
                <Check />
                <span>
                  <strong className="font-semibold text-ink">{lead}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
