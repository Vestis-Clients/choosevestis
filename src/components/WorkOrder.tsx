"use client";

import { useEffect, useState } from "react";

// What owners actually write on the ticket. The "Problem reported" line cycles through these.
const PROBLEMS = [
  "Missing calls while I'm on a job",
  "Estimates go out, nobody follows up",
  "Leads live in 3 different apps",
  "I'm still doing all the scheduling",
  "Can't find us on Google Maps",
  "Too much paperwork after hours",
];

export function workOrderNumber(d: Date) {
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}-${day}`;
}

function usePrefersReducedMotion() {
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

function Field({ label, children, className = "" }: { label: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`border-b border-r border-rule px-3 pb-1.5 pt-1 ${className}`}>
      <div className="cell-label">{label}</div>
      <div className="min-h-[1.9rem] font-hand text-[1.15rem] leading-[1.9rem] text-pen">{children}</div>
    </div>
  );
}

export default function WorkOrder() {
  const [now, setNow] = useState<Date | null>(null);
  const [problem, setProblem] = useState({ i: 0, chars: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  // Write each problem out by hand, hold it, then move to the next.
  useEffect(() => {
    if (!now || reduced) return;
    const full = PROBLEMS[problem.i].length;
    const delay = problem.chars < full ? 55 : 2600;
    const t = setTimeout(() => {
      setProblem((p) =>
        p.chars < PROBLEMS[p.i].length ? { ...p, chars: p.chars + 1 } : { i: (p.i + 1) % PROBLEMS.length, chars: 0 },
      );
    }, delay);
    return () => clearTimeout(t);
  }, [now, problem, reduced]);

  const ready = now !== null;
  const date = now?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const time = now?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
  const text = reduced ? PROBLEMS[0] : PROBLEMS[problem.i].slice(0, problem.chars);
  const writing = ready && !reduced && problem.chars < PROBLEMS[problem.i].length;

  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      {/* yellow carbon copy underneath */}
      <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-3 rotate-[1.4deg] bg-carbon shadow-[0_10px_24px_-14px_rgba(28,31,34,0.5)]" />

      <div className="sheet perforated relative pt-3">
        {/* header */}
        <div className="flex items-end justify-between gap-4 px-4 pb-3 pt-3">
          <div>
            <p className="text-[0.8rem] font-semibold text-steel">Vestis Solutions LLC</p>
            <p className="condensed text-[2rem] font-extrabold uppercase leading-none tracking-tight">Work order</p>
          </div>
          <p className="text-right text-[0.8rem] text-steel">
            No.
            <span className="ml-1 text-[1.05rem] font-semibold tabular-nums text-stamp" suppressHydrationWarning>
              {ready ? workOrderNumber(now) : "----–--"}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-6 border-l border-t border-rule">
          <Field label="Date" className="col-span-4">
            <span className={`transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>{date}</span>
          </Field>
          <Field label="Time in" className="col-span-2">
            <span className={`transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>{time}</span>
          </Field>
          <Field label="Customer" className="col-span-3">
            <span className="text-steel/70">Your company</span>
          </Field>
          <Field label="Trade" className="col-span-3">
            <span className="text-steel/70">Your trade</span>
          </Field>
          <Field label="Problem reported" className="col-span-6">
            <span className={writing ? "writing" : ""} aria-live="off">
              {text}
            </span>
          </Field>

          <div className="col-span-6 border-b border-r border-rule px-3 pb-3 pt-1">
            <div className="cell-label">Work to be done</div>
            <ul className="mt-1.5 grid gap-1.5 text-[0.95rem]">
              {[
                ["Find the constraint", true],
                ["Build the fix", false],
                ["Measure progress", false],
              ].map(([label, done]) => (
                <li key={label as string} className="flex items-center gap-2.5">
                  <span className="relative grid h-[1.05rem] w-[1.05rem] place-items-center border-[1.5px] border-graphite bg-white">
                    {done && (
                      <svg viewBox="0 0 20 20" className="absolute -top-1.5 left-0 h-6 w-6 text-pen" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M3 11l4 5L18 2" />
                      </svg>
                    )}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <Field label="Assigned to" className="col-span-3">
            Alex
          </Field>
          <Field label="Rate" className="col-span-3">
            <span className="font-sans text-[0.95rem] font-semibold text-graphite">$3,000 / mo</span>
          </Field>
        </div>

        <div className="flex items-end justify-between gap-4 px-4 pb-4 pt-4">
          <div className="min-w-0 flex-1">
            <div className="h-7 border-b border-graphite" />
            <p className="cell-label mt-1">Customer signature</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-graphite px-4 py-2.5 text-[0.92rem] font-semibold text-white hover:bg-asphalt"
          >
            Book the fit call
          </a>
        </div>

        {ready && (
          <div
            aria-hidden
            className="stamp stamp-in pointer-events-none absolute right-5 top-[56%] px-3 py-1 text-center text-[1.15rem] leading-tight"
            style={{ ["--stamp-rot" as string]: "rotate(-9deg)", transform: "rotate(-9deg)" }}
          >
            First call
            <br />
            free
          </div>
        )}
      </div>
    </div>
  );
}
