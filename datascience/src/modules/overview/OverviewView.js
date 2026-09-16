// Módulo Visão Geral / Hub do DataLab

import { DS_BRANCHES } from "../../data/branches.js";
import { createPlaceholderCard } from "../../components/PlaceholderCard.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderOverviewView(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  const activeBranches = DS_BRANCHES.filter(b => b.status === "active");
  const upcomingBranches = DS_BRANCHES.filter(b => b.status === "upcoming");

  function render() {
    container.innerHTML = "";

    // Barra de Dataset Ativo
    const datasetBar = renderActiveDatasetBar(() => render());
    container.appendChild(datasetBar);

    // Seção de Apresentação Técnica e Objetiva
    const headerSection = document.createElement("div");
    headerSection.className = "p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3";
    headerSection.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Laboratório Computacional de Ciência de Dados</span>
      </div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        DataLab: Aprendizado Interativo em Ciência de Dados
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
        Ambiente estruturado para experimentação de algoritmos de Mineração de Dados (KDD), Análise Exploratória e Machine Learning com processamento local no navegador. Carregue conjuntos de dados tabulares em CSV ou selecione os conjuntos de referência para testar hipóteses, avaliar modelos e inspecionar transformações.
      </p>

      <div class="flex flex-wrap gap-2.5 pt-2">
        <button id="overview-btn-kdd" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold shadow-xs">
          ${Icons.database("w-4 h-4")}
          <span>Mineração de Dados & KDD</span>
        </button>

        <button id="overview-btn-mylab" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          ${Icons.upload("w-4 h-4")}
          <span>Gerenciar / Carregar Dataset</span>
        </button>
      </div>
    `;
    container.appendChild(headerSection);

    // Grade de Módulos Práticos Ativos
    const activeSection = document.createElement("div");
    activeSection.className = "space-y-4";
    activeSection.innerHTML = `
      <div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Módulos Disponíveis</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">Selecione uma área do ciclo analítico para iniciar:</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="active-modules-grid">
        ${activeBranches.map(b => {
          const iconSvg = Icons[b.iconKey] ? Icons[b.iconKey]("w-5 h-5") : Icons.fileText("w-5 h-5");
          return `
            <div data-active-module="${b.id}" class="active-module-card p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    ${iconSvg}
                  </div>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    ${b.badge}
                  </span>
                </div>
                <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">${b.category}</p>
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1.5">${b.name}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">${b.shortDesc}</p>
              </div>
              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Acessar Módulo</span>
                <span class="transform group-hover:translate-x-1 transition-transform">${Icons.arrowRight("w-3.5 h-3.5")}</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
    container.appendChild(activeSection);

    // Seção de Próximas Ramificações (Placeholders)
    const upcomingSection = document.createElement("div");
    upcomingSection.className = "pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4";
    upcomingSection.innerHTML = `
      <div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Ramificações Planejadas</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Tópicos adicionais em estruturação para o currículo do laboratório:
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="upcoming-modules-grid"></div>
    `;
    container.appendChild(upcomingSection);

    // Listeners
    headerSection.querySelector("#overview-btn-kdd").addEventListener("click", () => {
      if (onNavigate) onNavigate("kdd");
    });

    headerSection.querySelector("#overview-btn-mylab").addEventListener("click", () => {
      if (onNavigate) onNavigate("mylab");
    });

    activeSection.querySelectorAll(".active-module-card").forEach(card => {
      card.addEventListener("click", () => {
        const mod = card.getAttribute("data-active-module");
        if (onNavigate) onNavigate(mod);
      });
    });

    // Injetar cards de placeholder
    const upcomingGrid = upcomingSection.querySelector("#upcoming-modules-grid");
    upcomingBranches.forEach(branch => {
      const card = createPlaceholderCard(branch);
      upcomingGrid.appendChild(card);
    });
  }

  render();
  return container;
}
