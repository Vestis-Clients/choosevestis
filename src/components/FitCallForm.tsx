"use client";

import { useEffect, useRef, useState } from "react";
import { bookingUrl } from "@/lib/booking";

const PROBLEMS = [
  "Missed calls and slow lead follow-up",
  "Not ranking well on Google or AI search",
  "Sales process feels broken",
  "Proposals and estimates that don't close",
  "Too much admin and paperwork",
  "Team or crew issues",
  "Busy, but not more profitable",
  "Something else",
];

const TEAM_SIZES = ["Just me", "2–5", "6–15", "16–50", "50+"];

const CONTACT_PREFS = ["Call", "Text", "Email", "Messenger"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string } | { kind: "error"; message: string };

const inputBase =
  "mt-1.5 w-full rounded-md border bg-white px-3.5 py-2.5 text-[1rem] text-ink placeholder:text-[#9aa3ae] focus:border-navy focus:outline-none focus:ring-3 focus:ring-navy-tint";

function Field({
  label,
  optional,
  error,
  className = "",
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[0.92rem] font-medium">
        {label} {optional && <span className="font-normal text-slate">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[0.85rem] text-error">{error}</span>}
    </label>
  );
}

export default function FitCallForm({ messenger = false }: { messenger?: boolean }) {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [problems, setProblems] = useState<string[]>([]);
  const [pref, setPref] = useState("Call");
  const [team, setTeam] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const input = (err?: string) => `${inputBase} ${err ? "border-error" : "border-line"}`;

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
      teamSize: team,
      leadSources: String(fd.get("leadSources") || "").trim(),
      tried: String(fd.get("tried") || "").trim(),
      contactPref: pref,
      website: String(fd.get("website") || ""),
      elapsedMs: Date.now() - started.current,
    };

    const next: Record<string, string> = {};
    if (!data.name) next.name = "Add your name.";
    if (!data.phone && !data.email) next.phone = "Add a phone number or email so I can reach you.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Check the email address.";
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) next.phone = "Use a 10-digit phone number.";
    if (!problems.length && !data.details) next.problems = "Pick at least one, or describe it below.";
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
      if (!res.ok) throw new Error(json.error || "Your request didn't go through.");
      setStatus({ kind: "sent", name: data.name.split(" ")[0] });
    } catch (err) {
      setStatus({
        kind: "error",
        message: `${err instanceof Error ? err.message : "Your request didn't go through."} Try again, or tap Message Alex in the corner.`,
      });
    }
  }

  const card = "rounded-xl border border-line bg-white p-6 shadow-[0_24px_48px_-32px_rgba(21,25,30,0.3)] sm:p-8";

  if (status.kind === "sent") {
    return (
      <div role="status" className={card}>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-tint text-navy" aria-hidden>
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </span>
        <p className="mt-5 text-[1.4rem] font-semibold tracking-tight">Request received, {status.name}.</p>
        <p className="mt-2 max-w-[30rem] leading-relaxed text-slate">
          {pref === "Messenger"
            ? "Messenger only lets me reply after you send the first message. Tap below to start the chat, and I'll pick it up there within one business day."
            : `I'll reach out by ${pref.toLowerCase()} within one business day to set up your fit call.`}
        </p>
        {pref === "Messenger" && messenger && (
          <a
            href="/go/messenger"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-5 inline-block rounded-md bg-navy px-5 py-2.5 font-medium text-white hover:bg-navy-dark"
          >
            Open Messenger
          </a>
        )}
        <p className="mt-6 border-t border-line pt-5 text-[0.95rem] text-slate">Rather lock in a time now?</p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-md border border-line px-5 py-2.5 font-medium hover:border-slate"
        >
          Pick a time for your fit call
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`${card} relative grid gap-6`}>
      <fieldset>
        <legend className="text-[0.92rem] font-medium">What&apos;s holding back your next stage of growth? Pick any that apply.</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PROBLEMS.map((p) => {
            const on = problems.includes(p);
            return (
              <label
                key={p}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-2.5 text-[0.94rem] transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-navy-tint ${
                  on ? "border-navy bg-navy-tint text-navy-dark" : "border-line hover:border-slate"
                }`}
              >
                <input type="checkbox" checked={on} onChange={() => toggle(p)} className="h-4 w-4 shrink-0 accent-[#1d3a5c]" />
                {p}
              </label>
            );
          })}
        </div>
        {errors.problems && <p className="mt-2 text-[0.85rem] text-error">{errors.problems}</p>}
      </fieldset>

      <Field label="What's the biggest pressure on you right now?" optional>
        <textarea
          name="details"
          rows={3}
          maxLength={2000}
          className={`${input()} resize-y`}
          placeholder="Revenue is up, but I'm working every weekend and I still don't know where the money goes."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="text-[0.92rem] font-medium">
            Team size <span className="font-normal text-slate">(optional)</span>
          </legend>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {TEAM_SIZES.map((t) => (
              <label
                key={t}
                className={`cursor-pointer rounded-md border px-3 py-2 text-[0.9rem] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy ${
                  team === t ? "border-navy bg-navy-tint font-medium text-navy-dark" : "border-line hover:border-slate"
                }`}
              >
                <input
                  type="radio"
                  name="team"
                  value={t}
                  checked={team === t}
                  onChange={() => setTeam(team === t ? "" : t)}
                  onClick={() => team === t && setTeam("")}
                  className="sr-only"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="How do customers find you today?" optional>
          <input name="leadSources" maxLength={300} className={input()} placeholder="Referrals, Google, Facebook…" />
        </Field>
      </div>

      <Field label="What have you already tried?" optional>
        <input name="tried" maxLength={500} className={input()} placeholder="An agency, a new CRM, hired an office manager…" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" autoComplete="name" className={input(errors.name)} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Company" optional>
          <input name="business" autoComplete="organization" className={input()} placeholder="Carter Plumbing" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input(errors.phone)} aria-invalid={!!errors.phone} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" autoComplete="email" className={input(errors.email)} aria-invalid={!!errors.email} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-[0.92rem] font-medium">Best way to reach you</legend>
        <div className="mt-3 inline-flex flex-wrap rounded-md border border-line bg-mist p-1">
          {CONTACT_PREFS.filter((p) => p !== "Messenger" || messenger).map((p) => (
            <label
              key={p}
              className={`cursor-pointer rounded px-4 py-1.5 text-[0.92rem] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy ${
                pref === p ? "bg-white font-medium text-ink shadow-sm" : "text-slate hover:text-ink"
              }`}
            >
              <input type="radio" name="pref" value={p} checked={pref === p} onChange={() => setPref(p)} className="sr-only" />
              {p}
            </label>
          ))}
        </div>
        {pref === "Messenger" && (
          <p className="mt-2.5 max-w-[34rem] text-[0.86rem] leading-relaxed text-slate">
            Messenger only lets me reply after you message first. After you submit, you&apos;ll get a button to start the chat.
          </p>
        )}
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md border border-[#f3c4bf] bg-[#fef3f2] px-4 py-3 text-[0.94rem] text-error">
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9rem] text-slate">Free, 30 minutes, no obligation.</p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-md bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Request my fit call"}
        </button>
      </div>
    </form>
  );
}
