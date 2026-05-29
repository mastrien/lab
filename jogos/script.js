// Game Hub - Database & State Controller

const GAMES_DATA = [
    {
        id: "bonedle",
        name: "Bonedle",
        url: "https://bonedle.rito.lol/",
        description: "Adivinhe o campeão de League of Legends observando apenas as animações 3D da sua estrutura óssea de animação (skeletal rig), com texturas e cores removidas.",
        tags: ["league-of-legends", "games", "inglês"],
        color: "from-amber-600 to-yellow-700"
    },
    {
        id: "conexo",
        name: "Conexo",
        url: "https://conexo.ws/pt/",
        description: "Agrupe 16 palavras em quatro grupos de quatro que compartilham de uma conexão ou conceito em comum. Desafie seu pensamento associativo em português.",
        tags: ["geral"],
        color: "from-emerald-500 to-teal-600"
    },
    {
        id: "contexto",
        name: "Contexto",
        url: "https://contexto.me/pt/",
        description: "Encontre a palavra secreta do dia digitando palpites. Um algoritmo de inteligência artificial analisa e pontua suas palavras pela proximidade semântica com o segredo.",
        tags: ["geral"],
        color: "from-indigo-500 to-purple-600"
    },
    {
        id: "dailyorbs",
        name: "Daily Orbs",
        url: "https://dailyorbs.com/",
        description: "Um conjunto de quatro desafios diários de trívia com formatos variados. Identifique celebridades, combine artistas com suas músicas e conquiste as esferas do dia testando seus conhecimentos gerais.",
        tags: ["geral", "inglês"],
        color: "from-blue-400 to-indigo-500"
    },
    {
        id: "dialedcolor",
        name: "Dialed Color",
        url: "https://dialed.gg/color",
        description: "Teste a sua percepção visual e precisão cromática adivinhando a cor RGB/HEX exata a partir de uma amostra visual.",
        tags: ["geral", "inglês"],
        color: "from-rose-500 to-indigo-500"
    },
    {
        id: "dialedshape",
        name: "Dialed Shape",
        url: "https://dialed.gg/shape",
        description: "Um intrigante desafio geométrico e espacial. Adivinhe e complete formatos, simetrias ou propriedades de figuras geométricas complexas.",
        tags: ["geral", "inglês"],
        color: "from-blue-500 to-emerald-500"
    },
    {
        id: "dialedsound",
        name: "Dialed Sound",
        url: "https://dialed.gg/sound",
        description: "Desafio diário auditivo! Teste sua audição e adivinhe notas, músicas ou frequências sonoras baseadas em pistas de áudio curtas.",
        tags: ["geral", "inglês"],
        color: "from-fuchsia-500 to-cyan-500"
    },
    {
        id: "dialedtime",
        name: "Dialed Time",
        url: "https://dialed.gg/time",
        description: "Um jogo focado em ritmo e cronometragem. Teste sua noção temporal interna tentando adivinhar intervalos exatos de tempo ou batidas de relógio.",
        tags: ["geral", "inglês"],
        color: "from-violet-600 to-pink-500"
    },
    {
        id: "enemapi",
        name: "ENEM API Explorer",
        url: "../enemapi/",
        description: "Treine e prepare-se para o ENEM! Um portal completo para buscar e responder questões reais de provas passadas de forma interativa com estatísticas detalhadas.",
        tags: ["educação", "brasil"],
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "expresso",
        name: "Expresso",
        url: "https://expresso.ac/pt/",
        description: "Outro excelente jogo de conexões de palavras em português. Encontre as associações ocultas e agrupe as palavras em categorias astutas antes do tempo acabar.",
        tags: ["geral"],
        color: "from-violet-500 to-fuchsia-600"
    },
    {
        id: "facade",
        name: "Façade",
        url: "https://www.playablstudios.com/facade",
        description: "Um experimento revolucionário de inteligência artificial e drama interativo. Participe de uma noite tensa na casa de um casal de amigos e use linguagem natural para influenciar o desenrolar dessa história psicológica.",
        tags: ["nicho", "inglês"],
        color: "from-slate-700 to-gray-900"
    },
    {
        id: "frierendle",
        name: "Frierendle",
        url: "https://rainankaneka.github.io/frierendle/",
        description: "Um jogo de adivinhação temático dedicado ao aclamado anime e mangá 'Sousou no Frieren'. Acerte qual personagem das crônicas da elfa Frieren é o escolhido do dia.",
        tags: ["anime", "frieren", "inglês"],
        color: "from-indigo-400 to-sky-500"
    },
    {
        id: "geoguessr",
        name: "GeoGuessr",
        url: "https://www.geoguessr.com/pt",
        description: "Um jogo de exploração geográfica fascinante. Caia em qualquer ponto do planeta através do Google Street View e tente adivinhar onde você está no mapa do mundo.",
        tags: ["geral"],
        color: "from-teal-500 to-emerald-600"
    },
    {
        id: "high-notes",
        name: "High Notes",
        url: "https://vole.wtf/high-notes/",
        description: "Um desafio vocal divertido! Teste o alcance da sua voz tentando atingir as notas mais altas de cantores famosos. Use seu microfone para ver se você consegue chegar ao nível de lendas da música.",
        tags: ["geral", "inglês"],
        color: "from-pink-500 to-rose-600"
    },
    {
        id: "letroso",
        name: "Letroso",
        url: "https://letroso.com/pt/",
        description: "Adivinhe a palavra secreta do dia com palpites e tentativas ilimitadas. O jogo aceita palavras de 3 a 10 letras e oferece pistas visuais inteligentes para ajudar na dedução.",
        tags: ["geral"],
        color: "from-amber-500 to-orange-600"
    },
    {
        id: "loldle",
        name: "LoLdle",
        url: "https://loldle.net/",
        description: "Adivinhe os campeões do League of Legends através de cinco pistas diárias diferentes: atributos, frases marcantes, ícones de habilidades, arte conceitual e splash arts.",
        tags: ["league-of-legends", "games", "inglês"],
        color: "from-blue-600 to-cyan-700"
    },
    {
        id: "longcat",
        name: "Longcat",
        url: "https://play.fancade.com/longcat",
        description: "Um quebra-cabeça viciante onde você controla um gato que se estica. O objetivo é preencher todos os espaços vazios do tabuleiro sem cruzar o próprio corpo. Simples de entender, mas desafiador de dominar.",
        tags: ["geral"],
        color: "from-emerald-400 to-teal-500"
    },
    {
        id: "murdoku",
        name: "Murdoku",
        url: "https://www.murdoku.com/play/",
        description: "Uma fusão inovadora de mistério policial e Sudoku. Resolva o tabuleiro de lógica para descobrir o assassino, a arma do crime e o local do assassinato.",
        tags: ["geral", "inglês"],
        color: "from-red-600 to-rose-700"
    },
    {
        id: "onepiecedle",
        name: "OnePieceDle",
        url: "https://onepiecedle.net",
        description: "O desafio definitivo para fãs de One Piece! Adivinhe o personagem do dia através de atributos, identifique Akuma no Mi, reconheça risadas icônicas ou descubra quem é o pirata pelo cartaz de procurado.",
        tags: ["anime", "one-piece", "inglês"],
        color: "from-yellow-600 to-red-700"
    },
    {
        id: "paranordle",
        name: "Paranordle",
        url: "https://paranordle.com.br/jogar",
        description: "Adivinhe o personagem do universo de 'Ordem Paranormal' (o famoso RPG de mesa do Cellbit) através de pistas diárias como temporadas, afiliação e lore.",
        tags: ["ordem-paranormal"],
        color: "from-red-500 to-amber-600"
    },
    {
        id: "pokedle",
        name: "PokéDle",
        url: "https://pokedle.net",
        description: "Tente adivinhar o Pokémon do dia neste jogo inspirado no Wordle. Use dicas de tipo, geração, altura e peso para filtrar as possibilidades e provar que você é um mestre Pokémon.",
        tags: ["anime", "pokemon", "inglês"],
        color: "from-red-500 to-blue-500"
    },
    {
        id: "redactle",
        name: "Redactle",
        url: "https://redactle.net/",
        description: "Descubra o tema de um artigo da Wikipédia que teve quase todas as suas palavras ocultadas/censuradas. Um jogo incrível de dedução linguística e conhecimento.",
        tags: ["geral", "inglês"],
        color: "from-sky-500 to-blue-600"
    },
    {
        id: "termo",
        name: "Termo",
        url: "https://term.ooo/",
        description: "O jogo diário de palavras em português mais famoso do Brasil. Adivinhe a palavra de 5 letras em até 6 tentativas com dicas de cores baseadas no Wordle.",
        tags: ["geral"],
        color: "from-emerald-600 to-green-700"
    },
    {
        id: "toontone",
        name: "ToonTone",
        url: "https://toontone.app/pt/",
        description: "Teste sua memória cromática e intuição visual! Tente recriar as cores exatas de personagens icônicos de desenhos animados usando controles de matiz, saturação e brilho.",
        tags: ["geral"],
        color: "from-yellow-400 to-orange-500"
    },
    {
        id: "wikispeedruns",
        name: "WikiSpeedruns",
        url: "https://wikispeedruns.com/",
        description: "A clássica corrida da Wikipédia! Navegue de um artigo inicial até um artigo de destino usando apenas os hiperlinks internos no menor tempo ou cliques possível.",
        tags: ["geral", "inglês"],
        color: "from-slate-500 to-zinc-700"
    },
    {
        id: "wisdomdungeon",
        name: "Wisdom Dungeon",
        url: "https://wisdomdungeon.vercel.app/",
        description: "Um jogo para treinar com questões de ENEM e matemática de forma gamificada.",
        tags: ["geral", "educativo"],
        color: "from-purple-800 to-slate-900"
    },
    {
        id: "wordle",
        name: "Wordle",
        url: "https://www.nytimes.com/games/wordle/index.html",
        description: "O fenômeno mundial da NYT que iniciou a febre dos desafios diários de 5 letras. Teste seu vocabulário e ortografia no idioma inglês.",
        tags: ["geral", "inglês"],
        color: "from-green-600 to-emerald-700"
    }
];

