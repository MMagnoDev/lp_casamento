/**
 * download_pexels_fallback.js
 * Usa URLs diretas do Pexels/Picsum para os 12 que ainda faltam.
 * O Picsum.photos aceita seeds para imagens consistentes.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const OUT_DIR = path.join(__dirname, '../public/img/gifts');

// Pexels URLs diretas (arquivos CDN — funcionam sem API key)
// e Unsplash com IDs alternativos testados
const DOWNLOADS = [
  // organizador de gaveta / prateleira organizada
  { file: 'u30_organizador.jpg',
    url: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ferro de passar a vapor
  { file: 'u50_ferro_vapor.jpg',
    url: 'https://images.pexels.com/photos/4558759/pexels-photo-4558759.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // smart TV / sala com TV
  { file: 'u60_smart_tv.jpg',
    url: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // abridor de vinho / garrafa vinho
  { file: 'u61_abridor.jpg',
    url: 'https://images.pexels.com/photos/2702805/pexels-photo-2702805.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // copos de drinks / coquetéis coloridos
  { file: 'u64_copos.jpg',
    url: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // balde de gelo com champanhe
  { file: 'u65_balde_gelo.jpg',
    url: 'https://images.pexels.com/photos/1510695/pexels-photo-1510695.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // decanter de vinho
  { file: 'u68_decanter.jpg',
    url: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // garrafa térmica / thermos
  { file: 'u69_garrafa.jpg',
    url: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // cervejeira / garrafas de cerveja geladas
  { file: 'u73_cervejeira.jpg',
    url: 'https://images.pexels.com/photos/1267361/pexels-photo-1267361.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // difusor de aromas / velas home decor
  { file: 'u82_difusor.jpg',
    url: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // quadros / galeria de arte na parede
  { file: 'u85_quadros.jpg',
    url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // mesa de jantar em madeira
  { file: 'u88_mesa_jantar.jpg',
    url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    const req = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(destPath);
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject); return;
      }
      if (res.statusCode !== 200) { file.close(); if (fs.existsSync(destPath)) fs.unlinkSync(destPath); reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (e) => { file.close(); if (fs.existsSync(destPath)) fs.unlinkSync(destPath); reject(e); });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  console.log(`\n📥 Baixando ${DOWNLOADS.length} imagens via Pexels...\n`);
  let ok = 0, fail = 0;
  for (const { file, url } of DOWNLOADS) {
    const dest = path.join(OUT_DIR, file);
    try {
      await downloadImage(url, dest);
      const size = fs.statSync(dest).size;
      if (size < 5000) { fs.unlinkSync(dest); throw new Error('Arquivo inválido'); }
      console.log(`  ✅ ${file} (${(size/1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.error(`  ❌ ${file}: ${e.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\n📊 ${ok} OK, ${fail} falhas\n`);
}
main();
