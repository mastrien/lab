// Modal explicativo amigável aberto ao clicar em qualquer placeholder de ramificação futura

export function renderPlaceholderModal(branch, onClose) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn";
  modalContainer.id = "placeholder-modal";

  modalContainer.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative transform transition-all animate-scaleUp">
      <!-- Botão Fechar -->
      <button id="close-modal-x" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl transition-colors" aria-label="Fechar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Cabeçalho do Modal -->
      <div class="flex items-center gap-4 mb-5">
        <div class="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center text-3xl shadow-sm">
          ${branch.icon || "🔮"}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">${branch.name}</h3>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              ${branch.badge || "Em Breve"}
            </span>
          </div>
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">${branch.category}</p>
        </div>
      </div>

      <!-- Tagline & Importância -->
      <div class="mb-5 space-y-3">
        <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400 italic">
          "${branch.details?.tagline || branch.shortDesc}"
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          ${branch.details?.importance || branch.shortDesc}
        </p>
      </div>

      <!-- Tópicos Previstos -->
      ${branch.details?.topics ? `
        <div class="mb-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Ementa & Tópicos Previstos
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            ${branch.details.topics.map(t => `<li class="flex items-start gap-2"><span class="text-indigo-500 font-bold">•</span><span>${t}</span></li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <!-- Mensagem Amigável de Em Desenvolvimento -->
      <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4 flex items-start gap-3 mb-6">
        <span class="text-2xl">🚧</span>
        <div>
          <h5 class="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">Em Desenvolvimento Ativo</h5>
          <p class="text-xs text-amber-800 dark:text-amber-400 mt-0.5 leading-relaxed">
            Este módulo ainda está sendo construído pela equipe do laboratório e ficará <strong>disponível em breve</strong> com simulações visuais e exercícios práticos. Fique atento às próximas atualizações!
          </p>
        </div>
      </div>

      <!-- Botão de Ação -->
      <div class="flex justify-end">
        <button id="close-modal-btn" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95">
          Entendido, aguardarei!
        </button>
      </div>
    </div>
  `;

  // Fechar ao clicar no X, no botão de fechar ou fora do modal
  const closeModal = () => {
    modalContainer.classList.add("animate-fadeOut");
    setTimeout(() => {
      modalContainer.remove();
      if (onClose) onClose();
    }, 200);
  };

  modalContainer.querySelector("#close-modal-x").addEventListener("click", closeModal);
  modalContainer.querySelector("#close-modal-btn").addEventListener("click", closeModal);
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) closeModal();
  });

  document.body.appendChild(modalContainer);
}
