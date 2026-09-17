// Laboratório Modular de Detecção de Anomalias com Regra de Tukey IQR

import { detectOutliersTukey } from "../engine/stats.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderTukeyOutlierLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let selectedCol = null;
  let iqrMultiplier = 1.5;

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

    const values = dataset.data.map(d => Number(d[selectedCol])).filter(v => !isNaN(v));
    const outlierResult = detectOutliersTukey(values, iqrMultiplier);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.sliders("w-4 h-4 text-slate-500")}</span>
            <span>Detecção de Outliers e Anomalias (Regra de Tukey)</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Identifique pontos anômalos fora das barreiras $[Q_1 - k \\cdot IQR, Q_3 + k \\cdot IQR]$.
          </p>
        </div>

        <!-- Seletor de Coluna -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-500">Atributo:</label>
          <select id="tukey-col-select" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none">
            ${numericCols.map(col => `
              <option value="${col}" ${col === selectedCol ? 'selected' : ''}>${col}</option>
            `).join("")}
          </select>
        </div>
      </div>

      <!-- Métricas dos Limites de Tukey -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Limite Inferior (Q1 - k·IQR)</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${outlierResult.lowerBound.toFixed(2)}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">IQR (Q3 - Q1)</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${outlierResult.iqr.toFixed(2)}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Limite Superior (Q3 + k·IQR)</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${outlierResult.upperBound.toFixed(2)}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Total de Outliers</p>
          <p class="text-base font-mono font-bold ${outlierResult.outliers.length > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-500'} mt-0.5">
            ${outlierResult.outliers.length} <span class="text-xs font-normal text-slate-400">(${((outlierResult.outliers.length / values.length) * 100).toFixed(1)}%)</span>
          </p>
        </div>
      </div>

      <!-- Visualizador do Boxplot com Faixas de Tukey -->
      <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-800 dark:text-slate-200">Distribuição com Barreiras de Corte</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">Multiplicador k:</span>
            <button data-k="1.5" class="k-btn px-2 py-0.5 rounded text-xs font-bold ${iqrMultiplier === 1.5 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600'}">1.5x (Leve)</button>
            <button data-k="3.0" class="k-btn px-2 py-0.5 rounded text-xs font-bold ${iqrMultiplier === 3.0 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600'}">3.0x (Extremo)</button>
          </div>
        </div>
        <div class="h-44 relative">
          <canvas id="tukey-canvas" class="w-full h-full"></canvas>
        </div>
      </div>
    `;

    setTimeout(() => {
      const canvas = container.querySelector("#tukey-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const pad = 40;

      ctx.clearRect(0, 0, w, h);

      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const scaleX = (val) => pad + ((val - minVal) / (maxVal - minVal || 1)) * (w - pad * 2);

      // Eixo horizontal
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, h / 2);
      ctx.lineTo(w - pad, h / 2);
      ctx.stroke();

      // Limites de corte
      const lowX = scaleX(outlierResult.lowerBound);
      const upX = scaleX(outlierResult.upperBound);

      ctx.strokeStyle = "#ef4444"; // red
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(lowX, 15);
      ctx.lineTo(lowX, h - 15);
      ctx.moveTo(upX, 15);
      ctx.lineTo(upX, h - 15);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pontos individuais (jitter vertical)
      values.forEach(v => {
        const isOutlier = v < outlierResult.lowerBound || v > outlierResult.upperBound;
        const x = scaleX(v);
        const y = (h / 2) + (Math.sin(v * 10) * (isOutlier ? 18 : 10));

        ctx.fillStyle = isOutlier ? "#dc2626" : "#475569";
        ctx.beginPath();
        ctx.arc(x, y, isOutlier ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }, 10);

    container.querySelector("#tukey-col-select").addEventListener("change", (e) => {
      selectedCol = e.target.value;
      update();
    });

    container.querySelectorAll(".k-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        iqrMultiplier = parseFloat(btn.getAttribute("data-k"));
        update();
      });
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
