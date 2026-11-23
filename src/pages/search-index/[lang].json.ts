import {live,cats} from '../../data/tools.mjs';
import {KW} from '../../data/keywords.mjs';
import {LANGS} from '../../i18n/index.mjs';
export function getStaticPaths(){return ['en',...Object.keys(LANGS)].map(lang=>({params:{lang}}))}
// [display name, url, extra search words (English name, aliases, category)] - small file, fetched only when someone focuses a search box.
export function GET({params}:{params:{lang:string}}){
  const L=(LANGS as any)[params.lang];const cn=Object.fromEntries(cats.map(c=>[c.slug,c.name]));
  const rows=live.map(t=>{const tr=L?.tools?.[t.slug];const kw=[t.name,...(KW[t.slug]?.a||[]).slice(0,3),cn[t.cat]].join(' ').toLowerCase();
    return tr?[tr.name,`/${params.lang}/${t.slug}/`,kw+' '+(tr.kw||[]).join(' ').toLowerCase()]:[t.name,`/${t.slug}/`,kw]});
  return new Response(JSON.stringify(rows),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=3600'}});
}
