import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {LOCALES} from './src/i18n/locales.mjs';
export default defineConfig({site:'https://worldsbestfreetools.online',trailingSlash:'always',build:{inlineStylesheets:'always'},prefetch:{prefetchAll:true,defaultStrategy:'hover'},integrations:[sitemap({lastmod:new Date(),filter:p=>!p.includes('/stats/'),i18n:{defaultLocale:'en',locales:{en:'en',...Object.fromEntries(LOCALES.map(l=>[l.code,l.hreflang]))}}})]});
