// Rodapé padronizado consistente com o ecossistema do laboratório

export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center";
  footer.innerHTML = `
    <div class="flex flex-col items-center justify-center space-y-4 max-w-5xl mx-auto px-4 pb-8">
      <a href="../" class="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 border border-slate-200 dark:border-slate-700 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar ao Menu do Laboratório</span>
      </a>
      <p class="text-xs text-slate-500 dark:text-slate-500 font-medium">
        &copy; 2026 mastrien. Built in Termux.
      </p>
    </div>
  `;
  return footer;
}
