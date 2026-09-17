// Barra Lateral de Navegação Hierárquica baseada nos 10 Eixos e no Hub de Laboratórios

import { CURRICULUM_AXES } from "../data/curriculum.js";
import { LAB_REGISTRY } from "../labs/registry.js";
import { Icons } from "./Icons.js";

export function renderSidebar(activeRoute, onNavigate, onCloseMobile) {
  const sidebar = document.createElement("aside");
  sidebar.className = "w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-colors";

  sidebar.innerHTML = `
    <!-- Navegação Scrollável -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar text-xs">
      
      <!-- Seção Principal: Início & Hub de Laboratórios -->
      <div class="space-y-1">
        <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Principal</p>
        
        <button data-route="overview" class="sidebar-nav-btn w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors ${activeRoute === 'overview' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
          <span class="text-slate-500 dark:text-slate-400">${Icons.layers("w-4 h-4")}</span>
          <span>Visão Geral</span>
        </button>

        <button data-route="labs" class="sidebar-nav-btn w-full flex items-center justify-between px-3 py-2 rounded-md font-semibold transition-colors ${activeRoute.startsWith('labs') ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
          <div class="flex items-center gap-2.5 truncate">
            <span class="text-slate-500 dark:text-slate-400">${Icons.cpu("w-4 h-4")}</span>
            <span class="truncate">Hub de Laboratórios</span>
          </div>
          <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
            ${LAB_REGISTRY.length}
          </span>
        </button>
      </div>

      <!-- Seção: Os 10 Grandes Eixos de Conteúdo -->
      <div class="space-y-1">
        <div class="flex items-center justify-between px-3 mb-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">10 Eixos Canônicos</p>
          <span class="text-[9px] font-mono text-slate-400 font-semibold">10</span>
        </div>

        <div class="space-y-0.5">
          ${CURRICULUM_AXES.map(axis => {
            const iconSvg = Icons[axis.iconKey] ? Icons[axis.iconKey]("w-3.5 h-3.5") : Icons.fileText("w-3.5 h-3.5");
            const isActive = activeRoute === `axis/${axis.id}` || activeRoute === axis.id;
            return `
              <button data-route="axis/${axis.id}" class="sidebar-nav-btn w-full flex items-center justify-between px-3 py-1.5 rounded-md font-medium transition-colors ${isActive ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
                <div class="flex items-center gap-2 truncate">
                  <span class="${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}">${iconSvg}</span>
                  <span class="truncate text-[11px]">${axis.number}. ${axis.title}</span>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Seção: Ferramentas & Apoio -->
      <div class="space-y-1">
        <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Ferramentas & Apoio</p>
        
        <button data-route="mylab" class="sidebar-nav-btn w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors ${activeRoute === 'mylab' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
          <span class="text-slate-500 dark:text-slate-400">${Icons.table("w-4 h-4")}</span>
          <span>Meu Laboratório (CSV)</span>
        </button>

        <button data-route="quizzes" class="sidebar-nav-btn w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors ${activeRoute === 'quizzes' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
          <span class="text-slate-500 dark:text-slate-400">${Icons.bookOpen("w-4 h-4")}</span>
          <span>Exercícios Conceituais</span>
        </button>
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
      const targetRoute = btn.getAttribute("data-route");
      if (onNavigate) onNavigate(targetRoute);
      if (onCloseMobile) onCloseMobile();
    });
  });

  return sidebar;
}
