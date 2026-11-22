import hi from './hi.mjs';
import es from './es.mjs';
// Register every translated language here. Each one automatically gets /<code>/ pages, hreflang links and sitemap entries.
export const LANGS={hi,es};
export const altsFor=slug=>{const a=[{lang:'en',url:`/${slug}/`}];for(const [k,L] of Object.entries(LANGS))if(L.tools[slug])a.push({lang:k,url:`/${k}/${slug}/`});return a.length>1?a:[]};
