export async function getStaticPaths(){const m=await import('../../data/tools.mjs');return['index',...m.live.map(x=>x.slug)].map(s=>({params:{slug:s}}))}
export async function GET({params}){const{mdFor}=await import('../../lib/md.mjs');return new Response(mdFor(params.slug),{headers:{'content-type':'text/markdown; charset=utf-8'}})}
