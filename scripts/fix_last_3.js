const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

const final3 = [
  // 61: Abridor de vinho automático
  { file: 'g61_abridor_vinho.jpg', photoId: '1558001373-a393dd44f7c6' },
  // 80: Mala de viagem grande
  { file: 'g80_mala_grande.jpg', photoId: '1581553680321-4fffae59fccd' },
  // 89: Reforma do cantinho
  { file: 'g89_reforma_cantinho.jpg', photoId: '1600210492486-724fe5c67fb0' }
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
  for (const item of final3) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.log(`Error ${item.file}:`, e.message);
    }
  }

  // Check all 90 items
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
  console.log(`\nDuplicate check among all 90 gifts: ${dups.length} duplicates found.`);
}

run();
