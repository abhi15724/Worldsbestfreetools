// Minimal stateless MCP server (Streamable HTTP, JSON responses). Read-only calculator tools.
import {TOOLS,schemaOf,callTool} from './_calc.js';
const VERSIONS=['2025-06-18','2025-03-26'];
const rpc=(m)=>{
  const ok=r=>({jsonrpc:'2.0',id:m.id,result:r}),err=(c,t)=>({jsonrpc:'2.0',id:m.id,error:{code:c,message:t}});
  if(m.id===undefined)return null;
  switch(m.method){
    case 'initialize':return ok({protocolVersion:VERSIONS.includes(m.params?.protocolVersion)?m.params.protocolVersion:VERSIONS[0],capabilities:{tools:{}},serverInfo:{name:'worldsbestfreetools',title:'WorldsBestFreeTools calculators',version:'1.0.0'},instructions:'Free calculators and converters. All tools are read-only and return estimates.'});
    case 'ping':return ok({});
    case 'tools/list':return ok({tools:Object.entries(TOOLS).map(([name,t])=>({name,description:t.d,inputSchema:schemaOf(name),annotations:{readOnlyHint:true,openWorldHint:false}}))});
    case 'tools/call':{try{const r=callTool(m.params?.name,m.params?.arguments);return ok({content:[{type:'text',text:JSON.stringify(r.result)}],isError:false})}catch(e){return ok({content:[{type:'text',text:e.message}],isError:true})}}
    default:return err(-32601,'Method not found');
  }
};
export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','content-type, mcp-protocol-version, mcp-session-id');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Use POST with a JSON-RPC message'})}
  const b=req.body;if(!b||typeof b!=='object')return res.status(400).json({jsonrpc:'2.0',id:null,error:{code:-32700,message:'Parse error'}});
  const out=Array.isArray(b)?b.map(rpc).filter(Boolean):rpc(b);
  if(!out||(Array.isArray(out)&&!out.length))return res.status(202).end();
  res.status(200).json(out);
}
