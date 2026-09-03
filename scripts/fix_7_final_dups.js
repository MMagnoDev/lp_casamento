const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

const final7Replacements = [
  // 29: Assadeiras de vidro (Glass baking dish with pasta/roast)
  { file: 'g29_assadeiras_vidro.jpg', photoId: '1546069901-ba9599a7e63c' },
  // 55: Forno elétrico de bancada (Kitchen oven baking)
  { file: 'g55_forno_eletrico.jpg', photoId: '1540420773420-3366772f4999' },
  // 63: Coqueteleira de bar (Cocktail shaker mixing)
  { file: 'g63_coqueteleira.jpg', photoId: '1574056067227-e45a1130f4e1' },
  // 70: Xícaras de café em porcelana (Coffee cup on wooden table with latte art)
  { file: 'g70_xicaras_cafe.jpg', photoId: '1509042239860-f550ce710b93' },
  // 80: Mala de viagem grande (Luggage stack travel airport)
  { file: 'g80_mala_grande.jpg', photoId: '1553062407-98eeb64c6a62' },
  // 89: Reforma do cantinho do casal (Home renovation / painting / interior cozy plants)
  { file: 'g89_reforma_cantinho.jpg', photoId: '1513694203232-719a280e022f' },
  // 8: Degustação de vinhos (Wine glass swirling red wine)
  { file: 'g8_degustacao_vinhos.jpg', photoId: '1510812431401-41d2bd2722f3' }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    });

    request.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    request.setTimeout(15000, () => {
      request.destroy();
      fs.unlink(destPath, () => {});
      reject(new Error('Download timeout'));
    });
  });
}

async function run() {
  for (const item of final7Replacements) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.log(`Error ${item.file}:`, e.message);
    }
  }

  // Verify hash
  const files = fs.readdirSync(giftsDir);
  const hashes = {};
  const dups = [];
  for (let i = 1; i <= 90; i++) {
    const f = files.find(name => name.startsWith(`g${i}_`));
    if (f) {
      const data = fs.readFileSync(path.join(giftsDir, f));
      const hash = crypto.createHash('md5').update(data).digest('hex');
      if (hashes[hash]) {
        dups.push({ id: i, file: f, dupOf: hashes[hash] });
      } else {
        hashes[hash] = f;
      }
    }
  }
  console.log(`\nDuplicate check among the 90 gifts: ${dups.length} duplicates found.`);
  if (dups.length > 0) {
    console.log(JSON.stringify(dups, null, 2));
  }
}

run();
