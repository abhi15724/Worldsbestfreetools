// ONE place to register a translated language.
// code     = URL folder (/pt-br/...)            hreflang = value for <html lang>, hreflang links and the sitemap
// gt       = Google Translate code that the header dropdown uses to jump to this language's real pages
// To add a language: add a row here, create src/i18n/<code>.mjs (copy ar.mjs/id.mjs), then import it in index.mjs.
export const LOCALES=[
{code:'hi',hreflang:'hi',gt:'hi',name:'हिन्दी',locale:'hi_IN',dir:'ltr'},
{code:'es',hreflang:'es',gt:'es',name:'Español',locale:'es_ES',dir:'ltr'},
{code:'pt-br',hreflang:'pt-BR',gt:'pt',name:'Português (Brasil)',locale:'pt_BR',dir:'ltr'},
{code:'id',hreflang:'id',gt:'id',name:'Bahasa Indonesia',locale:'id_ID',dir:'ltr'},
{code:'ar',hreflang:'ar',gt:'ar',name:'العربية',locale:'ar_SA',dir:'rtl'}
];
