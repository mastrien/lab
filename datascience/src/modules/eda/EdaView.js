// Módulo de Análise Exploratória & Data Profiling (EDA)

import { summaryStats, pearsonCorrelation } from "../../engine/stats.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderEdaView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let selectedPair = null;

  function render() {
    const dataset = getActiveDataset();
    if (!dataset || !dataset.data || dataset.data.length === 0) {
      container.innerHTML = `
        <div class="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p class="text-sm text-slate-500">Nenhum dado tabular carregado no dataset ativo.</p>
        </div>
      `;
      return;
    }

    const columns = dataset.columns || Object.keys(dataset.data[0] || {});
    const numericCols = dataset.numericColumns || columns.filter(c => typeof dataset.data[0]?.[c] === "number");

    if (!selectedPair || !numericCols.includes(selectedPair[0]) || !numericCols.includes(selectedPair[1])) {
      selectedPair = [numericCols[0] || "", numericCols[1] || numericCols[0] || ""];
    }

    // Calcular valores ausentes (NaN / null) por coluna
    let totalNulls = 0;
    const nullsByCol = {};
    columns.forEach(col => {
      let count = 0;
      dataset.data.forEach(row => {
        const val = row[col];
        if (val === null || val === undefined || val === "" || (typeof val === "number" && isNaN(val))) {
          count++;
        }
      });
      nullsByCol[col] = count;
      totalNulls += count;
    });

    // Calcular sumário estatístico para todas as colunas numéricas
    const statsByCol = {};
    numericCols.forEach(col => {
      const values = dataset.data.map(d => d[col]).filter(v => typeof v === "number" && !isNaN(v));
      statsByCol[col] = summaryStats(values);
    });

    // Calcular matriz de correlação de Pearson
    const corrMatrix = {};
    numericCols.forEach(c1 => {
      corrMatrix[c1] = {};
      numericCols.forEach(c2 => {
        const v1 = dataset.data.map(d => Number(d[c1]));
        const v2 = dataset.data.map(d => Number(d[c2]));
        corrMatrix[c1][c2] = pearsonCorrelation(v1, v2);
      });
    });

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
          <span class="text-slate-700 dark:text-slate-300">${Icons.chart("w-5 h-5")}</span>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Diagnóstico Estatístico
          </span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Análise Exploratória & Profiling (EDA)
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Sumário estatístico, distribuição empírica e correlação bivariada dos atributos da base ativa.
        </p>
      </div>

      <!-- Resumo de Integridade dos Dados -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total de Registros</p>
          <p class="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">${dataset.data.length}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">Amostras carregadas</p>
        </div>
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Número de Colunas</p>
          <p class="text-xl font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">${columns.length}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">${numericCols.length} numéricas / ${columns.length - numericCols.length} categóricas</p>
        </div>
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Valores Ausentes</p>
          <p class="text-xl font-mono font-bold ${totalNulls > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'} mt-1">${totalNulls}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">${totalNulls === 0 ? 'Sem dados nulos' : 'Contém campos faltantes'}</p>
        </div>
        <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Variável Alvo Declarada</p>
          <p class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-1 truncate">${dataset.target || "Não especificada"}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">Rótulo de referência</p>
        </div>
      </div>

      <!-- Tabela de Resumo Estatístico -->
      ${numericCols.length > 0 ? `
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Resumo Estatístico Descritivo</h3>
            <p class="text-xs text-slate-500">Média, desvio padrão amostral e separação quartílica para as variáveis contínuas.</p>
          </div>

          <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th class="py-2.5 px-3">Variável</th>
                  <th class="py-2.5 px-3 text-center">Média (μ)</th>
                  <th class="py-2.5 px-3 text-center">Desvio Padrão (σ)</th>
                  <th class="py-2.5 px-3 text-center">Mínimo</th>
                  <th class="py-2.5 px-3 text-center">Q1 (25%)</th>
                  <th class="py-2.5 px-3 text-center">Mediana (50%)</th>
                  <th class="py-2.5 px-3 text-center">Q3 (75%)</th>
                  <th class="py-2.5 px-3 text-center">Máximo</th>
                  <th class="py-2.5 px-3 text-center">IQR</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                ${numericCols.map(col => {
                  const s = statsByCol[col] || {};
                  return `
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="py-2.5 px-3 font-sans font-bold text-slate-900 dark:text-white">${col}</td>
                      <td class="py-2.5 px-3 text-center">${s.mean ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center">${s.std ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center">${s.min ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center text-slate-500">${s.q1 ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center font-bold">${s.median ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center text-slate-500">${s.q3 ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center">${s.max ?? '-'}</td>
                      <td class="py-2.5 px-3 text-center">${s.iqr ?? '-'}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Matriz de Correlação e Dispersão -->
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Matriz de Correlação de Pearson e Dispersão</h3>
            <p class="text-xs text-slate-500">
              Selecione as variáveis para visualizar a relação bivariada no gráfico de dispersão ao lado.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <!-- Heatmap Tabular -->
            <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-800/40">
              <table class="w-full text-center text-xs">
                <thead>
                  <tr>
                    <th class="p-2"></th>
                    ${numericCols.map(c => `<th class="p-2 text-[10px] font-bold text-slate-500 uppercase truncate max-w-[80px]" title="${c}">${c}</th>`).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${numericCols.map(r => `
                    <tr>
                      <td class="p-2 text-[10px] font-bold text-slate-700 dark:text-slate-300 text-left truncate max-w-[90px]" title="${r}">${r}</td>
                      ${numericCols.map(c => {
                        const val = corrMatrix[r][c];
                        const isSelected = (selectedPair[0] === r && selectedPair[1] === c) || (selectedPair[0] === c && selectedPair[1] === r);
                        return `
                          <td class="p-1">
                            <button data-pair="${r},${c}" class="corr-cell-btn w-full py-1.5 px-1 rounded text-xs font-mono transition-colors ${isSelected ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}">
                              ${val}
                            </button>
                          </td>
                        `;
                      }).join("")}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>

            <!-- Scatterplot 2D -->
            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Dispersão: <span class="font-mono">${selectedPair[0]}</span> × <span class="font-mono">${selectedPair[1]}</span>
                </h4>
                <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  r = ${corrMatrix[selectedPair[0]]?.[selectedPair[1]] ?? 0}
                </span>
              </div>

              <div class="relative w-full h-56 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2">
                <canvas id="eda-scatter-canvas" width="400" height="220" class="w-full h-full"></canvas>
              </div>
            </div>
          </div>
        </div>
      ` : `
        <div class="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p class="text-sm text-slate-500">Este conjunto de dados não possui variáveis numéricas suficientes para análise de correlação quantitativa.</p>
        </div>
      `}
    `;

    container.appendChild(mainContent);

    // Event listeners das células de correlação
    mainContent.querySelectorAll(".corr-cell-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pair = btn.getAttribute("data-pair").split(",");
        selectedPair = pair;
        render();
      });
    });

    if (numericCols.length > 0) {
      setTimeout(() => {
        drawScatterPlot(dataset, selectedPair[0], selectedPair[1]);
      }, 50);
    }
  }

  function drawScatterPlot(dataset, colX, colY) {
    const canvas = container.querySelector("#eda-scatter-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const xVals = dataset.data.map(d => Number(d[colX])).filter(v => !isNaN(v));
    const yVals = dataset.data.map(d => Number(d[colY])).filter(v => !isNaN(v));
    if (xVals.length === 0 || yVals.length === 0) return;

    const xMin = Math.min(...xVals);
    const xMax = Math.max(...xVals);
    const yMin = Math.min(...yVals);
    const yMax = Math.max(...yVals);
    const xRange = (xMax - xMin) || 1;
    const yRange = (yMax - yMin) || 1;

    const pad = 30;

    // Eixos
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Plotar pontos
    dataset.data.forEach(row => {
      const rx = Number(row[colX]);
      const ry = Number(row[colY]);
      if (isNaN(rx) || isNaN(ry)) return;

      const x = pad + ((rx - xMin) / xRange) * (w - 2 * pad);
      const y = (h - pad) - ((ry - yMin) / yRange) * (h - 2 * pad);

      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  render();

  onDatasetChange(() => {
    selectedPair = null;
    render();
  });

  return container;
}
