// Keyless paraphraser: synonym + phrase rewriting that runs entirely in the browser (no AI, no server, no key).
// Rewrites words and phrases, keeps punctuation and capitalization, fixes a/an, handles verb endings and plurals.
const P=s=>s.trim().split('\n').map(l=>{const[a,b]=l.split('>');return[a.trim(),b.split('|').map(x=>x.trim())]});
// verbs (regular verbs only; endings are generated)
const VERBS=P(`
use>utilize|employ
try>attempt|strive
start>begin|commence
finish>complete|conclude|wrap up
end>conclude|finish|terminate
ask>request|inquire
permit>allow|authorize
allow>permit|enable
pick>select|opt for
improve>enhance|boost|upgrade|refine
increase>raise|boost|expand|grow
reduce>lower|decrease|diminish|trim
change>alter|modify|adjust|revise
create>build|produce|generate|craft
check>verify|inspect|review|confirm
fix>repair|resolve|correct
explain>clarify|describe|spell out
describe>depict|outline|portray
consider>contemplate|weigh|examine
examine>inspect|study|analyze|review
study>examine|research|investigate
learn>discover|master|pick up
move>shift|relocate|transfer
work>operate|function
provide>supply|offer|deliver
offer>provide|present|extend
obtain>acquire|secure|gain
achieve>accomplish|attain|reach
reach>attain|achieve
complete>finish|finalize|conclude
develop>create|design|establish|cultivate
design>plan|craft|shape
manage>handle|oversee|administer
handle>manage|tackle
support>back|sustain
ensure>guarantee|secure|make certain
guarantee>ensure|assure|promise
avoid>sidestep|evade|steer clear of
prevent>stop|avert|block
stop>halt|cease|end
continue>proceed|carry on
remain>stay|continue
appear>seem|emerge|surface
seem>appear
expect>anticipate|predict
suggest>propose|recommend|advise
recommend>suggest|advise|endorse
require>need|demand
include>contain|incorporate|cover
contain>include|comprise
involve>entail|include|require
focus>concentrate|center
compare>contrast|weigh|measure
measure>gauge|assess|evaluate
assess>evaluate|judge|appraise
evaluate>assess|review|appraise
analyze>examine|study|assess|break down
review>examine|assess|go over
decide>determine|resolve|settle
determine>decide|establish|ascertain
discover>uncover|detect|find out
reveal>disclose|uncover|expose
limit>restrict|confine|cap
restrict>limit|restrain
connect>link|join|attach
join>link|connect|unite
combine>merge|blend|unite
separate>divide|detach
love>adore|cherish|enjoy
hate>despise|detest|dislike
share>distribute|pass on
show>demonstrate|illustrate|reveal
remove>delete|eliminate|take away
enjoy>relish|appreciate|savor
protect>safeguard|shield|defend
receive>obtain|acquire
send>deliver|dispatch|forward
`);
// nouns (plural by adding s/es/ies)
const NOUNS=P(`
problem>issue|difficulty|challenge|obstacle
issue>problem|matter|concern|topic
idea>concept|notion|thought|suggestion
way>method|approach|technique|strategy
method>approach|technique|procedure|strategy
approach>method|strategy|technique|tactic
result>outcome|finding
effect>impact|influence|consequence
impact>effect|influence|consequence
benefit>advantage|perk|gain|upside
advantage>benefit|edge|plus|merit
goal>objective|target|aim|aspiration
aim>goal|objective|purpose|target
purpose>aim|goal|intention|objective
reason>cause|motive|rationale|basis
cause>reason|source|origin|trigger
chance>opportunity|opening|prospect
opportunity>chance|opening|prospect|possibility
plan>strategy|scheme|blueprint|proposal
step>stage|phase|action|measure
part>portion|section|segment|component
piece>part|portion|fragment|segment
kind>type|sort|variety
type>kind|sort|variety
person>individual|human
group>team|collection|cluster|set
team>group|crew
company>firm|business|organization|enterprise
business>company|enterprise|firm|venture
job>task|role|position|assignment
task>job|assignment|duty|chore
area>region|zone|field|domain|sector
place>location|spot|site|position
location>place|site|spot|position
example>instance|illustration|case|sample
answer>response|reply|solution
question>query|inquiry|matter
tool>instrument|utility|device|resource
resource>asset|supply|tool|source
skill>ability|talent|expertise|capability
ability>capability|skill|capacity|talent
amount>quantity|volume|sum|total
cost>expense|price
price>cost|rate
change>alteration|shift|modification|adjustment
help>assistance|aid|support
use>usage|application|purpose
support>backing|assistance|aid
study>analysis|investigation
review>evaluation|assessment|appraisal
focus>emphasis|priority|center
design>layout|blueprint|plan
offer>proposal|deal|bid
start>beginning|outset|launch
end>conclusion|close
limit>cap|restriction|boundary
experience>exposure|practice|familiarity
knowledge>understanding|expertise|awareness|insight
information>data|details|facts|knowledge
data>information|figures|statistics
money>funds|cash|capital|finances
`);
// adjectives and adverbs (no endings)
const ADJ=P(`
important>crucial|vital|essential|significant
big>large|substantial|major
small>minor|modest|slight
good>great|excellent|solid
bad>poor|unfavorable|undesirable
quick>fast|swift|rapid
slow>gradual|unhurried|sluggish
easy>simple|effortless|straightforward|painless
difficult>challenging|demanding|tough
simple>easy|basic|straightforward
basic>fundamental|essential|elementary
main>primary|principal|chief|key
major>significant|key|primary
common>frequent|widespread|usual|typical
usual>typical|normal|customary
normal>typical|standard|regular
different>distinct|varied|diverse
similar>alike|comparable|akin
new>fresh|recent|modern|novel
useful>helpful|handy|practical|valuable
helpful>useful|beneficial|supportive
obvious>clear|evident|apparent
strong>powerful|sturdy|robust|solid
powerful>strong|mighty|potent
huge>enormous|massive|vast|immense
large>big|sizable|substantial|considerable
great>excellent|outstanding|superb|fantastic
excellent>outstanding|superb|exceptional
amazing>astonishing|remarkable|incredible|impressive
beautiful>attractive|lovely|stunning|gorgeous
interesting>fascinating|engaging|compelling|intriguing
popular>well-liked|favored|trendy
real>genuine|actual|authentic
whole>entire|complete|full
entire>whole|complete|full
recent>latest|current|new
current>present|existing|ongoing
possible>feasible|achievable|potential|conceivable
necessary>essential|required|needed|vital
essential>vital|crucial|necessary|key
various>several|diverse|assorted|multiple
several>multiple|various|numerous
certain>specific|particular|definite|sure
specific>particular|precise|distinct
particular>specific|special
special>unique|distinct|exceptional|particular
unique>distinctive|singular|one of a kind
happy>glad|pleased|delighted|cheerful
sad>unhappy|sorrowful|gloomy
angry>furious|irate|annoyed|upset
afraid>scared|frightened|fearful
ready>prepared|equipped
very>extremely|highly|really|remarkably
really>truly|genuinely|actually
quickly>rapidly|swiftly|promptly|fast
slowly>gradually|steadily
easily>effortlessly|readily|simply
often>frequently|regularly|commonly
usually>typically|normally|generally|commonly
always>constantly|invariably|continually
sometimes>occasionally|at times|periodically
also>additionally|furthermore
however>nevertheless|still|even so|that said
therefore>thus|consequently|hence|as a result
because>since|as|given that
although>though|even though|while
especially>particularly|notably|chiefly
mainly>mostly|primarily|chiefly|largely
mostly>mainly|largely|primarily
almost>nearly|virtually|practically
nearly>almost|practically|virtually
just>merely|simply|only
completely>entirely|fully|totally|wholly
totally>completely|entirely|fully
exactly>precisely|accurately|specifically
probably>likely|presumably|most likely
maybe>perhaps|possibly
perhaps>maybe|possibly
clearly>obviously|evidently|plainly
finally>lastly|eventually|ultimately|in the end
quite>fairly|rather|pretty|somewhat
fairly>rather|quite|reasonably|somewhat
recently>lately|of late|not long ago
immediately>instantly|right away|at once|promptly
people>individuals|folks
many>numerous|plenty of|a great many
`);
const PHRASES=P(`
in order to>to|so as to
due to the fact that>because|since
a lot of>plenty of
lots of>plenty of
at the moment>currently|right now|at present
in addition>additionally|furthermore|moreover
for example>for instance|such as
as well as>along with|together with|in addition to
in the end>ultimately|finally|eventually
on the other hand>conversely|by contrast|alternatively
in conclusion>to sum up|in summary|to conclude
as a result>consequently|therefore|thus
in spite of>despite|regardless of
a number of>several|various|multiple
kind of>somewhat|rather
sort of>somewhat|rather
right now>at the moment|currently
as soon as possible>promptly|without delay|at the earliest opportunity
most of the time>usually|typically|generally
in my opinion>from my perspective|to my mind|in my view
it is important to>it is essential to|it is crucial to|it is vital to
make sure>ensure|verify|confirm
find out>discover|learn|determine
look at>examine|consider|review
carry out>perform|conduct|execute
come up with>devise|create|think of
deal with>handle|address|tackle
point out>highlight|note|indicate
take part in>participate in|join
a few>several|a handful of|some
as long as>provided that|so long as
even though>although|though
on top of that>moreover|in addition|besides
for this reason>therefore|consequently|hence
in fact>actually|indeed|in reality
of course>naturally|certainly|obviously
first of all>to begin with|firstly
last but not least>finally|lastly
in the future>going forward|later on
at first>initially|in the beginning
at the same time>simultaneously|meanwhile|concurrently
by the way>incidentally|in passing
all of a sudden>suddenly|abruptly
in general>generally|overall|broadly
to be honest>frankly|honestly|candidly
no matter what>regardless|whatever happens
get rid of>remove|eliminate|discard
the fact that>that
`);
const FORMAL_PH=[['a lot of',['numerous','a considerable number of']],['lots of',['numerous','many']],['kids',['children']],['about',null]];
const CONTR=[["don't","do not"],["doesn't","does not"],["didn't","did not"],["can't","cannot"],["won't","will not"],["isn't","is not"],["aren't","are not"],["wasn't","was not"],["weren't","were not"],["it's","it is"],["that's","that is"],["there's","there is"],["i'm","I am"],["you're","you are"],["we're","we are"],["they're","they are"],["i've","I have"],["we've","we have"],["they've","they have"],["you've","you have"],["i'll","I will"],["we'll","we will"],["you'll","you will"],["they'll","they will"],["let's","let us"],["shouldn't","should not"],["couldn't","could not"],["wouldn't","would not"],["haven't","have not"],["hasn't","has not"]];
const DOUBLE=new Set(['stop','permit','plan','admit','commit','prefer','submit','equip','drop','step','scan','refer','occur','begin']);
const infl=(b,f)=>{if(f==='b')return b;
  if(f==='s')return /(s|x|z|ch|sh)$/.test(b)?b+'es':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ies':b+'s';
  if(f==='ed')return /e$/.test(b)?b+'d':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ied':DOUBLE.has(b)?b+b.slice(-1)+'ed':b+'ed';
  if(f==='ing')return /ie$/.test(b)?b.slice(0,-2)+'ying':/[^eoy]e$/.test(b)?b.slice(0,-1)+'ing':DOUBLE.has(b)?b+b.slice(-1)+'ing':b+'ing';return b};
