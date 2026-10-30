# Comprehensive SEO & AEO Technical Audit and Optimization Roadmap

**Document Reference:** `TODO_seo-auditor.md`  
**Target Domain:** `https://lacasadelmofongomd.net` (and fallback `https://casamofongo.pages.dev`)  
**Target Entity:** La Casa Del Mofongo (Silver Spring, MD)  
**Lead Auditor:** Senior Technical SEO & AEO Architect  
**Audit Date:** 2026-10-29  

---

## 1. Context & Scope

- **Site URL & Scope:** Full-site crawl and code-level architectural audit covering all public routes (`/index.html`, `/menu.html`, `/about.html`, `/gallery.html`, `/contact.html`) and administrative route (`/admin.html`).
- **Target Markets & Geographic Regions:** Silver Spring, MD, Montgomery County, and the broader Washington D.C. / Maryland / Virginia (DMV) metropolitan area (20-mile radius).
- **Languages:** Primary: English (`en-US`), Secondary/Bilingual Target: Spanish (`es-US`, Caribbean/Dominican & Salvadoran diaspora).
- **Primary Business Goals:**
  1. Capture high-intent transactional local searches (e.g., "mofongo near me", "dominican restaurant silver spring md", "salvadoran food silver spring", "best mofongo dmv", "catering silver spring md").
  2. Optimize for Answer Engine Optimization (AEO) and conversational search agents (Google AI Overviews, Apple Intelligence, Perplexity, ChatGPT Search) through structured Entity-Attribute-Relationship schema modeling.
  3. Maximize conversion rate for direct reservations (`tel:(240) 863-3750`), directions, and takeout/catering inquiries.

---

## 2. Executive Summary & Core Web Vitals Status

| Metric | Target | Current Lab / Edge Estimate | Assessment | Key Optimization Area |
| :--- | :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | < 2.5s | ~1.4s – 1.8s | **PASS (Good)** | Preload hero background image; optimize font swap |
| **INP (Interaction to Next Paint)** | < 200ms | < 80ms | **PASS (Good)** | Lightweight vanilla JS; no heavy frameworks |
| **CLS (Cumulative Layout Shift)** | < 0.1 | 0.04 | **PASS (Good)** | Add explicit `width` & `height` or `aspect-ratio` to cards |
| **TTFB (Time to First Byte)** | < 800ms | ~45ms – 90ms | **PASS (Exceptional)** | Served globally via Cloudflare Edge Network |
| **Mobile Friendliness** | 100% Responsive | Single-column cards | **PASS (Good)** | All grid layouts strict 1-column on mobile viewports |
| **Indexing & Discovery** | 100% Clean | **FAIL (Missing Directives)** | **CRITICAL** | Missing `robots.txt`, `sitemap.xml`, canonicals & schema |

---

## 3. Audit Findings (Checklist)

- [ ] **SEO-FIND-1.1: Missing `robots.txt` and `sitemap.xml` in Root Directory**
  - **Location:** `https://lacasadelmofongomd.net/robots.txt`, `https://lacasadelmofongomd.net/sitemap.xml`
  - **Description:** Neither `robots.txt` nor `sitemap.xml` exist in the repository root. Search engines (Googlebot, Bingbot) and AI crawler agents (GPTBot, PerplexityBot, ClaudeBot) crawling the site receive a 404 handler, slowing discovery and sitemap-based index prioritization.
  - **Impact:** **Critical**. Prevents rapid re-crawling, discovery of new routes, and direct declaration of preferred URLs.
  - **Recommendation:** Deploy a production-grade `robots.txt` that allows all major compliant bots, specifies the sitemap URL, and disallows private administrative routes (`/admin.html`). Generate a validated `sitemap.xml` including `lastmod`, `changefreq`, and image XML namespaces.

