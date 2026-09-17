// Hub Unificado de Laboratórios Práticos com Filtro Hierárquico em Árvore de Pastas

import { LAB_REGISTRY, getLabById } from "../../labs/registry.js";
import { CURRICULUM_AXES } from "../../data/curriculum.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderLabsCatalogView(initialLabId = null) {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-7xl mx-auto";

  let selectedLabId = initialLabId || "clt-lab";
  let openAxes = new Set(["axis-1", "axis-4", "axis-5", "axis-6", "axis-8"]);

  function render() {
    container.innerHTML = "";

    // 1. Barra de Dataset Ativo no Topo
    const datasetBar = renderActiveDatasetBar(() => {
      // Re-renderizar o lab ativo após troca de dataset
      mountSelectedLab();
    });
    container.appendChild(datasetBar);

    // 2. Cabeçalho do Hub
    const headerEl = document.createElement("div");
    headerEl.className = "border-b border-slate-200 dark:border-slate-800 pb-5";
    headerEl.innerHTML = `
      <div class="flex items-center gap-2 mb-1">
        <span class="text-slate-700 dark:text-slate-300">${Icons.cpu("w-5 h-5")}</span>
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          Ambiente Prático Interativo
        </span>
      </div>
      <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        Hub de Laboratórios Práticos
      </h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Acesse e execute diretamente qualquer bancada experimental da plataforma sobre o dataset ativo armazenado no navegador.
      </p>
    `;
    container.appendChild(headerEl);

    // 3. Layout Principal: Árvore Hierárquica na Esquerda + Host do Lab na Direita
    const mainGrid = document.createElement("div");
    mainGrid.className = "grid grid-cols-1 lg:grid-cols-4 gap-6 items-start";

    // Sidebar de Árvore (Eixo > Capítulo > Laboratório)
    const treeSidebar = document.createElement("div");
    treeSidebar.className = "lg:col-span-1 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs";

    // Agrupar laboratórios por Eixo
    const activeAxesWithLabs = CURRICULUM_AXES.map(axis => {
      const labsInAxis = LAB_REGISTRY.filter(l => l.axisId === axis.id);
      return { axis, labs: labsInAxis };
    }).filter(group => group.labs.length > 0);

    treeSidebar.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <span class="font-bold uppercase tracking-wider text-[10px] text-slate-400">Navegador em Árvore</span>
        <span class="text-[10px] font-mono text-slate-500">${LAB_REGISTRY.length} labs</span>
      </div>

      <div class="space-y-2">
        ${activeAxesWithLabs.map(group => {
          const isOpen = openAxes.has(group.axis.id);
          return `
            <div class="space-y-1">
              <!-- Pasta do Eixo -->
              <button data-toggle-axis="${group.axis.id}" class="w-full flex items-center justify-between py-1.5 px-2 rounded-md font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left">
                <div class="flex items-center gap-1.5 truncate">
                  <span class="text-slate-400">
                    ${isOpen ? Icons.folderOpen("w-3.5 h-3.5") : Icons.folder("w-3.5 h-3.5")}
                  </span>
                  <span class="truncate">Eixo ${group.axis.number}: ${group.axis.slug}</span>
                </div>
                <span class="text-slate-400 text-[10px]">
                  ${isOpen ? Icons.chevronDown("w-3 h-3") : Icons.chevronRight("w-3 h-3")}
                </span>
              </button>

              <!-- Lista de Laboratórios do Eixo -->
              ${isOpen ? `
                <div class="pl-4 space-y-0.5 border-l border-slate-200 dark:border-slate-800 ml-3">
                  ${group.labs.map(lab => {
                    const isCurrent = lab.id === selectedLabId;
                    return `
                      <button data-select-lab="${lab.id}" class="w-full flex items-center gap-2 py-1.5 px-2 rounded text-left transition-colors truncate ${
                        isCurrent 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                      }">
                        <span class="${isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400'}">${Icons.play("w-2.5 h-2.5")}</span>
                        <span class="truncate">${lab.name}</span>
                      </button>
                    `;
                  }).join("")}
                </div>
              ` : ''}
            </div>
          `;
        }).join("")}
      </div>
    `;

    mainGrid.appendChild(treeSidebar);

    // Painel do Laboratório Ativo
    const labHostContainer = document.createElement("div");
    labHostContainer.id = "lab-host-container";
    labHostContainer.className = "lg:col-span-3 space-y-4";
    mainGrid.appendChild(labHostContainer);

    container.appendChild(mainGrid);

    // Eventos da Árvore
    treeSidebar.querySelectorAll("[data-toggle-axis]").forEach(btn => {
      btn.addEventListener("click", () => {
        const axisId = btn.getAttribute("data-toggle-axis");
        if (openAxes.has(axisId)) openAxes.delete(axisId);
        else openAxes.add(axisId);
        render();
      });
    });

    treeSidebar.querySelectorAll("[data-select-lab]").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedLabId = btn.getAttribute("data-select-lab");
        window.location.hash = `#labs/${selectedLabId}`;
        render();
      });
    });

    mountSelectedLab();
  }

  function mountSelectedLab() {
    const host = container.querySelector("#lab-host-container");
    if (!host) return;
    host.innerHTML = "";

    const labMeta = getLabById(selectedLabId) || LAB_REGISTRY[0];
    if (!labMeta) return;

    // Header do Lab com atalho para a teoria
    const topBar = document.createElement("div");
    topBar.className = "p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3";
    topBar.innerHTML = `
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
            ${labMeta.axisName}
          </span>
          <span class="text-[10px] text-slate-400 truncate max-w-[260px]">${labMeta.chapterTitle}</span>
        </div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white mt-1">${labMeta.name}</h2>
      </div>

      <a href="#chapter/${labMeta.chapterId}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shrink-0">
        ${Icons.bookOpen("w-3.5 h-3.5")}
        <span>Ver Teoria do Capítulo</span>
      </a>
    `;
    host.appendChild(topBar);

    // Instanciar o laboratório modular
    const labComponent = labMeta.render();
    host.appendChild(labComponent);
  }

  render();
  return container;
}
