import {TOOLS,callTool} from '../_calc.js';
export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Cache-Control','public, s-maxage=3600');
  if(req.method==='OPTIONS')return res.status(204).end();
  const name=req.query.tool;
  if(!TOOLS[name])return res.status(404).json({error:'Unknown tool',tools:Object.keys(TOOLS)});
  try{res.status(200).json(callTool(name,req.method==='POST'?(req.body||{}):req.query))}catch(e){res.status(400).json({error:e.message})}
}