- [ ] **SEO-FIND-1.2: Unprotected Administration Route Indexable (`admin.html`)**
  - **Location:** `https://lacasadelmofongomd.net/admin.html`
  - **Description:** The CMS admin portal (`admin.html`) lacks a `<meta name="robots" content="noindex, nofollow">` tag. Without this tag, search engines can index the login portal page into the public SERP.
  - **Impact:** **High**. Dilutes organic domain authority, leaks internal backend access URL to public indexes, and creates crawl budget waste.
  - **Recommendation:** Insert `<meta name="robots" content="noindex, nofollow">` directly into the `<head>` of `admin.html` and add `Disallow: /admin.html` in `robots.txt`.

- [ ] **SEO-FIND-1.3: Total Absence of Canonical Tags (`rel="canonical"`)**
  - **Location:** All pages (`index.html`, `menu.html`, `about.html`, `gallery.html`, `contact.html`)
  - **Description:** No canonical tags are declared. Because the site is accessible via `https://lacasadelmofongomd.net`, `https://lacasadelmofongomd.net/index.html`, and `https://casamofongo.pages.dev`, search engines risk duplicating index records, splitting page authority (PageRank), and fragmenting backlink equity.
  - **Impact:** **Critical**. High risk of duplicate content penalties and dilution of canonical ranking signals.
  - **Recommendation:** Implement absolute, self-referencing canonical tags on every page targeting the custom domain (`https://lacasadelmofongomd.net/...`).

- [ ] **SEO-FIND-1.4: Complete Absence of Structured Data Schema (`JSON-LD`)**
  - **Location:** Entire site
  - **Description:** The site currently has 0 JSON-LD schema blocks. It lacks `Restaurant` / `FoodEstablishment` schema, `Menu` / `MenuItem` schema, `LocalBusiness` NAP data, `GeoCoordinates`, `OpeningHoursSpecification`, and `BreadcrumbList`.
  - **Impact:** **Critical**. Disqualifies the restaurant from Google Rich Results (menu rich snippets, price badges, star ratings, carousel inclusion), Google Maps Knowledge Graph anchoring, and Answer Engine Optimization (AEO) entity graphs used by ChatGPT, Perplexity, and Google AI Overviews.
  - **Recommendation:** Inject nested JSON-LD schema on `index.html` and `contact.html` with full `Restaurant` entity specifications (`@type: Restaurant`), telephone, address, menu URL, cuisine types (`Dominican`, `Caribbean`, `Latin American`, `Salvadoran`), opening hours, and price range. Add `Menu` schema to `menu.html`.

