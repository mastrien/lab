// Módulo de Visão Detalhada de um Eixo Canônico e seus Capítulos

import { getAxisById, CURRICULUM_AXES } from "../../data/curriculum.js";
import { getLabById } from "../../labs/registry.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderAxisDetailView(axisId) {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-6xl mx-auto";

  const axis = getAxisById(axisId);

  if (!axis) {
    container.innerHTML = `
      <div class="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
        <h2 class="text-base font-bold text-slate-900 dark:text-white">Eixo não encontrado</h2>
        <a href="#overview" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline">
          ${Icons.arrowLeft("w-3.5 h-3.5")}
          <span>Voltar para o Início</span>
        </a>
      </div>
    `;
    return container;
  }

  const iconSvg = Icons[axis.iconKey] ? Icons[axis.iconKey]("w-6 h-6") : Icons.fileText("w-6 h-6");

  container.innerHTML = `
    <!-- Barra de Dataset Ativo -->
    <div id="axis-dataset-bar-slot"></div>

    <!-- Cabeçalho do Eixo -->
    <div class="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center border border-slate-200 dark:border-slate-700">
            ${iconSvg}
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Eixo Canônico ${axis.number}</span>
            <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">${axis.title}</h1>
          </div>
        </div>

        <a href="#overview" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
          ${Icons.arrowLeft("w-3.5 h-3.5")}
          <span>Todos os Eixos</span>
        </a>
      </div>

      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
        ${axis.shortDesc}
      </p>
    </div>

    <!-- Lista de Capítulos do Eixo -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-bold text-slate-900 dark:text-white">Capítulos do Eixo</h2>
        <span class="text-xs font-mono text-slate-400">${axis.chapters.length} Capítulos</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${axis.chapters.map(chap => {
          const hasLab = chap.hasLab && chap.labId;
          const lab = hasLab ? getLabById(chap.labId) : null;
          const isPilot = chap.status === "pilot";

          return `
            <div class="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] font-mono font-bold uppercase text-slate-400">Capítulo ${chap.number}</span>
                  ${isPilot ? `
                    <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                      Piloto Benchmark
                    </span>
                  ` : hasLab ? `
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Lab Interativo
                    </span>
                  ` : `
                    <span class="text-[9px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/40 text-slate-400 border border-slate-200 dark:border-slate-800">
                      Estruturado
                    </span>
                  `}
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1.5">${chap.title}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${chap.shortDesc}</p>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <a href="#chapter/${chap.id}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-semibold transition-colors">
                  ${Icons.bookOpen("w-3.5 h-3.5")}
                  <span>Ler Capítulo</span>
                </a>

                ${hasLab ? `
                  <a href="#labs/${chap.labId}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors">
                    ${Icons.play("w-3 h-3")}
                    <span>Abrir Lab</span>
                  </a>
                ` : ''}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  const barSlot = container.querySelector("#axis-dataset-bar-slot");
  if (barSlot) barSlot.appendChild(renderActiveDatasetBar());

  return container;
}
