// Componente minimalista de Sumário Lateral Interativo (On-Page Sticky TOC Transparente)

export function renderChapterToc(sections, contentContainer) {
  const nav = document.createElement("nav");
  // Design limpo: fundo transparente, sem ícone de hambúrguer, fixo/sticky durante a rolagem
  nav.className = "w-56 shrink-0 text-xs select-none";

  nav.innerHTML = `
    <div class="space-y-3">
      <div class="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[11px] pb-1">
        Neste Capítulo
      </div>
      <ul class="border-l border-slate-200 dark:border-slate-800 space-y-1 text-slate-500 dark:text-slate-400">
        ${sections.map((sec, idx) => `
          <li>
            <a href="#${sec.id}" 
               data-toc-id="${sec.id}" 
               class="toc-link block py-1.5 pl-3 transition-colors hover:text-slate-900 dark:hover:text-white truncate ${sec.level === 3 ? 'pl-5 text-[11px]' : 'font-medium'} border-l-2 border-transparent -ml-[1px]">
              <span class="text-slate-400 dark:text-slate-500 mr-1 text-[10px] font-mono">${idx + 1}.</span>
              <span>${sec.title}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </div>
  `;

  // Listener para rolagem suave ao clicar
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
        link.classList.remove("text-slate-500", "dark:text-slate-400", "border-transparent");
        link.classList.add("text-slate-900", "dark:text-white", "font-bold", "border-slate-900", "dark:border-white");
      } else {
        link.classList.remove("text-slate-900", "dark:text-white", "font-bold", "border-slate-900", "dark:border-white");
        link.classList.add("text-slate-500", "dark:text-slate-400", "border-transparent");
      }
    });
  }

  // ScrollSpy via IntersectionObserver
  if (contentContainer && typeof IntersectionObserver !== "undefined") {
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
