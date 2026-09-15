// Componente de Cabeçalho do DataLab

import { toggleTheme, isDarkMode } from "../theme.js";

export function renderHeader(onNavigate, onToggleMobileSidebar) {
  const header = document.createElement("header");
  header.className = "sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200";

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Lado Esquerdo: Mobile Menu + Logo -->
      <div class="flex items-center gap-3">
        <button id="mobile-sidebar-toggle" class="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Abrir Menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        <a href="#overview" id="header-logo-btn" class="flex items-center gap-2.5 group cursor-pointer">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            🧪
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 tracking-tight">DataLab</span>
              <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">Hub DS</span>
            </div>
            <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">Laboratório Interativo de Ciência de Dados</p>
          </div>
        </a>
      </div>

      <!-- Lado Direito: Ações & Theme Toggle -->
      <div class="flex items-center gap-2 sm:gap-3">
        <button id="btn-quick-kdd" class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
          <span>⛏️ Mineração & KDD</span>
        </button>

        <button id="btn-quick-mylab" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
          <span>🧪 Meu Laboratório</span>
        </button>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700" aria-label="Alternar Tema">
          <svg id="theme-sun-icon" class="w-5 h-5 hidden dark:block text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/></svg>
          <svg id="theme-moon-icon" class="w-5 h-5 block dark:hidden text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
        </button>
      </div>
    </div>
  `;

  // Listeners
  header.querySelector("#theme-toggle-btn").addEventListener("click", () => {
    toggleTheme();
  });

  header.querySelector("#header-logo-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate("overview");
  });

  header.querySelector("#btn-quick-kdd").addEventListener("click", () => {
    if (onNavigate) onNavigate("kdd");
  });

  header.querySelector("#btn-quick-mylab").addEventListener("click", () => {
    if (onNavigate) onNavigate("mylab");
  });

  const mobileToggle = header.querySelector("#mobile-sidebar-toggle");
  if (mobileToggle && onToggleMobileSidebar) {
    mobileToggle.addEventListener("click", onToggleMobileSidebar);
  }

  return header;
}
