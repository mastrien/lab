// Módulo Visão Geral / Home do DataLab estruturado nos 10 Eixos Canônicos

import { CURRICULUM_AXES } from "../../data/curriculum.js";
import { LAB_REGISTRY } from "../../labs/registry.js";
import { renderActiveDatasetBar } from "../../components/ActiveDatasetBar.js";
import { Icons } from "../../components/Icons.js";

export function renderOverviewView(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-6xl mx-auto";

  function render() {
    container.innerHTML = "";

    // 1. Barra de Dataset Ativo
    const datasetBar = renderActiveDatasetBar(() => render());
    container.appendChild(datasetBar);

    // 2. Banner de Apresentação Epistemológica
    const headerSection = document.createElement("div");
    headerSection.className = "p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3";
    headerSection.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Estrutura Curricular Canônica em 10 Eixos</span>
      </div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        DataLab: Laboratório e Currículo em Ciência de Dados
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
        Ambiente didático e experimental estruturado em 10 grandes eixos fundamentados na pesquisa de padrões internacionais (ISO/IEC, NIST e ACM/IEEE). Explore capítulos com rigor matemático em LaTeX, contexto histórico dos métodos, aplicações reais e bancadas experimentais interativas 100% no navegador.
      </p>

      <div class="flex flex-wrap gap-2.5 pt-2">
        <a href="#labs" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold shadow-xs">
          ${Icons.cpu("w-4 h-4")}
          <span>Explorar Hub de Laboratórios</span>
        </a>

        <a href="#chapter/axis-1-cap-3-clt" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          ${Icons.bookOpen("w-4 h-4")}
          <span>Capítulo Piloto: Teorema Central do Limite</span>
        </a>
      </div>
    `;
    container.appendChild(headerSection);

    // 3. Grade dos 10 Grandes Eixos Canônicos
    const axesSection = document.createElement("div");
    axesSection.className = "space-y-4";
    axesSection.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Os 10 Grandes Eixos de Conteúdo</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Selecione um eixo para acessar seus capítulos e laboratórios integrados:</p>
        </div>
        <span class="text-xs font-mono text-slate-400 font-semibold">${CURRICULUM_AXES.length} Eixos Mapeados</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="curriculum-axes-grid">
        ${CURRICULUM_AXES.map(axis => {
          const iconSvg = Icons[axis.iconKey] ? Icons[axis.iconKey]("w-5 h-5") : Icons.fileText("w-5 h-5");
          const labsInAxis = LAB_REGISTRY.filter(l => l.axisId === axis.id);
          const hasPilot = axis.chapters.some(c => c.status === "pilot");

          return `
            <a href="#axis/${axis.id}" class="axis-card p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    ${iconSvg}
                  </div>
                  <div class="flex items-center gap-1.5">
                    ${hasPilot ? `
                      <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        Capítulo Piloto
                      </span>
                    ` : labsInAxis.length > 0 ? `
                      <span class="text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                        ${labsInAxis.length} lab(s)
                      </span>
                    ` : `
                      <span class="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/40 text-slate-400 border border-slate-200 dark:border-slate-800">
                        Estruturado
                      </span>
                    `}
                  </div>
                </div>

                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Eixo ${axis.number}</p>
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 tracking-tight">${axis.title}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${axis.tagline}</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">${axis.shortDesc}</p>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span class="text-[11px] text-slate-400 font-normal">${axis.chapters.length} Capítulos</span>
                <span class="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explorar</span>
                  ${Icons.arrowRight("w-3.5 h-3.5")}
                </span>
              </div>
            </a>
          `;
        }).join("")}
      </div>
    `;
    container.appendChild(axesSection);

    // 4. Seção Destacada do Hub de Laboratórios Práticos (logo abaixo dos eixos)
    const labsShortcutSection = document.createElement("div");
    labsShortcutSection.className = "p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4";
    labsShortcutSection.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-slate-700 dark:text-slate-300">${Icons.cpu("w-4 h-4")}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Bancadas Experimentais Modulares</span>
          </div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Hub de Laboratórios Práticos Interativos
          </h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Acesse diretamente todos os simuladores de algoritmos da plataforma. Experimente com as bases de dados canônicas ou carregue arquivos CSV customizados que permanecem persistidos no seu navegador.
          </p>
        </div>

        <a href="#labs" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold shrink-0 transition-colors shadow-sm">
          <span>Acessar Todos os Laboratórios</span>
          ${Icons.arrowRight("w-3.5 h-3.5")}
        </a>
      </div>

      <!-- Preview de Laboratórios Ativos no Hub -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <a href="#labs/clt-lab" class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors block">
          <span class="text-[10px] uppercase font-mono text-slate-400 font-bold block">Eixo 1</span>
          <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">Teorema Central do Limite</span>
          <span class="text-[10px] text-slate-500 mt-1 block">Convergência Gaussiana</span>
        </a>

        <a href="#labs/apriori-lab" class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors block">
          <span class="text-[10px] uppercase font-mono text-slate-400 font-bold block">Eixo 5</span>
          <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">Regras Apriori</span>
          <span class="text-[10px] text-slate-500 mt-1 block">Suporte, Confiança & Lift</span>
        </a>

        <a href="#labs/kmeans-lab" class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors block">
          <span class="text-[10px] uppercase font-mono text-slate-400 font-bold block">Eixo 6</span>
          <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">Clustering K-Means</span>
          <span class="text-[10px] text-slate-500 mt-1 block">Convergência & Cotovelo</span>
        </a>

        <a href="#labs/confusion-roc-lab" class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors block">
          <span class="text-[10px] uppercase font-mono text-slate-400 font-bold block">Eixo 8</span>
          <span class="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">Matriz & Curva ROC</span>
          <span class="text-[10px] text-slate-500 mt-1 block">Threshold Dinâmico</span>
        </a>
      </div>
    `;
    container.appendChild(labsShortcutSection);
  }

  render();
  return container;
}
