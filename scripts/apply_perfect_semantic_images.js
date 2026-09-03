const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const giftsDir = path.join(rootDir, 'public', 'img', 'gifts');

// Mapeamento semântico 100% preciso para cada item (pesquisado com IDs do Unsplash de alta relevância visual)
const perfectMapping = [
  // LUA DE MEL
  { id: 1, file: 'g1_drink_welcome.jpg', photoId: '1551024709-8f23befc6f87', desc: 'Drink tropical de boas-vindas' },
  { id: 2, file: 'g2_cafe_cama.jpg', photoId: '1533089860892-a7c6f0a88666', desc: 'Café da manhã na cama bandeja' },
  { id: 3, file: 'g3_caipirinhas_piscina.jpg', photoId: '1513558161293-cdaf765ed2fd', desc: 'Caipirinha / drink refrescante piscina' },
  { id: 4, file: 'g4_bikes_passeio.jpg', photoId: '1485965120184-e220f721d03e', desc: 'Duas bicicletas para passeio' },
  { id: 5, file: 'g5_almoco_praia.jpg', photoId: '1507525428034-b723cf961d3e', desc: 'Mesa de almoço na praia / beira-mar' },
  { id: 6, file: 'g6_entradas_museu.jpg', photoId: '1565008447742-97f6f38c985c', desc: 'Museu / galeria de arte' },
  { id: 7, file: 'g7_jantar_velas.jpg', photoId: '1517248135467-4c7edcad34c4', desc: 'Jantar romântico à luz de velas' },
  { id: 8, file: 'g8_degustacao_vinhos.jpg', photoId: '1510812431401-41d2bd2722f3', desc: 'Taça de vinho e tábua de queijos' },
  { id: 9, file: 'g9_massagem_spa.jpg', photoId: '1540555700478-4be289fbecef', desc: 'Sala de massagem spa com toalhas e óleos' },
  { id: 10, file: 'g10_guia_historico.jpg', photoId: '1467269204594-9661b134dd2b', desc: 'Centro histórico turístico' },
  { id: 11, file: 'g11_passeio_lancha.jpg', photoId: '1567899378494-47b22a2ae96a', desc: 'Lancha no mar azul' },
  { id: 12, file: 'g12_hotel_boutique.jpg', photoId: '1566073771259-6a8506099945', desc: 'Piscina e quarto de hotel boutique resort' },
  { id: 13, file: 'g13_cota_hospedagem.jpg', photoId: '1582719508461-905c673771fd', desc: 'Suíte master luxo de hotel' },
  { id: 14, file: 'g14_mergulho_mar.jpg', photoId: '1682687220063-4742bd7fd538', desc: 'Mergulho no oceano peixes corais' },
  { id: 15, file: 'g15_passagens_aereas.jpg', photoId: '1436491865332-7a61a109cc05', desc: 'Asa de avião voando sobre nuvens' },

  // COZINHA & GOURMET
  { id: 16, file: 'g16_espatulas_silicone.jpg', photoId: '1556911220-e15b29be8c8f', desc: 'Utensílios de cozinha e espátulas de madeira/silicone' },
  { id: 17, file: 'g17_potes_hermeticos.jpg', photoId: '1584308666744-24d5c474f2ae', desc: 'Potes herméticos de vidro com mantimentos' },
  { id: 18, file: 'g18_pratos_ceramica.jpg', photoId: '1578749556568-bc2c40e68b61', desc: 'Conjunto de pratos artesanais de cerâmica' },
  { id: 19, file: 'g19_tabua_frios.jpg', photoId: '1631452180519-c014fe946bc7', desc: 'Tábua de queijos, frios e uvas gourmet' },
  { id: 20, file: 'g20_aparelho_fondue.jpg', photoId: '1541544741938-0af808871cc0', desc: 'Panela de fondue de queijo/chocolate' },
  { id: 21, file: 'g21_kit_facas.jpg', photoId: '1593618998160-e34014e67546', desc: 'Facas de chef profissionais' },
  { id: 22, file: 'g22_bowls_porcelana.jpg', photoId: '1610701596007-11502861dcfa', desc: 'Tigelas bowls de porcelana' },
  { id: 23, file: 'g23_temperos_moedores.jpg', photoId: '1532336414038-cf19250c5757', desc: 'Moedores de pimenta e temperos' },
  { id: 24, file: 'g24_frigideira_inducao.jpg', photoId: '1590794056226-79ef3a8147e1', desc: 'Frigideira antiaderente cozinhando' },
  { id: 25, file: 'g25_formas_bolo.jpg', photoId: '1587241321921-91a834d6d191', desc: 'Formas de bolo e confeitaria' },
  { id: 26, file: 'g26_talheres_inox.jpg', photoId: '1584269600464-37b1b58a9fe7', desc: 'Talheres de inox / faqueiro de mesa' },
  { id: 27, file: 'g27_jogo_panelas.jpg', photoId: '1585515320310-259814833e62', desc: 'Jogo completo de panelas' },
  { id: 28, file: 'g28_panela_ferro.jpg', photoId: '1556911073-38141963c9e0', desc: 'Panela de ferro fundido esmaltada' },
  { id: 29, file: 'g29_assadeiras_vidro.jpg', photoId: '1546069901-ba9599a7e63c', desc: 'Assadeira refratária de vidro com prato assado' },
  { id: 30, file: 'g30_organizador_gaveta.jpg', photoId: '1556909114-f6e7ad7d3136', desc: 'Gaveta de cozinha organizada com divisórias' },

  // CAMA, MESA & BANHO
  { id: 31, file: 'g31_panos_linho.jpg', photoId: '1606857521015-7f9fcf423740', desc: 'Panos de prato de linho dobrados' },
  { id: 32, file: 'g32_jogo_americano.jpg', photoId: '1533090161767-e6ffed986c88', desc: 'Jogo americano posta de mesa e guardanapo' },
  { id: 33, file: 'g33_kit_toalhas.jpg', photoId: '1583847268964-b28dc8f51f92', desc: 'Toalhas macias de banho dobradas' },
  { id: 34, file: 'g34_lencois_algodao.jpg', photoId: '1631679706909-1844bbd07221', desc: 'Cama arrumada com lençóis brancos macios' },
  { id: 35, file: 'g35_travesseiros.jpg', photoId: '1584100936595-c0654b55a2e2', desc: 'Dois travesseiros confortáveis na cama' },
  { id: 36, file: 'g36_manta_trico.jpg', photoId: '1580301762395-21ce84d00bc6', desc: 'Manta de tricô dobrada sobre o sofá' },
  { id: 37, file: 'g37_tapete_quarto.jpg', photoId: '1600121848594-d8644e57abab', desc: 'Tapete felpudo confortável ao lado da cama' },
  { id: 38, file: 'g38_roupao_casal.jpg', photoId: '1512918728675-ed5a9ecdebfd', desc: 'Roupões brancos de hotel pendurados' },
  { id: 39, file: 'g39_toalha_mesa.jpg', photoId: '1519225421980-715cb0215aed', desc: 'Toalha de mesa de linho com arranjo floral' },
  { id: 40, file: 'g40_edredom_king.jpg', photoId: '1522771739844-6a9f6d5f14af', desc: 'Edredom fofo king size na cama' },
  { id: 41, file: 'g41_algodao_egipcio.jpg', photoId: '1505693416388-ac5ce068fe85', desc: 'Jogo de cama luxo algodão egípcio' },
  { id: 42, file: 'g42_toalhas_luxo.jpg', photoId: '1616627547584-bf28cee262db', desc: 'Toalhas banhão linha spa enroladas' },
  { id: 43, file: 'g43_protetor_colchao.jpg', photoId: '1586023492125-27b2c045efd7', desc: 'Colchão confortável com capa protetora' },
  { id: 44, file: 'g44_cortina_blackout.jpg', photoId: '1513694203232-719a280e022f', desc: 'Cortina elegante blackout na janela do quarto' },
  { id: 45, file: 'g45_cobre_leito.jpg', photoId: '1595526114035-0d45ed16cfbf', desc: 'Cobre-leito matelassê com almofadas' },

  // ELETROS & TECNOLOGIA
  { id: 46, file: 'g46_chaleira_eletrica.jpg', photoId: '1576092768241-dec231879fc3', desc: 'Chaleira elétrica com vapor' },
  { id: 47, file: 'g47_torradeira_paes.jpg', photoId: '1528735602780-2552fd46c7af', desc: 'Torradeira de pão inox saindo fatias douradas' },
  { id: 48, file: 'g48_sanduicheira_grill.jpg', photoId: '1528736235302-52922df5c122', desc: 'Sanduíche tostado no grill com queijo derretido' },
  { id: 49, file: 'g49_mini_processador.jpg', photoId: '1574269909862-7e1d70bb8078', desc: 'Mini processador picando vegetais' },
  { id: 50, file: 'g50_ferro_vapor.jpg', photoId: '1582735689369-4fe89db7114c', desc: 'Ferro de passar a vapor na tábua' },
  { id: 51, file: 'g51_liquidificador.jpg', photoId: '1570222094114-d054a817e56b', desc: 'Liquidificador batendo smoothie de frutas' },
  { id: 52, file: 'g52_cafeteira_espresso.jpg', photoId: '1514432324607-a09d9b4aefdd', desc: 'Máquina de café espresso tirando café cremoso' },
  { id: 53, file: 'g53_bebedouro.jpg', photoId: '1556881286-fc6915169721', desc: 'Copo enchendo com água cristalina gelada' },
  { id: 54, file: 'g54_air_fryer.jpg', photoId: '1626082927389-6cd097cdc6ec', desc: 'Air fryer digital com comida crocante' },
  { id: 55, file: 'g55_forno_eletrico.jpg', photoId: '1540420773420-3366772f4999', desc: 'Forno elétrico assando' },
  { id: 56, file: 'g56_aspirador_vertical.jpg', photoId: '1558317374-067fb5f30001', desc: 'Aspirador de pó vertical moderno sem fio' },
  { id: 57, file: 'g57_batedeira_planetaria.jpg', photoId: '1578985545062-69928b1d9587', desc: 'Batedeira planetária batendo massa' },
  { id: 58, file: 'g58_robo_aspirador.jpg', photoId: '1563178406-4cdc2923acbc', desc: 'Robô aspirador inteligente no piso' },
  { id: 59, file: 'g59_fogao_alta_perf.jpg', photoId: '1556912173-3bb406ef7e77', desc: 'Fogão moderno cooktop com chamas acesas' },
  { id: 60, file: 'g60_smart_tv.jpg', photoId: '1593359677879-a4bb92f829d1', desc: 'Smart TV 4K moderna na sala de estar' },

  // BAR, BEBIDAS & MOMENTOS
  { id: 61, file: 'g61_abridor_vinho.jpg', photoId: '1584917865442-de89df76afd3', desc: 'Abridor saca-rolhas abrindo garrafa de vinho' },
  { id: 62, file: 'g62_canudos_dosador.jpg', photoId: '1514362545857-3bc16c4c7d1b', desc: 'Dosador de inox jigger e utensílios de bar' },
  { id: 63, file: 'g63_coqueteleira.jpg', photoId: '1551538827-9c037cb4f32a', desc: 'Coqueteleira de inox com fatias de limão e gelo' },
  { id: 64, file: 'g64_copos_drinks.jpg', photoId: '1536935338788-846bb9981813', desc: 'Copos altos com drinks e folhas de hortelã' },
  { id: 65, file: 'g65_balde_gelo.jpg', photoId: '1568644396922-5c3bfae12521', desc: 'Balde de gelo de inox com espumante' },
  { id: 66, file: 'g66_copos_cerveja.jpg', photoId: '1575037614876-c38a4d44f5b8', desc: 'Taças e copos de cerveja artesanal com colarinho' },
  { id: 67, file: 'g67_tacas_cristal.jpg', photoId: '1565557623262-b51c2513a641', desc: 'Taças de cristal para vinho e espumante' },
  { id: 68, file: 'g68_decanter_cristal.jpg', photoId: '1506377247377-2a5b3b417ebb', desc: 'Decanter de cristal servindo vinho tinto' },
  { id: 69, file: 'g69_garrafa_termica.jpg', photoId: '1517256064527-09c73fc73e38', desc: 'Garrafa térmica moderna de inox para café' },
  { id: 70, file: 'g70_xicaras_cafe.jpg', photoId: '1509042239860-f550ce710b93', desc: 'Xícaras de café em porcelana fina' },
  { id: 71, file: 'g71_adega_vinhos.jpg', photoId: '1516594798947-e65505dbb29d', desc: 'Adega climatizada com garrafas de vinho' },
  { id: 72, file: 'g72_champanheira.jpg', photoId: '1546171753-97d7676e4602', desc: 'Champanheira de inox com garrafas no gelo' },
  { id: 73, file: 'g73_cervejeira.jpg', photoId: '1584225064785-c62a8b43d148', desc: 'Cervejeira expositora com bebidas geladas' },
  { id: 74, file: 'g74_copos_whisky.jpg', photoId: '1527061011665-3652c757a4d4', desc: 'Copos de whisky de cristal com gelo' },
  { id: 75, file: 'g75_cesta_chocolates.jpg', photoId: '1549007994-cb92caebd54b', desc: 'Cesta gourmet de chocolates e doces artesanais' },

  // VIAGEM & CASA
  { id: 76, file: 'g76_excesso_bagagem.jpg', photoId: '1553062407-98eeb64c6a62', desc: 'Malas no aeroporto para check-in' },
  { id: 77, file: 'g77_org_malas.jpg', photoId: '1581553680321-4fffae59fccd', desc: 'Organizadores de mala e necessaires' },
  { id: 78, file: 'g78_almofadas_pescoco.jpg', photoId: '1520250497591-112f2f40a3f4', desc: 'Almofada de pescoço macia de viagem' },
  { id: 79, file: 'g79_mala_bordo.jpg', photoId: '1565026057447-bc90a3dceb87', desc: 'Mala de bordo rígida com rodinhas 360' },
  { id: 80, file: 'g80_mala_grande.jpg', photoId: '1527631746610-bca00a040d60', desc: 'Mala grande de viagem com viajante' },
  { id: 81, file: 'g81_vaso_ceramica.jpg', photoId: '1612196808214-b8e1d6145a8c', desc: 'Vaso de cerâmica decorativo minimalista com flores' },
  { id: 82, file: 'g82_difusor_aromas.jpg', photoId: '1608571423902-eed4a5ad8108', desc: 'Difusor elétrico de aromas com vapor e luz suave' },
  { id: 83, file: 'g83_luminaria_mesa.jpg', photoId: '1507473885765-e6ed057f782c', desc: 'Luminária de mesa moderna para leitura' },
  { id: 84, file: 'g84_espelho_decor.jpg', photoId: '1618221195710-dd6b41faaea6', desc: 'Espelho redondo decorativo na parede da sala' },
  { id: 85, file: 'g85_quadros_decor.jpg', photoId: '1579783900882-c0d3dad7b119', desc: 'Conjunto de quadros artísticos decorativos' },
  { id: 86, file: 'g86_caixa_som.jpg', photoId: '1545454675-3531b543be5d', desc: 'Caixa de som bluetooth portátil moderna' },
  { id: 87, file: 'g87_cota_sofa.jpg', photoId: '1555041469-a586c61ea9bc', desc: 'Sofá confortável e moderno na sala de estar' },
  { id: 88, file: 'g88_mesa_jantar.jpg', photoId: '1615066390971-03e4e1c36ddf', desc: 'Mesa de jantar de madeira maciça posta' },
  { id: 89, file: 'g89_reforma_cantinho.jpg', photoId: '1600210492486-724fe5c67fb0', desc: 'Ambiente aconchegante reformado do casal' },
  { id: 90, file: 'g90_casa_nova.jpg', photoId: '1600585154340-be6161a56a0c', desc: 'Casa dos sonhos nova do casal com jardim' },
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
  console.log('Downloading 100% semantic matching images for all 90 items...');
  let ok = 0;
  for (const item of perfectMapping) {
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    try {
      await downloadImage(unsplashUrl, dest);
      ok++;
      process.stdout.write(`\rProgress: [${ok}/90] ${item.file}`);
    } catch (e) {
      console.log(`\nError ${item.file}:`, e.message);
    }
  }
  console.log('\nFinished downloading.');
}

run();
