// Shared helpers for micro tools. Pure functions only (runs in the browser and in Node during the build).
export const n=(x,d=2)=>Number(x).toLocaleString('en-US',{maximumFractionDigits:d});
export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const row=(k,x)=>`${k}: <b>${x}</b><br>`;
export const tbl=(head,rows)=>`<table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
export const need=(...a)=>{if(a.some(x=>typeof x==='number'&&!isFinite(x)))throw new Error('bad input')};
export const lines=s=>String(s).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
export const pre=s=>`<textarea readonly rows="8" style="width:100%" onclick="this.select()">${esc(s)}</textarea>`;
export const pt=s=>{const p=String(s).trim().split(':').map(Number);return p.length&&p.every(isFinite)?p.reduce((a,x)=>a*60+x,0):NaN};
export const hms=s=>{s=Math.round(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
export const gcd=(a,b)=>b?gcd(b,a%b):a;
export const ok=(t)=>`<span style="color:#1a7f5a">&#10003; ${t}</span><br>`,bad=(t)=>`<span style="color:#c8301a">&#10007; ${t}</span><br>`,warn=(t)=>`<span style="color:#b45f06">&#9888; ${t}</span><br>`;
// field spec: 'id|Label|default|type|extra'  types: n number (default), t text, a textarea, s select (default = options separated by ;), d date, c color, r range (extra min;max;step), f file (extra accept), m multiple files
export function parseField(s){const p=s.split('|');const type=p[3]||'n';const U=x=>(x||'').replace(/\u00a6/g,'|');return{id:p[0],label:U(p[1]),def:U(p[2]),type,extra:p[4]||'',opts:type==='s'?U(p[2]).split(';'):null}}
export const D=(c,s,nm,d,f,r,o={})=>({c,s,n:nm,d,f,r,...o});
