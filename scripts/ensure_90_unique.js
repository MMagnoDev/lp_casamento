const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

const missingOrDup = [
  // 53: Bebedouro elétrico (Glass of cool water with ice)
  { file: 'g53_bebedouro.jpg', photoId: '1556881286-fc6915169721' },
  // 63: Kit coqueteleira de inox (Cocktail shaker on bar)
  { file: 'g63_coqueteleira.jpg', photoId: '1551538827-9c037cb4f32a' },
  // 61: Abridor de vinho
  { file: 'g61_abridor_vinho.jpg', photoId: '1586370434639-0fe43b2d32e6' }
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
  for (const item of missingOrDup) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.log(`Error ${item.file}:`, e.message);
    }
  }

  // Rescan all 90
  const files = fs.readdirSync(giftsDir);
  const hashes = {};
  const dups = [];
  const missing = [];
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
    } else {
      missing.push(i);
    }
  }
  console.log(`\n================ RESULT ================`);
  console.log(`Total Unique Items: ${Object.keys(hashes).length}/90`);
  console.log(`Duplicates: ${dups.length}`);
  console.log(`Missing: ${missing.length}`);
  if (dups.length > 0) console.log('Duplicates:', dups);
  if (missing.length > 0) console.log('Missing IDs:', missing);
  console.log(`========================================`);
}

run();
