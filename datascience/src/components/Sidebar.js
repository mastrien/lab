// Barra Lateral de Navegação Modular com ícones vetoriais limpos

import { DS_BRANCHES } from "../data/branches.js";
import { renderPlaceholderModal } from "./PlaceholderModal.js";
import { Icons } from "./Icons.js";

export function renderSidebar(activeModuleId, onNavigate, onCloseMobile) {
  const sidebar = document.createElement("aside");
  sidebar.className = "w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-colors";

  const activeBranches = DS_BRANCHES.filter(b => b.status === "active");
  const upcomingBranches = DS_BRANCHES.filter(b => b.status === "upcoming");

  sidebar.innerHTML = `
    <!-- Navegação Scrollável -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
      
      <!-- Seção Principal: Início -->
      <div>
        <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Início</p>
        <button data-module="overview" class="sidebar-nav-btn w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${activeModuleId === 'overview' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
          <span class="text-slate-500 dark:text-slate-400">${Icons.layers("w-4 h-4")}</span>
          <span>Visão Geral</span>
        </button>
      </div>

      <!-- Seção: Módulos do Laboratório -->
      <div>
        <div class="flex items-center justify-between px-3 mb-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Módulos Práticos</p>
        </div>
        <div class="space-y-0.5">
          ${activeBranches.map(branch => {
            const iconSvg = Icons[branch.iconKey] ? Icons[branch.iconKey]("w-4 h-4") : Icons.fileText("w-4 h-4");
            const isActive = activeModuleId === branch.id;
            return `
              <button data-module="${branch.id}" class="sidebar-nav-btn w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-colors ${isActive ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
                <div class="flex items-center gap-2.5 truncate">
                  <span class="${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}">${iconSvg}</span>
                  <span class="truncate">${branch.name}</span>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Seção: Ramificações Futuras -->
      <div>
        <div class="flex items-center justify-between px-3 mb-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Outras Ramificações</p>
          <span class="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Planejadas</span>
        </div>
        <div class="space-y-0.5">
          ${upcomingBranches.map(branch => {
            const iconSvg = Icons[branch.iconKey] ? Icons[branch.iconKey]("w-3.5 h-3.5") : Icons.fileText("w-3.5 h-3.5");
            return `
              <button data-placeholder-id="${branch.id}" class="sidebar-placeholder-btn w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <div class="flex items-center gap-2 truncate">
                  <span class="text-slate-400 dark:text-slate-500">${iconSvg}</span>
                  <span class="truncate">${branch.name}</span>
                </div>
                <span class="text-[10px] text-slate-400">Info</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

    </div>

    <!-- Rodapé da Sidebar com link do Laboratório -->
    <div class="p-3 border-t border-slate-200 dark:border-slate-800 text-center">
      <a href="../" class="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors">
        ${Icons.arrowLeft("w-3.5 h-3.5")}
        <span>Menu do Lab</span>
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
