// State
let favorites = JSON.parse(localStorage.getItem('ds-favorites') || '[]');
let archives = JSON.parse(localStorage.getItem('ds-archives') || '[]');
let isDarkMode = localStorage.getItem('theme') !== 'light';
let currentClasse = 'Todos';
let currentTema = 'Todos';
let currentTecnica = 'Todos';
let currentProblema = 'Todos';
let showFavoritesOnly = false;
let searchQuery = '';

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const archivedList = document.getElementById('archived-list');
const archivedSection = document.getElementById('archived-section');
const archivedCount = document.getElementById('archived-count');
const searchInput = document.getElementById('search-input');
const activeCount = document.getElementById('active-count');
const classeSelect = document.getElementById('classe-select');
const temaSelect = document.getElementById('tema-select');
const tecnicaSelect = document.getElementById('tecnica-select');
const problemaSelect = document.getElementById('problema-select');
const btnFavoritos = document.getElementById('filter-btn-favoritos');
const noToolsMessage = document.getElementById('no-tools-message');
const themeToggle = document.getElementById('theme-toggle');

const moonIcon = `<svg class="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
const sunIcon = `<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;

function init() {
    applyTheme(isDarkMode);
    renderDropdowns();
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        render();
    });

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyTheme(isDarkMode);
    });

    document.getElementById('archived-header-click').addEventListener('click', () => {
        const drawer = document.getElementById('archived-drawer');
        drawer.classList.toggle('open');
    });

    document.getElementById('restore-all-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        archives = [];
        saveState();
        render();
    });

    btnFavoritos.addEventListener('click', () => {
        showFavoritesOnly = !showFavoritesOnly;
        btnFavoritos.classList.toggle('bg-yellow-500', showFavoritesOnly);
        btnFavoritos.classList.toggle('text-white', showFavoritesOnly);
        render();
    });

    render();
}

function applyTheme(dark) {
    if(dark) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = sunIcon;
    } else {
        document.documentElement.classList.remove('dark');
        themeToggle.innerHTML = moonIcon;
    }
}

function renderDropdowns() {
    filterClasses.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'Todos' ? 'Qualquer Classe' : cat;
        classeSelect.appendChild(option);
    });

    filterTemas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'Todos' ? 'Qualquer Tema' : cat;
        temaSelect.appendChild(option);
    });

    filterTecnicas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'Todos' ? 'Qualquer Técnica' : cat;
        tecnicaSelect.appendChild(option);
    });

    filterProblemas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'Todos' ? 'Qualquer Problema' : cat;
        problemaSelect.appendChild(option);
    });

    classeSelect.addEventListener('change', (e) => { currentClasse = e.target.value; render(); });
    temaSelect.addEventListener('change', (e) => { currentTema = e.target.value; render(); });
    tecnicaSelect.addEventListener('change', (e) => { currentTecnica = e.target.value; render(); });
    problemaSelect.addEventListener('change', (e) => { currentProblema = e.target.value; render(); });
}

function saveState() {
    localStorage.setItem('ds-favorites', JSON.stringify(favorites));
    localStorage.setItem('ds-archives', JSON.stringify(archives));
}

function toggleFavorite(id) {
    if(favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }
    saveState();
    render();
}

function archiveTool(id) {
    if(!archives.includes(id)) {
        archives.push(id);
    }
    saveState();
    render();
}

function restoreTool(id) {
    archives = archives.filter(a => a !== id);
    saveState();
    render();
}


