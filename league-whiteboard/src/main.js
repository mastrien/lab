import { Scoreboard } from './modules/scoreboard/scoreboard.js';
import { RunePlanner } from './modules/runes/runePlanner.js';
import { MapNavigator } from './modules/map/mapNavigator.js';
import { calculateDamage, calculateCCDuration, calculateCDR } from './modules/simulator/damageSimulator.js';
import { BuildComparator } from './modules/comparator/buildComparator.js';

// ==========================================================================
// TRANSLATION DICTIONARY
// ==========================================================================
const TRANSLATIONS = {
  pt_BR: {
    'nav.scoreboard': 'Placar',
    'nav.simulator': 'Simulador',
    'nav.runes': 'Runas',
    'nav.map': 'Mapa Rift',
    'title.comparator': 'Comparador de Builds',
    'title.scoreboard': 'Simulador de Comp',
    'title.simulator': 'Simulador de Atributos e Danos',
    'title.runes': 'Planejador de Runas Reforçadas',
    'title.map': 'Quadro de Estratégia do Summoner\'s Rift',
    'btn.export': 'Exportar',
    'btn.import': 'Importar',
    'btn.reset': 'Limpar',
    'sim.damageTitle': 'Simulador de Dano Efetivo',
    'sim.rawDamage': 'Dano Bruto Aplicado',
    'sim.damageType': 'Tipo de Dano',
    'sim.physical': 'Físico',
    'sim.magic': 'Mágico',
    'sim.true': 'Verdadeiro',
    'sim.resistance': 'Armadura do Alvo',
    'sim.resistance.armor': 'Armadura do Alvo',
    'sim.resistance.mr': 'Resistência Mágica do Alvo',
    'sim.finalDamage': 'Dano Efetivo Recebido',
    'sim.ccTitle': 'Redução por Tenacidade (CC)',
    'sim.ccDuration': 'Duração Original do CC (s)',
    'sim.tenacity': 'Tenacidade do Alvo (%)',
    'sim.clampCc': 'Limitar a 0.5 segundos (mínimo do LoL)',
    'sim.finalCc': 'Duração Efetiva do Efeito',
    'sim.hasteTitle': 'Aceleração de Habilidade vs CDR',
    'sim.haste': 'Aceleração de Habilidade (AH)',
    'sim.baseCooldown': 'Tempo de Recarga Base (s)',
    'sim.cdr': 'Redução de Tempo de Recarga (CDR)',
    'runes.pageName': 'Nome da Página de Runas',
    'runes.save': 'Salvar',
    'runes.savedTitle': 'Páginas Salvas',
    'runes.noPages': 'Nenhuma página de runas salva.',
    'runes.primaryTree': 'Caminho Principal',
    'runes.secondaryTree': 'Caminho Secundário',
    'runes.shards': 'Atributos (Shards)',
    'runes.selectPathMsg': 'Selecione um caminho acima',
    'runes.modeRead': 'Modo Leitura',
    'runes.modeEdit': 'Modo Edição',
    'runes.incomplete': 'Página de runas incompleta. Selecione caminhos no Modo Edição.',
    'map.controlsTitle': 'Quadro do Rift',
    'map.help': 'Use o mouse para arrastar e a roda do mouse para dar zoom. Dê um clique duplo para colocar um marcador no mapa para ilustrar jogadas.',
    'map.zoomIn': 'Aproximar',
    'map.zoomOut': 'Afastar',
    'map.reset': 'Focar',
    'map.clearPins': 'Limpar Quadro',
    'map.pinsTitle': 'Tipo de Marcador',
    'map.blueChamp': 'Azul',
    'map.redChamp': 'Vermelho',
    'map.ward': 'Sentinela',
    'map.ping': 'Atenção',
    'modal.selectChamp': 'Selecionar Campeão',
    'modal.selectItem': 'Selecionar Item',
    'msg.exportName': 'Insira o nome do arquivo para exportação:',
    'msg.runePageSaved': 'Página de runas salva com sucesso!',
    'msg.runePageNameEmpty': 'Insira um nome válido para salvar a página.',
    'msg.confirmReset': 'Deseja realmente limpar todo o placar atual?',
    'score.disclaimer': '*Nota: A exibição abaixo mostra a soma dos atributos base nível 1 e bônus dos itens equipados. Capuz da Morte de Rabadon, Armadura Sangrenta de Suserano, Cria-fendas, etc. não são calculados de forma complexa.*',
    'nav.backHub': 'Voltar ao Hub',
    'footer.backHub': 'Voltar ao Menu do Laboratório'
  },
  en_US: {
    'nav.scoreboard': 'Scoreboard',
    'nav.simulator': 'Simulator',
    'nav.runes': 'Runes',
    'nav.map': 'Rift Map',
    'title.comparator': 'Build Comparator',
    'title.scoreboard': 'Comp Simulator',
    'title.simulator': 'Stats & Damage Simulator',
    'title.runes': 'Reforged Runes Planner',
    'title.map': 'Summoner\'s Rift Strategy Board',
    'btn.export': 'Export',
    'btn.import': 'Import',
    'btn.reset': 'Clear All',
    'sim.damageTitle': 'Effective Damage Simulator',
    'sim.rawDamage': 'Applied Raw Damage',
    'sim.damageType': 'Damage Type',
    'sim.physical': 'Physical',
    'sim.magic': 'Magic',
    'sim.true': 'True',
    'sim.resistance': 'Target Armor',
    'sim.resistance.armor': 'Target Armor',
    'sim.resistance.mr': 'Target Magic Resist',
    'sim.finalDamage': 'Effective Damage Taken',
    'sim.ccTitle': 'Tenacity Reduction (CC)',
    'sim.ccDuration': 'Original CC Duration (s)',
    'sim.tenacity': 'Target Tenacity (%)',
    'sim.clampCc': 'Limit to 0.5 seconds (LoL minimum)',
    'sim.finalCc': 'Effective Effect Duration',
    'sim.hasteTitle': 'Ability Haste vs CDR',
    'sim.haste': 'Ability Haste (AH)',
    'sim.baseCooldown': 'Base Cooldown (s)',
    'sim.cdr': 'Cooldown Reduction (CDR)',
    'runes.pageName': 'Rune Page Name',
    'runes.save': 'Save Page',
    'runes.savedTitle': 'Saved Pages',
    'runes.noPages': 'No saved rune pages found.',
    'runes.primaryTree': 'Primary Path',
    'runes.secondaryTree': 'Secondary Path',
    'runes.shards': 'Stats (Shards)',
    'runes.selectPathMsg': 'Select a path above',
    'runes.modeRead': 'Reading Mode',
    'runes.modeEdit': 'Edit Mode',
    'runes.incomplete': 'Incomplete rune page. Please select paths in Edit Mode.',
    'map.controlsTitle': 'Rift Board',
    'map.help': 'Drag to pan and use mouse wheel to zoom. Double click on the map to place strategic pins.',
    'map.zoomIn': 'Zoom In',
    'map.zoomOut': 'Zoom Out',
    'map.reset': 'Focus',
    'map.clearPins': 'Clear Board',
    'map.pinsTitle': 'Marker Type',
    'map.blueChamp': 'Blue',
    'map.redChamp': 'Red',
    'map.ward': 'Ward',
    'map.ping': 'Alert',
    'modal.selectChamp': 'Select Champion',
    'modal.selectItem': 'Select Item',
    'msg.exportName': 'Enter file name for export:',
    'msg.runePageSaved': 'Rune page successfully saved!',
    'msg.runePageNameEmpty': 'Please enter a valid page name.',
    'msg.confirmReset': 'Are you sure you want to clear the entire scoreboard?',
    'score.disclaimer': '*Note: The display below shows the sum of level 1 base stats and item bonuses. Complex passives like Rabadon\'s Deathcap, Overlord\'s Bloodmail, Riftmaker, etc. are not calculated.*',
    'nav.backHub': 'Back to Hub',
    'footer.backHub': 'Back to Laboratory Hub'
  }
};

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let currentLanguage = 'pt_BR';
let patchVersion = '16.12.1';
let currentTheme = 'dark';

// Databases
let championsDb = [];
let itemsDb = {};
let runesDb = [];

// Selection targets
let activeModalTarget = null; // { team, role, type: 'champ'|'item'|'trinket', index?: number }
let selectedItemFilterTag = 'All';

// Map markers
let activePinType = 'blue-champ';

// Highlights & Views
let highlightedSlot = null; // { team, role }
let runeViewMode = 'edit'; // 'edit' | 'read'

// Instances
const scoreboard = new Scoreboard();
const runePlanner = new RunePlanner();
const mapNavigator = new MapNavigator({ minZoom: 0.5, maxZoom: 3.0 });
const comparator = new BuildComparator();

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupLanguageSelector();
  setupNavigation();
  setupEventListeners();
  setupCustomTooltips();
  setupMapImage();
  setupMapImageFallback();
  comparator.load();
  loadData();
});

// ==========================================================================
// THEME & LIGHT MODE STYLING
// ==========================================================================
function setupTheme() {
  const savedTheme = localStorage.getItem('lw-theme') || 'dark';
  currentTheme = savedTheme;
  
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('light-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  themeBtn.addEventListener('click', () => {
    if (currentTheme === 'dark') {
      currentTheme = 'light';
      document.body.classList.add('light-theme');
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      currentTheme = 'dark';
      document.body.classList.remove('light-theme');
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('lw-theme', currentTheme);
  });
}

