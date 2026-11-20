// Kruti Dev 010 to Unicode. Glyph table: src/data/krutidev-map.json (see README for source and licence note).
const MATRAS='अ आ इ ई उ ऊ ए ऐ ओ औ ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ'.split(' ');
export function kd2uni(t,{one,two}){
  let s=t;
  one.forEach((a,i)=>{const b=two[i];if(!a)return;for(let n=0;n<5&&s.includes(a);n++){s=s.split(a).join(b);if(b.includes(a))break}});
  s=s.replace(/±/g,'Zं').replace(/Æ/g,'र्f');
  s=s.replace(/f([\s\S])/g,'$1ि');
  s=s.replace(/Ç/g,'fa').replace(/É/g,'र्fa').replace(/fa([\s\S])/g,'$1िं');
  s=s.replace(/Ê/g,'ीZ');
  s=s.replace(/ि्([\s\S])/g,'्$1ि');
  let pos;
  while((pos=s.indexOf('Z',1))>0){
    let p=pos-1;while(p>0&&MATRAS.includes(s[p]))p--;
    let pr=p-1;while(pr>0&&s[pr]==='्'){p=pr-1;pr=p-1}
    s=s.slice(0,p)+'र्'+s.slice(p,pos)+s.slice(pos+1);
  }
  return s;
}
