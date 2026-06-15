import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../public/data');
const LANGUAGES = ['pt_BR', 'en_US'];

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao baixar ${url}: ${response.statusText}`);
  }
  return response.json();
}

async function updateData() {
  console.log('--- Iniciando atualização de dados estáticos do LoL ---');
  
  try {
    // 1. Obter a versão mais recente do Data Dragon
    console.log('Buscando lista de versões...');
    const versions = await fetchJSON('https://ddragon.leagueoflegends.com/api/versions.json');
    const latestVersion = versions[0];
    console.log(`Versão mais recente identificada: ${latestVersion}`);

    // 2. Para cada idioma suportado, baixar os arquivos JSON necessários
    for (const lang of LANGUAGES) {
      console.log(`\nProcessando dados para o idioma: ${lang}...`);
      const targetDir = path.join(DATA_DIR, lang);
      
      // Garante que o diretório de destino exista
      fs.mkdirSync(targetDir, { recursive: true });

      // URLs dos recursos
      const urls = {
        'champion.json': `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/${lang}/champion.json`,
        'item.json': `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/${lang}/item.json`,
        'runesReforged.json': `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/${lang}/runesReforged.json`
      };

      for (const [filename, url] of Object.entries(urls)) {
        console.log(`Baixando ${filename}...`);
        const data = await fetchJSON(url);
        
        const filePath = path.join(targetDir, filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Salvo em ${filePath}`);
      }
    }

    // 3. Salvar um arquivo de metadados com a versão do patch atualizada
    const metaPath = path.join(DATA_DIR, 'meta.json');
    fs.writeFileSync(
      metaPath,
      JSON.stringify({ latestVersion, updatedAt: new Date().toISOString() }, null, 2),
      'utf-8'
    );
    console.log(`\nMetadados salvos em ${metaPath}`);

    console.log('\n--- Atualização concluída com sucesso! ---');
  } catch (error) {
    console.error('Falha ao atualizar dados:', error);
    process.exit(1);
  }
}

updateData();
