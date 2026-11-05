import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted so the site never depends on Google Fonts at build or run time.
const plex = localFont({
  src: "../fonts/ibm-plex-sans-latin-wght-normal.woff2",
  variable: "--font-plex",
  weight: "100 700",
  display: "swap",
});

const title = "Vestis Solutions | Fractional Growth Partner for owner-led businesses";
const description =
  "More of the right leads, and a business ready for them. SEO and AEO, a sales process that closes, connected systems, and executive-level advice for owner-led businesses. Based in Charlotte, NC.";

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
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
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
    <html lang="en" className={plex.variable}>
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
