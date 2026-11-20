// Run: npm run articles:todo   -> lists live tools that have no blog article yet.
import fs from 'node:fs';
const tools=fs.readFileSync('src/data/tools.mjs','utf8');
const T=tools.match(/const T=`([\s\S]*?)`;/)[1].split('\n').map(l=>l.split('|')).filter(a=>a[3]);
const covered=new Set();
for(const f of fs.readdirSync('src/content/blog').filter(f=>f.endsWith('.md')&&!f.startsWith('_'))){
  const m=fs.readFileSync('src/content/blog/'+f,'utf8').match(/^tools:\s*\[(.*?)\]/m);
  if(m)m[1].split(',').map(x=>x.trim().replace(/['"]/g,'')).forEach(x=>covered.add(x));
}
const todo=T.filter(a=>!covered.has(a[1]));
console.log(`${T.length-todo.length} of ${T.length} live tools have an article. Still to write (${todo.length}):\n`);
todo.forEach(a=>console.log(`- ${a[1]}  (${a[0]}, ${a[2]})`));
