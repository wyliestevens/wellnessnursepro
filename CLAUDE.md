# WellnessNursePro — Project Context

## LAST UPDATED: 2026-06-02

## PROJECT OVERVIEW
- **Domain:** wellnessnursepro.com
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Deployment:** Vercel (welnessnursepro.vercel.app)
- **GitHub:** https://github.com/wyliestevens/wellnessnursepro
- **Path:** /Users/wylie/Claude/welnessnursepro/

## PAGES
1. **Homepage** (`/`) — Hero, NEWSTART preview cards, Ellen White quote, blog preview, CTA
2. **Eight Laws of Health** (`/eight-laws-of-health`) — Full NEWSTART content with Scripture, Ellen White quotes, practical tips
3. **Blog** (`/blog`) — Admin-managed posts, 3 seed articles, individual post pages at `/blog/[slug]`

## ADMIN
- **Login:** /admin
- **Dashboard:** /admin/dashboard
- **Admin emails:**
  - dbstevens04@hotmail.com
  - wylie@aipeakbiz.com
- **Default password:** WellnessAdmin2026!
- **Auth:** JWT-based with bcrypt password hashing
- **Features:** Blog post CRUD (create, edit, delete), logout
- **Blog data:** Stored at /tmp/wellnessnursepro-blog.json (file-based, seeds 3 posts)

## SEO
- sitemap.xml, robots.txt, manifest.webmanifest
- JSON-LD structured data (Organization, WebSite, Article, Breadcrumb)
- Open Graph + Twitter card meta on all pages
- llms.txt for AI crawlers
- Semantic HTML throughout

## DESIGN
- Colors: #2d6a4f (primary green), #40916c (secondary), #d4a574 (accent gold), #f8f6f0 (light bg)
- Fonts: Lora (serif headings), Inter (sans body)
- Mobile-first responsive
- Sticky header with hamburger mobile menu

## DNS SETUP NEEDED
Domain wellnessnursepro.com needs DNS configured:
- **Option A:** Set A record: `wellnessnursepro.com → 76.76.21.21`
- **Option B:** Change nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`

## SESSION LOG

### 2026-06-02 — Initial Build (COMPLETE)
- [x] Initialized Next.js 16 project with TypeScript + Tailwind
- [x] Research completed on Eight Laws of Health (NEWSTART)
- [x] Built Homepage with hero, NEWSTART cards, Ellen White quote
- [x] Built Eight Laws of Health page with full SDA health message content
- [x] Built Blog with 3 seed posts and individual post pages
- [x] Built Admin dashboard with JWT auth and blog CRUD
- [x] Full SEO: sitemap, robots, manifest, structured data, llms.txt
- [x] Deployed to Vercel (production)
- [x] Connected custom domain (pending DNS)
- [x] Pushed to GitHub

## WHAT'S NEXT
- Configure DNS for wellnessnursepro.com (A record or nameservers)
- Run full /seo audit once domain is live
- Add images/photos to replace emoji placeholders
- Consider adding: contact form, newsletter signup, more blog content
- Move blog storage from /tmp to a database for persistence on Vercel
