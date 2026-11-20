// Plain Markdown copy of every article, for AI agents and crawlers: /blog/<slug>.md
import {posts} from '../../lib/blog.mjs';
import {SITE} from '../../data/tools.mjs';
export function getStaticPaths(){return posts.map(p=>({params:{slug:p.slug},props:{p}}))}
export function GET({props:{p}}){
  const body=`# ${p.title}\n\n> ${p.description}\n\n- Page: ${SITE}/blog/${p.slug}/\n- Published: ${p.date} · Updated: ${p.updated}\n${p.tools[0]?`- Free tool: ${SITE}/${p.tools[0]}/\n`:''}\n${p.raw.trim()}\n${p.faq.length?`\n## Frequently asked questions\n\n${p.faq.map(f=>`**${f.q}**\n\n${f.a}\n`).join('\n')}`:''}`;
  return new Response(body,{headers:{'content-type':'text/markdown; charset=utf-8'}});
}