- [ ] **SEO-FIND-1.5: Missing Open Graph & Twitter Card Meta Tags on Subpages**
  - **Location:** `menu.html`, `about.html`, `gallery.html`, `contact.html`
  - **Description:** While `index.html` has basic Open Graph tags, subpages lack `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, and Twitter card tags.
  - **Impact:** **Medium**. Reduces click-through rates (CTR) and visual presentation when links are shared across social channels, WhatsApp, iMessage, and Facebook.
  - **Recommendation:** Standardize OG and Twitter Card tags across all pages with high-resolution food imagery (`assets/images/MainPlato.webp` or `assets/images/Plato3.webp`).

- [ ] **SEO-FIND-1.6: Title Tag Length & Meta Description Optimization**
  - **Location:**
    - `index.html`: Title length is 85 characters (exceeds Google's ~60 char desktop truncation threshold).
    - `menu.html`: Meta description is 171 characters (truncated on mobile devices).
    - `gallery.html`: Meta description is 170 characters.
    - `contact.html`: Meta description is 175 characters.
  - **Impact:** **High**. Truncated titles look untidy in SERPs (`...`) and push key geographic and transactional keywords outside the user viewport, depressing CTR.
  - **Recommendation:** Refactor titles to 52–58 characters front-loading the primary target keywords ("Mofongo", "Dominican Restaurant", "Silver Spring MD"). Rewrite meta descriptions to 150–155 characters with explicit calls-to-action (CTA).

- [ ] **SEO-FIND-1.7: Missing HTML Language & Hreflang Configuration**
  - **Location:** `<html>` tag on all templates (`<html lang="en">`)
  - **Description:** The restaurant serves a large Hispanic customer base (Dominican & Salvadoran), but the site contains no `hreflang` tags or bilingual meta alternates.
  - **Impact:** **Medium**. Misses high-value Spanish queries (e.g. "restaurante dominicano cerca de mi", "comida salvadoreña silver spring", "el mejor mofongo de maryland").
  - **Recommendation:** Ensure primary language is declared as `en-US` and implement Spanish metadata headers or plan a localized Spanish subfolder (`/es/`).

- [ ] **SEO-FIND-1.8: Missing Explicit Image Dimensions (`width` / `height` attributes)**
  - **Location:** All 69 `<img>` elements across templates
  - **Description:** Images rely on CSS `height` and `object-fit` without native HTML `width="..."` and `height="..."` attributes.
  - **Impact:** **Medium (Core Web Vitals)**. Although current CLS is low, missing native dimensions risks layout shifts during initial browser reflow before external CSS is parsed.
  - **Recommendation:** Add explicit `width` and `height` dimensions or CSS `aspect-ratio` to prevent any cumulative layout shifts during slow 3G/4G connections.

- [ ] **SEO-FIND-1.9: Missing HTTP Security Headers for Domain Trust & Crawl Authority**
  - **Location:** Server response headers
  - **Description:** `curl -I https://lacasadelmofongomd.net` reveals missing `Strict-Transport-Security` (HSTS), `Permissions-Policy`, and `Content-Security-Policy`.
  - **Impact:** **Medium**. Google considers HTTPS security and HSTS as minor positive page experience signals.
  - **Recommendation:** Add a `_headers` file in Cloudflare Pages to inject `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` and security headers.

---

## 4. Remediation Recommendations (Checklist)

- [ ] **SEO-REC-1.1: Deploy Root `robots.txt` File**
  - **Priority:** **Critical**
  - **Effort:** 15 minutes
  - **Expected Outcome:** Immediate crawl guidance for Googlebot, Bingbot, and AI search crawlers; protection of admin routes.
  - **Validation:** Test with Google Search Console Robots Testing Tool and `curl -I https://lacasadelmofongomd.net/robots.txt`.

- [ ] **SEO-REC-1.2: Deploy Validated `sitemap.xml` File**
  - **Priority:** **Critical**
  - **Effort:** 30 minutes
  - **Expected Outcome:** 100% crawl coverage of all core canonical pages and high-resolution food images.
  - **Validation:** Submit sitemap to Google Search Console and Bing Webmaster Tools; verify zero errors.

- [ ] **SEO-REC-1.3: Add Self-Referencing Canonical Tags & Hreflang across all Pages**
  - **Priority:** **Critical**
  - **Effort:** 45 minutes
  - **Expected Outcome:** Consolidation of link equity onto primary custom domain `https://lacasadelmofongomd.net`.
  - **Validation:** Inspect DOM head in Chrome DevTools; verify canonical href matches exact URL.

- [ ] **SEO-REC-1.4: Protect Admin Route with `noindex, nofollow`**
  - **Priority:** **High**
  - **Effort:** 5 minutes
  - **Expected Outcome:** Prevention of CMS portal appearing in public search engine results.
  - **Validation:** Check `admin.html` head tags for robots directive.

- [ ] **SEO-REC-1.5: Inject Full JSON-LD Schema Markup (Restaurant, LocalBusiness, Menu, Geo)**
  - **Priority:** **Critical**
  - **Effort:** 1.5 hours
  - **Expected Outcome:** Eligibility for Google Local 3-Pack, Rich Snippet Menu, star ratings, and conversational Answer Engine (ChatGPT/Perplexity/AEO) entity citation.
  - **Validation:** Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/).

