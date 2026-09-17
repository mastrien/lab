// Laboratório Modular de Regressão Polinomial e Trade-off Viés-Variância

import { fitPolynomialRegression } from "../engine/mlModels.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderPolynomialRegressionLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let polyDegree = 1;
  let selectedRegX = null;
  let selectedRegY = null;

  function update() {
    const dataset = getActiveDataset();
    const numericCols = dataset?.numericColumns || [];

    if (!selectedRegX || !numericCols.includes(selectedRegX)) {
      selectedRegX = numericCols[0] || null;
    }
    if (!selectedRegY || !numericCols.includes(selectedRegY)) {
      selectedRegY = numericCols[1] || numericCols[0] || null;
    }

    let regPoints = [];
    if (selectedRegX && selectedRegY && dataset && dataset.data) {
      regPoints = dataset.data
        .map(d => ({ x: Number(d[selectedRegX]), y: Number(d[selectedRegY]) }))
        .filter(p => !isNaN(p.x) && !isNaN(p.y));
    }
    if (regPoints.length === 0) {
      regPoints = [
        { x: 1, y: 2.2 }, { x: 2, y: 3.8 }, { x: 3, y: 3.5 },
        { x: 4, y: 5.1 }, { x: 5, y: 7.2 }, { x: 6, y: 6.8 },
        { x: 7, y: 9.4 }, { x: 8, y: 9.1 }, { x: 9, y: 11.5 }
      ];
    }

    const regResult = fitPolynomialRegression(regPoints, polyDegree);

    let diagnosticLabel = "Subajuste (Alto Viés)";
    let diagnosticClass = "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700";
    let diagnosticDesc = "Modelo simples demais para captar padrões não lineares complexos.";

    if (polyDegree >= 2 && polyDegree <= 3) {
      diagnosticLabel = "Ajuste Adequado (Good Fit)";
      diagnosticClass = "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900";
      diagnosticDesc = "Equilíbrio ideal entre erro de viés e estabilidade da variância.";
    } else if (polyDegree >= 5) {
      diagnosticLabel = "Sobreajuste (Alta Variância)";
      diagnosticClass = "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-400";
      diagnosticDesc = "Modelo memoriza o ruído das amostras, perdendo capacidade de generalização.";
    }

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.trendingUp("w-4 h-4 text-slate-500")}</span>
            <span>Ajuste de Regressão Polinomial & Dilema Viés-Variância</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ajuste graus polinomiais de 1 a 8 e observe o impacto no coeficiente de determinação ($R^2$) e MSE.
          </p>
        </div>

        ${numericCols.length >= 2 ? `
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-500">X:</span>
            <select id="reg-x-select" class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 font-semibold text-slate-800 dark:text-slate-200">
              ${numericCols.map(c => `<option value="${c}" ${c === selectedRegX ? 'selected' : ''}>${c}</option>`).join("")}
            </select>
            <span class="text-slate-500 ml-2">Y:</span>
            <select id="reg-y-select" class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 font-semibold text-slate-800 dark:text-slate-200">
              ${numericCols.map(c => `<option value="${c}" ${c === selectedRegY ? 'selected' : ''}>${c}</option>`).join("")}
            </select>
          </div>
        ` : ''}
      </div>

      <!-- Controles de Grau e Diagnóstico -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Grau do Polinômio (d)</span>
            <span class="font-mono text-slate-900 dark:text-white font-bold">Grau ${polyDegree}</span>
          </div>
          <input id="poly-deg-slider" type="range" min="1" max="8" value="${polyDegree}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
          <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>Linear (d=1)</span>
            <span>Cúbico (d=3)</span>
            <span>Complexo (d=8)</span>
          </div>
        </div>

        <div>
          <p class="text-[10px] uppercase font-bold text-slate-400">Coeficiente R² e Erro (MSE)</p>
          <div class="flex items-center gap-3 mt-1 font-mono">
            <span class="text-base font-bold text-slate-900 dark:text-white">R² = ${regResult.r2.toFixed(3)}</span>
            <span class="text-xs text-slate-500">MSE = ${regResult.mse.toFixed(3)}</span>
          </div>
        </div>

        <div class="p-2.5 rounded border text-xs ${diagnosticClass}">
          <p class="font-bold">${diagnosticLabel}</p>
          <p class="text-[11px] mt-0.5 opacity-90">${diagnosticDesc}</p>
        </div>
      </div>

      <!-- Canvas de Regressão -->
      <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div class="h-64 relative">
          <canvas id="reg-canvas" class="w-full h-full"></canvas>
        </div>
        <p class="text-[11px] text-slate-400 mt-2 text-center">
          Pontos reais das variáveis selecionadas e a curva polinomial ajustada por Mínimos Quadrados.
        </p>
      </div>
    `;

    setTimeout(() => {
      const canvas = container.querySelector("#reg-canvas");
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

      const xVals = regPoints.map(p => p.x);
      const yVals = regPoints.map(p => p.y);
      const minX = Math.min(...xVals), maxX = Math.max(...xVals);
      const minY = Math.min(...yVals), maxY = Math.max(...yVals);

      const scaleX = (x) => pad + ((x - minX) / (maxX - minX || 1)) * (w - pad * 2);
      const scaleY = (y) => (h - pad) - ((y - minY) / (maxY - minY || 1)) * (h - pad * 2);

      // Eixos
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, pad);
      ctx.lineTo(pad, h - pad);
      ctx.lineTo(w - pad, h - pad);
      ctx.stroke();

      // Curva Polinomial Ajustada
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const cx = minX + (i / steps) * (maxX - minX);
        const cy = regResult.predict(cx);
        const px = scaleX(cx);
        const py = Math.max(pad - 10, Math.min(h - pad + 10, scaleY(cy)));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Pontos reais
      ctx.fillStyle = "#475569";
      regPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(scaleX(p.x), scaleY(p.y), 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }, 10);

    const slider = container.querySelector("#poly-deg-slider");
    slider.addEventListener("input", (e) => {
      polyDegree = parseInt(e.target.value, 10);
      update();
    });

    const selX = container.querySelector("#reg-x-select");
    if (selX) {
      selX.addEventListener("change", (e) => {
        selectedRegX = e.target.value;
        update();
      });
    }

    const selY = container.querySelector("#reg-y-select");
    if (selY) {
      selY.addEventListener("change", (e) => {
        selectedRegY = e.target.value;
        update();
      });
    }
  }

  update();
  onDatasetChange(update);
  return container;
}
