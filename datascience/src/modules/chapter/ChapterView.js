// Módulo de Leitura e Experimentação de Capítulos com KaTeX, Glossário Interativo e Sumário Sticky

import { getChapterById, getAxisById } from "../../data/curriculum.js";
import { getLabById } from "../../labs/registry.js";
import { renderChapterToc } from "../../components/ChapterToc.js";
import { renderMath } from "../../utils/mathRenderer.js";
import { termHint, initGlossaryTooltips } from "../../components/GlossaryTooltip.js";
import { Icons } from "../../components/Icons.js";
import { renderLinearAlgebraChapter } from "./chapters/axis1_cap1_linear_algebra.js";

export function renderChapterView(chapterId) {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-7xl mx-auto";

  const chapterData = getChapterById(chapterId);

  if (!chapterData) {
    container.innerHTML = `
      <div class="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
        <h2 class="text-base font-bold text-slate-900 dark:text-white">Capítulo não encontrado</h2>
        <p class="text-xs text-slate-500">O identificador especificado não corresponde a nenhum capítulo do currículo.</p>
        <a href="#overview" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline">
          ${Icons.arrowLeft("w-3.5 h-3.5")}
          <span>Voltar para o Início</span>
        </a>
      </div>
    `;
    return container;
  }

  const { axis, chapter } = chapterData;

  // Renderização específica para capítulos canônicos com conteúdo didático completo
  if (chapter.id === "axis-1-cap-1-linear-algebra") {
    renderLinearAlgebraChapter(container, axis, chapter);
  } else if (chapter.id === "axis-1-cap-3-clt") {
    renderCltBenchmarkChapter(container, axis, chapter);
  } else {
    // Para capítulos estruturados do currículo ainda em produção
    renderStandardChapter(container, axis, chapter);
  }

  return container;
}

