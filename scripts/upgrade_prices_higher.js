const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const giftsTsPath = path.join(rootDir, 'src', 'data', 'gifts.ts');
const destDir = path.join(rootDir, 'public', 'img', 'gifts');
const filesInDest = fs.readdirSync(destDir);

// Distribuição premium de preços para os 90 presentes:
// Faixa inicial: R$ 380 - R$ 550 (itens de entrada / lembranças)
// Faixa média: R$ 580 - R$ 980 (eletros médios, enxoval luxo, jantares e passeios)
// Faixa nobre / cotas: R$ 1.100 - R$ 3.500 (grandes eletros, hospedagem, móveis e cotas master)

const premiumPrices = {
  // Lua de Mel & Experiências (1 - 15)
  1: 380,   // Drink de boas-vindas na lua de mel
  2: 420,   // Café da manhã na cama para os noivos
  3: 450,   // Rodada de caipirinhas à beira da piscina
  4: 490,   // Aluguel de bikes para explorar a cidade
  5: 580,   // Almoço romântico à beira-mar
  6: 620,   // Entradas para museus e centros históricos
  7: 750,   // Jantar especial à luz de velas
  8: 820,   // Degustação de vinhos e queijos artesanais
  9: 950,   // Massagem relaxante para o casal no SPA
  10: 1100, // Passeio histórico com guia exclusivo
  11: 1350, // Passeio inesquecível de lancha / barco
  12: 1600, // Cota de diária em hotel boutique
  13: 2200, // Cota master de hospedagem dos noivos
  14: 1250, // Mergulho guiado com fotos subaquáticas
  15: 2800, // Cota para passagens aéreas

  // Cozinha & Gourmet (16 - 30)
  16: 380,  // Kit de espátulas de silicone e bambu
  17: 420,  // Conjunto de potes herméticos de vidro
  18: 520,  // Jogo de Pratos de Cerâmica (12 peças)
  19: 490,  // Tábua Gourmet para Frios e Queijos
  20: 580,  // Aparelho de Fondue Premium
  21: 650,  // Kit de facas de corte do chef
  22: 450,  // Conjunto de bowls de porcelana
  23: 390,  // Kit de temperos nobres e moedores
  24: 550,  // Frigideira antiaderente premium de indução
  25: 420,  // Formas de bolo e tortas antiaderentes
  26: 780,  // Jogo de talheres em inox (24 peças)
  27: 1150, // Jogo de Panelas Antiaderentes
  28: 1350, // Panela de ferro fundido esmaltada
  29: 480,  // Conjunto de assadeiras refratárias de vidro
  30: 440,  // Kit organizador de gavetas e temperos

  // Cama, Mesa & Banho (31 - 45)
  31: 380,  // Kit de panos de prato de linho puro
  32: 460,  // Jogo americano com guardanapos de tecido
  33: 520,  // Kit de toalhas macias de algodão
  34: 680,  // Jogo de lençóis 100% algodão 300 fios
  35: 620,  // Kit de travesseiros de espuma viscoelástica
  36: 550,  // Manta aconchegante para sofá de tricô
  37: 590,  // Tapete macio felpudo para o quarto
  38: 720,  // Kit roupão de banho plush casal
  39: 510,  // Toalha de mesa bordada de festa
  40: 950,  // Edredom King Size dupla face pluma
  41: 1200, // Jogo de Cama Algodão Egípcio 400 fios
  42: 850,  // Jogo de toalhas banhão linha luxo (5 peças)
  43: 480,  // Protetor de colchão impermeável respirável
  44: 750,  // Cortina blackout texturizada
  45: 890,  // Cobre-leito matelassê com porta-travesseiros

  // Eletros & Tecnologia (46 - 60)
  46: 450,  // Chaleira elétrica com controle de temperatura
  47: 480,  // Torradeira de pães com ajuste de tostagem
  48: 420,  // Sanduicheira e grill antiaderente
  49: 560,  // Mini Processador de Alimentos
  50: 520,  // Ferro de passar a vapor com base cerâmica
  51: 680,  // Liquidificador de Alta Potência
  52: 850,  // Cafeteira Espresso Italiana de Cápsula
  53: 920,  // Bebedouro elétrico refrigerado
  54: 1100, // Air Fryer digital capacidade família
  55: 1250, // Forno elétrico de bancada
  56: 1450, // Aspirador de Pó Vertical Sem Fio
  57: 1650, // Batedeira Planetária de Alta Performance
  58: 1950, // Robô aspirador inteligente com mapeamento
  59: 2400, // Fogão com forno de alta performance
  60: 3200, // Cota de Smart TV 4K para a sala

  // Bar, Brindes & Momentos (61 - 75)
  61: 390,  // Abridor de vinho elétrico automático
  62: 380,  // Kit de canudos e dosadores de inox
  63: 490,  // Kit coqueteleira de inox com socador
  64: 460,  // Conjunto de copos altos para drinks (6 un)
  65: 520,  // Balde de gelo e pinça térmica de inox
  66: 540,  // Kit de copos de cerveja artesanal e tulipa
  67: 680,  // Kit de Taças de Cristal para Vinho e Champanhe
  68: 590,  // Decanter de cristal para vinhos finos
  69: 470,  // Garrafa térmica de café em aço inox
  70: 560,  // Kit de xícaras de café em porcelana fina
  71: 1450, // Adega climatizada para vinhos (cota)
  72: 580,  // Champanheira de mesa em inox
  73: 1750, // Cervejeira para receber amigos (cota)
  74: 620,  // Kit de copos para whisky de cristal
  75: 530,  // Cesta de guloseimas e chocolates para os noivos

  // Viagem, Casa & Decor (76 - 90)
  76: 480,  // Kit excesso de bagagem na volta
  77: 450,  // Kit organizador de malas de viagem (6 peças)
  78: 390,  // Almofadas de pescoço confortáveis casal
  79: 890,  // Mala de Bordo Premium com rodas 360
  80: 1350, // Mala de viagem grande premium rígida
  81: 440,  // Vaso de cerâmica decorativo para mesa
  82: 470,  // Difusor de aromas ultrassônico com LED
  83: 560,  // Luminária de mesa moderna para leitura
  84: 750,  // Espelho redondo com moldura de couro/metal
  85: 640,  // Kit de quadros decorativos para sala
  86: 780,  // Caixa de som bluetooth portátil para casa
  87: 1850, // Cota de sofá confortável para a sala
  88: 2300, // Cota para mesa de jantar em madeira
  89: 2700, // Cota de reforma do cantinho do casal
  90: 3500, // Cota master da casa nova dos noivos
};

