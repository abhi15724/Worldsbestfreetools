export const SITE='https://worldsbestfreetools.online';
export const PUBLISHER='worldsbestfreetools.online';
// Set to false to ask AI training crawlers (GPTBot, ClaudeBot, CCBot...) to stay out. Search and user-triggered agents stay allowed.
export const ALLOW_AI_TRAINING=true;
// [user-agent token, class]. Classes: ai-agent (acts for a user), ai-search (AI search index), ai-training, search-bot, other-bot, human.
export const BOTS=[
['ChatGPT-User','ai-agent'],['Claude-User','ai-agent'],['Perplexity-User','ai-agent'],['Google-Agent','ai-agent'],['MistralAI-User','ai-agent'],['Meta-ExternalFetcher','ai-agent'],['DuckAssistBot','ai-agent'],
['OAI-SearchBot','ai-search'],['Claude-SearchBot','ai-search'],['PerplexityBot','ai-search'],
['GPTBot','ai-training'],['ClaudeBot','ai-training'],['anthropic-ai','ai-training'],['CCBot','ai-training'],['Bytespider','ai-training'],['meta-externalagent','ai-training'],['Amazonbot','ai-training'],['cohere-ai','ai-training'],['Diffbot','ai-training'],
['Googlebot','search-bot'],['Bingbot','search-bot'],['DuckDuckBot','search-bot'],['YandexBot','search-bot'],['Baiduspider','search-bot'],['Applebot','search-bot']];
export function classify(ua='',accept=''){
  const u=ua.toLowerCase();
  for(const[t,c]of BOTS)if(u.includes(t.toLowerCase()))return{cls:c,bot:t};
  if(/bot\b|crawler|spider|scrapy|headless|python-requests|curl\/|wget\/|go-http-client/i.test(ua))return{cls:'other-bot',bot:'generic'};
  if(/\btext\/markdown\b/i.test(accept))return{cls:'ai-agent',bot:'accept-markdown'};
  return{cls:'human',bot:''};
}
// Search engines always get the normal HTML page. AI fetchers and anyone asking for Markdown get the Markdown version.
export const wantsMarkdown=(cls,accept)=>['ai-agent','ai-search','ai-training'].includes(cls)||/\btext\/markdown\b/i.test(accept||'');
export const API_OF={'emi-calculator':'emi','home-loan-emi-calculator':'emi','car-loan-emi-calculator':'emi','personal-loan-emi-calculator':'emi','sip-calculator':'sip','step-up-sip-calculator':'step_up_sip','swp-calculator':'swp','gst-calculator':'gst','compound-interest-calculator':'compound_interest','lumpsum-calculator':'compound_interest','fd-calculator':'compound_interest','cagr-calculator':'cagr','ppf-calculator':'ppf','bmi-calculator':'bmi','percentage-calculator':'percentage','income-tax-calculator':'income_tax','number-to-words':'number_to_words','length-converter':'unit_convert','weight-converter':'unit_convert','temperature-converter':'unit_convert','age-calculator':'age'};
