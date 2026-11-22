// Unique explanation text for each tool page (300-500 words per tool).
// Fields: a = about paragraphs, s = steps, t = tips, u = who uses it, n = good to know, x = optional extra paragraph, y = example and troubleshooting.
import finance from './content/finance.mjs';
import financeU from './content/finance-u.mjs';
import financeX from './content/finance-x.mjs';
import image from './content/image.mjs';
import imageX from './content/image-x.mjs';
import pdf from './content/pdf.mjs';
import textqr from './content/text-qr.mjs';
import textunits from './content/text-units.mjs';
import misc1 from './content/misc1.mjs';
import misc2 from './content/misc2.mjs';
import topup from './content/topup.mjs';
const T=topup;
const parts=[[finance,financeU,financeX],[image,null,imageX],[pdf],[textqr],[textunits],[misc1],[misc2]];
export const CONTENT={};
for(const [base,u,x] of parts)for(const k of Object.keys(base))CONTENT[k]={...base[k],u:u?.[k]||base[k].u,x:x?.[k]||base[k].x,y:T[k]};
const wc=c=>[...(c.a||[]),...(c.s||[]),...(c.t||[]),c.u,c.n,c.x,c.y].filter(Boolean).join(' ').split(/\s+/).length;
export const wordsOf=slug=>CONTENT[slug]?wc(CONTENT[slug]):0;
