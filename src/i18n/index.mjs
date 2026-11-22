import {LOCALES} from './locales.mjs';
import hi from './hi.mjs';
import es from './es.mjs';
import ptbr from './pt-br.mjs';
import id from './id.mjs';
import ar from './ar.mjs';
// Every language registered in locales.mjs gets /<code>/ home + tool pages, hreflang links, sitemap entries and llms.txt entries automatically.
const MOD={hi,es,'pt-br':ptbr,id,ar};
export const LANGS=Object.fromEntries(LOCALES.map(m=>[m.code,{...m,...MOD[m.code]}]));
const EN={lang:'en',code:'en',gt:'en',name:'English'};
export const altsFor=slug=>{const a=[{...EN,url:`/${slug}/`}];for(const [k,L] of Object.entries(LANGS))if(L.tools[slug])a.push({lang:L.hreflang,code:k,gt:L.gt,name:L.name,url:`/${k}/${slug}/`});return a.length>1?a:[]};
export const homeAlts=()=>[{...EN,url:'/'},...Object.entries(LANGS).map(([k,L])=>({lang:L.hreflang,code:k,gt:L.gt,name:L.name,url:`/${k}/`}))];
