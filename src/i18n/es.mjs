// Español: páginas traducidas en /es/. Se omiten herramientas pensadas solo para India (impuestos, PPF, UPI...).
import {buildTools} from './build.mjs';
import c1 from './es-compact-1.mjs';
import c2 from './es-compact-2.mjs';
import c3 from './es-compact-3.mjs';
const ui={
 nav_calc:'Calculadoras',nav_image:'Imagen',nav_pdf:'PDF',nav_qr:'QR',nav_blog:'Blog',
 about:'Quiénes somos',contact:'Contacto',privacy:'Política de privacidad',terms:'Términos y condiciones',
 footer:'Herramientas online gratuitas que funcionan en tu navegador. Puedes enlazar cualquier herramienta desde tu sitio.',
 home:'Inicio',about_h:'',about_fmt:'Sobre: {n}',how_h:'Cómo se usa',tips_h:'Consejos',faq_h:'Preguntas frecuentes',
 english:'Read this page in English',english_note:'Los botones y campos de la herramienta están por ahora en inglés; la explicación está en español.',
 more_en:'El resto de herramientas está disponible en inglés: ver todas',
 home_title:'Worlds Best Free Tools: herramientas online gratis en español',
 home_desc:'Worlds Best Free Tools: calculadoras de préstamos e inversión, compresor de imágenes, herramientas PDF y generador de códigos QR. Gratis, sin registro y en tu navegador.',
 home_h1:'Worlds Best Free Tools: herramientas online gratis, sin registro',
 home_lead:'Calculadoras, conversores y herramientas de imagen, PDF y QR. Sin registro, sin marcas de agua. Todo funciona en tu navegador.',
 home_kw:['worlds best free tools','herramientas online gratis','herramientas gratis en español','comprimir imagen','unir pdf online'],
 faq_free_q:'¿Es gratis esta herramienta?',faq_free_a:'Sí, es totalmente gratis. No hay registro, marcas de agua ni costes ocultos.',
 faq_priv_q:'¿Están seguros mis archivos y datos?',faq_priv_a:'La mayoría de las herramientas funcionan por completo en tu navegador, así que tus archivos y números no se envían a nuestros servidores. Las pocas excepciones se explican en la política de privacidad.'
};
const es={name:'Español',locale:'es_ES',dir:'ltr',ui,
 tools:buildTools({...c1,...c2,...c3},ui,(n,en)=>`${n} gratis online (${en})`,(n,en)=>[n.toLowerCase(),`${en.toLowerCase()} en español`,`${n.toLowerCase()} gratis`])};
export default es;
