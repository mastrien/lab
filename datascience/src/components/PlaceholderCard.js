// Card para catálogo de ramificações futuras (com ícones vetoriais e estilo sóbrio)

import { renderPlaceholderModal } from "./PlaceholderModal.js";
import { Icons } from "./Icons.js";

export function createPlaceholderCard(branch) {
  const card = document.createElement("div");
  card.className = "group relative p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between cursor-pointer";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  const iconSvg = Icons[branch.iconKey] ? Icons[branch.iconKey]("w-5 h-5") : Icons.fileText("w-5 h-5");

  card.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-3">
        <div class="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
          ${iconSvg}
        </div>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          ${branch.badge || "Planejado"}
        </span>
      </div>

      <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
        ${branch.category}
      </p>
      <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1.5">
        ${branch.name}
      </h3>
      <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
        ${branch.shortDesc}
      </p>
    </div>

    <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
      <span>Consultar Ementa</span>
      <span class="transform group-hover:translate-x-1 transition-transform">${Icons.arrowRight("w-3.5 h-3.5")}</span>
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
