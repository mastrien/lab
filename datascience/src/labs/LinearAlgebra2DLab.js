// Bancada Experimental: Álgebra Linear 2D (Transformações, Produto Escalar e Projeções)
// Permite manipular matrizes 2x2 e vetores em tempo real com Canvas cartesiano responsivo

import { Icons } from "../components/Icons.js";

export function renderLinearAlgebra2DLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  // Estado do laboratório
  let activeTab = "transform"; // "transform" ou "dot_product"

  // Estado Modo 1: Transformação Linear (Matriz A = [[a, b], [c, d]])
  let matrix = { a: 1.5, b: 0.5, c: 0.5, d: 1.2 };

  // Estado Modo 2: Produto Escalar (Vetores u e v)
  let vectorU = { x: 3, y: 2 };
  let vectorV = { x: 4, y: 0 };

  container.innerHTML = `
    <!-- Cabeçalho do Laboratório -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">${Icons.target("w-4 h-4")}</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Bancada Experimental: Espaço Vetorial, Matrizes & Projeções 2D</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore visualmente como matrizes deformam o espaço euclidiano e como produtos escalares e projeções ortogonais operam geometricamente.
        </p>
      </div>

      <!-- Seletor de Modo (Abas) -->
      <div class="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 self-start sm:self-auto shrink-0">
        <button id="tab-transform-btn" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm">
          Transformação Linear T(x)
        </button>
        <button id="tab-dot-btn" class="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
          Produto Escalar & Projeção
        </button>
      </div>
    </div>

    <!-- Painel Principal de Controles e Visualização -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Coluna de Controles Interativos (4 colunas em telas grandes) -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Painel Modo 1: Transformações Lineares -->
        <div id="panel-transform-controls" class="space-y-4">
          <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Matriz de Transformação A</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">2 &times; 2</span>
            </div>

            <div class="grid grid-cols-2 gap-3 font-mono text-xs">
              <div class="space-y-1">
                <label class="block text-[11px] text-slate-500">a (eixo X &rarr; X)</label>
                <input type="number" id="input-mat-a" step="0.1" value="${matrix.a}" class="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500">
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] text-slate-500">b (eixo Y &rarr; X)</label>
                <input type="number" id="input-mat-b" step="0.1" value="${matrix.b}" class="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500">
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] text-slate-500">c (eixo X &rarr; Y)</label>
                <input type="number" id="input-mat-c" step="0.1" value="${matrix.c}" class="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500">
              </div>
              <div class="space-y-1">
                <label class="block text-[11px] text-slate-500">d (eixo Y &rarr; Y)</label>
                <input type="number" id="input-mat-d" step="0.1" value="${matrix.d}" class="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500">
              </div>
            </div>

            <!-- Presets Rápidos de Álgebra Linear -->
            <div class="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
              <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">Operadores Canônicos:</span>
              <div class="grid grid-cols-2 gap-1.5">
                <button type="button" data-preset="identity" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Identidade</button>
                <button type="button" data-preset="rot45" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Rotação 45&deg;</button>
                <button type="button" data-preset="rot90" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Rotação 90&deg;</button>
                <button type="button" data-preset="shear" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Cisalhamento</button>
                <button type="button" data-preset="scale2" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Escala 2&times;</button>
                <button type="button" data-preset="projection" class="preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Projeção (Singular)</button>
              </div>
            </div>
          </div>

          <!-- Métricas Matriciais -->
          <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Propriedades do Operador</span>
            
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Determinante det(A):</span>
                <span id="metric-det-val" class="font-mono font-bold text-slate-900 dark:text-white">1.55</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Fator de Área |det|:</span>
                <span id="metric-area-val" class="font-mono font-bold text-slate-900 dark:text-white">1.55&times;</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Orientação Espacial:</span>
                <span id="metric-orient-badge" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">Preservada</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Traço tr(A):</span>
                <span id="metric-trace-val" class="font-mono font-bold text-slate-900 dark:text-white">2.70</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Inversibilidade:</span>
                <span id="metric-invert-badge" class="font-mono text-[11px] text-slate-700 dark:text-slate-300">Inversível</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Painel Modo 2: Produto Escalar & Projeção -->
        <div id="panel-dot-controls" class="space-y-4 hidden">
          <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Vetores de Entrada</span>
            
            <!-- Vetor U -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-indigo-600 dark:text-indigo-400">Vetor u = (ux, uy)</span>
                <span id="label-u-coords" class="font-mono text-slate-500">(3.0, 2.0)</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <input type="number" id="input-u-x" step="0.5" value="${vectorU.x}" class="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white">
                <input type="number" id="input-u-y" step="0.5" value="${vectorU.y}" class="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white">
              </div>
            </div>

            <!-- Vetor V -->
            <div class="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-teal-600 dark:text-teal-400">Vetor v = (vx, vy)</span>
                <span id="label-v-coords" class="font-mono text-slate-500">(4.0, 0.0)</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <input type="number" id="input-v-x" step="0.5" value="${vectorV.x}" class="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white">
                <input type="number" id="input-v-y" step="0.5" value="${vectorV.y}" class="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white">
              </div>
            </div>

            <!-- Presets de Ângulo -->
            <div class="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
              <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">Configurações Geométricas:</span>
              <div class="grid grid-cols-2 gap-1.5">
                <button type="button" data-dot-preset="orthogonal" class="dot-preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Ortogonais (90&deg;)</button>
                <button type="button" data-dot-preset="parallel" class="dot-preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Colineares (0&deg;)</button>
                <button type="button" data-dot-preset="opposite" class="dot-preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Opostos (180&deg;)</button>
                <button type="button" data-dot-preset="acute" class="dot-preset-btn px-2 py-1 text-left rounded text-[11px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">Agudo (45&deg;)</button>
              </div>
            </div>
          </div>

          <!-- Métricas de Produto Escalar -->
          <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Métricas Vetoriais</span>
            
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Produto Escalar u &bull; v:</span>
                <span id="metric-dot-val" class="font-mono font-bold text-slate-900 dark:text-white">12.00</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Normas ||u|| e ||v||:</span>
                <span id="metric-norms-val" class="font-mono font-bold text-slate-900 dark:text-white">3.61 | 4.00</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Ângulo &theta;:</span>
                <span id="metric-angle-val" class="font-mono font-bold text-slate-900 dark:text-white">33.7&deg;</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Similaridade Cosseno:</span>
                <span id="metric-cos-val" class="font-mono font-bold text-indigo-600 dark:text-indigo-400">0.8320</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Projeção proj_v(u):</span>
                <span id="metric-proj-val" class="font-mono font-bold text-amber-600 dark:text-amber-400">(3.00, 0.00)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Coluna Visual: Canvas Cartesiano Interativo (8 colunas em telas grandes) -->
      <div class="lg:col-span-8 flex flex-col items-center justify-center">
        <div class="w-full relative rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-inner flex flex-col items-center justify-center p-2">
          <canvas id="la-canvas" width="600" height="460" class="w-full max-w-[640px] h-[360px] sm:h-[440px] block select-none cursor-crosshair"></canvas>

          <!-- Legenda Visual Flutuante inferior -->
          <div id="canvas-legend" class="w-full flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-[11px] text-slate-600 dark:text-slate-400">
            <!-- Legenda inserida dinamicamente -->
          </div>
        </div>
      </div>

    </div>
  `;

  // Elementos do DOM
  const canvas = container.querySelector("#la-canvas");
  const ctx = canvas.getContext("2d");

  const tabTransformBtn = container.querySelector("#tab-transform-btn");
  const tabDotBtn = container.querySelector("#tab-dot-btn");
  const panelTransform = container.querySelector("#panel-transform-controls");
  const panelDot = container.querySelector("#panel-dot-controls");
  const legendEl = container.querySelector("#canvas-legend");

  // Inputs Modo 1
  const inA = container.querySelector("#input-mat-a");
  const inB = container.querySelector("#input-mat-b");
  const inC = container.querySelector("#input-mat-c");
  const inD = container.querySelector("#input-mat-d");

  // Inputs Modo 2
  const inUx = container.querySelector("#input-u-x");
  const inUy = container.querySelector("#input-u-y");
  const inVx = container.querySelector("#input-v-x");
  const inVy = container.querySelector("#input-v-y");

  // Alternância de Abas
  function setTab(tab) {
    activeTab = tab;
    if (tab === "transform") {
      tabTransformBtn.className = "px-3 py-1.5 rounded-md text-xs font-semibold transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm";
      tabDotBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all";
      panelTransform.classList.remove("hidden");
      panelDot.classList.add("hidden");
    } else {
      tabDotBtn.className = "px-3 py-1.5 rounded-md text-xs font-semibold transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm";
      tabTransformBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all";
      panelDot.classList.remove("hidden");
      panelTransform.classList.add("hidden");
    }
    renderCanvas();
  }

  tabTransformBtn.addEventListener("click", () => setTab("transform"));
  tabDotBtn.addEventListener("click", () => setTab("dot_product"));

  // Eventos de Input Modo 1
  function updateMatrixFromInputs() {
    matrix.a = parseFloat(inA.value) || 0;
    matrix.b = parseFloat(inB.value) || 0;
    matrix.c = parseFloat(inC.value) || 0;
    matrix.d = parseFloat(inD.value) || 0;
    renderCanvas();
  }

  [inA, inB, inC, inD].forEach(inp => inp.addEventListener("input", updateMatrixFromInputs));

  // Presets Modo 1
  container.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.getAttribute("data-preset");
      if (p === "identity") {
        matrix = { a: 1, b: 0, c: 0, d: 1 };
      } else if (p === "rot45") {
        const rad = Math.PI / 4;
        matrix = { a: +Math.cos(rad).toFixed(2), b: +-Math.sin(rad).toFixed(2), c: +Math.sin(rad).toFixed(2), d: +Math.cos(rad).toFixed(2) };
      } else if (p === "rot90") {
        matrix = { a: 0, b: -1, c: 1, d: 0 };
      } else if (p === "shear") {
        matrix = { a: 1, b: 1, c: 0, d: 1 };
      } else if (p === "scale2") {
        matrix = { a: 2, b: 0, c: 0, d: 2 };
      } else if (p === "projection") {
        matrix = { a: 1, b: 0, c: 0, d: 0 };
      }
      inA.value = matrix.a;
      inB.value = matrix.b;
      inC.value = matrix.c;
      inD.value = matrix.d;
      renderCanvas();
    });
  });

  // Eventos de Input Modo 2
  function updateVectorsFromInputs() {
    vectorU.x = parseFloat(inUx.value) || 0;
    vectorU.y = parseFloat(inUy.value) || 0;
    vectorV.x = parseFloat(inVx.value) || 0;
    vectorV.y = parseFloat(inVy.value) || 0;
    renderCanvas();
  }

  [inUx, inUy, inVx, inVy].forEach(inp => inp.addEventListener("input", updateVectorsFromInputs));

  // Presets Modo 2
  container.querySelectorAll(".dot-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.getAttribute("data-dot-preset");
      if (p === "orthogonal") {
        vectorU = { x: 0, y: 3 };
        vectorV = { x: 4, y: 0 };
      } else if (p === "parallel") {
        vectorU = { x: 2, y: 2 };
        vectorV = { x: 4, y: 4 };
      } else if (p === "opposite") {
        vectorU = { x: -3, y: 0 };
        vectorV = { x: 3, y: 0 };
      } else if (p === "acute") {
        vectorU = { x: 3, y: 2 };
        vectorV = { x: 4, y: 0 };
      }
      inUx.value = vectorU.x;
      inUy.value = vectorU.y;
      inVx.value = vectorV.x;
      inVy.value = vectorV.y;
      renderCanvas();
    });
  });

  // Renderizador Gráfico no Canvas
  function renderCanvas() {
    const isDark = document.documentElement.classList.contains("dark");
    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 36; // 36 pixels por unidade matemática

    // Limpar fundo
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isDark ? "#020617" : "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    function toCanvasX(x) { return originX + x * scale; }
    function toCanvasY(y) { return originY - y * scale; }

    // 1. Grid cartesiano base
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)";
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }
    for (let y = -8; y <= 8; y++) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // 2. Eixos principais X e Y
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isDark ? "#64748b" : "#94a3b8";
    // Eixo X
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Rótulos de eixos
    ctx.font = "10px monospace";
    ctx.fillStyle = isDark ? "#64748b" : "#94a3b8";
    ctx.fillText("0", originX + 4, originY + 12);
    ctx.fillText("+X", width - 20, originY - 6);
    ctx.fillText("+Y", originX + 6, 14);

    if (activeTab === "transform") {
      renderTransformMode(ctx, originX, originY, scale, isDark, toCanvasX, toCanvasY, width, height);
    } else {
      renderDotProductMode(ctx, originX, originY, scale, isDark, toCanvasX, toCanvasY);
    }
  }

  function renderTransformMode(ctx, originX, originY, scale, isDark, toCanvasX, toCanvasY, width, height) {
    const { a, b, c, d } = matrix;
    const det = a * d - b * c;
    const trace = a + d;

    // Atualizar métricas no DOM
    container.querySelector("#metric-det-val").textContent = det.toFixed(3);
    container.querySelector("#metric-area-val").textContent = `${Math.abs(det).toFixed(2)}x`;
    container.querySelector("#metric-trace-val").textContent = trace.toFixed(2);

    const orientBadge = container.querySelector("#metric-orient-badge");
    if (Math.abs(det) < 0.0001) {
      orientBadge.textContent = "Colapso (Det = 0)";
      orientBadge.className = "px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400";
    } else if (det < 0) {
      orientBadge.textContent = "Invertida (Espelhada)";
      orientBadge.className = "px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400";
    } else {
      orientBadge.textContent = "Preservada";
      orientBadge.className = "px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400";
    }

    const invertBadge = container.querySelector("#metric-invert-badge");
    invertBadge.textContent = Math.abs(det) < 0.0001 ? "Não-Inversível (Singular)" : "Inversível";

    // Desenhar linhas do grid deformadas pela matriz A
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.25)";
    for (let i = -6; i <= 6; i++) {
      // Linhas paralelas a T(j)
      const x1 = a * i + b * -6, y1 = c * i + d * -6;
      const x2 = a * i + b * 6, y2 = c * i + d * 6;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x1), toCanvasY(y1));
      ctx.lineTo(toCanvasX(x2), toCanvasY(y2));
      ctx.stroke();

      // Linhas paralelas a T(i)
      const x3 = a * -6 + b * i, y3 = c * -6 + d * i;
      const x4 = a * 6 + b * i, y4 = c * 6 + d * i;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x3), toCanvasY(y3));
      ctx.lineTo(toCanvasX(x4), toCanvasY(y4));
      ctx.stroke();
    }

    // Vetores da base transformada
    const ti_x = a, ti_y = c; // T(i)
    const tj_x = b, tj_y = d; // T(j)

    // Área do paralelogramo unitário transformado
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(0));
    ctx.lineTo(toCanvasX(ti_x), toCanvasY(ti_y));
    ctx.lineTo(toCanvasX(ti_x + tj_x), toCanvasY(ti_y + tj_y));
    ctx.lineTo(toCanvasX(tj_x), toCanvasY(tj_y));
    if (ctx.closePath) ctx.closePath();
    ctx.fillStyle = det < 0 
      ? (isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.15)")
      : (isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.15)");
    ctx.fill();
    ctx.strokeStyle = det < 0 ? "rgba(244, 63, 94, 0.6)" : "rgba(16, 185, 129, 0.6)";
    ctx.stroke();

    // Base original pontilhada
    drawVector(ctx, 0, 0, 1, 0, scale, toCanvasX, toCanvasY, isDark ? "#475569" : "#94a3b8", "i", true);
    drawVector(ctx, 0, 0, 0, 1, scale, toCanvasX, toCanvasY, isDark ? "#475569" : "#94a3b8", "j", true);

    // Vetores transformados T(i) e T(j)
    drawVector(ctx, 0, 0, ti_x, ti_y, scale, toCanvasX, toCanvasY, "#3b82f6", `T(i) = (${ti_x.toFixed(1)}, ${ti_y.toFixed(1)})`);
    drawVector(ctx, 0, 0, tj_x, tj_y, scale, toCanvasX, toCanvasY, "#10b981", `T(j) = (${tj_x.toFixed(1)}, ${tj_y.toFixed(1)})`);

    // Atualizar Legenda
    legendEl.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 bg-blue-500 rounded"></span> T(î): Coluna 1 da Matriz</span>
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 bg-emerald-500 rounded"></span> T(ĵ): Coluna 2 da Matriz</span>
      </div>
      <span class="font-mono text-[10px]">Área do Paralelogramo = |det(A)| = ${Math.abs(det).toFixed(2)}</span>
    `;
  }

  function renderDotProductMode(ctx, originX, originY, scale, isDark, toCanvasX, toCanvasY) {
    const ux = vectorU.x, uy = vectorU.y;
    const vx = vectorV.x, vy = vectorV.y;

    const dot = ux * vx + uy * vy;
    const normU = Math.sqrt(ux * ux + uy * uy);
    const normV = Math.sqrt(vx * vx + vy * vy);

    let cosTheta = (normU > 0 && normV > 0) ? dot / (normU * normV) : 0;
    // Evitar erros numéricos de arredondamento além de [-1, 1]
    cosTheta = Math.max(-1, Math.min(1, cosTheta));
    const angleRad = Math.acos(cosTheta);
    const angleDeg = (angleRad * 180 / Math.PI);

    // Projeção ortogonal de u sobre v: proj_v(u) = (dot / normV^2) * v
    let projX = 0, projY = 0;
    if (normV > 0.0001) {
      const factor = dot / (normV * normV);
      projX = factor * vx;
      projY = factor * vy;
    }

    // Atualizar métricas no DOM
    container.querySelector("#label-u-coords").textContent = `(${ux.toFixed(1)}, ${uy.toFixed(1)})`;
    container.querySelector("#label-v-coords").textContent = `(${vx.toFixed(1)}, ${vy.toFixed(1)})`;

    container.querySelector("#metric-dot-val").textContent = dot.toFixed(2);
    container.querySelector("#metric-norms-val").textContent = `${normU.toFixed(2)} | ${normV.toFixed(2)}`;
    container.querySelector("#metric-angle-val").textContent = `${angleDeg.toFixed(1)}°`;
    container.querySelector("#metric-cos-val").textContent = cosTheta.toFixed(4);
    container.querySelector("#metric-proj-val").textContent = `(${projX.toFixed(2)}, ${projY.toFixed(2)})`;

    // Reta de projeção ao longo de V
    if (normV > 0.0001) {
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = isDark ? "rgba(45, 212, 191, 0.3)" : "rgba(20, 184, 166, 0.3)";
      ctx.beginPath();
      const lineLen = 15;
      const unitVx = vx / normV, unitVy = vy / normV;
      ctx.moveTo(toCanvasX(-unitVx * lineLen), toCanvasY(-unitVy * lineLen));
      ctx.lineTo(toCanvasX(unitVx * lineLen), toCanvasY(unitVy * lineLen));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Linha perpendicular conectando ponta de U à projeção
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = isDark ? "rgba(245, 158, 11, 0.6)" : "rgba(217, 119, 6, 0.6)";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(ux), toCanvasY(uy));
    ctx.lineTo(toCanvasX(projX), toCanvasY(projY));
    ctx.stroke();
    ctx.setLineDash([]);

    // Vetor de projeção (sombra sobre V)
    drawVector(ctx, 0, 0, projX, projY, scale, toCanvasX, toCanvasY, "#f59e0b", "proj_v(u)", false, 3);

    // Vetores U e V
    drawVector(ctx, 0, 0, ux, uy, scale, toCanvasX, toCanvasY, "#6366f1", `u (${ux.toFixed(1)}, ${uy.toFixed(1)})`, false, 2.5);
    drawVector(ctx, 0, 0, vx, vy, scale, toCanvasX, toCanvasY, "#14b8a6", `v (${vx.toFixed(1)}, ${vy.toFixed(1)})`, false, 2.5);

    // Desenhar arco angular entre U e V
    if (normU > 0.1 && normV > 0.1) {
      const startAngle = -Math.atan2(vy, vx);
      const endAngle = -Math.atan2(uy, ux);
      ctx.beginPath();
      ctx.arc(toCanvasX(0), toCanvasY(0), 28, startAngle, endAngle, (startAngle - endAngle) > Math.PI || (endAngle - startAngle) < 0 && (endAngle - startAngle) > -Math.PI);
      ctx.strokeStyle = isDark ? "#94a3b8" : "#64748b";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Atualizar Legenda
    legendEl.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 bg-indigo-500 rounded"></span> Vetor u</span>
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 bg-teal-500 rounded"></span> Vetor v</span>
        <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 bg-amber-500 rounded"></span> Projeção Ortogonal</span>
      </div>
      <span class="font-mono text-[10px]">cos(&theta;) = ${cosTheta.toFixed(3)} (${angleDeg.toFixed(1)}&deg;)</span>
    `;
  }

  // Função auxiliar para desenhar vetores com pontas de flecha
  function drawVector(ctx, x0, y0, x1, y1, scale, toCanvasX, toCanvasY, color, label, isDashed = false, width = 2) {
    const cx0 = toCanvasX(x0);
    const cy0 = toCanvasY(y0);
    const cx1 = toCanvasX(x1);
    const cy1 = toCanvasY(y1);

    const dx = cx1 - cx0;
    const dy = cy1 - cy0;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len < 1) return;

    if (ctx.save) ctx.save();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    if (ctx.setLineDash) {
      if (isDashed) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
    }

    // Linha principal do vetor
    ctx.beginPath();
    ctx.moveTo(cx0, cy0);
    ctx.lineTo(cx1, cy1);
    ctx.stroke();

    // Flecha indicadora na ponta
    const arrowLen = Math.min(10, len * 0.4);
    const angle = Math.atan2(dy, dx);
    if (ctx.setLineDash) ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(cx1, cy1);
    ctx.lineTo(cx1 - arrowLen * Math.cos(angle - Math.PI / 6), cy1 - arrowLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(cx1 - arrowLen * Math.cos(angle + Math.PI / 6), cy1 - arrowLen * Math.sin(angle + Math.PI / 6));
    if (ctx.closePath) ctx.closePath();
    ctx.fill();

    // Rótulo de texto
    if (label) {
      ctx.font = "bold 11px monospace";
      ctx.fillText(label, cx1 + 6, cy1 - 6);
    }
    if (ctx.restore) ctx.restore();
  }

  // Render inicial
  setTimeout(() => {
    renderCanvas();
  }, 20);

  return container;
}
