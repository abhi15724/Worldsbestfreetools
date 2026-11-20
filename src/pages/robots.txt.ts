import {BOTS,SITE,ALLOW_AI_TRAINING} from '../lib/agents.mjs';
const priv='Disallow: /stats/\nDisallow: /api/stats';
const grp=(ua,cls)=>{const train=cls==='ai-training',ok=!train||ALLOW_AI_TRAINING;return `User-agent: ${ua}\n${ok?'Allow: /':'Disallow: /'}\n${ok?priv+'\n':''}Content-Signal: search=yes, ai-input=${ok?'yes':'no'}, ai-train=${ALLOW_AI_TRAINING?'yes':'no'}\n`};
export const GET=()=>new Response([`User-agent: *\nAllow: /\n${priv}\nContent-Signal: search=yes, ai-input=yes, ai-train=${ALLOW_AI_TRAINING?'yes':'no'}\n`,...BOTS.filter(([,c])=>c.startsWith('ai-')).map(([t,c])=>grp(t,c)),`Sitemap: ${SITE}/sitemap-index.xml`,`Agentmap: ${SITE}/.well-known/ard.json`,''].join('\n'),{headers:{'content-type':'text/plain; charset=utf-8'}});
