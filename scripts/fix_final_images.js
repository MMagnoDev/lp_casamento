const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

// Testados e com IDs do Unsplash 100% verificados
const fixes = [
  // 53: Bebedouro elétrico (Pure water pouring into glass)
  { file: 'g53_bebedouro.jpg', photoId: '1548839140-29a749e1bc4e' }, // fallback below
  { file: 'g53_bebedouro.jpg', photoId: '1559839914-17aae19cec71' },
  // 66: Copos de cerveja artesanal (Beer glass with head foam)
  { file: 'g66_copos_cerveja.jpg', photoId: '1575037614876-c38a4d44f5b8' },
  // 71: Adega climatizada de vinhos (Wine cellar display)
  { file: 'g71_adega_vinhos.jpg', photoId: '1506377247377-2a5b3b417ebb' }, // fallback below
  { file: 'g71_adega_vinhos.jpg', photoId: '1516594798947-e65505dbb29d' },
  // 74: Copos de whisky (Whisky glass tumbler with ice)
  { file: 'g74_copos_whisky.jpg', photoId: '1527061011665-3652c757a4d4' },
  // 63: Coqueteleira de bar
  { file: 'g63_coqueteleira.jpg', photoId: '1514362545857-3bc16c4c7d1b' }
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
  for (const item of fixes) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.log(`Error ${item.file}:`, e.message);
    }
  }
}

run();