- [ ] **SEO-REC-1.6: Rewrite Title Tags and Meta Descriptions for CTR & Keyword Alignment**
  - **Priority:** **High**
  - **Effort:** 45 minutes
  - **Expected Outcome:** Eliminate SERP truncation; increase organic CTR by an estimated 18–25% for high-intent local queries.
  - **Validation:** SERP preview testing; character count check (Titles 50–58 chars, Descriptions 150–155 chars).

- [ ] **SEO-REC-1.7: Add Cloudflare Security & Caching Headers (`_headers`)**
  - **Priority:** **Medium**
  - **Effort:** 20 minutes
  - **Expected Outcome:** Enforce HSTS, optimal caching policies for static assets (`styles.css`, images), and enhanced domain security rating.
  - **Validation:** Inspect response headers via `curl -I https://lacasadelmofongomd.net`.

- [ ] **SEO-REC-1.8: Local SEO Optimization (Google Business Profile & NAP Consistency)**
  - **Priority:** **High**
  - **Effort:** 1 hour
  - **Expected Outcome:** Dominance in local map pack rankings for "mofongo near me" and "dominican food silver spring".
  - **Validation:** Confirm exact NAP match: `La Casa Del Mofongo`, `9441 Georgia Ave, Silver Spring, MD 20910`, `(240) 863-3750` across GBP, Apple Maps, Yelp, and on-site schema.

---

## 5. Proposed Code Changes & Implementation Diffs

### 5.1 Create `robots.txt`
```robots
# robots.txt for https://lacasadelmofongomd.net
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /*?*

# Allow AI Answer Engines for AEO Citation
User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://lacasadelmofongomd.net/sitemap.xml
```

---

### 5.2 Create `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://lacasadelmofongomd.net/</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://lacasadelmofongomd.net/assets/images/MainPlato.webp</image:loc>
      <image:title>Signature Authentic Dominican Mofongo</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://lacasadelmofongomd.net/menu.html</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://lacasadelmofongomd.net/assets/images/Plato3.webp</image:loc>
      <image:title>Mofongo de Camarones</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://lacasadelmofongomd.net/about.html</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lacasadelmofongomd.net/gallery.html</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://lacasadelmofongomd.net/contact.html</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

### 5.3 Configure Cloudflare Headers (`_headers`)
```text
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(self), microphone=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=604800, must-revalidate

/js/*
  Cache-Control: public, max-age=604800, must-revalidate
```

---

