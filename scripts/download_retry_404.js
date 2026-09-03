/**
 * download_retry_404.js - Substitutos para os 13 que deram 404
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const OUT_DIR = path.join(__dirname, '../public/img/gifts');

const RETRIES = [
  { file: 'u30_organizador.jpg',  id: '1484807785761-37f37f11b0f9' }, // organized shelf storage
  { file: 'u50_ferro_vapor.jpg',  id: '1586201375061-b8b2088b0975' }, // fabric laundry
  { file: 'u60_smart_tv.jpg',     id: '1571415060956-66b1f1ecef68' }, // television smart
  { file: 'u61_abridor.jpg',      id: '1458194606041-da4ac3d0e1a3' }, // wine bottle glasses
  { file: 'u64_copos.jpg',        id: '1551538827-f89e0f7a9284' }, // cocktail drinks colorful
  { file: 'u65_balde_gelo.jpg',   id: '1545594861-3aa6313cb6cc' }, // ice cold drink
  { file: 'u68_decanter.jpg',     id: '1553361371-0ba4af4f38de' }, // red wine glass decanter
  { file: 'u69_garrafa.jpg',      id: '1541167760-13cc2af4f2ef' }, // flask thermos coffee
  { file: 'u73_cervejeira.jpg',   id: '1571115177-2db9f8b0ad0e' }, // cold beer bottles fridge
  { file: 'u82_difusor.jpg',      id: '1517191297-f879edd3a559' }, // candle aroma diffuser home
  { file: 'u83_luminaria.jpg',    id: '1507473885765-e6ed057f782c' }, // lamp interior design
  { file: 'u85_quadros.jpg',      id: '1549430084-59d94cd8f8fd' }, // gallery wall art frames
  { file: 'u88_mesa_jantar.jpg',  id: '1449495695-cf7b36a7a3d4' }, // wooden dining table
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(destPath);
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject); return;
      }
      if (res.statusCode !== 200) { file.close(); fs.unlinkSync(destPath); reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (e) => { file.close(); if (fs.existsSync(destPath)) fs.unlinkSync(destPath); reject(e); });
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  console.log(`\n♻️  Retentando ${RETRIES.length} imagens...\n`);
  let ok = 0, fail = 0;
  for (const { file, id } of RETRIES) {
    const dest = path.join(OUT_DIR, file);
    const url = `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;
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
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`\n📊 ${ok} OK, ${fail} falhas\n`);
}
main();