function renderCltBenchmarkChapter(container, axis, chapter) {
  container.innerHTML = `
    <!-- Breadcrumbs e Identificação -->
    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
      <div class="flex items-center gap-1.5 truncate">
        <a href="#overview" class="hover:text-slate-900 dark:hover:text-white transition-colors">Início</a>
        <span>/</span>
        <a href="#axis/${axis.id}" class="hover:text-slate-900 dark:hover:text-white transition-colors truncate">
          Eixo ${axis.number}: ${axis.title}
        </a>
        <span>/</span>
        <span class="text-slate-800 dark:text-slate-200 font-semibold truncate">Capítulo ${chapter.number}</span>
      </div>

      <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 shrink-0">
        Capítulo Piloto Benchmark
      </span>
    </div>

    <!-- Layout Duplo: Artigo Central + Sumário Lateral Sticky -->
    <div class="flex gap-8 items-start relative">
      
      <!-- Coluna Principal do Artigo Didático -->
      <article id="chapter-article" class="flex-1 min-w-0 space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        
        <!-- Cabeçalho do Capítulo -->
        <header class="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2 text-xs font-mono text-slate-400 font-bold uppercase">
            <span>Eixo ${axis.number} &bull; Capítulo ${chapter.number}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            ${chapter.title}
          </h1>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Fundamentação assintótica da inferência estatística, convergência em distribuição e a emergência da distribuição normal a partir de variáveis arbitrárias.
          </p>
        </header>

        <!-- Seção 1: Origem Epistemológica e Contexto Histórico -->
        <section id="sec-origem-historica" class="space-y-4 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              1. Origem Epistemológica e Contexto Histórico
            </h2>
          </div>
          
          <p>
            O <strong>Teorema Central do Limite (TCL)</strong> constitui um dos pilares mais fundamentais de toda a teoria probabilística e da inferência indutiva moderna. Historicamente, ele não emergiu como um postulado abstrato isolado, mas como uma resposta matemática a um problema prático crucial: a <em>modelagem e compensação de erros de observação física e astronômica</em>.
          </p>

          <p>
            O primeiro vislumbre da convergência normal foi obtido pelo matemático franco-britânico <strong>Abraham de Moivre</strong> em 1738, em sua obra seminal <a href="https://archive.org/details/doctrineofchance00moiv" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>The Doctrine of Chances</em></a>. Ao analisar jogos de azar repetitivos envolvendo lançamentos consecutivos de moedas, De Moivre buscava uma forma eficiente de calcular probabilidades binomiais para valores de $n$ muito elevados sem a necessidade de avaliar coeficientes combinatórios gigantescos. De Moivre deduziu a primeira aproximação exponencial contínua para a distribuição binomial simétrica ($p = 0.5$).
          </p>

          <p>
            Em 1810, o matemático e astrônomo francês <strong>Pierre-Simon Laplace</strong> generalizou o resultado de De Moivre em sua memória perante a Academia de Ciências de Paris, publicada no Tomo 12 de suas obras completas (<a href="https://archive.org/details/oeuvrescomplte12lapluoft" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Mémoire sur les approximations des formules qui sont fonctions de très grands nombres</em></a>). Laplace demonstrou que a soma de um grande número de erros observacionais independentes — qualquer que fosse a sua distribuição individual contínua — tendia inexoravelmente a uma distribuição em forma de sino, permitindo aos astrônomos estabelecer limites de confiança para medições planetárias (Teorema de De Moivre-Laplace).
          </p>

          <p>
            O rigor matemático moderno e as condições de convergência para variáveis aleatórias arbitrárias com variâncias finitas foram formalizados pelo matemático russo <strong>Aleksandr Lyapunov</strong> em 1901, em sua obra <a href="https://eudml.org/doc/224219" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Nouvelle forme du théorème sur la limite de probabilité</em></a>, introduzindo o método das ${termHint("funcoes-caracteristicas")} que dispensava a necessidade de densidades estritamente idênticas.
          </p>
        </section>

        <!-- Seção 2: Fundamentação Teórica e Formulação Matemática -->
        <section id="sec-formulacao-matematica" class="space-y-6 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              2. Fundamentação Teórica e Formulação Matemática
            </h2>
          </div>

          <!-- Subseção Didática: Intuição Prévia -->
          <!-- Intuição Didática no Fluxo Principal da Página -->
          <p>
            Imagine o lançamento de um dado equilibrado de seis faces. Ao lançar um único dado, a chance de cada face ($1$ a $6$) é exatamente idêntica ($1/6$), produzindo um gráfico perfeitamente plano (distribuição uniforme). Entretanto, se você lançar <strong>30 dados simultaneamente</strong> e calcular a média aritmética obtida, a ocorrência de valores extremos como $1.0$ ou $6.0$ torna-se praticamente impossível, pois exigiria que todos os 30 dados resultassem simultaneamente na mesma face. A esmagadora maioria das médias amostrais se concentrará ao redor de $3.5$.
          </p>

          <p>
            Ao repetir essa coleta centenas ou milhares de vezes, o histograma de médias desenha com precisão analítica uma curva suave em sino (a curva Normal ou Gaussiana), mesmo que os dados populacionais de origem fossem discretos, uniformes, binários ou fortemente assimétricos. O Teorema Central do Limite é a lei universal que formaliza essa emergência assintótica.
          </p>

          <!-- Decodificação de Termos em Blockquote Identificado -->
          <blockquote class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-900 dark:border-slate-100 my-4 space-y-3 not-italic">
            <div class="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              <span>Decodificação de Notação e Termos</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400">
              Para assegurar uma compreensão sólida antes de abordar as equações formais, decodificamos a notação matemática símbolo por símbolo:
            </p>

            <ul class="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li class="p-2.5 rounded-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <strong class="text-slate-900 dark:text-white font-mono">$X_1, X_2, \\dots, X_n$:</strong> 
                Representa uma sequência de medições numéricas aleatórias. Diferente de uma incógnita clássica de álgebra ($x + 2 = 5$), uma <em>variável aleatória</em> é uma função que quantifica desfechos incertos (como o tempo de resposta de um servidor ou a receita de uma transação).
              </li>

              <li class="p-2.5 rounded-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <strong class="text-slate-900 dark:text-white font-mono">${termHint("iid")}:</strong> 
                Significa que cada observação $X_i$ não sofre interferência dos valores anteriores (independência) e que todas foram produzidas sob a mesma lei de probabilidade populacional no mesmo ${termHint("espaco-probabilidade")}.
              </li>

              <li class="p-2.5 rounded-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <strong class="text-slate-900 dark:text-white font-mono">Esperança e Variância Populacionais:</strong> 
                A população geradora possui média teórica ${termHint("esperanca")} dada por $\\mathbb{E}[X_i] = \\mu$, e dispersão dada pela ${termHint("variancia")} $\\operatorname{Var}(X_i) = \\sigma^2 > 0$, com ${termHint("desvio-padrao")} $\\sigma$.
              </li>
            </ul>
          </blockquote>

          <!-- Média Amostral e Momentos -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              A Média Amostral e o Erro Padrão
            </h3>
            <p>
              Definimos a <strong>média amostral</strong> $\\bar{X}_n$ como a combinação linear das $n$ observações coletadas:
            </p>

            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center font-mono my-2">
              $$\\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^n X_i$$
            </div>

            <p>
              Pela linearidade da esperança matemática e pela propriedade aditiva da variância para variáveis independentes, os momentos teóricos de primeira e segunda ordem da média amostral são dados por:
            </p>

            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center font-mono my-2 space-y-2">
              $$\\mathbb{E}[\\bar{X}_n] = \\mu$$
              $$\\operatorname{Var}(\\bar{X}_n) = \\frac{\\sigma^2}{n} \\implies \\operatorname{SE}(\\bar{X}_n) = \\frac{\\sigma}{\\sqrt{n}}$$
            </div>

            <p>
              Onde $\\operatorname{SE}(\\bar{X}_n)$ representa o ${termHint("erro-padrao")} (<em>Standard Error</em>).
            </p>

            <div class="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-xs text-amber-900 dark:text-amber-300">
              <strong>Distinção Epistemológica Crítica:</strong>
              Enquanto a Lei Fraca dos Grandes Números (${termHint("convergencia-probabilidade")}, $\\bar{X}_n \\xrightarrow{P} \\mu$) estabelece <em>onde</em> a média amostral irá convergir (para a constante $\\mu$), o Teorema Central do Limite (${termHint("convergencia-distribuicao")}) estabelece <em>qual é a forma geométrica exata das flutuações amostrais</em> ao redor de $\\mu$ para valores finitos de $n$.
            </div>
          </div>

          <!-- Enunciado Formal de Lindeberg-Lévy -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Enunciado Formal de Lindeberg-Lévy
            </h3>

            <p>
              A versão clássica de Lindeberg-Lévy estabelece que, ao subtrair a média $\\mu$ (centralização em zero) e dividir pelo erro padrão $\\sigma / \\sqrt{n}$ (escala unitária), a variável resultante $Z_n$ converge em distribuição para a ${termHint("normal-padrao")} $\\mathcal{N}(0, 1)$:
            </p>

            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center font-mono my-3">
              $$Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} = \\frac{\\sum_{i=1}^n X_i - n\\mu}{\\sigma \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1)$$
            </div>

            <p>
              Em termos da ${termHint("funcao-distribuicao-acumulada")} (CDF) $\\Phi(z)$:
            </p>

            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center font-mono my-3">
              $$\\lim_{n \\to \\infty} P\\left( \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\le z \\right) = \\Phi(z) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-\\frac{t^2}{2}} \\, dt$$
            </div>

            <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border-l-4 border-slate-900 dark:border-slate-200 text-xs text-slate-600 dark:text-slate-300">
              <strong>Universalidade da Forma:</strong> Nenhuma premissa é imposta sobre a geometria da distribuição populacional de origem $X_i$. Ela pode ser exponencial, bimodal, discreta ou assimétrica; desde que sua variância $\\sigma^2$ seja finita, a distribuição da média amostral $\\bar{X}_n$ será assintoticamente normal para amostras razoáveis (empiricamente $n \\ge 30$).
            </div>
          </div>
        </section>

        <!-- Seção 3: Aplicação Prática em Ciência de Dados -->
        <section id="sec-aplicacoes-praticas" class="space-y-4 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              3. Exemplificação e Aplicações no Mundo Real
            </h2>
          </div>

          <p>
            O Teorema Central do Limite é o motor analítico que viabiliza a inferência estatística no dia a dia da Ciência de Dados:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Testes A/B em Plataformas Digitais
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Ao avaliar taxas de conversão ou engajamento de usuários, as distribuições individuais são puramente binárias (Bernoulli) ou fortemente assimétricas. O TCL assegura que a diferença entre médias amostrais $(\\bar{X}_A - \\bar{X}_B)$ segue uma curva Normal, viabilizando o ${termHint("teste-z")}$, o cálculo exato do ${termHint("p-valor")} e o controle do ${termHint("nivel-significancia")} $\\alpha$.
              </p>
            </div>

            <div class="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Intervalos de Confiança para Métricas
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Permite construir intervalos de confiança analíticos confiáveis para a verdadeira média populacional $\\mu$ a um nível de confiança $(1 - \\alpha)$:
              </p>
              <div class="font-mono text-center text-xs py-1">
                $$\\operatorname{IC}_{1-\\alpha} = \\left[ \\bar{x} - z_{\\alpha/2} \\frac{s}{\\sqrt{n}}, \\; \\bar{x} + z_{\\alpha/2} \\frac{s}{\\sqrt{n}} \\right]$$
              </div>
            </div>
          </div>
        </section>

        <!-- Seção 4: Referências Bibliográficas Canônicas com Links Funcionais -->
        <section id="sec-referencias-bibliograficas" class="space-y-4 scroll-mt-24 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              4. Referências Bibliográficas Canônicas
            </h2>
          </div>

          <ul class="space-y-3 text-xs">
            <li class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-slate-900 dark:text-white">De Moivre, A. (1738).</span>
              <em>The Doctrine of Chances: Or, A Method of Calculating the Probabilities of Events in Play</em>. 2ª Edição, Londres: H. Woodfall.  
              <a href="https://archive.org/details/doctrineofchance00moiv" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 mt-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline font-mono text-[11px]">
                <span>https://archive.org/details/doctrineofchance00moiv (Internet Archive)</span>
                ${Icons.arrowRight("w-3 h-3")}
              </a>
            </li>

            <li class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-slate-900 dark:text-white">Laplace, P.-S. (1810).</span>
              <em>Mémoire sur les approximations des formules qui sont fonctions de très grands nombres et sur leur application aux probabilités</em>. Publié dans les <em>Oeuvres complètes de Laplace</em>, Tome 12. Paris: Gauthier-Villars.  
              <a href="https://archive.org/details/oeuvrescomplte12lapluoft" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 mt-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline font-mono text-[11px]">
                <span>https://archive.org/details/oeuvrescomplte12lapluoft (Internet Archive)</span>
                ${Icons.arrowRight("w-3 h-3")}
              </a>
            </li>

            <li class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-slate-900 dark:text-white">Lyapunov, A. (1901).</span>
              <em>Nouvelle forme du théorème sur la limite de probabilité</em>. Mémoires de l'Académie Impériale des Sciences de Saint-Pétersbourg, 12(5), pp. 1–24.  
              <a href="https://eudml.org/doc/224219" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 mt-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline font-mono text-[11px]">
                <span>https://eudml.org/doc/224219 (European Digital Mathematics Library)</span>
                ${Icons.arrowRight("w-3 h-3")}
              </a>
            </li>

            <li class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span class="font-bold text-slate-900 dark:text-white">Casella, G., & Berger, R. L. (2002).</span>
              <em>Statistical Inference</em>. 2ª Edição, Duxbury Advanced Series. Cengage Learning. ISBN 978-0534243128.  
              <a href="https://openlibrary.org/isbn/9780534243128" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 mt-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline font-mono text-[11px]">
                <span>https://openlibrary.org/isbn/9780534243128 (Open Library)</span>
                ${Icons.arrowRight("w-3 h-3")}
              </a>
            </li>
          </ul>
        </section>

        <!-- Seção 5: Laboratório Interativo Integrado -->
        <section id="sec-laboratorio-interativo" class="space-y-4 scroll-mt-24 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Bancada Experimental</span>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                5. Laboratório Interativo: Simulação Empírica do TCL
              </h2>
            </div>
          </div>

          <div id="embedded-lab-slot"></div>
        </section>

      </article>

      <!-- Coluna Direita: Sumário Lateral Sticky com Fundo Transparente -->
      <aside id="chapter-toc-slot" class="hidden lg:block w-56 shrink-0 sticky top-24 self-start"></aside>
    </div>
  `;

  // Seções para o TOC
  const sections = [
    { id: "sec-origem-historica", title: "Origem e História", level: 2 },
    { id: "sec-formulacao-matematica", title: "Formulação Matemática", level: 2 },
    { id: "sec-aplicacoes-praticas", title: "Aplicações Práticas", level: 2 },
    { id: "sec-referencias-bibliograficas", title: "Referências Canônicas", level: 2 },
    { id: "sec-laboratorio-interativo", title: "Laboratório Interativo", level: 2 }
  ];

  // Renderizar o TOC
  const tocSlot = container.querySelector("#chapter-toc-slot");
  const articleEl = container.querySelector("#chapter-article");
  const tocComponent = renderChapterToc(sections, articleEl);
  tocSlot.appendChild(tocComponent);

  // Renderizar o Laboratório Embutido
  const labSlot = container.querySelector("#embedded-lab-slot");
  const labMeta = getLabById(chapter.labId);
  if (labMeta && labMeta.render) {
    labSlot.appendChild(labMeta.render());
  }

  // Renderizar expressões matemáticas KaTeX e inicializar dicas de glossário
  setTimeout(() => {
    renderMath(articleEl);
    initGlossaryTooltips(articleEl);
  }, 10);
}

