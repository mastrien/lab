// Componente de Glossário e Dicas Interativas (Hover / Click Tooltips Didáticos)
// Permite que leitores consultem definições intuitivas de termos técnicos e notações matemáticas

export const GLOSSARY_TERMS = {
  iid: {
    term: "Variáveis i.i.d.",
    notation: "X_1, X_2, \\dots, X_n \\sim \\text{i.i.d.}",
    title: "Independentes e Identicamente Distribuídas",
    definition: "Diz-se de variáveis em que cada observação é coletada de forma estocasticamente independente das demais (o valor de uma não altera as probabilidades da próxima), e todas provêm do mesmo processo gerador com a mesma lei de probabilidade.",
    intuition: "Exemplo: cada lançamento de uma moeda equilibrada não tem 'memória' dos lançamentos anteriores e tem sempre 50% de chance de cara."
  },
  "espaco-probabilidade": {
    term: "Espaço de Probabilidade",
    notation: "(\\Omega, \\mathcal{F}, P)",
    title: "Espaço de Probabilidade Formal",
    definition: "Tripla matemática que modela um experimento aleatório: Ω é o espaço amostral (todos os desfechos possíveis), F é a álgebra de eventos analisáveis, e P é a medida que atribui a cada evento uma probabilidade entre 0 e 1.",
    intuition: "É o 'cenário' matemático formal que garante que as regras de soma e multiplicação de probabilidades sejam consistentes."
  },
  esperanca: {
    term: "Esperança Matemática",
    notation: "\\mathbb{E}[X] \\text{ ou } \\mu",
    title: "Esperança Matemática (Valor Esperado)",
    definition: "O valor médio teórico ponderado de uma variável aleatória a longo prazo. Matematicamente, para variáveis contínuas é a integral \\int_{-\\infty}^{\\infty} x f(x) dx.",
    intuition: "Representa o 'centro de gravidade' ou ponto de equilíbrio da distribuição. Se você repetir o experimento milhões de vezes, a média aritmética dos resultados convergirá para esse ponto."
  },
  variancia: {
    term: "Variância",
    notation: "\\operatorname{Var}(X) \\text{ ou } \\sigma^2",
    title: "Variância Populacional",
    definition: "Medida da dispersão dos valores em torno da média, calculada como a esperança dos desvios quadráticos: \\mathbb{E}[(X - \\mu)^2].",
    intuition: "Quantifica a instabilidade ou espalhamento dos dados. Uma variância baixa significa que os valores estão muito concentrados perto da média; uma variância alta indica ampla dispersão."
  },
  "desvio-padrao": {
    term: "Desvio Padrão",
    notation: "\\sigma = \\sqrt{\\sigma^2}",
    title: "Desvio Padrão",
    definition: "A raiz quadrada positiva da variância populacional. Expressa a dispersão dos dados na mesmíssima unidade de medida da variável original.",
    intuition: "Se os dados medem salários em reais, a variância está em 'reais ao quadrado' (difícil de interpretar), enquanto o desvio padrão volta a estar em reais."
  },
  "erro-padrao": {
    term: "Erro Padrão da Média",
    notation: "\\operatorname{SE}(\\bar{X}_n) = \\frac{\\sigma}{\\sqrt{n}}",
    title: "Erro Padrão da Média (Standard Error)",
    definition: "O desvio padrão da distribuição amostral da média. Mede o erro típico ou a incerteza esperada ao usar a média amostral como estimador da média populacional.",
    intuition: "Como n está no denominador dentro de uma raiz quadrada, para reduzir o erro padrão pela metade é necessário quadruplicar o tamanho da amostra (n)."
  },
  "convergencia-probabilidade": {
    term: "Convergência em Probabilidade",
    notation: "\\bar{X}_n \\xrightarrow{P} \\mu",
    title: "Convergência em Probabilidade (Lei dos Grandes Números)",
    definition: "Para qualquer tolerância positiva \\varepsilon > 0, a probabilidade de que a distância |\\bar{X}_n - \\mu| seja maior que \\varepsilon tende a zero conforme n tende ao infinito.",
    intuition: "Afirma que médias de grandes amostras praticamente nunca erram o alvo populacional por uma margem perceptível."
  },
  "convergencia-distribuicao": {
    term: "Convergência em Distribuição",
    notation: "Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)",
    title: "Convergência em Lei ou Distribuição",
    definition: "A Função de Distribuição Acumulada (CDF) da sequência de variáveis converge pontualmente para a CDF da distribuição limite em todos os seus pontos de continuidade.",
    intuition: "Não diz que cada ponto individual se torna normal, mas que o desenho global da curva de probabilidade acumulada se torna indistinguível de uma curva em sino."
  },
  "normal-padrao": {
    term: "Distribuição Normal Padrão",
    notation: "\\mathcal{N}(0, 1)",
    title: "Distribuição Gaussiana Padronizada",
    definition: "A distribuição normal especial que possui média zero (\\mu = 0) e variância unitária (\\sigma^2 = 1). Sua função de densidade é dada por \\phi(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}.",
    intuition: "Serve como escala universal na estatística: qualquer distribuição normal pode ser convertida para ela através do cálculo Z = (X - \\mu) / \\sigma."
  },
  "funcao-distribuicao-acumulada": {
    term: "Função de Distribuição Acumulada",
    notation: "\\text{CDF ou } \\Phi(z) = P(Z \\le z)",
    title: "Função de Distribuição Acumulada (CDF)",
    definition: "Função que expressa a probabilidade de uma variável aleatória assumir um valor menor ou igual a uma dada coordenada z.",
    intuition: "Geometricamente, corresponde à área total sob a curva de densidade à esquerda da reta vertical x = z."
  },
  "funcoes-caracteristicas": {
    term: "Função Característica",
    notation: "\\varphi_X(t) = \\mathbb{E}[e^{itX}]",
    title: "Função Característica (Transformada de Fourier)",
    definition: "Transformação estocástica que codifica unicamente todas as propriedades probabilísticas e momentos de uma variável aleatória.",
    intuition: "Permitiu a Lyapunov provar o Teorema Central do Limite porque transforma a soma de variáveis independentes em uma simples multiplicação de funções."
  },
  "teste-z": {
    term: "Teste Z",
    notation: "Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}}",
    title: "Teste de Hipóteses Z",
    definition: "Teste estatístico que afere se a média observada em uma amostra difere significativamente de um valor nulo hipotético \\mu_0, fundamentado na convergência gaussiana do TCL.",
    intuition: "Se o valor de Z for muito distante de zero (ex: |Z| > 1.96 para 95% de confiança), conclui-se que a diferença observada é improvável de ter ocorrido por puro acaso."
  },
  "p-valor": {
    term: "p-valor (Valor de p)",
    notation: "p = P(|Z| \\ge |z_{calc}| \\mid H_0)",
    title: "Valor de Probabilidade (p-value)",
    definition: "A probabilidade de obter uma estatística de teste tão ou mais extrema do que a observada, assumindo que a hipótese nula (de inexistência de efeito) seja estritamente verdadeira.",
    intuition: "Um p-valor pequeno (ex: p < 0.05) significa: 'se não houvesse efeito real, seria extremamente raro ver dados como esses'."
  },
  "nivel-significancia": {
    term: "Nível de Significância",
    notation: "\\alpha \\text{ (geralmente } 0.05 \\text{ ou } 5\\%)",
    title: "Limiar de Falso Positivo (\\alpha)",
    definition: "A probabilidade máxima pré-fixada pelo pesquisador de cometer um Erro Tipo I (rejeitar a hipótese nula quando ela é na realidade verdadeira).",
    intuition: "É o 'custo de tolerância ao erro' que você aceita antes de declarar uma descoberta científica ou mudança de produto."
  }
};