// ==========================================================================
// STRUCTURED TOOLTIP PARSING & RENDERING
// ==========================================================================
function getStatClass(statName) {
  const normalized = statName.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents
  
  if (normalized.includes('dano de ataque') || normalized.includes('attack damage') || normalized.includes('penetracao de armadura') || normalized.includes('armor pen')) return 'stat-ad';
  if (normalized.includes('poder de habilidade') || normalized.includes('ability power') || normalized.includes('penetracao magica') || normalized.includes('magic pen')) return 'stat-ap';
  if (normalized.includes('vida') || normalized.includes('health') || (normalized.includes('regen') && normalized.includes('vida')) || (normalized.includes('regen') && normalized.includes('health'))) return 'stat-health';
  if (normalized.includes('armadura') || normalized.includes('armor')) return 'stat-armor';
  if (normalized.includes('resistencia magica') || normalized.includes('magic resist')) return 'stat-mr';
  if (normalized.includes('aceleracao de habilidade') || normalized.includes('ability haste')) return 'stat-ah';
  if (normalized.includes('critico') || normalized.includes('critical') || normalized.includes('crit')) return 'stat-crit';
  if (normalized.includes('movimento') || normalized.includes('movement') || normalized.includes('velocidade') || normalized.includes('speed') || normalized.includes('ataque') || normalized.includes('attack')) return 'stat-ms';
  if (normalized.includes('roubo de vida') || normalized.includes('lifesteal') || normalized.includes('vampirismo') || normalized.includes('vamp')) return 'stat-lifesteal';
  if (normalized.includes('mana')) return 'stat-mana';
  
  return 'stat-health'; // default fallback
}

function parseItemDescriptionStats(description) {
  if (!description) return { stats: [], effects: '' };
  
  const stats = [];
  let effectsHTML = description;
  
  // Try to extract content inside <stats>...</stats>
  const statsMatch = description.match(/<stats>([\s\S]*?)<\/stats>/);
  if (statsMatch) {
    const statsContent = statsMatch[1];
    effectsHTML = description.replace(/<stats>[\s\S]*?<\/stats>/, '');
    
    // Split by <br> or <br/> or <br />
    const lines = statsContent.split(/<br\s*\/?>/i);
    lines.forEach(line => {
      // Find value between <attention>...</attention>
      const valMatch = line.match(/<attention>([\s\S]*?)<\/attention>/);
      if (valMatch) {
        const val = valMatch[1].trim();
        // The rest of the line is the stat name
        let name = line.replace(/<attention>[\s\S]*?<\/attention>/, '').trim();
        // Remove leading "de " or "of " or "+" or "-"
        name = name.replace(/^(de|of|\+|-)\s+/i, '').replace(/^[+-]/, '').trim();
        if (name && val) {
          stats.push({
            value: val,
            name: name,
            class: getStatClass(name)
          });
        }
      }
    });
  }
  
  effectsHTML = cleanHTML(effectsHTML).trim();
  return { stats, effects: effectsHTML };
}

function renderItemTooltip(item) {
  const { stats, effects } = parseItemDescriptionStats(item.description);
  
  let statsHTML = '';
  if (stats.length > 0) {
    statsHTML = `
      <div class="tooltip-stats-section">
        ${stats.map(s => `
          <div class="tooltip-stat-row ${s.class}">
            <span class="tooltip-stat-val">${s.value}</span>
            <span class="tooltip-stat-lbl">${s.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  let effectsHTML = '';
  if (effects) {
    effectsHTML = `
      <div class="tooltip-effects-section">
        ${effects}
      </div>
    `;
  }
  
  return `
    <div class="tooltip-item-header">
      <img src="https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item.image.full}" alt="${item.name}">
      <div class="tooltip-item-info">
        <span class="tooltip-item-name">${item.name}</span>
        <span class="tooltip-item-cost"><i class="fa-solid fa-coins"></i> ${item.gold.total}</span>
      </div>
    </div>
    ${statsHTML}
    ${effectsHTML}
  `;
}

function renderRuneTooltip(rune) {
  return `
    <div class="tooltip-item-header">
      <img src="https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}" alt="${rune.name}">
      <div class="tooltip-item-info">
        <span class="tooltip-item-name">${rune.name}</span>
      </div>
    </div>
    <div class="tooltip-effects-section">
      ${cleanHTML(rune.longDesc || rune.shortDesc)}
    </div>
  `;
}

function renderChampionTooltip(champ) {
  return `
    <div class="tooltip-item-header">
      <img src="https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}" alt="${champ.name}">
      <div class="tooltip-item-info">
        <span class="tooltip-item-name">${champ.name}</span>
        <span class="tooltip-item-cost" style="color: var(--text-muted); font-size: 0.8rem;">${champ.title}</span>
      </div>
    </div>
  `;
}

// ==========================================================================
// CUSTOM TOOLTIP LOGIC (200ms Delay)
// ==========================================================================
function setupCustomTooltips() {
  let tooltipTimeout = null;
  const tooltip = document.getElementById('app-tooltip');

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tooltip], [data-tooltip-type]');
    if (!target) return;

    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      const type = target.getAttribute('data-tooltip-type');
      const id = target.getAttribute('data-tooltip-id');
      const text = target.getAttribute('data-tooltip');

      let html = '';
      if (type === 'item') {
        const item = itemsDb[id];
        if (item) html = renderItemTooltip(item);
      } else if (type === 'rune') {
        let foundRune = null;
        for (let path of runesDb) {
          for (let slot of path.slots) {
            foundRune = slot.runes.find(r => r.id === parseInt(id));
            if (foundRune) break;
          }
          if (foundRune) break;
        }
        if (foundRune) html = renderRuneTooltip(foundRune);
      } else if (type === 'champion') {
        const champ = championsDb.find(c => c.id === id);
        if (champ) html = renderChampionTooltip(champ);
      } else if (text) {
        html = text.replace(/\n/g, '<br>');
      }

      if (!html) return;

      tooltip.innerHTML = html;
      tooltip.classList.add('active');

      const rect = target.getBoundingClientRect();
      let top = rect.bottom + 8;
      let left = rect.left + rect.width / 2;

      // Adjust boundaries to avoid screen clipping
      if (left + tooltip.offsetWidth / 2 > window.innerWidth) {
        left = window.innerWidth - tooltip.offsetWidth / 2 - 10;
      }
      if (left - tooltip.offsetWidth / 2 < 0) {
        left = tooltip.offsetWidth / 2 + 10;
      }
      if (top + tooltip.offsetHeight > window.innerHeight) {
        top = rect.top - tooltip.offsetHeight - 8;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.transform = 'translate(-50%, 0) scale(1)';
    }, 200); // 0.2s delay
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-tooltip], [data-tooltip-type]');
    if (!target) return;

    clearTimeout(tooltipTimeout);
    tooltip.classList.remove('active');
  });
}

// ==========================================================================
// MAP IMAGE STABILITY & FALLBACK
// ==========================================================================
function setupMapImage() {
  const mapImg = document.getElementById('map-image');
  if (!mapImg) return;
  mapImg.src = 'https://static.wikia.nocookie.net/leagueoflegends/images/d/d6/Summoner%27s_Rift_map_s14.png/revision/latest';
}

