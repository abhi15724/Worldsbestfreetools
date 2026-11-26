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
import dl from './content/download.mjs';
import games from './content/games.mjs';
import barcode from './content/barcode.mjs';
import {MICRO} from './micro-defs.mjs';
import {parseField} from './micro-lib.mjs';
const T=topup;
const parts=[[dl],[games],[barcode],[finance,financeU,financeX],[image,null,imageX],[pdf],[textqr],[textunits],[misc1],[misc2]];
export const CONTENT={};
for(const [base,u,x] of parts)for(const k of Object.keys(base))CONTENT[k]={...base[k],u:u?.[k]||base[k].u,x:x?.[k]||base[k].x,y:T[k]};
const wc=c=>[...(c.a||[]),...(c.s||[]),...(c.t||[]),c.u,c.n,c.x,c.y].filter(Boolean).join(' ').split(/\s+/).length;
export const wordsOf=slug=>CONTENT[slug]?wc(CONTENT[slug]):0;

// Generated page text for micro tools (each has its own description, field list and category notes)
const WHO={gta6:'GTA fans, roleplayers, writers and streamers',everyday:'Homeowners, shoppers, gardeners, cooks and DIY planners',business:'Online sellers, freelancers and small business owners',student:'Students, teachers and exam candidates',social:'Creators, marketers and social media managers',media:'Video editors, podcasters and musicians',security:'Anyone who wants to check files, passwords and data without uploading them',dev:'Developers, testers and IT teams',seo:'Website owners, SEO specialists and marketers',image:'Designers, bloggers and photographers'};
const NOTE={gta6:'This is an unofficial fan-made tool for fun. It is not affiliated with, endorsed by or sponsored by Rockstar Games or Take-Two Interactive. Grand Theft Auto and GTA are trademarks of their respective owners. All generated names and stories are fictional.',everyday:'Results are estimates for planning and shopping. Real needs vary with materials, local rules and waste, so add a safety margin for important purchases.',business:'Results are estimates for general planning and are not financial, tax or legal advice. Check platform fees and local taxes for your exact case.',student:'Results are study aids and estimates. Always follow your institution\'s official grading and exam rules.',social:'Platform limits and rules change over time. Check the platform for the latest limits.',media:'Values are calculations and guidelines; real results depend on your tools and settings.',security:'Everything is processed in your browser using built-in browser features. For highly sensitive material, use tools you can audit offline.',dev:'This is a quick helper with basic checks. Confirm important results with official validators or your own tests.',seo:'Checks are basic and meant for quick review. Confirm important changes in Google Search Console and official testing tools.',image:'Large images are scaled down to at most 3000 pixels on the longest side for speed. Your image is processed in your browser and never uploaded.'};
for(const m of MICRO){if(CONTENT[m.s])continue;const F=m.f.map(parseField),file=F.some(f=>f.type==='f'||f.type==='m');
const labels=F.filter(f=>f.type!=='f'&&f.type!=='m').map(f=>f.label.replace(/\s*\(.*?\)\s*/g,' ').trim()).slice(0,6);
CONTENT[m.s]={a:[m.d,`The ${m.n} runs entirely in your browser. ${file?'The file you choose is processed on your device and is not uploaded or stored.':'What you type is processed on your device and is not uploaded or stored.'} ${labels.length?'You provide: '+labels.join(', ')+'.':''} ${file?'Choose the file, adjust any options and press the button.':'The result updates as you type.'}`],
s:[...F.slice(0,5).map(f=>f.type==='f'||f.type==='m'?'Choose your file'+(f.type==='m'?'s':'')+'.':f.type==='s'?`Pick ${f.label.toLowerCase()}.`:`Enter ${f.label.replace(/\s*\(.*?\)\s*/g,' ').trim().toLowerCase()}.`),'Read, copy or download the result.'],
t:['Check the units and formats shown in each field before you rely on the result.','Change one value at a time to compare scenarios.','Keep full precision for final work; displayed numbers are rounded.','Bookmark this page to use the tool again without searching.'],
u:`${WHO[m.c]||'Anyone who needs a quick, private answer'} use the ${m.n.toLowerCase()} to get a result in seconds without installing software or creating an account.`,
n:NOTE[m.c]||'Results are for general information only.'}}
