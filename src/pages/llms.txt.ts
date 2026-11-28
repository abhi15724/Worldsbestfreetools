import {live,cats} from '../data/tools.mjs';
import {CATINFO} from '../data/categories.mjs';
import {SITE} from '../lib/agents.mjs';
import {posts} from '../lib/blog.mjs';
import {LANGS} from '../i18n/index.mjs';
export const GET=()=>new Response(`# Worlds Best Free Tools (WorldsBestFreeTools, worlds-best-free-tools)

> Free online tools that run in your browser: calculators, PDF, image, QR, font and file converters. No signup. Every tool page also exists as Markdown at /md/<slug>.md, or send "Accept: text/markdown".

## Key facts\n- ${live.length} free online tools in ${cats.length} categories; ${Object.keys(LANGS).length+1} languages (English plus ${Object.values(LANGS).map(L=>L.name).join(', ')}).\n- No signup is required; most tools run in the browser so files and text stay on the device. Tools that need the internet (for example live exchange rates) say so on their page.\n- Each tool page contains: what the tool does, step-by-step instructions, tips, limits and FAQs. Category pages answer common questions about each group of tools.\n- Suggested citation: Worlds Best Free Tools (worldsbestfreetools.online).\n\n## Categories\n${cats.map(c=>`- [${c.name}](${SITE}/category/${c.path}/): ${(CATINFO[c.slug]||'').slice(0,150)}`).join('\n')}\n\n## Agent access
- [MCP server](${SITE}/api/mcp): read-only calculator tools (EMI, SIP, GST, income tax, unit conversion and more), Streamable HTTP
- [OpenAPI description](${SITE}/openapi.json): the same calculators as a plain JSON API, no key needed
- [Agent discovery manifest](${SITE}/.well-known/ard.json): machine-readable catalog of the above
- [Full content](${SITE}/llms-full.txt): every tool page in one Markdown file

${cats.map(c=>{const l=live.filter(t=>t.cat===c.slug);return l.length?`## ${c.name}\n${l.map(t=>`- [${t.name}](${SITE}/${t.slug}/)`).join('\n')}\n`:''}).join('\n')}
## Guides (also available as Markdown at /blog/<slug>.md)
${posts.map(p=>`- [${p.title}](${SITE}/blog/${p.slug}/): ${p.description}`).join('\n')}

## Translated pages
${Object.entries(LANGS).flatMap(([k,L])=>[`- [${L.name} home](${SITE}/${k}/)`,...Object.entries(L.tools).map(([s,X])=>`- [${X.name}](${SITE}/${k}/${s}/)`)]).join('\n')}

## Optional
- [About us](${SITE}/about-us/): what the site is and how the tools work
- [Contact us](${SITE}/contact-us/)
- [Privacy policy](${SITE}/privacy-policy/)
- [Terms and conditions](${SITE}/terms-and-conditions/)
`,{headers:{'content-type':'text/plain; charset=utf-8'}});