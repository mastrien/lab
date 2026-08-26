// State
let favorites = JSON.parse(localStorage.getItem('ai-favorites') || '[]');
let archives = JSON.parse(localStorage.getItem('ai-archives') || '[]');
let isDarkMode = localStorage.getItem('theme') !== 'light';
let currentCategory = 'Todos';
let currentPricing = 'Todos';
let showFavoritesOnly = false;
let searchQuery = '';

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const archivedList = document.getElementById('archived-list');
const archivedSection = document.getElementById('archived-section');
const archivedCount = document.getElementById('archived-count');
const searchInput = document.getElementById('search-input');
const activeCount = document.getElementById('active-count');
const categorySelect = document.getElementById('category-select');
const pricingSelect = document.getElementById('pricing-select');
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
    categoriesList.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'Todos' ? 'Todas as Categorias' : cat;
        categorySelect.appendChild(option);
    });

    pricingList.forEach(price => {
        const option = document.createElement('option');
        option.value = price;
        option.textContent = price === 'Todos' ? 'Qualquer Preço' : price;
        pricingSelect.appendChild(option);
    });

    categorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        render();
    });

    pricingSelect.addEventListener('change', (e) => {
        currentPricing = e.target.value;
        render();
    });
}

function saveState() {
    localStorage.setItem('ai-favorites', JSON.stringify(favorites));
    localStorage.setItem('ai-archives', JSON.stringify(archives));
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

function getIconHtml(tool) {
    if(tool.icon) {
        return `<img src="${tool.icon}" alt="${tool.name}" class="w-12 h-12 rounded-xl object-cover">`;
    }
    return `<div class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold ${tool.themeColor}">${tool.iconFallback}</div>`;
}

function render() {
    toolsGrid.innerHTML = '';
    archivedList.innerHTML = '';
    
    let activeCountNum = 0;
    let archivedCountNum = 0;

    const filteredTools = aiTools.filter(tool => {
        if(archives.includes(tool.id)) return false;
        
        if(showFavoritesOnly && !favorites.includes(tool.id)) return false;
        
        if(currentCategory !== 'Todos' && !tool.categories.includes(currentCategory)) return false;
        if(currentPricing !== 'Todos' && !tool.pricing.includes(currentPricing)) return false;
        
        if(searchQuery) {
            const matchName = tool.name.toLowerCase().includes(searchQuery);
            const matchDesc = tool.description.toLowerCase().includes(searchQuery);
            const matchCompany = tool.company.toLowerCase().includes(searchQuery);
            if(!matchName && !matchDesc && !matchCompany) return false;
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
        card.className = "group block p-6 rounded-2xl glass-panel hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full";
        
        const catsHtml = tool.categories.map(c => `<span class="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-1 bg-indigo-500/10 rounded-full mr-1 mb-1 inline-block">${c}</span>`).join('');
        const priceHtml = tool.pricing.map(p => `<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-full mr-1 mb-1 inline-block">${p}</span>`).join('');

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    ${getIconHtml(tool)}
                    <div>
                        <h3 class="text-lg font-bold group-hover:text-indigo-400 transition-colors">${tool.name}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">${tool.company}</p>
                    </div>
                </div>
                <button onclick="toggleFavorite('${tool.id}')" class="text-2xl hover:scale-110 transition-transform">
                    ${isFav ? '⭐' : '<span class="opacity-30 grayscale">⭐</span>'}
                </button>
            </div>
            
            <div class="mb-3">
                ${catsHtml}
                ${priceHtml}
            </div>

            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                ${tool.description}
            </p>
            
            <div class="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-700/50 pt-4">
                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300">
                    Acessar
                    <svg class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onclick="archiveTool('${tool.id}')" class="text-slate-400 hover:text-red-400 text-sm flex items-center transition-colors">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    Ocultar
                </button>
            </div>
        `;
        toolsGrid.appendChild(card);
    });

    aiTools.filter(t => archives.includes(t.id)).forEach(tool => {
        archivedCountNum++;
        const card = document.createElement('div');
        card.className = "flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50";
        card.innerHTML = `
            <div class="flex items-center space-x-3">
                ${getIconHtml(tool)}
                <div>
                    <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">${tool.name}</h4>
                    <span class="text-xs text-slate-500">${tool.company}</span>
                </div>
            </div>
            <button onclick="restoreTool('${tool.id}')" class="px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-500/20 transition-colors">Restaurar</button>
        `;
        archivedList.appendChild(card);
    });

    activeCount.textContent = `${activeCountNum} ferramentas ativas`;
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