const lastWord=(s,f)=>{const i=s.lastIndexOf(' ');return i<0?infl(s,f):s.slice(0,i+1)+infl(s.slice(i+1),f)};
// index: surface form -> [{kind,base,form,alts}]
const IDX=new Map();const add=(k,e)=>{(IDX.get(k)||IDX.set(k,[]).get(k)).push(e)};
for(const[b,alts]of VERBS)for(const f of ['b','s','ed','ing'])add(infl(b,f),{kind:'V',base:b,form:f,alts});
for(const[b,alts]of NOUNS){add(b,{kind:'N',base:b,form:'b',alts});add(infl(b,'s'),{kind:'N',base:b,form:'s',alts})}
for(const[b,alts]of ADJ)add(b,{kind:'A',base:b,form:'b',alts});
const PART=new Set('on out up off over in away back down around through along with for at'.split(' ')),TO_OK=new Set(['try','start','decide','learn','move']),MAKE=new Set('make made making take took taking takes'.split(' '));
const PROT=/(https?:\/\/\S+|www\.\S+|\b[\w.+-]+@[\w-]+\.[\w.-]+|[#@]\w+|`[^`]*`|\b[\w-]+\.(?:com|org|net|io|in|co|app|dev|info)\b\S*)/gi;
const DET=new Set('the a an this that these those my your his her its our their some any no every each such much more most less another other'.split(' '));
const VCTX=new Set("to will would can could may might should must shall we they you i he she it who not also always often usually never just please let's don't do does did".split(' '));
const RATE={Standard:.55,Fluent:.4,Formal:.6,Simple:.6,Creative:.9};
const VOWEL_SOUND=/^(hour|honest|honou?r|heir)/,CONS_SOUND=/^(uni|use|usu|eu|one|once|ubiq|util)/;
const art=w=>{w=w.toLowerCase();return VOWEL_SOUND.test(w)?'an':CONS_SOUND.test(w)?'a':/^[aeiou]/.test(w)?'an':'a'};
const pickAlt=(alts,mode,orig)=>{const c=alts.filter(a=>a.toLowerCase()!==orig);if(!c.length)return null;
  if(mode==='Formal')return c.slice().sort((x,y)=>y.length-x.length)[0];if(mode==='Simple')return c.slice().sort((x,y)=>x.length-y.length)[0];return c[Math.floor(Math.random()*c.length)]};
const cap=(s,orig)=>orig===orig.toUpperCase()&&orig.length>1?s.toUpperCase():orig[0]!==orig[0].toLowerCase()?s[0].toUpperCase()+s.slice(1):s;
// text -> {segs:[{t,c}], changed, total}
export function paraphrase(text,mode='Standard'){
  const rate=RATE[mode]??.55;let segs=text.split(PROT).map((t,i)=>({t,c:false,p:i%2===1})).filter(x=>x.t!=='');
  // 1) formal: expand contractions
  if(mode==='Formal'){for(const[a,b]of CONTR)segs=segs.flatMap(s=>s.c||s.p?[s]:s.t.split(new RegExp("\\b"+a.replace("'","['\u2019]")+"\\b",'i')).flatMap((p,i,arr)=>{const o=[{t:p,c:false}];if(i<arr.length-1)o.push({t:b,c:true});return o}))}
  // 2) phrases
  const phr=PHRASES.slice().sort((a,b)=>b[0].length-a[0].length);
  for(const[ph,alts]of phr){const re=new RegExp('\\b'+ph.replace(/ /g,'\\s+')+'\\b','gi');
    segs=segs.flatMap(s=>{if(s.c||s.p)return[s];const out=[];let last=0,m;re.lastIndex=0;while((m=re.exec(s.t))){if(Math.random()>Math.min(1,rate+.2)){continue}
      const alt=pickAlt(alts,mode,m[0].toLowerCase());if(!alt)continue;const start=/(^|[.!?]\s+)$/.test(s.t.slice(0,m.index));out.push({t:s.t.slice(last,m.index),c:false},{t:cap(alt,m[0][0]===m[0][0].toLowerCase()&&!start?m[0]:m[0]),c:true});last=m.index+m[0].length}
      out.push({t:s.t.slice(last),c:false});return out.filter(x=>x.t!=='')})}
  // 3) words
  const out=[];let total=0,changed=0,prevWord='',sentStart=true;
  const push=(t,c)=>out.push({t,c});
  for(const s of segs){if(s.p){push(s.t,false);prevWord='';sentStart=false;continue}if(s.c){push(s.t,true);changed+=s.t.split(/\s+/).filter(Boolean).length;total+=s.t.split(/\s+/).filter(Boolean).length;prevWord=s.t.split(/\s+/).pop().toLowerCase();sentStart=false;continue}
    const arr=s.t.split(/([A-Za-z\u2019']+)/);
    for(let ai=0;ai<arr.length;ai++){const tok=arr[ai];
      if(!tok)continue;if(!/^[A-Za-z]/.test(tok)){push(tok,false);if(/[.!?]\s*$/.test(tok)||/\n/.test(tok))sentStart=true;continue}
      total++;const lower=tok.toLowerCase().replace(/\u2019/g,"'");const nextW=((arr[ai+2]||'').toLowerCase()),gap=arr[ai+1]||'';
      let done=false;
      if(tok.length>2&&Math.random()<rate&&!(tok===tok.toUpperCase()&&tok.length>1)&&!(tok[0]!==tok[0].toLowerCase()&&!sentStart)&&!/[-]/.test(gap.slice(0,1))){
        const ents=IDX.get(lower);
        if(ents){let e=null;const nounCtx=DET.has(prevWord)||/'s$/.test(prevWord),verbCtx=VCTX.has(prevWord);
          const kinds=new Set(ents.map(x=>x.kind));
          if(kinds.size===1){e=ents[0];if(e.kind==='V'&&nounCtx)e=null;else if(e.kind==='N'&&verbCtx)e=null}
          else if(kinds.has('A'))e=ents.find(x=>x.kind==='A');
          else e=nounCtx?ents.find(x=>x.kind==='N'):verbCtx?ents.find(x=>x.kind==='V'):null;
          if(e&&e.kind==='V'&&(PART.has(nextW)||(nextW==='to'&&!TO_OK.has(e.base))))e=null;
          if(e&&e.kind==='N'&&(MAKE.has(prevWord)||prevWord==='at'||(e.base==='place'&&/^tak/.test(prevWord))||(e.base==='step'&&nextW==='by')||(/^(way|kind|type|part)$/.test(e.base)&&!/^(to|of)$/.test(nextW)&&!(e.base==='way'&&false))))e=null;
          if(e&&lower==='many'&&/^(how|so|too|as|very|not|that)$/.test(prevWord))e=null;
          if(e){const alt=pickAlt(e.alts,mode,e.base);if(alt){const form=e.kind==='V'||e.kind==='N'?lastWord(alt,e.form==='b'?'b':e.form):alt;
            if(/^(a|an)$/i.test(prevWord)){for(let k=out.length-1;k>=0;k--){if(/^(a|an)$/i.test(out[k].t)){out[k]={t:cap(art(form),out[k].t),c:false};break}}}
            push(cap(form,tok),true);changed++;done=true}}}}
      if(!done)push(tok,false);prevWord=lower;sentStart=false}}
  // fix "a/an" before untouched words whose previous word we changed is handled above; merge adjacent segments
  const merged=[];for(const s of out){const l=merged[merged.length-1];if(l&&l.c===s.c)l.t+=s.t;else merged.push({...s})}
  return{segs:merged,changed,total,text:merged.map(s=>s.t).join('')};
}
