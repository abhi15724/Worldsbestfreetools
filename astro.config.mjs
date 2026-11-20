import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:'https://worldsbestfreetools.online',trailingSlash:'always',integrations:[sitemap({filter:p=>!p.includes('/stats/')})]});
