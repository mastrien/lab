// Barra indicadora do Dataset Ativo com atalho para troca e importação rápida

import { getActiveDataset } from "../data/datasetStore.js";
import { renderDatasetSelectorModal } from "./DatasetSelectorModal.js";
import { Icons } from "./Icons.js";

export function renderActiveDatasetBar(onDatasetChanged) {
  const active = getActiveDataset();
  const rows = active.data ? active.data.length : (active.transactions ? active.transactions.length : 0);
  const cols = active.columns ? active.columns.length : 0;

  const bar = document.createElement("div");
  bar.className = "flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-6 text-xs";

  bar.innerHTML = `
    <div class="flex items-center gap-2.5 min-w-0">
      <span class="text-slate-600 dark:text-slate-400 shrink-0">${Icons.database("w-4 h-4")}</span>
      <div class="flex flex-wrap items-center gap-2 min-w-0">
        <span class="text-slate-500 dark:text-slate-400 font-medium">Dataset em uso:</span>
        <span class="font-bold text-slate-900 dark:text-white truncate">${active.name}</span>
        <span class="text-slate-400 dark:text-slate-500">•</span>
        <span class="text-slate-600 dark:text-slate-400 font-mono">${rows} registros</span>
        <span class="text-slate-400 dark:text-slate-500">•</span>
        <span class="text-slate-600 dark:text-slate-400 font-mono">${cols} atributos</span>
        ${active.isCustom ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">Customizado</span>` : ''}
      </div>
    </div>

    <div class="flex items-center gap-2 shrink-0">
      <button id="bar-change-dataset-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs transition-colors">
        ${Icons.refresh("w-3.5 h-3.5")}
        <span>Trocar Dataset</span>
      </button>

      <button id="bar-upload-dataset-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-colors">
        ${Icons.upload("w-3.5 h-3.5")}
        <span>Importar CSV</span>
      </button>
    </div>
  `;

  const openModal = () => {
    renderDatasetSelectorModal(() => {
      if (onDatasetChanged) onDatasetChanged();
    });
  };

  bar.querySelector("#bar-change-dataset-btn").addEventListener("click", openModal);
  bar.querySelector("#bar-upload-dataset-btn").addEventListener("click", openModal);

  return bar;
}
