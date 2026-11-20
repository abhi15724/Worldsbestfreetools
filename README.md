# WorldsBestFreeTools (Astro on Vercel)
Local:   npm install --ignore-scripts && npm run dev
Build:   npm run build  (static site in dist/)

## Deploy to Vercel
1. Push this folder to a GitHub repo, then "Add New Project" in Vercel and import it (Astro is auto-detected).
2. Settings > Domains: add worldsbestfreetools.online and set the DNS records Vercel shows.
3. Paraphraser only: Settings > Environment Variables, add ANTHROPIC_API_KEY (optional ANTHROPIC_MODEL).
   Set a monthly spend limit on your key and add a Vercel Firewall rate-limit rule for /api/paraphrase.
4. Submit https://worldsbestfreetools.online/sitemap-index.xml in Google Search Console.

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
