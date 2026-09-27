// Bancada Experimental: Otimização Numérica & Descida de Gradiente 2D
// Permite simular interativamente algoritmos de otimização (GD, Momentum, Adam) sobre superfícies de perda 2D

import { Icons } from "../components/Icons.js";

export function renderGradientDescentLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  // Estado do simulador
  const state = {
    surface: "paraboloid", // 'paraboloid', 'rosenbrock', 'saddle'
    optimizer: "gd", // 'gd', 'momentum', 'adam'
    learningRate: 0.05,
    maxIter: 100,
    currentStep: 0,
    isPlaying: false,
    timerId: null,
    // Ponto atual
    w: { x: -3.5, y: 2.5 },
    // Histórico de trajetória
    history: [],
    // Estado interno dos otimizadores
    momentumVelocity: { x: 0, y: 0 },
    adamM: { x: 0, y: 0 },
    adamV: { x: 0, y: 0 },
    adamT: 0
  };

  // Definições analíticas das superfícies de perda e seus gradientes
  const SURFACES = {
    paraboloid: {
      name: "Ravina Elíptica (Parabolóide)",
      desc: "f(w₁, w₂) = 0.5 · (w₁² + 10 w₂²). Condicionamento anisotrópico que gera oscilações laterais no eixo w₂.",
      rangeX: [-5, 5],
      rangeY: [-4, 4],
      defaultW: { x: -4.0, y: 3.0 },
      defaultLr: 0.05,
      f: (x, y) => 0.5 * (x * x + 10 * y * y),
      grad: (x, y) => ({ dx: x, dy: 10 * y }),
      globalMin: { x: 0, y: 0, z: 0 }
    },
    rosenbrock: {
      name: "Vale de Rosenbrock (Banana Function)",
      desc: "f(w₁, w₂) = (1 - w₁)² + 100 · (w₂ - w₁²)². Vale curvo estreito e não-linear com mínimo global em (1, 1).",
      rangeX: [-2.5, 2.5],
      rangeY: [-1.5, 3.5],
      defaultW: { x: -1.5, y: 2.5 },
      defaultLr: 0.001,
      f: (x, y) => {
        const t1 = 1 - x;
        const t2 = y - x * x;
        return t1 * t1 + 100 * t2 * t2;
      },
      grad: (x, y) => {
        const dx = 2 * (x - 1) - 400 * x * (y - x * x);
        const dy = 200 * (y - x * x);
        return { dx, dy };
      },
      globalMin: { x: 1, y: 1, z: 0 }
    },
    saddle: {
      name: "Ponto de Sela (Saddle Point)",
      desc: "f(w₁, w₂) = 0.5 · (w₁² - w₂²). Ponto crítico em (0, 0) com autovalores de sinais opostos na Hessiana.",
      rangeX: [-4, 4],
      rangeY: [-4, 4],
      defaultW: { x: -0.1, y: 2.5 },
      defaultLr: 0.05,
      f: (x, y) => 0.5 * (x * x - y * y),
      grad: (x, y) => ({ dx: x, dy: -y }),
      globalMin: null
    }
  };

  function resetState() {
    const s = SURFACES[state.surface];
    state.w = { ...s.defaultW };
    state.currentStep = 0;
    state.isPlaying = false;
    if (state.timerId) {
      cancelAnimationFrame(state.timerId);
      state.timerId = null;
    }
    state.momentumVelocity = { x: 0, y: 0 };
    state.adamM = { x: 0, y: 0 };
    state.adamV = { x: 0, y: 0 };
    state.adamT = 0;

    const loss = s.f(state.w.x, state.w.y);
    const g = s.grad(state.w.x, state.w.y);
    const gradNorm = Math.hypot(g.dx, g.dy);

    state.history = [{
      step: 0,
      x: state.w.x,
      y: state.w.y,
      loss,
      gradNorm
    }];

    updateUI();
  }

  // Passo único de otimização
  function stepOptimization() {
    if (state.currentStep >= state.maxIter) {
      pauseOptimization();
      return;
    }

    const s = SURFACES[state.surface];
    const g = s.grad(state.w.x, state.w.y);
    const alpha = state.learningRate;
    let nextX = state.w.x;
    let nextY = state.w.y;

    if (state.optimizer === "gd") {
      // Vanilla Gradient Descent
      nextX -= alpha * g.dx;
      nextY -= alpha * g.dy;
    } else if (state.optimizer === "momentum") {
      // Polyak Momentum (beta = 0.9)
      const beta = 0.9;
      state.momentumVelocity.x = beta * state.momentumVelocity.x + alpha * g.dx;
      state.momentumVelocity.y = beta * state.momentumVelocity.y + alpha * g.dy;
      nextX -= state.momentumVelocity.x;
      nextY -= state.momentumVelocity.y;
    } else if (state.optimizer === "adam") {
      // Adam
      const beta1 = 0.9;
      const beta2 = 0.999;
      const eps = 1e-8;
      state.adamT += 1;

      state.adamM.x = beta1 * state.adamM.x + (1 - beta1) * g.dx;
      state.adamM.y = beta1 * state.adamM.y + (1 - beta1) * g.dy;

      state.adamV.x = beta2 * state.adamV.x + (1 - beta2) * (g.dx * g.dx);
      state.adamV.y = beta2 * state.adamV.y + (1 - beta2) * (g.dy * g.dy);

      const mHatX = state.adamM.x / (1 - Math.pow(beta1, state.adamT));
      const mHatY = state.adamM.y / (1 - Math.pow(beta1, state.adamT));

      const vHatX = state.adamV.x / (1 - Math.pow(beta2, state.adamT));
      const vHatY = state.adamV.y / (1 - Math.pow(beta2, state.adamT));

      nextX -= (alpha / (Math.sqrt(vHatX) + eps)) * mHatX;
      nextY -= (alpha / (Math.sqrt(vHatY) + eps)) * mHatY;
    }

    // Proteção contra NaN ou divergência ao infinito
    if (!isFinite(nextX) || !isFinite(nextY) || Math.abs(nextX) > 100 || Math.abs(nextY) > 100) {
      pauseOptimization();
      alert("A otimização divergiu! Experimente reduzir a taxa de aprendizado (learning rate).");
      return;
    }

    state.w.x = nextX;
    state.w.y = nextY;
    state.currentStep += 1;

    const loss = s.f(nextX, nextY);
    const nextG = s.grad(nextX, nextY);
    const gradNorm = Math.hypot(nextG.dx, nextG.dy);

    state.history.push({
      step: state.currentStep,
      x: nextX,
      y: nextY,
      loss,
      gradNorm
    });

    updateUI();

    // Critério de parada antecipada se gradiente for infinitesimal
    if (gradNorm < 1e-4) {
      pauseOptimization();
    }
  }

  function playOptimization() {
    if (state.isPlaying) return;
    state.isPlaying = true;

    function loop() {
      if (!state.isPlaying) return;
      stepOptimization();
      if (state.currentStep < state.maxIter && state.isPlaying) {
        state.timerId = setTimeout(() => {
          requestAnimationFrame(loop);
        }, 50); // ~20 passos por segundo para animação legível
      } else {
        pauseOptimization();
      }
    }
    loop();
    updatePlayButton();
  }

  function pauseOptimization() {
    state.isPlaying = false;
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    updatePlayButton();
  }

  function updatePlayButton() {
    const playBtn = container.querySelector("#opt-play-btn");
    if (!playBtn) return;
    if (state.isPlaying) {
      playBtn.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-sm bg-rose-500 animate-pulse"></span>
        <span>Pausar</span>
      `;
      playBtn.className = "px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 inline-flex items-center gap-1.5 transition-all";
    } else {
      playBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <span>Executar</span>
      `;
      playBtn.className = "px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 inline-flex items-center gap-1.5 transition-all shadow-sm";
    }
  }

  container.innerHTML = `
    <!-- Cabeçalho do Laboratório -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">${Icons.sliders("w-4 h-4")}</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Bancada Experimental: Otimização Numérica & Descida de Gradiente 2D</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Simulador visual de trajetórias de otimização em tempo real. Observe o comportamento de descida em curvas de nível, oscilações em ravinas e aceleração por momentos.
        </p>
      </div>

      <!-- Ações Rápidas -->
      <div class="flex items-center gap-2 shrink-0">
        <button id="opt-play-btn" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 inline-flex items-center gap-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span>Executar</span>
        </button>
        <button id="opt-step-btn" class="px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-colors">
          <span>Passo +1</span>
        </button>
        <button id="opt-reset-btn" class="px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-colors" title="Restaurar ponto inicial">
          <span>Reiniciar</span>
        </button>
      </div>
    </div>

    <!-- Painel de Controles e Visualização -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Controles (4 Colunas) -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Seletor de Superfície de Custo -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <label class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Superfície de Perda L(w₁, w₂)</label>
          <select id="surface-select" class="w-full text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400">
            <option value="paraboloid">Ravina Elíptica (Parabolóide)</option>
            <option value="rosenbrock">Vale Estreito de Rosenbrock</option>
            <option value="saddle">Ponto de Sela (Saddle Point)</option>
          </select>
          <p id="surface-desc" class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal"></p>
        </div>

        <!-- Seletor de Otimizador -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <label class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Algoritmo Otimizador</label>
          <div class="grid grid-cols-3 gap-1.5">
            <button type="button" data-opt="gd" class="opt-btn px-2 py-1.5 rounded text-xs font-semibold text-center border transition-all">GD Simples</button>
            <button type="button" data-opt="momentum" class="opt-btn px-2 py-1.5 rounded text-xs font-semibold text-center border transition-all">Momentum</button>
            <button type="button" data-opt="adam" class="opt-btn px-2 py-1.5 rounded text-xs font-semibold text-center border transition-all">Adam</button>
          </div>
        </div>

        <!-- Parâmetros de Hiperajuste -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="text-slate-600 dark:text-slate-400 font-medium">Taxa de Aprendizado (α):</span>
              <span id="lr-val-label" class="font-mono font-bold text-slate-900 dark:text-white">0.05</span>
            </div>
            <input id="lr-slider" type="range" min="0.0005" max="0.3" step="0.0005" value="0.05" class="w-full accent-indigo-600 dark:accent-indigo-400 cursor-pointer">
            <div class="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.0005 (Lento)</span>
              <span>0.3 (Agressivo)</span>
            </div>
          </div>

          <div class="space-y-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
            <div class="flex justify-between text-xs">
              <span class="text-slate-600 dark:text-slate-400 font-medium">Passos Máximos:</span>
              <span id="iter-val-label" class="font-mono font-bold text-slate-900 dark:text-white">100</span>
            </div>
            <input id="iter-slider" type="range" min="20" max="250" step="10" value="100" class="w-full accent-slate-600 dark:accent-slate-400 cursor-pointer">
          </div>
        </div>

        <!-- Cartão de Métricas em Tempo Real -->
        <div class="p-3.5 rounded-lg bg-slate-900 text-slate-100 dark:bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
          <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
            <span>Telemetria do Otimizador</span>
            <span id="opt-step-counter" class="text-indigo-400">Passo 0/100</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
            <div>
              <span class="text-slate-400 block text-[10px]">Coordenada w:</span>
              <span id="stat-coord" class="font-bold text-emerald-400">(-4.00, 3.00)</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Perda L(w):</span>
              <span id="stat-loss" class="font-bold text-amber-300">53.0000</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Norma ||∇L||:</span>
              <span id="stat-grad" class="font-bold text-sky-300">30.2655</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Status:</span>
              <span id="stat-status" class="font-bold text-slate-200">Pronto</span>
            </div>
          </div>
        </div>

        <p class="text-[11px] text-slate-400 italic">
          Dica: Você pode <strong>clicar diretamente no mapa de contorno</strong> ao lado para reposicionar o ponto inicial $w_0$ onde desejar!
        </p>

      </div>

      <!-- Visualização em Canvas (8 Colunas) -->
      <div class="lg:col-span-8 flex flex-col gap-4">
        
        <!-- Canvas Cartesiano de Curvas de Nível -->
        <div class="relative w-full aspect-square max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
          <canvas id="contour-canvas" class="w-full h-full block cursor-crosshair"></canvas>
          <div class="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur text-[10px] text-slate-300 font-mono border border-slate-700 pointer-events-none">
            Curvas de Nível &bull; Trajetória de Otimização
          </div>
          <div class="absolute top-2 right-2 flex items-center gap-3 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur text-[10px] text-slate-300 font-mono border border-slate-700 pointer-events-none">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Início</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Atual</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Mínimo</span>
          </div>
        </div>

        <!-- Gráfico de Convergência da Perda L(t) -->
        <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-800 dark:text-slate-200">Curva de Convergência da Perda $L(w_t)$</span>
            <span class="text-[10px] font-mono text-slate-500">Iteração t &rarr;</span>
          </div>
          <div class="w-full h-24 relative bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 overflow-hidden">
            <canvas id="loss-chart-canvas" class="w-full h-full block"></canvas>
          </div>
        </div>

      </div>

    </div>
  `;

  // Renderizadores de Canvas
  const contourCanvas = container.querySelector("#contour-canvas");
  const lossCanvas = container.querySelector("#loss-chart-canvas");

  function drawContourPlot() {
    if (!contourCanvas) return;
    const ctx = contourCanvas.getContext("2d");
    const width = contourCanvas.clientWidth || 500;
    const height = contourCanvas.clientHeight || 460;
    contourCanvas.width = width;
    contourCanvas.height = height;

    const s = SURFACES[state.surface];
    const [minX, maxX] = s.rangeX;
    const [minY, maxY] = s.rangeY;

    // Transformação matemática (x, y) <-> (canvasX, canvasY)
    function toCanvasX(x) {
      return ((x - minX) / (maxX - minX)) * width;
    }
    function toCanvasY(y) {
      return height - ((y - minY) / (maxY - minY)) * height;
    }
    function fromCanvasX(cx) {
      return minX + (cx / width) * (maxX - minX);
    }
    function fromCanvasY(cy) {
      return minY + ((height - cy) / height) * (maxY - minY);
    }

    // Limpar fundo escuro elegante
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, width, height);

    // 1. Amostragem em grade para mapa de contorno suave / curvas de nível
    const cols = 70;
    const rows = 60;
    const cellW = width / cols;
    const cellH = height / rows;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = minX + ((i + 0.5) / cols) * (maxX - minX);
        const y = minY + ((rows - 1 - j + 0.5) / rows) * (maxY - minY);
        const val = s.f(x, y);

        // Mapear valor para intensidade de cor em escala logarítmica
        let normVal = Math.log1p(Math.max(0, val)) / 4.5;
        if (normVal > 1) normVal = 1;

        // Fundo em tom azul-escuro com anéis de nível discretos
        const isContourLine = Math.floor(normVal * 18) % 2 === 0;
        const alpha = isContourLine ? 0.22 : 0.08;

        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fillRect(i * cellW, j * cellH, cellW + 0.5, cellH + 0.5);
      }
    }

    // 2. Eixos cartesianos w₁ e w₂
    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const zeroX = toCanvasX(0);
    const zeroY = toCanvasY(0);

    // Eixo Y (w₂ = 0)
    if (zeroX >= 0 && zeroX <= width) {
      ctx.beginPath();
      ctx.moveTo(zeroX, 0);
      ctx.lineTo(zeroX, height);
      ctx.stroke();
    }
    // Eixo X (w₁ = 0)
    if (zeroY >= 0 && zeroY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, zeroY);
      ctx.lineTo(width, zeroY);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 3. Marcar o mínimo global se existir
    if (s.globalMin) {
      const minCx = toCanvasX(s.globalMin.x);
      const minCy = toCanvasY(s.globalMin.y);
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(minCx, minCy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Cruz no mínimo
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(minCx - 8, minCy);
      ctx.lineTo(minCx + 8, minCy);
      ctx.moveTo(minCx, minCy - 8);
      ctx.lineTo(minCx, minCy + 8);
      ctx.stroke();
    }

    // 4. Desenhar a trajetória percorrida pelo otimizador
    if (state.history.length > 0) {
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      state.history.forEach((pt, idx) => {
        const cx = toCanvasX(pt.x);
        const cy = toCanvasY(pt.y);
        if (idx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();

      // Desenhar pontos da trajetória
      state.history.forEach((pt, idx) => {
        const cx = toCanvasX(pt.x);
        const cy = toCanvasY(pt.y);
        ctx.fillStyle = idx === 0 ? "#10b981" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(cx, cy, idx === 0 ? 5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ponto atual em destaque (vermelho com anel pulsante)
      const cur = state.history[state.history.length - 1];
      const curCx = toCanvasX(cur.x);
      const curCy = toCanvasY(cur.y);

      ctx.fillStyle = "rgba(244, 63, 94, 0.35)";
      ctx.beginPath();
      ctx.arc(curCx, curCy, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(curCx, curCy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Vetor de passo do gradiente (-alpha * gradiente)
      const g = s.grad(cur.x, cur.y);
      const stepVecX = -state.learningRate * g.dx;
      const stepVecY = -state.learningRate * g.dy;
      const targetCx = toCanvasX(cur.x + stepVecX * 2);
      const targetCy = toCanvasY(cur.y + stepVecY * 2);

      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curCx, curCy);
      ctx.lineTo(targetCx, targetCy);
      ctx.stroke();
    }
  }

  function drawLossChart() {
    if (!lossCanvas) return;
    const ctx = lossCanvas.getContext("2d");
    const width = lossCanvas.clientWidth || 400;
    const height = lossCanvas.clientHeight || 96;
    lossCanvas.width = width;
    lossCanvas.height = height;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    if (state.history.length < 2) {
      ctx.fillStyle = "#64748b";
      ctx.font = "11px monospace";
      ctx.fillText("Aguardando execução...", 12, height / 2 + 4);
      return;
    }

    const losses = state.history.map(h => h.loss);
    const maxL = Math.max(...losses, 1);
    const minL = Math.min(...losses, 0);

    const padLeft = 10;
    const padRight = 10;
    const padTop = 10;
    const padBottom = 10;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Linhas de grade sutis
    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop + chartH / 2);
    ctx.lineTo(padLeft + chartW, padTop + chartH / 2);
    ctx.stroke();

    // Curva de perda ao longo das iterações
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    state.history.forEach((h, idx) => {
      const cx = padLeft + (idx / Math.max(state.history.length - 1, 1)) * chartW;
      const range = maxL - minL || 1;
      const cy = padTop + chartH - ((h.loss - minL) / range) * chartH;
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
  }

  function updateUI() {
    const s = SURFACES[state.surface];
    const surfaceDesc = container.querySelector("#surface-desc");
    if (surfaceDesc) surfaceDesc.textContent = s.desc;

    const optStepCounter = container.querySelector("#opt-step-counter");
    if (optStepCounter) optStepCounter.textContent = `Passo ${state.currentStep}/${state.maxIter}`;

    const cur = state.history[state.history.length - 1] || { x: state.w.x, y: state.w.y, loss: 0, gradNorm: 0 };
    const statCoord = container.querySelector("#stat-coord");
    if (statCoord) statCoord.textContent = `(${cur.x.toFixed(2)}, ${cur.y.toFixed(2)})`;

    const statLoss = container.querySelector("#stat-loss");
    if (statLoss) statLoss.textContent = cur.loss.toFixed(4);

    const statGrad = container.querySelector("#stat-grad");
    if (statGrad) statGrad.textContent = cur.gradNorm.toFixed(4);

    const statStatus = container.querySelector("#stat-status");
    if (statStatus) {
      if (cur.gradNorm < 1e-3) {
        statStatus.textContent = "Convergido!";
        statStatus.className = "font-bold text-emerald-400";
      } else if (state.isPlaying) {
        statStatus.textContent = "Otimizando...";
        statStatus.className = "font-bold text-sky-400";
      } else {
        statStatus.textContent = "Parado";
        statStatus.className = "font-bold text-slate-300";
      }
    }

    // Atualizar botões de otimizador
    container.querySelectorAll(".opt-btn").forEach(btn => {
      const opt = btn.getAttribute("data-opt");
      if (opt === state.optimizer) {
        btn.className = "opt-btn px-2 py-1.5 rounded text-xs font-semibold text-center border bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm";
      } else {
        btn.className = "opt-btn px-2 py-1.5 rounded text-xs font-semibold text-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
      }
    });

    drawContourPlot();
    drawLossChart();
  }

  // Event Listeners
  const surfaceSelect = container.querySelector("#surface-select");
  surfaceSelect.addEventListener("change", (e) => {
    state.surface = e.target.value;
    const s = SURFACES[state.surface];
    state.learningRate = s.defaultLr;
    const lrSlider = container.querySelector("#lr-slider");
    const lrLabel = container.querySelector("#lr-val-label");
    if (lrSlider) lrSlider.value = s.defaultLr;
    if (lrLabel) lrLabel.textContent = s.defaultLr.toString();
    resetState();
  });

  container.querySelectorAll(".opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.optimizer = btn.getAttribute("data-opt");
      resetState();
    });
  });

  const lrSlider = container.querySelector("#lr-slider");
  const lrLabel = container.querySelector("#lr-val-label");
  lrSlider.addEventListener("input", (e) => {
    state.learningRate = parseFloat(e.target.value);
    lrLabel.textContent = state.learningRate.toFixed(4);
  });

  const iterSlider = container.querySelector("#iter-slider");
  const iterLabel = container.querySelector("#iter-val-label");
  iterSlider.addEventListener("input", (e) => {
    state.maxIter = parseInt(e.target.value, 10);
    iterLabel.textContent = state.maxIter.toString();
    const optStepCounter = container.querySelector("#opt-step-counter");
    if (optStepCounter) optStepCounter.textContent = `Passo ${state.currentStep}/${state.maxIter}`;
  });

  const playBtn = container.querySelector("#opt-play-btn");
  playBtn.addEventListener("click", () => {
    if (state.isPlaying) pauseOptimization();
    else playOptimization();
  });

  const stepBtn = container.querySelector("#opt-step-btn");
  stepBtn.addEventListener("click", () => {
    pauseOptimization();
    stepOptimization();
  });

  const resetBtn = container.querySelector("#opt-reset-btn");
  resetBtn.addEventListener("click", () => {
    resetState();
  });

  // Clique no canvas para reposicionar o ponto de partida
  contourCanvas.addEventListener("click", (e) => {
    pauseOptimization();
    const rect = contourCanvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const width = contourCanvas.width;
    const height = contourCanvas.height;

    const s = SURFACES[state.surface];
    const [minX, maxX] = s.rangeX;
    const [minY, maxY] = s.rangeY;

    const newX = minX + (cx / width) * (maxX - minX);
    const newY = minY + ((height - cy) / height) * (maxY - minY);

    state.w = { x: newX, y: newY };
    state.currentStep = 0;
    state.momentumVelocity = { x: 0, y: 0 };
    state.adamM = { x: 0, y: 0 };
    state.adamV = { x: 0, y: 0 };
    state.adamT = 0;

    const loss = s.f(newX, newY);
    const g = s.grad(newX, newY);
    const gradNorm = Math.hypot(g.dx, g.dy);

    state.history = [{
      step: 0,
      x: newX,
      y: newY,
      loss,
      gradNorm
    }];

    updateUI();
  });

  // Inicializar estado
  resetState();

  // Redimensionamento responsivo
  window.addEventListener("resize", () => {
    drawContourPlot();
    drawLossChart();
  });

  return container;
}
