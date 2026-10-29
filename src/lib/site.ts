// Public site settings. Values marked NEXT_PUBLIC_ are safe to show in the browser.
// Leave a channel's env var empty and its button simply won't appear.

export const site = {
  name: "Vestis Solutions",
  legalName: "Vestis Solutions LLC",
  domain: "choosevestis.com",
  url: "https://choosevestis.com",
  city: "Charlotte, NC",
  owner: "Alex",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@choosevestis.com",
  // Digits only, with country code, e.g. 17045551234
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  // Your Facebook Page username, e.g. choosevestis (from facebook.com/choosevestis)
  messenger: (process.env.NEXT_PUBLIC_MESSENGER_PAGE || "").trim(),
  // Display + dial number, e.g. +17045551234
  phone: (process.env.NEXT_PUBLIC_PHONE || "").trim(),
  // How many founding spots are still open (0–3). Empty = don't show a count.
  foundingSpotsLeft: process.env.NEXT_PUBLIC_FOUNDING_SPOTS_LEFT ?? "",
};

export const prefill =
  "Hi Alex, I found you on choosevestis.com. The biggest thing slowing my business down is: ";

export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (d.length !== 10) return raw;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function channels() {
  const list: { id: string; label: string; detail: string; href: string }[] = [];
  if (site.whatsapp)
    list.push({
      id: "whatsapp",
      label: "WhatsApp",
      detail: "Opens a chat with me",
      href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(prefill)}`,
    });
  if (site.phone)
    list.push({
      id: "sms",
      label: "Text me",
      detail: formatPhone(site.phone),
      href: `sms:${site.phone}?&body=${encodeURIComponent(prefill)}`,
    });
  if (site.messenger)
    list.push({
      id: "messenger",
      label: "Messenger",
      detail: "Message the Facebook page",
      href: `https://m.me/${site.messenger}`,
    });
  if (site.phone)
    list.push({
      id: "call",
      label: "Call",
      detail: formatPhone(site.phone),
      href: `tel:${site.phone}`,
    });
  list.push({
    id: "email",
    label: "Email",
    detail: site.email,
    href: `mailto:${site.email}`,
  });
  return list;
}
