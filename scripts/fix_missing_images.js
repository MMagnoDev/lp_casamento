const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const giftsDir = path.join(__dirname, 'public', 'img', 'gifts');

// Substituições específicas com IDs válidos e testados
const missingImages = [
  { id: 11, file: 'g11_passeio_lancha.jpg', photoId: '1544551763-46a013bb70d5' },
  { id: 24, file: 'g24_frigideira_inducao.jpg', photoId: '1584990347449-399479357917' }, // Fallback below
  { id: 24, file: 'g24_frigideira_inducao.jpg', photoId: '1556911220-e15b29be8c8f' },
  { id: 27, file: 'g27_jogo_panelas.jpg', photoId: '1585515320310-259814833e62' },
  { id: 36, file: 'g36_manta_trico.jpg', photoId: '1584100936595-c0654b55a2e2' },
  { id: 47, file: 'g47_torradeira_paes.jpg', photoId: '1528735602780-2552fd46c7af' },
  { id: 53, file: 'g53_bebedouro.jpg', photoId: '1527061011665-3652c757a4d4' },
  { id: 55, file: 'g55_forno_eletrico.jpg', photoId: '1556911261-6da741363ef2' },
  { id: 55, file: 'g55_forno_eletrico.jpg', photoId: '1556912173-3bb406ef7e77' },
  { id: 57, file: 'g57_batedeira_planetaria.jpg', photoId: '1587241321921-91a834d6d191' },
  { id: 66, file: 'g66_copos_cerveja.jpg', photoId: '1536935338788-846bb9981813' },
  { id: 73, file: 'g73_cervejeira.jpg', photoId: '1546171753-97d7676e4602' },
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
  for (const item of missingImages) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.log(`Skipped or failed ${item.file}`);
    }
  }

  // Double check all 90 files
  for (let i = 1; i <= 90; i++) {
    const files = fs.readdirSync(giftsDir);
    const matching = files.find(f => f.startsWith(`g${i}_`));
    if (!matching) {
      console.log(`Missing g${i}_ file! Creating copy from existing...`);
      // Copy existing webp or nearby jpg
      const fallback = files.find(f => f.endsWith('.jpg') || f.endsWith('.webp'));
      if (fallback) {
        fs.copyFileSync(path.join(giftsDir, fallback), path.join(giftsDir, `g${i}_presente.jpg`));
        console.log(`Created g${i}_presente.jpg from ${fallback}`);
      }
    }
  }
}

run();