function setupMapImageFallback() {
  const mapImg = document.getElementById('map-image');
  if (!mapImg) return;
  mapImg.addEventListener('error', () => {
    console.warn('Falha ao carregar o mapa real do jogo. Usando minimapa de fallback...');
    mapImg.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/map/map11.png`;
  });
}

// ==========================================================================
// LANGUAGE & TRANSLATION FUNCTIONS
// ==========================================================================
function setupLanguageSelector() {
  const selectLang = document.getElementById('select-language');
  
  const savedLang = localStorage.getItem('lw-language');
  if (savedLang && ['pt_BR', 'en_US'].includes(savedLang)) {
    currentLanguage = savedLang;
    selectLang.value = savedLang;
  }
  
  selectLang.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('lw-language', currentLanguage);
    translateUI();
    loadData(); // Re-fetch JSON files
  });
}

function translateUI() {
  const dict = TRANSLATIONS[currentLanguage];
  
  document.documentElement.lang = currentLanguage === 'pt_BR' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  updateSimulatorLabels();
  renderScoreboard();
  renderRunePlanner();
  renderSavedRunesList();
}

function getTranslation(key) {
  return TRANSLATIONS[currentLanguage][key] || key;
}

// ==========================================================================
// NAVIGATION
// ==========================================================================
function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const panels = document.querySelectorAll('.panel');
  const activeTitle = document.getElementById('active-panel-title');
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.getElementById('menu-toggle-btn');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');

      const btnSpan = btn.querySelector('span');
      if (btnSpan) {
        const i18nKey = btnSpan.getAttribute('data-i18n').replace('nav.', 'title.');
        activeTitle.setAttribute('data-i18n', i18nKey);
        activeTitle.textContent = getTranslation(i18nKey);
      }
      
      if (targetId === 'panel-map') {
        setTimeout(centerMap, 50);
      } else if (targetId === 'panel-comparator') {
        renderComparator();
      }

      // Close mobile menu on button click
      if (navMenu) {
        navMenu.classList.remove('open');
        if (menuToggle) {
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      }
    });
  });
}

// ==========================================================================
// DATA ACQUISITION & DATABASE PARSING
// ==========================================================================
async function loadData() {
  try {
    const metaResponse = await fetch('./data/meta.json');
    if (metaResponse.ok) {
      const meta = await metaResponse.json();
      patchVersion = meta.latestVersion;
      const visualPatchVersion = patchVersion.replace(/^16\./, '26.');
      document.getElementById('patch-version').textContent = visualPatchVersion;
    }

    const [champsData, itemsData, runesData] = await Promise.all([
      fetch(`./data/${currentLanguage}/champion.json`).then(r => r.json()),
      fetch(`./data/${currentLanguage}/item.json`).then(r => r.json()),
      fetch(`./data/${currentLanguage}/runesReforged.json`).then(r => r.json())
    ]);

    championsDb = Object.values(champsData.data).sort((a, b) => a.name.localeCompare(b.name));
    itemsDb = itemsData.data;
    runesDb = runesData;

    translateUI();
    renderScoreboard();
    setupRunesPaths();
  } catch (err) {
    console.error('Erro ao carregar os dados estáticos do jogo:', err);
  }
}

// ==========================================================================
// PLACAR (SCOREBOARD) RENDERING & CONTROLLER
// ==========================================================================
function renderScoreboard() {
  const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  
  const blueContainer = document.getElementById('blue-slots');
  blueContainer.innerHTML = '';
  roles.forEach(role => {
    blueContainer.appendChild(createSlotElement('blue', role));
  });

  const redContainer = document.getElementById('red-slots');
  redContainer.innerHTML = '';
  roles.forEach(role => {
    redContainer.appendChild(createSlotElement('red', role));
  });

  updateTeamGolds();
  renderChampionDetails();
}

function toggleChampionHighlight(team, role) {
  if (highlightedSlot && highlightedSlot.team === team && highlightedSlot.role === role) {
    highlightedSlot = null;
  } else {
    highlightedSlot = { team, role };
  }
  renderScoreboard();
}

// Helper maps to get icons and labels for shards (Update for Patch 14.2+)
function getShardIconHTML(shardId) {
  switch (shardId) {
    case 5008: return '<i class="fa-solid fa-hand-fist"></i>'; // Adaptive Force
    case 5005: return '<i class="fa-solid fa-wind"></i>'; // Attack Speed
    case 5007: return '<i class="fa-solid fa-stopwatch"></i>'; // Ability Haste
    case 5019: return '<i class="fa-solid fa-shoe-prints"></i>'; // Movement Speed
    case 5010: return '<i class="fa-solid fa-shield-heart"></i>'; // Scaling Health
    case 5013: return '<i class="fa-solid fa-heart"></i>'; // Flat Health
    case 5021: return '<i class="fa-solid fa-person-running"></i>'; // Tenacity and Slow Resist
    default: return '<i class="fa-solid fa-circle-question"></i>';
  }
}

function getShardLabel(shardId) {
  const labels = {
    5008: currentLanguage === 'pt_BR' ? 'Força Adaptativa (+9)' : 'Adaptive Force (+9)',
    5005: currentLanguage === 'pt_BR' ? 'Velocidade de Ataque (+10%)' : 'Attack Speed (+10%)',
    5007: currentLanguage === 'pt_BR' ? 'Aceleração de Habilidade (+8)' : 'Ability Haste (+8)',
    5019: currentLanguage === 'pt_BR' ? 'Velocidade de Movimento (+2%)' : 'Movement Speed (+2%)',
    5010: currentLanguage === 'pt_BR' ? 'Vida Escalável (+10-180)' : 'Scaling Health (+10-180)',
    5013: currentLanguage === 'pt_BR' ? 'Vida Plana (+65)' : 'Flat Health (+65)',
    5021: currentLanguage === 'pt_BR' ? 'Tenacidade e Resistência a Lentidão (+10%)' : 'Tenacity and Slow Resist (+10%)'
  };
  return labels[shardId] || `Shard ID: ${shardId}`;
}

function createSlotElement(team, role) {
  const slotData = scoreboard.getSlot(team, role);
  
  const row = document.createElement('div');
  row.className = 'slot-row';

  // Role Badge
  const roleBadge = document.createElement('div');
  roleBadge.className = 'role-badge';
  roleBadge.textContent = role;
  row.appendChild(roleBadge);

  // Champion Box
  const champBox = document.createElement('div');
  champBox.className = 'champ-box';
  
  const isHighlighted = highlightedSlot && highlightedSlot.team === team && highlightedSlot.role === role;
  if (isHighlighted) {
    champBox.classList.add('highlighted');
  }
  
  if (slotData.champion) {
    const champ = championsDb.find(c => c.id === slotData.champion);
    if (champ) {
      const img = document.createElement('img');
      img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}`;
      img.alt = champ.name;
      img.setAttribute('data-tooltip-type', 'champion');
      img.setAttribute('data-tooltip-id', champ.id);
      champBox.appendChild(img);

      // Highlighting behavior when clicking occupied cell
      champBox.addEventListener('click', () => toggleChampionHighlight(team, role));

      // Clear icon
      const clearIcon = document.createElement('div');
      clearIcon.className = 'clear-badge';
      clearIcon.innerHTML = '&times;';
      clearIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        scoreboard.setChampion(team, role, null);
        if (isHighlighted) {
          highlightedSlot = null;
        }
        renderScoreboard();
      });
      champBox.appendChild(clearIcon);
    }
  } else {
    champBox.innerHTML = '<span class="champ-placeholder">+</span>';
    champBox.addEventListener('click', () => openChampionModal(team, role));
  }
  row.appendChild(champBox);

  // Items Row
  const itemsRow = document.createElement('div');
  itemsRow.className = 'items-row';
  
  for (let i = 0; i < 6; i++) {
    const itemBox = document.createElement('div');
    itemBox.className = 'item-box';
    const itemId = slotData.items[i];
    
    if (itemId) {
      itemBox.classList.add('filled');
      const item = itemsDb[itemId];
      if (item) {
        const img = document.createElement('img');
        img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item.image.full}`;
        img.alt = item.name;
        img.setAttribute('data-tooltip-type', 'item');
        img.setAttribute('data-tooltip-id', itemId);
        itemBox.appendChild(img);

        itemBox.addEventListener('click', (e) => {
          e.stopPropagation();
          scoreboard.removeItem(team, role, i);
          renderScoreboard();
        });
      }
    } else {
      itemBox.innerHTML = '<i class="fa-solid fa-plus"></i>';
      itemBox.addEventListener('click', () => openItemModal(team, role, 'item', i));
    }
    itemsRow.appendChild(itemBox);
  }

  // Trinket slot
  const trinketBox = document.createElement('div');
  trinketBox.className = 'item-box trinket-box';
  if (slotData.trinket) {
    trinketBox.classList.add('filled');
    const trinket = itemsDb[slotData.trinket];
    if (trinket) {
      const img = document.createElement('img');
      img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${trinket.image.full}`;
      img.alt = trinket.name;
      img.setAttribute('data-tooltip-type', 'item');
      img.setAttribute('data-tooltip-id', slotData.trinket);
      trinketBox.appendChild(img);

      trinketBox.addEventListener('click', (e) => {
        e.stopPropagation();
        scoreboard.setTrinket(team, role, null);
        renderScoreboard();
      });
    }
  } else {
    trinketBox.innerHTML = '<i class="fa-solid fa-eye" style="opacity: 0.4;"></i>';
    trinketBox.addEventListener('click', () => openItemModal(team, role, 'trinket'));
  }
  itemsRow.appendChild(trinketBox);
  row.appendChild(itemsRow);

  // Gold indicator
  const goldValue = scoreboard.calculateSlotGold(team, role, itemsDb);
  const goldDiv = document.createElement('div');
  goldDiv.className = 'slot-gold';
  goldDiv.innerHTML = `<i class="fa-solid fa-coins"></i> ${goldValue.toLocaleString()}`;
  row.appendChild(goldDiv);

  return row;
}

function updateTeamGolds() {
  const blueGold = scoreboard.calculateTeamGold('blue', itemsDb);
  const redGold = scoreboard.calculateTeamGold('red', itemsDb);
  
  document.getElementById('blue-total-gold').textContent = blueGold.toLocaleString();
  document.getElementById('red-total-gold').textContent = redGold.toLocaleString();
}

function cleanHTML(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ');
}

