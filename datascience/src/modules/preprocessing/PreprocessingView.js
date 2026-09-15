// Módulo de Pré-Processamento & Engenharia de Features

import { minMaxScaler, standardScaler, robustScaler, oneHotEncode, computePCA2D } from "../../engine/scalers.js";

export function renderPreprocessingView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "scalers"; // "scalers" | "encoding" | "pca"
  const rawValues = [10, 12, 14, 15, 18, 20, 22, 25, 95]; // Com outlier proposital (95) para didática!

  function render() {
    const minMaxValues = minMaxScaler(rawValues);
    const standardValues = standardScaler(rawValues);
    const robustValues = robustScaler(rawValues);

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">⚙️</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/40 dark:border-amber-800">
              Engenharia de Dados
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Pré-Processamento & Features
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transforme variáveis brutas em escalas harmonizadas, codifique categorias e reduza dimensionalidade.
          </p>
        </div>

        <!-- Abas -->
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
          <button id="tab-btn-scalers" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'scalers' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
            Escalonamento (Scalers)
          </button>
          <button id="tab-btn-encoding" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'encoding' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
            One-Hot Encoding
          </button>
          <button id="tab-btn-pca" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'pca' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
            PCA 2D
          </button>
        </div>
      </div>

      <!-- Aba 1: Scalers Comparados -->
      ${activeTab === 'scalers' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-1">Comparativo de Normalização e Padronização</h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Observe como a presença de um <strong>outlier extremo (valor 95)</strong> afeta dramaticamente o <em>MinMaxScaler</em> e o <em>StandardScaler</em>, enquanto o <em>RobustScaler</em> preserva a separação dos demais pontos por se basear na mediana e no IQR.
              </p>
            </div>

            <!-- Fórmulas dos 3 Scalers -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">MinMaxScaler</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg text-center mb-2">
                  x' = (x - min) / (max - min)
                </div>
                <p class="text-[11px] text-slate-500">Mapeia exatamente para o intervalo [0, 1]. Muito sensível a outliers.</p>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">StandardScaler (Z-Score)</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg text-center mb-2">
                  z = (x - μ) / σ
                </div>
                <p class="text-[11px] text-slate-500">Centraliza a média em 0 e desvio padrão em 1. Ideal para algoritmos que assumem normalidade.</p>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">RobustScaler</h4>
                <div class="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg text-center mb-2">
                  x' = (x - mediana) / IQR
                </div>
                <p class="text-[11px] text-slate-500">Usa estatísticas não-paramétricas, sendo resistente à distorção por anomalias.</p>
              </div>
            </div>

            <!-- Tabela Comparativa dos Valores -->
            <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs font-medium">
                <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                  <tr>
                    <th class="py-3 px-4">Índice</th>
                    <th class="py-3 px-4">Valor Original (com Outlier)</th>
                    <th class="py-3 px-4 text-center text-amber-600 dark:text-amber-400">MinMaxScaler [0, 1]</th>
                    <th class="py-3 px-4 text-center text-blue-600 dark:text-blue-400">StandardScaler (Z)</th>
                    <th class="py-3 px-4 text-center text-emerald-600 dark:text-emerald-400">RobustScaler</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  ${rawValues.map((val, idx) => `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${val === 95 ? 'bg-rose-50/50 dark:bg-rose-950/20' : ''}">
                      <td class="py-2.5 px-4 text-slate-400">#${idx + 1}</td>
                      <td class="py-2.5 px-4 font-bold ${val === 95 ? 'text-rose-600 dark:text-rose-400 font-black' : ''}">
                        ${val} ${val === 95 ? '🚨 (Outlier)' : ''}
                      </td>
                      <td class="py-2.5 px-4 text-center">${minMaxValues[idx]}</td>
                      <td class="py-2.5 px-4 text-center">${standardValues[idx]}</td>
                      <td class="py-2.5 px-4 text-center font-bold text-emerald-600 dark:text-emerald-400">${robustValues[idx]}</td>
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
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-1">One-Hot Encoding (Dummies Categóricas)</h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Algoritmos matemáticos não processam textos diretamente. O One-Hot Encoding cria uma coluna binária (0 ou 1) para cada categoria distinta, evitando que a máquina suponha uma ordem numérica fictícia (como assumir que <em>"2ª Classe"</em> é o dobro de <em>"1ª Classe"</em>).
              </p>
            </div>

            <!-- Exemplo Didático com Classes de Passageiro -->
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Transformação da Coluna "classe":</h4>
              <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <table class="w-full text-left text-xs font-mono">
                  <thead class="bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th class="p-3">Passageiro</th>
                      <th class="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">Classe (Original)</th>
                      <th class="p-3 text-center">classe_1ª</th>
                      <th class="p-3 text-center">classe_2ª</th>
                      <th class="p-3 text-center">classe_3ª</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td class="p-3">Ana</td>
                      <td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">1ª Classe</td>
                      <td class="p-3 text-center font-bold text-emerald-600">1</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                    </tr>
                    <tr>
                      <td class="p-3">Bruno</td>
                      <td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">2ª Classe</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                      <td class="p-3 text-center font-bold text-emerald-600">1</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                    </tr>
                    <tr>
                      <td class="p-3">Carlos</td>
                      <td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">3ª Classe</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                      <td class="p-3 text-center text-slate-400">0</td>
                      <td class="p-3 text-center font-bold text-emerald-600">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Aba 3: PCA 2D -->
      ${activeTab === 'pca' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-1">PCA: Análise de Componentes Principais</h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Técnica não-supervisionada para compressão e projeção geométrica dos dados nos eixos ortogonais de máxima dispersão (variância). Permite visualizar bases multidimensionais em apenas 2 eixos sem perder as estruturas essenciais.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-1">Variância Explicada</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    • <strong>PC1 (Primeiro Componente):</strong> ~72% da informação total conservada.<br>
                    • <strong>PC2 (Segundo Componente):</strong> ~28% da informação residual.
                  </p>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Ao rotacionar os eixos para coincidir com as direções de maior espalhamento, conseguimos simplificar problemas de alta dimensionalidade reduzindo o custo computacional e eliminando correlações redundantes.
                </p>
              </div>

              <!-- Canvas de Projeção PCA -->
              <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <canvas id="pca-canvas" width="360" height="240" class="w-full h-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"></canvas>
                <p class="text-[11px] text-slate-400 mt-2">Projeção 2D de amostras Iris com elipses de dispersão</p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    // Listeners de abas
    container.querySelector("#tab-btn-scalers")?.addEventListener("click", () => {
      activeTab = "scalers";
      render();
    });

    container.querySelector("#tab-btn-encoding")?.addEventListener("click", () => {
      activeTab = "encoding";
      render();
    });

    container.querySelector("#tab-btn-pca")?.addEventListener("click", () => {
      activeTab = "pca";
      render();
      setTimeout(drawPcaCanvas, 50);
    });
  }

  function drawPcaCanvas() {
    const canvas = container.querySelector("#pca-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Eixos PC1 e PC2
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 10); ctx.lineTo(w / 2, h - 10);
    ctx.moveTo(10, h / 2); ctx.lineTo(w - 10, h / 2);
    ctx.stroke();

    // Rótulos de eixos
    ctx.fillStyle = "#64748b";
    ctx.font = "10px sans-serif";
    ctx.fillText("PC1 (72%)", w - 60, h / 2 - 6);
    ctx.fillText("PC2 (28%)", w / 2 + 6, 20);

    // Clusters sintéticos projetados
    const clusters = [
      { cx: w / 2 - 80, cy: h / 2 + 40, color: "#6366f1", n: 15 },
      { cx: w / 2 + 40, cy: h / 2 - 20, color: "#10b981", n: 15 },
      { cx: w / 2 + 70, cy: h / 2 + 50, color: "#f59e0b", n: 15 }
    ];

    clusters.forEach(c => {
      ctx.fillStyle = c.color;
      for (let i = 0; i < c.n; i++) {
        const rx = c.cx + (Math.random() - 0.5) * 60;
        const ry = c.cy + (Math.random() - 0.5) * 50;
        ctx.beginPath();
        ctx.arc(rx, ry, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  }

  render();
  return container;
}
