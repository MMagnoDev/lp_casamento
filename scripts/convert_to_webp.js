/**
 * convert_to_webp.js
 * Converte todos os .jpg dos presentes para .webp (qualidade 90%)
 * e atualiza as referências em src/data/gifts.ts automaticamente.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GIFTS_DIR = path.join(__dirname, '../public/img/gifts');
const GIFTS_TS  = path.join(__dirname, '../src/data/gifts.ts');

async function main() {
  // Pega apenas os .jpg baixados (prefixo u* ou g*), ignora os .webp originais
  const jpgFiles = fs.readdirSync(GIFTS_DIR)
    .filter(f => f.endsWith('.jpg'));

  console.log(`\n🔄 Convertendo ${jpgFiles.length} arquivos .jpg → .webp (q=90)...\n`);

  let ok = 0, fail = 0;
  for (const file of jpgFiles) {
    const srcPath  = path.join(GIFTS_DIR, file);
    const destName = file.replace('.jpg', '.webp');
    const destPath = path.join(GIFTS_DIR, destName);

    try {
      await sharp(srcPath)
        .webp({ quality: 90 })
        .toFile(destPath);

      const srcSize  = fs.statSync(srcPath).size;
      const destSize = fs.statSync(destPath).size;
      const saving   = (((srcSize - destSize) / srcSize) * 100).toFixed(0);
      console.log(`  ✅ ${destName}  ${(srcSize/1024).toFixed(0)}KB → ${(destSize/1024).toFixed(0)}KB  (${saving > 0 ? '-' : '+'}${Math.abs(saving)}%)`);

      // Remove o .jpg original
      fs.unlinkSync(srcPath);
      ok++;
    } catch (e) {
      console.error(`  ❌ ${file}: ${e.message}`);
      fail++;
    }
  }

  console.log(`\n📊 ${ok} convertidos, ${fail} falhas\n`);

  // ── Atualiza gifts.ts: troca .jpg por .webp nas imageUrls ────────────────
  if (ok > 0) {
    let content = fs.readFileSync(GIFTS_TS, 'utf8');
    const before = content;
    content = content.replace(/\.jpg"/g, '.webp"');
    if (content !== before) {
      fs.writeFileSync(GIFTS_TS, content, 'utf8');
      const count = (before.match(/\.jpg"/g) || []).length;
      console.log(`✏️  gifts.ts atualizado: ${count} referências .jpg → .webp\n`);
    } else {
      console.log('✏️  gifts.ts: nenhuma referência .jpg encontrada.\n');
    }
  }
}

main().catch(console.error);
