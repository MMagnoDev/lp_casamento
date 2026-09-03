/**
 * adjust_prices.js
 * - Coloca alguns presentes menores na faixa R$200~300
 * - Baixa os que estão acima de R$1500
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/gifts.ts');
let content = fs.readFileSync(FILE, 'utf8');

// Mapa de ajustes: id do presente → novo preço
const ADJUSTMENTS = {
  // ── Novos na faixa R$200–300 (itens pequenos/acessórios) ──
  16: 250,   // Kit espátulas e utensílios
  23: 240,   // Kit temperos e moedores
  30: 270,   // Organizador de gavetas
  32: 220,   // Jogo americano
  62: 210,   // Kit canudos e dosadores
  31: 230,   // Panos de prato de linho

  // ── Acima de R$1500 → reduzidos ──────────────────────────
  13: 1400,  // Cota master hospedagem (era 2200)
  15: 1800,  // Cota passagens aéreas (era 2800)
  57: 1300,  // Batedeira planetária (era 1650)
  58: 1450,  // Robô aspirador (era 1950)
  59: 1600,  // Fogão alta performance (era 2400)
  60: 2000,  // Smart TV 4K (era 3200)
  71: 1200,  // Adega climatizada (era 1450)
  73: 1350,  // Cervejeira (era 1750)
  87: 1400,  // Sofá sala (era 1850)
  88: 1650,  // Mesa de jantar (era 2300)
  89: 1900,  // Reforma cantinho (era 2700)
  90: 2500,  // Casa nova dos noivos (era 3500)
};

let changes = 0;
for (const [idStr, newPrice] of Object.entries(ADJUSTMENTS)) {
  const id = parseInt(idStr);
  // Regex: localiza o bloco do id e substitui o price
  const regex = new RegExp(
    `(id: ${id},\\s*\\n\\s*name: "[^"]+",\\s*\\n\\s*price: )\\d+(,)`,
    'g'
  );
  const updated = content.replace(regex, `$1${newPrice}$2`);
  if (updated !== content) {
    console.log(`  ✅ id ${id}: R$ ${newPrice}`);
    content = updated;
    changes++;
  } else {
    console.log(`  ⚠️  id ${id}: não encontrado`);
  }
}

fs.writeFileSync(FILE, content, 'utf8');
console.log(`\n📊 ${changes} preços ajustados.\n`);
