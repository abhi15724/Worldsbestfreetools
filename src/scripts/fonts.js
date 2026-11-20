// Font container conversion: TTF/OTF <-> WOFF (native zlib streams) and WOFF2 (wawoff2, MIT).
const pad4=n=>(n+3)&~3;
const stream=async(T,u8)=>new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(T)).arrayBuffer());
const zip=u8=>stream(new CompressionStream('deflate'),u8),unzip=u8=>stream(new DecompressionStream('deflate'),u8);
export async function toWoff(sf){
  const d=new DataView(sf.buffer,sf.byteOffset,sf.byteLength),n=d.getUint16(4),T=[];
  for(let i=0;i<n;i++){const o=12+16*i,off=d.getUint32(o+8),len=d.getUint32(o+12),raw=sf.subarray(off,off+len),z=await zip(raw);T.push({tag:sf.slice(o,o+4),cs:d.getUint32(o+4),len,data:z.length<len?z:raw})}
  T.sort((a,b)=>String.fromCharCode(...a.tag)<String.fromCharCode(...b.tag)?-1:1);
  let off=44+20*n,total=12+16*n;T.forEach(t=>{t.off=off;off+=pad4(t.data.length);total+=pad4(t.len)});
  const out=new Uint8Array(off),w=new DataView(out.buffer);out.set([0x77,0x4f,0x46,0x46]);out.set(sf.subarray(0,4),4);w.setUint32(8,off);w.setUint16(12,n);w.setUint32(16,total);
  T.forEach((t,i)=>{const o=44+20*i;out.set(t.tag,o);w.setUint32(o+4,t.off);w.setUint32(o+8,t.data.length);w.setUint32(o+12,t.len);w.setUint32(o+16,t.cs);out.set(t.data,t.off)});
  return out;
}
export async function fromWoff(w){
  const d=new DataView(w.buffer,w.byteOffset,w.byteLength),n=d.getUint16(12),T=[];
  for(let i=0;i<n;i++){const o=44+20*i,off=d.getUint32(o+4),cl=d.getUint32(o+8),ol=d.getUint32(o+12),raw=w.subarray(off,off+cl);T.push({tag:w.slice(o,o+4),cs:d.getUint32(o+16),data:cl<ol?await unzip(raw):raw})}
  let off=12+16*n;const out=new Uint8Array(T.reduce((s,t)=>s+pad4(t.data.length),off)),v=new DataView(out.buffer),e=Math.floor(Math.log2(n)),sr=16*2**e;
  out.set(w.subarray(4,8),0);v.setUint16(4,n);v.setUint16(6,sr);v.setUint16(8,e);v.setUint16(10,n*16-sr);
  T.forEach((t,i)=>{const o=12+16*i;out.set(t.tag,o);v.setUint32(o+4,t.cs);v.setUint32(o+8,off);v.setUint32(o+12,t.data.length);out.set(t.data,off);off+=pad4(t.data.length)});
  return out;
}
const w2=async()=>{const m=await import('wawoff2');return m.compress?m:m.default};
export async function fontConvert(buf,target){
  const u=new Uint8Array(buf),sig=String.fromCharCode(...u.subarray(0,4));
  if(!['wOFF','wOF2','OTTO','true','\0\x01\0\0'].includes(sig))throw Error('This does not look like a TTF, OTF, WOFF or WOFF2 font file.');
  const sf=sig=='wOFF'?await fromWoff(u):sig=='wOF2'?new Uint8Array(await(await w2()).decompress(u)):u;
  if(target=='woff')return toWoff(sf);
  if(target=='woff2')return new Uint8Array(await(await w2()).compress(sf));
  return sf;
}
export const isOtf=u=>String.fromCharCode(...u.subarray(0,4))=='OTTO';
