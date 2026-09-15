// Módulo Dedicado: Mineração de Dados & Processo KDD (Knowledge Discovery in Databases)

import { SAMPLE_DATASETS } from "../../data/datasets.js";
import { runApriori } from "../../engine/apriori.js";
import { detectOutliersIQR } from "../../engine/stats.js";

export function renderKddView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let activeTab = "apriori"; // "phases" | "apriori" | "anomalies"
  let currentMinSupport = 0.25;
  let currentMinConfidence = 0.50;

  function render() {
    const transactions = SAMPLE_DATASETS.supermarket.transactions;
    const aprioriResult = runApriori(transactions, currentMinSupport, currentMinConfidence);

    // Dados para demonstração de anomalias
    const sampleValues = [22, 24, 25, 23, 26, 24, 25, 88, 23, 24, 27, 22, 25, 23, 5, 24, 26, 25];
    const outlierResult = detectOutliersIQR(sampleValues, 1.5);

    container.innerHTML = `
      <!-- Cabeçalho do Módulo -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-2xl">⛏️</span>
              <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800">
                Seção Dedicada
              </span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Mineração de Dados & Processo KDD
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              <em>Knowledge Discovery in Databases</em>: da seleção de dados brutos à descoberta de padrões frequentes e regras acionáveis.
            </p>
          </div>

          <!-- Abas de Navegação Interna -->
          <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button id="tab-btn-apriori" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'apriori' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
              Regras Apriori
            </button>
            <button id="tab-btn-phases" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'phases' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
              5 Fases do KDD
            </button>
            <button id="tab-btn-anomalies" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'anomalies' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}">
              Mineração de Anomalias
            </button>
          </div>
        </div>
      </div>

      <!-- Conteúdo da Aba 1: Algoritmo Apriori (Cesta de Compras) -->
      ${activeTab === 'apriori' ? `
        <div class="space-y-6">
          <!-- Bloco Conceitual & Fórmulas Didáticas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">1. Suporte (Support)</h4>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">P(X ∩ Y)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                Percentual de transações em que os itens aparecem juntos.
              </p>
              <div class="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl font-mono text-[11px] text-center text-slate-700 dark:text-slate-300">
                Suporte(X → Y) = Freq(X ∪ Y) / N
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">2. Confiança (Confidence)</h4>
                <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">P(Y | X)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                Dado que o cliente comprou X, qual a chance de comprar Y?
              </p>
              <div class="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl font-mono text-[11px] text-center text-slate-700 dark:text-slate-300">
                Conf(X → Y) = Suporte(X ∪ Y) / Suporte(X)
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">3. Lift (Alavancagem)</h4>
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Interdependência</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                Se Lift > 1, há <strong>atração positiva</strong> entre os itens.
              </p>
              <div class="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl font-mono text-[11px] text-center text-slate-700 dark:text-slate-300">
                Lift(X → Y) = Confiança(X → Y) / Suporte(Y)
              </div>
            </div>
          </div>

          <!-- Painel Interativo com Sliders -->
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              
              <!-- Slider Suporte Mínimo -->
              <div class="flex-1 space-y-2">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-min-support" class="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Suporte Mínimo:</span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold">${Math.round(currentMinSupport * 100)}%</span>
                  </label>
                  <span class="text-[11px] text-slate-400">Mínimo de ocorrências</span>
                </div>
                <input type="range" id="slider-min-support" min="0.10" max="0.60" step="0.05" value="${currentMinSupport}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500">
              </div>

              <!-- Slider Confiança Mínima -->
              <div class="flex-1 space-y-2">
                <div class="flex justify-between items-center text-xs font-semibold">
                  <label for="slider-min-confidence" class="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Confiança Mínima:</span>
                    <span class="text-blue-600 dark:text-blue-400 font-bold">${Math.round(currentMinConfidence * 100)}%</span>
                  </label>
                  <span class="text-[11px] text-slate-400">Certeza da regra</span>
                </div>
                <input type="range" id="slider-min-confidence" min="0.20" max="0.90" step="0.05" value="${currentMinConfidence}" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500">
              </div>

            </div>

            <!-- Resumo das Descobertas -->
            <div class="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-700 dark:text-slate-300">Regras Descobertas:</span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                  ${aprioriResult.rules.length} regras
                </span>
                <span class="text-slate-400">|</span>
                <span class="text-slate-500 dark:text-slate-400">${aprioriResult.frequentItemsets.length} conjuntos frequentes</span>
              </div>
              <p class="text-[11px] text-slate-400 italic">
                Base: 15 transações de varejo pré-carregadas.
              </p>
            </div>

            <!-- Tabela de Regras de Associação -->
            <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th class="py-3 px-4">Antecedente (Se comprou...)</th>
                    <th class="py-3 px-4">Consequente (Então compra...)</th>
                    <th class="py-3 px-4 text-center">Suporte</th>
                    <th class="py-3 px-4 text-center">Confiança</th>
                    <th class="py-3 px-4 text-center">Lift (Interesse)</th>
                    <th class="py-3 px-4">Interpretação</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
                  ${aprioriResult.rules.length > 0 ? aprioriResult.rules.map(rule => `
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td class="py-3 px-4">
                        <div class="flex flex-wrap gap-1">
                          ${rule.antecedent.map(item => `<span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-[11px]">${item}</span>`).join("")}
                        </div>
                      </td>
                      <td class="py-3 px-4">
                        <div class="flex flex-wrap gap-1">
                          ${rule.consequent.map(item => `<span class="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">${item}</span>`).join("")}
                        </div>
                      </td>
                      <td class="py-3 px-4 text-center font-mono font-bold">${Math.round(rule.support * 100)}%</td>
                      <td class="py-3 px-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">${Math.round(rule.confidence * 100)}%</td>
                      <td class="py-3 px-4 text-center">
                        <span class="px-2 py-0.5 rounded font-mono font-bold ${rule.lift > 1.2 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : rule.lift > 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">
                          ${rule.lift}x
                        </span>
                      </td>
                      <td class="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">
                        ${rule.lift > 1.2 
                          ? `Forte correlação: quem leva ${rule.antecedent.join(", ")} compra ${rule.consequent.join(", ")} ${rule.lift}x mais!` 
                          : rule.lift > 1 
                          ? `Associação moderada positiva.` 
                          : `Itens praticamente independentes.`}
                      </td>
                    </tr>
                  `).join("") : `
                    <tr>
                      <td colspan="6" class="py-8 text-center text-slate-400 dark:text-slate-500 italic">
                        Nenhuma regra atendeu aos critérios de Suporte (${Math.round(currentMinSupport * 100)}%) e Confiança (${Math.round(currentMinConfidence * 100)}%). Reduza os controles acima para visualizar regras mais raras.
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- Visualizador das Transações Originais -->
            <details class="pt-2 text-xs text-slate-500">
              <summary class="cursor-pointer font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors">
                🔍 Ver Transações Brutas do Supermercado (15 cestas)
              </summary>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                ${transactions.map((t, idx) => `
                  <div class="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                    <span class="font-bold text-slate-400">#${idx + 1}:</span> ${t.join(", ")}
                  </div>
                `).join("")}
              </div>
            </details>
          </div>
        </div>
      ` : ""}

      <!-- Conteúdo da Aba 2: 5 Fases do KDD -->
      ${activeTab === 'phases' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">As 5 Etapas do Ciclo KDD</h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Desenvolvido por Fayyad et al. (1996), o processo KDD estabelece que a mineração de dados é apenas uma das etapas dentro de um fluxo completo e iterativo para extrair conhecimento válido, útil e compreensível.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                <span class="text-xl">1️⃣</span>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Seleção</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Definição do objetivo de negócio, amostragem e isolamento do subconjunto relevante da base.
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 space-y-2">
                <span class="text-xl">2️⃣</span>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Pré-processamento</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tratamento de dados inconsistentes, remoção de ruído, estratégias para dados ausentes (NaN).
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                <span class="text-xl">3️⃣</span>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Transformação</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Redução de dimensionalidade, discretização (binning), agregação e normalização dos dados.
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                <span class="text-xl">4️⃣</span>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Mineração</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Aplicação de algoritmos: regras de associação, agrupamento (clustering), classificação e anomalias.
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 space-y-2">
                <span class="text-xl">5️⃣</span>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Avaliação</h4>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Interpretação dos padrões descobertos, descarte de regras óbvias ou espúrias e geração de valor.
                </p>
              </div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Conteúdo da Aba 3: Mineração de Anomalias -->
      ${activeTab === 'anomalies' ? `
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">Detecção e Mineração de Anomalias (Outliers)</h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Identificar registros que se distanciam consideravelmente do padrão geral. Essencial para prevenção a fraudes em bancos e controle de qualidade industrial.
              </p>
            </div>

            <!-- Demonstração Visual com Regra de Tukey -->
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Regra do Intervalo Interquartil (Tukey IQR)
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-bold uppercase">Limite Inferior</span>
                  <p class="text-base font-black text-slate-800 dark:text-slate-200">${outlierResult.lowerBound}</p>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-bold uppercase">Limite Superior</span>
                  <p class="text-base font-black text-slate-800 dark:text-slate-200">${outlierResult.upperBound}</p>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-bold uppercase">Anomalias Detectadas</span>
                  <p class="text-base font-black text-rose-600 dark:text-rose-400">${outlierResult.outliersCount} valores</p>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-bold uppercase">Valores Anômalos</span>
                  <p class="text-base font-black text-rose-600 dark:text-rose-400">[${outlierResult.outliers.join(", ")}]</p>
                </div>
              </div>

              <!-- Faixa Visual de Pontos -->
              <div class="pt-4">
                <p class="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Amostra Analisada:</p>
                <div class="flex flex-wrap gap-2">
                  ${sampleValues.map(val => {
                    const isOutlier = val < outlierResult.lowerBound || val > outlierResult.upperBound;
                    return `
                      <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${isOutlier ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}">
                        ${val} ${isOutlier ? '⚠️' : ''}
                      </span>
                    `;
                  }).join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    `;

    // Listeners das abas
    container.querySelector("#tab-btn-apriori")?.addEventListener("click", () => {
      activeTab = "apriori";
      render();
    });

    container.querySelector("#tab-btn-phases")?.addEventListener("click", () => {
      activeTab = "phases";
      render();
    });

    container.querySelector("#tab-btn-anomalies")?.addEventListener("click", () => {
      activeTab = "anomalies";
      render();
    });

    // Listeners dos sliders do Apriori
    const sliderSupp = container.querySelector("#slider-min-support");
    if (sliderSupp) {
      sliderSupp.addEventListener("input", (e) => {
        currentMinSupport = Number(e.target.value);
        render();
      });
    }

    const sliderConf = container.querySelector("#slider-min-confidence");
    if (sliderConf) {
      sliderConf.addEventListener("input", (e) => {
        currentMinConfidence = Number(e.target.value);
        render();
      });
    }
  }

  render();
  return container;
}
