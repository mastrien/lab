// Modal explicativo aberto ao clicar em qualquer placeholder de ramificação futura

import { Icons } from "./Icons.js";

export function renderPlaceholderModal(branch, onClose) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn";
  modalContainer.id = "placeholder-modal";

  const iconSvg = Icons[branch.iconKey] ? Icons[branch.iconKey]("w-6 h-6") : Icons.fileText("w-6 h-6");

  modalContainer.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-xl relative animate-scaleUp">
      <!-- Botão Fechar -->
      <button id="close-modal-x" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors" aria-label="Fechar">
        ${Icons.x("w-5 h-5")}
      </button>

      <!-- Cabeçalho do Modal -->
      <div class="flex items-center gap-3.5 mb-4">
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
          ${iconSvg}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">${branch.name}</h3>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              ${branch.badge || "Planejado"}
            </span>
          </div>
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">${branch.category}</p>
        </div>
      </div>

      <!-- Importância -->
      <div class="mb-4 space-y-2">
        <p class="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
          ${branch.details?.importance || branch.shortDesc}
        </p>
      </div>

      <!-- Tópicos Previstos -->
      ${branch.details?.topics ? `
        <div class="mb-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5">
          <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            ${Icons.bookOpen("w-3.5 h-3.5 text-slate-500")}
            <span>Ementa Prevista</span>
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            ${branch.details.topics.map(t => `<li class="flex items-start gap-2"><span class="text-slate-400 font-bold">•</span><span>${t}</span></li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <!-- Aviso Objetivo de Desenvolvimento -->
      <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 flex items-start gap-2.5 mb-5">
        <span class="text-slate-500 shrink-0 mt-0.5">${Icons.info("w-4 h-4")}</span>
        <div class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Este módulo está em planejamento para expansão futura do laboratório. Novos experimentos práticos serão disponibilizados conforme a evolução da plataforma.
        </div>
      </div>

      <!-- Botão de Ação -->
      <div class="flex justify-end">
        <button id="close-modal-btn" class="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-semibold text-xs transition-colors">
          Fechar
        </button>
      </div>
    </div>
  `;

  // Fechar ao clicar no X, no botão de fechar ou fora do modal
  const closeModal = () => {
    modalContainer.remove();
    if (onClose) onClose();
  };

  modalContainer.querySelector("#close-modal-x")?.addEventListener("click", closeModal);
  modalContainer.querySelector("#close-modal-btn")?.addEventListener("click", closeModal);
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) closeModal();
  });

  document.body.appendChild(modalContainer);
}