// App State Management
let state = {
    favorites: JSON.parse(localStorage.getItem("games_hub_favorites")) || [],
    archived: JSON.parse(localStorage.getItem("games_hub_archived")) || [],
    theme: localStorage.getItem("games_hub_theme") || "dark",
    searchQuery: "",
    activeFilter: "todos" // 'todos', 'favoritos', 'geral', 'nicho', 'ingles'
};

// Toggle Light/Dark Theme
function initTheme() {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(state.theme);
    
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.innerHTML = state.theme === "dark" 
            ? `<svg class="w-6 h-6 text-yellow-400 transition-transform duration-300 hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l-.707-.707m12.728 12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`
            : `<svg class="w-6 h-6 text-slate-800 transition-transform duration-300 hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
}

function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("games_hub_theme", state.theme);
    initTheme();
}

// Favorite Toggle
function toggleFavorite(id) {
    if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
    } else {
        state.favorites.push(id);
    }
    localStorage.setItem("games_hub_favorites", JSON.stringify(state.favorites));
    render();
}

// Archive Toggle
function toggleArchive(id) {
    if (state.archived.includes(id)) {
        state.archived = state.archived.filter(arcId => arcId !== id);
    } else {
        state.archived.push(id);
        // Ao arquivar, removemos também dos favoritos por coerência de fluxo
        state.favorites = state.favorites.filter(favId => favId !== id);
        localStorage.setItem("games_hub_favorites", JSON.stringify(state.favorites));
    }
    localStorage.setItem("games_hub_archived", JSON.stringify(state.archived));
    render();
}

// Restore All Archived
function restoreAllArchived() {
    state.archived = [];
    localStorage.setItem("games_hub_archived", JSON.stringify(state.archived));
    render();
}

// Sorter Function (Tô Sem Ideia)
function pickRandomGame() {
    // Apenas jogos que não estão arquivados
    const availableGames = GAMES_DATA.filter(game => !state.archived.includes(game.id));
    
    if (availableGames.length === 0) {
        alert("Todos os jogos foram arquivados! Restaure algum para poder sortear.");
        return;
    }

    // Desmarcar sorteados anteriores
    document.querySelectorAll(".glass-card").forEach(card => {
        card.classList.remove("highlighted-card");
    });

    const randomIndex = Math.floor(Math.random() * availableGames.length);
    const selectedGame = availableGames[randomIndex];

    // Se o filtro atual não incluir o jogo sorteado, vamos mudar para "todos" e resetar a busca
    const queryMatches = selectedGame.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         selectedGame.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         selectedGame.tags.some(t => t.toLowerCase().includes(state.searchQuery.toLowerCase()));

    const isFavFilter = state.activeFilter === "favoritos" && !state.favorites.includes(selectedGame.id);
    const isGeralFilter = state.activeFilter === "geral" && !selectedGame.tags.includes("geral");
    const isNichoFilter = state.activeFilter === "nicho" && selectedGame.tags.includes("geral");
    const isInglesFilter = state.activeFilter === "ingles" && !selectedGame.tags.includes("inglês");

    if (!queryMatches || isFavFilter || isGeralFilter || isNichoFilter || isInglesFilter) {
        state.searchQuery = "";
        state.activeFilter = "todos";
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.value = "";
        
        // Atualizar classes dos botões de filtro
        updateFilterButtonClasses();
        render();
    }

    // Scroll e animação pós-renderização
    setTimeout(() => {
        const targetCard = document.getElementById(`game-card-${selectedGame.id}`);
        if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            targetCard.classList.add("highlighted-card");
            
            // Remover destaque após alguns segundos (animação chamativa dura 4s)
            setTimeout(() => {
                targetCard.classList.remove("highlighted-card");
            }, 4500);
        }
    }, 100);
}

// Update UI Filter buttons state
function updateFilterButtonClasses() {
    const filters = ["todos", "favoritos", "geral", "nicho", "ingles"];
    filters.forEach(filter => {
        const btn = document.getElementById(`filter-btn-${filter}`);
        if (btn) {
            if (state.activeFilter === filter) {
                btn.className = "px-4 py-2 text-sm font-semibold rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/10 border border-indigo-400/20 transition-all duration-200";
            } else {
                btn.className = "px-4 py-2 text-sm font-semibold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200 border border-transparent";
            }
        }
    });
}

// Main Rendering Logic
function render() {
    const grid = document.getElementById("games-grid");
    const archivedList = document.getElementById("archived-list");
    const archivedSection = document.getElementById("archived-section");
    const activeCountText = document.getElementById("active-count");
    const archivedCountText = document.getElementById("archived-count");
    const noGamesMessage = document.getElementById("no-games-message");

    if (!grid) return;

    // 1. Filtrar jogos Ativos e Arquivados
    const activeGames = [];
    const archivedGames = [];

    GAMES_DATA.forEach(game => {
        if (state.archived.includes(game.id)) {
            archivedGames.push(game);
        } else {
            // Aplicar filtros e busca no grid principal
            const matchesSearch = game.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                                  game.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                                  game.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()));

            let matchesCategory = true;
            if (state.activeFilter === "favoritos") {
                matchesCategory = state.favorites.includes(game.id);
            } else if (state.activeFilter === "geral") {
                matchesCategory = game.tags.includes("geral");
            } else if (state.activeFilter === "nicho") {
                matchesCategory = !game.tags.includes("geral"); // Se não tem "geral", é de nicho
            } else if (state.activeFilter === "ingles") {
                matchesCategory = game.tags.includes("inglês");
            }

            if (matchesSearch && matchesCategory) {
                activeGames.push(game);
            }
        }
    });

    // 2. Atualizar Contadores
    if (activeCountText) activeCountText.innerText = `${activeGames.length} ${activeGames.length === 1 ? 'jogo ativo' : 'jogos ativos'}`;
    if (archivedCountText) archivedCountText.innerText = `(${archivedGames.length})`;

    // 3. Renderizar Grid Ativo
    grid.innerHTML = "";
    if (activeGames.length === 0) {
        if (noGamesMessage) {
            noGamesMessage.classList.remove("hidden");
        }
    } else {
        if (noGamesMessage) {
            noGamesMessage.classList.add("hidden");
        }
        
        activeGames.forEach((game, index) => {
            const isFav = state.favorites.includes(game.id);
            const card = document.createElement("div");
            card.id = `game-card-${game.id}`;
            card.className = `glass-card p-6 rounded-2xl flex flex-col justify-between relative group overflow-hidden grid-item-enter ${isFav ? 'is-favorite' : ''}`;
            
            // Decoração interna de gradiente na borda superior
            const topBar = document.createElement("div");
            topBar.className = `absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${game.color}`;
            card.appendChild(topBar);

            // Tags render
            let tagsHTML = "";
            game.tags.forEach(tag => {
                let tagClass = "tag-nicho";
                if (tag === "geral") tagClass = "tag-geral";
                if (tag === "inglês") tagClass = "tag-ingles";
                tagsHTML += `<span class="tag-badge ${tagClass} mr-1.5 mb-1.5">#${tag}</span>`;
            });

            card.innerHTML += `
                <div>
                    <!-- Header do Card -->
                    <div class="flex justify-between items-start mb-4 mt-2">
                        <h3 class="text-xl font-extrabold group-hover:text-indigo-400 transition-colors duration-200 dark:text-white text-slate-800">
                            ${game.name}
                        </h3>
                        <div class="flex space-x-1.5 z-10">
                            <!-- Botão Favoritar -->
                            <button onclick="toggleFavorite('${game.id}')" class="p-2 rounded-xl bg-slate-100 hover:bg-yellow-100 dark:bg-slate-800 dark:hover:bg-yellow-950/30 text-slate-400 hover:text-yellow-500 transition-all duration-200" title="${isFav ? 'Remover dos Favoritos' : 'Favoritar Jogo'}">
                                <svg class="w-5 h-5 ${isFav ? 'text-yellow-500 fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.253.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.77-.557-.37-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"/>
                                </svg>
                            </button>
                            <!-- Botão Ocultar/Arquivar -->
                            <button onclick="toggleArchive('${game.id}')" class="p-2 rounded-xl bg-slate-100 hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-500 transition-all duration-200" title="Ocultar Jogo">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Descrição -->
                    <p class="text-sm leading-relaxed mb-4 text-slate-600 dark:text-slate-400">
                        ${game.description}
                    </p>
                </div>

                <div>
                    <!-- Grid de Tags -->
                    <div class="flex flex-wrap items-center mt-2 mb-6">
                        ${tagsHTML}
                    </div>

                    <!-- Botão Jogar -->
                    <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="btn-primary-custom flex items-center justify-center w-full py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg">
                        Jogar Agora
                        <svg class="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            `;

            grid.appendChild(card);

            // Adiciona classe ativa após frame para ativar animação CSS de entrada
            setTimeout(() => {
                card.classList.remove("grid-item-enter");
                card.classList.add("grid-item-active");
            }, index * 25); // Animação sequencial em cascata!
        });
    }

    // 4. Renderizar Lista de Arquivados
    if (archivedList) {
        archivedList.innerHTML = "";
        if (archivedGames.length === 0) {
            archivedList.innerHTML = `
                <div class="col-span-full py-8 text-center text-slate-500 italic text-sm">
                    Nenhum jogo ocultado no momento.
                </div>
            `;
            if (archivedSection) archivedSection.classList.add("hidden");
        } else {
            if (archivedSection) archivedSection.classList.remove("hidden");
            archivedGames.forEach(game => {
                const item = document.createElement("div");
                item.className = "flex items-center justify-between p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 opacity-60 hover:opacity-90 transition-all duration-200";
                
                item.innerHTML = `
                    <div class="flex flex-col">
                        <span class="font-bold text-sm text-slate-800 dark:text-slate-200">${game.name}</span>
                        <span class="text-xs text-slate-500 truncate max-w-xs md:max-w-md">${game.url}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="p-2 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 transition-colors">
                            Jogar
                        </a>
                        <button onclick="toggleArchive('${game.id}')" class="p-2 rounded-lg bg-slate-200 hover:bg-emerald-100 dark:bg-slate-700 dark:hover:bg-emerald-950/40 text-slate-600 hover:text-emerald-500 dark:text-slate-400 transition-colors" title="Restaurar Jogo">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                `;
                archivedList.appendChild(item);
            });
        }
    }
}

