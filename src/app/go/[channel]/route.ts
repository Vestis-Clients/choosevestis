import { channelTarget } from "@/lib/site";

// Redirects /go/whatsapp and /go/messenger to the real destination,
// so the WhatsApp number / link never appears in the page source.
export async function GET(_req: Request, ctx: RouteContext<"/go/[channel]">) {
  const { channel } = await ctx.params;
  const target = channelTarget(channel);
  if (!target) return new Response("Not found", { status: 404 });
  return new Response(null, {
    status: 302,
    headers: { Location: target, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}
