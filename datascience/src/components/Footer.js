// Rodapé padronizado consistente com o ecossistema do laboratório

export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center";
  footer.innerHTML = `
    <div class="flex flex-col items-center justify-center max-w-5xl mx-auto px-4 pb-8">
      <p class="text-xs text-slate-500 dark:text-slate-500 font-medium">
        &copy; 2026 mastrien. Built in Termux.
      </p>
    </div>
  `;
  return footer;
}
