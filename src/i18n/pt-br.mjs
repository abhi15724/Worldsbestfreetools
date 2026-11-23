// Português (Brasil): páginas traduzidas em /pt-br/. Ferramentas pensadas só para a Índia (impostos, PPF, UPI...) ficam de fora.
import {buildTools} from './build.mjs';
import c1 from './pt-br-compact-1.mjs';
import c2 from './pt-br-compact-2.mjs';
import c3 from './pt-br-compact-3.mjs';
const ui={
 nav_calc:'Calculadoras',nav_image:'Imagem',nav_pdf:'PDF',nav_qr:'QR',nav_blog:'Blog',nav_dl:'Downloads',search_ph:'Buscar ferramenta…',nav_all:'Todas as ferramentas',pop_h:'Ferramentas grátis populares',cats_h:'Categorias',
 about:'Sobre nós',contact:'Contato',privacy:'Política de privacidade',terms:'Termos e condições',
 footer:'Ferramentas online gratuitas que funcionam no seu navegador. Você pode colocar o link de qualquer ferramenta no seu site.',
 home:'Início',about_h:'',about_fmt:'Sobre: {n}',how_h:'Como usar',tips_h:'Dicas',faq_h:'Perguntas frequentes',
 english:'Ler esta página em inglês',english_note:'Os botões e campos da ferramenta ainda estão em inglês; a explicação está em português.',
 more_en:'As demais ferramentas estão disponíveis em inglês: ver todas',
 home_title:'Ferramentas Grátis Online: as Melhores | Worlds Best Free Tools',
 home_desc:'Worlds Best Free Tools: calculadoras de empréstimo e investimento, compressor de imagem, ferramentas de PDF e gerador de QR Code. Grátis, sem cadastro e direto no navegador.',
 home_h1:'Worlds Best Free Tools: ferramentas online grátis, sem cadastro',
 home_lead:'Calculadoras, conversores e ferramentas de imagem, PDF e QR Code. Sem cadastro, sem marca d\u2019água. Tudo funciona no seu navegador.',
 home_kw:['worlds best free tools','ferramentas online grátis','ferramentas grátis em português','comprimir imagem','juntar pdf online','gerador de qr code','melhores ferramentas grátis','ferramentas grátis','ferramentas online','free online tools','best free tools'],
 faq_free_q:'Esta ferramenta é grátis?',faq_free_a:'Sim, é totalmente grátis. Não há cadastro, marca d\u2019água nem custos escondidos.',
 faq_priv_q:'Meus arquivos e dados estão seguros?',faq_priv_a:'A maioria das ferramentas funciona inteiramente no seu navegador, então seus arquivos e números não são enviados aos nossos servidores. As poucas exceções estão descritas na política de privacidade.'
};
export default {name:'Português (Brasil)',locale:'pt_BR',dir:'ltr',ui,
 tools:buildTools({...c1,...c2,...c3},ui,(n,en)=>`${n} grátis online (${en})`,(n,en)=>[n.toLowerCase(),`${en.toLowerCase()} em português`,`${n.toLowerCase()} grátis`,`${n.toLowerCase()} online`])};
