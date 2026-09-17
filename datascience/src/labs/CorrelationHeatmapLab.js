// Laboratório de Matriz de Correlação de Pearson e Gráfico de Dispersão

import { pearsonCorrelation } from "../engine/stats.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderCorrelationHeatmapLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let selectedPair = null;

  function update() {
    const dataset = getActiveDataset();
    if (!dataset || !dataset.data || dataset.data.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500">Nenhum dado ativo no momento.</p>`;
      return;
    }

    const columns = dataset.columns || Object.keys(dataset.data[0] || {});
    const numericCols = dataset.numericColumns || columns.filter(c => typeof dataset.data[0]?.[c] === "number");

    if (numericCols.length < 2) {
      container.innerHTML = `<p class="text-xs text-slate-500">São necessárias pelo menos 2 colunas numéricas no dataset ativo para calcular correlação.</p>`;
      return;
    }

    if (!selectedPair || !numericCols.includes(selectedPair[0]) || !numericCols.includes(selectedPair[1])) {
      selectedPair = [numericCols[0], numericCols[1]];
    }

    // Calcular matriz de correlação
    const corrMatrix = {};
    numericCols.forEach(c1 => {
      corrMatrix[c1] = {};
      numericCols.forEach(c2 => {
        const v1 = dataset.data.map(d => Number(d[c1])).filter(v => !isNaN(v));
        const v2 = dataset.data.map(d => Number(d[c2])).filter(v => !isNaN(v));
        corrMatrix[c1][c2] = pearsonCorrelation(v1, v2);
      });
    });

    container.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.scatter("w-4 h-4 text-slate-500")}</span>
            <span>Matriz de Correlação de Pearson & Inspeção Bivariada</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Clique em qualquer célula da matriz para inspecionar a dispersão 2D dos atributos correspondentes.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Matriz Interativa -->
        <div class="overflow-x-auto p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <table class="w-full text-center text-xs border-collapse">
            <thead>
              <tr>
                <th class="p-2 text-left text-[10px] uppercase font-bold text-slate-400">Atributo</th>
                ${numericCols.map(c => `
                  <th class="p-2 text-[10px] font-mono text-slate-700 dark:text-slate-300 max-w-[80px] truncate" title="${c}">
                    ${c.substring(0, 8)}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${numericCols.map(c1 => `
                <tr class="border-t border-slate-200 dark:border-slate-800">
                  <td class="p-2 text-left font-sans text-[11px] font-semibold text-slate-900 dark:text-white max-w-[90px] truncate" title="${c1}">
                    ${c1.substring(0, 9)}
                  </td>
                  ${numericCols.map(c2 => {
                    const r = corrMatrix[c1][c2];
                    const isSelected = (selectedPair[0] === c1 && selectedPair[1] === c2) || (selectedPair[0] === c2 && selectedPair[1] === c1);
                    return `
                      <td class="p-1">
                        <button data-c1="${c1}" data-c2="${c2}" class="corr-cell w-full py-1.5 rounded text-[11px] font-mono font-bold transition-all ${isSelected ? 'ring-2 ring-slate-900 dark:ring-white scale-105' : 'hover:opacity-80'} ${
                          r > 0.6 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' :
                          r > 0.2 ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' :
                          r < -0.6 ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' :
                          r < -0.2 ? 'bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-200' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }">
                          ${r.toFixed(2)}
                        </button>
                      </td>
                    `;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Dispersão 2D do Par Selecionado -->
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-xs font-bold text-slate-900 dark:text-white">${selectedPair[0]} vs ${selectedPair[1]}</span>
              <span class="text-[10px] font-mono ml-2 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                r = ${corrMatrix[selectedPair[0]][selectedPair[1]].toFixed(3)}
              </span>
            </div>
            <span class="text-[10px] text-slate-400">Dispersão Bivariada</span>
          </div>

          <div class="h-60 relative">
            <canvas id="corr-scatter-canvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    `;

    // Desenhar scatter
    setTimeout(() => {
      const canvas = container.querySelector("#corr-scatter-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const pad = 30;

      ctx.clearRect(0, 0, w, h);

      const xVals = dataset.data.map(d => Number(d[selectedPair[0]])).filter(v => !isNaN(v));
      const yVals = dataset.data.map(d => Number(d[selectedPair[1]])).filter(v => !isNaN(v));

      const minX = Math.min(...xVals), maxX = Math.max(...xVals);
      const minY = Math.min(...yVals), maxY = Math.max(...yVals);

      const scaleX = (val) => pad + ((val - minX) / (maxX - minX || 1)) * (w - pad * 2);
      const scaleY = (val) => (h - pad) - ((val - minY) / (maxY - minY || 1)) * (h - pad * 2);

      // Eixos
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, pad);
      ctx.lineTo(pad, h - pad);
      ctx.lineTo(w - pad, h - pad);
      ctx.stroke();

      // Pontos
      ctx.fillStyle = "#334155";
      dataset.data.forEach(row => {
        const x = Number(row[selectedPair[0]]);
        const y = Number(row[selectedPair[1]]);
        if (!isNaN(x) && !isNaN(y)) {
          ctx.beginPath();
          ctx.arc(scaleX(x), scaleY(y), 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }, 10);

    // Eventos nas células da matriz
    container.querySelectorAll(".corr-cell").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedPair = [btn.getAttribute("data-c1"), btn.getAttribute("data-c2")];
        update();
      });
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
