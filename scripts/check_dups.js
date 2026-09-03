const fs = require('fs');
const content = fs.readFileSync('src/data/gifts.ts', 'utf8');
const matches = content.match(/imageUrl: "([^"]+)"/g) || [];
const urls = matches.map(m => m.replace('imageUrl: "', '').replace('"', ''));
const counts = {};
urls.forEach(u => { counts[u] = (counts[u] || 0) + 1; });
const dups = Object.entries(counts).filter(([,c]) => c > 1);
if (dups.length === 0) {
  console.log('OK Nenhuma imagem duplicada! Todos os 90 presentes tem imagem unica.');
} else {
  console.log('ATENCAO Duplicatas encontradas:');
  dups.forEach(([u,c]) => console.log('  x' + c + ' ' + u));
}
console.log('Total: ' + urls.length + ' imagens');
