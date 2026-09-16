// Módulo Dedicado: Mineração de Dados & Processo KDD (Knowledge Discovery in Databases)

import { SAMPLE_DATASETS } from "../../data/datasets.js";
import { runApriori } from "../../engine/apriori.js";
import { detectOutliersIQR } from "../../engine/stats.js";
import { getActiveDataset, onDatasetChange } from "../../data/datasetStore.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderKddView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "apriori"; // "phases" | "apriori" | "anomalies"
  let currentMinSupport = 0.25;
  let currentMinConfidence = 0.50;
  let selectedOutlierCol = null;

  function render() {
    const activeDataset = getActiveDataset();
    const numericCols = activeDataset.numericColumns || [];
    if (!selectedOutlierCol || !numericCols.includes(selectedOutlierCol)) {
      selectedOutlierCol = numericCols[0] || null;
    }

    // Se o dataset ativo tiver formato de transação (supermarket), usa diretamente;
    // Se for tabular (ex: titanic, iris ou custom), gera transações a partir dos atributos discretos
    let transactions = [];
    if (activeDataset.transactions) {
      transactions = activeDataset.transactions;
    } else if (activeDataset.data && activeDataset.data.length > 0) {
      // Extrai itens categóricos em formato de transação
      transactions = activeDataset.data.map(row => {
        const items = [];
        activeDataset.columns.forEach(col => {
          const val = row[col];
          if (val !== null && val !== undefined && val !== "") {
            items.push(`${col}=${val}`);
          }
        });
        return items;
      });
    } else {
      transactions = SAMPLE_DATASETS.supermarket.transactions;
    }

    const aprioriResult = runApriori(transactions, currentMinSupport, currentMinConfidence);

    // Amostra de valores para detecção de anomalias no dataset ativo
    let sampleValues = [];
    if (selectedOutlierCol && activeDataset.data) {
      sampleValues = activeDataset.data.map(r => Number(r[selectedOutlierCol])).filter(v => !isNaN(v));
    }
    if (sampleValues.length === 0) {
      sampleValues = [22, 24, 25, 23, 26, 24, 25, 88, 23, 24, 27, 22, 25, 23, 5, 24, 26, 25];
    }
    const outlierResult = detectOutliersIQR(sampleValues, 1.5);

    container.innerHTML = "";

    // Barra de Dataset Ativo
    const datasetBar = renderActiveDatasetBar(() => render());
    container.appendChild(datasetBar);

    const mainContent = document.createElement("div");
    mainContent.className = "space-y-6";

    mainContent.innerHTML = `
      <!-- Cabeçalho do Módulo -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-slate-700 dark:text-slate-300">${Icons.database("w-5 h-5")}</span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Seção Temática
              </span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Mineração de Dados & Processo KDD
            </h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Knowledge Discovery in Databases: formalização do ciclo analítico, mineração de regras de associação e detecção de anomalias.
            </p>
          </div>

          <!-- Abas de Navegação Interna -->
          <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
            <button id="tab-btn-apriori" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'apriori' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              Regras Apriori
            </button>
            <button id="tab-btn-phases" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'phases' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              5 Fases do KDD
            </button>
            <button id="tab-btn-anomalies" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'anomalies' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              Detecção de Anomalias
            </button>
          </div>
        </div>
      </div>

      <!-- Conteúdo da Aba 1: Algoritmo Apriori -->
      ${activeTab === 'apriori' ? `
        <div class="space-y-6">
          <!-- Bloco Conceitual & Fórmulas Didáticas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-500">1. Suporte (Support)</h4>
                <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">P(X ∩ Y)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                Proporção de transações que contêm simultaneamente o conjunto de itens X e Y.
              </p>
              <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-[11px] text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Suporte(X → Y) = Freq(X ∪ Y) / N
              </div>
            </div>

            <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-500">2. Confiança (Confidence)</h4>
                <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">P(Y | X)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                Probabilidade condicional da ocorrência do consequente Y dado o antecedente X.
              </p>
              <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-[11px] text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Conf(X → Y) = Suporte(X ∪ Y) / Suporte(X)
              </div>
            </div>

            <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-500">3. Lift (Alavancagem)</h4>
                <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Independência</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                Razão entre a confiança observada e a confiança esperada sob independência estatística.
              </p>
              <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded font-mono text-[11px] text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Lift(X → Y) = Confiança(X → Y) / Suporte(Y)
              </div>
            </div>
          </div>

          <!-- Painel Interativo com Sliders -->
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              
              <!-- Slider Suporte Mínimo -->
              <div class="flex-1 space-y-1.5">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-min-support" class="text-slate-700 dark:text-slate-300">
                    Suporte Mínimo: <span class="font-mono font-bold">${Math.round(currentMinSupport * 100)}%</span>
                  </label>
                  <span class="text-[11px] text-slate-400">Limiar mínimo de frequência</span>
                </div>
                <input type="range" id="slider-min-support" min="0.10" max="0.60" step="0.05" value="${currentMinSupport}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">
              </div>

              <!-- Slider Confiança Mínima -->
              <div class="flex-1 space-y-1.5">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-min-confidence" class="text-slate-700 dark:text-slate-300">
                    Confiança Mínima: <span class="font-mono font-bold">${Math.round(currentMinConfidence * 100)}%</span>
                  </label>
                  <span class="text-[11px] text-slate-400">Precisão da implicação</span>
                </div>
                <input type="range" id="slider-min-confidence" min="0.20" max="0.90" step="0.05" value="${currentMinConfidence}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer">
              </div>

            </div>

            <!-- Resumo das Descobertas -->
            <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-700 dark:text-slate-300">Regras Mineradas:</span>
                <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-700">
                  ${aprioriResult.rules.length}
                </span>
                <span class="text-slate-400">|</span>
                <span class="text-slate-500 font-mono">${aprioriResult.frequentItemsets.length} conjuntos frequentes</span>
              </div>
              <p class="text-[11px] text-slate-400">
                Base avaliada: ${transactions.length} registros / transações
              </p>
            </div>

            <!-- Tabela de Regras de Associação -->
            <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th class="py-2.5 px-3">Antecedente (X)</th>
                    <th class="py-2.5 px-3">Consequente (Y)</th>
                    <th class="py-2.5 px-3 text-center">Suporte</th>
                    <th class="py-2.5 px-3 text-center">Confiança</th>
                    <th class="py-2.5 px-3 text-center">Lift</th>
                    <th class="py-2.5 px-3">Avaliação do Lift</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  ${aprioriResult.rules.length > 0 ? aprioriResult.rules.map(rule => `
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="py-2.5 px-3">
                        <div class="flex flex-wrap gap-1">
                          ${rule.antecedent.map(item => `<span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] border border-slate-200 dark:border-slate-700">${item}</span>`).join("")}
                        </div>
                      </td>
                      <td class="py-2.5 px-3">
                        <div class="flex flex-wrap gap-1">
                          ${rule.consequent.map(item => `<span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] border border-slate-200 dark:border-slate-700">${item}</span>`).join("")}
                        </div>
                      </td>
                      <td class="py-2.5 px-3 text-center font-mono">${(rule.support * 100).toFixed(1)}%</td>
                      <td class="py-2.5 px-3 text-center font-mono font-bold">${(rule.confidence * 100).toFixed(1)}%</td>
                      <td class="py-2.5 px-3 text-center">
                        <span class="px-2 py-0.5 rounded font-mono font-bold text-xs ${rule.lift > 1.2 ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : rule.lift > 1 ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'bg-slate-50 text-slate-500'}">
                          ${rule.lift}
                        </span>
                      </td>
                      <td class="py-2.5 px-3 text-xs text-slate-500">
                        ${rule.lift > 1.2 
                          ? `Atração positiva: X eleva a probabilidade de Y em ${rule.lift}x.` 
                          : rule.lift > 1 
                          ? `Associação fraca positiva.` 
                          : `Itens aproximadamente independentes.`}
                      </td>
                    </tr>
                  `).join("") : `
                    <tr>
                      <td colspan="6" class="py-6 text-center text-slate-400 italic">
                        Nenhuma regra atendeu aos critérios de Suporte (${Math.round(currentMinSupport * 100)}%) e Confiança (${Math.round(currentMinConfidence * 100)}%). Reduza os limiares para incluir regras de menor frequência.
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Conteúdo da Aba 2: 5 Fases do KDD -->
      ${activeTab === 'phases' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Estrutura Canônica do Processo KDD</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Proposto por Fayyad, Piatetsky-Shapiro e Smyth (1996), o modelo define o KDD como um processo interativo e iterativo de descoberta de conhecimento útil, implícito e acionável.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span class="text-xs font-mono font-bold text-slate-400">01</span>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Seleção de Dados</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Definição do escopo empírico, criação do subconjunto de variáveis relevantes e amostragem controlada.
                </p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span class="text-xs font-mono font-bold text-slate-400">02</span>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Pré-processamento</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tratamento de ruídos estocásticos, remoção ou imputação de valores ausentes e consistência de tipos.
                </p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span class="text-xs font-mono font-bold text-slate-400">03</span>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Transformação</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Discretização de escalas contínuas (binning), normalização numérica e redução de dimensionalidade.
                </p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span class="text-xs font-mono font-bold text-slate-400">04</span>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Mineração</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Aplicação de algoritmos de busca de padrões (regras de associação, clustering, classificação e detecção de anomalias).
                </p>
              </div>

              <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span class="text-xs font-mono font-bold text-slate-400">05</span>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Interpretação</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Validação da significância dos padrões, eliminação de correlações espúrias e documentação do conhecimento gerado.
                </p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Conteúdo da Aba 3: Mineração de Anomalias -->
      ${activeTab === 'anomalies' ? `
        <div class="space-y-5">
          <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Detecção de Anomalias pelo Intervalo Interquartil (IQR)</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  Método não-paramétrico de Tukey para identificação de observações discrepantes.
                </p>
              </div>

              ${numericCols.length > 0 ? `
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500">Atributo:</span>
                  <select id="select-kdd-outlier-col" class="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-slate-800 dark:text-slate-200 cursor-pointer">
                    ${numericCols.map(c => `<option value="${c}" ${c === selectedOutlierCol ? 'selected' : ''}>${c}</option>`).join("")}
                  </select>
                </div>
              ` : ""}
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Limite Inferior (Q1 - 1.5×IQR)</span>
                <p class="text-base font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${outlierResult.lowerBound}</p>
              </div>
              <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Limite Superior (Q3 + 1.5×IQR)</span>
                <p class="text-base font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${outlierResult.upperBound}</p>
              </div>
              <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Anomalias Encontradas</span>
                <p class="text-base font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${outlierResult.outliersCount}</p>
              </div>
              <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Proporção na Amostra</span>
                <p class="text-base font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">${outlierResult.percentage}%</p>
              </div>
            </div>

            <!-- Listagem de Valores -->
            <div class="pt-2">
              <p class="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Amostras analisadas (${sampleValues.length} registros):</p>
              <div class="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                ${sampleValues.slice(0, 100).map(val => {
                  const isOutlier = val < outlierResult.lowerBound || val > outlierResult.upperBound;
                  return `
                    <span class="px-2 py-0.5 rounded text-xs font-mono ${isOutlier ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}">
                      ${val} ${isOutlier ? '[Anomalia]' : ''}
                    </span>
                  `;
                }).join("")}
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    container.appendChild(mainContent);

    // Listeners das abas
    mainContent.querySelector("#tab-btn-apriori")?.addEventListener("click", () => {
      activeTab = "apriori";
      render();
    });

    mainContent.querySelector("#tab-btn-phases")?.addEventListener("click", () => {
      activeTab = "phases";
      render();
    });

    mainContent.querySelector("#tab-btn-anomalies")?.addEventListener("click", () => {
      activeTab = "anomalies";
      render();
    });

    // Listeners dos sliders
    const sliderSupp = mainContent.querySelector("#slider-min-support");
    if (sliderSupp) {
      sliderSupp.addEventListener("input", (e) => {
        currentMinSupport = Number(e.target.value);
        render();
      });
    }

    const sliderConf = mainContent.querySelector("#slider-min-confidence");
    if (sliderConf) {
      sliderConf.addEventListener("input", (e) => {
        currentMinConfidence = Number(e.target.value);
        render();
      });
    }

    // Seletor de atributo para outliers
    const colSelect = mainContent.querySelector("#select-kdd-outlier-col");
    if (colSelect) {
      colSelect.addEventListener("change", (e) => {
        selectedOutlierCol = e.target.value;
        render();
      });
    }
  }

  render();

  // Re-renderizar se o dataset ativo mudar
  onDatasetChange(() => {
    render();
  });

  return container;
}
