// Service / keyword pages. Each page's copy lives in its own JSON file in ./services,
// so it can be edited without touching the page template in src/app/[slug]/page.tsx.
import fractionalGrowthPartner from "./services/fractional-growth-partner.json";
import fractionalCoo from "./services/fractional-coo.json";
import fractionalCmo from "./services/fractional-cmo.json";
import fractionalCto from "./services/fractional-cto.json";
import fractionalCeo from "./services/fractional-ceo.json";
import salesProcess from "./services/sales-process-consulting.json";
import crmIntegration from "./services/crm-integration.json";
import businessSystems from "./services/business-systems.json";
import businessStructure from "./services/business-structure.json";
import companyCulture from "./services/company-culture.json";
import seoAeo from "./services/seo-aeo.json";
import websiteDesign from "./services/website-design.json";
import roofing from "./services/roofing-companies.json";
import homeService from "./services/home-service-businesses.json";

export type Section = { h2: string; paras: string[]; bullets?: string[] };
export type Faq = { q: string; a: string };
export type Group = "Roles" | "Systems" | "Marketing" | "Industries";
export type Service = {
  slug: string;
  keyword: string;
  secondary: string[];
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  definition: string;
  sections: Section[];
  signs: string[];
  faq: Faq[];
  related: string[];
  /** Short name for menus and the footer. */
  nav: string;
  group: Group;
};

type Raw = Omit<Service, "nav" | "group">;

// Order here is the order in the footer.
const LIST: [Raw, string, Group][] = [
  [fractionalGrowthPartner, "Fractional growth partner", "Roles"],
  [fractionalCoo, "Fractional COO", "Roles"],
  [fractionalCmo, "Fractional CMO", "Roles"],
  [fractionalCto, "Fractional CTO", "Roles"],
  [fractionalCeo, "Fractional CEO", "Roles"],
  [salesProcess, "Sales process", "Systems"],
  [crmIntegration, "CRM integration", "Systems"],
  [businessSystems, "Business systems", "Systems"],
  [businessStructure, "Business structure", "Systems"],
  [companyCulture, "Company culture", "Systems"],
  [seoAeo, "SEO and AEO", "Marketing"],
  [websiteDesign, "Website design", "Marketing"],
  [roofing, "Roofing companies", "Industries"],
  [homeService, "Home service businesses", "Industries"],
];

export const services: Service[] = LIST.map(([raw, nav, group]) => ({ ...raw, nav, group }));

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const groups: Group[] = ["Roles", "Systems", "Marketing", "Industries"];