// Drawer Toggle for Archived Games
function toggleArchivedDrawer() {
    const drawer = document.getElementById("archived-drawer");
    const arrow = document.getElementById("archived-arrow");
    
    if (drawer && arrow) {
        const isExpanded = drawer.classList.contains("expanded");
        if (isExpanded) {
            drawer.classList.remove("expanded");
            arrow.classList.remove("rotate-180");
        } else {
            drawer.classList.add("expanded");
            arrow.classList.add("rotate-180");
            // Scroll suave até o final para o usuário enxergar os arquivados
            setTimeout(() => {
                drawer.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 300);
        }
    }
}

// Initial Listeners and Bootstrap
document.addEventListener("DOMContentLoaded", () => {
    // 1. Iniciar Tema
    initTheme();

    // 2. Listener do Tema
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }

    // 3. Listener da Busca (tempo real)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value;
            render();
        });
    }

    // 4. Listeners dos Filtros Rápidos
    const filters = ["todos", "favoritos", "geral", "nicho", "ingles"];
    filters.forEach(filter => {
        const btn = document.getElementById(`filter-btn-${filter}`);
        if (btn) {
            btn.addEventListener("click", () => {
                state.activeFilter = filter;
                updateFilterButtonClasses();
                render();
            });
        }
    });

    // 5. Listener Sorteador (Tô Sem Ideia)
    const randomBtn = document.getElementById("random-btn");
    if (randomBtn) {
        randomBtn.addEventListener("click", pickRandomGame);
    }

    // 6. Listener Gaveta Arquivados
    const headerArchived = document.getElementById("archived-header-click");
    if (headerArchived) {
        headerArchived.addEventListener("click", toggleArchivedDrawer);
    }

    // 7. Listener Restaurar Todos
    const restoreAllBtn = document.getElementById("restore-all-btn");
    if (restoreAllBtn) {
        restoreAllBtn.addEventListener("click", restoreAllArchived);
    }

    // 8. Primeira Renderização
    render();
});
