/**
 * download_all_unique.js
 * Baixa imagens únicas do Unsplash para cada presente que usa imagem repetida.
 * Cada ID de presente recebe um arquivo de imagem exclusivo.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../public/img/gifts');

// Mapeamento: nome do arquivo → ID do Unsplash
// Todas as IDs são únicas — nenhuma se repete.
const DOWNLOADS = [
  // ── LUA DE MEL ──────────────────────────────────────────────
  { file: 'u3_caipirinha.jpg',      id: '1551024709-8f23befc6f87' }, // tropical drink pool
  { file: 'u5_almoco_mar.jpg',      id: '1414235077428-338989a2e8c0' }, // elegant seaside dining
  { file: 'u6_historico.jpg',       id: '1461360370896-922624d12aa1' }, // historic city architecture
  { file: 'u8_wine_tasting.jpg',    id: '1510812431401-41d2bd2722f3' }, // wine tasting bar
  { file: 'u10_excursao.jpg',       id: '1506905925346-21bda4d32df4' }, // scenic landscape tour
  { file: 'u11_barco.jpg',         id: '1544551763-77ef2d0cfc6c' }, // sailing yacht boat
  { file: 'u12_hotel.jpg',         id: '1566073771259-6a8506099945' }, // boutique hotel room
  { file: 'u13_hotel_luxo.jpg',    id: '1582719478250-c89cae4dc85b' }, // luxury hotel pool suite
  { file: 'u14_mergulho.jpg',      id: '1560275619-4cc5fa59d3ae' }, // underwater snorkeling
  { file: 'u9_spa.jpg',            id: '1544161515-4ab6ce6db874' }, // spa massage stones

  // ── COZINHA ─────────────────────────────────────────────────
  { file: 'u17_potes.jpg',         id: '1473093226795-af9932fe5856' }, // glass storage jars
  { file: 'u21_facas.jpg',         id: '1593618998160-e34014e67546' }, // chef knife set
  { file: 'u22_bowls.jpg',         id: '1490645935967-10de6ba17061' }, // ceramic bowls food
  { file: 'u23_temperos.jpg',      id: '1596040033229-a9821ebd058d' }, // spices herbs mortar
  { file: 'u26_talheres.jpg',      id: '1547592180-85f173990554' }, // silverware cutlery set
  { file: 'u28_ferro_fundido.jpg', id: '1547592166-23ac45744acd' }, // cast iron pot
  { file: 'u29_assadeira.jpg',     id: '1586985289688-ca3cf47d3e6e' }, // baking tray oven
  { file: 'u30_organizador.jpg',   id: '1528740561583-2cbe27d37cf4' }, // organized kitchen drawer
  { file: 'u32_americano.jpg',     id: '1595341888016-a392ef81b7de' }, // elegant table setting placemat

  // ── CAMA MESA BANHO ─────────────────────────────────────────
  { file: 'u37_tapete.jpg',        id: '1554995207-c18c203602cb' }, // cozy bedroom with rug
  { file: 'u38_roupao.jpg',        id: '1600334089648-b0d9d3028eb2' }, // white bathrobe spa
  { file: 'u39_toalha_mesa.jpg',   id: '1464500542410-1396074bf230' }, // elegant table cloth dinner
  { file: 'u40_edredom.jpg',       id: '1586023492125-27b2c045efd7' }, // fluffy white duvet king
  { file: 'u41_egipcio.jpg',       id: '1578683010236-d716f9a3f461' }, // crisp white cotton sheets
  { file: 'u42_toalhas_luxo.jpg',  id: '1589782182703-2aaa69037b5b' }, // stacked luxury white towels
  { file: 'u43_protetor.jpg',      id: '1631049307264-da0ec9d70304' }, // clean hotel bed mattress
  { file: 'u44_cortina.jpg',       id: '1535406208535-1429839cfd13' }, // blackout curtains window light
  { file: 'u45_cobre_leito.jpg',   id: '1521791136064-7986c2920216' }, // elegant bedspread bedroom

  // ── ELETROS ──────────────────────────────────────────────────
  { file: 'u47_torradeira.jpg',    id: '1502364271109-0a9a75a2a9df' }, // toast bread kitchen
  { file: 'u48_sanduicheira.jpg',  id: '1561043433-aaf687c4cf04' }, // grilled sandwich panini
  { file: 'u50_ferro_vapor.jpg',   id: '1558618049-893516d5927c' }, // clothes iron steam
  { file: 'u55_forno_elet.jpg',    id: '1574269909862-7e1d70bb8078' }, // electric oven baking
  { file: 'u57_batedeira.jpg',     id: '1590301157890-4810ed352733' }, // stand mixer kitchen
  { file: 'u58_robo_asp.jpg',      id: '1568430462989-44163eb1752f' }, // robot vacuum cleaner
  { file: 'u60_smart_tv.jpg',      id: '1593359677879-a4bb92f4834c' }, // smart tv wall mounted

  // ── BAR & BEBIDAS ────────────────────────────────────────────
  { file: 'u61_abridor.jpg',       id: '1474722883778-792e7fb1eba3' }, // wine bottles opener
  { file: 'u62_canudos.jpg',       id: '1514362545857-3bc16c4c7d1b' }, // cocktail bar scene straws
  { file: 'u63_coqueteleira.jpg',  id: '1536935338788-846bb9981813' }, // cocktail shaker bartender
  { file: 'u64_copos.jpg',         id: '1498429152473-8de94e0e6b6a' }, // colorful cocktail glasses
  { file: 'u65_balde_gelo.jpg',    id: '1567696911688-b2a8f5bca2cc' }, // ice bucket bar
  { file: 'u66_cerveja.jpg',       id: '1608270586620-248524c67de9' }, // beer glasses cold
  { file: 'u67_cristal.jpg',       id: '1532635241-17e820acc59f' }, // crystal wine glasses
  { file: 'u68_decanter.jpg',      id: '1574267432644-f4b70f50d7e6' }, // wine decanter pour
  { file: 'u69_garrafa.jpg',       id: '1504197964195-6f777b3b8790' }, // thermal flask thermos
  { file: 'u70_xicaras.jpg',       id: '1495474472287-4d71bcdd2085' }, // coffee cups espresso
  { file: 'u71_adega.jpg',         id: '1516594915697-87eb3b1c14ea' }, // wine cellar bottles
  { file: 'u72_champanheira.jpg',  id: '1568213816046-0ee1c42bd559' }, // champagne bucket ice
  { file: 'u73_cervejeira.jpg',    id: '1550950158-d0d960ddef5f' }, // beer cooler fridge
  { file: 'u74_whisky.jpg',        id: '1527281400683-1aae777175f8' }, // whisky glass rocks
  { file: 'u75_chocolates.jpg',    id: '1511381939415-e44015466834' }, // chocolate truffles box

  // ── VIAGEM & CASA ────────────────────────────────────────────
  { file: 'u76_bagagem_exc.jpg',   id: '1529333166437-7750a6dd5a70' }, // luggage travel suitcase
  { file: 'u78_pescoco.jpg',       id: '1553361371-9b22f78e8b1d' }, // travel neck pillow seat
  { file: 'u81_vaso.jpg',          id: '1490481651871-ab68de25d43d' }, // ceramic vase flowers decor
  { file: 'u82_difusor.jpg',       id: '1608181831718-10b9f6a1a5dc' }, // essential oil diffuser home
  { file: 'u83_luminaria.jpg',     id: '1513506003901-1e6a35703040' }, // desk lamp modern
  { file: 'u84_espelho.jpg',       id: '1556228720-195a672e8a03' }, // decorative round mirror
  { file: 'u85_quadros.jpg',       id: '1513519245088-0e12902e35ca' }, // gallery wall frames art
  { file: 'u86_caixa_som.jpg',     id: '1608043152269-423dbba4e7e1' }, // bluetooth speaker
  { file: 'u87_sofa.jpg',          id: '1555041469-a586c61ea9bc' }, // living room sofa couch
  { file: 'u88_mesa_jantar.jpg',   id: '1549497538-b0ae53f4aaba' }, // dining table wooden set
  { file: 'u89_reforma.jpg',       id: '1589939705384-5185137a7f0f' }, // home renovation interior
  { file: 'u90_casa.jpg',          id: '1560518883-ce09059eeffa' }, // beautiful new house
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    const req = protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
    req.setTimeout(15000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function main() {
  console.log(`\n📥 Baixando ${DOWNLOADS.length} imagens únicas...\n`);
  let ok = 0, fail = 0;

  for (const { file, id } of DOWNLOADS) {
    const destPath = path.join(OUT_DIR, file);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
      console.log(`  ⏭  ${file} já existe, pulando`);
      ok++;
      continue;
    }
    const url = `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;
    try {
      await downloadImage(url, destPath);
      const size = fs.statSync(destPath).size;
      if (size < 5000) {
        fs.unlinkSync(destPath);
        throw new Error('Arquivo muito pequeno (imagem inválida)');
      }
      console.log(`  ✅ ${file} (${(size/1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      fail++;
    }
    // Pausa de 200ms entre downloads para não ser bloqueado
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n📊 Resultado: ${ok} OK, ${fail} falhas\n`);
}

main();
