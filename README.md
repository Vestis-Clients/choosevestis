# choosevestis.com

The Vestis Solutions LLC website. It's built with Next.js and deploys to Vercel.

## What's on the site
- **Landing page**: clean white and light grey with a navy accent. The hero is a live lead board where a job moves from missed call to booked on its own, with floating notifications that react to the mouse. Scrolling drives a day 0–90 counter and checklist, the "levers" illustrations animate in, and the price counts up.
- **Fit call form** (`#contact`): sends each request to your inbox through Resend. The reply-to is set to the client's email, so you can just hit Reply.
- **"Text Alex" button**: WhatsApp, Text, Messenger, Call, and Email. Each channel shows up only after you fill in its setting.
- `/contact` redirects to the form, so it's safe to print on business cards.

---

## Setup, in order

### 1. Email inbox: Zoho Mail (free)
1. Go to zoho.com/mail and choose **Business Email → Forever Free**. It covers up to 5 users on one domain.
2. Add `choosevestis.com`. Zoho gives you a TXT record so you can prove you own the domain.
3. In **Namecheap → Domain List → choosevestis.com → Manage → Advanced DNS**:
   - Add the Zoho verification TXT record.
   - Under **Mail Settings**, pick **Custom MX** and add the 3 Zoho MX records exactly as Zoho lists them.
   - Add Zoho's SPF TXT record (`v=spf1 include:zohomail.com ~all`). If Resend later asks for SPF on the same host, **merge them into one SPF record** rather than creating two.
   - Add Zoho's DKIM TXT record.
4. Create the `alex@` mailbox. Then add `contact@` as a second user or as a group.
5. Install the **Zoho Mail** app on your phone. The free plan only works through the web and their app, not Apple Mail or Outlook.

### 2. Resend (sends the form emails)
1. Sign up at resend.com, open **Domains → Add domain**, and enter `choosevestis.com`.
2. Add the DNS records Resend shows you in Namecheap Advanced DNS. Resend uses a `send.` subdomain, so its records won't conflict with Zoho's.
3. Wait until the domain shows **Verified**, then create an API key under **API Keys**.

### 3. Vercel
1. Push this folder to a new GitHub repo, then go to **Vercel → Add New Project** and import it.
2. Under **Settings → Environment Variables**, add the values from `.env.example`:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | your key from step 2 |
| `CONTACT_TO_EMAIL` | `contact@choosevestis.com` |
| `CONTACT_FROM_EMAIL` | `Vestis Website <website@choosevestis.com>` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `1704XXXXXXX` (digits only) |
| `NEXT_PUBLIC_PHONE` | `+1704XXXXXXX` |
| `NEXT_PUBLIC_MESSENGER_PAGE` | your Facebook Page username |
| `NEXT_PUBLIC_FOUNDING_SPOTS_LEFT` | `3` (or leave empty to hide the counter) |

3. Redeploy after you change any variable. The `NEXT_PUBLIC_` values are baked in at build time.

### 4. Point the domain at Vercel
1. In Vercel, open **Settings → Domains** and add both `choosevestis.com` and `www.choosevestis.com`.
2. In Namecheap Advanced DNS, add the records Vercel lists. Usually that's an `A` record for `@` and a `CNAME` for `www`.
3. Leave the Zoho MX and TXT records in place. Website records and email records don't conflict.

### 5. Test
- Submit the form on the live site. It should arrive at `contact@` within a few seconds.
- Tap each "Text Alex" option on your phone.

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
- Contact channels: `src/lib/site.ts`
- Colors: `src/app/globals.css`, at the top
