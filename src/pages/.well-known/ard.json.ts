import {TOOLS} from '../../../api/_calc.js';
import {SITE,PUBLISHER} from '../../lib/agents.mjs';
const caps=Object.keys(TOOLS),q=['calculate the EMI for a 20 lakh home loan at 8.5% for 20 years','how much will a 5000 rupee monthly SIP be worth in 10 years','estimate income tax on 15 lakh salary under the new regime','convert 70 kg to pounds'];
const body=JSON.stringify({specVersion:'1.0',host:{displayName:'WorldsBestFreeTools',identifier:'did:web:'+PUBLISHER},entries:[
{'@context':'https://agenticresourcediscovery.org/context/v1',identifier:`urn:air:${PUBLISHER}:api:calculators`,displayName:'Free calculators and converters API',type:'application/openapi+json',url:SITE+'/openapi.json',description:'Read-only JSON API for finance, tax, health and unit calculators. No key needed.',capabilities:caps,representativeQueries:q},
{'@context':'https://agenticresourcediscovery.org/context/v1',identifier:`urn:air:${PUBLISHER}:mcp:calculators`,displayName:'WorldsBestFreeTools MCP server',type:'application/mcp-server-card+json',url:SITE+'/.well-known/mcp/server-card.json',description:'Remote MCP server exposing the same read-only calculators as tools.',capabilities:caps,representativeQueries:q}]});
export const GET=()=>new Response(body,{headers:{'content-type':'application/json'}});
