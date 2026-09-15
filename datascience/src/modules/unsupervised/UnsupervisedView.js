// Módulo de Aprendizado Não-Supervisionado: K-Means Passo a Passo e Curva do Cotovelo

import { initKMeans, stepKMeans, computeElbowCurve } from "../../engine/kmeans.js";

export function renderUnsupervisedView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let kValue = 3;
  // Gerar amostra de pontos 2D em 3 aglomerados naturais
  const basePoints = [];
  function addCluster(cx, cy, std, n) {
    for (let i = 0; i < n; i++) {
      basePoints.push({
        x: Number((cx + (Math.random() - 0.5) * std).toFixed(2)),
        y: Number((cy + (Math.random() - 0.5) * std).toFixed(2))
      });
    }
  }
  addCluster(25, 30, 22, 20);
  addCluster(70, 35, 25, 20);
  addCluster(50, 75, 20, 20);

  let kmeansState = initKMeans(basePoints, kValue);

  function render() {
    const elbowData = computeElbowCurve(basePoints, 5);

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">🧩</span>
          <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40 dark:border-indigo-800">
            Agrupamento & Padrões Ocultos
          </span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Aprendizado Não-Supervisionado (K-Means)
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Descubra agrupamentos naturais sem necessidade de rótulos prévios e entenda o critério do cotovelo (Elbow Method).
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Controles Interativos e Status -->
        <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs font-semibold">
              <label for="slider-kmeans-k" class="text-slate-700 dark:text-slate-300">Número de Agrupamentos:</label>
              <span class="text-indigo-600 dark:text-indigo-400 font-bold text-sm">K = ${kValue}</span>
            </div>
            <input type="range" id="slider-kmeans-k" min="2" max="5" step="1" value="${kValue}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600">
          </div>

          <!-- Botões de Ação Passo a Passo -->
          <div class="space-y-2.5">
            <button id="btn-step-kmeans" class="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2" ${kmeansState.converged ? 'disabled' : ''}>
              <span>Avançar 1 Passo (Iterar)</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
            </button>

            <button id="btn-converge-kmeans" class="w-full py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95">
              Executar até Convergir
            </button>

            <button id="btn-reset-kmeans" class="w-full py-2 px-4 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all border border-rose-200 dark:border-rose-900/50">
              Reiniciar Centroides
            </button>
          </div>

          <!-- Indicadores de Estado -->
          <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-500 font-medium">Iteração:</span>
              <span class="font-mono font-bold text-slate-800 dark:text-slate-200">#${kmeansState.iteration}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-500 font-medium">Inércia (WCSS):</span>
              <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">${kmeansState.inertia}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-500 font-medium">Convergência:</span>
              <span class="px-2 py-0.5 rounded text-[11px] font-bold ${kmeansState.converged ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}">
                ${kmeansState.converged ? 'Convergido ✅' : 'Em ajuste ⏳'}
              </span>
            </div>
          </div>

          <!-- Método do Cotovelo (Mini Tabela) -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Método do Cotovelo (Inércia por K)</h4>
            <div class="grid grid-cols-5 gap-1 text-center text-xs font-mono">
              ${elbowData.map(e => `
                <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${e.k === 3 ? 'ring-2 ring-indigo-500' : ''}">
                  <span class="text-[10px] text-slate-400 block font-sans font-bold">K=${e.k}</span>
                  <span class="font-bold text-slate-700 dark:text-slate-300">${Math.round(e.inertia)}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Canvas K-Means 2D -->
        <div class="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-black text-slate-900 dark:text-white">Espaço Bidimensional dos Clusters</h3>
            <span class="text-xs text-slate-500">60 pontos gerados</span>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
            <canvas id="kmeans-canvas" width="500" height="320" class="w-full h-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner"></canvas>
            <div class="flex items-center justify-center gap-6 mt-3 text-xs font-medium text-slate-500">
              <span>● Pontos coloridos pelo cluster atribuído</span>
              <span>✖ Estrelas/Cruzes representam os centroides</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Listeners
    container.querySelector("#slider-kmeans-k")?.addEventListener("input", (e) => {
      kValue = Number(e.target.value);
      kmeansState = initKMeans(basePoints, kValue);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    container.querySelector("#btn-step-kmeans")?.addEventListener("click", () => {
      kmeansState = stepKMeans(kmeansState);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    container.querySelector("#btn-converge-kmeans")?.addEventListener("click", () => {
      for (let i = 0; i < 30; i++) {
        kmeansState = stepKMeans(kmeansState);
        if (kmeansState.converged) break;
      }
      render();
      setTimeout(drawKmeansCanvas, 50);
    });

    container.querySelector("#btn-reset-kmeans")?.addEventListener("click", () => {
      kmeansState = initKMeans(basePoints, kValue);
      render();
      setTimeout(drawKmeansCanvas, 50);
    });
  }

  function drawKmeansCanvas() {
    const canvas = container.querySelector("#kmeans-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const clusterColors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

    // 1. Linhas conectando pontos ao seu centroide
    ctx.lineWidth = 0.5;
    kmeansState.points.forEach(p => {
      const c = kmeansState.centroids[p.cluster];
      if (c) {
        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        const cx = (c.x / 100) * w;
        const cy = (c.y / 100) * h;
        ctx.strokeStyle = clusterColors[p.cluster % clusterColors.length] + "40";
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
      ctx.arc(px, py, 4.5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // 3. Desenhar centroides (Grandes com contorno)
    kmeansState.centroids.forEach((c, idx) => {
      const cx = (c.x / 100) * w;
      const cy = (c.y / 100) * h;
      ctx.fillStyle = clusterColors[idx % clusterColors.length];
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Cruz no centroide
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
      ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
      ctx.stroke();
    });
  }

  render();
  setTimeout(drawKmeansCanvas, 50);
  return container;
}
