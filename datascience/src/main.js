// Ponto de entrada principal da SPA do DataLab

import { initTheme } from "./theme.js";
import { renderHeader } from "./components/Header.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderFooter } from "./components/Footer.js";

import { renderOverviewView } from "./modules/overview/OverviewView.js";
import { renderKddView } from "./modules/kdd/KddView.js";
import { renderEdaView } from "./modules/eda/EdaView.js";
import { renderPreprocessingView } from "./modules/preprocessing/PreprocessingView.js";
import { renderSupervisedView } from "./modules/supervised/SupervisedView.js";
import { renderUnsupervisedView } from "./modules/unsupervised/UnsupervisedView.js";
import { renderEvaluationView } from "./modules/evaluation/EvaluationView.js";
import { renderMyLabView } from "./modules/mylab/MyLabView.js";
import { renderQuizzesView } from "./modules/quizzes/QuizzesView.js";

// Estado da Aplicação
let currentModule = "overview";
let isMobileSidebarOpen = false;

// Inicialização
function init() {
  initTheme();

  // Ler hash da URL se houver (ex.: #kdd, #eda)
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    currentModule = hash;
  }

  renderApp();

  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash.replace("#", "");
    if (newHash && newHash !== currentModule) {
      currentModule = newHash;
      renderApp();
    }
  });
}

function navigateTo(moduleId) {
  currentModule = moduleId;
  window.location.hash = moduleId;
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderApp();
}

function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;
  appRoot.innerHTML = "";

  // 1. Cabeçalho
  const header = renderHeader(
    (mod) => navigateTo(mod),
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
  const sidebar = renderSidebar(currentModule, (mod) => navigateTo(mod));
  sidebarWrapper.appendChild(sidebar);
  mainContainer.appendChild(sidebarWrapper);

  // Drawer Mobile (se aberto)
  if (isMobileSidebarOpen) {
    const mobileOverlay = document.createElement("div");
    mobileOverlay.className = "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex";
    mobileOverlay.innerHTML = `<div id="mobile-sidebar-container" class="w-72 bg-white dark:bg-slate-900 h-full shadow-2xl"></div>`;
    const mobileSidebar = renderSidebar(currentModule, (mod) => {
      navigateTo(mod);
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

  // Área de Conteúdo do Módulo
  const contentArea = document.createElement("main");
  contentArea.className = "flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-12";

  // Renderizar a View correspondente ao módulo ativo
  let moduleView = null;
  switch (currentModule) {
    case "kdd":
      moduleView = renderKddView();
      break;
    case "eda":
      moduleView = renderEdaView();
      break;
    case "preprocessing":
      moduleView = renderPreprocessingView();
      break;
    case "supervised":
      moduleView = renderSupervisedView();
      break;
    case "unsupervised":
      moduleView = renderUnsupervisedView();
      break;
    case "evaluation":
      moduleView = renderEvaluationView();
      break;
    case "mylab":
      moduleView = renderMyLabView();
      break;
    case "quizzes":
      moduleView = renderQuizzesView();
      break;
    case "overview":
    default:
      moduleView = renderOverviewView((mod) => navigateTo(mod));
      break;
  }

  contentArea.appendChild(moduleView);

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
