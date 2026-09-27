// Bancada Experimental: Playground de Redes Neurais (MLP 2D Classifier)
// Treinador interativo de Perceptron Multicamadas com Backpropagation e visualização da fronteira de decisão 2D

import { Icons } from "../components/Icons.js";

export function renderNeuralNetworkLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  // Estado do laboratório
  const state = {
    datasetType: "xor", // 'xor', 'circles', 'moons'
    hiddenLayers: 1, // 1 ou 2 camadas ocultas
    neuronsPerLayer: 4, // 2, 4 ou 8 neurônios
    activation: "tanh", // 'relu', 'tanh', 'sigmoid'
    learningRate: 0.1,
    epoch: 0,
    maxEpochs: 400,
    isPlaying: false,
    timerId: null,
    // Dados de treino { x: [x1, x2], y: 0 ou 1 }
    data: [],
    // Pesos da rede
    weights: [],
    biases: [],
    // Histórico de métricas
    history: []
  };

  // Geradores de Datasets 2D sintéticos
  function generateData(type) {
    const pts = [];
    const n = 120;

    if (type === "xor") {
      // 4 quadrantes clássicos do problema XOR
      for (let i = 0; i < n; i++) {
        const quad = i % 4;
        let x1, x2, y;
        const noise = () => (Math.random() - 0.5) * 0.45;
        if (quad === 0) { x1 = -1 + noise(); x2 = -1 + noise(); y = 0; }
        else if (quad === 1) { x1 = 1 + noise(); x2 = -1 + noise(); y = 1; }
        else if (quad === 2) { x1 = -1 + noise(); x2 = 1 + noise(); y = 1; }
        else { x1 = 1 + noise(); x2 = 1 + noise(); y = 0; }
        pts.push({ x: [x1, x2], y });
      }
    } else if (type === "circles") {
      // Círculos concêntricos
      for (let i = 0; i < n; i++) {
        const isInner = i < n / 2;
        const angle = Math.random() * Math.PI * 2;
        const r = isInner ? (Math.random() * 0.7) : (1.3 + Math.random() * 0.7);
        const x1 = Math.cos(angle) * r;
        const x2 = Math.sin(angle) * r;
        pts.push({ x: [x1, x2], y: isInner ? 0 : 1 });
      }
    } else if (type === "moons") {
      // Duas luas entrelaçadas
      const half = Math.floor(n / 2);
      for (let i = 0; i < half; i++) {
        const angle = (i / half) * Math.PI;
        const x1 = Math.cos(angle) * 1.3 - 0.5 + (Math.random() - 0.5) * 0.25;
        const x2 = Math.sin(angle) * 1.3 - 0.2 + (Math.random() - 0.5) * 0.25;
        pts.push({ x: [x1, x2], y: 0 });
      }
      for (let i = 0; i < half; i++) {
        const angle = (i / half) * Math.PI;
        const x1 = 1.3 - Math.cos(angle) * 1.3 - 0.2 + (Math.random() - 0.5) * 0.25;
        const x2 = 1.0 - Math.sin(angle) * 1.3 - 0.5 + (Math.random() - 0.5) * 0.25;
        pts.push({ x: [x1, x2], y: 1 });
      }
    }

    return pts;
  }

  // Funções de ativação e suas derivadas
  const ACTIVATIONS = {
    relu: {
      fn: z => Math.max(0, z),
      df: z => (z > 0 ? 1 : 0)
    },
    tanh: {
      fn: z => Math.tanh(z),
      df: z => 1 - Math.pow(Math.tanh(z), 2)
    },
    sigmoid: {
      fn: z => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z)))),
      df: z => {
        const s = 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z))));
        return s * (1 - s);
      }
    }
  };

  // Inicialização de Pesos Xavier / He
  function initNetwork() {
    state.data = generateData(state.datasetType);
    state.epoch = 0;
    state.history = [];
    state.weights = [];
    state.biases = [];

    // Arquitetura: Camada 0: Entrada (2) -> Oculta(s) -> Saída (1)
    const layerSizes = [2];
    for (let l = 0; l < state.hiddenLayers; l++) {
      layerSizes.push(state.neuronsPerLayer);
    }
    layerSizes.push(1); // Saída única binária (sigmóide)

    // Inicializar cada transição entre camadas
    for (let l = 0; l < layerSizes.length - 1; l++) {
      const inDim = layerSizes[l];
      const outDim = layerSizes[l + 1];
      const limit = Math.sqrt(6 / (inDim + outDim)); // Glorot / Xavier

      const W = [];
      const b = [];
      for (let i = 0; i < outDim; i++) {
        const row = [];
        for (let j = 0; j < inDim; j++) {
          row.push((Math.random() * 2 - 1) * limit);
        }
        W.push(row);
        b.push(0);
      }
      state.weights.push(W);
      state.biases.push(b);
    }

    evaluateMetrics();
  }

  // Forward pass para uma única amostra x
  function forward(x) {
    const act = ACTIVATIONS[state.activation];
    const activations = [x];
    const zs = [];

    let curA = x;
    for (let l = 0; l < state.weights.length; l++) {
      const W = state.weights[l];
      const b = state.biases[l];
      const isOutput = (l === state.weights.length - 1);

      const nextZ = [];
      const nextA = [];

      for (let i = 0; i < W.length; i++) {
        let sum = b[i];
        for (let j = 0; j < W[i].length; j++) {
          sum += W[i][j] * curA[j];
        }
        nextZ.push(sum);

        // Camada de saída usa sempre Sigmóide para probabilidade [0, 1]
        if (isOutput) {
          nextA.push(ACTIVATIONS.sigmoid.fn(sum));
        } else {
          nextA.push(act.fn(sum));
        }
      }

      zs.push(nextZ);
      activations.push(nextA);
      curA = nextA;
    }

    return { activations, zs, output: curA[0] };
  }

  // Época de treinamento completa via Mini-Batch / Stochastic Backpropagation
  function trainEpoch(steps = 1) {
    const act = ACTIVATIONS[state.activation];
    const alpha = state.learningRate;
    const numLayers = state.weights.length;

    for (let s = 0; s < steps; s++) {
      if (state.epoch >= state.maxEpochs) break;

      // Embaralhar dataset a cada época
      const shuffled = [...state.data].sort(() => Math.random() - 0.5);

      for (const sample of shuffled) {
        const { activations, zs, output } = forward(sample.x);
        const y = sample.y;

        // 1. Sinal de erro na saída (Log-Loss + Sigmóide colapsa em dL/dz = y_hat - y)
        let deltas = [[output - y]]; // camada de saída

        // 2. Retropropagação dos deltas através das camadas ocultas
        for (let l = numLayers - 2; l >= 0; l--) {
          const nextW = state.weights[l + 1];
          const nextDelta = deltas[0];
          const curZ = zs[l];
          const curDelta = [];

          for (let j = 0; j < curZ.length; j++) {
            let err = 0;
            for (let k = 0; k < nextW.length; k++) {
              err += nextW[k][j] * nextDelta[k];
            }
            curDelta.push(err * act.df(curZ[j]));
          }
          deltas.unshift(curDelta);
        }

        // 3. Atualização dos pesos e vieses
        for (let l = 0; l < numLayers; l++) {
          const W = state.weights[l];
          const b = state.biases[l];
          const prevA = activations[l];
          const curDelta = deltas[l];

          for (let i = 0; i < W.length; i++) {
            for (let j = 0; j < W[i].length; j++) {
              W[i][j] -= alpha * curDelta[i] * prevA[j];
            }
            b[i] -= alpha * curDelta[i];
          }
        }
      }

      state.epoch += 1;
    }

    evaluateMetrics();
  }

  function evaluateMetrics() {
    let totalLoss = 0;
    let correct = 0;

    for (const sample of state.data) {
      const pred = forward(sample.x).output;
      const y = sample.y;
      // Binary Cross-Entropy com recorte numérico
      const p = Math.max(1e-12, Math.min(1 - 1e-12, pred));
      totalLoss -= (y * Math.log(p) + (1 - y) * Math.log(1 - p));

      const predictedClass = pred >= 0.5 ? 1 : 0;
      if (predictedClass === y) correct += 1;
    }

    const loss = totalLoss / state.data.length;
    const acc = (correct / state.data.length) * 100;

    state.history.push({
      epoch: state.epoch,
      loss,
      acc
    });

    updateUI();
  }

  function play() {
    if (state.isPlaying) return;
    state.isPlaying = true;

    function loop() {
      if (!state.isPlaying) return;
      trainEpoch(2); // 2 épocas por quadro para velocidade suave
      if (state.epoch < state.maxEpochs && state.isPlaying) {
        state.timerId = setTimeout(() => {
          requestAnimationFrame(loop);
        }, 30);
      } else {
        pause();
      }
    }
    loop();
    updatePlayButton();
  }

  function pause() {
    state.isPlaying = false;
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    updatePlayButton();
  }

  function updatePlayButton() {
    const playBtn = container.querySelector("#mlp-play-btn");
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
        <span>Treinar</span>
      `;
      playBtn.className = "px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 inline-flex items-center gap-1.5 transition-all shadow-sm";
    }
  }

  container.innerHTML = `
    <!-- Cabeçalho do Laboratório -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">${Icons.cpu("w-4 h-4")}</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Bancada Experimental: Playground de Redes Neurais (MLP 2D)</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Treine uma rede neural densa com Retropropagação (Backpropagation) em tempo real. Veja a deformação do espaço de decisão resolvendo problemas não-lineares como o clássico XOR.
        </p>
      </div>

      <!-- Ações Rápidas -->
      <div class="flex items-center gap-2 shrink-0">
        <button id="mlp-play-btn" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 inline-flex items-center gap-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span>Treinar</span>
        </button>
        <button id="mlp-step-btn" class="px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-colors">
          <span>+10 Épocas</span>
        </button>
        <button id="mlp-reset-btn" class="px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-colors">
          <span>Reiniciar</span>
        </button>
      </div>
    </div>

    <!-- Layout Grid: Controles (4 cols) + Visualização (8 cols) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Coluna de Configurações (4 Cols) -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Seletor de Dataset 2D -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <label class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Dataset Sintético 2D</label>
          <select id="dataset-select" class="w-full text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400">
            <option value="xor">XOR Clássico (4 Quadrantes)</option>
            <option value="circles">Círculos Concêntricos</option>
            <option value="moons">Duas Luas (Two Moons)</option>
          </select>
          <p id="dataset-desc" class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            O problema histórico de Minsky & Papert (1969) que exige não-linearidade e camadas ocultas.
          </p>
        </div>

        <!-- Arquitetura da Rede -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <span class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Arquitetura da Rede (MLP)</span>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">Camadas Ocultas:</label>
              <select id="layers-select" class="w-full text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-slate-800 dark:text-slate-200">
                <option value="1">1 Camada Oculta</option>
                <option value="2">2 Camadas Ocultas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-slate-500 mb-1">Neurônios / Camada:</label>
              <select id="neurons-select" class="w-full text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-slate-800 dark:text-slate-200">
                <option value="2">2 Neurônios</option>
                <option value="4" selected>4 Neurônios</option>
                <option value="8">8 Neurônios</option>
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] text-slate-500">Função de Ativação Oculta (σ):</label>
            <div class="grid grid-cols-3 gap-1 text-xs">
              <button type="button" data-act="tanh" class="act-btn px-2 py-1 rounded text-center border font-semibold">Tanh</button>
              <button type="button" data-act="relu" class="act-btn px-2 py-1 rounded text-center border font-semibold">ReLU</button>
              <button type="button" data-act="sigmoid" class="act-btn px-2 py-1 rounded text-center border font-semibold">Sigmóide</button>
            </div>
          </div>
        </div>

        <!-- Parâmetros de Treino -->
        <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="text-slate-600 dark:text-slate-400 font-medium">Taxa de Aprendizado (α):</span>
              <span id="lr-val-label" class="font-mono font-bold text-slate-900 dark:text-white">0.10</span>
            </div>
            <input id="lr-slider" type="range" min="0.01" max="0.4" step="0.01" value="0.10" class="w-full accent-indigo-600 dark:accent-indigo-400 cursor-pointer">
          </div>
        </div>

        <!-- Telemetria do Modelo -->
        <div class="p-3.5 rounded-lg bg-slate-900 text-slate-100 dark:bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
          <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
            <span>Telemetria de Treinamento</span>
            <span id="epoch-counter" class="text-indigo-400">Época 0/400</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
            <div>
              <span class="text-slate-400 block text-[10px]">Log-Loss (Perda):</span>
              <span id="stat-loss" class="font-bold text-amber-300">0.6931</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Acurácia:</span>
              <span id="stat-acc" class="font-bold text-emerald-400">50.0%</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Topologia:</span>
              <span id="stat-topology" class="font-bold text-sky-300">2-4-1</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Status:</span>
              <span id="stat-status" class="font-bold text-slate-200">Pronto</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Coluna Visual (8 Cols) -->
      <div class="lg:col-span-8 flex flex-col gap-4">
        
        <!-- Grade Cartesiana da Fronteira de Decisão 2D -->
        <div class="relative w-full aspect-square max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
          <canvas id="decision-canvas" class="w-full h-full block"></canvas>
          <div class="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur text-[10px] text-slate-300 font-mono border border-slate-700 pointer-events-none">
            Fronteira de Decisão Não-Linear &bull; Probabilidade P(y=1)
          </div>
          <div class="absolute top-2 right-2 flex items-center gap-3 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur text-[10px] text-slate-300 font-mono border border-slate-700 pointer-events-none">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white"></span> Classe 0</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white"></span> Classe 1</span>
          </div>
        </div>

        <!-- Curva de Perda ao Longo das Épocas -->
        <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-800 dark:text-slate-200">Evolução do Erro: Log-Loss ao Longo das Épocas</span>
            <span class="text-[10px] font-mono text-slate-500">Época t &rarr;</span>
          </div>
          <div class="w-full h-24 relative bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 overflow-hidden">
            <canvas id="loss-canvas" class="w-full h-full block"></canvas>
          </div>
        </div>

      </div>

    </div>
  `;

  const decisionCanvas = container.querySelector("#decision-canvas");
  const lossCanvas = container.querySelector("#loss-canvas");

  function drawDecisionBoundary() {
    if (!decisionCanvas) return;
    const ctx = decisionCanvas.getContext("2d");
    const width = decisionCanvas.clientWidth || 500;
    const height = decisionCanvas.clientHeight || 460;
    decisionCanvas.width = width;
    decisionCanvas.height = height;

    const range = 2.2;
    function toCanvasX(x) { return ((x + range) / (2 * range)) * width; }
    function toCanvasY(y) { return height - ((y + range) / (2 * range)) * height; }

    // 1. Grade de predição do modelo no espaço 2D
    const res = 48; // resolução da grade para 60fps
    const cellW = width / res;
    const cellH = height / res;

    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const x1 = -range + ((i + 0.5) / res) * (2 * range);
        const x2 = -range + ((res - 1 - j + 0.5) / res) * (2 * range);

        const prob = forward([x1, x2]).output;

        // Mapear probabilidade: 0 -> Azul, 1 -> Laranja/Vermelho
        let r, g, b;
        if (prob < 0.5) {
          const factor = (0.5 - prob) * 2; // 0 a 1
          r = Math.floor(15 + 20 * (1 - factor));
          g = Math.floor(35 + 40 * (1 - factor));
          b = Math.floor(180 + 40 * factor);
        } else {
          const factor = (prob - 0.5) * 2; // 0 a 1
          r = Math.floor(210 + 35 * factor);
          g = Math.floor(110 - 20 * factor);
          b = Math.floor(20 + 20 * (1 - factor));
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(i * cellW, j * cellH, cellW + 0.5, cellH + 0.5);
      }
    }

    // 2. Eixos de coordenadas suaves
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    const zeroX = toCanvasX(0);
    const zeroY = toCanvasY(0);
    ctx.beginPath();
    ctx.moveTo(zeroX, 0); ctx.lineTo(zeroX, height);
    ctx.moveTo(0, zeroY); ctx.lineTo(width, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Desenhar pontos de treino
    for (const pt of state.data) {
      const cx = toCanvasX(pt.x[0]);
      const cy = toCanvasY(pt.x[1]);

      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = pt.y === 0 ? "#3b82f6" : "#f59e0b";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.2;
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

    if (state.history.length < 2) return;

    const pad = 8;
    const chartW = width - pad * 2;
    const chartH = height - pad * 2;

    const losses = state.history.map(h => h.loss);
    const maxL = Math.max(...losses, 1.0);
    const minL = Math.min(...losses, 0);

    // Linha de perda (Azul-claro)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    state.history.forEach((h, idx) => {
      const cx = pad + (idx / (state.history.length - 1)) * chartW;
      const cy = pad + chartH - ((h.loss - minL) / (maxL - minL || 1)) * chartH;
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
  }

  function updateUI() {
    const epochCounter = container.querySelector("#epoch-counter");
    if (epochCounter) epochCounter.textContent = `Época ${state.epoch}/${state.maxEpochs}`;

    const latest = state.history[state.history.length - 1] || { loss: 0.693, acc: 50 };
    const statLoss = container.querySelector("#stat-loss");
    if (statLoss) statLoss.textContent = latest.loss.toFixed(4);

    const statAcc = container.querySelector("#stat-acc");
    if (statAcc) {
      statAcc.textContent = `${latest.acc.toFixed(1)}%`;
      if (latest.acc >= 95) statAcc.className = "font-bold text-emerald-400";
      else if (latest.acc >= 75) statAcc.className = "font-bold text-amber-300";
      else statAcc.className = "font-bold text-rose-400";
    }

    const statTopology = container.querySelector("#stat-topology");
    if (statTopology) {
      statTopology.textContent = state.hiddenLayers === 1
        ? `2-${state.neuronsPerLayer}-1`
        : `2-${state.neuronsPerLayer}-${state.neuronsPerLayer}-1`;
    }

    const statStatus = container.querySelector("#stat-status");
    if (statStatus) {
      if (latest.acc >= 98) {
        statStatus.textContent = "Convergido!";
        statStatus.className = "font-bold text-emerald-400";
      } else if (state.isPlaying) {
        statStatus.textContent = "Treinando...";
        statStatus.className = "font-bold text-sky-400";
      } else {
        statStatus.textContent = "Parado";
        statStatus.className = "font-bold text-slate-300";
      }
    }

    // Botões de ativação
    container.querySelectorAll(".act-btn").forEach(btn => {
      const act = btn.getAttribute("data-act");
      if (act === state.activation) {
        btn.className = "act-btn px-2 py-1 rounded text-center border font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm";
      } else {
        btn.className = "act-btn px-2 py-1 rounded text-center border font-semibold border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
      }
    });

    drawDecisionBoundary();
    drawLossChart();
  }

  // Event Listeners
  const datasetSelect = container.querySelector("#dataset-select");
  datasetSelect.addEventListener("change", (e) => {
    state.datasetType = e.target.value;
    pause();
    initNetwork();
  });

  const layersSelect = container.querySelector("#layers-select");
  layersSelect.addEventListener("change", (e) => {
    state.hiddenLayers = parseInt(e.target.value, 10);
    pause();
    initNetwork();
  });

  const neuronsSelect = container.querySelector("#neurons-select");
  neuronsSelect.addEventListener("change", (e) => {
    state.neuronsPerLayer = parseInt(e.target.value, 10);
    pause();
    initNetwork();
  });

  container.querySelectorAll(".act-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activation = btn.getAttribute("data-act");
      pause();
      initNetwork();
    });
  });

  const lrSlider = container.querySelector("#lr-slider");
  const lrLabel = container.querySelector("#lr-val-label");
  lrSlider.addEventListener("input", (e) => {
    state.learningRate = parseFloat(e.target.value);
    lrLabel.textContent = state.learningRate.toFixed(2);
  });

  const playBtn = container.querySelector("#mlp-play-btn");
  playBtn.addEventListener("click", () => {
    if (state.isPlaying) pause();
    else play();
  });

  const stepBtn = container.querySelector("#mlp-step-btn");
  stepBtn.addEventListener("click", () => {
    pause();
    trainEpoch(10);
  });

  const resetBtn = container.querySelector("#mlp-reset-btn");
  resetBtn.addEventListener("click", () => {
    pause();
    initNetwork();
  });

  // Inicializar rede
  initNetwork();

  window.addEventListener("resize", () => {
    drawDecisionBoundary();
    drawLossChart();
  });

  return container;
}
