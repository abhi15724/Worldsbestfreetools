// ONE place to register a translated language.
// code     = URL folder (/pt-br/...)            hreflang = value for <html lang>, hreflang links and the sitemap
// gt       = Google Translate code that the header dropdown uses to jump to this language's real pages
// To add a language: add a row here, create src/i18n/<code>.mjs (copy ar.mjs/id.mjs), then import it in index.mjs.
export const LOCALES=[
{code:'hi',hreflang:'hi',gt:'hi',name:'हिन्दी',locale:'hi_IN',dir:'ltr'},
{code:'es',hreflang:'es',gt:'es',name:'Español',locale:'es_ES',dir:'ltr'},
{code:'pt-br',hreflang:'pt-BR',gt:'pt',name:'Português (Brasil)',locale:'pt_BR',dir:'ltr'},
{code:'id',hreflang:'id',gt:'id',name:'Bahasa Indonesia',locale:'id_ID',dir:'ltr'},
{code:'ar',hreflang:'ar',gt:'ar',name:'العربية',locale:'ar_SA',dir:'rtl'},
{code:'de',hreflang:'de',gt:'de',name:'Deutsch',locale:'de_DE',dir:'ltr'},
{code:'ja',hreflang:'ja',gt:'ja',name:'日本語',locale:'ja_JP',dir:'ltr'},
{code:'zh-cn',hreflang:'zh-CN',gt:'zh-CN',name:'简体中文',locale:'zh_CN',dir:'ltr'},
{code:'zh-tw',hreflang:'zh-TW',gt:'zh-TW',name:'繁體中文（台灣）',locale:'zh_TW',dir:'ltr'},
{code:'ru',hreflang:'ru',gt:'ru',name:'Русский',locale:'ru_RU',dir:'ltr'}
];
