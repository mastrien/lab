// Módulo "Meu Laboratório DS" (Inspirado no Meu Laboratório do Garu para upload de CSV)

import { SAMPLE_DATASETS } from "../../data/datasets.js";
import { summaryStats } from "../../engine/stats.js";
import { fitPolynomialRegression } from "../../engine/mlModels.js";

export function renderMyLabView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let loadedDataset = {
    name: "Amostra Padrão (Imóveis)",
    columns: SAMPLE_DATASETS.housing.columns,
    data: SAMPLE_DATASETS.housing.data
  };

  let modelResult = null;

  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return null;
    const delimiter = lines[0].includes(";") ? ";" : ",";
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ""));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ""));
      const row = {};
      headers.forEach((h, idx) => {
        const val = values[idx];
        const num = Number(val);
        row[h] = !isNaN(num) && val !== "" ? num : val;
      });
      data.push(row);
    }

    return { columns: headers, data };
  }

  function render() {
    const numericCols = loadedDataset.columns.filter(c => typeof loadedDataset.data[0]?.[c] === "number");

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">🧪</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-800">
              Playground do Usuário
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Meu Laboratório DS
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Importe seu arquivo CSV próprio ou use um dos nossos conjuntos pré-configurados para modelagem no navegador.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <label for="csv-file-input" class="cursor-pointer px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20 active:scale-95 flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            <span>Carregar Arquivo CSV</span>
          </label>
          <input type="file" id="csv-file-input" accept=".csv,text/csv" class="hidden">
        </div>
      </div>

      <!-- Área de Importação / Datasets de Exemplo -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Base Ativa:</span>
            <span class="text-sm font-bold text-slate-800 dark:text-slate-200">${loadedDataset.name}</span>
            <span class="text-xs text-slate-400">(${loadedDataset.data.length} linhas, ${loadedDataset.columns.length} colunas)</span>
          </div>

          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-slate-500 font-medium">Ou carregar exemplo:</span>
            <button id="load-sample-iris" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-300">
              🌸 Iris
            </button>
            <button id="load-sample-housing" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-300">
              🏡 Imóveis
            </button>
          </div>
        </div>

        <!-- Pré-visualização da Tabela de Dados (Primeiras 5 linhas) -->
        <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table class="w-full text-left text-xs font-medium font-mono">
            <thead class="bg-slate-50 dark:bg-slate-800/80 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                ${loadedDataset.columns.map(c => `<th class="py-2.5 px-3 font-sans">${c}</th>`).join("")}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              ${loadedDataset.data.slice(0, 5).map(row => `
                <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  ${loadedDataset.columns.map(c => `<td class="py-2 px-3">${row[c]}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pipeline de Treinamento Rápido -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 class="text-lg font-black text-slate-900 dark:text-white">Pipeline de Modelagem Guiada</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Coluna X (Feature) -->
          <div class="space-y-1">
            <label for="select-feature-x" class="text-xs font-bold text-slate-600 dark:text-slate-400">Atributo Preditor (Eixo X):</label>
            <select id="select-feature-x" class="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
              ${numericCols.map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
          </div>

          <!-- Coluna Y (Target) -->
          <div class="space-y-1">
            <label for="select-feature-y" class="text-xs font-bold text-slate-600 dark:text-slate-400">Variável Alvo a Prever (Eixo Y):</label>
            <select id="select-feature-y" class="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
              ${numericCols.map((c, idx) => `<option value="${c}" ${idx === 1 || idx === numericCols.length - 1 ? 'selected' : ''}>${c}</option>`).join("")}
            </select>
          </div>
        </div>

        <button id="btn-fit-mylab" class="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/20 active:scale-95 transition-all">
          Ajustar Modelo de Regressão nos Dados Carregados
        </button>

        ${modelResult ? `
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Desempenho do Modelo Ajustado:</h4>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                R² = ${modelResult.r2}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 font-sans uppercase font-bold">R² (Ajuste)</span>
                <p class="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">${modelResult.r2}</p>
              </div>
              <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 font-sans uppercase font-bold">MSE</span>
                <p class="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">${modelResult.mse}</p>
              </div>
              <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 font-sans uppercase font-bold">MAE</span>
                <p class="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">${modelResult.mae}</p>
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;

    // Listeners
    container.querySelector("#csv-file-input")?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const parsed = parseCSV(evt.target.result);
        if (parsed) {
          loadedDataset = {
            name: file.name,
            columns: parsed.columns,
            data: parsed.data
          };
          modelResult = null;
          render();
        } else {
          alert("Não foi possível processar o arquivo CSV. Verifique o cabeçalho e os dados.");
        }
      };
      reader.readAsText(file);
    });

    container.querySelector("#load-sample-iris")?.addEventListener("click", () => {
      loadedDataset = {
        name: "Iris Flowers",
        columns: SAMPLE_DATASETS.iris.columns,
        data: SAMPLE_DATASETS.iris.data
      };
      modelResult = null;
      render();
    });

    container.querySelector("#load-sample-housing")?.addEventListener("click", () => {
      loadedDataset = {
        name: "Preço de Imóveis",
        columns: SAMPLE_DATASETS.housing.columns,
        data: SAMPLE_DATASETS.housing.data
      };
      modelResult = null;
      render();
    });

    container.querySelector("#btn-fit-mylab")?.addEventListener("click", () => {
      const colX = container.querySelector("#select-feature-x").value;
      const colY = container.querySelector("#select-feature-y").value;
      const points = loadedDataset.data
        .map(d => ({ x: Number(d[colX]), y: Number(d[colY]) }))
        .filter(p => !isNaN(p.x) && !isNaN(p.y));

      if (points.length < 2) {
        alert("Selecione duas colunas numéricas com dados válidos.");
        return;
      }

      modelResult = fitPolynomialRegression(points, 1);
      render();
    });
  }

  render();
  return container;
}
