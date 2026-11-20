const cmd=async c=>(await fetch(process.env.UPSTASH_REDIS_REST_URL+'/pipeline',{method:'POST',headers:{Authorization:'Bearer '+process.env.UPSTASH_REDIS_REST_TOKEN},body:JSON.stringify(c)})).json();
const pairs=a=>{const o={};for(let i=0;i<(a||[]).length;i+=2)o[a[i]]=+a[i+1];return o};
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(!process.env.STATS_TOKEN||req.headers.authorization!=='Bearer '+process.env.STATS_TOKEN)return res.status(401).json({error:'Unauthorized'});
  if(!process.env.UPSTASH_REDIS_REST_URL)return res.status(503).json({error:'Tracking store not configured'});
  const days=[...Array(14)].map((_,i)=>new Date(Date.now()-i*864e5).toISOString().slice(0,10));
  const o=await cmd(days.flatMap(d=>[['HGETALL','v:'+d],['HGETALL','b:'+d],['HGETALL','p:'+d]]));
  res.json({days:days.map((d,i)=>({date:d,classes:pairs(o[i*3].result),bots:pairs(o[i*3+1].result),agentPages:pairs(o[i*3+2].result)}))});
}
