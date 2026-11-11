import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Bits";
import { SiteFooter, SiteHeader, wrap } from "@/components/Chrome";
import MessageDock from "@/components/MessageDock";
import { getService, services } from "@/content/services";
import { bookingUrl, channels, site } from "@/lib/site";


export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: s.title, description: s.description, url: `${site.url}/${s.slug}`, siteName: site.legalName, type: "website" },
    twitter: { card: "summary_large_image", title: s.title, description: s.description },
  };
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.3rem] h-[1.05rem] w-[1.05rem] shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default async function ServicePage({ params }: PageProps<"/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const url = `${site.url}/${s.slug}`;
  const related = s.related.map(getService).filter((r) => r && r.slug !== s.slug).slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.h1,
      serviceType: s.keyword,
      description: s.description,
      url,
      provider: { "@type": "ProfessionalService", "@id": `${site.url}/#business`, name: site.legalName, url: site.url },
      areaServed: [
        { "@type": "City", name: "Charlotte, NC" },
        { "@type": "Country", name: "United States" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: s.nav, item: url },
      ],
    },
  ];

  const h2 = "text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.02em] [text-wrap:balance]";

  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative -mt-16 pt-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(#d5d9df_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,#000_35%,transparent_100%)]"
          />
          <div className={`${wrap} pb-16 pt-12 sm:pt-16`}>
            <nav aria-label="Breadcrumb" className="text-[0.88rem] text-slate">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{s.nav}</span>
            </nav>
            <Reveal>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.85rem] text-slate shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                {s.eyebrow}
              </p>
              <h1 className="mt-6 max-w-[52rem] text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] [text-wrap:balance]">
                {s.h1}
              </h1>
              <p className="mt-6 max-w-[40rem] text-[1.18rem] leading-relaxed text-slate">{s.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
                  Book a free fit call
                </a>
                <a href="/#pricing" className="rounded-full border border-line bg-white px-6 py-3 font-medium hover:border-ink">
                  See pricing
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Definition + body */}
        <section className="border-t border-line bg-white">
          <div className={`${wrap} grid gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20`}>
            <div className="min-w-0">
              <div className="max-w-[44rem] border-l-2 border-navy pl-6">
                <p className="text-[1.15rem] font-medium leading-relaxed">{s.definition}</p>
              </div>

              <div className="mt-14 grid max-w-[44rem] gap-14">
                {s.sections.map((sec) => (
                  <div key={sec.h2}>
                    <h2 className={h2}>{sec.h2}</h2>
                    {sec.paras.map((p, i) => (
                      <p key={i} className="mt-4 text-[1.05rem] leading-relaxed text-ink/85">
                        {p}
                      </p>
                    ))}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="mt-5 grid gap-3">
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-[1.02rem] leading-relaxed">
                            <Check />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:pt-1">
              <div className="rounded-2xl border border-line bg-mist p-7 lg:sticky lg:top-24">
                <p className="font-semibold">You might need this if</p>
                <ul className="mt-4 grid gap-3 text-[0.97rem] leading-relaxed">
                  {s.signs.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-7 block rounded-full bg-ink px-5 py-3 text-center font-medium text-white hover:bg-navy">
                  Talk it through
                </a>
                <p className="mt-3 text-center text-[0.85rem] text-slate">Free 30-minute fit call</p>
              </div>
            </aside>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="border-t border-line bg-mist">
          <div className={`${wrap} py-20`}>
            <h2 id="faq-title" className={h2}>
              Common questions
            </h2>
            <div className="mt-10 max-w-[48rem] divide-y divide-line border-y border-line">
              {s.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.08rem] font-medium [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <span className="mt-1 text-slate transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[42rem] leading-relaxed text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="border-t border-line bg-white">
            <div className={`${wrap} py-20`}>
              <h2 id="related-title" className={h2}>
                Related
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <Link key={r!.slug} href={`/${r!.slug}`} className="group rounded-2xl border border-line p-6 hover:border-navy">
                    <p className="font-semibold group-hover:text-navy">{r!.nav}</p>
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-slate">{r!.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-ink text-white">
          <div className={`${wrap} flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between`}>
            <div className="max-w-[40rem]">
              <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.02em]">What&apos;s the biggest thing slowing you down?</p>
              <p className="mt-3 text-white/70">
                Book a free 30-minute fit call. I&apos;ll come with a first read on where the fix is. Partnerships start at $3,000 a month.
              </p>
            </div>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-white px-6 py-3.5 font-medium text-ink hover:bg-navy-tint">
              Book a fit call
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MessageDock channels={channels()} emailUser={site.emailUser} />
    </div>
  );
}
