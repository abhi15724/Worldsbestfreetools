import {KW} from './keywords.mjs';
import {MICRO} from './micro-defs.mjs';
// cat|slug|Name|engine|param  -> engine set = LIVE (gets a page + sitemap entry). Empty engine = planned (no page yet, avoids thin content).
const C=`pdf|PDF Tools
image|Image Tools
download|Video & File Download Tools
finance|Finance & Loan Calculators
business|Business & Ecommerce
everyday|Everyday & Home Calculators
student|Student & Education
units|Units, Ruler & Measurement
text|Text Tools
fonts|Font & Stylish Text
qr|QR Code Tools
india|Indian Language Tools
threed|Image & 3D Tools
dev|Developer Tools
seo|SEO & Webmaster Tools
social|Social Media Tools
design|Design & Color Tools
health|Health & Everyday
datetime|Date & Time
media|Video & Audio
security|Security & Network
fun|Games, Generators & Fun`;
const T=`finance|emi-calculator|EMI Calculator|emi
finance|home-loan-emi-calculator|Home Loan EMI Calculator|emi|8.5,20
finance|car-loan-emi-calculator|Car Loan EMI Calculator|emi|9,5
finance|personal-loan-emi-calculator|Personal Loan EMI Calculator|emi|12,3
finance|sip-calculator|SIP Calculator|sip
finance|gst-calculator|GST Calculator|gst
finance|compound-interest-calculator|Compound Interest Calculator|compound
finance|lumpsum-calculator|Lumpsum Calculator|compound|1
finance|fd-calculator|FD Calculator|compound|4
finance|ppf-calculator|PPF Calculator|ppf
finance|income-tax-calculator|Income Tax Calculator|tax
finance|salary-calculator|Salary Calculator|salary
finance|hra-calculator|HRA Calculator|hra
finance|currency-converter|Currency Converter|fx|EUR,USD
finance|usd-to-inr|USD to INR Converter|fx|USD,INR
finance|loan-prepayment-calculator|Loan Prepayment Calculator|prepay
finance|swp-calculator|SWP Calculator|swp
finance|step-up-sip-calculator|Step-Up SIP Calculator|stepsip
finance|cagr-calculator|CAGR Calculator|cagr
finance|nps-calculator|NPS Calculator|nps
finance|gratuity-calculator|Gratuity Calculator|gratuity
image|compress-image|Compress Image|imgcompress|200
image|compress-image-to-20kb|Compress Image to 20KB|imgcompress|20
image|compress-image-to-50kb|Compress Image to 50KB|imgcompress|50
image|compress-image-to-100kb|Compress Image to 100KB|imgcompress|100
image|resize-image|Resize Image|imgresize
image|image-converter|Image Converter|imgconvert|png
image|jpg-to-png|JPG to PNG Converter|imgconvert|png
image|png-to-jpg|PNG to JPG Converter|imgconvert|jpeg
image|png-to-webp|PNG to WebP Converter|imgconvert|webp
image|remove-background|Background Remover|bgremove
image|passport-photo-maker|Passport Photo Maker|imgfit|413,531,100
image|signature-resizer|Signature Resizer|imgfit|140,60,20
image|image-upscaler|Image Upscaler|upscale
image|crop-image|Crop Image|crop
image|image-to-text|Image to Text (OCR)|ocrimg
pdf|image-to-pdf|Image to PDF|pdfimg
pdf|pdf-to-word|PDF to Word|pdf2word
pdf|pdf-to-jpg|PDF to JPG|pdf2jpg
pdf|merge-pdf|Merge PDF|pdfmerge
pdf|split-pdf|Split PDF|pdfsplit
pdf|compress-pdf|Compress PDF|pdfcompress
pdf|word-to-pdf|Word to PDF|word2pdf
pdf|excel-to-pdf|Excel to PDF|excel2pdf
pdf|powerpoint-to-pdf|PowerPoint to PDF|pptx2pdf
pdf|sign-pdf|Sign PDF|sign
pdf|protect-pdf|Protect PDF|protect
pdf|unlock-pdf|Unlock PDF|unlock
pdf|rotate-pdf|Rotate PDF|pdfrotate
pdf|pdf-to-excel|PDF to Excel|pdf2excel
pdf|ocr-pdf|OCR PDF|ocrpdf
qr|qr-code-generator|QR Code Generator|qr|text
qr|url-qr-code-generator|URL QR Code Generator|qr|url
qr|wifi-qr-code-generator|WiFi QR Code Generator|qr|wifi
qr|upi-qr-code-generator|UPI QR Code Generator|qr|upi
qr|whatsapp-qr-code-generator|WhatsApp QR Code Generator|qr|wa
fonts|fancy-text-generator|Fancy Text Generator|fancy
fonts|instagram-font-generator|Instagram Font Generator|fancy
fonts|whatsapp-stylish-text|WhatsApp Stylish Text Generator|fancy
fonts|font-converter|Font Converter|fontconv
fonts|font-pair-finder|Font Pair Finder|fontpair
fonts|symbols-copy-paste|Symbols Copy and Paste|symbols
fonts|text-to-handwriting|Text to Handwriting|hand
text|word-counter|Word Counter|words
text|character-counter|Character Counter|words
text|case-converter|Case Converter|case
text|paraphraser|Paraphrasing Tool|paraphrase
text|text-diff-checker|Text Diff Checker|diff
text|remove-duplicate-lines|Remove Duplicate Lines|dedupe
text|text-to-speech|Text to Speech|tts
units|online-ruler|Online Ruler|ruler
units|length-converter|Length Converter|unit|length
units|weight-converter|Weight Converter|unit|weight
units|temperature-converter|Temperature Converter|unit|temp
units|screen-ruler|Screen Ruler|rulerin
units|protractor|Online Protractor|protractor
units|pixel-to-cm-converter|Pixel to CM Converter|px2cm
units|aspect-ratio-calculator|Aspect Ratio Calculator|aspect
health|bmi-calculator|BMI Calculator|bmi
health|calorie-calculator|Calorie Calculator|calorie
health|percentage-calculator|Percentage Calculator|percent
india|kruti-dev-to-unicode|Kruti Dev to Unicode Converter|krutidev
india|english-to-hindi-typing|English to Hindi Typing|hindi
india|number-to-words|Number to Words Converter|numwords
threed|image-to-3d-converter|Image to 3D Converter|img3d
threed|image-to-lithophane|Image to Lithophane|litho
threed|depth-map-generator|Depth Map Generator|depthmap
dev|json-formatter|JSON Formatter|json
dev|base64-encoder|Base64 Encoder and Decoder|b64
dev|regex-tester|Regex Tester|regex
dev|uuid-generator|UUID Generator|uuid
seo|meta-tag-generator|Meta Tag Generator|meta
seo|robots-txt-generator|Robots.txt Generator|robotstxt
social|instagram-bio-generator|Instagram Bio Generator|igbio
social|youtube-tag-generator|YouTube Tag Generator|ytags
design|color-picker|Color Picker|color
design|gradient-generator|CSS Gradient Generator|grad
datetime|age-calculator|Age Calculator|age
datetime|date-difference-calculator|Date Difference Calculator|datediff
download|video-link-downloader|Video Link Downloader|dlvideo|video
download|file-downloader-from-url|File Downloader from URL|dlvideo|file
fun|reaction-time-test|Reaction Time Test|games|reaction
fun|wordle-game|Wordle Game (Daily Word Puzzle)|games|wordle
fun|gps-speedometer|GPS Car Speedometer|games|speed
media|video-compressor|Video Compressor|vcompress
media|video-to-mp3|Video to MP3 Converter|vmp3
security|password-generator|Password Generator|pass
fun|random-name-generator|Random Name Generator|names`;
export const CATPATH={"pdf": "pdf-tools", "image": "image-tools", "download": "video-download-tools", "finance": "finance-tools", "business": "business-tools", "everyday": "everyday-tools", "student": "student-tools", "units": "measurement-tools", "text": "text-tools", "fonts": "font-tools", "qr": "qr-code-tools", "india": "indian-language-tools", "threed": "3d-image-tools", "dev": "developer-tools", "seo": "seo-tools", "social": "social-media-tools", "design": "design-tools", "health": "health-tools", "datetime": "date-time-tools", "media": "video-audio-tools", "security": "security-tools", "fun": "game-tools"};
export const cats=C.split('\n').map(l=>{const[slug,name]=l.split('|');return{slug,name,path:CATPATH[slug]||slug+'-tools'}});
export const tools=[...T.split('\n').map(l=>{const[cat,slug,name,engine='',p='']=l.split('|');return{cat,slug,name,engine,p,live:!!engine}}),...MICRO.map(m=>({cat:m.c,slug:m.s,name:m.n,engine:'micro',p:m.s,live:true,micro:true,blurb:m.d}))];
for(const t of tools)if(t.micro&&!KW[t.slug]){const l=t.name.toLowerCase();KW[t.slug]={a:[l,l+' online','free '+l],x:[l+' online free',l+' without signup','how to use a '+l,'best '+l,l+' on mobile']}}
export const live=tools.filter(t=>t.live);
export const SITE='https://worldsbestfreetools.online';
export function seo(t){const n=t.name,l=n.toLowerCase();const k=KW[t.slug]||{a:[l],x:[]};
const al=k.a.filter(a=>a!==l);let desc;if(t.blurb)desc=t.blurb.length<=160?t.blurb:t.blurb.slice(0,157).replace(/\s+\S*$/,'')+'…';else for(let i=al.length;i>=0;i--){desc=`Free ${l} online${i?': '+al.slice(0,i).join(', '):''}. No signup, fast, and your data stays in your browser. Worlds Best Free Tools.`;if(desc.length<=160)break}
return{
title:`${n} – Free Online, No Signup`,
desc,
keywords:[...new Set([...k.a,...k.x.slice(0,6),'worlds best free tools'])].slice(0,10),
queries:k.x.length?k.x.slice(0,8):[`${l} online free`,`${l} without signup`,`best ${l}`,`how to use a ${l}`,`${l} on mobile`],
faq:[[`Is this ${l} free?`,`Yes. The ${l} is 100% free with no limits, watermarks or hidden charges.`],[`Do I need to sign up?`,`No account is needed. Open the page and use it right away.`],[`Is my data safe?`,`Everything runs inside your browser. Your files and inputs are never uploaded to our servers.`],[`Does it work on my phone?`,`Yes. The tool is responsive and works in any modern mobile or desktop browser.`]]}}
