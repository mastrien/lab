// Laboratório Modular de Agrupamento K-Means e Método do Cotovelo

import { initKMeans, stepKMeans, computeElbowCurve } from "../engine/kmeans.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderKMeansClusteringLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let kValue = 3;
  let selectedX1 = null;
  let selectedX2 = null;
  let kmeansState = null;

  function update() {
    const dataset = getActiveDataset();
    const numericCols = dataset?.numericColumns || [];

    if (!selectedX1 || !numericCols.includes(selectedX1)) {
      selectedX1 = numericCols[0] || null;
    }
    if (!selectedX2 || !numericCols.includes(selectedX2)) {
      selectedX2 = numericCols[1] || numericCols[0] || null;
    }

    let basePoints = [];
    if (selectedX1 && selectedX2 && dataset && dataset.data && dataset.data.length > 0) {
      const x1Vals = dataset.data.map(d => Number(d[selectedX1])).filter(v => !isNaN(v));
      const x2Vals = dataset.data.map(d => Number(d[selectedX2])).filter(v => !isNaN(v));
      const min1 = Math.min(...x1Vals), max1 = Math.max(...x1Vals), rng1 = max1 - min1 || 1;
      const min2 = Math.min(...x2Vals), max2 = Math.max(...x2Vals), rng2 = max2 - min2 || 1;

      basePoints = dataset.data.map(d => {
        const v1 = Number(d[selectedX1]), v2 = Number(d[selectedX2]);
        if (isNaN(v1) || isNaN(v2)) return null;
        return {
          x: Number((((v1 - min1) / rng1) * 80 + 10).toFixed(2)),
          y: Number((((v2 - min2) / rng2) * 80 + 10).toFixed(2))
        };
      }).filter(Boolean);
    }

    if (basePoints.length === 0) {
      for (let i = 0; i < 40; i++) {
        basePoints.push({ x: Math.round(Math.random() * 80 + 10), y: Math.round(Math.random() * 80 + 10) });
      }
    }

    if (!kmeansState || kmeansState.points.length !== basePoints.length) {
      kmeansState = initKMeans(basePoints, kValue);
    }

    const elbowData = computeElbowCurve(basePoints, 5);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.scatter("w-4 h-4 text-slate-500")}</span>
            <span>Agrupamento K-Means Iterativo & Curva do Cotovelo</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Execute os passos de atribuição e recálculo de centroides até a convergência da inércia.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button id="kmeans-step-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
            ${Icons.play("w-3 h-3")}
            <span>Executar Próximo Passo</span>
          </button>
          <button id="kmeans-reset-btn" class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" title="Reiniciar centroides">
            ${Icons.refresh("w-3.5 h-3.5")}
          </button>
        </div>
      </div>

      <!-- Controles de K e Inércia -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Número de Clusters (K)</label>
          <div class="flex items-center gap-1">
            ${[2, 3, 4, 5].map(k => `
              <button data-k="${k}" class="k-val-btn flex-1 py-1 rounded text-xs font-bold ${kValue === k ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
                K=${k}
              </button>
            `).join("")}
          </div>
        </div>

        <div>
          <p class="text-[10px] uppercase font-bold text-slate-400">Iteração Atual</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">
            Passo ${kmeansState.iteration} ${kmeansState.converged ? '<span class="text-xs font-bold text-slate-400 font-sans">(Convergido)</span>' : ''}
          </p>
        </div>

        <div>
          <p class="text-[10px] uppercase font-bold text-slate-400">Inércia Intra-Cluster (SSE)</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">
            ${kmeansState.inertia.toFixed(1)}
          </p>
        </div>
      </div>

      <!-- Canvas de Agrupamento 2D -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div class="h-64 relative">
            <canvas id="kmeans-canvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Mini Gráfico de Cotovelo -->
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <p class="text-xs font-bold text-slate-900 dark:text-white mb-1">Método do Cotovelo (Elbow)</p>
            <p class="text-[11px] text-slate-500">Queda da inércia em função do número de clusters $K$.</p>
          </div>
          <div class="h-44 relative mt-2">
            <canvas id="elbow-canvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      // Desenhar canvas do K-Means
      const kmCanvas = container.querySelector("#kmeans-canvas");
      if (kmCanvas) {
        const ctx = kmCanvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const rect = kmCanvas.getBoundingClientRect();
        kmCanvas.width = rect.width * dpr;
        kmCanvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width, h = rect.height;
        ctx.clearRect(0, 0, w, h);

        const colors = ["#0f172a", "#475569", "#94a3b8", "#64748b", "#cbd5e1"];

        // Desenhar pontos com cor do cluster
        kmeansState.points.forEach(p => {
          const px = (p.x / 100) * w;
          const py = h - (p.y / 100) * h;
          ctx.fillStyle = p.cluster >= 0 ? colors[p.cluster % colors.length] : "#94a3b8";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Desenhar centroides (com cruz e anel)
        kmeansState.centroids.forEach((c, i) => {
          const cx = (c.x / 100) * w;
          const cy = h - (c.y / 100) * h;
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, 7, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = colors[i % colors.length];
          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Desenhar curva do cotovelo
      const elCanvas = container.querySelector("#elbow-canvas");
      if (elCanvas) {
        const ctx = elCanvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const rect = elCanvas.getBoundingClientRect();
        elCanvas.width = rect.width * dpr;
        elCanvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width, h = rect.height, pad = 25;
        ctx.clearRect(0, 0, w, h);

        const maxInertia = Math.max(...elbowData.map(d => d.inertia)) || 1;
        const scaleX = (k) => pad + ((k - 1) / 4) * (w - pad * 2);
        const scaleY = (val) => (h - pad) - (val / maxInertia) * (h - pad * 2);

        // Eixos
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, pad);
        ctx.lineTo(pad, h - pad);
        ctx.lineTo(w - pad, h - pad);
        ctx.stroke();

        // Linha
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        elbowData.forEach((d, idx) => {
          const x = scaleX(d.k);
          const y = scaleY(d.inertia);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Pontos
        elbowData.forEach(d => {
          const x = scaleX(d.k);
          const y = scaleY(d.inertia);
          ctx.fillStyle = d.k === kValue ? "#0f172a" : "#64748b";
          ctx.beginPath();
          ctx.arc(x, y, d.k === kValue ? 4.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }, 10);

    // Eventos
    container.querySelector("#kmeans-step-btn").addEventListener("click", () => {
      kmeansState = stepKMeans(kmeansState);
      update();
    });

    container.querySelector("#kmeans-reset-btn").addEventListener("click", () => {
      kmeansState = initKMeans(basePoints, kValue);
      update();
    });

    container.querySelectorAll(".k-val-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        kValue = parseInt(btn.getAttribute("data-k"), 10);
        kmeansState = initKMeans(basePoints, kValue);
        update();
      });
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
