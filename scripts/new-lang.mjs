// Usage: node scripts/new-lang.mjs <url-code> <hreflang> <google-translate-code> "<Native name>" <locale> [ltr|rtl]
// Example: node scripts/new-lang.mjs fr fr fr "Français" fr_FR
// Creates src/i18n/<code>.mjs + <code>-compact.mjs holding the ENGLISH text of every tool, ready to be translated
// (by a translator or an AI assistant). Then register the language in src/i18n/locales.mjs and src/i18n/index.mjs.
import fs from 'node:fs';
import {live} from '../src/data/tools.mjs';
import {CONTENT} from '../src/data/tool-content.mjs';
const [code,hreflang,gt,name,locale,dir='ltr']=process.argv.slice(2);
if(!code||!hreflang||!gt||!name||!locale){console.log('Usage: node scripts/new-lang.mjs <code> <hreflang> <gt> "<Native name>" <locale> [ltr|rtl]');process.exit(1)}
const INDIA=new Set(['ppf-calculator','income-tax-calculator','salary-calculator','hra-calculator','usd-to-inr','swp-calculator','nps-calculator','gratuity-calculator','upi-qr-code-generator','kruti-dev-to-unicode','english-to-hindi-typing','number-to-words']);
const q=s=>JSON.stringify(s);
const rows=live.filter(t=>!INDIA.has(t.slug)&&CONTENT[t.slug]).map(t=>{const c=CONTENT[t.slug];
 return `${q(t.slug)}:[${q(t.name)},${q('TODO description under 160 chars: '+c.a[0].slice(0,110))},${q(c.a[0].slice(0,300))},${q(c.s.slice(0,3))}]`});
fs.writeFileSync(`src/i18n/${code}-compact.mjs`,`// slug:[name, description, intro, [steps]]  -> translate every English string, keep the slugs\nexport default {\n${rows.join(',\n')}\n};\n`);
const ui=fs.readFileSync('src/i18n/id.mjs','utf8').match(/const ui=\{[\s\S]*?\n\};/)[0];
fs.writeFileSync(`src/i18n/${code}.mjs`,`import {buildTools} from './build.mjs';\nimport c from './${code}-compact.mjs';\n// TRANSLATE every string in ui below (also titleFn/kwFn at the bottom)\n${ui}\nexport default {name:${q(name)},locale:${q(locale)},dir:${q(dir)},ui,\n tools:buildTools(c,ui,(n,en)=>\`\${n} (\${en})\`,(n,en)=>[n.toLowerCase(),en.toLowerCase()])};\n`);
console.log(`Created src/i18n/${code}.mjs and ${code}-compact.mjs.\nNext: add {code:'${code}',hreflang:'${hreflang}',gt:'${gt}',name:${q(name)},locale:'${locale}',dir:'${dir}'} to src/i18n/locales.mjs,\nimport ${code.replace(/\W/g,'')} from './${code}.mjs' in src/i18n/index.mjs and add it to MOD.`);
