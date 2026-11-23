// Bahasa Indonesia: halaman terjemahan di /id/. Alat khusus India (pajak, PPF, UPI...) tidak disertakan.
import {buildTools} from './build.mjs';
import c1 from './id-compact-1.mjs';
import c2 from './id-compact-2.mjs';
import c3 from './id-compact-3.mjs';
const ui={
 nav_calc:'Kalkulator',nav_image:'Gambar',nav_pdf:'PDF',nav_qr:'QR',nav_blog:'Blog',nav_dl:'Unduh',search_ph:'Cari alat…',nav_all:'Semua alat',pop_h:'Alat gratis populer',cats_h:'Kategori',
 about:'Tentang kami',contact:'Kontak',privacy:'Kebijakan privasi',terms:'Syarat dan ketentuan',
 footer:'Alat online gratis yang berjalan di browser Anda. Anda bebas menautkan alat mana pun dari situs Anda.',
 home:'Beranda',about_h:'',about_fmt:'Tentang: {n}',how_h:'Cara menggunakan',tips_h:'Tips',faq_h:'Pertanyaan yang sering diajukan',
 english:'Baca halaman ini dalam bahasa Inggris',english_note:'Tombol dan kolom pada alat ini masih berbahasa Inggris; penjelasannya dalam bahasa Indonesia.',
 more_en:'Alat lainnya tersedia dalam bahasa Inggris: lihat semua',
 home_title:'Alat Online Gratis: Tools Terbaik Tanpa Daftar | Worlds Best Free Tools',
 home_desc:'Worlds Best Free Tools: kalkulator pinjaman dan investasi, kompres gambar, alat PDF, dan pembuat kode QR. Gratis, tanpa daftar, langsung di browser.',
 home_h1:'Worlds Best Free Tools: alat online gratis tanpa daftar',
 home_lead:'Kalkulator, konverter, serta alat gambar, PDF, dan QR. Tanpa daftar, tanpa watermark. Semuanya berjalan di browser Anda.',
 home_kw:['worlds best free tools','alat online gratis','tools online gratis','kompres gambar','gabung pdf online','pembuat qr code','tools gratis terbaik','alat gratis','tools online gratis','free online tools','best free tools'],
 faq_free_q:'Apakah alat ini gratis?',faq_free_a:'Ya, sepenuhnya gratis. Tidak ada pendaftaran, watermark, atau biaya tersembunyi.',
 faq_priv_q:'Apakah file dan data saya aman?',faq_priv_a:'Sebagian besar alat berjalan sepenuhnya di browser Anda, jadi file dan angka Anda tidak dikirim ke server kami. Beberapa pengecualian dijelaskan di kebijakan privasi.'
};
export default {name:'Bahasa Indonesia',locale:'id_ID',dir:'ltr',ui,
 tools:buildTools({...c1,...c2,...c3},ui,(n,en)=>`${n} Gratis Online (${en})`,(n,en)=>[n.toLowerCase(),`${en.toLowerCase()} bahasa indonesia`,`${n.toLowerCase()} gratis`,`${n.toLowerCase()} online`])};
