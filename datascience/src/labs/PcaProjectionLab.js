// Laboratório Modular de Redução de Dimensionalidade (PCA 2D)

import { computePCA2D } from "../engine/scalers.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderPcaProjectionLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  function update() {
    const dataset = getActiveDataset();
    if (!dataset || !dataset.data || dataset.data.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500">Nenhum dado ativo no momento.</p>`;
      return;
    }

    const numericCols = dataset.numericColumns || [];
    if (numericCols.length < 2) {
      container.innerHTML = `<p class="text-xs text-slate-500">São necessárias pelo menos 2 colunas numéricas para computar o PCA.</p>`;
      return;
    }

    // Extrair matriz numérica
    const matrix = dataset.data.map(row => {
      return numericCols.map(col => {
        const val = Number(row[col]);
        return isNaN(val) ? 0 : val;
      });
    });

    const pcaResult = computePCA2D(matrix);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.layers("w-4 h-4 text-slate-500")}</span>
            <span>Redução de Dimensionalidade 2D (PCA)</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Projeção ortogonal das ${numericCols.length} variáveis originais sobre os 2 eixos de máxima variância latente.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700">
            Variância Explicada: ${((pcaResult.explainedVarianceRatio[0] + pcaResult.explainedVarianceRatio[1]) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Gráfico do Plano PCA (PC1 vs PC2) -->
        <div class="lg:col-span-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-900 dark:text-white">Espaço Latente Reduzido (PC1 vs PC2)</span>
            <span class="text-[10px] text-slate-400 font-mono">${dataset.data.length} instâncias projetadas</span>
          </div>

          <div class="h-64 relative">
            <canvas id="pca-canvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Métricas dos Componentes -->
        <div class="space-y-3">
          <div class="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p class="text-[10px] uppercase font-bold text-slate-400">Componente Principal 1 (PC1)</p>
            <p class="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1">
              ${(pcaResult.explainedVarianceRatio[0] * 100).toFixed(1)}%
            </p>
            <p class="text-xs text-slate-500 mt-1">Capta a maior variância individual dos atributos originais.</p>
          </div>

          <div class="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p class="text-[10px] uppercase font-bold text-slate-400">Componente Principal 2 (PC2)</p>
            <p class="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1">
              ${(pcaResult.explainedVarianceRatio[1] * 100).toFixed(1)}%
            </p>
            <p class="text-xs text-slate-500 mt-1">Ortogonal a PC1, capta a maior parcela remanescente da variância.</p>
          </div>

          <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
            <p class="font-bold text-slate-700 dark:text-slate-300 mb-1">Colunas Incluídas:</p>
            <div class="flex flex-wrap gap-1">
              ${numericCols.map(c => `
                <span class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                  ${c}
                </span>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const canvas = container.querySelector("#pca-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const pad = 35;

      ctx.clearRect(0, 0, w, h);

      const pc1 = pcaResult.projected.map(p => p[0]);
      const pc2 = pcaResult.projected.map(p => p[1]);

      const minX = Math.min(...pc1), maxX = Math.max(...pc1);
      const minY = Math.min(...pc2), maxY = Math.max(...pc2);

      const scaleX = (val) => pad + ((val - minX) / (maxX - minX || 1)) * (w - pad * 2);
      const scaleY = (val) => (h - pad) - ((val - minY) / (maxY - minY || 1)) * (h - pad * 2);

      // Eixos centrais
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, h / 2);
      ctx.lineTo(w - pad, h / 2);
      ctx.moveTo(w / 2, pad);
      ctx.lineTo(w / 2, h - pad);
      ctx.stroke();

      // Rótulos dos eixos
      ctx.fillStyle = "#64748b";
      ctx.font = "10px monospace";
      ctx.fillText("PC1", w - pad - 15, h / 2 - 6);
      ctx.fillText("PC2", w / 2 + 6, pad + 10);

      // Pontos projetados
      ctx.fillStyle = "#1e293b";
      pcaResult.projected.forEach(pt => {
        ctx.beginPath();
        ctx.arc(scaleX(pt[0]), scaleY(pt[1]), 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }, 10);
  }

  update();
  onDatasetChange(update);
  return container;
}