function render() {
    toolsGrid.innerHTML = '';
    archivedList.innerHTML = '';
    
    let activeCountNum = 0;
    let archivedCountNum = 0;

    const filteredTools = allDatasets.filter(tool => {
        if(archives.includes(tool.id)) return false;
        if(showFavoritesOnly && !favorites.includes(tool.id)) return false;
        
        if(currentClasse !== 'Todos' && tool.classe !== currentClasse) return false;
        if(currentTema !== 'Todos' && !(tool.temas || []).includes(currentTema)) return false;
        if(currentTecnica !== 'Todos' && !(tool.tecnicas || []).includes(currentTecnica)) return false;
        if(currentProblema !== 'Todos' && !(tool.problemas || []).includes(currentProblema)) return false;
        
        if(searchQuery) {
            const matchName = (tool.nome||'').toLowerCase().includes(searchQuery);
            const matchDesc = (tool.conteudo||'').toLowerCase().includes(searchQuery);
            if(!matchName && !matchDesc) return false;
        }
        
        return true;
    });
    
    // Sort so favorites are first
    filteredTools.sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if(aFav && !bFav) return -1;
        if(!aFav && bFav) return 1;
        return 0;
    });

    filteredTools.forEach(tool => {
        activeCountNum++;
        const isFav = favorites.includes(tool.id);
        
        const card = document.createElement('div');
        card.className = "group flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl glass-panel hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-300 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg";
        
        const tags = [...(tool.temas||[]), ...(tool.tecnicas||[]), ...(tool.problemas||[])];
        const limitedTags = tags.slice(0, 4); // Limit to 4 tags to not clutter
        
        const tagsHtml = limitedTags.map(c => `<span class="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded mr-1 mb-1 inline-block border border-slate-300 dark:border-slate-600">${c}</span>`).join('');
        const classeHtml = `<span class="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 px-2 py-0.5 bg-slate-300 dark:bg-slate-600 rounded mr-1 mb-1 inline-block">${tool.classe || 'N/A'}</span>`;

        card.innerHTML = `
            <div class="flex-grow min-w-0 w-full">
                <div class="flex items-center justify-between mb-1">
                    <h3 class="text-base font-bold group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors truncate pr-2">${tool.nome}</h3>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-[10px] text-slate-500 font-semibold hidden md:inline">${tool.tamanho || ''}</span>
                        <button onclick="toggleFavorite(${tool.id})" class="text-lg hover:scale-110 transition-transform">
                            ${isFav ? '⭐' : '<span class="opacity-30 grayscale">⭐</span>'}
                        </button>
                    </div>
                </div>
                
                <div class="mb-1 flex flex-wrap gap-0.5">
                    ${classeHtml}
                    ${tagsHtml}
                </div>

                <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    ${tool.conteudo}
                </p>
            </div>
            
            <div class="flex-shrink-0 flex md:flex-col items-center justify-between md:justify-center gap-3 w-full md:w-32 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-700/50 pl-0 md:pl-4 md:border-l">
                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Acessar
                    <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onclick="archiveTool(${tool.id})" class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-medium flex items-center transition-colors">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    Ocultar
                </button>
            </div>
        `;
        toolsGrid.appendChild(card);
    });

    allDatasets.filter(t => archives.includes(t.id)).forEach(tool => {
        archivedCountNum++;
        const card = document.createElement('div');
        card.className = "flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50";
        card.innerHTML = `
            <div class="flex items-center space-x-3">
                <div>
                    <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1">${tool.nome}</h4>
                    <span class="text-xs text-slate-500">${tool.classe || ''}</span>
                </div>
            </div>
            <button onclick="restoreTool(${tool.id})" class="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Restaurar</button>
        `;
        archivedList.appendChild(card);
    });

    activeCount.textContent = `${activeCountNum} datasets ativos`;
    archivedCount.textContent = `(${archivedCountNum})`;

    if(archivedCountNum > 0) {
        archivedSection.classList.remove('hidden');
    } else {
        archivedSection.classList.add('hidden');
    }

    if(activeCountNum === 0) {
        noToolsMessage.classList.remove('hidden');
    } else {
        noToolsMessage.classList.add('hidden');
    }
}

// Global functions for inline onclick handlers
window.toggleFavorite = toggleFavorite;
window.archiveTool = archiveTool;
window.restoreTool = restoreTool;

// Init
init();
