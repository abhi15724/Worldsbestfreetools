// Builds full tool entries from compact rows: slug:[name, description, intro, [steps], [question, answer]]
import {live} from '../data/tools.mjs';
export function buildTools(compact,ui,titleFn,kwFn){
  const out={};
  for(const [slug,[name,desc,a,steps,f]] of Object.entries(compact)){
    const t=live.find(x=>x.slug===slug);if(!t)continue;
    const en=t.name,clean=name.replace(/\s*\([^)]*\)/g,'').trim();
    out[slug]={name,title:titleFn(clean,en),desc,kw:kwFn(clean,en),a:[a],s:steps,t:[],faq:[...(f?[f]:[]),[ui.faq_free_q,ui.faq_free_a],[ui.faq_priv_q,ui.faq_priv_a]]};
  }
  return out;
}
