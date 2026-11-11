import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Open to all crawlers, including AI search (GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended):
// being quoted in AI answers is part of the point.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/go/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
