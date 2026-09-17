// Componente de Glossário e Dicas Interativas (Hover / Click Tooltips Didáticos)
// Permite que leitores consultem definições intuitivas de termos técnicos e notações matemáticas

import { renderMath } from "../utils/mathRenderer.js";

export const GLOSSARY_TERMS = {
  iid: {
    term: "Variáveis i.i.d.",
    notation: "X_1, X_2, \\dots, X_n \\sim \\text{i.i.d.}",
    title: "Independentes e Identicamente Distribuídas",
    definition: "Diz-se de variáveis em que cada observação é coletada de forma estocasticamente independente das demais (o valor de uma não altera as probabilidades da próxima), e todas provêm do mesmo processo gerador com a mesma lei de probabilidade.",
    intuition: "Exemplo: cada lançamento de uma moeda equilibrada não tem 'memória' dos lançamentos anteriores e tem sempre $50\\%$ de chance de cara."
  },
  "espaco-probabilidade": {
    term: "Espaço de Probabilidade",
    notation: "(\\Omega, \\mathcal{F}, P)",
    title: "Espaço de Probabilidade Formal",
    definition: "Tripla matemática que modela um experimento aleatório: $\\Omega$ é o espaço amostral (todos os desfechos possíveis), $\\mathcal{F}$ é a álgebra de eventos analisáveis, e $P$ é a medida que atribui a cada evento uma probabilidade entre $0$ e $1$.",
    intuition: "É o cenário formal que assegura a validade das leis de soma e produto das probabilidades."
  },
  esperanca: {
    term: "Esperança Matemática",
    notation: "\\mathbb{E}[X] = \\mu",
    title: "Esperança Matemática (Valor Esperado)",
    definition: "O valor médio teórico ponderado de uma variável aleatória a longo prazo. Matematicamente, para variáveis contínuas é dado pela integral $\\int_{-\\infty}^{\\infty} x f(x) \\, dx$.",
    intuition: "Representa o 'centro de gravidade' da distribuição. Se você repetir o experimento muitas vezes, a média aritmética dos dados convergirá exatamente para esse ponto."
  },
  variancia: {
    term: "Variância",
    notation: "\\operatorname{Var}(X) = \\sigma^2",
    title: "Variância Populacional",
    definition: "Medida da dispersão dos valores em torno da média $\\mu$, calculada como a esperança dos desvios quadráticos: $\\mathbb{E}[(X - \\mu)^2]$.",
    intuition: "Quantifica a dispersão dos dados. Uma variância baixa indica concentração próxima à média; uma variância alta indica grande espalhamento."
  },
  "desvio-padrao": {
    term: "Desvio Padrão",
    notation: "\\sigma = \\sqrt{\\operatorname{Var}(X)}",
    title: "Desvio Padrão",
    definition: "A raiz quadrada positiva da variância populacional $\\sigma^2$. Expressa a dispersão dos dados na mesmíssima unidade de medida da variável original.",
    intuition: "Se os dados medem salários em reais, a variância está em 'reais ao quadrado', enquanto o desvio padrão volta a estar em reais."
  },
  "erro-padrao": {
    term: "Erro Padrão da Média",
    notation: "\\operatorname{SE}(\\bar{X}_n) = \\frac{\\sigma}{\\sqrt{n}}",
    title: "Erro Padrão da Média",
    definition: "O desvio padrão da distribuição amostral da média. Mede o erro típico ou a incerteza esperada ao usar a média amostral $\\bar{X}_n$ como estimador da média populacional $\\mu$.",
    intuition: "Como $n$ está no denominador dentro de uma raiz quadrada, para reduzir o erro padrão pela metade é necessário quadruplicar o tamanho da amostra ($4n$)."
  },
  "convergencia-probabilidade": {
    term: "Convergência em Probabilidade",
    notation: "\\bar{X}_n \\xrightarrow{P} \\mu",
    title: "Convergência em Probabilidade (Lei dos Grandes Números)",
    definition: "Para qualquer tolerância positiva $\\varepsilon > 0$, a probabilidade de que $|\\bar{X}_n - \\mu| > \\varepsilon$ tende a zero conforme $n \\to \\infty$.",
    intuition: "Garante que médias de grandes amostras praticamente nunca erram o valor populacional $\\mu$ por uma margem perceptível."
  },
  "convergencia-distribuicao": {
    term: "Convergência em Distribuição",
    notation: "Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)",
    title: "Convergência em Distribuição (TCL)",
    definition: "A Função de Distribuição Acumulada $F_n(z)$ da sequência amostral converge pontualmente para a função acumulada da distribuição normal limite: $\\lim_{n \\to \\infty} F_n(z) = \\Phi(z)$.",
    intuition: "Não diz que cada dado individual se torna normal, mas que a distribuição global das médias padronizadas adota a forma da curva em sino."
  },
  "normal-padrao": {
    term: "Distribuição Normal Padrão",
    notation: "\\mathcal{N}(0, 1)",
    title: "Distribuição Gaussiana Padronizada",
    definition: "A distribuição normal especial que possui média zero ($\\mu = 0$) e variância unitária ($\\sigma^2 = 1$). Sua densidade de probabilidade é dada por $\\phi(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}$.",
    intuition: "Serve como régua universal na estatística: qualquer distribuição normal pode ser convertida para ela através do cálculo $Z = \\frac{X - \\mu}{\\sigma}$."
  },
  "funcao-distribuicao-acumulada": {
    term: "Função de Distribuição Acumulada",
    notation: "\\Phi(z) = P(Z \\le z)",
    title: "Função de Distribuição Acumulada (CDF)",
    definition: "Função que expressa a probabilidade de uma variável aleatória contínua assumir um valor menor ou igual a uma dada coordenada $z$: $\\Phi(z) = \\int_{-\\infty}^z \\phi(t) \\, dt$.",
    intuition: "Geometricamente, corresponde à área acumulada sob a curva de densidade à esquerda da reta vertical $x = z$."
  },
  "funcoes-caracteristicas": {
    term: "Função Característica",
    notation: "\\varphi_X(t) = \\mathbb{E}[e^{itX}]",
    title: "Função Característica (Transformada de Fourier)",
    definition: "Transformada de Fourier da distribuição de probabilidade. Converte a operação complexa de convolução da soma de variáveis independentes em um simples produto algébrico $\\varphi_{X+Y}(t) = \\varphi_X(t) \\cdot \\varphi_Y(t)$.",
    intuition: "Permitiu a Aleksandr Lyapunov provar o Teorema Central do Limite sem depender da premissa de densidades estritamente idênticas."
  },
  "teste-z": {
    term: "Teste Z",
    notation: "Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}}",
    title: "Teste de Hipóteses Z",
    definition: "Teste paramétrico que afere se a média de uma amostra difere significativamente de um valor nulo hipotético $\\mu_0$, fundamentado na convergência gaussiana do TCL.",
    intuition: "Se $|Z| > 1.96$, a discrepância observada tem menos de $5\\%$ de probabilidade de ter ocorrido por mero ruído amostral ($p < 0.05$)."
  },
  "p-valor": {
    term: "p-valor (Valor de p)",
    notation: "p = P(|Z| \\ge |z_{\\text{obs}}| \\mid H_0)",
    title: "Valor de Probabilidade (p-value)",
    definition: "A probabilidade de obter uma estatística de teste tão ou mais extrema do que a observada, assumindo que a hipótese nula $H_0$ (de inexistência de efeito) seja estritamente verdadeira.",
    intuition: "Um p-valor diminuto ($p < 0.05$) indica que os dados observados são altamente improváveis sob a hipótese nula de neutralidade."
  },
  "nivel-significancia": {
    term: "Nível de Significância",
    notation: "\\alpha = 0.05 \\text{ (5\\%)}",
    title: "Limiar de Significância (\\alpha)",
    definition: "A probabilidade máxima pré-fixada pelo analista de cometer um Erro Tipo I (rejeitar a hipótese nula quando ela é na realidade verdadeira).",
    intuition: "É a tolerância máxima a falsos positivos aceita antes de declarar uma conclusão científica ou de negócio."
  },
  vetor: {
    term: "Vetor",
    notation: "\\mathbf{x} = (x_1, x_2, \\dots, x_n)^\\top \\in \\mathbb{R}^n",
    title: "Vetor Euclidiano e Tupla de Atributos",
    definition: "Elemento de um espaço vetorial $\\mathbb{R}^n$ caracterizado geometricamente por uma magnitude e uma direção a partir da origem, ou algebricamente como uma sequência ordenada de $n$ escalares reais.",
    intuition: "Em Ciência de Dados, cada linha de uma tabela (ex: idade, renda, score de crédito) é tratada computacionalmente como um vetor de atributos em um espaço multidimensional."
  },
  "espaco-vetorial": {
    term: "Espaço Vetorial",
    notation: "(V, +, \\cdot, \\mathbb{R})",
    title: "Espaço Vetorial Formal",
    definition: "Conjunto $V$ de objetos munido de operações de adição vetorial e multiplicação por escalar que satisfazem os oito axiomas formais (associatividade, comutatividade, elemento neutro, inverso e distributividades).",
    intuition: "O espaço cartesiano bidimensional $\\mathbb{R}^2$, tridimensional $\\mathbb{R}^3$ ou o espaço de $d$ atributos $\\mathbb{R}^d$ onde residem os dados são exemplos canônicos de espaços vetoriais."
  },
  "produto-escalar": {
    term: "Produto Escalar",
    notation: "\\mathbf{u} \\cdot \\mathbf{v} = \\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\sum_{i=1}^n u_i v_i",
    title: "Produto Escalar (Inner Product)",
    definition: "Operação que associa dois vetores de mesma dimensão a um único número escalar real. Relaciona-se com a geometria euclidiana via $\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)$.",
    intuition: "Se o produto for positivo, os vetores apontam na mesma direção geral; se for zero, são perfeitamente perpendiculares (ortogonais); se negativo, apontam em direções opostas."
  },
  "norma-euclidiana": {
    term: "Norma Euclidiana (L2)",
    notation: "\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}",
    title: "Norma Euclidiana (Magnitude)",
    definition: "Comprimento geométrico de um vetor no espaço euclidiano, derivado do teorema de Pitágoras generalizado: $\\|\\mathbf{x}\\|_2 = \\sqrt{\\mathbf{x} \\cdot \\mathbf{x}}$.",
    intuition: "Mede a distância euclidiana direta da origem $(0, \\dots, 0)$ até a coordenada do ponto no espaço $n$-dimensional."
  },
  ortogonalidade: {
    term: "Ortogonalidade",
    notation: "\\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u} \\cdot \\mathbf{v} = 0",
    title: "Vetores Ortogonais (Perpendiculares)",
    definition: "Dois vetores não-nulos são ortogonais quando formam um ângulo de $90^\\circ$ ($\\pi/2$ radianos) entre si, de modo que seu produto interno se anula estritamente.",
    intuition: "Significa independência geométrica total: variar na direção de $\\mathbf{u}$ não projeta nenhuma sombra nem causa qualquer deslocamento na direção de $\\mathbf{v}$."
  },
  "independencia-linear": {
    term: "Independência Linear",
    notation: "\\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0} \\implies c_1 = \\dots = c_k = 0",
    title: "Independência Linear (LI)",
    definition: "Um conjunto de vetores é linearmente independente se nenhum vetor do conjunto pode ser escrito como uma combinação linear ponderada dos demais.",
    intuition: "Cada vetor traz uma informação verdadeiramente nova ou uma dimensão adicional, sem redundância ou multicolinearidade perfeita."
  },
  "base-vetorial": {
    term: "Base Vetorial",
    notation: "\\mathcal{B} = \\{\\mathbf{v}_1, \\dots, \\mathbf{v}_n\\}",
    title: "Base e Dimensão de um Espaço",
    definition: "Conjunto de vetores linearmente independentes que gera todo o espaço vetorial $V$. O número de elementos de qualquer base determina a dimensão do espaço.",
    intuition: "Os vetores canônicos $\\hat{i} = (1, 0)$ e $\\hat{j} = (0, 1)$ formam a base padrão do plano cartesiano $\\mathbb{R}^2$."
  },
  "matriz-operador": {
    term: "Matriz como Operador Linear",
    notation: "T(\\mathbf{x}) = \\mathbf{A}\\mathbf{x}",
    title: "Transformação Linear Matricial",
    definition: "Uma função $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ que preserva adição ($T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$) e multiplicação por escalar ($T(c\\mathbf{u}) = cT(\\mathbf{u})$), representada canonicamente pela multiplicação por uma matriz $\\mathbf{A}$.",
    intuition: "As colunas da matriz $\\mathbf{A}$ representam exatamente onde os vetores da base canônica vão parar após a transformação (rotação, escala, cisalhamento)."
  },
  determinante: {
    term: "Determinante",
    notation: "\\operatorname{det}(\\mathbf{A}) = |\\mathbf{A}|",
    title: "Determinante de uma Matriz Quadrada",
    definition: "Escalar que expressa o fator de escalonamento volumétrico induzido pela transformação linear associada à matriz $\\mathbf{A}$. Em $\\mathbb{R}^2$, representa a área orientada do paralelogramo gerado pelas colunas.",
    intuition: "Se $\\operatorname{det}(\\mathbf{A}) = 0$, o espaço foi colapsado para uma dimensão inferior (uma reta ou ponto), o que significa que a matriz perdeu informação e não possui inversa."
  },
  "similaridade-cosseno": {
    term: "Similaridade de Cosseno",
    notation: "S_C(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}",
    title: "Similaridade de Cosseno",
    definition: "Métrica de proximidade angular normalizada entre dois vetores que varia no intervalo $[-1, 1]$, sendo estritamente invariante à magnitude e comprimento dos vetores.",
    intuition: "Fundamental em NLP e busca semântica: dois textos que tratam do mesmo assunto terão cosseno próximo a $1$, mesmo que um deles seja um parágrafo e o outro um livro inteiro."
  },
  "projecao-ortogonal": {
    term: "Projeção Ortogonal",
    notation: "\\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2} \\mathbf{v}",
    title: "Projeção Ortogonal",
    definition: "A decomposição de um vetor $\\mathbf{u}$ na componente paralela à direção de $\\mathbf{v}$, de tal forma que o vetor residual $\\mathbf{u} - \\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u})$ seja estritamente ortogonal a $\\mathbf{v}$.",
    intuition: "É a sombra perpendicular de $\\mathbf{u}$ projetada sobre a reta gerada por $\\mathbf{v}$, constituindo o fundamento geométrico da Regressão Linear por Mínimos Quadrados (OLS)."
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
        ${item.notation ? `<span class="px-1.5 py-0.5 rounded bg-slate-800 dark:bg-slate-700/80 text-[10px] font-mono text-slate-300 font-bold">$${item.notation}$</span>` : ''}
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

    // Renderizar KaTeX em todos os delimitadores matemáticos do tooltip
    renderMath(tooltipEl);

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
