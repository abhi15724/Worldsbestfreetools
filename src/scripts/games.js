import {WORDS} from '../data/wordle-words.mjs';
const css='<style>.gm{user-select:none;-webkit-user-select:none}.rt{min-height:240px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;font-weight:700;font-size:clamp(1.3rem,4vw,2rem);cursor:pointer;padding:16px;touch-action:manipulation;outline-offset:3px}.rt small{font-size:.95rem;font-weight:500;opacity:.9;margin-top:8px}.wg{display:grid;gap:6px;max-width:320px;margin:12px auto}.wr{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.wt{aspect-ratio:1;display:grid;place-items:center;border:2px solid #cfd3da;border-radius:8px;font-size:clamp(1.4rem,6vw,2rem);font-weight:800;text-transform:uppercase;background:#fff;color:#14171f}.wt.g{background:#2e9e5b;border-color:#2e9e5b;color:#fff}.wt.y{background:#c9a227;border-color:#c9a227;color:#fff}.wt.x{background:#6b7280;border-color:#6b7280;color:#fff}.wt.f{border-color:#6b7280}.kb{max-width:520px;margin:10px auto;display:grid;gap:6px}.kr{display:flex;gap:4px;justify-content:center}.gm .kk{flex:1;max-width:44px;min-height:48px;border:0;border-radius:8px;background:#e5e7eb;color:#14171f;font-weight:700;font-size:.95rem;cursor:pointer;text-transform:uppercase;padding:0;margin:0!important;width:auto!important}.gm .kk.w{max-width:70px;flex:1.6}.gm .kk.g{background:#2e9e5b;color:#fff}.gm .kk.y{background:#c9a227;color:#fff}.gm .kk.x{background:#6b7280;color:#fff}.sp{font-size:clamp(3rem,16vw,6rem);font-weight:800;line-height:1;text-align:center;margin:10px 0}.st{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:12px 0;text-align:center}.st div{background:#f3f4f7;border-radius:10px;padding:10px}.st b{display:block;font-size:1.25rem}'+'.gm .qo{display:block;width:100%!important;text-align:start;background:#fff;color:#14171f;border:2px solid #d6d9df;margin:8px 0!important;padding:12px 14px;border-radius:10px;font-weight:600;cursor:pointer;line-height:1.4}.gm .qo:hover{border-color:#7c3aed}.gm .qo.ok{background:#2e9e5b;border-color:#2e9e5b;color:#fff}.gm .qo.no{background:#c53030;border-color:#c53030;color:#fff}.qn{color:#566070;margin:0 0 6px;font-weight:600}.qq{margin:0 0 10px;font-size:1.2rem;line-height:1.35;text-align:start}.qf{margin:10px 0;font-weight:600;text-align:start}</style>';
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
// ---------------- GTA 6 quiz (unofficial fan quiz)
const Q=[
['Which two main characters are shown in the GTA 6 trailers?',['Lucia and Jason','Tommy and Lance','Trevor and Franklin','Niko and Roman'],0,'GTA 6 stars two protagonists, Lucia and Jason.'],
['GTA 6 is set in which fictional US state?',['Leonida','San Andreas','Liberty','Carcer'],0,'Leonida is the fictional state of GTA 6, inspired by Florida.'],
['What is the name of the main city in GTA 6?',['Vice City','Los Santos','Liberty City','Las Venturas'],0,'GTA 6 takes place in Leonida, with Vice City as its best-known city.'],
['Which real US state inspired Leonida?',['Florida','Texas','California','Louisiana'],0,'Leonida is a fictional version of Florida, as Vice City echoes Miami.'],
['Which company develops GTA 6?',['Rockstar Games','Ubisoft','Electronic Arts','CD Projekt Red'],0,'GTA 6 is developed and published by Rockstar Games, a label of Take-Two Interactive.'],
['What release date did Rockstar announce for GTA 6 after its second delay?',['November 19, 2026','May 26, 2026','Fall 2025','December 25, 2026'],0,'Rockstar moved the game from fall 2025 to May 26, 2026, and then to November 19, 2026.'],
['GTA 6 was first delayed from fall 2025 to which date?',['May 26, 2026','January 1, 2026','August 8, 2026','March 3, 2027'],0,'The first delay moved GTA 6 to May 26, 2026.'],
['On which consoles is GTA 6 launching?',['PlayStation 5 and Xbox Series X|S','Nintendo Switch only','PlayStation 4 and Xbox One only','PC only'],0,'Rockstar confirmed PS5 and Xbox Series X|S for launch. Check Rockstar for any other platforms.'],
['In which month and year was the first GTA 6 trailer released?',['December 2023','May 2025','October 2022','March 2024'],0,'Trailer 1 arrived in December 2023.'],
['In which month and year was the second GTA 6 trailer released?',['May 2025','December 2023','February 2024','September 2025'],0,'Trailer 2 arrived in May 2025.'],
['GTA 6 is the sequel to which game released in 2013?',['Grand Theft Auto V','Grand Theft Auto IV','Red Dead Redemption','Max Payne 3'],0,'Grand Theft Auto V launched in 2013.'],
['Which earlier GTA game was also set in Vice City?',['Grand Theft Auto: Vice City','Grand Theft Auto: San Andreas','Grand Theft Auto III','Grand Theft Auto IV'],0,'Vice City was the setting of Grand Theft Auto: Vice City (2002).'],
['Which real city inspired Los Santos from GTA V?',['Los Angeles','Chicago','Houston','Seattle'],0,'Los Santos is based on Los Angeles.'],
['Which fictional city is the setting of GTA IV?',['Liberty City','Vice City','San Fierro','Los Santos'],0,'GTA IV is set in Liberty City, based on New York.'],
['How many major cities are in GTA San Andreas?',['Three','Two','Five','One'],0,'San Andreas has Los Santos, San Fierro and Las Venturas.'],
['Which game brought the series into 3D in 2001?',['Grand Theft Auto III','Grand Theft Auto 2','Grand Theft Auto: Vice City','Grand Theft Auto V'],0,'Grand Theft Auto III (2001) moved the series into a 3D open world.'],
['Which company is the parent of Rockstar Games?',['Take-Two Interactive','Activision','Sony Interactive','Microsoft'],0,'Rockstar Games is a label of Take-Two Interactive.']
];
function gtaquiz(el){
 el.innerHTML=css+'<div class="gm" id="qz"></div><p style="font-size:.85rem;color:#566070">Unofficial fan quiz. Not affiliated with Rockstar Games or Take-Two Interactive.</p>';
 const box=el.querySelector('#qz');let deck=[],i=0,score=0,locked=false;
 const shuffle=a=>{a=a.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a};
 const rank=s=>s>=9?'Vice City legend':s>=7?'Seasoned crew member':s>=4?'Tourist with a map':'Just landed at the airport';
 const intro=()=>{box.innerHTML='<p>10 random questions about Vice City, Leonida, Lucia and Jason, the trailers and the GTA series.</p><button type="button" id="qs">Start quiz</button>'};
 const start=()=>{deck=shuffle(Q).slice(0,10).map(([q,o,c,e])=>{const idx=shuffle(o.map((_,k)=>k));return{q,o:idx.map(k=>o[k]),c:idx.indexOf(c),e}});i=0;score=0;show()};
 const show=()=>{if(i>=deck.length)return finish();const d=deck[i];locked=false;box.innerHTML='<p class="qn">Question '+(i+1)+' of '+deck.length+' · Score '+score+'</p><h3 class="qq">'+d.q+'</h3>'+d.o.map((t,k)=>'<button type="button" class="qo" data-k="'+k+'">'+t+'</button>').join('')+'<p class="qf" id="qf" aria-live="polite"></p><button type="button" id="qx" hidden>'+(i===deck.length-1?'See my score':'Next question')+'</button>'};
 const finish=()=>{box.innerHTML='<p class="qn">Quiz complete</p><div class="sp" style="font-size:clamp(2.5rem,12vw,4rem)">'+score+' / '+deck.length+'</div><p style="text-align:center;font-weight:700;font-size:1.2rem">'+rank(score)+'</p><p style="text-align:center"><button type="button" id="qc">Copy my score</button> <button type="button" id="qr">Play again</button></p><p id="qm" aria-live="polite" style="text-align:center"></p>'};
 box.addEventListener('click',e=>{const t=e.target;
  if(t.id==='qs'||t.id==='qr')return start();
  if(t.id==='qx'){i++;return show()}
  if(t.id==='qc'){const s='I scored '+score+'/'+deck.length+' on the GTA 6 quiz ('+rank(score)+'). Try it: '+location.href;(navigator.clipboard?navigator.clipboard.writeText(s):Promise.reject()).then(()=>box.querySelector('#qm').textContent='Copied!').catch(()=>box.querySelector('#qm').textContent=s);return}
  const b=t.closest('.qo');if(b&&!locked){locked=true;const d=deck[i],k=+b.dataset.k;box.querySelectorAll('.qo').forEach((x,j)=>{if(j===d.c)x.classList.add('ok')});if(k===d.c){score++;box.querySelector('#qf').textContent='Correct! '+d.e}else{b.classList.add('no');box.querySelector('#qf').textContent='Not quite. '+d.e}box.querySelector('#qx').hidden=false;box.querySelector('#qx').focus()}});
 intro();
}
export function run(el,slug){({reaction,wordle,speed,gtaquiz})[['reaction','wordle','speed','gtaquiz'].includes(slug)?slug:'reaction'](el)}