// ==========================================================================
// CUMULATIVE STATS COMPILATION & VIEW
// ==========================================================================
function getSlotStats(team, role) {
  const slotData = scoreboard.getSlot(team, role);
  const stats = {
    hp: { base: 0, bonus: 0, total: 0 },
    hpregen: { base: 0, bonus: 0, total: 0 },
    mp: { base: 0, bonus: 0, total: 0 },
    mpregen: { base: 0, bonus: 0, total: 0 },
    armor: { base: 0, bonus: 0, total: 0 },
    spellblock: { base: 0, bonus: 0, total: 0 },
    movespeed: { base: 0, bonus: 0, total: 0 },
    attackdamage: { base: 0, bonus: 0, total: 0 },
    attackspeed: { base: 0, bonus: 0, total: 0 },
    attackrange: { base: 0, bonus: 0, total: 0 },
    ap: { base: 0, bonus: 0, total: 0 },
    ah: { base: 0, bonus: 0, total: 0 },
    crit: { base: 0, bonus: 0, total: 0 },
    lifesteal: { base: 0, bonus: 0, total: 0 },
    lethality: { base: 0, bonus: 0, total: 0 },
    armorpen: { base: 0, bonus: 0, total: 0 },
    magicpen_flat: { base: 0, bonus: 0, total: 0 },
    magicpen_percent: { base: 0, bonus: 0, total: 0 }
  };

  if (!slotData.champion) return stats;

  const champ = championsDb.find(c => c.id === slotData.champion);
  if (!champ) return stats;

  // Set base stats from champion
  const s = champ.stats;
  stats.hp.base = s.hp || 0;
  stats.hpregen.base = s.hpregen || 0;
  stats.mp.base = s.mp || 0;
  stats.mpregen.base = s.mpregen || 0;
  stats.armor.base = s.armor || 0;
  stats.spellblock.base = s.spellblock || 0;
  stats.movespeed.base = s.movespeed || 0;
  stats.attackdamage.base = s.attackdamage || 0;
  stats.attackspeed.base = s.attackspeed || 0;
  stats.attackrange.base = s.attackrange || 0;

  // Process equipped items (6 items + 1 trinket)
  const itemIds = [...slotData.items];
  if (slotData.trinket) itemIds.push(slotData.trinket);

  itemIds.forEach(itemId => {
    const item = itemsDb[itemId];
    if (!item) return;

    const { stats: parsedStats } = parseItemDescriptionStats(item.description);
    parsedStats.forEach(ps => {
      const val = parseFloat(ps.value.replace(/%/g, '').replace(/\+/g, '').replace(/,/g, '.'));
      if (isNaN(val)) return;

      const category = ps.class;
      const nameLower = ps.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const isPercent = ps.value.includes('%');

      if (nameLower.includes('letalidade') || nameLower.includes('lethality')) {
        stats.lethality.bonus += val;
      } else if (nameLower.includes('penetracao de armadura') || nameLower.includes('armor pen')) {
        stats.armorpen.bonus += val;
      } else if (nameLower.includes('penetracao magica') || nameLower.includes('magic pen')) {
        if (isPercent) {
          stats.magicpen_percent.bonus += val;
        } else {
          stats.magicpen_flat.bonus += val;
        }
      } else if (category === 'stat-health') {
        if (ps.name.toLowerCase().includes('regen')) {
          stats.hpregen.bonus += val;
        } else {
          stats.hp.bonus += val;
        }
      } else if (category === 'stat-mana') {
        if (ps.name.toLowerCase().includes('regen')) {
          stats.mpregen.bonus += val;
        } else {
          stats.mp.bonus += val;
        }
      } else if (category === 'stat-ad') {
        stats.attackdamage.bonus += val;
      } else if (category === 'stat-ap') {
        stats.ap.bonus += val;
      } else if (category === 'stat-armor') {
        stats.armor.bonus += val;
      } else if (category === 'stat-mr') {
        stats.spellblock.bonus += val;
      } else if (category === 'stat-ah') {
        stats.ah.bonus += val;
      } else if (category === 'stat-crit') {
        stats.crit.bonus += val;
      } else if (category === 'stat-lifesteal') {
        stats.lifesteal.bonus += val;
      } else if (category === 'stat-ms') {
        if (ps.name.toLowerCase().includes('ataque') || ps.name.toLowerCase().includes('attack')) {
          stats.attackspeed.bonus += val;
        } else {
          stats.movespeed.bonus += val;
        }
      }
    });
  });

  // Calculate totals
  Object.keys(stats).forEach(key => {
    if (key === 'attackspeed') {
      stats.attackspeed.total = stats.attackspeed.base * (1 + stats.attackspeed.bonus / 100);
    } else {
      stats[key].total = stats[key].base + stats[key].bonus;
    }
  });

  return stats;
}

function getStatLabel(key) {
  const labels = {
    hp: currentLanguage === 'pt_BR' ? 'Vida' : 'Health',
    hpregen: currentLanguage === 'pt_BR' ? 'Regen. Vida' : 'Health Regen',
    mp: currentLanguage === 'pt_BR' ? 'Mana' : 'Mana',
    mpregen: currentLanguage === 'pt_BR' ? 'Regen. Mana' : 'Mana Regen',
    armor: currentLanguage === 'pt_BR' ? 'Armadura' : 'Armor',
    spellblock: currentLanguage === 'pt_BR' ? 'Resist. Mágica' : 'Magic Resist',
    movespeed: currentLanguage === 'pt_BR' ? 'Velocidade de Movimento' : 'Move Speed',
    attackdamage: currentLanguage === 'pt_BR' ? 'Dano de Ataque' : 'Attack Damage',
    attackspeed: currentLanguage === 'pt_BR' ? 'Vel. de Ataque' : 'Attack Speed',
    attackrange: currentLanguage === 'pt_BR' ? 'Alcance' : 'Range',
    ap: currentLanguage === 'pt_BR' ? 'Poder de Habilidade' : 'Ability Power',
    ah: currentLanguage === 'pt_BR' ? 'Aceleração de Habilidade' : 'Ability Haste',
    crit: currentLanguage === 'pt_BR' ? 'Chance de Crítico' : 'Critical Strike',
    lifesteal: currentLanguage === 'pt_BR' ? 'Roubo de Vida' : 'Lifesteal',
    lethality: currentLanguage === 'pt_BR' ? 'Letalidade' : 'Lethality',
    armorpen: currentLanguage === 'pt_BR' ? 'Penetração de Armadura' : 'Armor Penetration',
    magicpen_flat: currentLanguage === 'pt_BR' ? 'Penetração Mágica Flat' : 'Flat Magic Penetration',
    magicpen_percent: currentLanguage === 'pt_BR' ? 'Penetração Mágica %' : 'Percent Magic Penetration'
  };
  return labels[key] || key;
}

function formatStatValue(key, val) {
  if (key === 'attackspeed') {
    return val.toFixed(3);
  }
  if (key === 'crit' || key === 'lifesteal' || key === 'armorpen' || key === 'magicpen_percent') {
    return `${Math.round(val)}%`;
  }
  if (key === 'hpregen' || key === 'mpregen') {
    return val.toFixed(1);
  }
  return Math.round(val);
}

function renderChampionDetails() {
  const panel = document.getElementById('champ-details-panel');
  if (!panel) return;
  
  if (!highlightedSlot) {
    panel.classList.remove('active');
    return;
  }

  const slotData = scoreboard.getSlot(highlightedSlot.team, highlightedSlot.role);
  if (!slotData.champion) {
    highlightedSlot = null;
    panel.classList.remove('active');
    return;
  }

  const champ = championsDb.find(c => c.id === slotData.champion);
  if (!champ) {
    panel.classList.remove('active');
    return;
  }

  panel.classList.add('active');
  const content = document.getElementById('champ-details-content');
  
  // Force centered flex column layout programmatically to prevent any stylesheet overrides
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.gap = '1.5rem';

  const slotStats = getSlotStats(highlightedSlot.team, highlightedSlot.role);

  const statRowsKeys = [
    { key: 'hp' },
    { key: 'hpregen' },
    { key: 'mp' },
    { key: 'mpregen' },
    { key: 'armor' },
    { key: 'spellblock' },
    { key: 'attackdamage' },
    { key: 'ap' },
    { key: 'ah' },
    { key: 'attackspeed' },
    { key: 'movespeed' },
    { key: 'attackrange' },
    { key: 'crit' },
    { key: 'lifesteal' },
    { key: 'lethality' },
    { key: 'armorpen' },
    { key: 'magicpen_flat' },
    { key: 'magicpen_percent' }
  ];

  const headers = currentLanguage === 'pt_BR' 
    ? { name: 'Atributo', base: 'Base (Nív. 1)', bonus: 'Bônus (Itens)', total: 'Total' }
    : { name: 'Stat', base: 'Base (Lvl. 1)', bonus: 'Bonus (Items)', total: 'Total' };

  let tableRowsHTML = '';
  statRowsKeys.forEach(statRow => {
    const key = statRow.key;
    const label = getStatLabel(key);
    const data = slotStats[key];
    
    const baseFormatted = formatStatValue(key, data.base);
    const bonusFormatted = data.bonus > 0 ? `+${formatStatValue(key, data.bonus)}` : '0';
    const totalFormatted = formatStatValue(key, data.total);
    
    tableRowsHTML += `
      <tr>
        <td class="stat-name-cell" style="font-weight: 500;">${label}</td>
        <td class="stat-base-val">${baseFormatted}</td>
        <td class="stat-bonus-val" style="color: ${data.bonus > 0 ? 'var(--color-green)' : 'var(--text-muted)'};">${data.bonus > 0 ? bonusFormatted : '-'}</td>
        <td class="stat-total-val" style="font-weight: 700; color: var(--text-main);">${totalFormatted}</td>
      </tr>
    `;
  });

  content.innerHTML = `
    <div class="details-champ-card" style="margin-bottom: 1rem;">
      <img src="https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}" alt="${champ.name}">
      <span class="details-champ-name">${champ.name}</span>
      <span class="details-champ-title">${champ.title}</span>
    </div>
    <div class="details-stats-table-wrapper" style="overflow-x: auto; width: 100%;">
      <table class="stats-comparison-table">
        <thead>
          <tr>
            <th>${headers.name}</th>
            <th>${headers.base}</th>
            <th>${headers.bonus}</th>
            <th>${headers.total}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHTML}
        </tbody>
      </table>
    </div>
  `;
}

function openComparatorChampionModal() {
  activeModalTarget = { type: 'comparator-champ' };
  document.getElementById('input-search-champion').value = '';
  filterChampions('');
  document.getElementById('modal-champion').classList.add('active');
}

function openComparatorItemModal(buildId, type, index = null) {
  activeModalTarget = { type: type === 'trinket' ? 'comparator-trinket' : 'comparator-item', buildId, index };
  document.getElementById('input-search-item').value = '';
  selectedItemFilterTag = 'All';
  setupItemTags();
  filterItems('', 'All');
  document.getElementById('modal-item').classList.add('active');
}

