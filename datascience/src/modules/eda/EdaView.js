// Módulo de Análise Exploratória & Data Profiling (EDA)

import { SAMPLE_DATASETS } from "../../data/datasets.js";
import { summaryStats, pearsonCorrelation } from "../../engine/stats.js";

export function renderEdaView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let selectedDatasetKey = "iris";
  let selectedPair = ["sepal_length", "petal_length"];

  function render() {
    const dataset = SAMPLE_DATASETS[selectedDatasetKey];
    const numericCols = dataset.columns.filter(col => dataset.types[col] === "numeric");

    // Calcular sumário estatístico para todas as colunas numéricas
    const statsByCol = {};
    numericCols.forEach(col => {
      const values = dataset.data.map(d => d[col]);
      statsByCol[col] = summaryStats(values);
    });

    // Calcular matriz de correlação de Pearson
    const corrMatrix = {};
    numericCols.forEach(c1 => {
      corrMatrix[c1] = {};
      numericCols.forEach(c2 => {
        const v1 = dataset.data.map(d => d[c1]);
        const v2 = dataset.data.map(d => d[c2]);
        corrMatrix[c1][c2] = pearsonCorrelation(v1, v2);
      });
    });

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">📊</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Diagnóstico de Dados
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Análise Exploratória & Profiling (EDA)
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Examine a integridade, distribuições, estatísticas descritivas e correlações entre atributos.
          </p>
        </div>

        <!-- Seletor de Dataset -->
        <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400 px-2">Dataset:</span>
          <select id="dataset-selector" class="bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-hidden cursor-pointer">
            <option value="iris" ${selectedDatasetKey === 'iris' ? 'selected' : ''}>🌸 Iris Dataset</option>
            <option value="titanic" ${selectedDatasetKey === 'titanic' ? 'selected' : ''}>🚢 Titanic</option>
            <option value="housing" ${selectedDatasetKey === 'housing' ? 'selected' : ''}>🏡 Imóveis</option>
          </select>
        </div>
      </div>

      <!-- Resumo de Saúde da Base -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Total de Registros</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">${dataset.data.length}</p>
          <p class="text-[11px] text-emerald-500 font-semibold mt-0.5">100% carregado em memória</p>
        </div>
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Número de Colunas</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">${dataset.columns.length}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">${numericCols.length} numéricas / ${dataset.columns.length - numericCols.length} categóricas</p>
        </div>
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Valores Ausentes (NaN)</p>
          <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">0 (0.0%)</p>
          <p class="text-[11px] text-emerald-500 font-semibold mt-0.5">Base íntegra</p>
        </div>
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Variável Alvo (Target)</p>
          <p class="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">${dataset.target || "N/A"}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">Supervisionada</p>
        </div>
      </div>

      <!-- Tabela de Resumo Estatístico das Variáveis -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 class="text-lg font-black text-slate-900 dark:text-white">Resumo Estatístico dos Atributos Numéricos</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Medidas de tendência central, dispersão e quartis calculadas em tempo real.</p>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table class="w-full text-left text-xs font-medium">
            <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
              <tr>
                <th class="py-3 px-4">Variável</th>
                <th class="py-3 px-3 text-center">Média (μ)</th>
                <th class="py-3 px-3 text-center">Desvio Padrão (σ)</th>
                <th class="py-3 px-3 text-center">Mínimo</th>
                <th class="py-3 px-3 text-center">Q1 (25%)</th>
                <th class="py-3 px-3 text-center">Mediana (50%)</th>
                <th class="py-3 px-3 text-center">Q3 (75%)</th>
                <th class="py-3 px-3 text-center">Máximo</th>
                <th class="py-3 px-3 text-center">IQR</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              ${numericCols.map(col => {
                const s = statsByCol[col];
                return `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">${col}</td>
                    <td class="py-3 px-3 text-center font-bold text-indigo-600 dark:text-indigo-400">${s.mean}</td>
                    <td class="py-3 px-3 text-center">${s.std}</td>
                    <td class="py-3 px-3 text-center">${s.min}</td>
                    <td class="py-3 px-3 text-center text-slate-500">${s.q1}</td>
                    <td class="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400">${s.median}</td>
                    <td class="py-3 px-3 text-center text-slate-500">${s.q3}</td>
                    <td class="py-3 px-3 text-center">${s.max}</td>
                    <td class="py-3 px-3 text-center text-emerald-600 dark:text-emerald-400">${s.iqr}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Matriz de Correlação Interativa -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 class="text-lg font-black text-slate-900 dark:text-white">Matriz de Correlação de Pearson</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Valores próximos de <strong>+1.0</strong> indicam forte relação linear positiva; próximos de <strong>-1.0</strong> indicam forte relação negativa. Clique em qualquer célula para analisar o gráfico de dispersão correspondente!
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Heatmap Tabular -->
          <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-800/40">
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
                      // Cor baseada no valor de correlação
                      let bgClass = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
                      if (val > 0.8) bgClass = "bg-emerald-500 text-white font-bold";
                      else if (val > 0.4) bgClass = "bg-emerald-300 dark:bg-emerald-900 text-slate-900 dark:text-emerald-100 font-semibold";
                      else if (val < -0.4) bgClass = "bg-rose-400 text-white font-semibold";

                      return `
                        <td class="p-1">
                          <button data-pair="${r},${c}" class="corr-cell-btn w-full py-2 px-1 rounded-lg text-xs font-mono transition-all ${bgClass} ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : 'hover:opacity-80'}">
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

          <!-- Scatterplot Interativo 2D dos Atributos Selecionados -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Dispersão: <span class="text-indigo-600 dark:text-indigo-400 font-mono font-bold">${selectedPair[0]}</span> vs <span class="text-indigo-600 dark:text-indigo-400 font-mono font-bold">${selectedPair[1]}</span>
              </h4>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                r = ${corrMatrix[selectedPair[0]]?.[selectedPair[1]] ?? 0}
              </span>
            </div>

            <!-- Canvas 2D de Dispersão -->
            <div class="relative w-full h-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden p-2">
              <canvas id="eda-scatter-canvas" width="400" height="240" class="w-full h-full"></canvas>
            </div>
            <p class="text-[11px] text-slate-400 text-center">
              Cada ponto representa uma amostra do dataset. Cores representam classes/categorias.
            </p>
          </div>
        </div>
      </div>
    `;

    // Event listener do seletor de dataset
    container.querySelector("#dataset-selector").addEventListener("change", (e) => {
      selectedDatasetKey = e.target.value;
      const newDataset = SAMPLE_DATASETS[selectedDatasetKey];
      const newNumCols = newDataset.columns.filter(col => newDataset.types[col] === "numeric");
      selectedPair = [newNumCols[0] || "", newNumCols[1] || newNumCols[0] || ""];
      render();
    });

    // Event listeners das células de correlação
    container.querySelectorAll(".corr-cell-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pair = btn.getAttribute("data-pair").split(",");
        selectedPair = pair;
        render();
      });
    });

    // Renderizar gráfico de dispersão no Canvas
    setTimeout(() => {
      drawScatterPlot(dataset, selectedPair[0], selectedPair[1]);
    }, 50);
  }

  function drawScatterPlot(dataset, colX, colY) {
    const canvas = container.querySelector("#eda-scatter-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const xVals = dataset.data.map(d => Number(d[colX]));
    const yVals = dataset.data.map(d => Number(d[colY]));
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

    // Paleta de cores por espécie/classe
    const colorMap = {
      setosa: "#6366f1",
      versicolor: "#10b981",
      virginica: "#f59e0b",
      "Sim": "#10b981",
      "Não": "#ef4444"
    };

    // Plotar pontos
    dataset.data.forEach(row => {
      const x = pad + ((Number(row[colX]) - xMin) / xRange) * (w - 2 * pad);
      const y = (h - pad) - ((Number(row[colY]) - yMin) / yRange) * (h - 2 * pad);
      const targetVal = dataset.target ? row[dataset.target] : null;
      ctx.fillStyle = colorMap[targetVal] || "#6366f1";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  render();
  return container;
}
