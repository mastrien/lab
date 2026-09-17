// Simulador Interativo do Teorema Central do Limite (TCL)

import { Icons } from "../components/Icons.js";

export function renderCentralLimitTheoremLab() {
  const container = document.createElement("div");
  container.className = "p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6";

  // Estado do simulador
  let distributionType = "exponential"; // 'exponential', 'uniform', 'bimodal', 'bernoulli'
  let sampleSize = 30; // N
  let numSamples = 1000; // M
  let sampleMeans = [];

  // Geradores de distribuição populacional
  function sampleFromPopulation(type) {
    if (type === "exponential") {
      // Exponencial: fortemente assimétrica à direita (lambda = 0.05)
      const u = Math.random();
      return -Math.log(1 - u) / 0.05;
    } else if (type === "uniform") {
      // Uniforme contínua [0, 100]
      return Math.random() * 100;
    } else if (type === "bimodal") {
      // Mistura bimodal: 50% N(25, 5^2) e 50% N(75, 5^2) via Box-Muller
      const u1 = Math.random(), u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
      const isFirst = Math.random() < 0.5;
      return isFirst ? (25 + z0 * 5) : (75 + z0 * 5);
    } else if (type === "bernoulli") {
      // Bernoulli com p = 0.2
      return Math.random() < 0.2 ? 100 : 0;
    }
    return Math.random() * 100;
  }

  function getTheoreticalParams(type) {
    if (type === "exponential") {
      const lambda = 0.05;
      return { mu: 1 / lambda, sigma: 1 / lambda, name: "Exponencial (λ=0.05)" };
    } else if (type === "uniform") {
      return { mu: 50, sigma: Math.sqrt(10000 / 12), name: "Uniforme Contínua [0, 100]" };
    } else if (type === "bimodal") {
      return { mu: 50, sigma: 25.5, name: "Bimodal (Mistura Gaussiana)" };
    } else if (type === "bernoulli") {
      const p = 0.2;
      return { mu: p * 100, sigma: Math.sqrt(p * (1 - p)) * 100, name: "Bernoulli Ponderada (p=0.2)" };
    }
    return { mu: 50, sigma: 28.8, name: "População" };
  }

  function runSimulation() {
    sampleMeans = [];
    for (let i = 0; i < numSamples; i++) {
      let sum = 0;
      for (let j = 0; j < sampleSize; j++) {
        sum += sampleFromPopulation(distributionType);
      }
      sampleMeans.push(sum / sampleSize);
    }
    updateView();
  }

  container.innerHTML = `
    <!-- Cabeçalho do Laboratório -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">${Icons.target("w-4 h-4")}</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Bancada Experimental: Simulação do Teorema Central do Limite</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Observe a emergência assintótica da Distribuição Normal a partir de populações arbitrárias à medida que o tamanho da amostra (N) varia.
        </p>
      </div>

      <button id="clt-run-btn" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm">
        ${Icons.refresh("w-3.5 h-3.5")}
        <span>Sortear Novas Amostras</span>
      </button>
    </div>

    <!-- Controles de Parâmetros -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
      <!-- Seletor de Distribuição Populacional -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">População de Origem</label>
        <select id="clt-dist-select" class="w-full text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400">
          <option value="exponential" selected>Exponencial (Assimetria Severa à Direita)</option>
          <option value="bimodal">Bimodal (Dois Picos Distantes)</option>
          <option value="uniform">Uniforme Contínua [0, 100]</option>
          <option value="bernoulli">Bernoulli Discreta (0 ou 100)</option>
        </select>
      </div>

      <!-- Slider Tamanho da Amostra (N) -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Tamanho da Amostra (N)</label>
          <span id="clt-n-val" class="font-mono text-xs font-bold text-slate-900 dark:text-white">N = 30</span>
        </div>
        <input id="clt-n-slider" type="range" min="1" max="100" value="30" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>N=1</span>
          <span>N=30</span>
          <span>N=100</span>
        </div>
      </div>

      <!-- Slider Quantidade de Amostragens (M) -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Número de Amostras (M)</label>
          <span id="clt-m-val" class="font-mono text-xs font-bold text-slate-900 dark:text-white">M = 1000</span>
        </div>
        <input id="clt-m-slider" type="range" min="200" max="2500" step="100" value="1000" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white">
        <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>200</span>
          <span>1000</span>
          <span>2500</span>
        </div>
      </div>
    </div>

    <!-- Indicadores Teóricos vs Empíricos -->
    <div id="clt-metrics-container" class="grid grid-cols-2 sm:grid-cols-4 gap-3"></div>

    <!-- Gráficos Coordenados: População vs Médias Amostrais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico 1: População Original -->
      <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-800 dark:text-slate-200">1. Distribuição da População Original</span>
          <span id="pop-type-label" class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Exponencial</span>
        </div>
        <div class="h-52 relative flex items-end">
          <canvas id="pop-canvas" class="w-full h-full"></canvas>
        </div>
        <p class="text-[11px] text-slate-400 mt-2 text-center">
          Note como os dados individuais originais não seguem uma curva de sino.
        </p>
      </div>

      <!-- Gráfico 2: Distribuição Amostral das Médias -->
      <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-800 dark:text-slate-200">2. Distribuição das Médias Amostrais (X̄)</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">X̄ ~ N(μ, σ²/n)</span>
        </div>
        <div class="h-52 relative flex items-end">
          <canvas id="means-canvas" class="w-full h-full"></canvas>
        </div>
        <p class="text-[11px] text-slate-400 mt-2 text-center">
          Pelo TCL, mesmo com população assimétrica, as médias amostrais convergem para a Normal.
        </p>
      </div>
    </div>
  `;

  function drawHistogram(canvas, data, color, isBell = false) {
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { width: 300, height: 160 };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const numBins = 28;
    const binWidth = width / numBins;
    const bins = new Array(numBins).fill(0);

    data.forEach(val => {
      let b = Math.floor(((val - min) / range) * numBins);
      if (b >= numBins) b = numBins - 1;
      if (b < 0) b = 0;
      bins[b]++;
    });

    const maxCount = Math.max(...bins) || 1;

    // Desenhar barras
    bins.forEach((count, i) => {
      const barH = (count / maxCount) * (height - 24);
      const x = i * binWidth;
      const y = height - barH - 12;

      ctx.fillStyle = color;
      ctx.fillRect(x + 1, y, binWidth - 2, barH);
    });

    // Linha de base
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 12);
    ctx.lineTo(width, height - 12);
    ctx.stroke();

    // Rótulos min e max
    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(min.toFixed(1), 2, height - 2);
    ctx.textAlign = "right";
    ctx.fillText(max.toFixed(1), width - 2, height - 2);
  }

  function updateView() {
    const params = getTheoreticalParams(distributionType);
    const theoreticalSE = params.sigma / Math.sqrt(sampleSize);

    // Estatísticas empíricas das médias amostrais
    const meanOfMeans = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;
    const varianceOfMeans = sampleMeans.reduce((acc, val) => acc + Math.pow(val - meanOfMeans, 2), 0) / sampleMeans.length;
    const sdOfMeans = Math.sqrt(varianceOfMeans);

    // Calcular assimetria (skewness) empírica das médias: E[(X-mu)^3] / sigma^3
    const m3 = sampleMeans.reduce((acc, val) => acc + Math.pow(val - meanOfMeans, 3), 0) / sampleMeans.length;
    const skewness = sdOfMeans > 0 ? (m3 / Math.pow(sdOfMeans, 3)) : 0;

    // Atualizar métricas
    const metricsEl = container.querySelector("#clt-metrics-container");
    metricsEl.innerHTML = `
      <div class="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <p class="text-[10px] text-slate-500 font-medium">Média Teórica (μ)</p>
        <p class="font-mono text-xs font-bold text-slate-900 dark:text-white">${params.mu.toFixed(2)}</p>
      </div>
      <div class="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <p class="text-[10px] text-slate-500 font-medium">Média das Amostras (X̄)</p>
        <p class="font-mono text-xs font-bold text-slate-900 dark:text-white">${meanOfMeans.toFixed(2)}</p>
      </div>
      <div class="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <p class="text-[10px] text-slate-500 font-medium">Erro Padrão Teórico (σ/√n)</p>
        <p class="font-mono text-xs font-bold text-slate-900 dark:text-white">${theoreticalSE.toFixed(2)}</p>
      </div>
      <div class="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <p class="text-[10px] text-slate-500 font-medium">Desvio das Médias (SE obs)</p>
        <p class="font-mono text-xs font-bold ${Math.abs(sdOfMeans - theoreticalSE) < 0.5 ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}">${sdOfMeans.toFixed(2)}</p>
      </div>
    `;

    // Atualizar label da população
    container.querySelector("#pop-type-label").textContent = params.name;

    // Gerar amostras da população para o gráfico 1
    const popSamples = [];
    for (let i = 0; i < 1500; i++) {
      popSamples.push(sampleFromPopulation(distributionType));
    }

    setTimeout(() => {
      const popCanvas = container.querySelector("#pop-canvas");
      const meansCanvas = container.querySelector("#means-canvas");
      drawHistogram(popCanvas, popSamples, "#94a3b8"); // slate
      drawHistogram(meansCanvas, sampleMeans, "#334155"); // deep slate
    }, 10);
  }

  // Listeners
  container.querySelector("#clt-run-btn").addEventListener("click", runSimulation);

  container.querySelector("#clt-dist-select").addEventListener("change", (e) => {
    distributionType = e.target.value;
    runSimulation();
  });

  const nSlider = container.querySelector("#clt-n-slider");
  nSlider.addEventListener("input", (e) => {
    sampleSize = parseInt(e.target.value, 10);
    container.querySelector("#clt-n-val").textContent = `N = ${sampleSize}`;
    runSimulation();
  });

  const mSlider = container.querySelector("#clt-m-slider");
  mSlider.addEventListener("input", (e) => {
    numSamples = parseInt(e.target.value, 10);
    container.querySelector("#clt-m-val").textContent = `M = ${numSamples}`;
    runSimulation();
  });

  // Execução inicial
  runSimulation();

  return container;
}
