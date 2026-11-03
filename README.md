# choosevestis.com

The Vestis Solutions LLC website. It's built with Next.js and deploys to Vercel.

## What's on the site
- **Landing page**: live lead board hero, scroll-driven 90-day section, animated levers, pricing.
- **Fit call form** (`#contact`): sends each request to contact@choosevestis.com through Resend. Reply-to is the visitor's email.
- **"Message Alex" button**: Messenger and Email (WhatsApp appears if `WHATSAPP_URL` is set). Links go through `/go/<channel>` so no number or link is in the page source.
- **Book a time**: links to Cal.com (`cal.com/choosevestis/fit-call`), set in `src/lib/booking.ts`. Bookings go to the Google Calendar with a Google Meet link.
- `/contact` redirects to the form.

## How it's set up
| Piece | Where |
|---|---|
| Code | GitHub `Vestis-Clients/choosevestis` (public, no secrets) |
| Hosting | Vercel project `choosevestis` (auto-deploys on push to `main`) |
| Domain + DNS | Namecheap, choosevestis.com |
| Inbox | Namecheap Private Email: mailbox alex@, aliases contact@, info@, billing@ |
| Form email | Resend (separate account for Vestis), domain verified |

## Vercel environment variables
| Name | What |
|---|---|
| `RESEND_API_KEY` | Resend key, sending access, choosevestis.com only |
| `WHATSAPP_URL` | WhatsApp Business short link (wa.me/message/...). Empty = hidden |
| `MESSENGER_PAGE` | Facebook Page username. Empty = hidden |

Redeploy after changing any variable.

## Running it locally
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

## Where to edit things
- Page copy and pricing: `src/app/page.tsx`
- Hero lead board (leads, stages, notifications): `src/components/LivePipeline.tsx`
- 90-day scroll section and milestone days: `src/components/NinetyDays.tsx`
- Form questions and bottleneck options: `src/components/FitCallForm.tsx`
- Contact channels and privacy redirects: `src/lib/site.ts`, `src/app/go/[channel]/route.ts`
- Colors: `src/app/globals.css`, at the top
