"use client";

import { useEffect, useState } from "react";

// A trade owner's real to-do list, different for each day of the week.
// Index = Date.getDay() (0 = Sunday).
const WEEK: string[][] = [
  ["Plan crew schedule for the week", "Restock the van", "Estimate for the Henderson deck", "Answer weekend voicemails"],
  ["Run payroll", "Order 3/4\" copper fittings", "Call back 3 missed calls from Sat", "Send revised estimate, Miller job"],
  ["Pick up permit, Ballantyne job", "Swap blade on the miter saw", "Follow up on Miller estimate (2nd time)", "Call back water heater lady"],
  ["Price out new compressor", "Update Google hours", "Chase 2 unpaid invoices", "Who's answering the phone on jobs?"],
  ["Send photos to the Parkers", "Confirm Fri crew + materials", "Who took the 4:15 call??", "Fix lead leak in the CRM"],
  ["Payroll hours in by 3", "Clean out the truck", "Send this week's invoices", "Return quote requests from Tue"],
  ["Drop off dump trailer", "Buy caulk + shims", "Catch up on estimates", "Reply to Facebook messages"],
];

function daysLeftInYear(d: Date) {
  const end = new Date(d.getFullYear(), 11, 31);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export default function LegalPad() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const day = now ?? new Date(2026, 0, 1);
  const tasks = WEEK[day.getDay()];
  const dateLabel = day.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const timeLabel = day
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase()
    .replace(" ", "");
  const left = daysLeftInYear(day);

  return (
    <div className="relative mx-auto w-full max-w-[26rem] select-none" aria-label="A trade owner's to-do list for today">
      {/* Blueprint peeking out underneath */}
      <div
        aria-hidden
        className="blueprint absolute -right-6 -top-6 h-[78%] w-[86%] rotate-[5deg] rounded-[2px] shadow-[0_18px_30px_-16px_rgba(23,39,29,0.5)] sm:-right-10"
      >
        <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full opacity-70" fill="none" stroke="#e6f0f8" strokeWidth="1">
          <rect x="112" y="18" width="70" height="52" />
          <rect x="112" y="70" width="40" height="40" />
          <path d="M152 70v40h30V70" />
          <path d="M118 18a14 14 0 0 1 14 14" strokeDasharray="2 2" />
          <path d="M112 128h70M112 124v8M182 124v8" />
          <text x="138" y="140" fontSize="7" fill="#e6f0f8" stroke="none" fontFamily="sans-serif">
            24&apos;-0&quot;
          </text>
        </svg>
      </div>

      {/* The pad */}
      <div className="pad relative -rotate-[1.6deg] overflow-hidden rounded-b-[3px] pb-6 font-hand text-[1.04rem] sm:text-[1.18rem] text-[#23346b]">
        {/* glued binding strip */}
        <div className="h-11 bg-[#7c2b25] shadow-[inset_0_-3px_0_rgba(0,0,0,0.18)]" aria-hidden />

        <div className={`pl-[3.9rem] pr-4 sm:pl-[4.1rem] sm:pr-5 pt-[0.95rem] transition-opacity duration-500 ${now ? "opacity-100" : "opacity-0"}`}>
          <p className="pad-line flex items-baseline justify-between gap-3" aria-live="off">
            <span className={`font-bold transition-opacity duration-300 ${now ? "opacity-100" : "opacity-0"}`}>
              {dateLabel}
            </span>
            <span className={`text-[0.95rem] text-[#55607f] transition-opacity duration-300 ${now ? "opacity-100" : "opacity-0"}`}>
              {timeLabel}
            </span>
          </p>
          <p className="pad-line text-[#55607f]">To do</p>

          <ul>
            {tasks.map((t, i) => (
              <li key={t} className="pad-line">
                {i < 2 ? <span className="strike">{t}</span> : <span>{t}</span>}
              </li>
            ))}
            <li className="pad-line relative mt-0 font-bold text-[#1d2c5e]">
              <a href="#contact" className="relative inline-block whitespace-nowrap px-1 outline-offset-4 hover:text-[#2e6b0f]">
                Book 30-min fit call w/ Vestis
                <svg
                  aria-hidden
                  viewBox="0 0 300 70"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -left-8 -top-3 h-[calc(100%+1.5rem)] w-[calc(100%+3.5rem)]"
                >
                  <path
                    className="marker-path"
                    d="M28 40 C 20 12, 150 4, 268 14 C 300 18, 296 52, 250 60 C 180 70, 40 66, 16 48 C 6 38, 30 22, 70 16"
                    fill="none"
                    stroke="#4f8a10"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </a>
            </li>
          </ul>

          <p className="pad-line mt-[var(--rule-gap)] text-[0.98rem] text-[#6b6f63]">
            <span className={`transition-opacity duration-300 ${now ? "opacity-100" : "opacity-0"}`}>
              {left === 0 ? "Last day of the year." : `${left} days left in ${day.getFullYear()}.`}
            </span>
          </p>
        </div>

        {/* coffee ring */}
        <div aria-hidden className="coffee-ring absolute -bottom-10 -right-8 h-36 w-36 rotate-12" />
      </div>
    </div>
  );
}
