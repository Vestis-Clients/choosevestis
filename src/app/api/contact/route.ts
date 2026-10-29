import { Resend } from "resend";

type Payload = {
  name?: unknown;
  business?: unknown;
  phone?: unknown;
  email?: unknown;
  details?: unknown;
  bottleneck?: unknown;
  contactPref?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Simple per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots: filled the hidden field or submitted faster than a person can type.
  // Pretend it worked so they don't retry.
  if (str(body.website, 200) || (typeof body.elapsedMs === "number" && body.elapsedMs < 2500)) {
    return Response.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ error: "Too many requests. Wait a few minutes." }, { status: 429 });
  }

  const data = {
    name: str(body.name, 120),
    business: str(body.business, 160),
    phone: str(body.phone, 40),
    email: str(body.email, 200),
    details: str(body.details, 2000),
    bottleneck: str(body.bottleneck, 120),
    contactPref: str(body.contactPref, 20) || "Call",
  };

  if (!data.name) return Response.json({ error: "Add your name." }, { status: 400 });
  if (!data.phone && !data.email) return Response.json({ error: "Add a phone number or email." }, { status: 400 });
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return Response.json({ error: "That email doesn't look right." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contact@choosevestis.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Vestis Website <website@choosevestis.com>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; submission not sent:", data);
    return Response.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Business / trade", data.business || "—"],
    ["Phone", data.phone || "—"],
    ["Email", data.email || "—"],
    ["Prefers", data.contactPref],
    ["Bottleneck", data.bottleneck || "—"],
  ];

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;color:#17271d;max-width:560px">
    <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4e6b47;margin:0 0 8px">New fit call request</p>
    <h1 style="font-size:22px;margin:0 0 20px">${esc(data.name)}${data.business ? ` · ${esc(data.business)}` : ""}</h1>
    <table style="border-collapse:collapse;width:100%;font-size:15px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#5b665e;border-bottom:1px solid #e3e5dd;white-space:nowrap">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e3e5dd">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    ${data.details ? `<p style="margin:20px 0 6px;color:#5b665e">In their words</p><p style="margin:0;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(data.details)}</p>` : ""}
  </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (data.details ? `\n\nIn their words:\n${data.details}` : "");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email || undefined,
      subject: `Fit call request: ${data.name}${data.business ? ` (${data.business})` : ""}`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return Response.json({ error: "The message didn't send." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return Response.json({ error: "The message didn't send." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
