import {rewrite,next} from '@vercel/functions/middleware';
import {waitUntil} from '@vercel/functions';
import {classify,wantsMarkdown} from './src/lib/agents.mjs';
import {live} from './src/data/tools.mjs';
const SLUGS=new Set(live.map(t=>t.slug));
export const config={matcher:['/((?!_astro|api|md|stats|.*\\..*).*)']};
function track(cls,bot,path){
  console.log(JSON.stringify({e:'visit',cls,bot,path}));
  const U=process.env.UPSTASH_REDIS_REST_URL,K=process.env.UPSTASH_REDIS_REST_TOKEN;if(!U||!K)return;
  const d=new Date().toISOString().slice(0,10),c=[['HINCRBY','v:'+d,cls,1]];
  if(bot)c.push(['HINCRBY','b:'+d,bot,1]);if(cls!=='human')c.push(['HINCRBY','p:'+d,path,1]);
  waitUntil(fetch(U+'/pipeline',{method:'POST',headers:{Authorization:'Bearer '+K},body:JSON.stringify(c)}).catch(()=>{}));
}
export default function middleware(req){
  const url=new URL(req.url),accept=req.headers.get('accept')||'';
  let{cls,bot}=classify(req.headers.get('user-agent')||'',accept);
  const v=url.searchParams.get('view');if(v==='agent')cls='ai-agent';else if(v==='human')cls='human';
  const slug=url.pathname.replace(/^\/|\/$/g,''),md=url.pathname==='/'?'index':SLUGS.has(slug)?slug:null;
  track(cls,bot,url.pathname);
  const h={Vary:'Accept, User-Agent','x-visitor-class':cls};
  if(md&&wantsMarkdown(cls,accept))return rewrite(new URL(`/md/${md}.md`,req.url),{headers:h});
  return next({headers:h});
}
