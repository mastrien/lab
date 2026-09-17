// Ponto de entrada principal da SPA do DataLab (Roteamento Modular por 10 Eixos & Hub de Labs)

import { initTheme } from "./theme.js";
import { renderHeader } from "./components/Header.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderFooter } from "./components/Footer.js";

import { renderOverviewView } from "./modules/overview/OverviewView.js";
import { renderLabsCatalogView } from "./modules/labs/LabsCatalogView.js";
import { renderAxisDetailView } from "./modules/axis/AxisDetailView.js";
import { renderChapterView } from "./modules/chapter/ChapterView.js";
import { renderMyLabView } from "./modules/mylab/MyLabView.js";
import { renderQuizzesView } from "./modules/quizzes/QuizzesView.js";

// Módulos legados (para compatibilidade transparente com rotas antigas)
import { renderKddView } from "./modules/kdd/KddView.js";
import { renderEdaView } from "./modules/eda/EdaView.js";
import { renderPreprocessingView } from "./modules/preprocessing/PreprocessingView.js";
import { renderSupervisedView } from "./modules/supervised/SupervisedView.js";
import { renderUnsupervisedView } from "./modules/unsupervised/UnsupervisedView.js";
import { renderEvaluationView } from "./modules/evaluation/EvaluationView.js";

// Estado da Aplicação
let currentRoute = "overview";
let isMobileSidebarOpen = false;

// Inicialização
function init() {
  initTheme();

  // Ler hash da URL
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    currentRoute = hash;
  }

  renderApp();

  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash.replace("#", "");
    if (newHash && newHash !== currentRoute) {
      currentRoute = newHash;
      renderApp();
    }
  });
}

function navigateTo(route) {
  currentRoute = route;
  window.location.hash = route;
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderApp();
}

function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;
  appRoot.innerHTML = "";

  // 1. Cabeçalho
  const header = renderHeader(
    (route) => navigateTo(route),
    () => {
      isMobileSidebarOpen = !isMobileSidebarOpen;
      renderApp();
    }
  );
  appRoot.appendChild(header);

  // 2. Container Principal (Sidebar + Área de Conteúdo)
  const mainContainer = document.createElement("div");
  mainContainer.className = "flex max-w-7xl mx-auto w-full";

  // Sidebar Desktop
  const sidebarWrapper = document.createElement("div");
  sidebarWrapper.className = "hidden lg:block";
  const sidebar = renderSidebar(currentRoute, (route) => navigateTo(route));
  sidebarWrapper.appendChild(sidebar);
  mainContainer.appendChild(sidebarWrapper);

  // Drawer Mobile (se aberto)
  if (isMobileSidebarOpen) {
    const mobileOverlay = document.createElement("div");
    mobileOverlay.className = "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex";
    mobileOverlay.innerHTML = `<div id="mobile-sidebar-container" class="w-72 bg-white dark:bg-slate-900 h-full shadow-2xl"></div>`;
    const mobileSidebar = renderSidebar(currentRoute, (route) => {
      navigateTo(route);
      isMobileSidebarOpen = false;
    }, () => {
      isMobileSidebarOpen = false;
      renderApp();
    });
    mobileOverlay.querySelector("#mobile-sidebar-container").appendChild(mobileSidebar);
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) {
        isMobileSidebarOpen = false;
        renderApp();
      }
    });
    appRoot.appendChild(mobileOverlay);
  }

  // Área de Conteúdo
  const contentArea = document.createElement("main");
  contentArea.className = "flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-12";

  // Resolução de Rotas
  let view = null;

  if (currentRoute.startsWith("labs")) {
    // Rota do Hub de Labs: #labs ou #labs/:labId
    const parts = currentRoute.split("/");
    const labId = parts[1] || null;
    view = renderLabsCatalogView(labId);
  } else if (currentRoute.startsWith("axis/")) {
    // Rota de Eixo: #axis/:axisId
    const axisId = currentRoute.replace("axis/", "");
    view = renderAxisDetailView(axisId);
  } else if (currentRoute.startsWith("chapter/")) {
    // Rota de Capítulo: #chapter/:chapterId
    const chapterId = currentRoute.replace("chapter/", "");
    view = renderChapterView(chapterId);
  } else if (currentRoute === "mylab") {
    view = renderMyLabView();
  } else if (currentRoute === "quizzes") {
    view = renderQuizzesView();
  } else if (currentRoute === "kdd") {
    view = renderKddView();
  } else if (currentRoute === "eda") {
    view = renderEdaView();
  } else if (currentRoute === "preprocessing") {
    view = renderPreprocessingView();
  } else if (currentRoute === "supervised") {
    view = renderSupervisedView();
  } else if (currentRoute === "unsupervised") {
    view = renderUnsupervisedView();
  } else if (currentRoute === "evaluation") {
    view = renderEvaluationView();
  } else {
    // Rota padrão: Home / Visão Geral
    view = renderOverviewView((route) => navigateTo(route));
  }

  contentArea.appendChild(view);

  // Rodapé Padronizado
  const footer = renderFooter();
  contentArea.appendChild(footer);

  mainContainer.appendChild(contentArea);
  appRoot.appendChild(mainContainer);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