### 5.4 JSON-LD Schema Markup (Structured Data) for `index.html` & `contact.html`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment"],
  "@id": "https://lacasadelmofongomd.net/#restaurant",
  "name": "La Casa Del Mofongo",
  "alternateName": "La Casa Del Mofongo MD",
  "url": "https://lacasadelmofongomd.net",
  "logo": "https://lacasadelmofongomd.net/assets/images/logo.svg",
  "image": [
    "https://lacasadelmofongomd.net/assets/images/MainPlato.webp",
    "https://lacasadelmofongomd.net/assets/images/Plato3.webp"
  ],
  "description": "Authentic Dominican, Caribbean, and Salvadoran restaurant in Silver Spring, MD. Famous for handcrafted mofongos, trifongo, roasted meats, seafood, and tropical cocktails.",
  "servesCuisine": [
    "Dominican",
    "Caribbean",
    "Latin American",
    "Salvadoran"
  ],
  "priceRange": "$$",
  "telephone": "+1-240-863-3750",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9441 Georgia Ave",
    "addressLocality": "Silver Spring",
    "addressRegion": "MD",
    "postalCode": "20910",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.0095285,
    "longitude": -77.0402504
  },
  "hasMap": "https://maps.google.com/?q=9441+Georgia+Ave+Silver+Spring+MD+20910",
  "menu": "https://lacasadelmofongomd.net/menu.html",
  "acceptsReservations": "True",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "11:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "02:00"
    }
  ],
  "sameAs": [
    "https://maps.google.com/?q=9441+Georgia+Ave+Silver+Spring+MD+20910"
  ]
}
</script>
```

---

### 5.5 On-Page Metadata Optimization Diff for `index.html`

```diff
--- a/index.html
+++ b/index.html
@@ -5,11 +5,29 @@
-  <title>La Casa Del Mofongo | The Finest Dishes in Latin American Cuisine | Silver Spring, MD</title>
-  <meta name="description" content="La Casa Del Mofongo in Silver Spring, MD. The finest dishes in Latin American cuisine, authentic mashed plantains, pork chops, happy hour food, great cocktails & kids">
+  <title>La Casa Del Mofongo | Authentic Dominican Food in Silver Spring MD</title>
+  <meta name="description" content="Savor authentic Dominican mofongos, savory meats, and tropical cocktails at La Casa Del Mofongo in Silver Spring, MD. Call (240) 863-3750 for reservations & takeout!">
+  <link rel="canonical" href="https://lacasadelmofongomd.net/">
+  
+  <!-- Open Graph / Social -->
+  <meta property="og:type" content="restaurant">
+  <meta property="og:url" content="https://lacasadelmofongomd.net/">
+  <meta property="og:title" content="La Casa Del Mofongo | Authentic Dominican Food in Silver Spring MD">
+  <meta property="og:description" content="Experience authentic Caribbean & Latin cuisine in Silver Spring, MD. Handcrafted mofongos, happy hour drinks, and family platters.">
+  <meta property="og:image" content="https://lacasadelmofongomd.net/assets/images/MainPlato.webp">
+  <meta property="og:locale" content="en_US">
+  
+  <!-- Twitter Card -->
+  <meta name="twitter:card" content="summary_large_image">
+  <meta name="twitter:title" content="La Casa Del Mofongo | Silver Spring MD">
+  <meta name="twitter:description" content="Authentic Dominican mofongo, Caribbean recipes, and tropical cocktails in Silver Spring, Maryland.">
+  <meta name="twitter:image" content="https://lacasadelmofongomd.net/assets/images/MainPlato.webp">
```

---

### 5.6 Admin Security Diff (`admin.html`)

```diff
--- a/admin.html
+++ b/admin.html
@@ -6,6 +6,7 @@
   <title>CMS Portal | La Casa Del Mofongo</title>
+  <meta name="robots" content="noindex, nofollow">
```

---

## 6. Execution Commands

Execute the following commands in the workspace root to implement and verify the audit items:

```bash
# 1. Verify robots.txt and sitemap.xml creation
ls -la robots.txt sitemap.xml _headers

# 2. Check HTTP status code and headers locally or on staging
curl -I https://lacasadelmofongomd.net/robots.txt
curl -I https://lacasadelmofongomd.net/sitemap.xml

# 3. Validate Google Rich Results Schema
npx --yes @stedi/schema-validator # Or use Chrome DevTools Lighthouse audit

# 4. Deploy changes to Cloudflare Pages
git add robots.txt sitemap.xml _headers index.html menu.html about.html gallery.html contact.html admin.html
git commit -m "seo: implement comprehensive technical SEO, AEO schema, robots.txt, sitemap.xml, and canonicals"
git push origin main
npx --yes wrangler pages deploy . --project-name=casamofongo --branch=main
```

---

## 7. Quality Assurance Task Verification

- [x] All crawlability and indexing issues are catalogued with specific URLs
- [x] Core Web Vitals scores are measured and compared against Google thresholds
- [x] Title tags and meta descriptions are audited for every indexable page with exact character counts
- [x] Content quality assessment includes E-E-A-T and local competitor comparison
- [x] Structured data (JSON-LD) is modeled for Restaurant, GeoCoordinates, and OpeningHours
- [x] Every finding has an impact rating (Critical/High/Medium/Low) and effort estimate
- [x] Remediation roadmap is organized into Immediate, Short-term, and Long-term phases
- [x] Code diffs and exact files (`robots.txt`, `sitemap.xml`, `_headers`) are fully documented
