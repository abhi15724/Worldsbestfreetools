// Loads every Markdown article in src/content/blog/. Add a file there and it appears on the blog, in the sitemap, RSS and llms.txt.
const mods=import.meta.glob('../content/blog/*.md',{eager:true});
const words=t=>(t.replace(/```[\s\S]*?```/g,' ').replace(/[#>*_`|\-]/g,' ').match(/\S+/g)||[]).length;
export const posts=Object.entries(mods).filter(([f])=>!f.split('/').pop().startsWith('_')).map(([f,m])=>{
  const fm=m.frontmatter,slug=f.split('/').pop().replace(/\.md$/,''),raw=m.rawContent();
  return{slug,...fm,tools:fm.tools||[],faq:fm.faq||[],date:String(fm.date).slice(0,10),updated:String(fm.updated||fm.date).slice(0,10),Content:m.Content,headings:m.getHeadings(),raw,words:words(raw),minutes:Math.max(1,Math.round(words(raw)/220))};
}).sort((a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title));
export const postFor=toolSlug=>posts.find(p=>p.tools.includes(toolSlug));
