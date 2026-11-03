// Public site settings.
//
// Privacy: no phone number or raw email address is ever written into the page HTML,
// so scrapers and spam bots crawling the site can't harvest them.
//  - WhatsApp and Messenger go through /go/<channel>, a server-side redirect.
//    Their real URLs live in server-only env vars (no NEXT_PUBLIC_ prefix).
//  - The email address is assembled in the browser only after the page loads.

export const site = {
  name: "Vestis Solutions",
  legalName: "Vestis Solutions LLC",
  domain: "choosevestis.com",
  url: "https://choosevestis.com",
  city: "Charlotte, NC",
  owner: "Alex",
  // Mailbox name only; the "@choosevestis.com" is joined client-side.
  emailUser: process.env.NEXT_PUBLIC_CONTACT_EMAIL_USER || "contact",
};

export const prefill =
  "Hi Alex, I found you on choosevestis.com. The biggest thing slowing my business down is: ";

// Server-only destinations for /go/<channel>. Never imported into client code.
export function channelTarget(id: string): string | null {
  if (id === "whatsapp") {
    // A WhatsApp short link (wa.me/message/XXXX) or wa.me/<number>. Stays on the server.
    const url = (process.env.WHATSAPP_URL || "").trim();
    if (!url) return null;
    if (/^https:\/\/wa\.me\/\d+$/.test(url)) return `${url}?text=${encodeURIComponent(prefill)}`;
    return url;
  }
  if (id === "messenger") {
    const page = (process.env.MESSENGER_PAGE || "").trim();
    return page ? `https://m.me/${page}` : null;
  }
  return null;
}

export type Channel = { id: string; label: string; detail: string; href: string };

// What the "Message Alex" panel shows. Hrefs point at our own redirect, not the real target.
export function channels(): Channel[] {
  const list: Channel[] = [];
  if (channelTarget("whatsapp")) list.push({ id: "whatsapp", label: "WhatsApp", detail: "Opens a chat with me", href: "/go/whatsapp" });
  if (channelTarget("messenger")) list.push({ id: "messenger", label: "Messenger", detail: "Message the Vestis Facebook page", href: "/go/messenger" });
  list.push({ id: "email", label: "Email", detail: "Opens your email app", href: "email" });
  return list;
}
