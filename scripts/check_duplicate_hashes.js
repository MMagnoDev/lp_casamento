const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const giftsDir = path.join(__dirname, '..', 'public', 'img', 'gifts');
const files = fs.readdirSync(giftsDir);

const hashes = {};
const duplicates = [];

for (const f of files) {
  if (!f.endsWith('.jpg') && !f.endsWith('.webp')) continue;
  const filePath = path.join(giftsDir, f);
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(data).digest('hex');

  if (hashes[hash]) {
    duplicates.push({ file: f, duplicateOf: hashes[hash] });
  } else {
    hashes[hash] = f;
  }
}

console.log(`Total unique images: ${Object.keys(hashes).length}`);
console.log(`Duplicates count: ${duplicates.length}`);
console.log('Duplicates list:', JSON.stringify(duplicates, null, 2));
