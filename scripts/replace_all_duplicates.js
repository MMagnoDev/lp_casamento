const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

// Specific, high quality, valid Unsplash photos for every single item that had a collision or duplicate
const replacements = [
  // 14: Mergulho (Underwater coral/fish)
  { id: 14, file: 'g14_mergulho_mar.jpg', photoId: '1682687220063-4742bd7fd538' },
  // 24: Frigideira de indução (Frying pan on stove)
  { id: 24, file: 'g24_frigideira_inducao.jpg', photoId: '1590794056226-79ef3a8147e1' },
  // 28: Panela de ferro fundido (Cast iron skillet / casserole)
  { id: 28, file: 'g28_panela_ferro.jpg', photoId: '1556911073-38141963c9e0' },
  // 36: Manta de tricô (Knit cozy throw blanket)
  { id: 36, file: 'g36_manta_trico.jpg', photoId: '1580301762395-21ce84d00bc6' },
  // 48: Sanduicheira e grill (Panini / toasted sandwich)
  { id: 48, file: 'g48_sanduicheira_grill.jpg', photoId: '1528736235302-52922df5c122' },
  // 55: Forno elétrico de bancada (Modern countertop oven / roasting)
  { id: 55, file: 'g55_forno_eletrico.jpg', photoId: '1556911220-e15b29be8c8f' },
  // 57: Batedeira planetária (Stand mixer baking)
  { id: 57, file: 'g57_batedeira_planetaria.jpg', photoId: '1578985545062-69928b1d9587' },
  // 62: Kit canudos e dosadores de bar (Bar tools / jigger)
  { id: 62, file: 'g62_canudos_dosador.jpg', photoId: '1551024709-8f23befc6f87' }, // replaced below with distinct
  { id: 62, file: 'g62_canudos_dosador.jpg', photoId: '1514362545857-3bc16c4c7d1b' },
  // 63: Kit coqueteleira com socador (Real cocktail shaker in action)
  { id: 63, file: 'g63_coqueteleira.jpg', photoId: '1551024506-0bccd828d307' },
  // 66: Copos de cerveja artesanal (Beer pint glasses foam)
  { id: 66, file: 'g66_copos_cerveja.jpg', photoId: '1608270192892-957242861ef0' },
  // 70: Xícaras de café em porcelana fina (Porcelain coffee cups on saucer)
  { id: 70, file: 'g70_xicaras_cafe.jpg', photoId: '1517256064527-09c73fc73e38' },
  // 71: Adega de vinhos (Wine cellar / bottles organized)
  { id: 71, file: 'g71_adega_vinhos.jpg', photoId: '1510812431401-41d2bd2722f3' }, // replaced below with distinct
  { id: 71, file: 'g71_adega_vinhos.jpg', photoId: '1506377247377-2a5b3b417ebb' }, // replaced below with distinct
  { id: 71, file: 'g71_adega_vinhos.jpg', photoId: '1528823872057-9c018a7a75b3' },
  // 73: Cervejeira de bebidas (Beer cooler fridge)
  { id: 73, file: 'g73_cervejeira.jpg', photoId: '1584225064785-c62a8b43d148' },
  // 74: Copos para whisky de cristal (Old fashioned whisky glass on dark wood)
  { id: 74, file: 'g74_copos_whisky.jpg', photoId: '1527061011665-3652c757a4d4' },
  // 80: Mala de viagem grande (Luggage suitcase large)
  { id: 80, file: 'g80_mala_grande.jpg', photoId: '1565026057447-bc90a3dceb87' },
  // 81: Vaso de cerâmica decorativo (Modern clay / ceramic vase)
  { id: 81, file: 'g81_vaso_ceramica.jpg', photoId: '1612196808214-b8e1d6145a8c' },
  // 89: Reforma cantinho do casal (Cozy living room interior nook)
  { id: 89, file: 'g89_reforma_cantinho.jpg', photoId: '1586023492125-27b2c045efd7' },
  // 8: Degustação de vinhos (Sommelier / wine tasting with cheese)
  { id: 8, file: 'g8_degustacao_vinhos.jpg', photoId: '1506377247377-2a5b3b417ebb' },
  // 53: Bebedouro elétrico (Fresh clear water glass/dispenser)
  { id: 53, file: 'g53_bebedouro.jpg', photoId: '1548839140-29a749e1bc4e' },
  // 78: Almofada de pescoço (Travel neck pillow)
  { id: 78, file: 'g78_almofadas_pescoco.jpg', photoId: '1520250497591-112f2f40a3f4' }
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

async function fixDuplicates() {
  console.log('Downloading replacements for all duplicate images...');
  
  for (const item of replacements) {
    const dest = path.join(giftsDir, item.file);
    // Unsplash direct source
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      console.log(`✓ Replaced ${item.file}`);
    } catch (e) {
      console.error(`✗ Error replacing ${item.file}: ${e.message}`);
    }
  }

  // Remove placeholder temporary files like g24_presente.jpg, g55_presente.jpg
  const files = fs.readdirSync(giftsDir);
  for (const f of files) {
    if (f.includes('_presente.jpg')) {
      fs.unlinkSync(path.join(giftsDir, f));
    }
  }

  console.log('Finished updating replacement files.');
}

fixDuplicates();