function calculateBuildBonusStats(buildItems, buildTrinket) {
  const stats = {
    hp: 0,
    hpregen: 0,
    mp: 0,
    mpregen: 0,
    armor: 0,
    spellblock: 0,
    movespeed: 0,
    attackdamage: 0,
    attackspeed: 0,
    attackrange: 0,
    ap: 0,
    ah: 0,
    crit: 0,
    lifesteal: 0,
    lethality: 0,
    armorpen: 0,
    magicpen_flat: 0,
    magicpen_percent: 0
  };

  const itemIds = [...buildItems];
  if (buildTrinket) itemIds.push(buildTrinket);

  itemIds.forEach(itemId => {
    const item = itemsDb[itemId];
    if (!item) return;

    const { stats: parsedStats } = parseItemDescriptionStats(item.description);
    parsedStats.forEach(ps => {
      const val = parseFloat(ps.value.replace(/%/g, '').replace(/\+/g, '').replace(/,/g, '.'));
      if (isNaN(val)) return;

      const category = ps.class;
      const nameLower = ps.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const isPercent = ps.value.includes('%');

      if (nameLower.includes('letalidade') || nameLower.includes('lethality')) {
        stats.lethality += val;
      } else if (nameLower.includes('penetracao de armadura') || nameLower.includes('armor pen')) {
        stats.armorpen += val;
      } else if (nameLower.includes('penetracao magica') || nameLower.includes('magic pen')) {
        if (isPercent) {
          stats.magicpen_percent += val;
        } else {
          stats.magicpen_flat += val;
        }
      } else if (category === 'stat-health') {
        if (ps.name.toLowerCase().includes('regen')) {
          stats.hpregen += val;
        } else {
          stats.hp += val;
        }
      } else if (category === 'stat-mana') {
        if (ps.name.toLowerCase().includes('regen')) {
          stats.mpregen += val;
        } else {
          stats.mp += val;
        }
      } else if (category === 'stat-ad') {
        stats.attackdamage += val;
      } else if (category === 'stat-ap') {
        stats.ap += val;
      } else if (category === 'stat-armor') {
        stats.armor += val;
      } else if (category === 'stat-mr') {
        stats.spellblock += val;
      } else if (category === 'stat-ah') {
        stats.ah += val;
      } else if (category === 'stat-crit') {
        stats.crit += val;
      } else if (category === 'stat-lifesteal') {
        stats.lifesteal += val;
      } else if (category === 'stat-ms') {
        if (ps.name.toLowerCase().includes('ataque') || ps.name.toLowerCase().includes('attack')) {
          stats.attackspeed += val;
        } else {
          stats.movespeed += val;
        }
      }
    });
  });

  return stats;
}

function calculateBuildGold(build) {
  let gold = 0;
  build.items.forEach(itemId => {
    if (itemId && itemsDb[itemId]) {
      gold += itemsDb[itemId].gold.total;
    }
  });
  if (build.trinket && itemsDb[build.trinket]) {
    gold += itemsDb[build.trinket].gold.total;
  }
  return gold;
}

function renderComparator() {
  const container = document.getElementById('comparator-builds-list');
  if (!container) return;

  // 1. Render Champion Selector Box
  const champSlot = document.getElementById('comparator-champ-slot');
  const champName = document.getElementById('comparator-champ-name');
  const champTitle = document.getElementById('comparator-champ-title');

  if (comparator.state.championId) {
    const champ = championsDb.find(c => c.id === comparator.state.championId);
    if (champ) {
      champSlot.innerHTML = `
        <img src="https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}" alt="${champ.name}" data-tooltip-type="champion" data-tooltip-id="${champ.id}">
        <div class="clear-badge" style="position: absolute; top: -2px; right: -2px; background: var(--color-red-team); color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; cursor: pointer; border: 1px solid var(--border-color);">&times;</div>
      `;
      champName.textContent = champ.name;
      champTitle.textContent = champ.title;

      // Handle clear badge click
      const clearBtn = champSlot.querySelector('.clear-badge');
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        comparator.setChampion(null);
        renderComparator();
      });
    }
  } else {
    champSlot.innerHTML = '<span class="champ-placeholder">+</span>';
    champName.textContent = currentLanguage === 'pt_BR' ? 'Selecionar Campeão' : 'Select Champion';
    champTitle.textContent = currentLanguage === 'pt_BR' ? 'Escolha um campeão para comparar suas builds' : 'Choose a champion to compare their builds';
  }

  // Bind slot click if empty
  champSlot.onclick = () => {
    if (!comparator.state.championId) {
      openComparatorChampionModal();
    }
  };

  // 2. Render Builds List
  container.innerHTML = '';
  comparator.state.builds.forEach((build) => {
    const row = document.createElement('div');
    row.className = 'slot-row comparator-build-row';
    row.setAttribute('data-build-id', build.id);

    // Name container with build name and price gold badge
    const nameContainer = document.createElement('div');
    nameContainer.className = 'build-name-container';
    nameContainer.style.cssText = 'width: 180px; flex-shrink: 0; display: flex; flex-direction: column; gap: 0.25rem;';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.className = 'build-name-input';
    inputName.value = build.name;
    inputName.style.cssText = 'width: 100%; background: rgba(0, 0, 0, 0.2); border: 1px dashed var(--border-color); color: var(--text-main); font-weight: 600; padding: 0.4rem 0.6rem; border-radius: 6px;';
    inputName.addEventListener('change', (e) => {
      comparator.updateBuildName(build.id, e.target.value);
      renderComparator();
    });
    nameContainer.appendChild(inputName);

    const goldVal = calculateBuildGold(build);
    const goldIndicator = document.createElement('div');
    goldIndicator.className = 'slot-gold';
    goldIndicator.style.cssText = 'font-size: 0.85rem; color: var(--text-gold); font-weight: 600; display: flex; align-items: center; gap: 0.25rem; margin-top: 0.15rem;';
    goldIndicator.innerHTML = `<i class="fa-solid fa-coins"></i> ${goldVal.toLocaleString()}`;
    nameContainer.appendChild(goldIndicator);

    row.appendChild(nameContainer);

    // Items Row container
    const itemsRow = document.createElement('div');
    itemsRow.className = 'items-row';
    itemsRow.style.cssText = 'flex-grow: 1; display: flex; gap: 0.5rem;';

    // 6 Items
    for (let i = 0; i < 6; i++) {
      const itemBox = document.createElement('div');
      itemBox.className = 'item-box';
      const itemId = build.items[i];

      if (itemId) {
        itemBox.classList.add('filled');
        const item = itemsDb[itemId];
        if (item) {
          const img = document.createElement('img');
          img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item.image.full}`;
          img.alt = item.name;
          img.setAttribute('data-tooltip-type', 'item');
          img.setAttribute('data-tooltip-id', itemId);
          itemBox.appendChild(img);

          // Remove item on click
          itemBox.addEventListener('click', (e) => {
            e.stopPropagation();
            comparator.removeItem(build.id, i);
            renderComparator();
          });
        }
      } else {
        itemBox.innerHTML = '<i class="fa-solid fa-plus"></i>';
        itemBox.addEventListener('click', () => {
          openComparatorItemModal(build.id, 'item', i);
        });
      }
      itemsRow.appendChild(itemBox);
    }

    // Trinket Slot
    const trinketBox = document.createElement('div');
    trinketBox.className = 'item-box trinket-box';
    const trinketId = build.trinket;

    if (trinketId) {
      trinketBox.classList.add('filled');
      const trinket = itemsDb[trinketId];
      if (trinket) {
        const img = document.createElement('img');
        img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${trinket.image.full}`;
        img.alt = trinket.name;
        img.setAttribute('data-tooltip-type', 'item');
        img.setAttribute('data-tooltip-id', trinketId);
        trinketBox.appendChild(img);

        // Remove trinket on click
        trinketBox.addEventListener('click', (e) => {
          e.stopPropagation();
          comparator.setTrinket(build.id, null);
          renderComparator();
        });
      }
    } else {
      trinketBox.innerHTML = '<i class="fa-solid fa-eye" style="opacity: 0.4;"></i>';
      trinketBox.addEventListener('click', () => {
        openComparatorItemModal(build.id, 'trinket');
      });
    }
    itemsRow.appendChild(trinketBox);
    row.appendChild(itemsRow);

    // Delete Build button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger-outline delete-build-btn';
    deleteBtn.style.cssText = 'padding: 0.5rem; border-radius: 6px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.addEventListener('click', () => {
      comparator.removeBuild(build.id);
      renderComparator();
    });
    row.appendChild(deleteBtn);

    container.appendChild(row);
  });

  // 3. Render Comparative Table
  const tableCard = document.getElementById('comparator-table-card');
  const table = document.getElementById('comparator-stats-table');

  if (comparator.state.builds.length === 0) {
    tableCard.style.display = 'none';
    return;
  }

  tableCard.style.display = 'block';

  // Define stats to compare (including lethality, armor pen, magic pen)
  const statsKeys = [
    'hp', 'hpregen', 'mp', 'mpregen', 'armor', 'spellblock',
    'attackdamage', 'ap', 'ah', 'attackspeed', 'movespeed',
    'attackrange', 'crit', 'lifesteal',
    'lethality', 'armorpen', 'magicpen_flat', 'magicpen_percent'
  ];

  // Get compared champion base stats
  const champ = comparator.state.championId
    ? championsDb.find(c => c.id === comparator.state.championId)
    : null;

  // Build table headers
  let headersHTML = `
    <tr>
      <th>${currentLanguage === 'pt_BR' ? 'Atributo' : 'Stat'}</th>
  `;
  comparator.state.builds.forEach(build => {
    headersHTML += `<th>${build.name}</th>`;
  });
  headersHTML += '</tr>';

  // Build table rows
  let rowsHTML = '';
  statsKeys.forEach(key => {
    const label = getStatLabel(key);
    let rowHTML = `<tr><td class="stat-name-cell" style="font-weight: 600;">${label}</td>`;

    comparator.state.builds.forEach(build => {
      const buildStats = calculateBuildBonusStats(build.items, build.trinket);
      const bonus = buildStats[key] || 0;

      // Formatting bonus
      let bonusText = '-';
      if (bonus > 0) {
        if (key === 'attackspeed') {
          bonusText = `+${bonus.toFixed(1)}%`;
        } else if (key === 'crit' || key === 'lifesteal' || key === 'armorpen' || key === 'magicpen_percent') {
          bonusText = `+${Math.round(bonus)}%`;
        } else if (key === 'hpregen' || key === 'mpregen') {
          bonusText = `+${bonus.toFixed(1)}`;
        } else {
          bonusText = `+${Math.round(bonus)}`;
        }
      }

      // Total if champion selected
      let totalText = '';
      if (champ) {
        const base = champ.stats[key] || 0;
        let total = base + bonus;
        if (key === 'attackspeed') {
          total = base * (1 + bonus / 100);
          totalText = `<span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${total.toFixed(3)} total</span>`;
        } else if (key === 'crit' || key === 'lifesteal' || key === 'armorpen' || key === 'magicpen_percent') {
          totalText = `<span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${Math.round(total)}% total</span>`;
        } else if (key === 'hpregen' || key === 'mpregen') {
          totalText = `<span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${total.toFixed(1)} total</span>`;
        } else {
          totalText = `<span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${Math.round(total)} total</span>`;
        }
      }

      rowHTML += `
        <td>
          <span class="stat-bonus-val" style="color: ${bonus > 0 ? 'var(--color-green)' : 'var(--text-muted)'}; font-weight: 700;">${bonusText}</span>
          ${totalText}
        </td>
      `;
    });

    rowHTML += '</tr>';
    rowsHTML += rowHTML;
  });

  table.innerHTML = `
    <thead>
      ${headersHTML}
    </thead>
    <tbody>
      ${rowsHTML}
    </tbody>
  `;
}

