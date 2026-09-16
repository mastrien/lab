// Módulo "Meu Laboratório & Gerenciador de Datasets"

import { getActiveDataset, getAllDatasets, setActiveDataset, saveCustomDataset, deleteCustomDataset, parseCSVString, onDatasetChange } from "../../data/datasetStore.js";
import { fitPolynomialRegression } from "../../engine/mlModels.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderMyLabView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  let modelResult = null;

  function render() {
    const activeDataset = getActiveDataset();
    const allDatasets = getAllDatasets();
    const numericCols = activeDataset.numericColumns || [];

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
            <span class="text-slate-700 dark:text-slate-300">${Icons.table("w-5 h-5")}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Workspace de Dados
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Gerenciador de Datasets & Laboratório
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Carregue arquivos CSV próprios para o armazenamento do navegador ou alterne entre bases de referência para uso em todos os laboratórios.
          </p>
        </div>

        <div>
          <label for="mylab-csv-input" class="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold shadow-xs">
            ${Icons.upload("w-4 h-4")}
            <span>Importar Arquivo CSV</span>
          </label>
          <input type="file" id="mylab-csv-input" accept=".csv,text/csv" class="hidden">
        </div>
      </div>

      <!-- Gerenciamento de Datasets Disponíveis -->
      <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Bases Disponíveis no Navegador</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${allDatasets.map(d => {
            const isActive = d.id === activeDataset.id;
            const rows = d.data ? d.data.length : (d.transactions ? d.transactions.length : 0);
            const cols = d.columns ? d.columns.length : 0;

            return `
              <div class="p-3.5 rounded-lg border transition-colors flex flex-col justify-between ${isActive ? 'border-slate-900 dark:border-slate-100 bg-slate-50/50 dark:bg-slate-800/40' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}">
                <div class="space-y-1 mb-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-900 dark:text-white truncate">${d.name}</span>
                    ${isActive ? `<span class="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">Ativo</span>` : ''}
                  </div>
                  <p class="text-[11px] text-slate-500 font-mono">${rows} registros • ${cols} colunas</p>
                  <p class="text-[11px] text-slate-400 line-clamp-2">${d.description || (d.isCustom ? 'Dataset customizado carregado pelo usuário.' : '')}</p>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  ${!isActive ? `
                    <button data-select-id="${d.id}" class="mylab-select-btn font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      Definir como Ativo →
                    </button>
                  ` : `
                    <span class="text-[11px] font-semibold text-slate-500">Base em execução</span>
                  `}
                  ${d.isCustom ? `
                    <button data-delete-id="${d.id}" class="mylab-delete-btn text-slate-400 hover:text-rose-600 p-1" title="Excluir dataset">
                      ${Icons.trash("w-3.5 h-3.5")}
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Pré-visualização da Tabela Ativa -->
      <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Inspeção Tabular: ${activeDataset.name}</h3>
            <p class="text-xs text-slate-500">Exibindo os 6 primeiros registros.</p>
          </div>
          <span class="text-xs text-slate-500 font-mono">
            ${activeDataset.data ? activeDataset.data.length : 0} amostras no total
          </span>
        </div>

        ${activeDataset.data && activeDataset.data.length > 0 ? `
          <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500 font-sans">
                <tr>
                  ${activeDataset.columns.map(c => `<th class="py-2.5 px-3">${c}</th>`).join("")}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${activeDataset.data.slice(0, 6).map(row => `
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    ${activeDataset.columns.map(c => `<td class="py-2 px-3">${row[c] !== null ? row[c] : '<span class="text-slate-400">null</span>'}</td>`).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <p class="text-xs text-slate-500 italic p-4 text-center">Nenhuma linha tabular para exibir.</p>
        `}
      </div>

      <!-- Teste Rápido de Modelagem Linear sobre a Base Ativa -->
      ${numericCols.length >= 2 ? `
        <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Verificação Rápida de Ajuste Linear</h3>
            <p class="text-xs text-slate-500">Escolha dois atributos para checar o coeficiente de determinação preliminar.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="space-y-1">
              <label for="mylab-col-x" class="font-semibold text-slate-600 dark:text-slate-400">Eixo X (Preditor):</label>
              <select id="mylab-col-x" class="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                ${numericCols.map((c, i) => `<option value="${c}" ${i === 0 ? 'selected' : ''}>${c}</option>`).join("")}
              </select>
            </div>
            <div class="space-y-1">
              <label for="mylab-col-y" class="font-semibold text-slate-600 dark:text-slate-400">Eixo Y (Alvo):</label>
              <select id="mylab-col-y" class="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                ${numericCols.map((c, i) => `<option value="${c}" ${i === 1 || i === numericCols.length - 1 ? 'selected' : ''}>${c}</option>`).join("")}
              </select>
            </div>
          </div>

          <button id="mylab-btn-fit" class="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold transition-colors">
            Calcular Regressão Linear Simples
          </button>

          ${modelResult ? `
            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div class="grid grid-cols-3 gap-3 text-center font-mono">
                <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-sans block">R²</span>
                  <span class="font-bold text-slate-900 dark:text-white">${modelResult.r2}</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-sans block">MSE</span>
                  <span class="font-bold text-slate-900 dark:text-white">${modelResult.mse}</span>
                </div>
                <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                  <span class="text-[10px] text-slate-400 font-sans block">MAE</span>
                  <span class="font-bold text-slate-900 dark:text-white">${modelResult.mae}</span>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}
    `;

    container.appendChild(mainContent);

    // Listeners para seleção de dataset ativo
    mainContent.querySelectorAll(".mylab-select-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-select-id");
        if (id) {
          setActiveDataset(id);
          render();
        }
      });
    });

    // Exclusão de dataset
    mainContent.querySelectorAll(".mylab-delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-delete-id");
        if (id && confirm("Deseja excluir este dataset do navegador?")) {
          deleteCustomDataset(id);
          render();
        }
      });
    });

    // Upload de CSV
    const fileInput = mainContent.querySelector("#mylab-csv-input");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const parsed = parseCSVString(evt.target.result, file.name);
          if (parsed && parsed.data.length > 0) {
            saveCustomDataset(parsed);
            modelResult = null;
            render();
          } else {
            alert("Não foi possível processar o arquivo CSV.");
          }
        };
        reader.readAsText(file);
      });
    }

    // Botão de regressão
    mainContent.querySelector("#mylab-btn-fit")?.addEventListener("click", () => {
      const colX = mainContent.querySelector("#mylab-col-x")?.value;
      const colY = mainContent.querySelector("#mylab-col-y")?.value;
      if (!colX || !colY || !activeDataset.data) return;

      const points = activeDataset.data
        .map(d => ({ x: Number(d[colX]), y: Number(d[colY]) }))
        .filter(p => !isNaN(p.x) && !isNaN(p.y));

      if (points.length < 2) {
        alert("Número insuficiente de pontos válidos para ajuste.");
        return;
      }

      modelResult = fitPolynomialRegression(points, 1);
      render();
    });
  }

  render();

  onDatasetChange(() => {
    modelResult = null;
    render();
  });

  return container;
}
