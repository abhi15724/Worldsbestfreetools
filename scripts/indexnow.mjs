// Run after each deploy:  npm run indexnow
// Tells Bing, Yandex and other IndexNow search engines about every URL in your sitemap.
const HOST='worldsbestfreetools.online',KEY='b23152e1c30cbb6bf6aca3a89e0ddbb0';
const get=async u=>(await fetch(u)).text();
const idx=await get(`https://${HOST}/sitemap-index.xml`);
let urls=[];
for(const m of idx.matchAll(/<loc>([^<]+)<\/loc>/g)){const x=await get(m[1]);urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(a=>a[1]))}
urls=[...new Set(urls)];
const r=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify({host:HOST,key:KEY,keyLocation:`https://${HOST}/${KEY}.txt`,urlList:urls.slice(0,10000)})});
console.log('Submitted',urls.length,'URLs. IndexNow response:',r.status,r.status===200||r.status===202?'(accepted)':'(check the key file is live at /'+KEY+'.txt)');
