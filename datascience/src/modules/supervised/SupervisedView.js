// Módulo de Aprendizado Supervisionado: Regressão Polinomial (Overfitting) e Classificador KNN 2D

import { fitPolynomialRegression, predictKNN } from "../../engine/mlModels.js";

export function renderSupervisedView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "regression"; // "regression" | "knn"
  let polyDegree = 1;
  let knnK = 3;
  let knnMetric = "euclidean";

  // Amostra de pontos para a regressão
  const regPoints = [
    { x: 1, y: 2.2 },
    { x: 2, y: 3.8 },
    { x: 3, y: 3.5 },
    { x: 4, y: 5.1 },
    { x: 5, y: 7.2 },
    { x: 6, y: 6.8 },
    { x: 7, y: 9.4 },
    { x: 8, y: 9.1 },
    { x: 9, y: 11.5 }
  ];

  // Amostra de pontos 2D para KNN (Classes 0: Azul, 1: Laranja)
  const knnPoints = [
    { x: 15, y: 20, label: "A" },
    { x: 25, y: 35, label: "A" },
    { x: 30, y: 15, label: "A" },
    { x: 40, y: 40, label: "A" },
    { x: 35, y: 55, label: "A" },
    { x: 55, y: 30, label: "A" },
    // Classe B
    { x: 60, y: 75, label: "B" },
    { x: 70, y: 65, label: "B" },
    { x: 75, y: 85, label: "B" },
    { x: 85, y: 70, label: "B" },
    { x: 90, y: 90, label: "B" },
    { x: 65, y: 95, label: "B" }
  ];

  function render() {
    const regResult = fitPolynomialRegression(regPoints, polyDegree);

    let diagnosticLabel = "Underfitting (Subajuste)";
    let diagnosticClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    let diagnosticDesc = "O modelo é excessivamente simples (reta) e não captura toda a curvatura dos dados (Alto Viés).";

    if (polyDegree >= 2 && polyDegree <= 3) {
      diagnosticLabel = "Equilíbrio Ideal (Good Fit)";
      diagnosticClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      diagnosticDesc = "Boa capacidade de generalização com equilíbrio saudável entre viés e variância.";
    } else if (polyDegree >= 5) {
      diagnosticLabel = "Overfitting (Superajuste / Alta Variância)";
      diagnosticClass = "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
      diagnosticDesc = "O modelo é excessivamente complexo, memorizando ruídos aleatórios e oscilando bruscamente!";
    }

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">🧠</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-300/40 dark:border-violet-800">
              Modelos Preditivos
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Aprendizado Supervisionado
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore o trade-off entre Viés e Variância (Overfitting) e fronteiras de decisão do KNN.
          </p>
        </div>

        <!-- Abas -->
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
          <button id="tab-btn-reg" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'regression' ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
            Regressão & Overfitting
          </button>
          <button id="tab-btn-knn" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'knn' ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
            Classificador KNN 2D
          </button>
        </div>
      </div>

      <!-- Aba 1: Regressão Polinomial -->
      ${activeTab === 'regression' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <!-- Slider do Grau Polinomial -->
              <div class="flex-1 space-y-2">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-poly-degree" class="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Complexidade do Modelo (Grau Polinomial):</span>
                    <span class="text-violet-600 dark:text-violet-400 font-bold text-sm">d = ${polyDegree}</span>
                  </label>
                  <span class="text-[11px] text-slate-400">${polyDegree === 1 ? 'Reta linear' : 'Curva polinomial'}</span>
                </div>
                <input type="range" id="slider-poly-degree" min="1" max="8" step="1" value="${polyDegree}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600">
              </div>

              <!-- Badge Diagnóstico -->
              <div class="p-3 rounded-2xl ${diagnosticClass} flex flex-col justify-center text-xs font-bold min-w-[240px]">
                <div class="flex items-center gap-1.5 mb-1">
                  <span>Diagnóstico:</span>
                  <span class="uppercase tracking-wider">${diagnosticLabel}</span>
                </div>
                <p class="font-normal text-[11px] opacity-90 leading-tight">${diagnosticDesc}</p>
              </div>
            </div>

            <!-- Métricas e Gráfico -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <!-- Coluna das Métricas -->
              <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Coeficiente R² (Determinação)</p>
                  <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">${regResult.r2}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">${Math.round(regResult.r2 * 100)}% da variância explicada no treino</p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Erro Quadrático Médio (MSE)</p>
                  <p class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">${regResult.mse}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">Penaliza erros grandes ao quadrado</p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Erro Médio Absoluto (MAE)</p>
                  <p class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">${regResult.mae}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">Média das distâncias lineares absolutas</p>
                </div>
              </div>

              <!-- Canvas da Regressão -->
              <div class="lg:col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <canvas id="reg-canvas" width="460" height="260" class="w-full h-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"></canvas>
                <p class="text-[11px] text-slate-400 mt-2 text-center">
                  Pontos azuis = Amostras de treino | Linha roxa = Curva ajustada pelo modelo
                </p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Aba 2: Classificador KNN 2D -->
      ${activeTab === 'knn' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <!-- Slider K -->
              <div class="flex-1 space-y-2">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-knn-k" class="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Número de Vizinhos Mais Próximos:</span>
                    <span class="text-violet-600 dark:text-violet-400 font-bold text-sm">K = ${knnK}</span>
                  </label>
                  <span class="text-[11px] text-slate-400">Valores ímpares evitam empates</span>
                </div>
                <input type="range" id="slider-knn-k" min="1" max="7" step="2" value="${knnK}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600">
              </div>

              <!-- Métrica de Distância -->
              <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span class="text-xs font-bold text-slate-500">Métrica:</span>
                <button id="btn-metric-euclidean" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${knnMetric === 'euclidean' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-xs' : 'text-slate-500'}">
                  Euclidiana
                </button>
                <button id="btn-metric-manhattan" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${knnMetric === 'manhattan' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-xs' : 'text-slate-500'}">
                  Manhattan
                </button>
              </div>
            </div>

            <!-- Canvas de Fronteira de Decisão 2D -->
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <canvas id="knn-canvas" width="460" height="260" class="w-full h-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"></canvas>
              <div class="flex items-center justify-center gap-6 mt-3 text-xs font-medium">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span> Classe A</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Classe B</span>
                <span class="text-slate-400">Regiões sombreadas mostram a fronteira de voto do KNN</span>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    // Listeners das abas
    container.querySelector("#tab-btn-reg")?.addEventListener("click", () => {
      activeTab = "regression";
      render();
      setTimeout(drawRegressionPlot, 50);
    });

    container.querySelector("#tab-btn-knn")?.addEventListener("click", () => {
      activeTab = "knn";
      render();
      setTimeout(drawKnnPlot, 50);
    });

    // Listener do slider de grau polinomial
    const polySlider = container.querySelector("#slider-poly-degree");
    if (polySlider) {
      polySlider.addEventListener("input", (e) => {
        polyDegree = Number(e.target.value);
        render();
        setTimeout(drawRegressionPlot, 50);
      });
    }

    // Listener do slider KNN
    const knnSlider = container.querySelector("#slider-knn-k");
    if (knnSlider) {
      knnSlider.addEventListener("input", (e) => {
        knnK = Number(e.target.value);
        render();
        setTimeout(drawKnnPlot, 50);
      });
    }

    // Listeners de métricas KNN
    container.querySelector("#btn-metric-euclidean")?.addEventListener("click", () => {
      knnMetric = "euclidean";
      render();
      setTimeout(drawKnnPlot, 50);
    });

    container.querySelector("#btn-metric-manhattan")?.addEventListener("click", () => {
      knnMetric = "manhattan";
      render();
      setTimeout(drawKnnPlot, 50);
    });
  }

  function drawRegressionPlot() {
    const canvas = container.querySelector("#reg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 35;
    const xMin = 0, xMax = 10, yMin = 0, yMax = 14;

    function toCanvasX(x) { return pad + ((x - xMin) / (xMax - xMin)) * (w - 2 * pad); }
    function toCanvasY(y) { return (h - pad) - ((y - yMin) / (yMax - yMin)) * (h - 2 * pad); }

    // Eixos
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Curva Polinomial Ajustada
    const model = fitPolynomialRegression(regPoints, polyDegree);
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let px = pad; px <= w - pad; px += 2) {
      const realX = xMin + ((px - pad) / (w - 2 * pad)) * (xMax - xMin);
      const predY = model.predict(realX);
      const py = toCanvasY(predY);
      if (px === pad) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Pontos de Treino
    ctx.fillStyle = "#3b82f6";
    regPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 5, 0, 2 * Math.PI);
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

    // Rasterizar grid de fronteira de decisão
    const step = 8;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const qx = (px / w) * 100;
        const qy = (py / h) * 100;
        const pred = predictKNN(knnPoints, qx, qy, knnK, knnMetric);
        ctx.fillStyle = pred === "A" ? "rgba(99, 102, 241, 0.15)" : "rgba(245, 158, 11, 0.15)";
        ctx.fillRect(px, py, step, step);
      }
    }

    // Plotar pontos reais
    knnPoints.forEach(p => {
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      ctx.fillStyle = p.label === "A" ? "#6366f1" : "#f59e0b";
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  render();
  setTimeout(drawRegressionPlot, 50);
  return container;
}
