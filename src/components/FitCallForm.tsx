"use client";

import { useEffect, useRef, useState } from "react";

const BOTTLENECKS = [
  "Missed calls and slow lead response",
  "Estimates that never get followed up",
  "Not showing up on Google",
  "Scheduling and job handoffs",
  "Too much paperwork and admin",
  "Something else",
];

const CONTACT_PREFS = ["Call", "Text", "Email", "WhatsApp"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string } | { kind: "error"; message: string };

const field =
  "w-full rounded-[3px] border border-rule bg-white px-3.5 py-3 text-[1rem] text-ink placeholder:text-[#9aa29b] focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink";

export default function FitCallForm() {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [bottleneck, setBottleneck] = useState<string>("");
  const [pref, setPref] = useState<string>("Call");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      details: String(fd.get("details") || "").trim(),
      bottleneck,
      contactPref: pref,
      website: String(fd.get("website") || ""), // honeypot
      elapsedMs: Date.now() - started.current,
    };

    const next: Record<string, string> = {};
    if (!data.name) next.name = "Add your name.";
    if (!data.phone && !data.email) next.phone = "Add a phone number or email so I can reach you.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "That email doesn't look right.";
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) next.phone = "Use a 10-digit phone number.";
    if (!data.bottleneck && !data.details) next.bottleneck = "Pick what's slowing you down, or describe it below.";
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
      if (!res.ok) throw new Error(json.error || "The request didn't go through.");
      setStatus({ kind: "sent", name: data.name.split(" ")[0] });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          (err instanceof Error ? err.message : "The request didn't go through.") +
          " Try again, or use one of the message buttons instead.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="border-t-4 border-lime-bar bg-white px-6 py-8 sm:px-8">
        <p className="font-display text-2xl font-bold tracking-tight">Got it, {status.name}.</p>
        <p className="mt-3 max-w-prose text-muted">
          I&apos;ll reach out within one business day by {pref.toLowerCase()} to set up your free 30-minute fit call. Come ready to talk
          about the one thing that would make the biggest difference this quarter.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <fieldset>
        <legend className="mb-3 font-medium">What&apos;s slowing you down most?</legend>
        <div className="flex flex-wrap gap-2">
          {BOTTLENECKS.map((b) => {
            const on = bottleneck === b;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={on}
                onClick={() => setBottleneck(on ? "" : b)}
                className={`rounded-full border px-3.5 py-2 text-[0.94rem] transition-colors ${
                  on ? "border-ink bg-ink text-paper" : "border-rule bg-white text-ink hover:border-ink"
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
        {errors.bottleneck && <p className="mt-2 text-sm text-[#a3281c]">{errors.bottleneck}</p>}
      </fieldset>

      <label className="grid gap-1.5">
        <span className="font-medium">
          Tell me a bit more <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          name="details"
          rows={3}
          maxLength={2000}
          className={field}
          placeholder="e.g. We get 30+ calls a week and I don't know how many turn into jobs."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-medium">Your name</span>
          <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {errors.name && <span className="text-sm text-[#a3281c]">{errors.name}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className="font-medium">
            Business and trade <span className="font-normal text-muted">(optional)</span>
          </span>
          <input name="business" autoComplete="organization" className={field} placeholder="e.g. Carter Plumbing, plumbing" />
        </label>
        <label className="grid gap-1.5">
          <span className="font-medium">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} aria-invalid={!!errors.phone} />
          {errors.phone && <span className="text-sm text-[#a3281c]">{errors.phone}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className="font-medium">Email</span>
          <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
          {errors.email && <span className="text-sm text-[#a3281c]">{errors.email}</span>}
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 font-medium">Best way to reach you</legend>
        <div className="inline-flex flex-wrap overflow-hidden rounded-[3px] border border-rule bg-white">
          {CONTACT_PREFS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={pref === p}
              onClick={() => setPref(p)}
              className={`border-r border-rule px-4 py-2.5 text-[0.94rem] last:border-r-0 ${
                pref === p ? "bg-lime font-semibold text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="border-l-4 border-[#a3281c] bg-white px-4 py-3 text-[0.95rem]">
          {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-paper transition-colors hover:bg-[#24402f] disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Request my fit call"}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:-rotate-12" aria-hidden>
            <Arrow />
          </span>
        </button>
        <p className="text-sm text-muted">Free, 30 minutes, no pitch deck.</p>
      </div>
    </form>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
