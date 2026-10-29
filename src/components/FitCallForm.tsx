"use client";

import { useEffect, useRef, useState } from "react";
import { workOrderNumber } from "./WorkOrder";

const PROBLEMS = [
  "Missed calls and slow lead response",
  "Estimates that never get followed up",
  "Not showing up on Google",
  "Scheduling and job handoffs",
  "Too much paperwork and admin",
  "Something else",
];

const CONTACT_PREFS = ["Call", "Text", "Email", "WhatsApp"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string } | { kind: "error"; message: string };

const input =
  "w-full bg-transparent pb-1 pt-0.5 text-[1.05rem] text-graphite placeholder:text-[#a2a8ac] focus:outline-none";

function Cell({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label
      className={`block border-b border-r border-rule px-3.5 pt-2 focus-within:bg-[#fbffe0] focus-within:shadow-[inset_0_-3px_0_var(--color-graphite)] ${
        error ? "bg-[#fff1ee]" : ""
      } ${className}`}
    >
      <span className="cell-label block">{label}</span>
      {children}
      {error && <span className="block pb-2 text-[0.82rem] font-medium text-stamp">{error}</span>}
    </label>
  );
}

function Box({ checked, round = false }: { checked: boolean; round?: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center border-2 border-graphite bg-white ${round ? "rounded-full" : ""}`}
    >
      {checked &&
        (round ? (
          <span className="h-2 w-2 rounded-full bg-graphite" />
        ) : (
          <svg viewBox="0 0 20 20" className="absolute -top-2 left-0 h-6 w-6 text-pen" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l4 5L18 2" />
          </svg>
        ))}
    </span>
  );
}

export default function FitCallForm() {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [problems, setProblems] = useState<string[]>([]);
  const [pref, setPref] = useState("Call");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function toggle(p: string) {
    setProblems((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      details: String(fd.get("details") || "").trim(),
      bottleneck: problems.join("; "),
      contactPref: pref,
      website: String(fd.get("website") || ""),
      elapsedMs: Date.now() - started.current,
    };

    const next: Record<string, string> = {};
    if (!data.name) next.name = "Add your name.";
    if (!data.phone && !data.email) next.phone = "Add a phone number or email.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Check the email address.";
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) next.phone = "Use a 10-digit number.";
    if (!problems.length && !data.details) next.problems = "Check at least one box, or describe it below.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "The work order didn't go through.");
      setStatus({ kind: "sent", name: data.name.split(" ")[0] });
    } catch (err) {
      setStatus({
        kind: "error",
        message: `${err instanceof Error ? err.message : "The work order didn't go through."} Try again, or tap Text Alex in the corner.`,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="sheet perforated relative overflow-hidden px-7 pb-10 pt-10">
        <p className="condensed text-[2rem] font-extrabold uppercase leading-none">Work order {workOrderNumber(new Date())}</p>
        <p className="mt-4 max-w-[28rem] text-[1.08rem] leading-relaxed text-steel">
          Thanks, {status.name}. I&apos;ll reach out by {pref.toLowerCase()} within one business day to set up your fit call.
        </p>
        <div
          aria-hidden
          className="stamp stamp-in absolute right-6 top-6 px-3 py-1 text-[1.6rem]"
          style={{ ["--stamp-rot" as string]: "rotate(-10deg)", transform: "rotate(-10deg)" }}
        >
          Received
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="sheet perforated relative pt-3">
      <div className="flex items-end justify-between gap-4 px-4 pb-3 pt-3 sm:px-5">
        <p className="condensed text-[1.8rem] font-extrabold uppercase leading-none">Open a work order</p>
        <p className="hidden text-[0.85rem] text-steel sm:block">Takes about a minute</p>
      </div>

      <div className="grid grid-cols-1 border-l border-t border-rule sm:grid-cols-2">
        <Cell label="Your name" error={errors.name}>
          <input name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} />
        </Cell>
        <Cell label="Company and trade (optional)">
          <input name="business" autoComplete="organization" className={input} placeholder="Carter Plumbing, plumbing" />
        </Cell>
        <Cell label="Phone" error={errors.phone}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input} aria-invalid={!!errors.phone} />
        </Cell>
        <Cell label="Email" error={errors.email}>
          <input name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} />
        </Cell>

        <fieldset className={`border-b border-r border-rule px-3.5 pb-3.5 pt-2 sm:col-span-2 ${errors.problems ? "bg-[#fff1ee]" : ""}`}>
          <legend className="sr-only">Problem reported</legend>
          <span className="cell-label block" aria-hidden>
            Problem reported (check all that apply)
          </span>
          <div className="mt-2.5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {PROBLEMS.map((p) => {
              const on = problems.includes(p);
              return (
                <label key={p} className="flex cursor-pointer items-center gap-3 text-[0.98rem]">
                  <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(p)} />
                  <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-graphite">
                    <Box checked={on} />
                  </span>
                  {p}
                </label>
              );
            })}
          </div>
          {errors.problems && <p className="mt-2 text-[0.82rem] font-medium text-stamp">{errors.problems}</p>}
        </fieldset>

        <Cell label="Notes (optional)" className="sm:col-span-2">
          <textarea
            name="details"
            rows={3}
            maxLength={2000}
            className={`${input} resize-y`}
            placeholder="We get 30+ calls a week and I don't know how many turn into jobs."
          />
        </Cell>

        <fieldset className="border-b border-r border-rule px-3.5 pb-3.5 pt-2 sm:col-span-2">
          <legend className="sr-only">Best way to reach you</legend>
          <span className="cell-label block" aria-hidden>
            Best way to reach you
          </span>
          <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2">
            {CONTACT_PREFS.map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-2.5 text-[0.98rem]">
                <input type="radio" name="pref" value={p} className="peer sr-only" checked={pref === p} onChange={() => setPref(p)} />
                <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-graphite">
                  <Box checked={pref === p} round />
                </span>
                {p}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mx-4 mt-4 border-l-4 border-stamp bg-[#fff1ee] px-4 py-3 text-[0.95rem] sm:mx-5">
          {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 px-4 pb-5 pt-5 sm:px-5">
        <p className="text-[0.9rem] text-steel">Free. 30 minutes. No sales deck.</p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="border-2 border-graphite bg-hivis px-6 py-3 text-[1.02rem] font-bold shadow-[4px_4px_0_var(--color-graphite)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--color-graphite)] disabled:opacity-60"
        >
          {status.kind === "sending" ? "Submitting…" : "Submit work order"}
        </button>
      </div>
    </form>
  );
}
