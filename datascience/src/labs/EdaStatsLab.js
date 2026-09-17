// Laboratório de Estatística Descritiva e Profiling

import { summaryStats } from "../engine/stats.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderEdaStatsLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  function update() {
    const dataset = getActiveDataset();
    if (!dataset || !dataset.data || dataset.data.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500">Nenhum dado ativo no momento.</p>`;
      return;
    }

    const columns = dataset.columns || Object.keys(dataset.data[0] || {});
    const numericCols = dataset.numericColumns || columns.filter(c => typeof dataset.data[0]?.[c] === "number");

    // Estatísticas por coluna
    const statsByCol = {};
    numericCols.forEach(col => {
      const vals = dataset.data.map(d => Number(d[col])).filter(v => !isNaN(v));
      statsByCol[col] = summaryStats(vals);
    });

    container.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.table("w-4 h-4 text-slate-500")}</span>
            <span>Sumário Estatístico Paramétrico & Não-Paramétrico</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dataset ativo: <span class="font-bold text-slate-700 dark:text-slate-300">${dataset.name}</span> (${dataset.data.length} instâncias)
          </p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300 border-collapse">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50">
              <th class="p-2.5">Atributo</th>
              <th class="p-2.5 text-right">Contagem</th>
              <th class="p-2.5 text-right">Média (μ)</th>
              <th class="p-2.5 text-right">Desvio (σ)</th>
              <th class="p-2.5 text-right">Mín</th>
              <th class="p-2.5 text-right">Q1 (25%)</th>
              <th class="p-2.5 text-right">Mediana (Q2)</th>
              <th class="p-2.5 text-right">Q3 (75%)</th>
              <th class="p-2.5 text-right">Máx</th>
              <th class="p-2.5 text-right font-bold text-slate-800 dark:text-slate-200">IQR</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
            ${numericCols.map(col => {
              const s = statsByCol[col];
              if (!s) return "";
              return `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-2.5 font-sans font-semibold text-slate-900 dark:text-white">${col}</td>
                  <td class="p-2.5 text-right text-slate-500">${s.count}</td>
                  <td class="p-2.5 text-right text-slate-900 dark:text-slate-200">${s.mean.toFixed(2)}</td>
                  <td class="p-2.5 text-right text-slate-500">${s.std.toFixed(2)}</td>
                  <td class="p-2.5 text-right">${s.min.toFixed(2)}</td>
                  <td class="p-2.5 text-right text-slate-500">${s.q1.toFixed(2)}</td>
                  <td class="p-2.5 text-right font-bold text-slate-900 dark:text-white">${s.median.toFixed(2)}</td>
                  <td class="p-2.5 text-right text-slate-500">${s.q3.toFixed(2)}</td>
                  <td class="p-2.5 text-right">${s.max.toFixed(2)}</td>
                  <td class="p-2.5 text-right font-bold text-slate-800 dark:text-slate-200">${s.iqr.toFixed(2)}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  update();
  onDatasetChange(update);
  return container;
}
