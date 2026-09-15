// Módulo de Avaliação de Modelos, Matriz de Confusão & Curva ROC/AUC

import { evaluateClassificationWithThreshold, computeROCCurve } from "../../engine/mlModels.js";

export function renderEvaluationView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let threshold = 0.50;

  // Gerar amostras sintéticas de probabilidades de classificação binária (doença / fraude)
  const syntheticSamples = [];
  // 50 Amostras Positivas Reais (Actual = 1) com scores concentrados em valores altos
  for (let i = 0; i < 50; i++) {
    const score = Math.min(0.99, Math.max(0.05, 0.72 + (Math.random() - 0.5) * 0.45));
    syntheticSamples.push({ actual: 1, score: Number(score.toFixed(2)) });
  }
  // 50 Amostras Negativas Reais (Actual = 0) com scores concentrados em valores baixos
  for (let i = 0; i < 50; i++) {
    const score = Math.min(0.95, Math.max(0.01, 0.28 + (Math.random() - 0.5) * 0.45));
    syntheticSamples.push({ actual: 0, score: Number(score.toFixed(2)) });
  }

  const rocResult = computeROCCurve(syntheticSamples);

  function render() {
    const metrics = evaluateClassificationWithThreshold(syntheticSamples, threshold);

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">🎯</span>
          <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300/40 dark:border-rose-800">
            Validação & Diagnóstico
          </span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Avaliação de Modelos & Métricas
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Compreenda o impacto do Limiar de Decisão (Threshold) na Matriz de Confusão e no equilíbrio entre Precisão e Recall.
        </p>
      </div>

      <!-- Slider de Threshold -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Limiar de Corte (Decision Threshold):</span>
              <span class="text-rose-600 dark:text-rose-400 font-mono font-black text-base">T = ${threshold.toFixed(2)}</span>
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Se probabilidade ≥ T, classifica como Positivo (1); caso contrário, Negativo (0).
            </p>
          </div>
          <span class="text-xs font-semibold text-slate-500 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            100 pacientes simulados
          </span>
        </div>

        <input type="range" id="slider-threshold" min="0.05" max="0.95" step="0.02" value="${threshold}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500">

        <div class="flex justify-between text-[11px] font-bold text-slate-400">
          <span>0.00 (Classifica quase tudo como 1)</span>
          <span>0.50 (Padrão)</span>
          <span>1.00 (Classifica quase tudo como 0)</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- Matriz de Confusão Interativa 2x2 -->
        <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 class="text-lg font-black text-slate-900 dark:text-white">Matriz de Confusão 2x2</h3>
          
          <div class="grid grid-cols-2 gap-3">
            <!-- Verdadeiro Positivo -->
            <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Verdadeiro Positivo (VP)</span>
              <p class="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">${metrics.tp}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">Era Positivo e previu Positivo</p>
            </div>

            <!-- Falso Positivo -->
            <div class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">Falso Positivo (FP) - Erro Tipo I</span>
              <p class="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">${metrics.fp}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">Era Negativo e previu Positivo</p>
            </div>

            <!-- Falso Negativo -->
            <div class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">Falso Negativo (FN) - Erro Tipo II</span>
              <p class="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">${metrics.fn}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">Era Positivo e previu Negativo</p>
            </div>

            <!-- Verdadeiro Negativo -->
            <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Verdadeiro Negativo (VN)</span>
              <p class="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">${metrics.tn}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">Era Negativo e previu Negativo</p>
            </div>
          </div>

          <!-- Métricas Derivadas -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-bold uppercase text-slate-400">Acurácia</span>
              <p class="text-base font-black text-slate-800 dark:text-slate-200 mt-0.5 font-mono">${(metrics.accuracy * 100).toFixed(1)}%</p>
            </div>
            <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-bold uppercase text-slate-400">Precisão</span>
              <p class="text-base font-black text-blue-600 dark:text-blue-400 mt-0.5 font-mono">${(metrics.precision * 100).toFixed(1)}%</p>
            </div>
            <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-bold uppercase text-slate-400">Recall</span>
              <p class="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">${(metrics.recall * 100).toFixed(1)}%</p>
            </div>
            <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-[10px] font-bold uppercase text-slate-400">F1-Score</span>
              <p class="text-base font-black text-purple-600 dark:text-purple-400 mt-0.5 font-mono">${metrics.f1}</p>
            </div>
          </div>
        </div>

        <!-- Curva ROC e AUC -->
        <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-black text-slate-900 dark:text-white">Curva ROC (Receiver Operating Characteristic)</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Trade-off entre Sensibilidade (TPR) e Falsos Alarmes (FPR).</p>
            </div>
            <span class="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-200 dark:border-indigo-800">
              AUC = ${rocResult.auc}
            </span>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
            <canvas id="roc-canvas" width="400" height="260" class="w-full h-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"></canvas>
            <div class="flex items-center justify-center gap-6 mt-3 text-[11px] font-medium text-slate-500">
              <span>Linha azul: Curva ROC do Modelo</span>
              <span>Linha pontilhada: Classificador Aleatório (AUC 0.5)</span>
              <span>Ponto vermelho: Limiar Atual</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Listener do slider
    container.querySelector("#slider-threshold")?.addEventListener("input", (e) => {
      threshold = Number(e.target.value);
      render();
      setTimeout(drawRocCanvas, 50);
    });
  }

  function drawRocCanvas() {
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

    // Rótulos
    ctx.fillStyle = "#64748b";
    ctx.font = "10px sans-serif";
    ctx.fillText("FPR (1 - Especificidade)", w / 2 - 40, h - 8);
    ctx.save();
    ctx.translate(14, h / 2 + 30);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("TPR (Recall)", 0, 0);
    ctx.restore();

    // Diagonal Aleatória (AUC = 0.5)
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(0));
    ctx.lineTo(toCanvasX(1), toCanvasY(1));
    ctx.stroke();
    ctx.setLineDash([]);

    // Curva ROC
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const sorted = [...rocResult.curvePoints].sort((a, b) => a.fpr - b.fpr);
    sorted.forEach((pt, idx) => {
      const cx = toCanvasX(pt.fpr);
      const cy = toCanvasY(pt.tpr);
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    // Ponto de operação atual
    const currentMetrics = evaluateClassificationWithThreshold(syntheticSamples, threshold);
    const currentFpr = (currentMetrics.fp + currentMetrics.tn) > 0 ? currentMetrics.fp / (currentMetrics.fp + currentMetrics.tn) : 0;
    const currentTpr = currentMetrics.recall;

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(toCanvasX(currentFpr), toCanvasY(currentTpr), 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  render();
  setTimeout(drawRocCanvas, 50);
  return container;
}
