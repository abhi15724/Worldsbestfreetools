// Contact form handler (Vercel serverless function).
// Environment variables (set in Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY  - API key from resend.com (free plan is enough)
//   CONTACT_TO      - the email address that should receive messages
//   CONTACT_FROM    - optional sender, e.g. "WorldsBestFreeTools <contact@yourdomain.com>"
//                     (defaults to Resend's test sender, which can only deliver to your own Resend account email)
const hits=new Map();
const clean=(s,max)=>String(s??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').trim().slice(0,max);
const oneLine=s=>s.replace(/[\r\n]+/g,' ');
export default async function handler(req,res){
  const wantsJson=(req.headers.accept||'').includes('application/json');
  const fail=(code,msg)=>wantsJson?res.status(code).json({error:msg}):res.redirect(303,'/contact-us/?error=1');
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  const ip=(req.headers['x-forwarded-for']||'').split(',')[0].trim()||'x',now=Date.now();
  const h=(hits.get(ip)||[]).filter(t=>now-t<600000);
  if(h.length>=3)return fail(429,'Too many messages. Please wait a few minutes and try again.');
  hits.set(ip,[...h,now]);
  const b=req.body&&typeof req.body==='object'?req.body:{};
  // Honeypot: real people leave this hidden field empty. Pretend success for bots.
  if(clean(b.website,50))return wantsJson?res.json({ok:true}):res.redirect(303,'/contact-us/?sent=1');
  const name=oneLine(clean(b.name,100)),email=oneLine(clean(b.email,200)),message=clean(b.message,5000);
  if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||message.length<10)return fail(400,'Please enter your name, a valid email address and a message of at least 10 characters.');
  const key=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO;
  if(!key||!to){console.error('contact: RESEND_API_KEY or CONTACT_TO is not set');return fail(500,'The contact form is not set up yet. Please try again later.');}
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'content-type':'application/json'},body:JSON.stringify({
      from:process.env.CONTACT_FROM||'WorldsBestFreeTools <onboarding@resend.dev>',
      to:[to],reply_to:email,
      subject:`New message from ${name.slice(0,60)} (WorldsBestFreeTools)`,
      text:`Name: ${name}\nEmail: ${email}\n\n${message}`
    })});
    if(!r.ok){console.error('contact: email provider error',r.status);return fail(502,'Your message could not be sent right now. Please try again later.');}
  }catch(e){console.error('contact: send failed');return fail(502,'Your message could not be sent right now. Please try again later.');}
  return wantsJson?res.json({ok:true}):res.redirect(303,'/contact-us/?sent=1');
}
