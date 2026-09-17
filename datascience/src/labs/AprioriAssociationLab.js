// Laboratório Modular de Regras de Associação e Algoritmo Apriori

import { apriori } from "../engine/apriori.js";
import { getActiveDataset, onDatasetChange } from "../data/datasetStore.js";
import { Icons } from "../components/Icons.js";

export function renderAprioriAssociationLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  let minSupport = 0.2;
  let minConfidence = 0.5;
  let minLift = 1.0;

  // Transações exemplo padrão para o laboratório Apriori
  const defaultTransactions = [
    ["leite", "pao", "manteiga"],
    ["pao", "manteiga"],
    ["leite", "pao", "cafe"],
    ["leite", "cafe"],
    ["pao", "manteiga", "cafe"],
    ["leite", "pao", "manteiga", "cafe"],
    ["pao", "leite"],
    ["cafe", "manteiga"]
  ];

  function getTransactions() {
    const dataset = getActiveDataset();
    if (dataset && dataset.id === "supermarket") {
      // Se for dataset de mercado, derivar cestas
      return dataset.data.map(d => [d.ProductLine, d.Payment, d.CustomerType].filter(Boolean));
    }
    // Caso padrão educacional
    return defaultTransactions;
  }

  function update() {
    const transactions = getTransactions();
    const result = apriori(transactions, minSupport, minConfidence);

    // Filtrar por Lift mínimo
    const filteredRules = result.rules.filter(r => r.lift >= minLift);

    container.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${Icons.database("w-4 h-4 text-slate-500")}</span>
            <span>Mineração de Regras de Associação (Apriori)</span>
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Descubra associações frequentes $A \\Rightarrow B$ e avalie métricas de interesse (Suporte, Confiança e Lift).
          </p>
        </div>
      </div>

      <!-- Controles de Hiperparâmetros -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Suporte Mínimo (minsup)</span>
            <span id="apriori-sup-val" class="font-mono text-slate-900 dark:text-white">${(minSupport * 100).toFixed(0)}%</span>
          </div>
          <input id="apriori-sup-slider" type="range" min="0.05" max="0.8" step="0.05" value="${minSupport}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        </div>

        <div>
          <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Confiança Mínima (minconf)</span>
            <span id="apriori-conf-val" class="font-mono text-slate-900 dark:text-white">${(minConfidence * 100).toFixed(0)}%</span>
          </div>
          <input id="apriori-conf-slider" type="range" min="0.1" max="1.0" step="0.05" value="${minConfidence}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        </div>

        <div>
          <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Lift Mínimo</span>
            <span id="apriori-lift-val" class="font-mono text-slate-900 dark:text-white">${minLift.toFixed(2)}</span>
          </div>
          <input id="apriori-lift-slider" type="range" min="0.5" max="3.0" step="0.1" value="${minLift}" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        </div>
      </div>

      <!-- Resumo de Descoberta -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Total de Transações</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${transactions.length}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Itemsets Frequentes</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${result.frequentItemsets.length}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p class="text-[10px] uppercase font-bold text-slate-400">Regras Válidas Geradas</p>
          <p class="text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">${filteredRules.length}</p>
        </div>
      </div>

      <!-- Tabela de Regras -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50">
              <th class="p-2.5">Antecedente (A)</th>
              <th class="p-2.5"></th>
              <th class="p-2.5">Consequente (B)</th>
              <th class="p-2.5 text-right">Suporte</th>
              <th class="p-2.5 text-right">Confiança</th>
              <th class="p-2.5 text-right font-bold text-slate-800 dark:text-slate-200">Lift</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
            ${filteredRules.length === 0 ? `
              <tr>
                <td colspan="6" class="p-4 text-center text-slate-400 font-sans">
                  Nenhuma regra atende aos critérios mínimos definidos. Reduza o suporte ou a confiança mínima.
                </td>
              </tr>
            ` : filteredRules.map(r => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td class="p-2.5 font-sans font-semibold text-slate-900 dark:text-white">{ ${r.antecedent.join(", ")} }</td>
                <td class="p-2.5 text-slate-400">⇒</td>
                <td class="p-2.5 font-sans font-semibold text-slate-900 dark:text-white">{ ${r.consequent.join(", ")} }</td>
                <td class="p-2.5 text-right text-slate-600 dark:text-slate-300">${(r.support * 100).toFixed(1)}%</td>
                <td class="p-2.5 text-right text-slate-600 dark:text-slate-300">${(r.confidence * 100).toFixed(1)}%</td>
                <td class="p-2.5 text-right font-bold ${r.lift > 1.2 ? 'text-slate-900 dark:text-white' : 'text-slate-500'}">
                  ${r.lift.toFixed(3)}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    // Listeners
    container.querySelector("#apriori-sup-slider").addEventListener("input", (e) => {
      minSupport = parseFloat(e.target.value);
      container.querySelector("#apriori-sup-val").textContent = `${(minSupport * 100).toFixed(0)}%`;
      update();
    });

    container.querySelector("#apriori-conf-slider").addEventListener("input", (e) => {
      minConfidence = parseFloat(e.target.value);
      container.querySelector("#apriori-conf-val").textContent = `${(minConfidence * 100).toFixed(0)}%`;
      update();
    });

    container.querySelector("#apriori-lift-slider").addEventListener("input", (e) => {
      minLift = parseFloat(e.target.value);
      container.querySelector("#apriori-lift-val").textContent = minLift.toFixed(2);
      update();
    });
  }

  update();
  onDatasetChange(update);
  return container;
}
