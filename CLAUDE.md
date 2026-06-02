# WellnessNursePro — Project Context

## LAST UPDATED: 2026-06-02

## PROJECT OVERVIEW
- **Domain:** wellnessnursepro.com
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Deployment:** Vercel (welnessnursepro.vercel.app)
- **GitHub:** https://github.com/wyliestevens/wellnessnursepro
- **Path:** /Users/wylie/Claude/welnessnursepro/
- **Blob Store:** store_zAeWnMvuGODmdzu6 (Vercel Blob, public)

## PAGES
1. **Homepage** (`/`) — Hero, NEWSTART preview cards, Ellen White quote, blog preview, CTA
2. **Eight Laws of Health** (`/eight-laws-of-health`) — Full NEWSTART content with Scripture, Ellen White quotes, practical tips
3. **Blog** (`/blog`) — Admin-managed posts, 3 seed articles, individual post pages at `/blog/[slug]`
4. **Dynamic Pages** (`/pages/[slug]`) — Admin-created pages rendered dynamically

## ADMIN DASHBOARD
- **Login:** /admin (password: Password)
- **Dashboard:** /admin/dashboard
- **Admin emails:** dbstevens04@hotmail.com, wylie@aipeakbiz.com
- **Auth:** JWT-based with bcrypt, cookie name: wnp-admin-token

### Admin Sections:
1. **AI Assistant** (`/admin/dashboard`) — Claude-powered chat interface. Natural language commands to manage everything.
2. **Blog Posts** (`/admin/dashboard/blog`) — Full CRUD for blog posts
3. **Pages** (`/admin/dashboard/pages`) — Create/edit/delete site pages, control nav visibility
4. **Media Library** (`/admin/dashboard/media`) — Upload images to Vercel Blob, gallery view, copy URLs
5. **Theme Editor** (`/admin/dashboard/theme`) — Color pickers, font selection, branding, live preview
6. **Deployments** (`/admin/dashboard/deployments`) — View history, rollback to any previous deploy

## DATA LAYER
- **Storage:** Vercel Blob (falls back to /tmp locally)
- **Blog posts:** data/blog-posts.json in blob store
- **Pages:** data/pages.json in blob store
- **Theme:** data/theme.json in blob store
- **Uploads:** uploads/ prefix in blob store

## ENVIRONMENT VARIABLES (Vercel)
- `BLOB_READ_WRITE_TOKEN` — Auto-set by Vercel Blob connection
- `VERCEL_PROJECT_ID` — prj_kRBEADoEcaOT1CHoaKOOXAGrDjtW
- `VERCEL_API_TOKEN` — Vercel auth token for deployment management
- `ANTHROPIC_API_KEY` — **NEEDS TO BE SET** for AI chat to work

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
- Theme is dynamic — changeable from admin dashboard

## DNS SETUP NEEDED
- Edit ALIAS `@` → `76.76.21.21` (or `cname.vercel-dns.com`)
- Edit CNAME `www` → `cname.vercel-dns.com`

## SESSION LOG

### 2026-06-02 — Initial Build + AI Admin Dashboard
- [x] Initialized Next.js 16 project with TypeScript + Tailwind
- [x] Research completed on Eight Laws of Health (NEWSTART)
- [x] Built Homepage with hero, NEWSTART cards, Ellen White quote
- [x] Built Eight Laws of Health page with full SDA health message content
- [x] Built Blog with 3 seed posts and individual post pages
- [x] Full SEO: sitemap, robots, manifest, structured data, llms.txt
- [x] Deployed to Vercel (production)
- [x] Connected custom domain (pending DNS)
- [x] Pushed to GitHub
- [x] Built AI-powered admin dashboard with Claude chat interface
- [x] Built dynamic page system (create pages from admin)
- [x] Built media library with Vercel Blob uploads
- [x] Built theme editor with live preview
- [x] Built deployment rollback system
- [x] Migrated data layer from /tmp to Vercel Blob
- [x] Created Vercel Blob store and connected to project
- [x] Set VERCEL_PROJECT_ID and VERCEL_API_TOKEN env vars

## WHAT'S NEXT
- **Set ANTHROPIC_API_KEY** in Vercel env vars (required for AI chat)
- Configure DNS for wellnessnursepro.com
- Run full /seo audit once domain is live
- Add real images/photos
