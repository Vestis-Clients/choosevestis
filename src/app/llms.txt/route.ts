import { groups, services } from "@/content/services";
import { site } from "@/lib/site";

// /llms.txt: a plain summary of the site for AI tools (https://llmstxt.org).

export function GET() {
  const lines = [
    `# ${site.legalName}`,
    "",
    "> Fractional Growth Partner for owner-led businesses, mainly trade and home-service companies (roofing, HVAC, plumbing, contractors). Based in Charlotte, NC; works with clients across the United States. Run by Alex Kiforishin.",
    "",
    "What's included: a website built or rebuilt to be found; ongoing SEO and AEO (Google, Google Maps, ChatGPT and Gemini answers); a sales process review; connecting the tools a business already uses (CRM, scheduling, estimating, phones); and executive-level advice (COO, CMO, CTO and CEO-type decisions), including four 30-minute owner sessions a month.",
    "",
    "Pricing: partnerships start at $3,000 a month. The first term is 90 days, then month to month. Paid ads are optional; the client pays ad spend directly.",
    "",
    `Free 30-minute fit call: https://cal.com/choosevestis/fit-call`,
    "",
    "## Main page",
    "",
    `- [Home](${site.url}/): overview, what's included, the 90-day process and pricing`,
    "",
    ...groups.flatMap((g) => [
      `## ${g}`,
      "",
      ...services.filter((s) => s.group === g).map((s) => `- [${s.nav}](${site.url}/${s.slug}): ${s.description}`),
      "",
    ]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