// ==========================================================================
// CHAMPIONS & ITEMS MODAL DIALOGS
// ==========================================================================
function openChampionModal(team, role) {
  activeModalTarget = { team, role, type: 'champ' };
  document.getElementById('input-search-champion').value = '';
  filterChampions('');
  document.getElementById('modal-champion').classList.add('active');
}

function filterChampions(query) {
  const grid = document.getElementById('modal-champions-grid');
  grid.innerHTML = '';
  
  const filtered = championsDb.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(champ => {
    const btn = document.createElement('button');
    btn.className = 'modal-champ-btn';
    btn.addEventListener('click', () => {
      if (activeModalTarget.type === 'comparator-champ') {
        comparator.setChampion(champ.id);
        document.getElementById('modal-champion').classList.remove('active');
        renderComparator();
      } else {
        scoreboard.setChampion(activeModalTarget.team, activeModalTarget.role, champ.id);
        document.getElementById('modal-champion').classList.remove('active');
        renderScoreboard();
      }
    });

    const img = document.createElement('img');
    img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}`;
    img.alt = champ.name;

    const span = document.createElement('span');
    span.textContent = champ.name;

    btn.appendChild(img);
    btn.appendChild(span);
    grid.appendChild(btn);
  });
}

function openItemModal(team, role, type, index = null) {
  activeModalTarget = { team, role, type, index };
  document.getElementById('input-search-item').value = '';
  selectedItemFilterTag = 'All';
  setupItemTags();
  filterItems('', 'All');
  document.getElementById('modal-item').classList.add('active');
}

function setupItemTags() {
  const tagsRow = document.getElementById('modal-item-tags');
  tagsRow.innerHTML = '';

  const tags = ['All', 'Damage', 'SpellDamage', 'Armor', 'SpellBlock', 'Health', 'Mana', 'CooldownReduction', 'AttackSpeed', 'CriticalStrike', 'LifeSteal', 'Boots'];
  
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = `tag-filter-btn ${tag === selectedItemFilterTag ? 'active' : ''}`;
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      selectedItemFilterTag = tag;
      setupItemTags();
      filterItems(document.getElementById('input-search-item').value, tag);
    });
    tagsRow.appendChild(btn);
  });
}

function filterItems(query, activeTag) {
  const grid = document.getElementById('modal-items-grid');
  grid.innerHTML = '';

  let items = Object.entries(itemsDb)
    .map(([id, item]) => ({ id, ...item }))
    .filter(item => item.gold && item.gold.purchasable && item.maps && item.maps['11']);

  // Deduplicar itens com o mesmo nome, mantendo apenas a versão padrão (ID numérico menor)
  const groupedByName = {};
  items.forEach(item => {
    if (!groupedByName[item.name]) {
      groupedByName[item.name] = [];
    }
    groupedByName[item.name].push(item);
  });
  items = Object.values(groupedByName).map(group => {
    if (group.length === 1) return group[0];
    group.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    return group[0];
  });


  if (activeModalTarget.type === 'trinket') {
    items = items.filter(item => item.tags && item.tags.includes('Trinket'));
  } else {
    items = items.filter(item => !item.tags || !item.tags.includes('Trinket'));
  }

  if (query) {
    items = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }

  if (activeTag !== 'All') {
    items = items.filter(item => item.tags && item.tags.includes(activeTag));
  }

  items.sort((a, b) => a.gold.total - b.gold.total);

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'modal-item-btn';
    btn.setAttribute('data-tooltip-type', 'item');
    btn.setAttribute('data-tooltip-id', item.id);
    btn.addEventListener('click', () => {
      if (activeModalTarget.type === 'comparator-item') {
        comparator.setItem(activeModalTarget.buildId, activeModalTarget.index, item.id);
        document.getElementById('modal-item').classList.remove('active');
        renderComparator();
      } else if (activeModalTarget.type === 'comparator-trinket') {
        comparator.setTrinket(activeModalTarget.buildId, item.id);
        document.getElementById('modal-item').classList.remove('active');
        renderComparator();
      } else if (activeModalTarget.type === 'trinket') {
        scoreboard.setTrinket(activeModalTarget.team, activeModalTarget.role, item.id);
        document.getElementById('modal-item').classList.remove('active');
        renderScoreboard();
      } else {
        scoreboard.addItem(activeModalTarget.team, activeModalTarget.role, item.id);
        document.getElementById('modal-item').classList.remove('active');
        renderScoreboard();
      }
    });

    const img = document.createElement('img');
    img.src = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item.image.full}`;
    img.alt = item.name;

    const info = document.createElement('div');
    info.className = 'modal-item-info';
    
    const name = document.createElement('span');
    name.className = 'modal-item-name';
    name.textContent = item.name;

    const cost = document.createElement('span');
    cost.className = 'modal-item-cost';
    cost.innerHTML = `<i class="fa-solid fa-coins"></i> ${item.gold.total}`;

    info.appendChild(name);
    info.appendChild(cost);
    btn.appendChild(img);
    btn.appendChild(info);
    grid.appendChild(btn);
  });
}

// ==========================================================================
// SIMULADOR DE DANOS E EFEITOS
// ==========================================================================
function updateSimulatorLabels() {
  const dmgType = document.getElementById('select-damage-type').value;
  const labelResistance = document.getElementById('label-resistance');
  
  if (dmgType === 'physical') {
    labelResistance.textContent = getTranslation('sim.resistance.armor');
  } else if (dmgType === 'magic') {
    labelResistance.textContent = getTranslation('sim.resistance.mr');
  } else {
    labelResistance.textContent = getTranslation('sim.resistance');
  }
}

function runSimulatorCalculations() {
  // 1. Damage simulation
  const rawDamage = parseFloat(document.getElementById('input-raw-damage').value) || 0;
  const dmgType = document.getElementById('select-damage-type').value;
  const resistance = parseFloat(document.getElementById('input-target-resistance').value) || 0;

  const finalDamage = calculateDamage(rawDamage, dmgType, resistance);
  const damageDiff = rawDamage - finalDamage;
  const percentReduction = rawDamage > 0 ? (damageDiff / rawDamage) * 100 : 0;

  document.getElementById('val-effective-damage').textContent = finalDamage.toFixed(2);
  document.getElementById('val-damage-reduction').textContent = `${percentReduction.toFixed(1)}% de redução`;

  // 2. CC simulation
  const originalCc = parseFloat(document.getElementById('input-original-cc').value) || 0;
  const tenacity = parseFloat(document.getElementById('input-target-tenacity').value) || 0;
  const clampCc = document.getElementById('check-clamp-cc').checked;

  const finalCc = calculateCCDuration(originalCc, tenacity, { clampMinDuration: clampCc });
  const ccDiffPercent = originalCc > 0 ? ((originalCc - finalCc) / originalCc) * 100 : 0;

  document.getElementById('val-effective-cc').textContent = `${finalCc.toFixed(2)}s`;
  document.getElementById('val-cc-reduction').textContent = `${ccDiffPercent.toFixed(1)}% menor`;

  // 3. Ability Haste simulation
  const abilityHaste = parseFloat(document.getElementById('input-ability-haste').value) || 0;
  const baseCooldown = parseFloat(document.getElementById('input-base-cooldown').value) || 0;
  const cdr = calculateCDR(abilityHaste);

  const finalCooldown = baseCooldown * (1 - cdr / 100);

  document.getElementById('val-cdr-percent').textContent = `${cdr.toFixed(2)}%`;
  document.getElementById('haste-bar-fill').style.width = `${cdr}%`;
  document.getElementById('val-final-cooldown-sec').textContent = `${finalCooldown.toFixed(2)}s`;
}

