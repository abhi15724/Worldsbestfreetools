import {tools,live,cats,seo} from '../data/tools.mjs';
import {SITE,API_OF} from './agents.mjs';
import {TOOLS} from '../../api/_calc.js';
const apiBlock=a=>['## Call it from code or an AI agent',`- REST (no key): \`GET ${SITE}/api/v1/${a}?...\``,`- MCP server: ${SITE}/api/mcp (tool name: \`${a}\`)`,`- OpenAPI: ${SITE}/openapi.json`,'',...Object.entries(TOOLS[a].p).map(([k,v])=>`- \`${k}\` (${v.type}): ${v.description}`),''];
export function mdFor(slug){
  if(slug==='index')return['# Worlds Best Free Tools (WorldsBestFreeTools, worlds-best-free-tools)','',`> Free online tools that run in your browser: calculators, PDF, image, QR and file converters. No signup.`,'',...cats.flatMap(c=>{const l=live.filter(t=>t.cat===c.slug);return l.length?[`## ${c.name}`,...l.map(t=>`- [${t.name}](${SITE}/${t.slug}/)`),'']:[]}),'## For agents',`- MCP server: ${SITE}/api/mcp`,`- OpenAPI: ${SITE}/openapi.json`,`- llms.txt: ${SITE}/llms.txt`,''].join('\n');
  const t=live.find(x=>x.slug===slug),s=seo(t),cat=cats.find(c=>c.slug===t.cat),a=API_OF[slug],rel=live.filter(x=>x.cat===t.cat&&x.slug!==slug).slice(0,6);
  return[`# ${t.name}`,'',`> ${s.desc}`,'',`- Page: ${SITE}/${slug}/`,`- Category: ${cat.name}`,'- Cost: free, no signup. Runs in the browser; files are not uploaded.','','## How to use','1. Enter your values or choose your file on the page.','2. See the result instantly, right in your browser.','3. Copy or download the result.','',...(a?apiBlock(a):[]),'## Frequently asked questions',...s.faq.flatMap(([q,x])=>[`**${q}**`,x,'']),'## Related tools',...rel.map(r=>`- [${r.name}](${SITE}/${r.slug}/)`),''].join('\n');
}
export const allMd=()=>['index',...live.map(t=>t.slug)].map(mdFor).join('\n\n---\n\n');
