import {TOOLS,schemaOf} from '../_calc.js';
export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Cache-Control','public, s-maxage=3600');
  res.status(200).json({usage:'GET or POST /api/v1/{tool} with the parameters below. No API key needed. Fair use applies.',tools:Object.entries(TOOLS).map(([name,t])=>({name,description:t.d,parameters:schemaOf(name)}))});
}