// Gera elemento HTML para destacar o termo com hint interativo
export function termHint(key, customLabel = null) {
  const item = GLOSSARY_TERMS[key];
  if (!item) {
    return customLabel || key;
  }
  const label = customLabel || item.term;
  return `
    <button type="button" 
            class="glossary-term-trigger inline-flex items-baseline text-left font-medium text-slate-900 dark:text-slate-100 underline decoration-dotted decoration-slate-400 dark:decoration-slate-500 hover:decoration-slate-900 dark:hover:decoration-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-help transition-colors select-none"
            data-glossary-key="${key}"
            aria-label="Ver explicação de ${item.term}">
      <span>${label}</span>
      <span class="sr-only">(clique ou passe o mouse para ver a explicação)</span>
    </button>
  `.trim();
}

// Inicializa a lógica de popover/tooltip flutuante global
export function initGlossaryTooltips(rootElement = document) {
  let tooltipEl = document.getElementById("datalab-glossary-tooltip");
  
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "datalab-glossary-tooltip";
    tooltipEl.className = "fixed z-50 max-w-xs sm:max-w-sm p-4 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 border border-slate-700 dark:border-slate-700 shadow-2xl text-xs space-y-2 pointer-events-auto transition-all duration-150 opacity-0 scale-95 pointer-events-none";
    tooltipEl.setAttribute("role", "tooltip");
    document.body.appendChild(tooltipEl);
  }

  let activeTrigger = null;
  let closeTimeout = null;

  function showTooltip(trigger) {
    clearTimeout(closeTimeout);
    activeTrigger = trigger;
    const key = trigger.getAttribute("data-glossary-key");
    const item = GLOSSARY_TERMS[key];
    if (!item) return;

    tooltipEl.innerHTML = `
      <div class="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-800 dark:border-slate-700">
        <div>
          <span class="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Nota Conceitual</span>
          <h4 class="text-xs font-bold text-white tracking-tight">${item.title}</h4>
        </div>
        ${item.notation ? `<span class="px-1.5 py-0.5 rounded bg-slate-800 dark:bg-slate-700/80 text-[10px] font-mono text-slate-300">$${item.notation}$</span>` : ''}
      </div>
      <p class="text-[11px] text-slate-300 dark:text-slate-300 leading-relaxed">
        ${item.definition}
      </p>
      ${item.intuition ? `
        <div class="pt-1.5 border-t border-slate-800 dark:border-slate-700/60 text-[10px] text-slate-400">
          <strong class="text-slate-300">Intuição Prática:</strong> ${item.intuition}
        </div>
      ` : ''}
    `;

    // Posicionamento inteligente na tela
    const rect = trigger.getBoundingClientRect();
    const tooltipWidth = 320;
    const margin = 12;

    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    // Limites da tela horizontal
    if (left < margin) left = margin;
    if (left + tooltipWidth > window.innerWidth - margin) {
      left = window.innerWidth - tooltipWidth - margin;
    }

    // Posicionar acima ou abaixo dependendo do espaço
    let top = rect.bottom + 8;
    if (top + 180 > window.innerHeight && rect.top > 180) {
      top = rect.top - 190;
    }

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.width = `${tooltipWidth}px`;

    // Renderizar KaTeX na notação do tooltip se aplicável
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(tooltipEl, {
          delimiters: [{ left: "$", right: "$", display: false }],
          throwOnError: false
        });
      } catch (e) {}
    }

    tooltipEl.classList.remove("opacity-0", "scale-95", "pointer-events-none");
    tooltipEl.classList.add("opacity-100", "scale-100");
  }

  function hideTooltip() {
    closeTimeout = setTimeout(() => {
      tooltipEl.classList.remove("opacity-100", "scale-100");
      tooltipEl.classList.add("opacity-0", "scale-95", "pointer-events-none");
      activeTrigger = null;
    }, 150);
  }

  // Eventos para desktop (hover) e mobile (click/tap)
  rootElement.querySelectorAll(".glossary-term-trigger").forEach(btn => {
    // Desktop: Mouse
    btn.addEventListener("mouseenter", () => showTooltip(btn));
    btn.addEventListener("mouseleave", hideTooltip);
    btn.addEventListener("focus", () => showTooltip(btn));
    btn.addEventListener("blur", hideTooltip);

    // Mobile / Click: Toggle
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (activeTrigger === btn) {
        hideTooltip();
      } else {
        showTooltip(btn);
      }
    });
  });

  // Manter visível se o mouse estiver sobre o tooltip
  tooltipEl.addEventListener("mouseenter", () => clearTimeout(closeTimeout));
  tooltipEl.addEventListener("mouseleave", hideTooltip);

  // Fechar ao clicar fora ou pressionar ESC
  document.addEventListener("click", (e) => {
    if (activeTrigger && !activeTrigger.contains(e.target) && !tooltipEl.contains(e.target)) {
      hideTooltip();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeTrigger) {
      hideTooltip();
    }
  });
}
