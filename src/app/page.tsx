import Link from "next/link";
import LivePipeline from "@/components/LivePipeline";
import Levers from "@/components/Levers";
import NinetyDays from "@/components/NinetyDays";
import FitCallForm from "@/components/FitCallForm";
import MessageDock from "@/components/MessageDock";
import { CountUp, HeroTitle, Reveal, StickyHeader } from "@/components/Bits";
import EmailLink from "@/components/EmailLink";
import { bookingUrl, channels, site } from "@/lib/site";

function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-navy text-white ${className}`} aria-hidden>
      <svg viewBox="0 0 32 32" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square">
        <path d="M8 24 23 9M11 8h13v13" />
      </svg>
    </span>
  );
}

const TRADES = ["Roofing", "HVAC", "Plumbing", "Electrical", "Remodeling", "Landscaping", "Concrete", "Painting", "Fencing", "Pest control"];

const included: [string, string][] = [
  ["Ongoing SEO and AEO", "Monthly work on your website, Google profile, and AI visibility"],
  ["Sales process review", "Find where leads leak, then fix it with your team"],
  ["Owner working sessions", "Four 30-minute sessions a month, plus support between calls"],
  ["Delivery hours", "Up to 12 a month, covering meetings, implementation, and support"],
];

const GET = [
  {
    title: "Ongoing SEO and AEO",
    body: "Monthly work on your website, Google profile and content, so more of the right customers find you on Google and in AI answers.",
  },
  {
    title: "Sales process review",
    body: "I walk through how your leads are handled, from first call to signed job, find where they leak, and fix it with your team.",
  },
  {
    title: "An experienced partner",
    body: "CEO, COO, CTO and CMO-level advice on the decisions in front of you: pricing, hiring, cash flow, systems and growth.",
  },
];


function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function Home() {
  const wrap = "mx-auto max-w-[74rem] px-5 sm:px-8";
  const h2 = "text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]";

  return (
    <div className="overflow-x-clip">
      <StickyHeader>
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.legalName} home`}>
            <Mark />
            <span className="text-[1.1rem] font-semibold tracking-tight">
              Vestis <span className="font-normal text-slate">Solutions</span>
            </span>
          </Link>
          <nav className="flex items-center gap-7 text-[0.95rem]">
            <a href="#approach" className="hidden text-slate hover:text-ink md:inline">
              What I fix
            </a>
            <a href="#value" className="hidden text-slate hover:text-ink md:inline">
              What you get
            </a>
            <a href="#process" className="hidden text-slate hover:text-ink md:inline">
              Process
            </a>
            <a href="#pricing" className="hidden text-slate hover:text-ink md:inline">
              Pricing
            </a>
            <a href="#contact" className="rounded-full bg-ink px-4 py-2 font-medium text-white hover:bg-navy">
              Book a fit call
            </a>
          </nav>
        </div>
      </StickyHeader>

      <main>
        {/* Hero */}
        <section className="relative -mt-16 pt-16">
          {/* dot grid that fades out */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(#d5d9df_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_40%,transparent_100%)]"
          />
          <div className={`${wrap} pb-24 pt-14 text-center sm:pt-20`}>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.85rem] text-slate shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                Fractional Growth Partner for owner-led businesses
              </p>
            </Reveal>
            <HeroTitle
              lines={["Win better work.", "Run a better business."]}
              className="mx-auto mt-7 max-w-[66rem] text-[clamp(2.15rem,6.2vw,5.1rem)] font-semibold leading-[1.0] tracking-[-0.045em]"
            />
            <Reveal delay={0.35}>
              <p className="mx-auto mt-7 max-w-[38rem] text-[1.2rem] leading-relaxed text-slate">
                I get you found on Google and in AI answers like ChatGPT, fix the sales process so those leads turn into jobs, and
                clear the bottlenecks that keep you working nights and weekends.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a href="#contact" className="rounded-full bg-navy px-7 py-3.5 font-medium text-white shadow-[0_10px_24px_-10px_rgba(29,58,92,0.7)] hover:bg-navy-dark">
                  Book a free 30-minute fit call
                </a>
                <a href="#pricing" className="rounded-full border border-line bg-white px-7 py-3.5 font-medium hover:border-slate">
                  See pricing
                </a>
              </div>
            </Reveal>

            <div className="mt-20 text-left">
              <LivePipeline />
            </div>
          </div>
        </section>

        {/* Trades */}
        <section aria-label="Industries I work with" className="border-y border-line bg-white py-5">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
            <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 motion-reduce:animate-none">
              {[...TRADES, ...TRADES].map((t, i) => (
                <li key={i} aria-hidden={i >= TRADES.length} className="flex items-center gap-12 whitespace-nowrap text-[1.05rem] font-medium text-slate">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-line" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" aria-labelledby="approach-title" className="scroll-mt-16 bg-mist">
          <div className={`${wrap} py-24 lg:py-28`}>
            <Reveal className="max-w-[40rem]">
              <h2 id="approach-title" className={h2}>
                Four things I fix.
              </h2>
            </Reveal>
            <Levers />
            <Reveal className="mt-16">
              <p className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
                Increasing lead flow on a broken system only brings more stress, more problems, and eats up your nights and
                weekends.
              </p>
              <p className="mt-4 text-[1.15rem] text-slate">So I find the bottleneck first, then turn up the volume.</p>
            </Reveal>
          </div>
        </section>

        {/* What you get */}
        <section id="value" aria-labelledby="value-title" className="scroll-mt-16 border-b border-line bg-white">
          <div className={`${wrap} py-24 lg:py-28`}>
            <Reveal className="max-w-[40rem]">
              <h2 id="value-title" className={h2}>
                What you get.
              </h2>
              <p className="mt-4 text-[1.1rem] leading-relaxed text-slate">Three things, every month. Not a twenty-point plan.</p>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {GET.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-line bg-mist p-7">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-[0.9rem] font-semibold text-white">{i + 1}</span>
                    <h3 className="mt-5 text-[1.35rem] font-semibold tracking-tight">{g.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate">{g.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 max-w-[44rem] border-l-2 border-navy pl-6">
                <p className="text-[1.25rem] font-semibold leading-snug tracking-tight">
                  I&apos;ve seen business from both sides of the desk.
                </p>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-slate">
                  For over a decade I was in banking and finance, working with business owners like you through cash crunches,
                  growing pains and big wins. Then I co-founded a company with a partner and lived it myself. Now I bring both views
                  to your business.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section id="process" aria-label="How the 90 days run" className="scroll-mt-16 bg-white">
          <NinetyDays />
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-16 bg-mist">
          <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-28`}>
            <Reveal>
              <h2 id="pricing-title" className={h2}>
                Upfront pricing. Scope set together.
              </h2>
              <p className="mt-4 max-w-[28rem] text-[1.1rem] leading-relaxed text-slate">
                Partnerships start at $3,000 a month. On the fit call we agree on what needs fixing first. If your business needs
                more, you&apos;ll see the number before anything starts, and anything outside the scope only goes ahead with your
                approval.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-48px_rgba(21,25,30,0.45)]">
                <div className="border-b border-line px-7 py-7 sm:px-9">
                  <p className="font-semibold">Founding partnership</p>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="self-end pb-1.5 text-slate">from</span>
                    <span className="text-[3.6rem] font-semibold leading-none tracking-[-0.045em]">
                      <CountUp to={3000} prefix="$" />
                    </span>
                    <span className="text-slate">per month</span>
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                    Billed monthly. We start with 90 days, long enough to fix something real and measure it, then continue month to
                    month. Scope is confirmed after the fit call.
                  </p>
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
                  <a href="#contact" className="block rounded-full bg-navy px-6 py-3.5 text-center font-medium text-white hover:bg-navy-dark">
                    Start with a free fit call
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-line bg-white">
          <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-28`}>
            <Reveal>
              <h2 id="contact-title" className={h2}>
                What&apos;s the biggest thing slowing you down?
              </h2>
              <p className="mt-4 max-w-[28rem] text-[1.1rem] leading-relaxed text-slate">
                Tell me in a sentence. I&apos;ll come to a free 30-minute fit call with a first read on where the fix is. By the end
                of it, you&apos;ll know whether working together makes sense.
              </p>
              <div className="mt-10 grid max-w-[28rem] gap-5 border-t border-line pt-8 text-[0.98rem]">
                <div>
                  <p className="font-medium">Rather pick a time yourself?</p>
                  <p className="mt-1 text-slate">See my calendar and book a free 30-minute fit call.</p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-navy px-5 py-2.5 font-medium text-white hover:bg-navy-dark"
                  >
                    Book a time
                  </a>
                </div>
                <div>
                  <p className="font-medium">Rather message now?</p>
                  <p className="mt-1 text-slate">
                    Tap &ldquo;Message Alex&rdquo; in the corner to reach me on Messenger or email.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <EmailLink user={site.emailUser} className="mt-1 inline-block text-navy underline underline-offset-4" />
                </div>
              </div>
            </Reveal>
            <FitCallForm messenger={channels().some((c) => c.id === "messenger")} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-mist">
        <div className={`${wrap} flex flex-col gap-4 pb-28 pt-10 text-[0.9rem] text-slate sm:flex-row sm:items-center sm:justify-between sm:pb-10`}>
          <div className="flex items-center gap-2.5">
            <Mark className="h-6 w-6" />
            <span>
              {site.legalName}, {site.city}
            </span>
          </div>
          <EmailLink user={site.emailUser} className="hover:text-ink" />
        </div>
      </footer>

      <MessageDock channels={channels()} emailUser={site.emailUser} />
    </div>
  );
}
