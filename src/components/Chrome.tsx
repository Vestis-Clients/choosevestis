import Link from "next/link";
import { StickyHeader } from "@/components/Bits";
import EmailLink from "@/components/EmailLink";
import { groups, services } from "@/content/services";
import { site } from "@/lib/site";

export const wrap = "mx-auto max-w-[74rem] px-5 sm:px-8";

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-navy text-white ${className}`} aria-hidden>
      <svg viewBox="0 0 32 32" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square">
        <path d="M8 24 23 9M11 8h13v13" />
      </svg>
    </span>
  );
}

/** Site header. On the homepage the section links are in-page anchors; elsewhere they point back to the homepage. */
export function SiteHeader({ home = false }: { home?: boolean }) {
  const p = home ? "" : "/";
  const links: [string, string][] = [
    ["#approach", "What I fix"],
    ["#value", "What you get"],
    ["#process", "Process"],
    ["#pricing", "Pricing"],
  ];
  return (
    <StickyHeader>
      <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.legalName} home`}>
          <Mark />
          <span className="text-[1.1rem] font-semibold tracking-tight">
            Vestis <span className="font-normal text-slate">Solutions</span>
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-[0.95rem]">
          {links.map(([h, l]) => (
            <a key={h} href={p + h} className="hidden text-slate hover:text-ink md:inline">
              {l}
            </a>
          ))}
          <a href={`${p}#contact`} className="rounded-full bg-ink px-4 py-2 font-medium text-white hover:bg-navy">
            Book a fit call
          </a>
        </nav>
      </div>
    </StickyHeader>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className={`${wrap} pt-14`}>
        <nav aria-label="Services" className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {groups.map((g) => (
            <div key={g}>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-slate">{g}</p>
              <ul className="mt-3 grid gap-2 text-[0.93rem]">
                {services
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`} className="text-ink/80 hover:text-navy">
                        {s.nav}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div
        className={`${wrap} mt-12 flex flex-col gap-4 border-t border-line pb-28 pt-8 text-[0.9rem] text-slate sm:flex-row sm:items-center sm:justify-between sm:pb-10`}
      >
        <div className="flex items-center gap-2.5">
          <Mark className="h-6 w-6" />
          <span>
            {site.legalName}, {site.city}
          </span>
        </div>
        <EmailLink user={site.emailUser} className="hover:text-ink" />
      </div>
    </footer>
  );
}
