const hits=new Map();
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  const ip=(req.headers['x-forwarded-for']||'').split(',')[0]||'x',now=Date.now(),h=(hits.get(ip)||[]).filter(t=>now-t<60000);
  if(h.length>=6)return res.status(429).json({error:'Too many requests. Please wait a minute.'});
  hits.set(ip,[...h,now]);
  const {text,mode}=req.body||{};
  if(typeof text!=='string'||!text.trim()||text.length>2000)return res.status(400).json({error:'Text must be 1 to 2000 characters.'});
  if(!process.env.ANTHROPIC_API_KEY)return res.status(500).json({error:'Service is not configured.'});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-haiku-5-5',max_tokens:1500,system:`Rewrite the user's text in a ${String(mode).slice(0,20)} style. Keep the meaning and the language. Output only the rewritten text.`,messages:[{role:'user',content:text}]})});
  if(!r.ok)return res.status(502).json({error:'Paraphrasing is temporarily unavailable.'});
  const d=await r.json();res.json({text:(d.content||[]).map(c=>c.text||'').join('')});
}
