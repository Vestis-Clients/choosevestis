import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted so the site never depends on Google Fonts at build or run time.
const inter = localFont({ src: "../fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const interTight = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});
const kalam = localFont({
  src: [
    { path: "../fonts/kalam-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/kalam-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-kalam",
  display: "swap",
});

const title = "Vestis Solutions | Fractional growth partner for trade businesses";
const description =
  "Hands-on help for trade business owners to win the right jobs, simplify how work gets done, and take pressure off the owner, without another full-time hire. Based in Charlotte, NC.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.legalName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f3f3ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  description,
  areaServed: "US",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Charlotte",
    addressRegion: "NC",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${kalam.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
