// Módulo de Aprendizado Supervisionado: Regressão Polinomial e Classificador KNN 2D

import { fitPolynomialRegression, predictKNN } from "../../engine/mlModels.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderSupervisedView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "regression"; // "regression" | "knn"
  let polyDegree = 1;
  let knnK = 3;
  let knnMetric = "euclidean";

  let selectedRegX = null;
  let selectedRegY = null;
  let selectedKnnX1 = null;
  let selectedKnnX2 = null;

  function render() {
    const dataset = getActiveDataset();
    const numericCols = dataset.numericColumns || [];

    if (!selectedRegX || !numericCols.includes(selectedRegX)) {
      selectedRegX = numericCols[0] || null;
    }
    if (!selectedRegY || !numericCols.includes(selectedRegY)) {
      selectedRegY = numericCols[1] || numericCols[0] || null;
    }

    if (!selectedKnnX1 || !numericCols.includes(selectedKnnX1)) {
      selectedKnnX1 = numericCols[0] || null;
    }
    if (!selectedKnnX2 || !numericCols.includes(selectedKnnX2)) {
      selectedKnnX2 = numericCols[1] || numericCols[0] || null;
    }

    // Extrair pontos para regressão a partir do dataset ativo
    let regPoints = [];
    if (selectedRegX && selectedRegY && dataset.data) {
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

    // Extrair pontos para KNN 2D a partir do dataset ativo
    let knnPoints = [];
    if (selectedKnnX1 && selectedKnnX2 && dataset.data) {
      const targetCol = dataset.target || dataset.categoricalColumns?.[0] || dataset.columns[dataset.columns.length - 1];
      const x1Vals = dataset.data.map(d => Number(d[selectedKnnX1])).filter(v => !isNaN(v));
      const x2Vals = dataset.data.map(d => Number(d[selectedKnnX2])).filter(v => !isNaN(v));
      const min1 = Math.min(...x1Vals), max1 = Math.max(...x1Vals), rng1 = (max1 - min1) || 1;
      const min2 = Math.min(...x2Vals), max2 = Math.max(...x2Vals), rng2 = (max2 - min2) || 1;

      knnPoints = dataset.data.map(d => {
        const x1 = Number(d[selectedKnnX1]);
        const x2 = Number(d[selectedKnnX2]);
        const label = String(d[targetCol] ?? "A");
        if (isNaN(x1) || isNaN(x2)) return null;
        return {
          x: ((x1 - min1) / rng1) * 100,
          y: ((x2 - min2) / rng2) * 100,
          label
        };
      }).filter(Boolean).slice(0, 80);
    }
    if (knnPoints.length === 0) {
      knnPoints = [
        { x: 15, y: 20, label: "A" }, { x: 25, y: 35, label: "A" },
        { x: 30, y: 15, label: "A" }, { x: 40, y: 40, label: "A" },
        { x: 60, y: 75, label: "B" }, { x: 70, y: 65, label: "B" },
        { x: 75, y: 85, label: "B" }, { x: 85, y: 70, label: "B" }
      ];
    }

    const regResult = fitPolynomialRegression(regPoints, polyDegree);

    let diagnosticLabel = "Subajuste (Underfitting)";
    let diagnosticClass = "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800";
    let diagnosticDesc = "O modelo é linear simples e não captura curvaturas mais pronunciadas (Alto Viés).";

    if (polyDegree >= 2 && polyDegree <= 3) {
      diagnosticLabel = "Ajuste Adequado (Good Fit)";
      diagnosticClass = "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800";
      diagnosticDesc = "Boa capacidade de generalização com equilíbrio entre viés e variância.";
    } else if (polyDegree >= 5) {
      diagnosticLabel = "Superajuste (Overfitting)";
      diagnosticClass = "bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800";
      diagnosticDesc = "Flexibilidade exagerada: o modelo memoriza o ruído das amostras de treino (Alta Variância).";
    }

    container.innerHTML = "";

    // Barra de Dataset Ativo
    const datasetBar = renderActiveDatasetBar(() => render());
    container.appendChild(datasetBar);

    const mainContent = document.createElement("div");
    mainContent.className = "space-y-6";

    mainContent.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-slate-700 dark:text-slate-300">${Icons.brain("w-5 h-5")}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Modelagem Supervisionada
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Aprendizado Supervisionado
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ajuste de modelos preditivos com dados do dataset ativo: regressão polinomial e classificação KNN.
          </p>
        </div>

        <!-- Abas -->
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
          <button id="tab-btn-reg" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'regression' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            Regressão Polinomial
          </button>
          <button id="tab-btn-knn" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'knn' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            Classificador KNN 2D
          </button>
        </div>
      </div>

      <!-- Aba 1: Regressão Polinomial -->
      ${activeTab === 'regression' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <!-- Seleção de colunas do dataset ativo -->
              ${numericCols.length >= 2 ? `
                <div class="flex flex-wrap items-center gap-3 text-xs">
                  <div class="flex items-center gap-1.5">
                    <span class="font-semibold text-slate-500">Preditor (X):</span>
                    <select id="select-reg-x" class="font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-slate-800 dark:text-slate-200 cursor-pointer">
                      ${numericCols.map(c => `<option value="${c}" ${c === selectedRegX ? 'selected' : ''}>${c}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-semibold text-slate-500">Alvo (Y):</span>
                    <select id="select-reg-y" class="font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-slate-800 dark:text-slate-200 cursor-pointer">
                      ${numericCols.map(c => `<option value="${c}" ${c === selectedRegY ? 'selected' : ''}>${c}</option>`).join("")}
                    </select>
                  </div>
                </div>
              ` : ''}

              <!-- Slider do Grau Polinomial -->
              <div class="flex-1 max-w-sm space-y-1">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-poly-degree" class="text-slate-700 dark:text-slate-300">
                    Grau Polinomial: <span class="font-mono font-bold">d = ${polyDegree}</span>
                  </label>
                  <span class="text-[11px] text-slate-400 font-normal">${polyDegree === 1 ? 'Linear' : 'Não-linear'}</span>
                </div>
                <input type="range" id="slider-poly-degree" min="1" max="8" step="1" value="${polyDegree}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">
              </div>

              <!-- Badge Diagnóstico -->
              <div class="p-2.5 rounded-lg border ${diagnosticClass} text-xs min-w-[200px]">
                <span class="font-bold block uppercase text-[10px] tracking-wider">${diagnosticLabel}</span>
                <span class="text-[11px] opacity-90 leading-tight block mt-0.5">${diagnosticDesc}</span>
              </div>
            </div>

            <!-- Métricas e Gráfico -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <!-- Coluna das Métricas -->
              <div class="space-y-3">
                <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Coeficiente R² (Determinação)</p>
                  <p class="text-xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">${regResult.r2}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">${Math.round(regResult.r2 * 100)}% da variância explicada</p>
                </div>

                <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Erro Quadrático Médio (MSE)</p>
                  <p class="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${regResult.mse}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">Média dos resíduos ao quadrado</p>
                </div>

                <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Erro Médio Absoluto (MAE)</p>
                  <p class="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${regResult.mae}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">Distância linear média</p>
                </div>
              </div>

              <!-- Canvas da Regressão -->
              <div class="lg:col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <canvas id="reg-canvas" width="460" height="240" class="w-full h-auto bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"></canvas>
                <p class="text-[11px] text-slate-500 mt-2 text-center">
                  Pontos escuros = Amostras reais de ${selectedRegX || 'X'} × ${selectedRegY || 'Y'} | Linha contínua = Modelo ajustado
                </p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Aba 2: Classificador KNN 2D -->
      ${activeTab === 'knn' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <!-- Slider K -->
              <div class="flex-1 space-y-1 max-w-xs">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-knn-k" class="text-slate-700 dark:text-slate-300">
                    Número de Vizinhos: <span class="font-mono font-bold">K = ${knnK}</span>
                  </label>
                  <span class="text-[11px] text-slate-400 font-normal">K ímpar</span>
                </div>
                <input type="range" id="slider-knn-k" min="1" max="7" step="2" value="${knnK}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">
              </div>

              <!-- Métrica de Distância -->
              <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="text-xs font-semibold text-slate-500 px-2">Métrica:</span>
                <button id="btn-metric-euclidean" class="px-2.5 py-1 rounded text-xs font-semibold transition-colors ${knnMetric === 'euclidean' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}">
                  Euclidiana
                </button>
                <button id="btn-metric-manhattan" class="px-2.5 py-1 rounded text-xs font-semibold transition-colors ${knnMetric === 'manhattan' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}">
                  Manhattan
                </button>
              </div>
            </div>

            <!-- Canvas de Fronteira de Decisão 2D -->
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <canvas id="knn-canvas" width="460" height="240" class="w-full h-auto bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"></canvas>
              <div class="flex items-center justify-center gap-6 mt-2.5 text-xs text-slate-500">
                <span>Fronteiras sombreadas por votação majoritária entre os ${knnK} vizinhos</span>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    container.appendChild(mainContent);

    // Listeners das abas
    mainContent.querySelector("#tab-btn-reg")?.addEventListener("click", () => {
      activeTab = "regression";
      render();
      setTimeout(drawRegressionPlot, 50);
    });

    mainContent.querySelector("#tab-btn-knn")?.addEventListener("click", () => {
      activeTab = "knn";
      render();
      setTimeout(drawKnnPlot, 50);
    });

    // Seletor de colunas para regressão
    mainContent.querySelector("#select-reg-x")?.addEventListener("change", (e) => {
      selectedRegX = e.target.value;
      render();
      setTimeout(drawRegressionPlot, 50);
    });
    mainContent.querySelector("#select-reg-y")?.addEventListener("change", (e) => {
      selectedRegY = e.target.value;
      render();
      setTimeout(drawRegressionPlot, 50);
    });

    // Slider polinomial
    mainContent.querySelector("#slider-poly-degree")?.addEventListener("input", (e) => {
      polyDegree = Number(e.target.value);
      render();
      setTimeout(drawRegressionPlot, 50);
    });

    // Slider KNN
    mainContent.querySelector("#slider-knn-k")?.addEventListener("input", (e) => {
      knnK = Number(e.target.value);
      render();
      setTimeout(drawKnnPlot, 50);
    });

    // Métricas KNN
    mainContent.querySelector("#btn-metric-euclidean")?.addEventListener("click", () => {
      knnMetric = "euclidean";
      render();
      setTimeout(drawKnnPlot, 50);
    });
    mainContent.querySelector("#btn-metric-manhattan")?.addEventListener("click", () => {
      knnMetric = "manhattan";
      render();
      setTimeout(drawKnnPlot, 50);
    });

    if (activeTab === "regression") {
      setTimeout(drawRegressionPlot, 50);
    } else {
      setTimeout(drawKnnPlot, 50);
    }
  }

  function drawRegressionPlot() {
    const canvas = container.querySelector("#reg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const dataset = getActiveDataset();
    let regPoints = [];
    if (selectedRegX && selectedRegY && dataset.data) {
      regPoints = dataset.data
        .map(d => ({ x: Number(d[selectedRegX]), y: Number(d[selectedRegY]) }))
        .filter(p => !isNaN(p.x) && !isNaN(p.y));
    }
    if (regPoints.length === 0) return;

    const pad = 35;
    const xs = regPoints.map(p => p.x);
    const ys = regPoints.map(p => p.y);
    const xMin = Math.min(...xs), xMax = Math.max(...xs), xRange = (xMax - xMin) || 1;
    const yMin = Math.min(...ys), yMax = Math.max(...ys), yRange = (yMax - yMin) || 1;

    function toCanvasX(x) { return pad + ((x - xMin) / xRange) * (w - 2 * pad); }
    function toCanvasY(y) { return (h - pad) - ((y - yMin) / yRange) * (h - 2 * pad); }

    // Eixos
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Curva Polinomial Ajustada
    const model = fitPolynomialRegression(regPoints, polyDegree);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let px = pad; px <= w - pad; px += 2) {
      const realX = xMin + ((px - pad) / (w - 2 * pad)) * xRange;
      const predY = model.predict(realX);
      const py = toCanvasY(predY);
      if (px === pad) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Pontos de Treino
    ctx.fillStyle = "#64748b";
    regPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  function drawKnnPlot() {
    const canvas = container.querySelector("#knn-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const dataset = getActiveDataset();
    let knnPoints = [];
    if (selectedKnnX1 && selectedKnnX2 && dataset.data) {
      const targetCol = dataset.target || dataset.categoricalColumns?.[0] || dataset.columns[dataset.columns.length - 1];
      const x1Vals = dataset.data.map(d => Number(d[selectedKnnX1])).filter(v => !isNaN(v));
      const x2Vals = dataset.data.map(d => Number(d[selectedKnnX2])).filter(v => !isNaN(v));
      const min1 = Math.min(...x1Vals), max1 = Math.max(...x1Vals), rng1 = (max1 - min1) || 1;
      const min2 = Math.min(...x2Vals), max2 = Math.max(...x2Vals), rng2 = (max2 - min2) || 1;

      knnPoints = dataset.data.map(d => {
        const x1 = Number(d[selectedKnnX1]);
        const x2 = Number(d[selectedKnnX2]);
        const label = String(d[targetCol] ?? "A");
        if (isNaN(x1) || isNaN(x2)) return null;
        return {
          x: ((x1 - min1) / rng1) * 100,
          y: ((x2 - min2) / rng2) * 100,
          label
        };
      }).filter(Boolean).slice(0, 80);
    }
    if (knnPoints.length === 0) return;

    // Rasterizar grid de decisão
    const step = 8;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const qx = (px / w) * 100;
        const qy = (py / h) * 100;
        const pred = predictKNN(knnPoints, qx, qy, knnK, knnMetric);
        ctx.fillStyle = pred === knnPoints[0]?.label ? "rgba(71, 85, 105, 0.15)" : "rgba(148, 163, 184, 0.25)";
        ctx.fillRect(px, py, step, step);
      }
    }

    // Plotar pontos reais
    knnPoints.forEach(p => {
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      ctx.fillStyle = p.label === knnPoints[0]?.label ? "#0f172a" : "#64748b";
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  render();

  onDatasetChange(() => {
    selectedRegX = null;
    selectedRegY = null;
    selectedKnnX1 = null;
    selectedKnnX2 = null;
    render();
  });

  return container;
}