// ==========================================================================
// RUNAS (RUNES PLANNER) RENDERING & PERSISTENCE
// ==========================================================================
function setupRunesPaths() {
  const primaryPathsRow = document.getElementById('primary-path-select');
  const secondaryPathsRow = document.getElementById('secondary-path-select');
  
  primaryPathsRow.innerHTML = '';
  secondaryPathsRow.innerHTML = '';

  runesDb.forEach(path => {
    const pBtn = createPathButton(path, () => {
      runePlanner.setPrimaryPath(path.id);
      renderRunePlanner();
    }, runePlanner.state.primaryPathId === path.id);
    primaryPathsRow.appendChild(pBtn);

    const sBtn = createPathButton(path, () => {
      if (runePlanner.setSecondaryPath(path.id)) {
        renderRunePlanner();
      }
    }, runePlanner.state.secondaryPathId === path.id);
    secondaryPathsRow.appendChild(sBtn);
  });

  renderRunePlanner();
  renderSavedRunesList();
}

function createPathButton(path, onClick, isActive) {
  const btn = document.createElement('button');
  btn.className = `path-btn ${isActive ? 'active' : ''}`;
  btn.setAttribute('data-tooltip', path.name);
  btn.addEventListener('click', onClick);

  const img = document.createElement('img');
  img.src = `https://ddragon.leagueoflegends.com/cdn/img/${path.icon}`;
  img.alt = path.name;
  
  btn.appendChild(img);
  return btn;
}

function renderRunePlanner() {
  if (runeViewMode === 'read') {
    document.getElementById('rune-builder-main').style.display = 'none';
    document.getElementById('rune-summary-view').style.display = 'grid';
    renderRuneSummary();
    return;
  }

  document.getElementById('rune-builder-main').style.display = 'grid';
  document.getElementById('rune-summary-view').style.display = 'none';

  const pSlots = document.getElementById('primary-slots');
  const sSlots = document.getElementById('secondary-slots');
  const shardsSlots = document.getElementById('shards-slots');
  
  // Render Primary Tree Slots
  if (runePlanner.state.primaryPathId) {
    pSlots.innerHTML = '';
    const path = runesDb.find(p => p.id === Number(runePlanner.state.primaryPathId));
    if (path) {
      path.slots.forEach((slot, slotIndex) => {
        const row = document.createElement('div');
        row.className = `rune-row ${slotIndex === 0 ? 'keystones' : ''}`;
        
        slot.runes.forEach(rune => {
          const btn = document.createElement('button');
          const isSelected = slotIndex === 0 
            ? Number(runePlanner.state.keystoneId) === rune.id 
            : Number(runePlanner.state.primaryRuneIds[slotIndex - 1]) === rune.id;

          btn.className = `rune-item-btn ${isSelected ? 'active' : ''}`;
          btn.setAttribute('data-tooltip-type', 'rune');
          btn.setAttribute('data-tooltip-id', rune.id);
          btn.addEventListener('click', () => {
            if (slotIndex === 0) {
              runePlanner.setKeystone(rune.id);
            } else {
              runePlanner.setPrimaryRune(slotIndex - 1, rune.id);
            }
            renderRunePlanner();
          });

          const img = document.createElement('img');
          img.src = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
          img.alt = rune.name;

          btn.appendChild(img);
          row.appendChild(btn);
        });
        
        pSlots.appendChild(row);
      });
    }
  } else {
    pSlots.innerHTML = `<div class="placeholder-msg">${getTranslation('runes.selectPathMsg')}</div>`;
  }

  // Render Secondary Tree Slots
  if (runePlanner.state.secondaryPathId) {
    sSlots.innerHTML = '';
    const path = runesDb.find(p => p.id === Number(runePlanner.state.secondaryPathId));
    if (path) {
      path.slots.slice(1).forEach((slot, relativeIndex) => {
        const row = document.createElement('div');
        row.className = 'rune-row';

        slot.runes.forEach(rune => {
          const btn = document.createElement('button');
          const isSelected = runePlanner.state.secondaryRuneIds.map(Number).includes(rune.id);

          btn.className = `rune-item-btn ${isSelected ? 'active' : ''}`;
          btn.setAttribute('data-tooltip-type', 'rune');
          btn.setAttribute('data-tooltip-id', rune.id);
          btn.addEventListener('click', () => {
            if (isSelected) {
              const idx = runePlanner.state.secondaryRuneIds.map(Number).indexOf(rune.id);
              runePlanner.setSecondaryRune(idx, null);
            } else {
              let freeIdx = runePlanner.state.secondaryRuneIds.indexOf(null);
              if (freeIdx === -1) {
                freeIdx = 0;
              }
              runePlanner.setSecondaryRune(freeIdx, rune.id);
            }
            renderRunePlanner();
          });

          const img = document.createElement('img');
          img.src = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
          img.alt = rune.name;

          btn.appendChild(img);
          row.appendChild(btn);
        });

        sSlots.appendChild(row);
      });
    }
  } else {
    sSlots.innerHTML = `<div class="placeholder-msg">${getTranslation('runes.selectPathMsg')}</div>`;
  }

  // Render Stat Shards with Icons (Update for Patch 14.2+)
  shardsSlots.innerHTML = '';
  const shardsDb = [
    [ { id: 5008 }, { id: 5005 }, { id: 5007 } ], // Row 1 (Offense): Adaptive, AS, AH
    [ { id: 5008 }, { id: 5019 }, { id: 5010 } ], // Row 2 (Flex): Adaptive, MS, Scaling Health
    [ { id: 5013 }, { id: 5021 }, { id: 5010 } ]  // Row 3 (Defense): Flat Health, Tenacity/Slow Resist, Scaling Health
  ];

  shardsDb.forEach((rowOptions, rowIndex) => {
    const row = document.createElement('div');
    row.className = 'shard-row';

    rowOptions.forEach(shard => {
      const btn = document.createElement('button');
      const isSelected = Number(runePlanner.state.shardIds[rowIndex]) === shard.id;
      
      btn.className = `shard-btn ${isSelected ? 'active' : ''}`;
      btn.innerHTML = getShardIconHTML(shard.id);
      btn.setAttribute('data-tooltip', getShardLabel(shard.id));
      btn.addEventListener('click', () => {
        runePlanner.setShard(rowIndex, shard.id);
        renderRunePlanner();
      });

      row.appendChild(btn);
    });

    shardsSlots.appendChild(row);
  });
}

// ==========================================================================
// RUNE SUMMARY (Modo Leitura) RENDERING
// ==========================================================================
function renderRuneSummary() {
  const view = document.getElementById('rune-summary-view');
  
  if (!runePlanner.state.primaryPathId || !runePlanner.state.secondaryPathId || !runePlanner.state.keystoneId) {
    view.innerHTML = `<div class="placeholder-msg">${getTranslation('runes.incomplete')}</div>`;
    return;
  }

  const primaryPath = runesDb.find(p => p.id === Number(runePlanner.state.primaryPathId));
  const secondaryPath = runesDb.find(p => p.id === Number(runePlanner.state.secondaryPathId));
  if (!primaryPath || !secondaryPath) return;

  // 1. Compile Primary runes list details
  let primaryRunesHTML = '';
  // Keystone - search all slots for absolute robustness
  let keystone = null;
  if (runePlanner.state.keystoneId) {
    for (let slot of primaryPath.slots) {
      keystone = slot.runes.find(r => r.id === Number(runePlanner.state.keystoneId));
      if (keystone) break;
    }
  }
  if (keystone) {
    primaryRunesHTML += createSummaryRuneRow(keystone);
  }
  // Minor runes - search all minor slots for absolute robustness
  runePlanner.state.primaryRuneIds.forEach((runeId) => {
    if (runeId) {
      let foundRune = null;
      for (let slot of primaryPath.slots.slice(1)) {
        foundRune = slot.runes.find(r => r.id === Number(runeId));
        if (foundRune) break;
      }
      if (foundRune) {
        primaryRunesHTML += createSummaryRuneRow(foundRune);
      }
    }
  });

  // 2. Compile Secondary runes list details
  let secondaryRunesHTML = '';
  runePlanner.state.secondaryRuneIds.forEach(runeId => {
    if (runeId) {
      let foundRune = null;
      for (let slot of secondaryPath.slots.slice(1)) {
        foundRune = slot.runes.find(r => r.id === Number(runeId));
        if (foundRune) break;
      }
      if (foundRune) {
        secondaryRunesHTML += createSummaryRuneRow(foundRune);
      }
    }
  });

  // 3. Compile Shards details list
  let shardsHTML = '';
  runePlanner.state.shardIds.forEach(shardId => {
    if (shardId) {
      const numericShardId = Number(shardId);
      shardsHTML += `
        <div class="summary-shard-item">
          ${getShardIconHTML(numericShardId)}
          <span>${getShardLabel(numericShardId)}</span>
        </div>
      `;
    }
  });

  view.innerHTML = `
    <!-- Primary Path Summary -->
    <div class="summary-path-card">
      <div class="summary-path-header">
        <img src="https://ddragon.leagueoflegends.com/cdn/img/${primaryPath.icon}" alt="${primaryPath.name}">
        <span>${primaryPath.name} (${getTranslation('runes.primaryTree')})</span>
      </div>
      <div class="summary-runes-list">
        ${primaryRunesHTML || '<div class="help-text">Nenhuma runa selecionada</div>'}
      </div>
    </div>

    <!-- Secondary Path Summary -->
    <div class="summary-path-card">
      <div class="summary-path-header">
        <img src="https://ddragon.leagueoflegends.com/cdn/img/${secondaryPath.icon}" alt="${secondaryPath.name}">
        <span>${secondaryPath.name} (${getTranslation('runes.secondaryTree')})</span>
      </div>
      <div class="summary-runes-list">
        ${secondaryRunesHTML || '<div class="help-text">Nenhuma runa selecionada</div>'}
      </div>
    </div>

    <!-- Shards Summary -->
    <div class="summary-path-card">
      <div class="summary-path-header">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span>${getTranslation('runes.shards')}</span>
      </div>
      <div class="summary-shards-list">
        ${shardsHTML || '<div class="help-text">Nenhum shard selecionado</div>'}
      </div>
    </div>
  `;
}

