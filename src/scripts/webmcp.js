// WebMCP (W3C community-group draft): lets in-browser agents call this page's calculator directly. Read-only, same maths as the REST API.
export async function registerWebMcp(tool){
  const mc=document.modelContext??navigator.modelContext;if(!mc?.registerTool)return;
  try{await mc.registerTool({name:tool.name,description:tool.description,inputSchema:tool.inputSchema,annotations:{readOnlyHint:true},async execute(input){const r=await fetch('/api/v1/'+tool.name+'?'+new URLSearchParams(input));return{content:[{type:'text',text:JSON.stringify(await r.json())}]}}})}catch{}
}
