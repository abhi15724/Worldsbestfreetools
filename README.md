# WorldsBestFreeTools (Astro on Vercel)
Local:   npm install --ignore-scripts && npm run dev
Build:   npm run build  (static site in dist/)

## Deploy to Vercel
1. Push this folder to a GitHub repo, then "Add New Project" in Vercel and import it (Astro is auto-detected).
2. Settings > Domains: add worldsbestfreetools.online and set the DNS records Vercel shows.
3. Submit https://worldsbestfreetools.online/sitemap-index.xml in Google Search Console.

## Add a tool
Add one line to src/data/tools.mjs: category|slug|Name|engine|param. Tools with an engine get a page,
sitemap entry and structured data automatically. Engines live in src/scripts/engines.js.

## Data and licence notes
- src/data/krutidev-map.json: Kruti Dev glyph table taken from the public converter at github.com/sudheerfy/KrutiDev-Font-Converter
  (the repo states no licence). The conversion logic in src/scripts/krutidev.js is our own. Before commercial launch, confirm the
  licence with the author or replace the table with one you own. Curly-quote entries were corrected.
- WOFF2 uses wawoff2 (MIT); PowerPoint preview uses pptx-preview (ISC); OCR uses tesseract.js (Apache-2.0).
- xlsx (SheetJS 0.18.5) runs in the browser only. Check licences of any font you let users convert.

## Human vs AI-agent system
- `middleware.js` (Vercel Routing Middleware) classifies every page request with `src/lib/agents.mjs`:
  human, ai-agent (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent...), ai-search (OAI-SearchBot, Claude-SearchBot, PerplexityBot),
  ai-training (GPTBot, ClaudeBot, CCBot...), search-bot (Googlebot, Bingbot...), other-bot.
- Humans and search engines get the normal HTML page. AI agents/crawlers, and anyone sending `Accept: text/markdown`, get the same content
  as Markdown (`/md/<slug>.md`), with `Vary: Accept, User-Agent`. Keep the two versions content-equivalent. Test with `?view=agent` / `?view=human`.
- Agent entry points: `/api/mcp` (MCP server), `/api/v1/<tool>` (JSON API), `/openapi.json`, `/llms.txt`, `/llms-full.txt`,
  `/.well-known/ard.json` (+ legacy `ai-catalog.json`), `/.well-known/mcp/server-card.json`, WebMCP tools on calculator pages.
- Traffic dashboard: create a free Upstash Redis database, set UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN and STATS_TOKEN in Vercel,
  then open /stats/. Without Upstash, each visit is still logged as JSON in Vercel Logs.
- AI training crawlers: flip ALLOW_AI_TRAINING in src/lib/agents.mjs. User-agent detection can be spoofed; use Vercel Firewall bot rules for enforcement.

## Languages (SEO-ready translated pages)
Live: English (default), Hindi `/hi/`, Spanish `/es/`, Portuguese-Brazil `/pt-br/`, Indonesian `/id/`, Arabic `/ar/` (RTL).
Each language gets a translated home page and one translated page per tool, each with a working tool, its own title/description/keywords,
`hreflang` links (incl. `x-default`), canonical URL, sitemap entries with hreflang, FAQ and WebApplication structured data.
The header dropdown jumps to these real pages; languages without real pages fall back to Google Translate (not indexable by search engines).
Add a language in ~3 steps:
1. `node scripts/new-lang.mjs fr fr fr "Français" fr_FR` creates `src/i18n/fr.mjs` and `fr-compact.mjs` with the English text of every tool.
2. Translate every string in those two files (UI strings, title/keyword patterns at the bottom of `fr.mjs`, and each tool row).
3. Add the row to `src/i18n/locales.mjs` and import the module in `src/i18n/index.mjs` (add to `MOD`). `npm run build`, deploy, then `npm run indexnow`.
India-only tools (tax, PPF, UPI, Kruti Dev...) are intentionally left out of non-Indian languages; each language home links to the English site for them.
Finance tools default their currency by page language (pt-BR=BRL, id=IDR, ar=SAR); users can still pick any currency.

