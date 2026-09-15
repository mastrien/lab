// Módulo Visão Geral / Hub do DataLab

import { DS_BRANCHES } from "../../data/branches.js";
import { createPlaceholderCard } from "../../components/PlaceholderCard.js";

export function renderOverviewView(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-12 animate-fadeIn max-w-6xl mx-auto";

  const activeBranches = DS_BRANCHES.filter(b => b.status === "active");
  const upcomingBranches = DS_BRANCHES.filter(b => b.status === "upcoming");

  container.innerHTML = `
    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-indigo-500/20">
      <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>🧪 Plataforma Educacional Interativa</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
          Aprenda <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-300 to-emerald-400">Data Science</span> manipulando dados em tempo real.
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          Uma experiência prática, visual e sem complicação. Explore o ciclo KDD completo, ajuste fronteiras de decisão, descubra regras de associação e teste seus conhecimentos — tudo executado 100% no seu navegador.
        </p>

        <div class="flex flex-wrap gap-3">
          <button id="hero-btn-kdd" class="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2">
            <span>⛏️ Explorar Mineração & KDD</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
          <button id="hero-btn-mylab" class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 active:scale-95 flex items-center gap-2">
            <span>🧪 Carregar meu CSV</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Banner de Estatísticas & Métricas do Hub -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <p class="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">8</p>
        <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Módulos Ativos</p>
      </div>
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <p class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">5</p>
        <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Etapas KDD Mapeadas</p>
      </div>
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <p class="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">7</p>
        <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Futuras Ramificações</p>
      </div>
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <p class="text-2xl sm:text-3xl font-black text-amber-500">100%</p>
        <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Client-Side (Zero Servidor)</p>
      </div>
    </div>

    <!-- Módulo em Destaque: Seção Dedicada de KDD -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 dark:border-emerald-500/20">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <span>⛏️ Módulo Especial em Destaque</span>
          </div>
          <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Mineração de Dados & Processo KDD Completo
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Uma sessão dedicada inteiramente ao processo de <em>Knowledge Discovery in Databases</em>. Simule o algoritmo <strong>Apriori</strong> de cesta de compras, altere os limiares de Suporte e Confiança, calcule o <strong>Lift</strong> e visualize anomalias em tempo real.
          </p>
        </div>
        <button id="featured-kdd-btn" class="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 flex items-center gap-2">
          <span>Abrir Mineração & KDD</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </button>
      </div>
    </div>

    <!-- Grade de Módulos Práticos Ativos -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Módulos Interativos Disponíveis</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Escolha uma etapa do ciclo de ciência de dados para experimentar:</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="active-modules-grid">
        ${activeBranches.map(b => `
          <div data-active-module="${b.id}" class="active-module-card p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ${b.icon}
                </div>
                <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${b.badgeColor === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50' : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50'}">
                  ${b.badge}
                </span>
              </div>
              <p class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">${b.category}</p>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">${b.name}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">${b.shortDesc}</p>
            </div>
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Iniciar Experimento</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Catálogo de Futuras Ramificações (Placeholders Interativos) -->
    <div class="pt-8 border-t border-slate-200 dark:border-slate-800">
      <div class="mb-6">
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Próximas Ramificações de Data Science</h2>
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Em Construção
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          O DataLab foi planejado para cobrir todas as vertentes da área. Clique em qualquer card abaixo para visualizar a ementa de tópicos previstos:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="upcoming-modules-grid">
        <!-- Cards de placeholder injetados via script com modal amigável -->
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelector("#hero-btn-kdd").addEventListener("click", () => {
    if (onNavigate) onNavigate("kdd");
  });

  container.querySelector("#hero-btn-mylab").addEventListener("click", () => {
    if (onNavigate) onNavigate("mylab");
  });

  container.querySelector("#featured-kdd-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("kdd");
  });

  container.querySelectorAll(".active-module-card").forEach(card => {
    card.addEventListener("click", () => {
      const mod = card.getAttribute("data-active-module");
      if (onNavigate) onNavigate(mod);
    });
  });

  // Inject upcoming placeholder cards
  const upcomingGrid = container.querySelector("#upcoming-modules-grid");
  upcomingBranches.forEach(branch => {
    const card = createPlaceholderCard(branch);
    upcomingGrid.appendChild(card);
  });

  return container;
}
