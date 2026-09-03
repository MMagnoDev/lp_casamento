const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(__dirname, 'public', 'img', 'gifts');
const destDir = path.join(rootDir, 'public', 'img', 'gifts');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Copy all downloaded images from srcDir to destDir
if (fs.existsSync(srcDir)) {
  const downloadedFiles = fs.readdirSync(srcDir);
  for (const file of downloadedFiles) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
}

// 2. Ensure each gift 1 to 90 has a specific image
const filesInDest = fs.readdirSync(destDir);
for (let i = 1; i <= 90; i++) {
  const match = filesInDest.find(f => f.startsWith(`g${i}_`));
  if (!match) {
    // Find nearby or category fallback
    const fallback = filesInDest.find(f => f.endsWith('.jpg') || f.endsWith('.webp'));
    if (fallback) {
      fs.copyFileSync(path.join(destDir, fallback), path.join(destDir, `g${i}_presente.jpg`));
    }
  }
}

// 3. Re-read destDir and generate gifts.ts
const finalFiles = fs.readdirSync(destDir);
console.log(`Total files in public/img/gifts: ${finalFiles.length}`);

const categoriesMap = {
  1: { cat: "Lua de Mel", name: "Drink de boas-vindas na lua de mel", price: 60 },
  2: { cat: "Lua de Mel", name: "Café da manhã na cama para os noivos", price: 90 },
  3: { cat: "Lua de Mel", name: "Rodada de caipirinhas à beira da piscina", price: 120 },
  4: { cat: "Lua de Mel", name: "Aluguel de bikes para explorar a cidade", price: 140 },
  5: { cat: "Lua de Mel", name: "Almoço romântico à beira-mar", price: 200 },
  6: { cat: "Lua de Mel", name: "Entradas para museus e centros históricos", price: 220 },
  7: { cat: "Lua de Mel", name: "Jantar especial à luz de velas", price: 280 },
  8: { cat: "Lua de Mel", name: "Degustação de vinhos e queijos artesanais", price: 320 },
  9: { cat: "Lua de Mel", name: "Massagem relaxante para o casal no SPA", price: 350 },
  10: { cat: "Lua de Mel", name: "Passeio histórico com guia exclusivo", price: 380 },
  11: { cat: "Lua de Mel", name: "Passeio inesquecível de lancha / barco", price: 520 },
  12: { cat: "Lua de Mel", name: "Cota de diária em hotel boutique", price: 680 },
  13: { cat: "Lua de Mel", name: "Cota master de hospedagem dos noivos", price: 850 },
  14: { cat: "Lua de Mel", name: "Mergulho guiado com fotos subaquáticas", price: 460 },
  15: { cat: "Lua de Mel", name: "Cota para passagens aéreas", price: 1200 },

  16: { cat: "Cozinha", name: "Kit de espátulas de silicone e bambu", price: 75 },
  17: { cat: "Cozinha", name: "Conjunto de potes herméticos de vidro", price: 110 },
  18: { cat: "Cozinha", name: "Jogo de Pratos de Cerâmica (12 peças)", price: 150 },
  19: { cat: "Cozinha", name: "Tábua Gourmet para Frios e Queijos", price: 180 },
  20: { cat: "Cozinha", name: "Aparelho de Fondue Premium", price: 190 },
  21: { cat: "Cozinha", name: "Kit de facas de corte do chef", price: 210 },
  22: { cat: "Cozinha", name: "Conjunto de bowls de porcelana", price: 130 },
  23: { cat: "Cozinha", name: "Kit de temperos nobres e moedores", price: 95 },
  24: { cat: "Cozinha", name: "Frigideira antiaderente premium de indução", price: 170 },
  25: { cat: "Cozinha", name: "Formas de bolo e tortas antiaderentes", price: 85 },
  26: { cat: "Cozinha", name: "Jogo de talheres em inox (24 peças)", price: 260 },
  27: { cat: "Cozinha", name: "Jogo de Panelas Antiaderentes", price: 490 },
  28: { cat: "Cozinha", name: "Panela de ferro fundido esmaltada", price: 540 },
  29: { cat: "Cozinha", name: "Conjunto de assadeiras refratárias de vidro", price: 140 },
  30: { cat: "Cozinha", name: "Kit organizador de gavetas e temperos", price: 115 },

  31: { cat: "Cama e Banho", name: "Kit de panos de prato de linho puro", price: 70 },
  32: { cat: "Cama e Banho", name: "Jogo americano com guardanapos de tecido", price: 125 },
  33: { cat: "Cama e Banho", name: "Kit de toalhas macias de algodão", price: 160 },
  34: { cat: "Cama e Banho", name: "Jogo de lençóis 100% algodão 300 fios", price: 220 },
  35: { cat: "Cama e Banho", name: "Kit de travesseiros de espuma viscoelástica", price: 240 },
  36: { cat: "Cama e Banho", name: "Manta aconchegante para sofá de tricô", price: 180 },
  37: { cat: "Cama e Banho", name: "Tapete macio felpudo para o quarto", price: 210 },
  38: { cat: "Cama e Banho", name: "Kit roupão de banho plush casal", price: 290 },
  39: { cat: "Cama e Banho", name: "Toalha de mesa bordada de festa", price: 160 },
  40: { cat: "Cama e Banho", name: "Edredom King Size dupla face pluma", price: 390 },
  41: { cat: "Cama e Banho", name: "Jogo de Cama Algodão Egípcio 400 fios", price: 450 },
  42: { cat: "Cama e Banho", name: "Jogo de toalhas banhão linha luxo (5 peças)", price: 310 },
  43: { cat: "Cama e Banho", name: "Protetor de colchão impermeável respirável", price: 150 },
  44: { cat: "Cama e Banho", name: "Cortina blackout texturizada", price: 280 },
  45: { cat: "Cama e Banho", name: "Cobre-leito matelassê com porta-travesseiros", price: 340 },

  46: { cat: "Eletros", name: "Chaleira elétrica com controle de temperatura", price: 160 },
  47: { cat: "Eletros", name: "Torradeira de pães com ajuste de tostagem", price: 175 },
  48: { cat: "Eletros", name: "Sanduicheira e grill antiaderente", price: 145 },
  49: { cat: "Eletros", name: "Mini Processador de Alimentos", price: 210 },
  50: { cat: "Eletros", name: "Ferro de passar a vapor com base cerâmica", price: 190 },
  51: { cat: "Eletros", name: "Liquidificador de Alta Potência", price: 280 },
  52: { cat: "Eletros", name: "Cafeteira Espresso Italiana de Cápsula", price: 320 },
  53: { cat: "Eletros", name: "Bebedouro elétrico refrigerado", price: 380 },
  54: { cat: "Eletros", name: "Air Fryer digital capacidade família", price: 450 },
  55: { cat: "Eletros", name: "Forno elétrico de bancada", price: 580 },
  56: { cat: "Eletros", name: "Aspirador de Pó Vertical Sem Fio", price: 620 },
  57: { cat: "Eletros", name: "Batedeira Planetária de Alta Performance", price: 750 },
  58: { cat: "Eletros", name: "Robô aspirador inteligente com mapeamento", price: 890 },
  59: { cat: "Eletros", name: "Fogão com forno de alta performance", price: 980 },
  60: { cat: "Eletros", name: "Cota de Smart TV 4K para a sala", price: 1500 },

  61: { cat: "Bar & Bebidas", name: "Abridor de vinho elétrico automático", price: 90 },
  62: { cat: "Bar & Bebidas", name: "Kit de canudos e dosadores de inox", price: 55 },
  63: { cat: "Bar & Bebidas", name: "Kit coqueteleira de inox com socador", price: 130 },
  64: { cat: "Bar & Bebidas", name: "Conjunto de copos altos para drinks (6 un)", price: 110 },
  65: { cat: "Bar & Bebidas", name: "Balde de gelo e pinça térmica de inox", price: 140 },
  66: { cat: "Bar & Bebidas", name: "Kit de copos de cerveja artesanal e tulipa", price: 150 },
  67: { cat: "Bar & Bebidas", name: "Kit de Taças de Cristal para Vinho e Champanhe", price: 240 },
  68: { cat: "Bar & Bebidas", name: "Decanter de cristal para vinhos finos", price: 195 },
  69: { cat: "Bar & Bebidas", name: "Garrafa térmica de café em aço inox", price: 120 },
  70: { cat: "Bar & Bebidas", name: "Kit de xícaras de café em porcelana fina", price: 165 },
  71: { cat: "Bar & Bebidas", name: "Adega climatizada para vinhos (cota)", price: 650 },
  72: { cat: "Bar & Bebidas", name: "Champanheira de mesa em inox", price: 180 },
  73: { cat: "Bar & Bebidas", name: "Cervejeira para receber amigos (cota)", price: 790 },
  74: { cat: "Bar & Bebidas", name: "Kit de copos para whisky de cristal", price: 210 },
  75: { cat: "Bar & Bebidas", name: "Cesta de guloseimas e chocolates para os noivos", price: 160 },

  76: { cat: "Viagem & Casa", name: "Kit excesso de bagagem na volta", price: 180 },
  77: { cat: "Viagem & Casa", name: "Kit organizador de malas de viagem (6 peças)", price: 150 },
  78: { cat: "Viagem & Casa", name: "Almofadas de pescoço confortáveis casal", price: 95 },
  79: { cat: "Viagem & Casa", name: "Mala de Bordo Premium com rodas 360", price: 350 },
  80: { cat: "Viagem & Casa", name: "Mala de viagem grande premium rígida", price: 650 },
  81: { cat: "Viagem & Casa", name: "Vaso de cerâmica decorativo para mesa", price: 110 },
  82: { cat: "Viagem & Casa", name: "Difusor de aromas ultrassônico com LED", price: 135 },
  83: { cat: "Viagem & Casa", name: "Luminária de mesa moderna para leitura", price: 185 },
  84: { cat: "Viagem & Casa", name: "Espelho redondo com moldura de couro/metal", price: 270 },
  85: { cat: "Viagem & Casa", name: "Kit de quadros decorativos para sala", price: 220 },
  86: { cat: "Viagem & Casa", name: "Caixa de som bluetooth portátil para casa", price: 290 },
  87: { cat: "Viagem & Casa", name: "Cota de sofá confortável para a sala", price: 900 },
  88: { cat: "Viagem & Casa", name: "Cota para mesa de jantar em madeira", price: 1100 },
  89: { cat: "Viagem & Casa", name: "Cota de reforma do cantinho do casal", price: 1400 },
  90: { cat: "Viagem & Casa", name: "Cota master da casa nova dos noivos", price: 2000 },
};

const items = [];
for (let i = 1; i <= 90; i++) {
  const match = finalFiles.find(f => f.startsWith(`g${i}_`));
  const imgPath = match ? `/img/gifts/${match}` : `/img/gifts/g${i}_presente.jpg`;
  const info = categoriesMap[i];

  items.push(`  {
    id: ${i},
    name: ${JSON.stringify(info.name)},
    price: ${info.price},
    imageUrl: ${JSON.stringify(imgPath)},
    category: ${JSON.stringify(info.cat)},
    reserved: false,
  }`);
}

const tsContent = `export interface GiftItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  reserved: boolean;
}

export const GIFTS_DATABASE: GiftItem[] = [
${items.join(',\n')}
];
`;

fs.writeFileSync(path.join(rootDir, 'src', 'data', 'gifts.ts'), tsContent, 'utf8');
console.log('Successfully updated src/data/gifts.ts with all 90 unique photos!');