## Micro tools (155 small tools, data-driven)
Each micro tool is ONE definition in `src/data/micro-*.mjs` (`D(category, slug, name, description, fields, runFunction)`).
Adding a tool = adding one line there. Its page, sitemap entry, Markdown version, llms.txt line, search entry, keywords and page text are generated automatically.
Field spec: `'id|Label|default|type|extra'` (types: n number, t text, a textarea, s select (options separated by ;), d date, c color, r range, f file, m multiple files). Use the broken bar character (U+00A6) when a label or default needs a real pipe.
Test all pure tools in Node: see the loop used in development (run each `r(values)` with defaults); the browser engine is `src/scripts/micro.js`.

## Search
A search box is in the header of every page (all languages) and on translated home pages. It loads a small per-language index (`/search-index/<lang>.json`) only when the box is focused. Translated tools show their translated names; others show English names and open the English page.

## Deploy and IndexNow
Push to GitHub, Vercel deploys. `.github/workflows/indexnow.yml` pings Bing/IndexNow automatically after each successful Production deploy. You can also run `npm run indexnow` by hand after a deploy. Google does not use IndexNow: submit `/sitemap-index.xml` once in Google Search Console.

## Languages now live (11 incl. English)
Hindi /hi/, Spanish /es/, Portuguese-Brazil /pt-br/, Indonesian /id/, Arabic /ar/ (RTL), German /de/, Japanese /ja/, Chinese Simplified /zh-cn/, Chinese Traditional-Taiwan /zh-tw/, Russian /ru/.
The 5 newest languages have 27 translated high-demand tools each (src/i18n/<code>.mjs). Every other tool is reachable from the search box (English page) and the Google Translate menu.
To translate more tools: add rows to the `R` object in a language file (format: slug:[name, description, intro, [3 steps]]). New category names live in src/i18n/cats.mjs.
Each language also gets translated category pages: /de/category/finance-tools/ etc. (only for categories that have at least one translated tool).

## Category URLs
Categories use keyword URLs: /category/business-tools/, /category/pdf-tools/, /category/video-download-tools/ ... (see CATPATH in src/data/tools.mjs).
Old URLs such as /category/business/ are permanently redirected (301) in vercel.json.

## Games and speed tools
Reaction Time Test, Wordle (daily + random word) and GPS Car Speedometer live in src/scripts/games.js. The speedometer needs the Permissions-Policy header geolocation=(self) which is set in vercel.json.

## GTA 6 Tools
Category /category/gta6-tools/ with an unofficial fan GTA 6 Quiz (src/scripts/games.js, question pool Q) and GTA 6 Character Name Generator (src/data/micro-gta.mjs). Both are labelled unofficial and not affiliated with Rockstar Games or Take-Two. Add quiz questions by adding rows to Q (question, 4 answers with the correct one first, index 0, explanation).

## Blog
The blog is English only. Visitors can read it in any language with the language menu (Google Translate). Translated pages exist for the tools, categories and home pages, not for the blog.

## SEO and AI-search setup (what is in place)
- Redirects (vercel.json): /en and /en/... go to the real page (the site has no /en/ prefix); category guesses such as /pdf-tools/, /calculator-tools/, /gaming-tools/ go to /category/<name>/; old category URLs are 301s.
- Custom 404 page (src/pages/404.astro): noindex, search box, categories and popular tools.
- Home page: title/description/H1 follow the keyword plan, "Popular searches" section links keyword phrases to the single most relevant tool (src/data/categories.mjs HOME_SEARCHES, SEARCHES).
- Category pages: intro, tool list, popular searches, and an answer-first FAQ with FAQPage schema (good for AI answers).
- Tool pages: "people also search" phrases come from src/data/keywords.mjs (add() lines at the bottom). The meta keywords tag is ignored by Google; the phrases are used in visible text and links.
- AI discovery: /llms.txt (key facts, categories, tools), /llms-full.txt, Markdown copy of every page (/md/...), MCP server, OpenAPI, /.well-known/ard.json, robots.txt with explicit AI crawler rules.
- /search-index/*.json is disallowed in robots.txt and sent with X-Robots-Tag: noindex.
After each deploy: Search Console > Sitemaps > submit sitemap-index.xml, then URL Inspection > Request indexing for the home page and your top category pages. Monitor Performance (Search results and Generative AI).