function renderStandardChapter(container, axis, chapter) {
  const labMeta = chapter.hasLab && chapter.labId ? getLabById(chapter.labId) : null;

  container.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
      <div class="flex items-center gap-1.5 truncate">
        <a href="#overview" class="hover:text-slate-900 dark:hover:text-white transition-colors">Início</a>
        <span>/</span>
        <a href="#axis/${axis.id}" class="hover:text-slate-900 dark:hover:text-white transition-colors truncate">
          Eixo ${axis.number}: ${axis.title}
        </a>
        <span>/</span>
        <span class="text-slate-800 dark:text-slate-200 font-semibold truncate">Capítulo ${chapter.number}</span>
      </div>
      <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        ${chapter.status === "in_progress" ? "Laboratório Disponível" : "Currículo Mapeado"}
      </span>
    </div>

    <article id="chapter-article" class="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
      <header class="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-2 text-xs font-mono text-slate-400 font-bold uppercase">
          <span>Eixo ${axis.number} &bull; Capítulo ${chapter.number}</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${chapter.title}
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ${chapter.shortDesc}
        </p>
      </header>

      ${labMeta ? `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Laboratório Interativo Integrado</h3>
            <a href="#labs/${labMeta.id}" class="text-xs text-slate-500 hover:underline">Abrir no Hub de Labs &rarr;</a>
          </div>
          <div id="embedded-lab-slot"></div>
        </div>
      ` : `
        <div class="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p class="text-xs text-slate-500">
            A redação didática e o simulador deste capítulo estão programados conforme o cronograma do <a href="#tracking" class="font-bold underline">Status do Currículo (TRACKING.md)</a>.
          </p>
          <div class="flex items-center justify-center gap-3 pt-1">
            <a href="#tracking" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold">
              <span>Acessar Painel de Status</span>
            </a>
            <a href="#overview" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline">
              ${Icons.arrowLeft("w-3.5 h-3.5")}
              <span>Explorar Outros Capítulos</span>
            </a>
          </div>
        </div>
      `}
    </article>
  `;

  if (labMeta) {
    const slot = container.querySelector("#embedded-lab-slot");
    if (slot) slot.appendChild(labMeta.render());
  }

  setTimeout(() => {
    renderMath(container.querySelector("#chapter-article"));
  }, 10);
}
