import {MICRO,byslug,parseField} from '../data/micro-defs.mjs';
import {esc} from '../data/micro-lib.mjs';
const load=async(f,max=3000)=>{const b=await createImageBitmap(f),s=Math.min(1,max/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(b.width*s));c.height=Math.max(1,Math.round(b.height*s));const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(b,0,0,c.width,c.height);return{c,x,w:c.width,h:c.height}};
const out=(c,name)=>{const u=c.toDataURL('image/png');return'<img src="'+u+'" alt="Result preview"><br><a class="btn" href="'+u+'" download="'+name+'">Download PNG</a>'};
export function run(el,slug){
 const d=byslug[slug];if(!d){el.innerHTML='<p class="out">Tool not found.</p>';return}
 const F=d.f.map(parseField),hasFile=F.some(f=>f.type==='f'||f.type==='m');
 const inp=f=>{const id='mf_'+f.id,L='<label for="'+id+'">'+esc(f.label)+'</label>';
  if(f.type==='a')return L+'<textarea id="'+id+'" rows="6">'+esc(f.def)+'</textarea>';
  if(f.type==='s')return L+'<select id="'+id+'">'+f.opts.map(o=>'<option>'+esc(o)+'</option>').join('')+'</select>';
  if(f.type==='f'||f.type==='m')return L+'<input id="'+id+'" type="file" accept="image/*,*/*"'+(f.type==='m'?' multiple':'')+(d.c==='image'?' accept="image/*"':'')+'>';
  if(f.type==='r'){const[a,b,s]=f.extra.split(';');return L+'<input id="'+id+'" type="range" min="'+a+'" max="'+b+'" step="'+s+'" value="'+esc(f.def)+'">'}
  const t=f.type==='d'?'date':f.type==='c'?'color':f.type==='t'?'text':'number';
  return L+'<input id="'+id+'" type="'+t+'"'+(t==='number'?' step="any" inputmode="decimal"':'')+' value="'+esc(f.def)+'">'};
 el.innerHTML=F.map(inp).join('')+(hasFile||d.b?'<button type="button" id="m_go">'+(hasFile?'Process':'Generate')+'</button>':'')+'<div class="out" id="m_o" aria-live="polite"></div>';
 const o=el.querySelector('#m_o');let tok=0;
 const read=()=>{const v={};F.forEach(f=>{const e=el.querySelector('#mf_'+f.id);v[f.id]=f.type==='f'?(e.files[0]||null):f.type==='m'?[...e.files]:(f.type==='n'||f.type==='r')?parseFloat(e.value):e.value});return v};
 const go=async()=>{const t=++tok;try{const r=await d.r(read(),{load,out,esc});if(t===tok)o.innerHTML=r}catch(e){if(t===tok)o.innerHTML='<span style="color:#c8301a">Please check your input and try again.</span>'}};
 if(!hasFile&&!d.b){el.addEventListener('input',go);el.addEventListener('change',go)}else{el.querySelector('#m_go').onclick=go;if(hasFile)el.addEventListener('change',e=>{if(e.target.type==='file')go()})}
 go();
}
