const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const giftsDir = path.join(__dirname, 'public', 'img', 'gifts');
if (!fs.existsSync(giftsDir)) {
  fs.mkdirSync(giftsDir, { recursive: true });
}

// 90 curated high-resolution wedding & gift themed Unsplash photos for each distinct item
const giftImages = [
  // 1-15: Lua de Mel
  { id: 1, file: 'g1_drink_welcome.jpg', photoId: '1551024709-8f23befc6f87' }, // cocktail
  { id: 2, file: 'g2_cafe_cama.jpg', photoId: '1533089860892-a7c6f0a88666' }, // breakfast in bed
  { id: 3, file: 'g3_caipirinhas_piscina.jpg', photoId: '1513558161293-cdaf765ed2fd' }, // tropical drink pool
  { id: 4, file: 'g4_bikes_passeio.jpg', photoId: '1485965120184-e220f721d03e' }, // bikes
  { id: 5, file: 'g5_almoco_praia.jpg', photoId: '1507525428034-b723cf961d3e' }, // beach lunch/seaside
  { id: 6, file: 'g6_entradas_museu.jpg', photoId: '1565008447742-97f6f38c985c' }, // museum / architecture
  { id: 7, file: 'g7_jantar_velas.jpg', photoId: '1517248135467-4c7edcad34c4' }, // candlelit dinner
  { id: 8, file: 'g8_degustacao_vinhos.jpg', photoId: '1510812431401-41d2bd2722f3' }, // wine & cheese
  { id: 9, file: 'g9_massagem_spa.jpg', photoId: '1540555700478-4be289fbecef' }, // spa / massage
  { id: 10, file: 'g10_guia_historico.jpg', photoId: '1467269204594-9661b134dd2b' }, // historic city
  { id: 11, file: 'g11_passeio_lancha.jpg', photoId: '1569263979104-865ab7cd8d17' }, // boat / yacht
  { id: 12, file: 'g12_hotel_boutique.jpg', photoId: '1566073771259-6a8506099945' }, // luxury resort
  { id: 13, file: 'g13_cota_hospedagem.jpg', photoId: '1582719508461-905c673771fd' }, // hotel suite
  { id: 14, file: 'g14_mergulho_mar.jpg', photoId: '1544551763-46a013bb70d5' }, // scuba / diving
  { id: 15, file: 'g15_passagens_aereas.jpg', photoId: '1436491865332-7a61a109cc05' }, // airplane / flight

  // 16-30: Cozinha & Gourmet
  { id: 16, file: 'g16_espatulas_silicone.jpg', photoId: '1556911220-e15b29be8c8f' }, // kitchen utensils
  { id: 17, file: 'g17_potes_hermeticos.jpg', photoId: '1584308666744-24d5c474f2ae' }, // glass jars
  { id: 18, file: 'g18_pratos_ceramica.jpg', photoId: '1578749556568-bc2c40e68b61' }, // ceramic plates
  { id: 19, file: 'g19_tabua_frios.jpg', photoId: '1631452180519-c014fe946bc7' }, // charcuterie board
  { id: 20, file: 'g20_aparelho_fondue.jpg', photoId: '1541544741938-0af808871cc0' }, // fondue / gourmet
  { id: 21, file: 'g21_kit_facas.jpg', photoId: '1593618998160-e34014e67546' }, // chef knives
  { id: 22, file: 'g22_bowls_porcelana.jpg', photoId: '1610701596007-11502861dcfa' }, // ceramic bowls
  { id: 23, file: 'g23_temperos_moedores.jpg', photoId: '1532336414038-cf19250c5757' }, // spices & salt grinder
  { id: 24, file: 'g24_frigideira_inducao.jpg', photoId: '1584990347449-399479357917' }, // skillet / pan
  { id: 25, file: 'g25_formas_bolo.jpg', photoId: '1587241321921-91a834d6d191' }, // baking pans
  { id: 26, file: 'g26_talheres_inox.jpg', photoId: '1584269600464-37b1b58a9fe7' }, // luxury cutlery
  { id: 27, file: 'g27_jogo_panelas.jpg', photoId: '1584990347449-399479357917' }, // pots and pans
  { id: 28, file: 'g28_panela_ferro.jpg', photoId: '1585515320310-259814833e62' }, // dutch oven
  { id: 29, file: 'g29_assadeiras_vidro.jpg', photoId: '1590794056226-79ef3a8147e1' }, // baking dish
  { id: 30, file: 'g30_organizador_gaveta.jpg', photoId: '1556909114-f6e7ad7d3136' }, // organized kitchen

  // 31-45: Cama, Mesa & Banho
  { id: 31, file: 'g31_panos_linho.jpg', photoId: '1606857521015-7f9fcf423740' }, // linen towels
  { id: 32, file: 'g32_jogo_americano.jpg', photoId: '1533090161767-e6ffed986c88' }, // table runner & napkin
  { id: 33, file: 'g33_kit_toalhas.jpg', photoId: '1583847268964-b28dc8f51f92' }, // soft bath towels
  { id: 34, file: 'g34_lencois_algodao.jpg', photoId: '1631679706909-1844bbd07221' }, // bed linen
  { id: 35, file: 'g35_travesseiros.jpg', photoId: '1584100936595-c0654b55a2e2' }, // pillows
  { id: 36, file: 'g36_manta_trico.jpg', photoId: '1584100936746-17b7381b162f' }, // knit blanket
  { id: 37, file: 'g37_tapete_quarto.jpg', photoId: '1600121848594-d8644e57abab' }, // cozy rug
  { id: 38, file: 'g38_roupao_casal.jpg', photoId: '1512918728675-ed5a9ecdebfd' }, // bathrobes / hotel
  { id: 39, file: 'g39_toalha_mesa.jpg', photoId: '1519225421980-715cb0215aed' }, // beautiful table setting
  { id: 40, file: 'g40_edredom_king.jpg', photoId: '1522771739844-6a9f6d5f14af' }, // king bed duvet
  { id: 41, file: 'g41_algodao_egipcio.jpg', photoId: '1505693416388-ac5ce068fe85' }, // luxury bedroom
  { id: 42, file: 'g42_toalhas_luxo.jpg', photoId: '1616627547584-bf28cee262db' }, // rolled luxury towels
  { id: 43, file: 'g43_protetor_colchao.jpg', photoId: '1586023492125-27b2c045efd7' }, // mattress / cozy bed
  { id: 44, file: 'g44_cortina_blackout.jpg', photoId: '1513694203232-719a280e022f' }, // curtains interior
  { id: 45, file: 'g45_cobre_leito.jpg', photoId: '1595526114035-0d45ed16cfbf' }, // bed cover

  // 46-60: Eletros & Tecnologia
  { id: 46, file: 'g46_chaleira_eletrica.jpg', photoId: '1576092768241-dec231879fc3' }, // electric kettle
  { id: 47, file: 'g47_torradeira_paes.jpg', photoId: '1583577770857-c812d6a54f00' }, // toaster
  { id: 48, file: 'g48_sanduicheira_grill.jpg', photoId: '1528735602780-2552fd46c7af' }, // sandwich / grill
  { id: 49, file: 'g49_mini_processador.jpg', photoId: '1574269909862-7e1d70bb8078' }, // food processor
  { id: 50, file: 'g50_ferro_vapor.jpg', photoId: '1582735689369-4fe89db7114c' }, // steam iron / laundry
  { id: 51, file: 'g51_liquidificador.jpg', photoId: '1570222094114-d054a817e56b' }, // blender smoothie
  { id: 52, file: 'g52_cafeteira_espresso.jpg', photoId: '1514432324607-a09d9b4aefdd' }, // espresso machine
  { id: 53, file: 'g53_bebedouro.jpg', photoId: '1548839140-29a749e1bc4e' }, // water dispenser / cold water
  { id: 54, file: 'g54_air_fryer.jpg', photoId: '1626082927389-6cd097cdc6ec' }, // air fryer
  { id: 55, file: 'g55_forno_eletrico.jpg', photoId: '1556911261-6da741363ef2' }, // modern electric oven
  { id: 56, file: 'g56_aspirador_vertical.jpg', photoId: '1558317374-067fb5f30001' }, // cordless vacuum
  { id: 57, file: 'g57_batedeira_planetaria.jpg', photoId: '1594488518001-c88f4bcfc4cf' }, // stand mixer
  { id: 58, file: 'g58_robo_aspirador.jpg', photoId: '1563178406-4cdc2923acbc' }, // robot vacuum
  { id: 59, file: 'g59_fogao_alta_perf.jpg', photoId: '1556912173-3bb406ef7e77' }, // modern gas stove
  { id: 60, file: 'g60_smart_tv.jpg', photoId: '1593359677879-a4bb92f829d1' }, // 4k smart tv living room

  // 61-75: Bar & Bebidas
  { id: 61, file: 'g61_abridor_vinho.jpg', photoId: '1510812431401-41d2bd2722f3' }, // wine bottle opener
  { id: 62, file: 'g62_canudos_dosador.jpg', photoId: '1551024709-8f23befc6f87' }, // bar accessories
  { id: 63, file: 'g63_coqueteleira.jpg', photoId: '1514362545857-3bc16c4c7d1b' }, // cocktail shaker
  { id: 64, file: 'g64_copos_drinks.jpg', photoId: '1536935338788-846bb9981813' }, // highball cocktail glasses
  { id: 65, file: 'g65_balde_gelo.jpg', photoId: '1568644396922-5c3bfae12521' }, // ice bucket & champagne
  { id: 66, file: 'g66_copos_cerveja.jpg', photoId: '1538488881522-c933045472ef' }, // craft beer glasses
  { id: 67, file: 'g67_tacas_cristal.jpg', photoId: '1565557623262-b51c2513a641' }, // crystal wine glasses
  { id: 68, file: 'g68_decanter_cristal.jpg', photoId: '1506377247377-2a5b3b417ebb' }, // wine decanter
  { id: 69, file: 'g69_garrafa_termica.jpg', photoId: '1517256064527-09c73fc73e38' }, // insulated bottle / thermos
  { id: 70, file: 'g70_xicaras_cafe.jpg', photoId: '1514432324607-a09d9b4aefdd' }, // espresso cups
  { id: 71, file: 'g71_adega_vinhos.jpg', photoId: '1506377247377-2a5b3b417ebb' }, // wine cellar / wine cooler
  { id: 72, file: 'g72_champanheira.jpg', photoId: '1546171753-97d7676e4602' }, // champagne bucket
  { id: 73, file: 'g73_cervejeira.jpg', photoId: '1538488881522-c933045472ef' }, // beer fridge / beverages
  { id: 74, file: 'g74_copos_whisky.jpg', photoId: '1527061011665-3652c757a4d4' }, // crystal whisky glasses
  { id: 75, file: 'g75_cesta_chocolates.jpg', photoId: '1549007994-cb92caebd54b' }, // gourmet chocolate basket

  // 76-90: Viagem & Casa
  { id: 76, file: 'g76_excesso_bagagem.jpg', photoId: '1553062407-98eeb64c6a62' }, // luggage travel
  { id: 77, file: 'g77_org_malas.jpg', photoId: '1581553680321-4fffae59fccd' }, // packing cubes / travel
  { id: 78, file: 'g78_almofadas_pescoco.jpg', photoId: '1520250497591-112f2f40a3f4' }, // travel cushion
  { id: 79, file: 'g79_mala_bordo.jpg', photoId: '1565026057447-bc90a3dceb87' }, // carry on suitcase
  { id: 80, file: 'g80_mala_grande.jpg', photoId: '1581553680321-4fffae59fccd' }, // large travel suitcase
  { id: 81, file: 'g81_vaso_ceramica.jpg', photoId: '1578749556568-bc2c40e68b61' }, // ceramic vase
  { id: 82, file: 'g82_difusor_aromas.jpg', photoId: '1608571423902-eed4a5ad8108' }, // aroma diffuser
  { id: 83, file: 'g83_luminaria_mesa.jpg', photoId: '1507473885765-e6ed057f782c' }, // modern table lamp
  { id: 84, file: 'g84_espelho_decor.jpg', photoId: '1618221195710-dd6b41faaea6' }, // round mirror interior
  { id: 85, file: 'g85_quadros_decor.jpg', photoId: '1579783900882-c0d3dad7b119' }, // wall art frames
  { id: 86, file: 'g86_caixa_som.jpg', photoId: '1545454675-3531b543be5d' }, // bluetooth speaker
  { id: 87, file: 'g87_cota_sofa.jpg', photoId: '1555041469-a586c61ea9bc' }, // comfortable sofa
  { id: 88, file: 'g88_mesa_jantar.jpg', photoId: '1615066390971-03e4e1c36ddf' }, // wooden dining table
  { id: 89, file: 'g89_reforma_cantinho.jpg', photoId: '1618221195710-dd6b41faaea6' }, // interior decor
  { id: 90, file: 'g90_casa_nova.jpg', photoId: '1600585154340-be6161a56a0c' }, // dream home / living
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        // follow redirect
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
  console.log(`Starting download of ${giftImages.length} distinct images...`);
  
  let successCount = 0;
  for (let i = 0; i < giftImages.length; i++) {
    const item = giftImages[i];
    const dest = path.join(giftsDir, item.file);
    const unsplashUrl = `https://images.unsplash.com/photo-${item.photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
    
    try {
      await downloadImage(unsplashUrl, dest);
      successCount++;
      process.stdout.write(`\rProgress: [${successCount}/${giftImages.length}] downloaded: ${item.file}`);
    } catch (err) {
      console.error(`\nFailed for ${item.file}:`, err.message);
    }
  }
  console.log(`\nAll downloads finished. Total: ${successCount}`);
}

run();
