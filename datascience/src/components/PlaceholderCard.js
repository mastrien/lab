// Card interativo para catálogo de ramificações futuras (Placeholders com feedback amigável)

import { renderPlaceholderModal } from "./PlaceholderModal.js";

export function createPlaceholderCard(branch) {
  const card = document.createElement("div");
  card.className = "group relative p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between cursor-pointer";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  card.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          ${branch.icon}
        </div>
        <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-900/50">
          ${branch.badge || "Em Breve"}
        </span>
      </div>

      <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        ${branch.category}
      </p>
      <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
        ${branch.name}
      </h3>
      <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4">
        ${branch.shortDesc}
      </p>
    </div>

    <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-500 dark:text-indigo-400">
      <span>Ver Ementa & Previsão</span>
      <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </div>
  `;

  const handleClick = () => {
    renderPlaceholderModal(branch);
  };

  card.addEventListener("click", handleClick);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  });

  return card;
}
