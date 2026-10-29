import Link from "next/link";
import LegalPad from "@/components/LegalPad";
import FitCallForm, { Arrow } from "@/components/FitCallForm";
import MessageDock from "@/components/MessageDock";
import { channels, site } from "@/lib/site";

function Logo() {
  return (
    <span className="grid h-12 w-12 place-items-center bg-lime sm:h-[3.75rem] sm:w-[3.75rem]" aria-hidden>
      <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square">
        <path d="M7 25 24 8M9 7h16v16" />
      </svg>
    </span>
  );
}

const levers = [
  {
    n: "01",
    name: "Growth",
    bar: "bg-ink",
    title: "Turn interest into jobs.",
    points: [
      ["Get found.", "Improve your website, local visibility, and lead capture."],
      ["Follow through.", "Build faster lead response and more consistent estimate follow-up."],
    ],
  },
  {
    n: "02",
    name: "Efficiency",
    bar: "bg-lime-bar",
    title: "Make work flow better.",
    points: [
      ["Connect the dots.", "Link your CRM, quoting, and job handoffs."],
      ["Cut the busywork.", "Use practical workflows and AI automation to reduce manual tasks."],
    ],
  },
];

const steps = [
  ["Find the constraint", "Set a baseline and agree on the highest-impact priority."],
  ["Build the fix", "Implement one scoped improvement at a time."],
  ["Measure progress", "Track conversion, time saved, or gross profit."],
];

const included = [
  "Four 30-minute owner working sessions",
  "One active implementation priority",
  "Between-call support + monthly scorecard",
  "Up to 12 total delivery hours per month",
];

export default function Home() {
  const spots = site.foundingSpotsLeft === "" ? null : Math.max(0, Math.min(3, Number(site.foundingSpotsLeft) || 0));

  return (
    <div className="overflow-x-clip">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-6 border-b border-rule py-6 sm:py-8">
          <Link href="/" className="flex items-center gap-4" aria-label={`${site.legalName} home`}>
            <Logo />
            <span className="label leading-[1.45] text-ink sm:text-[0.95rem]">
              Fractional
              <br />
              growth partner
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <p className="label hidden text-right leading-[1.8] text-muted lg:block">
              A hands-on partner
              <br />
              for trade business owners
            </p>
            <a
              href="#contact"
              className="hidden rounded-full border border-ink px-5 py-2.5 text-[0.95rem] font-semibold hover:bg-ink hover:text-paper sm:inline-block"
            >
              Book a fit call
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="pb-16 pt-10 sm:pt-14 lg:pb-24">
          <p className="label text-label">Growth + operational efficiency</p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,10.4vw,3.6rem)] font-bold leading-[0.98] tracking-[-0.045em] sm:text-[clamp(3.6rem,7.6vw,6.4rem)]">
            <span className="block sm:whitespace-nowrap">Win better work.</span>
            <span className="block sm:whitespace-nowrap">Run a better business.</span>
          </h1>
          <div className="mt-8 grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
            <div>
              <p className="max-w-[38rem] text-[1.2rem] leading-relaxed text-muted sm:text-[1.35rem]">
                Hands-on help to win the right jobs, simplify how work gets done, and take pressure off the owner, without another
                full-time hire.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-paper hover:bg-[#24402f]"
                >
                  Book a free 30-minute fit call
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:-rotate-12" aria-hidden>
                    <Arrow />
                  </span>
                </a>
                <a href="#pricing" className="font-semibold underline decoration-lime-bar decoration-2 underline-offset-[6px] hover:decoration-ink">
                  See what&apos;s included
                </a>
              </div>
            </div>
            <div className="px-4 pt-2 sm:px-10 lg:mt-6 lg:px-0">
              <LegalPad />
            </div>
          </div>
        </section>

        {/* Two levers */}
        <section aria-labelledby="levers" className="pb-14">
          <div className="flex items-center gap-6">
            <h2 id="levers" className="label shrink-0 text-muted">
              Two levers. One priority at a time.
            </h2>
            <span className="h-px flex-1 bg-rule" />
          </div>
          <div className="mt-9 grid gap-12 md:grid-cols-2 md:gap-16">
            {levers.map((l) => (
              <article key={l.n}>
                <div className={`h-[5px] ${l.bar}`} />
                <p className="label mt-6 flex gap-3">
                  <span className="font-medium text-muted">{l.n}</span>
                  <span>{l.name}</span>
                </p>
                <h3 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em]">{l.title}</h3>
                <div className="mt-5 grid gap-4 text-[1.12rem] leading-relaxed text-muted">
                  {l.points.map(([lead, rest]) => (
                    <p key={lead}>
                      <strong className="font-semibold text-ink">{lead}</strong> {rest}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section aria-label="How it works" className="border-y border-rule py-10">
          <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map(([title, body], i) => (
              <li key={title}>
                <p className="text-[1.2rem] font-semibold">
                  <span className="mr-3 font-normal text-[#7f8a80]">0{i + 1}</span>
                  {title}
                </p>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-8 py-12">
          <div className="grid bg-forest text-paper md:grid-cols-[1fr_1.15fr]">
            <div className="px-7 py-9 sm:px-10 sm:py-11 md:border-r md:border-forest-line">
              <h2 id="pricing-title" className="label text-lime">
                90-day founding partnership
              </h2>
              <p className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-[clamp(3.6rem,9vw,5.2rem)] font-bold leading-none tracking-[-0.05em]">$3,000</span>
                <span className="text-[1.15rem] text-[#d3dcd5]">/ month</span>
              </p>
              <p className="mt-5 leading-relaxed text-[#c9d3cc]">
                Billed monthly, $9,000 initial commitment.
                <br />
                Founding rate for the first 3 new clients.
              </p>
              {spots !== null && (
                <p className="mt-5 inline-flex items-center gap-3 text-[0.95rem] font-medium text-paper">
                  <span className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`h-3 w-3 ${i < spots ? "bg-lime" : "border border-[#6f8577]"}`} />
                    ))}
                  </span>
                  {spots === 0 ? "Founding spots are full" : `${spots} of 3 founding spots open`}
                </p>
              )}
            </div>
            <ul className="grid content-center gap-4 border-t border-forest-line px-7 py-9 sm:px-10 md:border-t-0">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[1.1rem]">
                  <span className="mt-[0.45rem] h-3 w-3 shrink-0 bg-lime" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 max-w-[60rem] text-[0.92rem] leading-relaxed text-muted">
            Defined monthly scope; hours include meetings, implementation, and support. Software, ad spend, major builds, and specialist
            services are additional and require approval.
          </p>
        </section>

        {/* CTA + form */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8 border-t border-rule pb-24 pt-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h2 id="contact-title" className="font-display text-[clamp(2.1rem,4.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                What’s the biggest thing slowing you down?
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.15rem] leading-relaxed text-muted">
                Tell me in a sentence. I&apos;ll come to a free 30-minute fit call with a first read on where the fix is, and you&apos;ll
                know by the end of it whether working together makes sense.
              </p>
              <div className="mt-8 border-l-[3px] border-lime-bar pl-5 text-[1.02rem] leading-relaxed">
                <p className="font-semibold">Rather just talk?</p>
                <p className="mt-1 text-muted">Tap &ldquo;Message me&rdquo; in the corner to reach me on your phone right now.</p>
              </div>
            </div>
            <FitCallForm />
          </div>
        </section>
      </div>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-3 px-5 py-8 pb-24 text-[0.92rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            {site.legalName}, {site.city}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </div>
      </footer>

      <MessageDock channels={channels()} />
    </div>
  );
}
