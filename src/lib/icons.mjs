// Inline SVG icons (no external images, no extra requests). iconFor(tool) -> HTML string.
const G={
calc:'M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 7h8 M8 12h.01 M12 12h.01 M16 12h.01 M8 16h.01 M12 16h.01 M16 16h.01',
coin:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9 9.5c0-1.2 1.3-2 3-2s3 .8 3 2-1.3 2-3 2-3 .8-3 2 1.3 2 3 2 3-.8 3-2 M12 6v1.5 M12 16.5V18',
doc:'M6 3h8l4 4v14H6z M14 3v4h4 M9 13h6 M9 17h6',
image:'M4 5h16v14H4z M4 16l5-5 4 4 3-3 4 4 M9 9.5h.01',
qr:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h2v2h-2z M18 14h2v2 M14 18h2 M18 18h2v2h-2z',
lock:'M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3 M12 15v2',
palette:'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3 9 9 0 0 0-8-11z M7.5 11h.01 M10 7.5h.01 M14.5 7.5h.01',
calendar:'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
play:'M4 6h16v12H4z M10 9.5v5l4.5-2.5z',
type:'M5 7V5h14v2 M12 5v14 M9 19h6',
code:'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 6l-3 12',
ruler:'M3 8h18v8H3z M7 8v3 M11 8v4 M15 8v3 M19 8v4',
heart:'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z',
globe:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
spark:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z',
cube:'M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5l8 4.5 8-4.5 M12 12v9',
book:'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z M5 17a3 3 0 0 1 3-3h10',
cart:'M4 5h2l2 10h9l2-7H7 M10 19h.01 M16 19h.01',
home:'M4 11l8-7 8 7 M6 10v10h12V10 M10 20v-6h4v6',
download:'M12 4v11 M7.5 11l4.5 4.5 4.5-4.5 M5 19h14',
rupee:'M7 5h10 M7 9h10 M7 5c5 0 7 2 7 4s-2 4-7 4l7 6'
};
const COL={pdf:'#d9480f',image:'#7048e8',finance:'#1a7f5a',units:'#0b7285',text:'#1864ab',fonts:'#c2255c',qr:'#15171c',india:'#e67700',threed:'#5f3dc4',dev:'#495057',seo:'#087f5b',social:'#c2255c',design:'#9c36b5',health:'#c8301a',datetime:'#e8590c',media:'#ae3ec9',security:'#2b8a3e',fun:'#f08c00',download:'#0b7a4b',student:'#1971c2',business:'#2f9e44',everyday:'#e8590c'};
const CATG={pdf:'doc',image:'image',finance:'coin',units:'ruler',text:'type',fonts:'type',qr:'qr',india:'rupee',threed:'cube',dev:'code',seo:'globe',social:'globe',design:'palette',health:'heart',datetime:'calendar',media:'play',security:'lock',fun:'spark',download:'download',student:'book',business:'cart',everyday:'home'};
const RULES=[[/download/,'download'],[/qr/,'qr'],[/pdf/,'doc'],[/password|uuid|hash|encrypt|lock|secure/,'lock'],[/color|colour|gradient|palette/,'palette'],[/video|mp3|audio|gif/,'play'],[/image|png|jpg|jpeg|webp|photo|resize|crop|picture|background|ocr|svg|passport|favicon|heic|ico\b|flip|blur|watermark|meme|exif/,'image'],[/emi|loan|sip|swp|cagr|compound|ppf|nps|fd-|lumpsum|gratuity|hra|salary|tax|gst|currency|usd|inr|interest|prepay|mutual|money|invest/,'coin'],[/percent|calculator/,'calc'],[/age|date|time|clock|countdown|timer|stopwatch|calendar|day|week/,'calendar'],[/bmi|calorie|health|water|pregnan/,'heart'],[/json|regex|base64|html|css|js|minif|url|encode|decode|meta|robots|sitemap|slug/,'code'],[/font|text|word|case|lorem|line|character|counter|emoji|symbol|bio|tag|caption|hashtag|name/,'type']];
export const iconFor=(t,size='')=>{
  const slug=t.slug||'',cat=t.cat||'';
  const g=t.micro?(CATG[cat]||'calc'):(RULES.find(([r])=>r.test(slug))||[0,CATG[cat]||'calc'])[1];
  const c=COL[cat]||'#c8301a';
  return `<span class="ico${size?' '+size:''}" style="--c:${c}" aria-hidden="true"><svg viewBox="0 0 24 24" width="${size==='big'?34:24}" height="${size==='big'?34:24}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${G[g]}"/></svg></span>`;
};
