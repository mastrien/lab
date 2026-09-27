// Capítulo 1.2: Cálculo Multivariável e Otimização Numérica
// Redigido estritamente conforme a skill canônica 'didactic-technical-writing'

import { getLabById } from "../../../labs/registry.js";
import { renderChapterToc } from "../../../components/ChapterToc.js";
import { renderMath } from "../../../utils/mathRenderer.js";
import { termHint, initGlossaryTooltips } from "../../../components/GlossaryTooltip.js";
import { Icons } from "../../../components/Icons.js";

export function renderCalculusOptChapter(container, axis, chapter) {
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
        Capítulo Canônico
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
            A mecânica analítica e algorítmica para ajuste de modelos: gradientes, matrizes Jacobiana e Hessiana, curvas de nível e a convergência de otimizadores numéricos do SGD ao Adam.
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
            O cálculo diferencial multivariável e a otimização numérica constituem o verdadeiro coração motor do aprendizado de máquina moderno. Longe de ser uma disciplina abstrata desenvolvida no vácuo, sua gênese histórica foi impulsionada por uma necessidade física premente: <em>encontrar estados de energia mínima, prever órbitas planetárias e resolver sistemas de equações simultâneas não-lineares</em> para os quais inexistia qualquer fórmula algébrica fechada.
          </p>

          <p>
            O nascimento do algoritmo de <strong>Descida de Gradiente</strong> (<em>Steepest Descent</em>) ocorreu em 1847, quando o matemático francês <strong>Augustin-Louis Cauchy</strong> apresentou à Academia de Ciências de Paris sua memória intitulada <a href="https://gallica.bnf.fr/ark:/12148/bpt6k2982c/f540.item" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Méthode générale pour la résolution des systèmes d'équations simultanées</em></a> (Comptes Rendus, Tomo XXV, pp. 536–538). Cauchy enfrentava o desafio de resolver extensos sistemas de equações astronômicas não lineares e concebeu uma estratégia iterativa geométrica elegante: em vez de buscar a solução analítica exata de uma só vez, propôs avaliar a função em um ponto arbitrário e dar pequenos passos sucessivos na direção do maior declive descendente, dada pelo negativo do ${termHint("gradiente")}.
          </p>

          <p>
            Paralelamente, a formalização das derivadas de sistemas multivariados com múltiplas saídas foi desenvolvida pelo matemático prussiano <strong>Carl Gustav Jacob Jacobi</strong> em 1841, em seu célebre tratado <a href="https://eudml.org/doc/147137" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>De determinantibus functionalibus</em></a> (Crelle's Journal, Vol. 22, pp. 319–359). Jacobi estruturou as transformações infinitesimais entre sistemas de coordenadas multidimensionais, criando a ${termHint("jacobiana")} — a ferramenta que viria a se tornar a base rigorosa da regra da cadeia multivariada e da retropropagação em redes neurais.
          </p>

          <p>
            A análise da curvatura de segunda ordem e das condições de convexidade de superfícies contínuas foi consolidada por <strong>Ludwig Otto Hesse</strong> em 1857 (<a href="https://eudml.org/doc/147688" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Über die Criterien des Maximums und Minimums der einfachen Integrale</em></a>, Crelle's Journal, Vol. 54). Hesse formalizou a matriz simétrica de segundas derivadas que hoje leva seu nome (${termHint("hessiana")}), estabelecendo critérios definitivos para classificar se um ponto crítico com gradiente nulo é um mínimo estável, um máximo ou um ${termHint("ponto-sela")}.
          </p>

          <p>
            No século XX, com o surgimento da computação eletrônica e a expansão de massas de dados incompletos ou ruidosos, a descida de gradiente exata de Cauchy revelou-se computacionalmente inviável para grandes volumes de observações. Em 1951, os estatísticos <strong>Herbert Robbins</strong> e <strong>Sutton Monro</strong> publicaram o artigo fundador <a href="https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-22/issue-3/A-Stochastic-Approximation-Method/10.1214/aoms/1177729586.full" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>A Stochastic Approximation Method</em></a> (Annals of Mathematical Statistics, Vol. 22, No. 3), inaugurando a <em>Descida de Gradiente Estocástica (SGD)</em>. Robbins e Monro provaram matematicamente que é possível convergir assintoticamente para o mínimo global estimando o gradiente a partir de uma única observação ruidosa por vez. Essa linhagem culminou em 2014, quando <strong>Diederik Kingma</strong> e <strong>Jimmy Ba</strong> introduziram o otimizador ${termHint("adam")} (<a href="https://arxiv.org/abs/1412.6980" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Adam: A Method for Stochastic Optimization</em></a>, arXiv:1412.6980), que se consolidou como o algoritmo padrão de treinamento dos grandes modelos de linguagem e redes profundas atuais.
          </p>
        </section>

        <!-- Seção 2: Fundamentação Teórica e Formulação Matemática -->
        <section id="sec-formulacao-matematica" class="space-y-6 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              2. Fundamentação Teórica e Formulação Matemática
            </h2>
          </div>

          <!-- Ramp-up Didático no Fluxo Principal -->
          <p>
            Para construir uma intuição sólida sobre o cálculo multivariável aplicado ao aprendizado de máquina, imagine-se no topo de uma cordilheira montanhosa coberta por uma névoa impenetrável. Sua missão é alcançar o ponto mais baixo do vale (onde o erro do modelo é mínimo). Como a neblina impede que você enxergue o vale ao longe, a única informação disponível é a inclinação do terreno imediatamente sob as solas das suas botas.
          </p>

          <p>
            Se você der um passo para a frente, o terreno sobe; se der um passo para a esquerda, ele desce suavemente; se der um passo na diagonal sudeste, ele despenca vertiginosamente. O ${termHint("gradiente")} é exatamente o instrumento matemático que sintetiza todas essas inclinações direcionais em uma única seta: ele aponta com rigor para onde a montanha sobe com maior rapidez. Consequentemente, para descer até a base do vale, tudo o que você precisa fazer é caminhar na direção exatamente oposta ao gradiente: $-\\nabla f$.
          </p>

          <p>
            Entretanto, paisagens de custo reais raramente são tigelas perfeitamente esféricas. Elas contêm ravinas alongadas e sinuosas — vales com encostas laterais íngremes, mas com inclinação quase nula ao longo do fundo. Nesses terrenos anisotrópicos, um caminhante imprudente que dê passos muito largos oscilará descontroladamente de uma encosta para a outra, sem conseguir avançar pelo fundo do vale. É aqui que entram a taxa de aprendizado, a curvatura de segunda ordem da Hessiana e os mecanismos modernos de ${termHint("momentum")} e amortecimento adaptativo.
          </p>

          <!-- Decodificação de Notação e Termos em Blockquote Identificado -->
          <blockquote class="p-4 rounded-r-lg border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-3 not-italic">
            <div class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>Decodificação de Notação e Termos:</span>
            </div>
            <ul class="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
              <li>
                <strong>$\\nabla f(\\mathbf{x}) \\in \\mathbb{R}^n$:</strong> O ${termHint("gradiente")} de uma função escalar $f: \\mathbb{R}^n \\to \\mathbb{R}$, vetor que reúne todas as derivadas parciais de primeira ordem e aponta na direção de máximo crescimento.
              </li>
              <li>
                <strong>$\\frac{\\partial f}{\\partial x_i}$:</strong> A ${termHint("derivada-parcial")} de $f$ com respeito à variável $x_i$, medindo a taxa de variação instantânea ao alterar apenas $x_i$, mantendo fixas todas as demais variáveis.
              </li>
              <li>
                <strong>$\\mathbf{J}_f \\in \\mathbb{R}^{m \\times n}$:</strong> A ${termHint("jacobiana")}, matriz contendo as derivadas de todas as saídas de uma função vetorial $\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m$, base de diferenciação em cadeia para o treinamento de redes neurais.
              </li>
              <li>
                <strong>$\\mathbf{H}_f \\in \\mathbb{R}^{n \\times n}$:</strong> A ${termHint("hessiana")}, matriz quadrada simétrica de derivadas de segunda ordem $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$, que descreve a curvatura geométrica local da superfície de perda.
              </li>
              <li>
                <strong>$\\alpha > 0$:</strong> A ${termHint("taxa-aprendizado")}, hiperparâmetro escalar que governa a distância percorrida a cada iteração na direção oposta ao gradiente.
              </li>
              <li>
                <strong>$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\nabla L(\\mathbf{w}_t)$:</strong> A equação fundamental de atualização da ${termHint("descida-gradiente")} no instante iterativo $t$.
              </li>
              <li>
                <strong>Ponto Crítico:</strong> Coordenada $\\mathbf{w}^*$ onde o vetor gradiente se anula identicamente ($\\nabla f(\\mathbf{w}^*) = \\mathbf{0}$), podendo constituir um mínimo local, máximo local ou ${termHint("ponto-sela")}.
              </li>
            </ul>
          </blockquote>

          <!-- Subseção 2.1: Vetor Gradiente -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.1 Derivadas Parciais, o Vetor Gradiente e a Geometria das Curvas de Nível
            </h3>

            <p>
              Seja $f: \\mathbb{R}^n \\to \\mathbb{R}$ uma função multivariada diferenciável. A ${termHint("derivada-parcial")} de $f$ com respeito à $i$-ésima coordenada $x_i$ no ponto $\\mathbf{x} = (x_1, \\dots, x_n)^\\top$ é definida como o limite formal:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\frac{\\partial f}{\\partial x_i}(\\mathbf{x}) = \\lim_{h \\to 0} \\frac{f(x_1, \\dots, x_i + h, \\dots, x_n) - f(x_1, \\dots, x_i, \\dots, x_n)}{h}$$
            </div>

            <p>
              Agrupando todas as $n$ derivadas parciais em um vetor coluna, obtemos o <strong>vetor gradiente</strong> $\\nabla f(\\mathbf{x})$:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\nabla f(\\mathbf{x}) = \\begin{pmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\frac{\\partial f}{\\partial x_2}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_n}(\\mathbf{x}) \\end{pmatrix} \\in \\mathbb{R}^n$$
            </div>

            <p>
              A derivada direcional de $f$ ao longo de um vetor unitário arbitrário $\\mathbf{u}$ ($\\|\\mathbf{u}\\|_2 = 1$) é expressa pelo produto escalar:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$D_{\\mathbf{u}} f(\\mathbf{x}) = \\nabla f(\\mathbf{x}) \\cdot \\mathbf{u} = \\|\\nabla f(\\mathbf{x})\\|_2 \\|\\mathbf{u}\\|_2 \\cos(\\theta) = \\|\\nabla f(\\mathbf{x})\\|_2 \\cos(\\theta)$$
            </div>

            <p>
              Como $\\cos(\\theta)$ assume seu valor máximo absoluto igual a $+1$ quando $\\theta = 0$, a taxa de crescimento da função atinge seu pico máximo exatamente quando $\\mathbf{u}$ aponta na direção de $\\nabla f(\\mathbf{x})$. Analogamente, quando $\\theta = \\pi$ ($180^\\circ$), temos $\\cos(\\theta) = -1$, o que demonstra analiticamente que <strong>o vetor oposto $-\\nabla f(\\mathbf{x})$ aponta para a direção de maior decrescimento instantâneo</strong>.
            </p>

            <p>
              Adicionalmente, considere uma curva de nível definida pelo conjunto de pontos onde a função assume um valor constante $c$: $\\mathcal{S}_c = \\{\\mathbf{x} \\in \\mathbb{R}^n \\mid f(\\mathbf{x}) = c\\}$. Ao longo de qualquer curva parametrizada $\\mathbf{r}(t)$ contida nessa superfície de nível, temos $f(\\mathbf{r}(t)) = c$. Pela regra da cadeia:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\frac{d}{dt} f(\\mathbf{r}(t)) = \\nabla f(\\mathbf{r}(t)) \\cdot \\mathbf{r}'(t) = 0$$
            </div>

            <p>
              Como $\\mathbf{r}'(t)$ é um vetor tangente à curva de nível, a equação demonstra que <strong>o vetor gradiente $\\nabla f$ é estritamente ortogonal (perpendicular) às curvas e superfícies de nível</strong>.
            </p>

            <!-- Demonstração Animada em Vídeo (Manim): Gradiente e Curvas de Nível -->
            <figure class="flex flex-col items-center justify-center my-6">
              <div class="w-full max-w-xl aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
                <video controls autoplay loop muted playsinline class="w-full h-full object-cover block">
                  <source src="assets/videos/gradientecurvasnivel.mp4" type="video/mp4">
                  Seu navegador não suporta a tag de vídeo.
                </video>
              </div>
              <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md">
                Demonstração visual do vetor gradiente $\\nabla f(\\mathbf{x})$: ortogonalidade rigorosa em relação à reta tangente da curva de nível e a oposição entre a direção de maior subida ($+\\nabla f$) e a de maior descida ($-\\nabla f$).
              </figcaption>
            </figure>
          </div>

          <!-- Subseção 2.2: Matriz Jacobiana -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.2 A Matriz Jacobiana e a Regra da Cadeia Multivariada
            </h3>

            <p>
              Quando passamos de uma função escalar para uma função vetorial com múltiplas saídas $\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m$, composta por $m$ funções escalares coordenadas $\\mathbf{f}(\\mathbf{x}) = (f_1(\\mathbf{x}), f_2(\\mathbf{x}), \\dots, f_m(\\mathbf{x}))^\\top$, a derivada de primeira ordem deixa de ser um único vetor e passa a ser uma matriz completa: a ${termHint("jacobiana")} $\\mathbf{J}_f \\in \\mathbb{R}^{m \\times n}$.
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{J}_f(\\mathbf{x}) = \\begin{pmatrix} 
                \\frac{\\partial f_1}{\\partial x_1} & \\frac{\\partial f_1}{\\partial x_2} & \\dots & \\frac{\\partial f_1}{\\partial x_n} \\\\[6pt]
                \\frac{\\partial f_2}{\\partial x_1} & \\frac{\\partial f_2}{\\partial x_2} & \\dots & \\frac{\\partial f_2}{\\partial x_n} \\\\[6pt]
                \\vdots & \\vdots & \\ddots & \\vdots \\\\[6pt]
                \\frac{\\partial f_m}{\\partial x_1} & \\frac{\\partial f_m}{\\partial x_2} & \\dots & \\frac{\\partial f_m}{\\partial x_n}
              \\end{pmatrix}$$
            </div>

            <p>
              A linha $i$ da Jacobiana corresponde exatamente ao vetor gradiente transposto da $i$-ésima função coordenada: $\\nabla f_i(\\mathbf{x})^\\top$. Geometricamente, a Jacobiana representa a melhor aproximação linear da transformação vetorial nas vizinhanças do ponto $\\mathbf{x}$:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{f}(\\mathbf{x} + \\Delta \\mathbf{x}) \\approx \\mathbf{f}(\\mathbf{x}) + \\mathbf{J}_f(\\mathbf{x}) \\Delta \\mathbf{x}$$
            </div>

            <p>
              O poder supremo da Jacobiana na Ciência de Dados revela-se na composição de funções. Se tivermos $\\mathbf{y} = \\mathbf{f}(\\mathbf{x})$ e $\\mathbf{z} = \\mathbf{g}(\\mathbf{y})$, a função composta $\\mathbf{h}(\\mathbf{x}) = (\\mathbf{g} \\circ \\mathbf{f})(\\mathbf{x})$ possui como derivada o produto direto das matrizes Jacobianas:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{J}_{\\mathbf{g} \\circ \\mathbf{f}}(\\mathbf{x}) = \\mathbf{J}_\\mathbf{g}(\\mathbf{f}(\\mathbf{x})) \\cdot \\mathbf{J}_\\mathbf{f}(\\mathbf{x})$$
            </div>

            <p>
              Essa identidade matricial elegante é o mecanismo matemático exato que viabiliza o algoritmo de <strong>Retropropagação (Backpropagation)</strong> em redes neurais de dezenas ou centenas de camadas: propagar erros das saídas em direção às entradas consiste em multiplicar sucessivas matrizes Jacobianas locais através da cadeia de tensores da arquitetura.
            </p>
          </div>

          <!-- Subseção 2.3: Matriz Hessiana -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.3 A Matriz Hessiana, Curvatura de Segunda Ordem e Pontos de Sela
            </h3>

            <p>
              Enquanto o gradiente nos informa a inclinação linear da superfície, a ${termHint("hessiana")} descreve a sua <strong>curvatura quadrática</strong>. Para uma função duas vezes diferenciável $f: \\mathbb{R}^n \\to \\mathbb{R}$, a Hessiana $\\mathbf{H}_f(\\mathbf{x}) \\in \\mathbb{R}^{n \\times n}$ é a matriz de segundas derivadas parciais:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{H}_f(\\mathbf{x}) = \\begin{pmatrix} 
                \\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\dots & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_n} \\\\[6pt]
                \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2} & \\dots & \\frac{\\partial^2 f}{\\partial x_2 \\partial x_n} \\\\[6pt]
                \\vdots & \\vdots & \\ddots & \\vdots \\\\[6pt]
                \\frac{\\partial^2 f}{\\partial x_n \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_n \\partial x_2} & \\dots & \\frac{\\partial^2 f}{\\partial x_n^2}
              \\end{pmatrix}$$
            </div>

            <p>
              Pelo Teorema de Clairaut-Schwarz, se as derivadas parciais mistas forem contínuas, a ordem de derivação é indiferente ($\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$), o que torna a matriz Hessiana estritamente <strong>simétrica</strong> ($\\mathbf{H} = \\mathbf{H}^\\top$).
            </p>

            <p>
              A expansão em Série de Taylor de segunda ordem de $f$ em torno de um ponto $\\mathbf{x}$ é dada por:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$f(\\mathbf{x} + \\mathbf{p}) \\approx f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^\\top \\mathbf{p} + \\frac{1}{2} \\mathbf{p}^\\top \\mathbf{H}_f(\\mathbf{x}) \\mathbf{p}$$
            </div>

            <p>
              Em um ponto crítico $\\mathbf{x}^*$ onde $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$, o termo linear desaparece e o comportamento local da função é inteiramente determinado pela forma quadrática $\\mathbf{p}^\\top \\mathbf{H} \\mathbf{p}$, classificada pelos autovalores $\\{\\lambda_1, \\lambda_2, \\dots, \\lambda_n\\}$ de $\\mathbf{H}$:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div class="p-3 rounded border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
                <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">$\\mathbf{H} \\succ 0$ (Definida Positiva)</span>
                <p class="text-slate-600 dark:text-slate-400">Todos os autovalores $\\lambda_i > 0$. A curvatura sobe em todas as direções; o ponto $\\mathbf{x}^*$ é um <strong>mínimo local estrito</strong>.</p>
              </div>
              <div class="p-3 rounded border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20">
                <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">$\\mathbf{H} \\prec 0$ (Definida Negativa)</span>
                <p class="text-slate-600 dark:text-slate-400">Todos os autovalores $\\lambda_i < 0$. A curvatura desce em todas as direções; o ponto $\\mathbf{x}^*$ é um <strong>máximo local estrito</strong>.</p>
              </div>
              <div class="p-3 rounded border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
                <span class="font-bold text-amber-800 dark:text-amber-300 block mb-1">$\\mathbf{H}$ Indefinida</span>
                <p class="text-slate-600 dark:text-slate-400">Existem autovalores positivos e negativos simultâneos. O ponto $\\mathbf{x}^*$ é um ${termHint("ponto-sela")} (mínimo em algumas direções, máximo em outras).</p>
              </div>
            </div>

            <p class="pt-2">
              Em modelos de alta dimensão (como redes neurais com milhões de parâmetros), mínimos locais ruins são estatisticamente raros; o principal obstáculo à convergência são os <strong>pontos de sela e platôs quase-planos</strong>, onde o gradiente se anula e otimizadores ingênuos estagnam indefinidamente.
            </p>
          </div>

          <!-- Subseção 2.4: Algoritmos de Otimização Numérica -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.4 A Evolução dos Algoritmos: Do Gradiente em Lote ao Otimizador Adam
            </h3>

            <p>
              Em aprendizado de máquina, ajustamos parâmetros $\\mathbf{w}$ para minimizar uma função de perda empírica $L(\\mathbf{w}) = \\frac{1}{N} \\sum_{i=1}^N \\ell(f(\\mathbf{x}_i; \\mathbf{w}), y_i)$. Ao longo das décadas, a comunidade desenvolveu uma família de algoritmos que refinam sucessivamente a descida clássica:
            </p>

            <div class="space-y-3 text-xs">
              
              <!-- 1. Batch GD -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white text-xs">1. Descida de Gradiente em Lote (Batch Gradient Descent)</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-300">Determinístico &bull; $\\mathcal{O}(N)$</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Calcula o gradiente exato sobre todas as $N$ amostras do dataset a cada iteração:
                </p>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\left( \\frac{1}{N} \\sum_{i=1}^N \\nabla \\ell_i(\\mathbf{w}_t) \\right)$$
                </div>
                <p class="text-slate-500 text-[11px]">
                  <strong>Vantagem:</strong> Trajetória suave e determinística. <strong>Desvantagem:</strong> Computacionalmente proibitivo para Big Data e facilmente aprisionado em pontos de sela.
                </p>
              </div>

              <!-- Demonstração Animada em Vídeo (Manim): Trajetória da Descida de Gradiente -->
              <figure class="flex flex-col items-center justify-center my-6">
                <div class="w-full max-w-xl aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
                  <video controls autoplay loop muted playsinline class="w-full h-full object-cover block">
                    <source src="assets/videos/descidagradiente.mp4" type="video/mp4">
                    Seu navegador não suporta a tag de vídeo.
                  </video>
                </div>
                <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md">
                  Convergência da descida de gradiente: passos sucessivos $\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\nabla L(\\mathbf{w}_t)$ em direção ao centro ótimo, com amortecimento gradual do comprimento dos passos conforme a norma do gradiente decresce.
                </figcaption>
              </figure>

              <!-- 2. SGD & Mini-batch -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white text-xs">2. Gradiente Estocástico (SGD) e Mini-Batch SGD</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-300">Estocástico &bull; $\\mathcal{O}(B)$</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Aproxima o gradiente populacional a partir de um subconjunto aleatório de tamanho restrito $B \\ll N$ (mini-batch, ex: $B = 32, 64, 256$):
                </p>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\alpha \\left( \\frac{1}{B} \\sum_{i \\in \\mathcal{B}_t} \\nabla \\ell_i(\\mathbf{w}_t) \\right)$$
                </div>
                <p class="text-slate-500 text-[11px]">
                  <strong>Efeito Didático:</strong> O ruído amostral do mini-batch sacode os parâmetros, auxiliando o modelo a escapar de pontos de sela e mínimos locais superficiais.
                </p>
              </div>

              <!-- 3. Momentum -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white text-xs">3. Otimizador com Momento de Polyak (${termHint("momentum")})</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-300">Inercial &bull; $\\beta \\approx 0.9$</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Acumula uma média móvel exponencial das velocidades passadas, conferindo inércia física ao algoritmo:
                </p>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\mathbf{v}_{t+1} = \\beta \\mathbf{v}_t + \\alpha \\nabla L(\\mathbf{w}_t), \\quad \\mathbf{w}_{t+1} = \\mathbf{w}_t - \\mathbf{v}_{t+1}$$
                </div>
                <p class="text-slate-500 text-[11px]">
                  <strong>Efeito Didático:</strong> Cancela oscilações transversais em ravinas estreitas e acelera o avanço nas direções onde o gradiente aponta persistentemente para o mesmo lado.
                </p>
              </div>

              <!-- 4. Adam -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white text-xs">4. Adaptive Moment Estimation (${termHint("adam")})</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-300">Taxa Adaptativa &bull; Kingma & Ba</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Rastreia simultaneamente o primeiro momento (média ponderada dos gradientes $\\mathbf{m}_t$) e o segundo momento não-centrado (variância $\\mathbf{v}_t$), aplicando correções de viés para as primeiras iterações:
                </p>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\mathbf{m}_t = \\beta_1 \\mathbf{m}_{t-1} + (1 - \\beta_1) \\mathbf{g}_t, \\quad \\mathbf{v}_t = \\beta_2 \\mathbf{v}_{t-1} + (1 - \\beta_2) \\mathbf{g}_t^2$$
                </div>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\hat{\\mathbf{m}}_t = \\frac{\\mathbf{m}_t}{1 - \\beta_1^t}, \\quad \\hat{\\mathbf{v}}_t = \\frac{\\mathbf{v}_t}{1 - \\beta_2^t}$$
                </div>
                <div class="py-1 text-center font-semibold text-xs font-mono">
                  $$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\frac{\\alpha}{\\sqrt{\\hat{\\mathbf{v}}_t} + \\epsilon} \\odot \\hat{\\mathbf{m}}_t$$
                </div>
                <p class="text-slate-500 text-[11px]">
                  <strong>Efeito Didático:</strong> Parâmetros com gradientes esparsos ou diminutos recebem passos maiores, enquanto coordenadas com variações violentas e instáveis recebem passos amortecidos.
                </p>
              </div>

            </div>
          </div>
        </section>

        <!-- Seção 3: Exemplificação e Aplicações no Mundo Real -->
        <section id="sec-aplicacoes-praticas" class="space-y-6 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              3. Exemplificação e Aplicações em Ciência de Dados
            </h2>
          </div>

          <p>
            O cálculo multivariável e os algoritmos de gradiente não são exercícios teóricos isolados: constituem a engenharia de precisão subjacente ao treinamento de qualquer arquitetura contemporânea de inteligência artificial. Abaixo examinamos quatro cenários reais cruciais:
          </p>

          <div class="space-y-6 text-xs">
            
            <!-- Aplicação 1: GD vs Solução Analítica -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>3.1 OLS Analítico versus Descida de Gradiente: O Limite da Inversão Matricial</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Na Regressão Linear clássica, vimos que a solução analítica ótima é dada pelas Equações Normais: $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^\\top \\mathbf{X})^{-1} \\mathbf{X}^\\top \\mathbf{y}$. No entanto, inverter uma matriz $d \\times d$ possui custo assintótico de $\\mathcal{O}(d^3)$.
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Se tivermos um problema com $100.000$ atributos (comum em genômica, texto ou biometria), calcular $(\\mathbf{X}^\\top \\mathbf{X})^{-1}$ exigiria cerca de $10^{15}$ operações de ponto flutuante e centenas de gigabytes de memória. Em contrapartida, a Descida de Gradiente avalia apenas multiplicações matriz-vetor $\\mathbf{X}^\\top (\\mathbf{X}\\mathbf{w} - \\mathbf{y})$ com custo de $\\mathcal{O}(n \\cdot d)$ por passo, permitindo encontrar parâmetros com precisão de $99.99\\%$ em poucos segundos.
              </p>
            </div>

            <!-- Aplicação 2: Backpropagation -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>3.2 Retropropagação em Redes Neurais Profundas (Backpropagation)</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Em uma rede neural com $L$ camadas, a função de predição é uma composição encadeada de transformações afins e ativações não lineares: $\\hat{\\mathbf{y}} = f_L(f_{L-1}(\\dots f_1(\\mathbf{x})))$. O algoritmo de <em>Backpropagation</em> nada mais é do que a aplicação recursiva da <strong>regra da cadeia da matriz Jacobiana</strong>:
              </p>
              <div class="py-1 text-center font-semibold text-xs font-mono">
                $$\\frac{\\partial L}{\\partial \\mathbf{W}_l} = \\frac{\\partial L}{\\partial \\mathbf{a}_L} \\cdot \\mathbf{J}_{f_L} \\cdot \\dots \\cdot \\mathbf{J}_{f_{l+1}} \\cdot \\frac{\\partial \\mathbf{a}_l}{\\partial \\mathbf{W}_l}$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                A diferenciação reversa em grafo computacional armazena os valores intermediários na passagem direta (forward pass) e reutiliza os produtos das Jacobianas na passagem reversa (backward pass), calculando o gradiente de todos os milhões de pesos com o mesmíssimo custo assintótico de uma simples inferência.
              </p>
            </div>

            <!-- Aplicação 3: O Dilema da Taxa de Aprendizado -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>3.3 Sensibilidade Crítica à Taxa de Aprendizado (Learning Rate $\\alpha$)</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                A escolha de $\\alpha$ é amplamente reconhecida como o hiperparâmetro mais decisivo do aprendizado supervisionado:
              </p>
              <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>$\\alpha$ Excessivamente Pequeno:</strong> O modelo dá passos microscópicos; requer milhares de épocas de GPU, corre risco de estagnação prematura em platôs e eleva dramaticamente o custo financeiro de infraestrutura.</li>
                <li><strong>$\\alpha$ Ideal (Teoria de Lipschitz):</strong> Se a função de perda tiver gradiente $L$-Lipschitz contínuo ($\\|\\nabla f(\\mathbf{x}) - \\nabla f(\\mathbf{y})\\| \\le L\\|\\mathbf{x} - \\mathbf{y}\\|$), a convergência geométrica monótona é matematicamente garantida para $\\alpha < \\frac{2}{L}$.</li>
                <li><strong>$\\alpha$ Excessivamente Grande:</strong> O passo salta além da curvatura do vale, resultando em oscilações com amplitudes crescentes e <em>divergência numérica catastrófica</em> (valores <code>NaN</code> e <code>Infinity</code>).</li>
              </ul>
            </div>

            <!-- Aplicação 4: Treinamento em Larga Escala -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>3.4 Otimização Estocástica em Fluxos Contínuos (Streaming e Big Data)</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Em plataformas como sistemas de recomendação em tempo real (YouTube, Spotify, TikTok) ou detecção de fraudes financeiras bancárias, novas transações chegam continuamente em fluxos ininterruptos (streaming via Apache Kafka).
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Nesse contexto, reprocessar o histórico inteiro é impossível. O Mini-Batch SGD e o Adam permitem <strong>aprendizado contínuo online</strong>: a cada lote de poucas dezenas de transações que chegam na esteira, os pesos do modelo são atualizados instantaneamente em tempo real na memória da GPU sem persistência em disco.
              </p>
            </div>

          </div>
        </section>

        <!-- Seção 4: Referências Bibliográficas Canônicas -->
        <section id="sec-referencias-bibliograficas" class="space-y-4 scroll-mt-24">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              4. Referências Bibliográficas Canônicas
            </h2>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Todas as obras seminais e manuais de referência citados abaixo possuem links canônicos perenes e de livre consulta pública validados:
          </p>

          <ul class="space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800/60">
            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">CAUCHY, Augustin-Louis.</span>
              <span class="text-slate-600 dark:text-slate-300"> Méthode générale pour la résolution des systèmes d'équations simultanées. <em>Comptes Rendus Hebdomadaires des Séances de l'Académie des Sciences</em>, Paris, v. 25, p. 536–538, 1847.</span>
              <div class="mt-1">
                <a href="https://gallica.bnf.fr/ark:/12148/bpt6k2982c/f540.item" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Edição original digitalizada pela Bibliothèque nationale de France (Gallica BnF)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">JACOBI, Carl Gustav Jacob.</span>
              <span class="text-slate-600 dark:text-slate-300"> De determinantibus functionalibus. <em>Journal für die reine und angewandte Mathematik (Crelle's Journal)</em>, v. 22, p. 319–359, 1841.</span>
              <div class="mt-1">
                <a href="https://eudml.org/doc/147137" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Acesso digital via European Digital Mathematics Library (EuDML)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">HESSE, Ludwig Otto.</span>
              <span class="text-slate-600 dark:text-slate-300"> Über die Criterien des Maximums und Minimums der einfachen Integrale. <em>Journal für die reine und angewandte Mathematik (Crelle's Journal)</em>, v. 54, p. 227–273, 1857.</span>
              <div class="mt-1">
                <a href="https://eudml.org/doc/147688" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Acesso digital aberto via EuDML / Crelle's Journal
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">ROBBINS, Herbert; MONRO, Sutton.</span>
              <span class="text-slate-600 dark:text-slate-300"> A Stochastic Approximation Method. <em>The Annals of Mathematical Statistics</em>, v. 22, n. 3, p. 400–407, 1951.</span>
              <div class="mt-1">
                <a href="https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-22/issue-3/A-Stochastic-Approximation-Method/10.1214/aoms/1177729586.full" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Publicação original de acesso aberto no Project Euclid (IMS)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">KINGMA, Diederik P.; BA, Jimmy Lei.</span>
              <span class="text-slate-600 dark:text-slate-300"> Adam: A Method for Stochastic Optimization. In: <em>International Conference on Learning Representations (ICLR)</em>, San Diego, 2015.</span>
              <div class="mt-1">
                <a href="https://arxiv.org/abs/1412.6980" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Repositório de Pré-impressão Aberto (arXiv:1412.6980)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">NOCEDAL, Jorge; WRIGHT, Stephen J.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Numerical Optimization</em>. 2nd ed. New York: Springer-Verlag, 2006.</span>
              <div class="mt-1">
                <a href="https://openlibrary.org/works/OL8160492W/Numerical_Optimization" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Ficha e registro no Open Library
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">GOODFELLOW, Ian; BENGIO, Yoshua; COURVILLE, Aaron.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Deep Learning</em>. Cambridge: MIT Press, 2016.</span>
              <div class="mt-1">
                <a href="https://www.deeplearningbook.org/" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Edição Aberta e Gratuita Online (MIT Press Companion Website)
                </a>
              </div>
            </li>
          </ul>
        </section>

        <!-- Seção 5: Laboratório Interativo Integrado -->
        <section id="sec-laboratorio-interativo" class="space-y-4 scroll-mt-24 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                5. Laboratório Interativo: Otimização Numérica & Descida de Gradiente 2D
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

  // Seções para o TOC dinâmico
  const sections = [
    { id: "sec-origem-historica", title: "Origem e História", level: 2 },
    { id: "sec-formulacao-matematica", title: "Formulação Teórica", level: 2 },
    { id: "sec-aplicacoes-praticas", title: "Aplicações em Dados", level: 2 },
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
