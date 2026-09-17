// Laboratório Modular de Matriz de Confusão e Curva ROC/AUC

import { evaluateClassificationWithThreshold, computeROCCurve } from "../engine/mlModels.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderConfusionMatrixRocLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let threshold = 0.50;

  function generateDatasetPredictions(dataset) {
    const samples = [];
    const n = dataset && dataset.data ? Math.min(dataset.data.length, 100) : 50;
    const targetCol = dataset?.target || dataset?.categoricalColumns?.[0];

    for (let i = 0; i < n; i++) {
      let actual = 0;
      if (dataset && dataset.data && dataset.data[i] && targetCol) {
        const val = String(dataset.data[i][targetCol]).toLowerCase();
        actual = (val === "1" || val === "sim" || val === "true" || val === "virginica" || val === "versicolor") ? 1 : 0;
      } else {
        actual = i % 2 === 0 ? 1 : 0;
      }

      const score = actual === 1
        ? Math.min(0.99, Math.max(0.1, 0.70 + (Math.random() - 0.5) * 0.4))
        : Math.min(0.90, Math.max(0.01, 0.30 + (Math.random() - 0.5) * 0.4));

      samples.push({ actual, score: Number(score.toFixed(2)) });
    }
    return samples;
  }

  function update() {
    const dataset = getActiveDataset();
    const samples = generateDatasetPredictions(dataset);
    const rocResult = computeROCCurve(samples);
    const metrics = evaluateClassificationWithThreshold(samples, threshold);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.target("w-4 h-4 text-slate-500")}</span>
            <span>Matriz de Confusão & Curva ROC sob Limiar Dinâmico</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Varie o limiar de corte ($T$) para observar o trade-off entre Sensibilidade e Falsos Positivos.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
            AUC-ROC = ${rocResult.auc.toFixed(3)}
          </span>
        </div>
      </div>

      <!-- Controle do Threshold -->
      <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Limiar de Decisão (T): P(Y=1) ≥ T</span>
          <span class="font-mono text-slate-900 dark:text-white font-bold">T = ${threshold.toFixed(2)}</span>
        </div>
        <input id="roc-thresh-slider" type="range" min="0.05" max="0.95" step="0.02" value="${threshold}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        <div class="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>T=0.0 (Sensibilidade 100%, Alta Taxa de Falsos Positivos)</span>
          <span>T=0.5</span>
          <span>T=1.0 (Especificidade 100%, Baixa Sensibilidade)</span>
        </div>
      </div>

      <!-- Matriz 2x2 e Métricas Derivadas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Matriz de Confusão -->
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">Matriz de Confusão 2x2</span>
            <span class="text-[10px] text-slate-400 font-mono">${samples.length} amostras</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-center text-xs font-mono">
            <div class="p-3 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] uppercase font-bold text-slate-500 font-sans block">Verdadeiro Positivo (TP)</span>
              <span class="text-lg font-bold text-slate-900 dark:text-white mt-1 block">${metrics.tp}</span>
            </div>
            <div class="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] uppercase font-bold text-slate-400 font-sans block">Falso Positivo (FP)</span>
              <span class="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1 block">${metrics.fp}</span>
            </div>
            <div class="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] uppercase font-bold text-slate-400 font-sans block">Falso Negativo (FN)</span>
              <span class="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1 block">${metrics.fn}</span>
            </div>
            <div class="p-3 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] uppercase font-bold text-slate-500 font-sans block">Verdadeiro Negativo (TN)</span>
              <span class="text-lg font-bold text-slate-900 dark:text-white mt-1 block">${metrics.tn}</span>
            </div>
          </div>

          <!-- Métricas Derivadas -->
          <div class="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center font-mono">
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
              <span class="text-[9px] uppercase font-bold text-slate-400 font-sans block">Acurácia</span>
              <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">${(metrics.accuracy * 100).toFixed(1)}%</span>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
              <span class="text-[9px] uppercase font-bold text-slate-400 font-sans block">Precisão</span>
              <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">${(metrics.precision * 100).toFixed(1)}%</span>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
              <span class="text-[9px] uppercase font-bold text-slate-400 font-sans block">Recall</span>
              <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">${(metrics.recall * 100).toFixed(1)}%</span>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
              <span class="text-[9px] uppercase font-bold text-slate-400 font-sans block">F1-Score</span>
              <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">${(metrics.f1 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <!-- Curva ROC Interativa -->
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">Espaço ROC (TPR vs FPR)</span>
            <span class="text-[10px] text-slate-400 font-mono">Ponto atual destacado</span>
          </div>

          <div class="h-60 relative">
            <canvas id="roc-canvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const canvas = container.querySelector("#roc-canvas");
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

      const scaleX = (fpr) => pad + fpr * (w - pad * 2);
      const scaleY = (tpr) => (h - pad) - tpr * (h - pad * 2);

      // Linha diagonal aleatória (Baseline)
      ctx.strokeStyle = "#cbd5e1";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(scaleX(0), scaleY(0));
      ctx.lineTo(scaleX(1), scaleY(1));
      ctx.stroke();
      ctx.setLineDash([]);

      // Curva ROC
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      rocResult.points.forEach((p, idx) => {
        const px = scaleX(p.fpr);
        const py = scaleY(p.tpr);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Ponto operacional atual sob o threshold
      const curFpr = metrics.fpr;
      const curTpr = metrics.recall;

      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(scaleX(curFpr), scaleY(curTpr), 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Rótulos dos eixos
      ctx.fillStyle = "#64748b";
      ctx.font = "10px monospace";
      ctx.fillText("FPR (1 - Especificidade)", w / 2 - 40, h - 5);
      ctx.save();
      ctx.translate(12, h / 2 + 30);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("TPR (Sensibilidade)", 0, 0);
      ctx.restore();
    }, 10);

    container.querySelector("#roc-thresh-slider").addEventListener("input", (e) => {
      threshold = parseFloat(e.target.value);
      update();
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
