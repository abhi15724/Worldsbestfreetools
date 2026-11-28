import {paraphrase} from './paraphrase-lib.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function run(el){
 el.innerHTML='<label for="pt">Your text (up to 20,000 characters)</label><textarea id="pt" rows="8" maxlength="20000" placeholder="Paste or type the text you want to reword"></textarea><label for="pm">Style</label><select id="pm"><option>Standard</option><option>Fluent</option><option>Formal</option><option>Simple</option><option>Creative</option></select><button type="button" id="pg">Paraphrase</button><button type="button" id="pc" hidden>Copy result</button><div class="out" id="po" aria-live="polite" hidden></div><p style="font-size:.85rem;color:var(--mut)">This tool rewrites words and phrases with a built-in synonym engine on your device. It is not AI, so always read the result and fix any awkward wording. Press Paraphrase again for a different version.</p>';
 const $=i=>el.querySelector('#'+i);let plain='';
 $('pg').onclick=()=>{const t=$('pt').value;if(!t.trim()){$('po').hidden=false;$('po').textContent='Please enter some text.';$('pc').hidden=true;return}
  const r=paraphrase(t,$('pm').value);plain=r.text;$('po').hidden=false;
  $('po').innerHTML='<div style="white-space:pre-wrap">'+r.segs.map(s=>s.c?'<mark style="background:#fff3b0;border-radius:3px;padding:0 2px">'+esc(s.t)+'</mark>':esc(s.t)).join('')+'</div><p style="margin:10px 0 0;font-size:.9rem;color:var(--mut)">'+(r.changed?r.changed+' of '+r.total+' words changed (highlighted).':'No words could be replaced safely. Try another style or a longer text.')+'</p>';
  $('pc').hidden=!r.changed};
 $('pc').onclick=()=>{(navigator.clipboard?navigator.clipboard.writeText(plain):Promise.reject()).then(()=>{$('pc').textContent='Copied!';setTimeout(()=>$('pc').textContent='Copy result',1500)}).catch(()=>{const a=document.createElement('textarea');a.value=plain;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()})};
}
