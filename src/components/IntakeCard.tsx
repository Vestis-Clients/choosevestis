"use client";

import { useEffect, useState } from "react";

// Real bottlenecks owners describe. The card types one, holds it, then moves to the next.
const PROBLEMS = [
  "Missing calls while I'm on a job",
  "Estimates go out and nobody follows up",
  "Leads live in three different apps",
  "I'm still doing all the scheduling",
  "We don't show up on Google Maps",
  "Too much paperwork after hours",
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-line py-3.5 text-[0.95rem]">
      <dt className="text-slate">{label}</dt>
      <dd className="min-h-[1.5rem] font-medium">{children}</dd>
    </div>
  );
}

export default function IntakeCard() {
  const [now, setNow] = useState<Date | null>(null);
  const [p, setP] = useState({ i: 0, chars: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!now || reduced) return;
    const full = PROBLEMS[p.i].length;
    const t = setTimeout(
      () => setP((s) => (s.chars < PROBLEMS[s.i].length ? { ...s, chars: s.chars + 1 } : { i: (s.i + 1) % PROBLEMS.length, chars: 0 })),
      p.chars < full ? 45 : 2800,
    );
    return () => clearTimeout(t);
  }, [now, p, reduced]);

  const ready = now !== null;
  const date = now?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const time = now?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const text = reduced ? PROBLEMS[0] : PROBLEMS[p.i].slice(0, p.chars);
  const typing = ready && !reduced && p.chars < PROBLEMS[p.i].length;

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      {/* a second card behind, for depth */}
      <div aria-hidden className="absolute inset-x-6 -bottom-3 top-6 rounded-xl border border-line bg-mist" />

      <div className="relative rounded-xl border border-line bg-white px-6 pb-6 pt-5 shadow-[0_1px_2px_rgba(21,25,30,0.04),0_24px_48px_-28px_rgba(21,25,30,0.28)]">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-[0.85rem] font-medium text-slate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy opacity-40 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-navy" />
            </span>
            New fit call request
          </p>
          <p className={`text-[0.85rem] tabular-nums text-slate transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>{time}</p>
        </div>
        <p className={`mt-1 text-[1.35rem] font-semibold tracking-tight transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
          {date || " "}
        </p>

        <dl className="mt-4">
          <Row label="Business">
            <span className="text-slate/70">Your company</span>
          </Row>
          <Row label="Trade">
            <span className="text-slate/70">Roofing, HVAC, plumbing…</span>
          </Row>
          <Row label="Bottleneck">
            <span className={typing ? "typing" : ""} aria-live="off">
              {text}
            </span>
          </Row>
        </dl>

        <div className="mt-2 rounded-lg bg-mist px-4 py-4">
          <p className="text-[0.82rem] font-medium text-slate">Plan</p>
          <ol className="mt-3 grid grid-cols-3 gap-2 text-[0.84rem]">
            {["Find the constraint", "Build the fix", "Measure progress"].map((s, i) => (
              <li key={s}>
                <span className={`block h-1 rounded-full ${i === 0 ? "bg-navy" : "bg-line"}`} />
                <span className={`mt-2 block leading-snug ${i === 0 ? "font-medium text-ink" : "text-slate"}`}>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[0.9rem] text-slate">
            Next step: <span className="font-medium text-ink">free 30-minute call</span>
          </p>
          <a href="#contact" className="shrink-0 rounded-md bg-navy px-4 py-2.5 text-[0.9rem] font-medium text-white hover:bg-navy-dark">
            Request yours
          </a>
        </div>
      </div>
    </div>
  );
}
