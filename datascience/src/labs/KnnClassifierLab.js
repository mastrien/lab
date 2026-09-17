// Laboratório Modular de Classificação K-Nearest Neighbors (KNN 2D)

import { predictKNN } from "../engine/mlModels.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderKnnClassifierLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let knnK = 3;
  let knnMetric = "euclidean";

  function update() {
    const dataset = getActiveDataset();
    const numericCols = dataset?.numericColumns || [];

    // Gerar ou extrair pontos para o plano 2D [0, 100]x[0, 100]
    let points = [];
    if (numericCols.length >= 2 && dataset.data.length > 0) {
      const c1 = numericCols[0], c2 = numericCols[1];
      const targetCol = dataset.target || dataset.categoricalColumns?.[0] || dataset.columns[dataset.columns.length - 1];
      const v1 = dataset.data.map(d => Number(d[c1])).filter(v => !isNaN(v));
      const v2 = dataset.data.map(d => Number(d[c2])).filter(v => !isNaN(v));
      const min1 = Math.min(...v1), max1 = Math.max(...v1), r1 = max1 - min1 || 1;
      const min2 = Math.min(...v2), max2 = Math.max(...v2), r2 = max2 - min2 || 1;

      points = dataset.data.slice(0, 80).map(d => {
        const x1 = Number(d[c1]), x2 = Number(d[c2]);
        if (isNaN(x1) || isNaN(x2)) return null;
        return {
          x: ((x1 - min1) / r1) * 100,
          y: ((x2 - min2) / r2) * 100,
          label: String(d[targetCol] ?? "A")
        };
      }).filter(Boolean);
    }

    if (points.length === 0) {
      points = [
        { x: 15, y: 20, label: "Classe A" }, { x: 25, y: 35, label: "Classe A" },
        { x: 30, y: 15, label: "Classe A" }, { x: 40, y: 40, label: "Classe A" },
        { x: 60, y: 75, label: "Classe B" }, { x: 70, y: 65, label: "Classe B" },
        { x: 75, y: 85, label: "Classe B" }, { x: 85, y: 70, label: "Classe B" }
      ];
    }

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.brain("w-4 h-4 text-slate-500")}</span>
            <span>Classificador K-Nearest Neighbors (KNN 2D)</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mapeamento de vizinhança e superfícies de decisão no plano bidimensional.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-slate-500">Métrica:</span>
            <button data-m="euclidean" class="metric-btn px-2 py-0.5 rounded font-mono text-xs ${knnMetric === 'euclidean' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}">Euclidiana</button>
            <button data-m="manhattan" class="metric-btn px-2 py-0.5 rounded font-mono text-xs ${knnMetric === 'manhattan' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}">Manhattan</button>
          </div>
        </div>
      </div>

      <!-- Controles do Hiperparâmetro K -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Número de Vizinhos Mais Próximos (K)</span>
            <span class="font-mono text-slate-900 dark:text-white font-bold">K = ${knnK}</span>
          </div>
          <input id="knn-k-slider" type="range" min="1" max="15" step="2" value="${knnK}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
          <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>K=1 (Fronteira Ruidosa)</span>
            <span>K=7</span>
            <span>K=15 (Fronteira Suave)</span>
          </div>
        </div>

        <div class="flex items-center text-xs text-slate-500">
          <p>
            Valores pequenos de $K$ (ex: $K=1$) criam fronteiras irregulares com alta variância. Conforme $K$ cresce, a fronteira se suaviza, reduzindo a variância mas podendo aumentar o viés.
          </p>
        </div>
      </div>

      <!-- Canvas de Fronteiras -->
      <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div class="h-64 relative">
          <canvas id="knn-canvas" class="w-full h-full"></canvas>
        </div>
        <p class="text-[11px] text-slate-400 mt-2 text-center">
          Superfície de decisão e classificação por voto majoritário dos $K$ vizinhos mais próximos.
        </p>
      </div>
    `;

    setTimeout(() => {
      const canvas = container.querySelector("#knn-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Renderizar grid de decisão simplificado
      const gridSize = 16;
      for (let gx = 0; gx < w; gx += gridSize) {
        for (let gy = 0; gy < h; gy += gridSize) {
          const ptX = (gx / w) * 100;
          const ptY = ((h - gy) / h) * 100;
          const pred = predictKNN(points, { x: ptX, y: ptY }, knnK, knnMetric);
          ctx.fillStyle = pred === points[0]?.label ? "rgba(100, 116, 139, 0.12)" : "rgba(15, 23, 42, 0.06)";
          ctx.fillRect(gx, gy, gridSize, gridSize);
        }
      }

      // Desenhar pontos reais
      points.forEach(p => {
        const px = (p.x / 100) * w;
        const py = h - (p.y / 100) * h;
        const isClassA = p.label === points[0]?.label;

        ctx.fillStyle = isClassA ? "#0f172a" : "#64748b";
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }, 10);

    container.querySelector("#knn-k-slider").addEventListener("input", (e) => {
      knnK = parseInt(e.target.value, 10);
      update();
    });

    container.querySelectorAll(".metric-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        knnMetric = btn.getAttribute("data-m");
        update();
      });
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