const categoriesMap = {
  1: { cat: "Lua de Mel", name: "Drink de boas-vindas na lua de mel" },
  2: { cat: "Lua de Mel", name: "Café da manhã na cama para os noivos" },
  3: { cat: "Lua de Mel", name: "Rodada de caipirinhas à beira da piscina" },
  4: { cat: "Lua de Mel", name: "Aluguel de bikes para explorar a cidade" },
  5: { cat: "Lua de Mel", name: "Almoço romântico à beira-mar" },
  6: { cat: "Lua de Mel", name: "Entradas para museus e centros históricos" },
  7: { cat: "Lua de Mel", name: "Jantar especial à luz de velas" },
  8: { cat: "Lua de Mel", name: "Degustação de vinhos e queijos artesanais" },
  9: { cat: "Lua de Mel", name: "Massagem relaxante para o casal no SPA" },
  10: { cat: "Lua de Mel", name: "Passeio histórico com guia exclusivo" },
  11: { cat: "Lua de Mel", name: "Passeio inesquecível de lancha / barco" },
  12: { cat: "Lua de Mel", name: "Cota de diária em hotel boutique" },
  13: { cat: "Lua de Mel", name: "Cota master de hospedagem dos noivos" },
  14: { cat: "Lua de Mel", name: "Mergulho guiado com fotos subaquáticas" },
  15: { cat: "Lua de Mel", name: "Cota para passagens aéreas" },

  16: { cat: "Cozinha", name: "Kit de espátulas de silicone e bambu" },
  17: { cat: "Cozinha", name: "Conjunto de potes herméticos de vidro" },
  18: { cat: "Cozinha", name: "Jogo de Pratos de Cerâmica (12 peças)" },
  19: { cat: "Cozinha", name: "Tábua Gourmet para Frios e Queijos" },
  20: { cat: "Cozinha", name: "Aparelho de Fondue Premium" },
  21: { cat: "Cozinha", name: "Kit de facas de corte do chef" },
  22: { cat: "Cozinha", name: "Conjunto de bowls de porcelana" },
  23: { cat: "Cozinha", name: "Kit de temperos nobres e moedores" },
  24: { cat: "Cozinha", name: "Frigideira antiaderente premium de indução" },
  25: { cat: "Cozinha", name: "Formas de bolo e tortas antiaderentes" },
  26: { cat: "Cozinha", name: "Jogo de talheres em inox (24 peças)" },
  27: { cat: "Cozinha", name: "Jogo de Panelas Antiaderentes" },
  28: { cat: "Cozinha", name: "Panela de ferro fundido esmaltada" },
  29: { cat: "Cozinha", name: "Conjunto de assadeiras refratárias de vidro" },
  30: { cat: "Cozinha", name: "Kit organizador de gavetas e temperos" },

  31: { cat: "Cama e Banho", name: "Kit de panos de prato de linho puro" },
  32: { cat: "Cama e Banho", name: "Jogo americano com guardanapos de tecido" },
  33: { cat: "Cama e Banho", name: "Kit de toalhas macias de algodão" },
  34: { cat: "Cama e Banho", name: "Jogo de lençóis 100% algodão 300 fios" },
  35: { cat: "Cama e Banho", name: "Kit de travesseiros de espuma viscoelástica" },
  36: { cat: "Cama e Banho", name: "Manta aconchegante para sofá de tricô" },
  37: { cat: "Cama e Banho", name: "Tapete macio felpudo para o quarto" },
  38: { cat: "Cama e Banho", name: "Kit roupão de banho plush casal" },
  39: { cat: "Cama e Banho", name: "Toalha de mesa bordada de festa" },
  40: { cat: "Cama e Banho", name: "Edredom King Size dupla face pluma" },
  41: { cat: "Cama e Banho", name: "Jogo de Cama Algodão Egípcio 400 fios" },
  42: { cat: "Cama e Banho", name: "Jogo de toalhas banhão linha luxo (5 peças)" },
  43: { cat: "Cama e Banho", name: "Protetor de colchão impermeável respirável" },
  44: { cat: "Cama e Banho", name: "Cortina blackout texturizada" },
  45: { cat: "Cama e Banho", name: "Cobre-leito matelassê com porta-travesseiros" },

  46: { cat: "Eletros", name: "Chaleira elétrica com controle de temperatura" },
  47: { cat: "Eletros", name: "Torradeira de pães com ajuste de tostagem" },
  48: { cat: "Eletros", name: "Sanduicheira e grill antiaderente" },
  49: { cat: "Eletros", name: "Mini Processador de Alimentos" },
  50: { cat: "Eletros", name: "Ferro de passar a vapor com base cerâmica" },
  51: { cat: "Eletros", name: "Liquidificador de Alta Potência" },
  52: { cat: "Eletros", name: "Cafeteira Espresso Italiana de Cápsula" },
  53: { cat: "Eletros", name: "Bebedouro elétrico refrigerado" },
  54: { cat: "Eletros", name: "Air Fryer digital capacidade família" },
  55: { cat: "Eletros", name: "Forno elétrico de bancada" },
  56: { cat: "Eletros", name: "Aspirador de Pó Vertical Sem Fio" },
  57: { cat: "Eletros", name: "Batedeira Planetária de Alta Performance" },
  58: { cat: "Eletros", name: "Robô aspirador inteligente com mapeamento" },
  59: { cat: "Eletros", name: "Fogão com forno de alta performance" },
  60: { cat: "Eletros", name: "Cota de Smart TV 4K para a sala" },

  61: { cat: "Bar & Bebidas", name: "Abridor de vinho elétrico automático" },
  62: { cat: "Bar & Bebidas", name: "Kit de canudos e dosadores de inox" },
  63: { cat: "Bar & Bebidas", name: "Kit coqueteleira de inox com socador" },
  64: { cat: "Bar & Bebidas", name: "Conjunto de copos altos para drinks (6 un)" },
  65: { cat: "Bar & Bebidas", name: "Balde de gelo e pinça térmica de inox" },
  66: { cat: "Bar & Bebidas", name: "Kit de copos de cerveja artesanal e tulipa" },
  67: { cat: "Bar & Bebidas", name: "Kit de Taças de Cristal para Vinho e Champanhe" },
  68: { cat: "Bar & Bebidas", name: "Decanter de cristal para vinhos finos" },
  69: { cat: "Bar & Bebidas", name: "Garrafa térmica de café em aço inox" },
  70: { cat: "Bar & Bebidas", name: "Kit de xícaras de café em porcelana fina" },
  71: { cat: "Bar & Bebidas", name: "Adega climatizada para vinhos (cota)" },
  72: { cat: "Bar & Bebidas", name: "Champanheira de mesa em inox" },
  73: { cat: "Bar & Bebidas", name: "Cervejeira para receber amigos (cota)" },
  74: { cat: "Bar & Bebidas", name: "Kit de copos para whisky de cristal" },
  75: { cat: "Bar & Bebidas", name: "Cesta de guloseimas e chocolates para os noivos" },

  76: { cat: "Viagem & Casa", name: "Kit excesso de bagagem na volta" },
  77: { cat: "Viagem & Casa", name: "Kit organizador de malas de viagem (6 peças)" },
  78: { cat: "Viagem & Casa", name: "Almofadas de pescoço confortáveis casal" },
  79: { cat: "Viagem & Casa", name: "Mala de Bordo Premium com rodas 360" },
  80: { cat: "Viagem & Casa", name: "Mala de viagem grande premium rígida" },
  81: { cat: "Viagem & Casa", name: "Vaso de cerâmica decorativo para mesa" },
  82: { cat: "Viagem & Casa", name: "Difusor de aromas ultrassônico com LED" },
  83: { cat: "Viagem & Casa", name: "Luminária de mesa moderna para leitura" },
  84: { cat: "Viagem & Casa", name: "Espelho redondo com moldura de couro/metal" },
  85: { cat: "Viagem & Casa", name: "Kit de quadros decorativos para sala" },
  86: { cat: "Viagem & Casa", name: "Caixa de som bluetooth portátil para casa" },
  87: { cat: "Viagem & Casa", name: "Cota de sofá confortável para a sala" },
  88: { cat: "Viagem & Casa", name: "Cota para mesa de jantar em madeira" },
  89: { cat: "Viagem & Casa", name: "Cota de reforma do cantinho do casal" },
  90: { cat: "Viagem & Casa", name: "Cota master da casa nova dos noivos" },
};

const items = [];
for (let i = 1; i <= 90; i++) {
  const match = filesInDest.find(f => f.startsWith(`g${i}_`));
  const imgPath = match ? `/img/gifts/${match}` : `/img/gifts/drink.webp`;
  const info = categoriesMap[i];
  const price = premiumPrices[i];

  items.push(`  {
    id: ${i},
    name: ${JSON.stringify(info.name)},
    price: ${price},
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

fs.writeFileSync(giftsTsPath, tsContent, 'utf8');
console.log('Successfully upgraded prices for all 90 gifts!');
