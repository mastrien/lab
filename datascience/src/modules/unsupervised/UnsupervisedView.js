// Módulo de Aprendizado Não-Supervisionado: K-Means Passo a Passo e Curva do Cotovelo

import { initKMeans, stepKMeans, computeElbowCurve } from "../../engine/kmeans.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderUnsupervisedView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let kValue = 3;
  let selectedX1 = null;
  let selectedX2 = null;
  let kmeansState = null;

  function render() {
    const dataset = getActiveDataset();
    const numericCols = dataset.numericColumns || [];

    if (!selectedX1 || !numericCols.includes(selectedX1)) {
      selectedX1 = numericCols[0] || null;
    }
    if (!selectedX2 || !numericCols.includes(selectedX2)) {
      selectedX2 = numericCols[1] || numericCols[0] || null;
    }

    // Extrair pontos a partir do dataset ativo
    let basePoints = [];
    if (selectedX1 && selectedX2 && dataset.data && dataset.data.length > 0) {
      const x1Vals = dataset.data.map(d => Number(d[selectedX1])).filter(v => !isNaN(v));
      const x2Vals = dataset.data.map(d => Number(d[selectedX2])).filter(v => !isNaN(v));
      const min1 = Math.min(...x1Vals), max1 = Math.max(...x1Vals), rng1 = (max1 - min1) || 1;
      const min2 = Math.min(...x2Vals), max2 = Math.max(...x2Vals), rng2 = (max2 - min2) || 1;

      basePoints = dataset.data.map(d => {
        const v1 = Number(d[selectedX1]);
        const v2 = Number(d[selectedX2]);
        if (isNaN(v1) || isNaN(v2)) return null;
        return {
          x: Number((((v1 - min1) / rng1) * 80 + 10).toFixed(2)),
          y: Number((((v2 - min2) / rng2) * 80 + 10).toFixed(2))
        };
      }).filter(Boolean);
    }

    if (basePoints.length === 0) {
      for (let i = 0; i < 40; i++) {
        basePoints.push({
          x: Math.round(Math.random() * 80 + 10),
          y: Math.round(Math.random() * 80 + 10)
        });
      }
    }

    if (!kmeansState || kmeansState.points.length !== basePoints.length) {
      kmeansState = initKMeans(basePoints, kValue);
    }

    const elbowData = computeElbowCurve(basePoints, 5);

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
          <span class="text-slate-700 dark:text-slate-300">${Icons.scatter("w-5 h-5")}</span>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Agrupamento
          </span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Aprendizado Não-Supervisionado (K-Means)
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Agrupamento iterativo com base nas distâncias euclidianas das variáveis selecionadas do dataset ativo.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Controles Interativos e Status -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          
          <!-- Seleção de colunas numéricas -->
          ${numericCols.length >= 2 ? `
            <div class="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span class="font-bold text-slate-700 dark:text-slate-300 block">Atributos para Agrupamento:</span>
              <div class="grid grid-cols-2 gap-2">
                <select id="select-kmeans-x1" class="font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200 text-xs cursor-pointer">
                  ${numericCols.map(c => `<option value="${c}" ${c === selectedX1 ? 'selected' : ''}>X: ${c}</option>`).join("")}
                </select>
                <select id="select-kmeans-x2" class="font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200 text-xs cursor-pointer">
                  ${numericCols.map(c => `<option value="${c}" ${c === selectedX2 ? 'selected' : ''}>Y: ${c}</option>`).join("")}
                </select>
              </div>
            </div>
          ` : ''}

          <!-- Slider K -->
          <div class="space-y-1">
            <div class="flex justify-between items-center text-xs font-semibold">
              <label for="slider-kmeans-k" class="text-slate-700 dark:text-slate-300">Número de Clusters (K):</label>
              <span class="font-mono font-bold text-sm">K = ${kValue}</span>
            </div>
            <input type="range" id="slider-kmeans-k" min="2" max="5" step="1" value="${kValue}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">
          </div>

          <!-- Botões de Ação Passo a Passo -->
          <div class="space-y-2">
            <button id="btn-step-kmeans" class="w-full py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold transition-colors flex items-center justify-center gap-2" ${kmeansState.converged ? 'disabled' : ''}>
              <span>Avançar 1 Iteração</span>
              ${Icons.arrowRight("w-3.5 h-3.5")}
            </button>

            <button id="btn-converge-kmeans" class="w-full py-2 px-3 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors">
              Executar até Convergir
            </button>

            <button id="btn-reset-kmeans" class="w-full py-2 px-3 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
              Reinicializar Centroides
            </button>
          </div>

          <!-- Indicadores de Estado -->
          <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Iteração Atual:</span>
              <span class="font-mono font-bold text-slate-800 dark:text-slate-200">#${kmeansState.iteration}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Inércia Total (WCSS):</span>
              <span class="font-mono font-bold">${kmeansState.inertia}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Status:</span>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${kmeansState.converged ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}">
                ${kmeansState.converged ? 'Convergido' : 'Em convergência'}
              </span>
            </div>
          </div>

          <!-- Método do Cotovelo -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Método do Cotovelo (Inércia × K)</h4>
            <div class="grid grid-cols-5 gap-1 text-center text-xs font-mono">
              ${elbowData.map(e => `
                <div class="p-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${e.k === kValue ? 'border-slate-800 dark:border-slate-200' : ''}">
                  <span class="text-[10px] text-slate-400 block font-sans">K=${e.k}</span>
                  <span class="font-bold">${Math.round(e.inertia)}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Canvas K-Means 2D -->
        <div class="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Espaço das Amostras (${basePoints.length} registros mapeados)</h3>
            <span class="text-xs text-slate-500 font-mono">${selectedX1} × ${selectedX2}</span>
          </div>

          <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
            <canvas id="kmeans-canvas" width="500" height="300" class="w-full h-auto bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"></canvas>
            <div class="flex items-center justify-center gap-6 mt-2 text-[11px] text-slate-500">
              <span>Cores distintas indicam agrupamentos | Cruzes representam os centroides</span>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(mainContent);

    // Listeners
    mainContent.querySelector("#select-kmeans-x1")?.addEventListener("change", (e) => {
      selectedX1 = e.target.value;
      kmeansState = null;
      render();
      setTimeout(drawKmeansCanvas, 50);
    });
    mainContent.querySelector("#select-kmeans-x2")?.addEventListener("change", (e) => {
      selectedX2 = e.target.value;
      kmeansState = null;
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    mainContent.querySelector("#slider-kmeans-k")?.addEventListener("input", (e) => {
      kValue = Number(e.target.value);
      kmeansState = initKMeans(basePoints, kValue);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    mainContent.querySelector("#btn-step-kmeans")?.addEventListener("click", () => {
      kmeansState = stepKMeans(kmeansState);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    mainContent.querySelector("#btn-converge-kmeans")?.addEventListener("click", () => {
      for (let i = 0; i < 30; i++) {
        kmeansState = stepKMeans(kmeansState);
        if (kmeansState.converged) break;
      }
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    mainContent.querySelector("#btn-reset-kmeans")?.addEventListener("click", () => {
      kmeansState = initKMeans(basePoints, kValue);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });
  }

  function drawKmeansCanvas() {
    const canvas = container.querySelector("#kmeans-canvas");
    if (!canvas || !kmeansState) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const clusterColors = ["#0f172a", "#475569", "#94a3b8", "#64748b", "#334155"];

    // 1. Linhas conectando pontos ao seu centroide
    ctx.lineWidth = 0.5;
    kmeansState.points.forEach(p => {
      const c = kmeansState.centroids[p.cluster];
      if (c) {
        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        const cx = (c.x / 100) * w;
        const cy = (c.y / 100) * h;
        ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
    });

    // 2. Desenhar pontos
    kmeansState.points.forEach(p => {
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      ctx.fillStyle = clusterColors[p.cluster % clusterColors.length];
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // 3. Desenhar centroides (Grandes com cruz)
    kmeansState.centroids.forEach((c, idx) => {
      const cx = (c.x / 100) * w;
      const cy = (c.y / 100) * h;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 4, cy); ctx.lineTo(cx + 4, cy);
      ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy + 4);
      ctx.stroke();
    });
  }

  render();
  setTimeout(drawKmeansCanvas, 50);

  onDatasetChange(() => {
    selectedX1 = null;
    selectedX2 = null;
    kmeansState = null;
    render();
  });

  return container;
}
