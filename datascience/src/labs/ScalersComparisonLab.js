// Laboratório Modular de Comparação de Escalonadores (MinMax, Standard, Robust)

import { minMaxScaler, standardScaler, robustScaler } from "../engine/scalers.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderScalersComparisonLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let selectedCol = null;

  function update() {
    const dataset = getActiveDataset();
    if (!dataset || !dataset.data || dataset.data.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500">Nenhum dado ativo no momento.</p>`;
      return;
    }

    const numericCols = dataset.numericColumns || [];
    if (numericCols.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500">Nenhuma coluna numérica disponível no dataset ativo.</p>`;
      return;
    }

    if (!selectedCol || !numericCols.includes(selectedCol)) {
      selectedCol = numericCols[0];
    }

    const rawValues = dataset.data.map(d => Number(d[selectedCol])).filter(v => !isNaN(v)).slice(0, 15);
    const minMaxVals = minMaxScaler(rawValues);
    const stdVals = standardScaler(rawValues);
    const robustVals = robustScaler(rawValues);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.sliders("w-4 h-4 text-slate-500")}</span>
            <span>Comparativo de Escalonadores Numéricos</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Analise a sensibilidade de cada normalizador a valores extremos e suas propriedades de distribuição.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-500">Atributo:</label>
          <select id="scaler-col-select" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none">
            ${numericCols.map(col => `
              <option value="${col}" ${col === selectedCol ? 'selected' : ''}>${col}</option>
            `).join("")}
          </select>
        </div>
      </div>

      <!-- Tabela Comparativa Lado a Lado -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50">
              <th class="p-2.5">Índice</th>
              <th class="p-2.5 text-right">Original (X)</th>
              <th class="p-2.5 text-right font-bold text-slate-900 dark:text-white">MinMaxScaler [0, 1]</th>
              <th class="p-2.5 text-right font-bold text-slate-900 dark:text-white">StandardScaler (Z)</th>
              <th class="p-2.5 text-right font-bold text-slate-900 dark:text-white">RobustScaler (IQR)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
            ${rawValues.map((val, idx) => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td class="p-2.5 text-slate-400 font-sans">#${idx + 1}</td>
                <td class="p-2.5 text-right text-slate-700 dark:text-slate-300 font-bold">${val.toFixed(2)}</td>
                <td class="p-2.5 text-right text-slate-900 dark:text-white font-semibold">${minMaxVals[idx]?.toFixed(3) ?? '-'}</td>
                <td class="p-2.5 text-right text-slate-900 dark:text-white font-semibold">${stdVals[idx]?.toFixed(3) ?? '-'}</td>
                <td class="p-2.5 text-right text-slate-900 dark:text-white font-semibold">${robustVals[idx]?.toFixed(3) ?? '-'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Descrição das Fórmulas dos 3 Métodos -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
          <p class="font-bold text-slate-900 dark:text-white mb-1">MinMaxScaler</p>
          <p class="font-mono text-[11px] text-slate-600 dark:text-slate-300 mb-1">X' = (X - Xmin) / (Xmax - Xmin)</p>
          <p class="text-[11px] text-slate-500">Fixa os dados exatamente no intervalo [0, 1]. Muito sensível a outliers.</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
          <p class="font-bold text-slate-900 dark:text-white mb-1">StandardScaler (Z-Score)</p>
          <p class="font-mono text-[11px] text-slate-600 dark:text-slate-300 mb-1">Z = (X - μ) / σ</p>
          <p class="text-[11px] text-slate-500">Centraliza a média em 0 e desvio em 1. Ideal para regressão e redes neurais.</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
          <p class="font-bold text-slate-900 dark:text-white mb-1">RobustScaler</p>
          <p class="font-mono text-[11px] text-slate-600 dark:text-slate-300 mb-1">X' = (X - Q2) / (Q3 - Q1)</p>
          <p class="text-[11px] text-slate-500">Usa mediana e IQR. Altamente resistente a valores anômalos extremos.</p>
        </div>
      </div>
    `;

    container.querySelector("#scaler-col-select").addEventListener("change", (e) => {
      selectedCol = e.target.value;
      update();
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
