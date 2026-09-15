// Barra Lateral de Navegação Modular (Inspirada na ergonomia do Garu e identidade do laboratório)

import { DS_BRANCHES } from "../data/branches.js";
import { renderPlaceholderModal } from "./PlaceholderModal.js";

export function renderSidebar(activeModuleId, onNavigate, onCloseMobile) {
  const sidebar = document.createElement("aside");
  sidebar.className = "w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-colors duration-200";

  const activeBranches = DS_BRANCHES.filter(b => b.status === "active");
  const upcomingBranches = DS_BRANCHES.filter(b => b.status === "upcoming");

  sidebar.innerHTML = `
    <!-- Navegação Scrollável -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
      
      <!-- Seção Principal: Início -->
      <div>
        <p class="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Visão Geral</p>
        <button data-module="overview" class="sidebar-nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeModuleId === 'overview' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70'}">
          <span class="text-base">🚀</span>
          <span>Hub de Ramificações</span>
        </button>
      </div>

      <!-- Seção: Módulos do Laboratório -->
      <div>
        <div class="flex items-center justify-between px-3 mb-2">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Módulos Interativos</p>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">Ativos</span>
        </div>
        <div class="space-y-1">
          ${activeBranches.map(branch => `
            <button data-module="${branch.id}" class="sidebar-nav-btn w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeModuleId === branch.id ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70'}">
              <div class="flex items-center gap-2.5 truncate">
                <span class="text-base">${branch.icon}</span>
                <span class="truncate">${branch.name}</span>
              </div>
              <span class="text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${branch.badgeColor === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">
                ${branch.badge}
              </span>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Seção: Ramificações Futuras (Placeholders Interativos) -->
      <div>
        <div class="flex items-center justify-between px-3 mb-2">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Próximas Ramificações</p>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">Em Breve</span>
        </div>
        <div class="space-y-1">
          ${upcomingBranches.map(branch => `
            <button data-placeholder-id="${branch.id}" class="sidebar-placeholder-btn w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 hover:text-purple-600 dark:hover:text-purple-300 transition-colors group">
              <div class="flex items-center gap-2.5 truncate">
                <span class="text-sm opacity-80 group-hover:opacity-100 transition-opacity">${branch.icon}</span>
                <span class="truncate">${branch.name}</span>
              </div>
              <span class="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-700 dark:group-hover:bg-purple-900/40 dark:group-hover:text-purple-300 transition-colors">
                Ver
              </span>
            </button>
          `).join("")}
        </div>
      </div>

    </div>

    <!-- Rodapé da Sidebar com link do Laboratório -->
    <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
      <a href="../" class="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        <span>Voltar ao Hub do Lab</span>
      </a>
    </div>
  `;

  // Attach navigation events
  sidebar.querySelectorAll(".sidebar-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetModule = btn.getAttribute("data-module");
      if (onNavigate) onNavigate(targetModule);
      if (onCloseMobile) onCloseMobile();
    });
  });

  // Attach placeholder modal trigger events
  sidebar.querySelectorAll(".sidebar-placeholder-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const placeholderId = btn.getAttribute("data-placeholder-id");
      const branch = upcomingBranches.find(b => b.id === placeholderId);
      if (branch) {
        renderPlaceholderModal(branch);
      }
      if (onCloseMobile) onCloseMobile();
    });
  });

  return sidebar;
}
