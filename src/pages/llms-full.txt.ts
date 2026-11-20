export async function GET(){const{allMd}=await import('../lib/md.mjs');return new Response(allMd(),{headers:{'content-type':'text/plain; charset=utf-8'}})}
