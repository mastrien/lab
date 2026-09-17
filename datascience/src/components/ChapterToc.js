// Componente minimalista de Sumário Lateral Interativo (On-Page Sticky TOC)

import { Icons } from "./Icons.js";

export function renderChapterToc(sections, contentContainer) {
  const nav = document.createElement("nav");
  nav.className = "w-60 shrink-0 hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-3 pr-2 text-xs";

  nav.innerHTML = `
    <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div class="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
        <span class="text-slate-500">${Icons.list ? Icons.list("w-3.5 h-3.5") : Icons.layers("w-3.5 h-3.5")}</span>
        <span>Neste Capítulo</span>
      </div>
      <ul class="space-y-1.5 text-slate-500 dark:text-slate-400">
        ${sections.map((sec, idx) => `
          <li>
            <a href="#${sec.id}" data-toc-id="${sec.id}" class="toc-link block py-1 px-2 rounded-md transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 truncate ${sec.level === 3 ? 'pl-4 text-[11px]' : 'font-medium'}">
              <span class="text-slate-400 dark:text-slate-500 mr-1 text-[10px] font-mono">${idx + 1}.</span>
              <span>${sec.title}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </div>
  `;

  // Listener para scroll suave ao clicar
  nav.querySelectorAll(".toc-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-toc-id");
      const targetEl = contentContainer ? contentContainer.querySelector(`#${targetId}`) : document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${targetId}`);
        setActiveToc(targetId);
      }
    });
  });

  function setActiveToc(activeId) {
    nav.querySelectorAll(".toc-link").forEach(link => {
      const id = link.getAttribute("data-toc-id");
      if (id === activeId) {
        link.className = link.className
          .replace("text-slate-500 dark:text-slate-400", "")
          .replace("hover:bg-slate-50 dark:hover:bg-slate-800/60", "");
        link.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-bold");
      } else {
        link.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-bold");
        link.classList.add("text-slate-500", "dark:text-slate-400");
      }
    });
  }

  // ScrollSpy via IntersectionObserver
  if (contentContainer) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        setActiveToc(visible[0].target.id);
      }
    }, {
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0
    });

    sections.forEach(sec => {
      const targetEl = contentContainer.querySelector(`#${sec.id}`);
      if (targetEl) observer.observe(targetEl);
    });
  }

  return nav;
}
