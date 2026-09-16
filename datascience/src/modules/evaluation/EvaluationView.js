// Módulo de Avaliação de Modelos, Matriz de Confusão & Curva ROC/AUC

import { evaluateClassificationWithThreshold, computeROCCurve } from "../../engine/mlModels.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderEvaluationView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let threshold = 0.50;

  function generateDatasetPredictions(dataset) {
    const samples = [];
    const n = dataset.data ? Math.min(dataset.data.length, 100) : 50;

    // Se o dataset tem target binário, usa os valores reais
    const targetCol = dataset.target || dataset.categoricalColumns?.[0];

    for (let i = 0; i < n; i++) {
      let actual = 0;
      if (dataset.data && dataset.data[i] && targetCol) {
        const val = String(dataset.data[i][targetCol]).toLowerCase();
        actual = (val === "1" || val === "sim" || val === "true" || val === "virginica" || val === "versicolor") ? 1 : 0;
      } else {
        actual = i % 2 === 0 ? 1 : 0;
      }

      // Pontuação probabilística simulada em torno do valor real
      const score = actual === 1
        ? Math.min(0.99, Math.max(0.1, 0.70 + (Math.random() - 0.5) * 0.4))
        : Math.min(0.90, Math.max(0.01, 0.30 + (Math.random() - 0.5) * 0.4));

      samples.push({ actual, score: Number(score.toFixed(2)) });
    }
    return samples;
  }

  function render() {
    const dataset = getActiveDataset();
    const samples = generateDatasetPredictions(dataset);
    const rocResult = computeROCCurve(samples);
    const metrics = evaluateClassificationWithThreshold(samples, threshold);

    container.innerHTML = "";

    // Barra de Dataset Ativo
    const datasetBar = renderActiveDatasetBar(() => render());
    container.appendChild(datasetBar);

    const mainContent = document.createElement("div");
    mainContent.className = "space-y-6";

    mainContent.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-slate-700 dark:text-slate-300">${Icons.target("w-5 h-5")}</span>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Validação
          </span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Avaliação de Classificadores & Métricas
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Efeito da variação do Limiar de Decisão (Threshold) nas taxas de Verdadeiros/Falsos Positivos e curva ROC.
        </p>
      </div>

      <!-- Slider de Threshold -->
      <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>Limiar de Corte (Decision Threshold):</span>
              <span class="font-mono font-bold text-sm">T = ${threshold.toFixed(2)}</span>
            </h3>
            <p class="text-[11px] text-slate-500">
              Probabilidade predita ≥ T é classificada como Positiva (1); caso contrário, Negativa (0).
            </p>
          </div>
          <span class="text-[11px] text-slate-500 font-mono">
            ${samples.length} predições avaliadas
          </span>
        </div>

        <input type="range" id="slider-threshold" min="0.05" max="0.95" step="0.02" value="${threshold}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">

        <div class="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>0.00 (Classifica tudo como 1)</span>
          <span>0.50 (Limiar balanceado)</span>
          <span>1.00 (Classifica tudo como 0)</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Matriz de Confusão 2x2 -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Matriz de Confusão</h3>
          
          <div class="grid grid-cols-2 gap-2.5">
            <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verdadeiro Positivo (VP)</span>
              <p class="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">${metrics.tp}</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Real: 1 | Previsto: 1</p>
            </div>

            <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Falso Positivo (FP) - Erro I</span>
              <p class="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">${metrics.fp}</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Real: 0 | Previsto: 1</p>
            </div>

            <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Falso Negativo (FN) - Erro II</span>
              <p class="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">${metrics.fn}</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Real: 1 | Previsto: 0</p>
            </div>

            <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verdadeiro Negativo (VN)</span>
              <p class="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">${metrics.tn}</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Real: 0 | Previsto: 0</p>
            </div>
          </div>

          <!-- Métricas Derivadas -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center text-xs">
            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-semibold text-slate-400 uppercase">Acurácia</span>
              <p class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${(metrics.accuracy * 100).toFixed(1)}%</p>
            </div>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-semibold text-slate-400 uppercase">Precisão</span>
              <p class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${(metrics.precision * 100).toFixed(1)}%</p>
            </div>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-semibold text-slate-400 uppercase">Recall</span>
              <p class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${(metrics.recall * 100).toFixed(1)}%</p>
            </div>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-semibold text-slate-400 uppercase">F1-Score</span>
              <p class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${metrics.f1}</p>
            </div>
          </div>
        </div>

        <!-- Curva ROC e AUC -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Curva ROC (Sensibilidade × 1 - Especificidade)</h3>
            </div>
            <span class="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700">
              AUC = ${rocResult.auc}
            </span>
          </div>

          <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
            <canvas id="roc-canvas" width="400" height="230" class="w-full h-auto bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"></canvas>
            <div class="flex items-center justify-center gap-4 mt-2 text-[10px] text-slate-500">
              <span>Linha contínua: Curva ROC</span>
              <span>Tracejado: Classificador Aleatório (AUC 0.5)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(mainContent);

    // Listener do slider
    mainContent.querySelector("#slider-threshold")?.addEventListener("input", (e) => {
      threshold = Number(e.target.value);
      render();
      setTimeout(() => drawRocCanvas(samples, rocResult), 50);
    });

    setTimeout(() => drawRocCanvas(samples, rocResult), 50);
  }

  function drawRocCanvas(samples, rocResult) {
    const canvas = container.querySelector("#roc-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 35;
    function toCanvasX(fpr) { return pad + fpr * (w - 2 * pad); }
    function toCanvasY(tpr) { return (h - pad) - tpr * (h - 2 * pad); }

    // Eixos
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText("FPR", w / 2 - 10, h - 8);
    ctx.fillText("TPR", 8, pad + 10);

    // Diagonal Aleatória
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(0));
    ctx.lineTo(toCanvasX(1), toCanvasY(1));
    ctx.stroke();
    ctx.setLineDash([]);

    // Curva ROC
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const sorted = [...rocResult.curvePoints].sort((a, b) => a.fpr - b.fpr);
    sorted.forEach((pt, idx) => {
      const cx = toCanvasX(pt.fpr);
      const cy = toCanvasY(pt.tpr);
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    // Ponto atual
    const currentMetrics = evaluateClassificationWithThreshold(samples, threshold);
    const currentFpr = (currentMetrics.fp + currentMetrics.tn) > 0 ? currentMetrics.fp / (currentMetrics.fp + currentMetrics.tn) : 0;
    const currentTpr = currentMetrics.recall;

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(toCanvasX(currentFpr), toCanvasY(currentTpr), 4.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  render();

  onDatasetChange(() => {
    render();
  });

  return container;
}
