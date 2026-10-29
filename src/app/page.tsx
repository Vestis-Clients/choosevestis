import Link from "next/link";
import WorkOrder from "@/components/WorkOrder";
import FitCallForm from "@/components/FitCallForm";
import MessageDock from "@/components/MessageDock";
import { channels, formatPhone, site } from "@/lib/site";

function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center bg-hivis ${className}`} aria-hidden>
      <svg viewBox="0 0 32 32" className="h-[58%] w-[58%]" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="square">
        <path d="M7 25 24 8M10 7h15v15" />
      </svg>
    </span>
  );
}

const TRADES = ["Roofing", "HVAC", "Plumbing", "Electrical", "Remodeling", "Landscaping", "Concrete", "Painting"];

const levers = [
  {
    name: "Growth",
    top: "bg-graphite",
    title: "Turn interest into jobs.",
    points: [
      ["Get found.", "Improve your website, local visibility, and lead capture."],
      ["Follow through.", "Build faster lead response and more consistent estimate follow-up."],
    ],
  },
  {
    name: "Efficiency",
    top: "bg-hivis",
    title: "Make work flow better.",
    points: [
      ["Connect the dots.", "Link your CRM, quoting, and job handoffs."],
      ["Cut the busywork.", "Use practical workflows and AI automation to reduce manual tasks."],
    ],
  },
];

const lineItems: [string, string][] = [
  ["Owner working sessions, 30 minutes each", "4 / month"],
  ["Active implementation priority", "1 at a time"],
  ["Between-call support", "Included"],
  ["Monthly scorecard", "Included"],
  ["Delivery hours (meetings, implementation, support)", "Up to 12 / month"],
];

export default function Home() {
  const spots = site.foundingSpotsLeft === "" ? null : Math.max(0, Math.min(3, Number(site.foundingSpotsLeft) || 0));

  return (
    <div className="overflow-x-clip">
      <div className="reflective h-3" aria-hidden />

      {/* Header */}
      <header className="mx-auto flex max-w-[78rem] items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.legalName} home`}>
          <Mark />
          <span className="leading-none">
            <span className="condensed block text-[1.6rem] font-extrabold uppercase tracking-tight">Vestis</span>
            <span className="block text-[0.72rem] font-semibold text-steel">Solutions LLC</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-[0.95rem] font-semibold">
          <a href="#how" className="hidden hover:underline md:inline">
            How it works
          </a>
          <a href="#estimate" className="hidden hover:underline md:inline">
            Pricing
          </a>
          {site.phone ? (
            <a href={`sms:${site.phone}`} className="border-2 border-graphite px-4 py-2 hover:bg-graphite hover:text-white">
              Text {formatPhone(site.phone)}
            </a>
          ) : (
            <a href="#contact" className="border-2 border-graphite px-4 py-2 hover:bg-graphite hover:text-white">
              Book a fit call
            </a>
          )}
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-[78rem] items-center gap-14 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_29rem] lg:gap-16 lg:pt-14">
          <div>
            <p className="font-semibold text-steel">Fractional growth partner for trade business owners</p>
            <h1 className="display mt-4 text-[clamp(3.4rem,13.5vw,6.6rem)] uppercase">
              Win better work.
              <br />
              Run a better business.
            </h1>
            <p className="mt-7 max-w-[34rem] text-[1.2rem] leading-relaxed text-steel">
              Hands-on help to win the right jobs, simplify how work gets done, and take pressure off the owner, without another
              full-time hire.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#contact"
                className="border-2 border-graphite bg-hivis px-6 py-3.5 text-[1.05rem] font-bold shadow-[4px_4px_0_var(--color-graphite)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--color-graphite)]"
              >
                Book a free 30-minute fit call
              </a>
              <a href="#estimate" className="font-semibold underline decoration-2 underline-offset-4">
                See the estimate
              </a>
            </div>
          </div>
          <div className="px-2 sm:px-6 lg:px-0">
            <WorkOrder />
          </div>
        </section>

        {/* Who it's for */}
        <section aria-label="Who it's for" className="bg-asphalt text-white">
          <div className="mx-auto flex max-w-[78rem] flex-col gap-4 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
            <p className="shrink-0 font-semibold text-hivis">Built for owner-run trade companies</p>
            <ul className="condensed flex flex-wrap gap-x-5 gap-y-2 text-[1.3rem] font-bold uppercase tracking-wide text-[#e4e7e9]">
              {TRADES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Two levers */}
        <section aria-labelledby="levers" className="mx-auto max-w-[78rem] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 id="levers" className="display text-[clamp(2.5rem,5.2vw,3.7rem)] uppercase [text-wrap:balance]">
                Two levers.
                <br />
                One priority at a time.
              </h2>
              <p className="mt-5 max-w-[26rem] text-[1.1rem] leading-relaxed text-steel">
                Most shops don&apos;t need ten projects. They need the one thing that&apos;s costing them the most, fixed properly.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {levers.map((l) => (
                <article key={l.name} className="sheet">
                  <div className={`h-2 ${l.top}`} />
                  <div className="p-6 sm:p-7">
                    <p className="font-semibold text-steel">{l.name}</p>
                    <h3 className="condensed mt-2 text-[1.9rem] font-extrabold leading-[1.05] tracking-tight">{l.title}</h3>
                    <div className="mt-5 grid gap-4 text-[1.04rem] leading-relaxed text-steel">
                      {l.points.map(([lead, rest]) => (
                        <p key={lead}>
                          <strong className="font-semibold text-graphite">{lead}</strong> {rest}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How the 90 days run */}
        <section id="how" aria-labelledby="how-title" className="scroll-mt-6 border-y-2 border-graphite bg-sheet">
          <div className="mx-auto max-w-[78rem] px-5 py-20 sm:px-8 lg:py-24">
            <h2 id="how-title" className="display text-[clamp(2.5rem,5.2vw,3.7rem)] uppercase [text-wrap:balance]">
              How the 90 days run.
            </h2>

            {/* tape measure */}
            <div className="mt-12" aria-hidden>
              <div className="flex items-stretch">
                <div className="w-3 bg-graphite" />
                <div className="tape relative h-14 flex-1 border-y-2 border-graphite">
                  {["0", "30", "60", "90"].map((d, i) => (
                    <span
                      key={d}
                      className="condensed absolute bottom-1 text-[1.2rem] font-extrabold"
                      style={{ left: `calc(${(i / 3) * 100}% + ${i === 3 ? "-2.2rem" : "0.35rem"})` }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
              {[
                ["Day 1", "Find the constraint", "Set a baseline and agree on the highest-impact priority."],
                ["Then", "Build the fix", "Implement one scoped improvement at a time."],
                ["Every 30 days", "Measure progress", "Track conversion, time saved, or gross profit on a monthly scorecard."],
              ].map(([when, title, body], i) => (
                <li key={title} className="border-l-4 border-graphite pl-5">
                  <p className="text-[0.95rem] font-semibold text-steel">
                    Step {i + 1}, {when.toLowerCase()}
                  </p>
                  <h3 className="condensed mt-1 text-[1.75rem] font-extrabold tracking-tight">{title}</h3>
                  <p className="mt-2 max-w-[22rem] text-[1.04rem] leading-relaxed text-steel">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Estimate */}
        <section id="estimate" aria-labelledby="estimate-title" className="mx-auto max-w-[78rem] scroll-mt-6 px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 id="estimate-title" className="display text-[clamp(2.5rem,5.2vw,3.7rem)] uppercase [text-wrap:balance]">
                Priced like a job.
                <br />
                Scoped like one too.
              </h2>
              <p className="mt-5 max-w-[26rem] text-[1.1rem] leading-relaxed text-steel">
                A fixed monthly scope with a set number of hours. You&apos;ll know what&apos;s included and what isn&apos;t before we
                start, the same way you&apos;d quote a customer.
              </p>
            </div>

            <div className="sheet perforated relative pt-3">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-graphite px-6 pb-4 pt-5 sm:px-8">
                <div>
                  <p className="text-[0.85rem] font-semibold text-steel">Vestis Solutions LLC</p>
                  <p className="condensed text-[2.1rem] font-extrabold uppercase leading-none">Estimate</p>
                </div>
                <p className="text-right text-[0.9rem] text-steel">
                  90-day founding partnership
                  <br />
                  For the first 3 new clients
                </p>
              </div>

              <table className="w-full text-left text-[1rem]">
                <thead>
                  <tr className="border-b border-rule text-[0.8rem] text-steel">
                    <th scope="col" className="px-6 py-2.5 font-semibold sm:px-8">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-2.5 text-right font-semibold sm:px-8">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map(([d, q]) => (
                    <tr key={d} className="border-b border-rule">
                      <td className="px-6 py-3.5 sm:px-8">{d}</td>
                      <td className="whitespace-nowrap px-6 py-3.5 text-right font-semibold sm:px-8">{q}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid gap-2 px-6 py-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-steel">Monthly rate, billed monthly</span>
                  <span className="condensed text-[2.6rem] font-extrabold leading-none tabular-nums">$3,000</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 bg-hivis px-3 py-2 sm:-mx-3">
                  <span className="font-semibold">Initial commitment, 3 months</span>
                  <span className="text-[1.25rem] font-extrabold tabular-nums">$9,000</span>
                </div>
              </div>

              <div className="border-t border-rule px-6 py-5 text-[0.92rem] leading-relaxed text-steel sm:px-8">
                <p>
                  <strong className="text-graphite">Not included:</strong> software, ad spend, major builds, and specialist services.
                  These are quoted separately and only go ahead with your approval.
                </p>
                {spots !== null && (
                  <p className="mt-3 flex items-center gap-3 font-semibold text-graphite">
                    <span className="flex gap-1" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <span key={i} className={`h-3.5 w-3.5 border-2 border-graphite ${i < spots ? "bg-hivis" : "bg-transparent"}`} />
                      ))}
                    </span>
                    {spots === 0 ? "All founding spots are taken" : `${spots} of 3 founding spots open`}
                  </p>
                )}
              </div>

              <div
                aria-hidden
                className="stamp pointer-events-none absolute bottom-5 right-6 hidden px-3 py-1 text-[1.05rem] sm:block"
                style={{ transform: "rotate(-6deg)" }}
              >
                Founding rate
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 bg-asphalt text-white">
          <div className="reflective h-3" aria-hidden />
          <div className="mx-auto grid max-w-[78rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <div>
              <h2 id="contact-title" className="display text-[clamp(2.5rem,5.2vw,3.7rem)] uppercase [text-wrap:balance]">
                What&apos;s the biggest thing slowing you down?
              </h2>
              <p className="mt-6 max-w-[28rem] text-[1.12rem] leading-relaxed text-[#c3c9cd]">
                Fill out the work order. I&apos;ll come to a free 30-minute fit call with a first read on where the fix is, and
                you&apos;ll know by the end of it whether working together makes sense.
              </p>
              <p className="mt-8 max-w-[28rem] border-l-4 border-hivis pl-4 text-[1.02rem] leading-relaxed text-[#c3c9cd]">
                <strong className="text-white">On a job right now?</strong> Tap <strong className="text-white">Text Alex</strong> in
                the corner and message me from your phone.
              </p>
            </div>
            <div className="text-graphite">
              <FitCallForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-graphite text-[#aab1b6]">
        <div className="mx-auto flex max-w-[78rem] flex-col gap-4 px-5 pb-28 pt-10 text-[0.92rem] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-10">
          <div className="flex items-center gap-3">
            <Mark className="h-8 w-8" />
            <span>
              {site.legalName}, {site.city}
            </span>
          </div>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </div>
      </footer>

      <MessageDock channels={channels()} />
    </div>
  );
}
