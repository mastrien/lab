// Módulo de Pré-Processamento & Engenharia de Features

import { minMaxScaler, standardScaler, robustScaler, oneHotEncode, computePCA2D } from "../../engine/scalers.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderPreprocessingView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "scalers"; // "scalers" | "encoding" | "pca"
  let selectedScaleCol = null;
  let selectedCatCol = null;

  function render() {
    const dataset = getActiveDataset();
    const numericCols = dataset.numericColumns || [];
    const categoricalCols = dataset.categoricalColumns || [];

    if (!selectedScaleCol || !numericCols.includes(selectedScaleCol)) {
      selectedScaleCol = numericCols[0] || null;
    }
    if (!selectedCatCol || !categoricalCols.includes(selectedCatCol)) {
      selectedCatCol = categoricalCols[0] || null;
    }

    let rawValues = [];
    if (selectedScaleCol && dataset.data) {
      rawValues = dataset.data.map(d => Number(d[selectedScaleCol])).filter(v => !isNaN(v)).slice(0, 15);
    }
    if (rawValues.length === 0) {
      rawValues = [10, 12, 14, 15, 18, 20, 22, 25, 95];
    }

    const minMaxValues = minMaxScaler(rawValues);
    const standardValues = standardScaler(rawValues);
    const robustValues = robustScaler(rawValues);

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
            <span class="text-slate-700 dark:text-slate-300">${Icons.sliders("w-5 h-5")}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Transformação de Dados
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pré-Processamento & Engenharia de Features
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Padronização de escalas numéricas, codificação categórica e redução de dimensionalidade sobre o dataset ativo.
          </p>
        </div>

        <!-- Abas -->
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
          <button id="tab-btn-scalers" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'scalers' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            Escalonamento
          </button>
          <button id="tab-btn-encoding" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'encoding' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            One-Hot Encoding
          </button>
          <button id="tab-btn-pca" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'pca' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            PCA 2D
          </button>
        </div>
      </div>

      <!-- Aba 1: Scalers Comparados -->
      ${activeTab === 'scalers' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Comparativo de Métodos de Escalonamento</h3>
                <p class="text-xs text-slate-500">
                  Diferenças estruturais entre MinMaxScaler, StandardScaler (Z-Score) e RobustScaler.
                </p>
              </div>

              ${numericCols.length > 0 ? `
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500">Atributo a transformar:</span>
                  <select id="select-scale-col" class="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-slate-800 dark:text-slate-200 cursor-pointer">
                    ${numericCols.map(c => `<option value="${c}" ${c === selectedScaleCol ? 'selected' : ''}>${c}</option>`).join("")}
                  </select>
                </div>
              ` : ''}
            </div>

            <!-- Fórmulas dos 3 Scalers -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">MinMaxScaler</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-1.5 rounded text-center mb-1.5 border border-slate-200 dark:border-slate-700">
                  x' = (x - min) / (max - min)
                </div>
                <p class="text-[11px] text-slate-500">Mapeia estritamente para [0, 1]. Muito influenciado por valores extremos.</p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">StandardScaler (Z-Score)</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-1.5 rounded text-center mb-1.5 border border-slate-200 dark:border-slate-700">
                  z = (x - μ) / σ
                </div>
                <p class="text-[11px] text-slate-500">Transforma para média zero e desvio padrão unitário.</p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">RobustScaler</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-1.5 rounded text-center mb-1.5 border border-slate-200 dark:border-slate-700">
                  x' = (x - mediana) / IQR
                </div>
                <p class="text-[11px] text-slate-500">Baseia-se em estatísticas de ordem, resistente a pontos discrepantes.</p>
              </div>
            </div>

            <!-- Tabela Comparativa dos Valores -->
            <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs font-medium">
                <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500">
                  <tr>
                    <th class="py-2.5 px-3">Amostra</th>
                    <th class="py-2.5 px-3">Valor Original (${selectedScaleCol || 'X'})</th>
                    <th class="py-2.5 px-3 text-center">MinMaxScaler [0, 1]</th>
                    <th class="py-2.5 px-3 text-center">StandardScaler (Z)</th>
                    <th class="py-2.5 px-3 text-center">RobustScaler</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  ${rawValues.map((val, idx) => `
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="py-2 px-3 text-slate-400 font-sans">#${idx + 1}</td>
                      <td class="py-2 px-3 font-bold">${val}</td>
                      <td class="py-2 px-3 text-center">${minMaxValues[idx]}</td>
                      <td class="py-2 px-3 text-center">${standardValues[idx]}</td>
                      <td class="py-2 px-3 text-center font-bold">${robustValues[idx]}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Aba 2: One-Hot Encoding -->
      ${activeTab === 'encoding' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Codificação Categórica (One-Hot Encoding)</h3>
                <p class="text-xs text-slate-500">
                  Mapeia cada categoria em uma coluna binária de presença/ausência (variáveis dummy).
                </p>
              </div>

              ${categoricalCols.length > 0 ? `
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500">Atributo Categórico:</span>
                  <select id="select-cat-col" class="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-slate-800 dark:text-slate-200 cursor-pointer">
                    ${categoricalCols.map(c => `<option value="${c}" ${c === selectedCatCol ? 'selected' : ''}>${c}</option>`).join("")}
                  </select>
                </div>
              ` : ''}
            </div>

            ${selectedCatCol && dataset.data ? (() => {
              const sampleRows = dataset.data.slice(0, 8);
              const encodedRows = oneHotEncode(sampleRows, selectedCatCol);
              const categories = Array.from(new Set(sampleRows.map(r => r[selectedCatCol]))).sort();

              return `
                <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table class="w-full text-left text-xs font-mono">
                    <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500">
                      <tr>
                        <th class="p-2.5 font-sans">#</th>
                        <th class="p-2.5 font-sans text-slate-900 dark:text-white">Valor Original (${selectedCatCol})</th>
                        ${categories.map(cat => `<th class="p-2.5 text-center text-slate-700 dark:text-slate-300 font-sans">${selectedCatCol}_${cat}</th>`).join("")}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      ${encodedRows.map((r, i) => `
                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td class="p-2.5 text-slate-400 font-sans">#${i + 1}</td>
                          <td class="p-2.5 font-bold font-sans">${r[selectedCatCol]}</td>
                          ${categories.map(cat => {
                            const bit = r[`${selectedCatCol}_${cat}`];
                            return `<td class="p-2.5 text-center ${bit === 1 ? 'font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' : 'text-slate-400'}">${bit}</td>`;
                          }).join("")}
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              `;
            })() : `
              <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 text-center">
                O dataset ativo não possui variáveis categóricas para codificação dummy.
              </div>
            `}
          </div>
        </div>
      ` : ""}

      <!-- Aba 3: PCA 2D -->
      ${activeTab === 'pca' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Análise de Componentes Principais (PCA 2D)</h3>
              <p class="text-xs text-slate-500">
                Projeção ortogonal nos autovetores da matriz de covariância para conservação da máxima variância empírica.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div class="space-y-3">
                <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300">Variância Retida</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">
                    O primeiro componente (PC1) captura a direção de maior espalhamento dos pontos, enquanto o segundo (PC2) é ortogonal e absorve a maior parte da dispersão residual.
                  </p>
                </div>
                <p class="text-xs text-slate-500">
                  Base avaliada: ${dataset.name} (${numericCols.length} dimensões numéricas disponíveis).
                </p>
              </div>

              <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <canvas id="pca-canvas" width="360" height="220" class="w-full h-auto bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"></canvas>
                <p class="text-[11px] text-slate-400 mt-2">Plano projetado PC1 × PC2</p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    container.appendChild(mainContent);

    // Listeners de abas
    mainContent.querySelector("#tab-btn-scalers")?.addEventListener("click", () => {
      activeTab = "scalers";
      render();
    });

    mainContent.querySelector("#tab-btn-encoding")?.addEventListener("click", () => {
      activeTab = "encoding";
      render();
    });

    mainContent.querySelector("#tab-btn-pca")?.addEventListener("click", () => {
      activeTab = "pca";
      render();
      setTimeout(drawPcaCanvas, 50);
    });

    // Seletor de escala
    mainContent.querySelector("#select-scale-col")?.addEventListener("change", (e) => {
      selectedScaleCol = e.target.value;
      render();
    });

    // Seletor categórico
    mainContent.querySelector("#select-cat-col")?.addEventListener("change", (e) => {
      selectedCatCol = e.target.value;
      render();
    });
  }

  function drawPcaCanvas() {
    const canvas = container.querySelector("#pca-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Eixos
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 10); ctx.lineTo(w / 2, h - 10);
    ctx.moveTo(10, h / 2); ctx.lineTo(w - 10, h / 2);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText("PC1", w - 30, h / 2 - 6);
    ctx.fillText("PC2", w / 2 + 6, 20);

    // Pontos do dataset ativo
    const dataset = getActiveDataset();
    const numCols = dataset.numericColumns || [];
    if (numCols.length >= 2 && dataset.data) {
      const p2d = dataset.data.map(d => [Number(d[numCols[0]]), Number(d[numCols[1]])]).filter(p => !isNaN(p[0]) && !isNaN(p[1]));
      const pca = computePCA2D(p2d);
      pca.projected.forEach(p => {
        const cx = w / 2 + p[0] * 12;
        const cy = h / 2 - p[1] * 12;
        ctx.fillStyle = "#475569";
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }

  render();

  onDatasetChange(() => {
    selectedScaleCol = null;
    selectedCatCol = null;
    render();
  });

  return container;
}
