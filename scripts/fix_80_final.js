const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

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
  const dest = path.join(giftsDir, 'g80_mala_grande.jpg');
  // Different suitcase image (traveler walking with large trolley bag)
  const unsplashUrl = `https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&h=400&q=80`;
  await downloadImage(unsplashUrl, dest);

  // Final verification
  const files = fs.readdirSync(giftsDir);
  const hashes = {};
  const dups = [];
  for (let i = 1; i <= 90; i++) {
    const f = files.find(name => name.startsWith(`g${i}_`));
    const data = fs.readFileSync(path.join(giftsDir, f));
    const hash = crypto.createHash('md5').update(data).digest('hex');
    if (hashes[hash]) {
      dups.push({ id: i, file: f, dupOf: hashes[hash] });
    } else {
      hashes[hash] = f;
    }
  }

  console.log(`\n================ FINAL CHECK ================`);
  console.log(`Total Unique Items: ${Object.keys(hashes).length}/90`);
  console.log(`Duplicates: ${dups.length}`);
  console.log(`=============================================`);
}

run();