function createSummaryRuneRow(rune) {
  return `
    <div class="summary-rune-row">
      <img src="https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}" alt="${rune.name}">
      <div class="summary-rune-info">
        <span class="summary-rune-name">${rune.name}</span>
        <span class="summary-rune-desc" style="font-size: 0.82rem; line-height: 1.4; margin-top: 0.2rem;">${cleanHTML(rune.longDesc || rune.shortDesc)}</span>
      </div>
    </div>
  `;
}

function renderSavedRunesList() {
  const container = document.getElementById('saved-runes-list');
  container.innerHTML = '';

  const savedKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('lw-runes-'))
    .map(key => key.replace('lw-runes-', ''));

  if (savedKeys.length === 0) {
    container.innerHTML = `<div class="no-pages-message">${getTranslation('runes.noPages')}</div>`;
    return;
  }

  savedKeys.forEach(name => {
    const item = document.createElement('div');
    item.className = 'saved-rune-item';

    const info = document.createElement('div');
    info.className = 'saved-rune-info';
    info.addEventListener('click', () => {
      if (runePlanner.load(name)) {
        document.getElementById('input-rune-page-name').value = name;
        setupRunesPaths();
      }
    });

    const nameSpan = document.createElement('span');
    nameSpan.className = 'saved-rune-name';
    nameSpan.textContent = name;

    const metaSpan = document.createElement('span');
    metaSpan.className = 'saved-rune-meta';
    metaSpan.textContent = 'Clique para carregar';

    info.appendChild(nameSpan);
    info.appendChild(metaSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-rune-btn';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.removeItem(`lw-runes-${name}`);
      renderSavedRunesList();
    });

    item.appendChild(info);
    item.appendChild(deleteBtn);
    container.appendChild(item);
  });
}

// ==========================================================================
// MAPA INTERATIVO (MAP NAVIGATOR) BINDINGS
// ==========================================================================
let isDraggingMap = false;
let startDragX = 0;
let startDragY = 0;

function centerMap() {
  const viewport = document.getElementById('map-viewport');
  if (!viewport) return;
  const rect = viewport.getBoundingClientRect();
  mapNavigator.reset();
  mapNavigator.pan((rect.width - 1000) / 2, (rect.height - 1000) / 2);
  updateMapCSS();
}

function setupMapControls() {
  const viewport = document.getElementById('map-viewport');
  const canvas = document.getElementById('map-canvas');
  let lastTap = 0;

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = viewport.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    mapNavigator.zoomAt(delta, clientX, clientY);
    updateMapCSS();
  });

  viewport.addEventListener('mousedown', (e) => {
    isDraggingMap = true;
    startDragX = e.clientX;
    startDragY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingMap) return;
    const dx = e.clientX - startDragX;
    const dy = e.clientY - startDragY;
    mapNavigator.pan(dx, dy);
    
    startDragX = e.clientX;
    startDragY = e.clientY;
    updateMapCSS();
  });

  window.addEventListener('mouseup', () => {
    isDraggingMap = false;
  });

  // Touch support for mobile devices
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDraggingMap = true;
      startDragX = e.touches[0].clientX;
      startDragY = e.touches[0].clientY;
      
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        const rect = canvas.getBoundingClientRect();
        const xPercent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        placeMapPin(xPercent, yPercent, activePinType);
        e.preventDefault();
      }
      lastTap = currentTime;
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingMap || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startDragX;
    const dy = e.touches[0].clientY - startDragY;
    mapNavigator.pan(dx, dy);
    
    startDragX = e.touches[0].clientX;
    startDragY = e.touches[0].clientY;
    updateMapCSS();
    
    // Prevent default body scrolling while panning inside map viewport
    if (e.target.closest('#map-viewport')) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    isDraggingMap = false;
  });

  document.getElementById('btn-map-zoom-in').addEventListener('click', () => {
    const w = viewport.offsetWidth / 2;
    const h = viewport.offsetHeight / 2;
    mapNavigator.zoomAt(0.15, w, h);
    updateMapCSS();
  });

  document.getElementById('btn-map-zoom-out').addEventListener('click', () => {
    const w = viewport.offsetWidth / 2;
    const h = viewport.offsetHeight / 2;
    mapNavigator.zoomAt(-0.15, w, h);
    updateMapCSS();
  });

  document.getElementById('btn-map-reset').addEventListener('click', () => {
    centerMap();
  });

  viewport.addEventListener('dblclick', (e) => {
    const rect = canvas.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    
    placeMapPin(xPercent, yPercent, activePinType);
  });

  document.getElementById('btn-map-clear-pins').addEventListener('click', () => {
    document.getElementById('map-pins-layer').innerHTML = '';
  });

  const paletteBtns = document.querySelectorAll('.palette-btn');
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePinType = btn.getAttribute('data-pin-type');
    });
  });

  // Center initial view
  setTimeout(centerMap, 100);
}

function placeMapPin(xPercent, yPercent, type) {
  const layer = document.getElementById('map-pins-layer');
  
  const pin = document.createElement('div');
  pin.className = `map-pin pin-${type}`;
  pin.style.left = `${xPercent}%`;
  pin.style.top = `${yPercent}%`;
  
  if (type === 'ward-green') {
    pin.innerHTML = '<i class="fa-solid fa-eye"></i>';
  } else if (type === 'ping') {
    pin.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
  }

  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    pin.remove();
  });

  layer.appendChild(pin);
}

function updateMapCSS() {
  const canvas = document.getElementById('map-canvas');
  const state = mapNavigator.getState();
  canvas.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
}

// ==========================================================================
// SCENARIO SAVE / LOAD / EXPORT / IMPORT
// ==========================================================================
function setupEventListeners() {
  // Close details panel button listener
  const closeDetailsBtn = document.getElementById('close-details-btn');
  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener('click', () => {
      highlightedSlot = null;
      renderScoreboard();
    });
  }

  // Simulator input events
  const simInputs = ['input-raw-damage', 'select-damage-type', 'input-target-resistance', 'input-original-cc', 'input-target-tenacity', 'check-clamp-cc', 'input-ability-haste', 'input-base-cooldown'];
  simInputs.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', runSimulatorCalculations);
    el.addEventListener('change', runSimulatorCalculations);
  });
  document.getElementById('select-damage-type').addEventListener('change', updateSimulatorLabels);

  // Search champions in modal
  document.getElementById('input-search-champion').addEventListener('input', (e) => {
    filterChampions(e.target.value);
  });

  // Search items in modal
  document.getElementById('input-search-item').addEventListener('input', (e) => {
    filterItems(e.target.value, selectedItemFilterTag);
  });

  // Close modal buttons
  document.getElementById('close-modal-champion').addEventListener('click', () => {
    document.getElementById('modal-champion').classList.remove('active');
  });
  document.getElementById('close-modal-item').addEventListener('click', () => {
    document.getElementById('modal-item').classList.remove('active');
  });

  // Comparator add build button
  document.getElementById('btn-comparator-add-build').addEventListener('click', () => {
    comparator.addBuild(currentLanguage === 'pt_BR' ? 'Nova Build' : 'New Build');
    renderComparator();
  });

  // Save runes to localStorage button
  document.getElementById('btn-save-runes').addEventListener('click', () => {
    const pageName = document.getElementById('input-rune-page-name').value.trim();
    if (!pageName) {
      alert(getTranslation('msg.runePageNameEmpty'));
      return;
    }
    runePlanner.save(pageName);
    alert(getTranslation('msg.runePageSaved'));
    renderSavedRunesList();
  });

  // Runes view mode toggle (Edit Mode vs Reading Mode)
  document.getElementById('btn-toggle-rune-mode').addEventListener('click', () => {
    const btnText = document.getElementById('text-toggle-rune-mode');
    const btnIcon = document.getElementById('btn-toggle-rune-mode').querySelector('i');

    if (runeViewMode === 'edit') {
      runeViewMode = 'read';
      btnText.setAttribute('data-i18n', 'runes.modeEdit');
      btnText.textContent = getTranslation('runes.modeEdit');
      btnIcon.className = 'fa-solid fa-pen-to-square';
    } else {
      runeViewMode = 'edit';
      btnText.setAttribute('data-i18n', 'runes.modeRead');
      btnText.textContent = getTranslation('runes.modeRead');
      btnIcon.className = 'fa-solid fa-eye';
    }
    renderRunePlanner();
  });

  // Reset board
  document.getElementById('btn-reset-board').addEventListener('click', () => {
    if (confirm(getTranslation('msg.confirmReset'))) {
      scoreboard.state = scoreboard._getInitialState();
      highlightedSlot = null;
      renderScoreboard();
    }
  });

  // Export board to JSON
  document.getElementById('btn-export-board').addEventListener('click', () => {
    const filename = prompt(getTranslation('msg.exportName'), 'league-whiteboard-cenario');
    if (!filename) return;

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scoreboard.exportState(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${filename}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import board trigger
  document.getElementById('btn-import-board').addEventListener('click', () => {
    document.getElementById('file-import-board').click();
  });

  // Handle uploaded JSON file
  document.getElementById('file-import-board').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        scoreboard.importState(imported);
        highlightedSlot = null;
        renderScoreboard();
      } catch (err) {
        alert('Erro ao importar cenário: Arquivo JSON inválido ou corrompido.');
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  });

  setupMapControls();
}
