import Link from "next/link";
import IntakeCard from "@/components/IntakeCard";
import FitCallForm from "@/components/FitCallForm";
import MessageDock from "@/components/MessageDock";
import { channels, formatPhone, site } from "@/lib/site";

function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-navy text-white ${className}`} aria-hidden>
      <svg viewBox="0 0 32 32" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square">
        <path d="M8 24 23 9M11 8h13v13" />
      </svg>
    </span>
  );
}

const levers = [
  {
    name: "Growth",
    title: "Turn interest into jobs.",
    points: [
      ["Get found.", "Improve your website, local visibility, and lead capture."],
      ["Follow through.", "Build faster lead response and more consistent estimate follow-up."],
    ],
  },
  {
    name: "Efficiency",
    title: "Make work flow better.",
    points: [
      ["Connect the dots.", "Link your CRM, quoting, and job handoffs."],
      ["Cut the busywork.", "Use practical workflows and AI automation to reduce manual tasks."],
    ],
  },
];

const steps = [
  ["Day 1", "Find the constraint", "Set a baseline and agree on the highest-impact priority."],
  ["Then", "Build the fix", "Implement one scoped improvement at a time."],
  ["Every 30 days", "Measure progress", "Track conversion, time saved, or gross profit on a monthly scorecard."],
];

const included: [string, string][] = [
  ["Owner working sessions", "Four 30-minute sessions a month"],
  ["Implementation", "One active priority at a time"],
  ["Support", "Between-call support and a monthly scorecard"],
  ["Delivery hours", "Up to 12 a month, covering meetings, implementation, and support"],
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function Home() {
  const spots = site.foundingSpotsLeft === "" ? null : Math.max(0, Math.min(3, Number(site.foundingSpotsLeft) || 0));
  const wrap = "mx-auto max-w-[74rem] px-5 sm:px-8";
  const h2 = "text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]";

  return (
    <div className="overflow-x-clip">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.legalName} home`}>
            <Mark />
            <span className="text-[1.1rem] font-semibold tracking-tight">
              Vestis <span className="font-normal text-slate">Solutions</span>
            </span>
          </Link>
          <nav className="flex items-center gap-7 text-[0.95rem]">
            <a href="#approach" className="hidden text-slate hover:text-ink md:inline">
              Approach
            </a>
            <a href="#process" className="hidden text-slate hover:text-ink md:inline">
              Process
            </a>
            <a href="#pricing" className="hidden text-slate hover:text-ink md:inline">
              Pricing
            </a>
            <a href="#contact" className="rounded-md bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark">
              Book a fit call
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-[linear-gradient(to_bottom,#ffffff,#f4f5f7)]">
          <div className={`${wrap} grid items-center gap-16 pb-24 pt-16 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16 lg:pb-28 lg:pt-24`}>
            <div>
              <p className="text-[0.95rem] font-medium text-navy">Fractional growth partner for trade business owners</p>
              <h1 className="mt-5 text-[clamp(2.6rem,7vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] lg:text-[clamp(3.2rem,4.1vw,3.75rem)]">
                <span className="block sm:whitespace-nowrap">Win better work.</span>
                <span className="block sm:whitespace-nowrap">Run a better business.</span>
              </h1>
              <p className="mt-6 max-w-[34rem] text-[1.2rem] leading-relaxed text-slate">
                Hands-on help to win the right jobs, simplify how work gets done, and take pressure off the owner, without another
                full-time hire.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="rounded-md bg-navy px-6 py-3.5 font-medium text-white shadow-sm hover:bg-navy-dark">
                  Book a free 30-minute fit call
                </a>
                <a href="#pricing" className="rounded-md border border-line bg-white px-6 py-3.5 font-medium hover:border-slate">
                  See pricing
                </a>
              </div>
              <p className="mt-10 text-[0.92rem] text-slate">
                For owner-run companies in roofing, HVAC, plumbing, electrical, remodeling, and more.
              </p>
            </div>
            <IntakeCard />
          </div>
        </section>

        {/* Approach */}
        <section id="approach" aria-labelledby="approach-title" className="scroll-mt-16 border-t border-line">
          <div className={`${wrap} py-24`}>
            <div className="max-w-[40rem]">
              <h2 id="approach-title" className={h2}>
                Two levers. One priority at a time.
              </h2>
              <p className="mt-4 text-[1.1rem] leading-relaxed text-slate">
                Most shops don&apos;t need ten projects. They need the one thing costing them the most, fixed properly, before
                moving to the next.
              </p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
              {levers.map((l) => (
                <article key={l.name} className="bg-white p-8 sm:p-10">
                  <p className="text-[0.9rem] font-medium text-navy">{l.name}</p>
                  <h3 className="mt-2 text-[1.6rem] font-semibold tracking-tight">{l.title}</h3>
                  <ul className="mt-6 grid gap-4">
                    {l.points.map(([lead, rest]) => (
                      <li key={lead} className="flex gap-3 text-[1.04rem] leading-relaxed text-slate">
                        <Check />
                        <span>
                          <strong className="font-semibold text-ink">{lead}</strong> {rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" aria-labelledby="process-title" className="scroll-mt-16 bg-mist">
          <div className={`${wrap} py-24`}>
            <h2 id="process-title" className={`${h2} max-w-[40rem]`}>
              How the 90 days run.
            </h2>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              <span aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-line md:block" />
              {steps.map(([when, title, body], i) => (
                <li key={title} className="relative">
                  <span className="relative z-10 grid h-[2.3rem] w-[2.3rem] place-items-center rounded-full border border-line bg-white text-[0.95rem] font-semibold text-navy">
                    {i + 1}
                  </span>
                  <p className="mt-5 text-[0.9rem] font-medium text-slate">{when}</p>
                  <h3 className="mt-1 text-[1.3rem] font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 max-w-[21rem] leading-relaxed text-slate">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-16">
          <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16`}>
            <div>
              <h2 id="pricing-title" className={h2}>
                One clear scope. One monthly price.
              </h2>
              <p className="mt-4 max-w-[28rem] text-[1.1rem] leading-relaxed text-slate">
                You&apos;ll know exactly what&apos;s included, and what isn&apos;t, before we start. Anything outside the scope is
                quoted separately and only goes ahead with your approval.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_48px_-32px_rgba(21,25,30,0.3)]">
              <div className="border-b border-line px-7 py-7 sm:px-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold">90-day founding partnership</p>
                  <p className="rounded-full bg-navy-tint px-3 py-1 text-[0.82rem] font-medium text-navy">
                    {spots === null
                      ? "Founding rate, first 3 clients"
                      : spots === 0
                        ? "Founding spots are full"
                        : `${spots} of 3 founding spots open`}
                  </p>
                </div>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-[3.4rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">$3,000</span>
                  <span className="text-slate">per month</span>
                </p>
                <p className="mt-3 text-[0.95rem] text-slate">Billed monthly. $9,000 initial commitment over three months.</p>
              </div>
              <ul className="divide-y divide-line px-7 sm:px-9">
                {included.map(([k, v]) => (
                  <li key={k} className="flex gap-3 py-4">
                    <Check />
                    <span>
                      <span className="font-medium">{k}</span>
                      <span className="block text-[0.95rem] text-slate">{v}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line bg-mist px-7 py-5 text-[0.9rem] leading-relaxed text-slate sm:px-9">
                Not included: software, ad spend, major builds, and specialist services. These require your approval first.
              </div>
              <div className="px-7 py-6 sm:px-9">
                <a href="#contact" className="block rounded-md bg-navy px-6 py-3.5 text-center font-medium text-white hover:bg-navy-dark">
                  Start with a free fit call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-line bg-mist">
          <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16`}>
            <div>
              <h2 id="contact-title" className={h2}>
                What&apos;s the biggest thing slowing you down?
              </h2>
              <p className="mt-4 max-w-[28rem] text-[1.1rem] leading-relaxed text-slate">
                Tell me in a sentence. I&apos;ll come to a free 30-minute fit call with a first read on where the fix is. By the end
                of it, you&apos;ll know whether working together makes sense.
              </p>
              <div className="mt-10 grid max-w-[28rem] gap-5 border-t border-line pt-8 text-[0.98rem]">
                <div>
                  <p className="font-medium">Rather talk now?</p>
                  <p className="mt-1 text-slate">
                    {site.phone ? (
                      <>
                        Call or text{" "}
                        <a href={`tel:${site.phone}`} className="font-medium text-navy underline underline-offset-4">
                          {formatPhone(site.phone)}
                        </a>
                        , or tap &ldquo;Text Alex&rdquo; in the corner.
                      </>
                    ) : (
                      <>Tap &ldquo;Text Alex&rdquo; in the corner to reach me on my phone.</>
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${site.email}`} className="mt-1 inline-block text-navy underline underline-offset-4">
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
            <FitCallForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className={`${wrap} flex flex-col gap-4 pb-28 pt-10 text-[0.9rem] text-slate sm:flex-row sm:items-center sm:justify-between sm:pb-10`}>
          <div className="flex items-center gap-2.5">
            <Mark className="h-6 w-6" />
            <span>
              {site.legalName}, {site.city}
            </span>
          </div>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </div>
      </footer>

      <MessageDock channels={channels()} />
    </div>
  );
}
