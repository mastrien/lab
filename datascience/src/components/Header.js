// Componente de Cabeçalho do DataLab

import { toggleTheme, isDarkMode } from "../theme.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { renderDatasetSelectorModal } from "./DatasetSelectorModal.js";
import { Icons } from "./Icons.js";

export function renderHeader(onNavigate, onToggleMobileSidebar) {
  const header = document.createElement("header");
  header.className = "sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors";

  function getActiveDatasetText() {
    const active = getActiveDataset();
    return active.name;
  }

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Lado Esquerdo: Mobile Menu + Logo -->
      <div class="flex items-center gap-3">
        <button id="mobile-sidebar-toggle" class="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Abrir Menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        <a href="#overview" id="header-logo-btn" class="flex items-center gap-2.5 cursor-pointer">
          <div class="w-8 h-8 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-mono font-bold text-sm">
            DL
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base font-bold text-slate-900 dark:text-white tracking-tight">DataLab</span>
              <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Plataforma</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Lado Direito: Seletor de Dataset Ativo & Ações -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Indicador e Botão do Dataset Ativo -->
        <button id="header-dataset-btn" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors" title="Gerenciar e trocar dataset">
          <span class="text-slate-500 dark:text-slate-400">${Icons.database("w-3.5 h-3.5")}</span>
          <span class="hidden sm:inline text-slate-500 dark:text-slate-400 font-normal">Dataset:</span>
          <span id="header-dataset-name" class="font-bold truncate max-w-[130px]">${getActiveDatasetText()}</span>
        </button>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="p-2 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700" aria-label="Alternar Tema">
          <span id="theme-sun-icon" class="hidden dark:block text-slate-200">${Icons.sun("w-4 h-4")}</span>
          <span id="theme-moon-icon" class="block dark:hidden text-slate-700">${Icons.moon("w-4 h-4")}</span>
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

  header.querySelector("#header-dataset-btn").addEventListener("click", () => {
    renderDatasetSelectorModal();
  });

  const mobileToggle = header.querySelector("#mobile-sidebar-toggle");
  if (mobileToggle && onToggleMobileSidebar) {
    mobileToggle.addEventListener("click", onToggleMobileSidebar);
  }

  // Reagir a mudanças de dataset
  onDatasetChange((newActive) => {
    const nameEl = header.querySelector("#header-dataset-name");
    if (nameEl) nameEl.textContent = newActive.name;
  });

  return header;
}
