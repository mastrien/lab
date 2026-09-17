// Visualizador do Painel Curricular de Rastreamento (TRACKING.md) na SPA

import { CURRICULUM_AXES } from "../../data/curriculum.js";
import { LAB_REGISTRY } from "../../labs/registry.js";
import { Icons } from "../../components/Icons.js";

export function renderTrackingView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  let totalChapters = 0;
  let activeLabsCount = LAB_REGISTRY.length;
  let pilotChaptersCount = 0;

  CURRICULUM_AXES.forEach(axis => {
    totalChapters += axis.chapters.length;
    axis.chapters.forEach(c => {
      if (c.status === "pilot") pilotChaptersCount++;
    });
  });

  container.innerHTML = `
    <!-- Cabeçalho -->
    <div class="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Rastreamento do Currículo Canônico</span>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Painel de Monitoramento dos 10 Eixos
          </h1>
        </div>

        <a href="https://github.com/mastrien/lab/blob/main/datascience/TRACKING.md" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 shrink-0">
          <span>Ver TRACKING.md no GitHub</span>
          ${Icons.arrowRight("w-3.5 h-3.5")}
        </a>
      </div>

      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
        Acompanhe o estado de redação didática e a disponibilidade de bancadas experimentais para cada um dos capítulos fundamentados nas diretrizes ISO/IEC, NIST e ACM/IEEE.
      </p>

      <!-- Métricas Rápidas -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span class="text-[10px] uppercase font-bold text-slate-400 block font-mono">Grandes Eixos</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">${CURRICULUM_AXES.length}</span>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span class="text-[10px] uppercase font-bold text-slate-400 block font-mono">Capítulos Mapeados</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">${totalChapters}</span>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span class="text-[10px] uppercase font-bold text-slate-400 block font-mono">Labs Funcionais</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">${activeLabsCount}</span>
        </div>
        <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span class="text-[10px] uppercase font-bold text-slate-400 block font-mono">Capítulos Piloto</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">${pilotChaptersCount}</span>
        </div>
      </div>
    </div>

    <!-- Lista dos 10 Eixos e seus Capítulos -->
    <div class="space-y-6">
      ${CURRICULUM_AXES.map(axis => {
        return `
          <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span class="text-[10px] font-mono font-bold text-slate-400 uppercase">Eixo ${axis.number}</span>
                <h2 class="text-sm font-bold text-slate-900 dark:text-white tracking-tight">${axis.title}</h2>
              </div>
              <a href="#axis/${axis.id}" class="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Ver Eixo &rarr;
              </a>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              ${axis.chapters.map(chap => {
                const lab = chap.labId ? LAB_REGISTRY.find(l => l.id === chap.labId) : null;
                const isPilot = chap.status === "pilot";

                return `
                  <div class="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white truncate">Cap. ${chap.number}: ${chap.title}</span>
                        ${isPilot ? `
                          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                            Piloto Benchmark
                          </span>
                        ` : ''}
                      </div>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">${chap.shortDesc}</p>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                      ${lab ? `
                        <a href="#labs/${lab.id}" class="px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1">
                          ${Icons.cpu("w-3 h-3")}
                          <span>Simulador</span>
                        </a>
                      ` : ''}

                      <a href="#chapter/${chap.id}" class="px-3 py-1 rounded ${isPilot ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'} font-semibold text-[11px] hover:opacity-90 transition-opacity">
                        ${isPilot ? 'Ler Capítulo' : 'Detalhes'}
                      </a>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  return container;
}
