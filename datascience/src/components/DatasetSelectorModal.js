// Modal para gerenciamento e seleção de dataset ativo na plataforma

import { getAllDatasets, getActiveDataset, setActiveDataset, saveCustomDataset, deleteCustomDataset, parseCSVString } from "../data/datasetStore.js";
import { Icons } from "./Icons.js";

export function renderDatasetSelectorModal(onClose) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn";
  modalContainer.id = "dataset-selector-modal";

  function renderModalContent() {
    const allDatasets = getAllDatasets();
    const active = getActiveDataset();

    modalContainer.innerHTML = `
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-xl relative animate-scaleUp">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
          <div class="flex items-center gap-2.5">
            <span class="text-slate-700 dark:text-slate-300">${Icons.database("w-5 h-5")}</span>
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">Gerenciador de Datasets</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Selecione ou carregue uma base para usar em todos os laboratórios práticos.</p>
            </div>
          </div>
          <button id="close-dataset-modal-x" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Fechar">
            ${Icons.x("w-5 h-5")}
          </button>
        </div>

        <!-- Área de Upload de CSV -->
        <div class="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">Importar Novo Arquivo CSV</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">O arquivo será armazenado localmente no seu navegador.</p>
            </div>
            <label for="modal-csv-file-input" class="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold shadow-xs">
              ${Icons.upload("w-4 h-4")}
              <span>Selecionar CSV</span>
            </label>
            <input type="file" id="modal-csv-file-input" accept=".csv,text/csv" class="hidden">
          </div>
          <div id="upload-status" class="hidden mt-2 text-xs font-semibold"></div>
        </div>

        <!-- Lista de Datasets Disponíveis -->
        <div class="space-y-3 mb-6">
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Datasets Disponíveis</h4>
          <div class="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            ${allDatasets.map(d => {
              const isActive = d.id === active.id;
              const rowsCount = d.data ? d.data.length : (d.transactions ? d.transactions.length : 0);
              const colsCount = d.columns ? d.columns.length : 0;

              return `
                <div class="p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${isActive ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-500 dark:border-indigo-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}">
                  <div class="flex items-center gap-3 min-w-0">
                    <button data-select-id="${d.id}" class="select-dataset-btn flex items-center gap-2 text-left min-w-0 group">
                      <span class="${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}">${Icons.table("w-4 h-4")}</span>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <span class="text-xs font-bold truncate ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}">${d.name}</span>
                          ${d.isCustom ? `<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">Customizado</span>` : ''}
                          ${isActive ? `<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">Ativo</span>` : ''}
                        </div>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${rowsCount} registros • ${colsCount} atributos ${d.target ? `• Alvo: ${d.target}` : ''}</p>
                      </div>
                    </button>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    ${!isActive ? `
                      <button data-select-id="${d.id}" class="select-dataset-btn px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                        Ativar
                      </button>
                    ` : `
                      <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        ${Icons.check("w-4 h-4")}
                      </span>
                    `}
                    ${d.isCustom ? `
                      <button data-delete-id="${d.id}" class="delete-dataset-btn p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" title="Excluir dataset">
                        ${Icons.trash("w-4 h-4")}
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Rodapé do Modal -->
        <div class="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button id="close-dataset-modal-btn" class="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-xs font-semibold">
            Fechar
          </button>
        </div>
      </div>
    `;

    // Fechamento
    const closeModal = () => {
      modalContainer.remove();
      if (onClose) onClose();
    };

    modalContainer.querySelector("#close-dataset-modal-x")?.addEventListener("click", closeModal);
    modalContainer.querySelector("#close-dataset-modal-btn")?.addEventListener("click", closeModal);

    // Seleção de dataset
    modalContainer.querySelectorAll(".select-dataset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-select-id");
        if (id) {
          setActiveDataset(id);
          renderModalContent();
        }
      });
    });

    // Exclusão de dataset customizado
    modalContainer.querySelectorAll(".delete-dataset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-delete-id");
        if (id && confirm("Deseja remover este dataset customizado do navegador?")) {
          deleteCustomDataset(id);
          renderModalContent();
        }
      });
    });

    // Upload de novo arquivo CSV
    const fileInput = modalContainer.querySelector("#modal-csv-file-input");
    const statusDiv = modalContainer.querySelector("#upload-status");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = parseCSVString(evt.target.result, file.name);
            if (parsed && parsed.data.length > 0) {
              saveCustomDataset(parsed);
              renderModalContent();
            } else {
              if (statusDiv) {
                statusDiv.classList.remove("hidden");
                statusDiv.className = "mt-2 text-xs font-semibold text-rose-600";
                statusDiv.textContent = "Erro: formato de CSV inválido ou arquivo vazio.";
              }
            }
          } catch (err) {
            if (statusDiv) {
              statusDiv.classList.remove("hidden");
              statusDiv.className = "mt-2 text-xs font-semibold text-rose-600";
              statusDiv.textContent = "Erro ao processar arquivo: " + err.message;
            }
          }
        };
        reader.readAsText(file);
      });
    }
  }

  renderModalContent();
  document.body.appendChild(modalContainer);
}
