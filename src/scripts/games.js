import {WORDS} from '../data/wordle-words.mjs';
const css='<style>.gm{user-select:none;-webkit-user-select:none}.rt{min-height:240px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;font-weight:700;font-size:clamp(1.3rem,4vw,2rem);cursor:pointer;padding:16px;touch-action:manipulation;outline-offset:3px}.rt small{font-size:.95rem;font-weight:500;opacity:.9;margin-top:8px}.wg{display:grid;gap:6px;max-width:320px;margin:12px auto}.wr{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.wt{aspect-ratio:1;display:grid;place-items:center;border:2px solid #cfd3da;border-radius:8px;font-size:clamp(1.4rem,6vw,2rem);font-weight:800;text-transform:uppercase;background:#fff;color:#14171f}.wt.g{background:#2e9e5b;border-color:#2e9e5b;color:#fff}.wt.y{background:#c9a227;border-color:#c9a227;color:#fff}.wt.x{background:#6b7280;border-color:#6b7280;color:#fff}.wt.f{border-color:#6b7280}.kb{max-width:520px;margin:10px auto;display:grid;gap:6px}.kr{display:flex;gap:4px;justify-content:center}.gm .kk{flex:1;max-width:44px;min-height:48px;border:0;border-radius:8px;background:#e5e7eb;color:#14171f;font-weight:700;font-size:.95rem;cursor:pointer;text-transform:uppercase;padding:0;margin:0!important;width:auto!important}.gm .kk.w{max-width:70px;flex:1.6}.gm .kk.g{background:#2e9e5b;color:#fff}.gm .kk.y{background:#c9a227;color:#fff}.gm .kk.x{background:#6b7280;color:#fff}.sp{font-size:clamp(3rem,16vw,6rem);font-weight:800;line-height:1;text-align:center;margin:10px 0}.st{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:12px 0;text-align:center}.st div{background:#f3f4f7;border-radius:10px;padding:10px}.st b{display:block;font-size:1.25rem}</style>';
// ---------------- Reaction time test
function reaction(el){
 el.innerHTML=css+'<div class="gm"><div class="rt" id="rt" tabindex="0" role="button" aria-live="polite"></div><div class="st"><div>Last<b id="rl">-</b></div><div>Best<b id="rb">-</b></div><div>Average (last 5)<b id="ra">-</b></div><div>Tries<b id="rn">0</b></div></div><button type="button" id="rr">Reset results</button><p id="rv" style="margin:8px 0 0"></p></div>';
 const box=el.querySelector('#rt'),$=i=>el.querySelector('#'+i);let st='idle',t0=0,timer=0,H=[];
 const set=(c,h,s)=>{box.style.background=c;box.innerHTML=h+(s?'<small>'+s+'</small>':'')};
 const rate=m=>m<200?'Excellent: faster than most people':m<250?'Good: a quick reaction':m<300?'Average':'Slower than average: try again when rested';
 const idle=(msg)=>{st='idle';set('#2b6cb0',msg||'Click to start','Click or press Space when the box turns green')};
 const upd=()=>{if(!H.length)return;const l=H.slice(-5);$('rl').textContent=H[H.length-1]+' ms';$('rb').textContent=Math.min(...H)+' ms';$('ra').textContent=Math.round(l.reduce((a,b)=>a+b,0)/l.length)+' ms';$('rn').textContent=H.length;$('rv').textContent=rate(Math.round(l.reduce((a,b)=>a+b,0)/l.length))};
 const act=()=>{if(st==='idle'){st='wait';set('#c53030','Wait for green…','Do not click yet');timer=setTimeout(()=>{st='go';t0=performance.now();set('#2f9e5b','CLICK NOW!')},1500+Math.random()*3500)}
  else if(st==='wait'){clearTimeout(timer);st='early';set('#dd6b20','Too soon!','Click to try again')}
  else if(st==='go'){const ms=Math.round(performance.now()-t0);H.push(ms);upd();st='done';set('#2b6cb0',ms+' ms','Click to try again')}
  else idle()};
 box.addEventListener('pointerdown',e=>{e.preventDefault();act()});box.addEventListener('keydown',e=>{if(e.code==='Space'||e.key==='Enter'){e.preventDefault();act()}});
 $('rr').onclick=()=>{H=[];clearTimeout(timer);['rl','rb','ra'].forEach(i=>$(i).textContent='-');$('rn').textContent='0';$('rv').textContent='';idle()};
 idle();
}
// ---------------- Wordle
function wordle(el){
 const today=Math.floor(Date.now()/864e5),pick=r=>WORDS[r?Math.floor(Math.random()*WORDS.length):(today*7919)%WORDS.length];
 let ans,row,col,grid,over,daily,ks;
 const start=r=>{daily=!r;ans=pick(r);row=0;col=0;over=false;grid=Array.from({length:6},()=>Array(5).fill(''));ks={};draw();msg(daily?'Daily word: guess it in 6 tries.':'Random word: guess it in 6 tries.')};
 el.innerHTML=css+'<div class="gm"><p id="wm" aria-live="polite" style="min-height:1.6em;margin:4px 0;font-weight:600"></p><div class="wg" id="wg"></div><div class="kb" id="kb"></div><button type="button" id="wn">New random word</button> <button type="button" id="wd">Daily word</button> <button type="button" id="ws" hidden>Copy result</button></div>';
 const $=i=>el.querySelector('#'+i),msg=t=>$('wm').textContent=t;
 const score=(g)=>{const r=Array(5).fill('x'),a=ans.split(''),u=Array(5).fill(false);for(let i=0;i<5;i++)if(g[i]===a[i]){r[i]='g';u[i]=true}for(let i=0;i<5;i++)if(r[i]!=='g'){const j=a.findIndex((c,k)=>!u[k]&&c===g[i]);if(j>=0){r[i]='y';u[j]=true}}return r};
 const marks=[];
 const draw=()=>{$('wg').innerHTML=grid.map((r,i)=>'<div class="wr">'+r.map((c,j)=>{const m=marks[i]&&marks[i][j];return'<div class="wt '+(m||(c?'f':''))+'">'+c+'</div>'}).join('')+'</div>').join('');
  const K=['qwertyuiop','asdfghjkl','zxcvbnm'];$('kb').innerHTML=K.map((r,i)=>'<div class="kr">'+(i===2?'<button type="button" class="kk w" data-k="Enter">Enter</button>':'')+r.split('').map(c=>'<button type="button" class="kk '+(ks[c]||'')+'" data-k="'+c+'">'+c+'</button>').join('')+(i===2?'<button type="button" class="kk w" data-k="Backspace" aria-label="Backspace">&#9003;</button>':'')+'</div>').join('')};
 const key=k=>{if(over)return;if(k==='Backspace'){if(col>0){grid[row][--col]='';draw()}return}
  if(k==='Enter'){if(col<5){msg('Not enough letters.');return}const g=grid[row].join(''),r=score(g.split(''));marks[row]=r;r.forEach((m,i)=>{const c=g[i],p=ks[c];if(!p||p==='x'||(p==='y'&&m==='g'))ks[c]=m});row++;col=0;draw();
   if(g===ans){over=true;msg('You got it in '+row+(row===1?' try!':' tries!'));$('ws').hidden=false}else if(row===6){over=true;msg('The word was '+ans.toUpperCase()+'.');$('ws').hidden=false}else msg('');return}
  if(/^[a-z]$/.test(k)&&col<5){grid[row][col++]=k;draw()}};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){key(b.dataset.k);b.blur()}});
 el.ownerDocument.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName))return;if(!el.isConnected)return;const k=e.key.length===1?e.key.toLowerCase():e.key;if(k==='Enter'||k==='Backspace'||/^[a-z]$/.test(k)){e.preventDefault();key(k)}});
 $('wn').onclick=e=>{e.currentTarget.blur();marks.length=0;$('ws').hidden=true;start(true)};$('wd').onclick=e=>{e.currentTarget.blur();marks.length=0;$('ws').hidden=true;start(false)};
 $('ws').onclick=()=>{const t='Wordle-style '+(daily?'daily ':'')+row+'/6\n'+marks.map(r=>r.map(m=>m==='g'?'\u{1F7E9}':m==='y'?'\u{1F7E8}':'\u2B1B').join('')).join('\n');(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>msg('Result copied.')).catch(()=>msg(t))};
 start(false);
}
// ---------------- GPS speedometer
function speed(el){
 el.innerHTML=css+'<div class="gm"><div class="sp" id="sv" aria-live="polite">0</div><p style="text-align:center;margin:0 0 8px"><b id="su">km/h</b> <button type="button" id="sw" style="padding:4px 10px">Switch to mph</button></p><div class="st"><div>Top speed<b id="sm">0</b></div><div>Average<b id="sa">0</b></div><div>Distance<b id="sd">0</b></div><div>Time<b id="stt">0:00</b></div></div><button type="button" id="sg">Start</button> <button type="button" id="sr">Reset trip</button><p id="se" style="margin:8px 0 0" aria-live="polite">Press Start and allow location access. Use outdoors for the best signal.</p></div>';
 const $=i=>el.querySelector('#'+i);let id=null,mph=false,max=0,dist=0,last=null,t0=0,sp=0;
 const u=()=>mph?0.621371:1,fmt=v=>(v*u()).toFixed(v*u()<10?1:0);
 const hav=(a,b)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(b.lat-a.lat),dn=r(b.lon-a.lon),h=Math.sin(dl/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
 const show=()=>{$('sv').textContent=fmt(sp);$('su').textContent=mph?'mph':'km/h';$('sm').textContent=fmt(max);const h=(Date.now()-t0)/36e5;$('sa').textContent=t0&&h>0?fmt(dist/h):'0';$('sd').textContent=(dist*(mph?0.621371:1)).toFixed(2)+(mph?' mi':' km');const s=t0?Math.floor((Date.now()-t0)/1000):0;$('stt').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
 const on=p=>{const c=p.coords,n={lat:c.latitude,lon:c.longitude,t:p.timestamp};if(!t0)t0=Date.now();let v=c.speed;if(last){const d=hav(last,n);if(d>0.0005||v)dist+=d;if(v==null||isNaN(v)){const dt=(n.t-last.t)/36e5;v=dt>0?d/dt/3.6:0}}if(v==null||isNaN(v))v=0;sp=Math.max(0,v*3.6);if(sp<1.5)sp=0;if(sp>max&&sp<400)max=sp;last=n;$('se').textContent='Tracking. Accuracy about '+Math.round(c.accuracy||0)+' m.';show()};
 const err=e=>{$('se').textContent=e.code===1?'Location is blocked. Allow location for this site in your browser settings.':'Could not get your position. Try again outdoors.';stop()};
 const stop=()=>{if(id!=null){navigator.geolocation.clearWatch(id);id=null}$('sg').textContent='Start'};
 $('sg').onclick=()=>{if(id!=null){stop();$('se').textContent='Stopped.';return}if(!navigator.geolocation){$('se').textContent='This browser does not support location.';return}$('se').textContent='Waiting for GPS…';id=navigator.geolocation.watchPosition(on,err,{enableHighAccuracy:true,maximumAge:0,timeout:20000});$('sg').textContent='Stop'};
 $('sr').onclick=()=>{max=0;dist=0;last=null;t0=0;sp=0;show()};$('sw').onclick=()=>{mph=!mph;$('sw').textContent=mph?'Switch to km/h':'Switch to mph';show()};
 setInterval(()=>{if(!el.isConnected)return;if(id!=null)show()},1000);show();
}
export function run(el,slug){({reaction,wordle,speed})[slug==='reaction'||slug==='wordle'||slug==='speed'?slug:'reaction'](el)}
