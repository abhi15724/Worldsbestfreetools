import {SITE} from '../../../lib/agents.mjs';
export const GET=()=>new Response(JSON.stringify({name:'worldsbestfreetools-calculators',title:'WorldsBestFreeTools calculators',description:'Read-only finance, tax, health and unit calculators.',version:'1.0.0',websiteUrl:SITE,remotes:[{type:'streamable-http',url:SITE+'/api/mcp'}]}),{headers:{'content-type':'application/json'}});
