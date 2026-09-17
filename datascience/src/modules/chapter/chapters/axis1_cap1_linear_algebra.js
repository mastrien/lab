// Capítulo 1.1: Álgebra Linear para Dados: Vetores, Matrizes, Espaços Vetoriais e Transformações Lineares
// Redigido estritamente conforme a skill canônica 'didactic-technical-writing'

import { getLabById } from "../../../labs/registry.js";
import { renderChapterToc } from "../../../components/ChapterToc.js";
import { renderMath } from "../../../utils/mathRenderer.js";
import { termHint, initGlossaryTooltips } from "../../../components/GlossaryTooltip.js";
import { Icons } from "../../../components/Icons.js";

export function renderLinearAlgebraChapter(container, axis, chapter) {
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
            A linguagem geométrica e matricial que fundamenta a representação multidimensional de dados, projeções ortogonais e transformações lineares no aprendizado de máquina.
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
            A <strong>Álgebra Linear</strong> é frequentemente apresentada no ensino contemporâneo como uma coleção estática de matrizes e regras de eliminação de variáveis. No entanto, sua gênese histórica foi impulsionada por um desafio científico prático de imensa envergadura: a <em>resolução simultânea de sistemas com dezenas de equações lineares</em> decorrentes da mecânica celeste, agrimensura, astronomia observacional e o estudo de transformações geométricas no espaço.
          </p>

          <p>
            Antes do século XIX, equações lineares eram manipuladas por métodos puramente algébricos manuais e trabalhosos. As primeiras sementes de uma teoria estruturada surgiram de forma independente no Japão e na Europa: em 1683, o matemático japonês <strong>Seki Takakazu</strong> (na obra <em>Kai-fukudai-no-hō</em>) e, dez anos depois, <strong>Gottfried Wilhelm Leibniz</strong> na Alemanha, introduziram arranjos de coeficientes com regras de combinação cruzada para eliminar incógnitas de sistemas lineares sem calcular passo a passo cada variável intermediária — nascia o conceito primordial de ${termHint("determinante")}.
          </p>

          <p>
            A virada conceitual definitiva, contudo, ocorreu quando os matemáticos deixaram de enxergar matrizes apenas como tabelas passivas de números para compreendê-las como <em>operadores dinâmicos</em>. Em 1844, o polímata prussiano <strong>Hermann Grassmann</strong> publicou sua obra visionária <a href="https://archive.org/details/dielinealeausde00grasgoog" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Die Lineale Ausdehnungslehre</em></a> (A Teoria da Extensão Linear). Grassmann introduziu pela primeira vez a ideia revolucionária de que a geometria não precisava se restringir às três dimensões físicas habituais: ele formulou espaços com $n$ dimensões arbitrárias gerados por combinações de direções fundamentais, estabelecendo a base da noção contemporânea de ${termHint("espaco-vetorial")}.
          </p>

          <p>
            Pouco depois, em 1858, o matemático britânico <strong>Arthur Cayley</strong> consolidou formalmente a teoria das matrizes em seu artigo seminal <a href="https://archive.org/details/jstor-108649" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>A Memoir on the Theory of Matrices</em></a> (Philosophical Transactions of the Royal Society of London, Vol. 148, pp. 17-37). Cayley isolou a matriz como um objeto algébrico independente por direito próprio, definindo a adição matricial, a multiplicação e a inversão, chamando atenção para o fato crucial de que o produto matricial não é comutativo ($\mathbf{A}\\mathbf{B} \\neq \\mathbf{B}\\mathbf{A}$). Em 1888, o italiano <strong>Giuseppe Peano</strong> sintetizou essas ideias em axiomas rigorosos em seu tratado geométrico, conferindo à álgebra linear a formulação estrutural que utilizamos até hoje na computação e na inteligência artificial.
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
            Para compreender a álgebra linear na perspectiva da Ciência de Dados, o primeiro passo intuitivo é desmistificar a palavra ${termHint("vetor")}. No cotidiano da computação, um vetor não é apenas uma seta desenhada em um papel: ele é uma lista ordenada de características numéricas que descrevem uma entidade do mundo real.
          </p>

          <p>
            Imagine que estejamos analisando clientes de uma instituição financeira. Para cada indivíduo, registramos três variáveis: a idade em anos, a renda mensal em milhares de reais e a pontuação de crédito de zero a mil. O cliente Ana, com $28$ anos, renda de $6.5$ e score $820$, é representado como um ponto no espaço tridimensional: $\\mathbf{x}_{\\text{Ana}} = (28, \\, 6.5, \\, 820)^\\top$. Se tivermos cinquenta variáveis em vez de três, nada muda conceitualmente: apenas passamos de $\\mathbb{R}^3$ para $\\mathbb{R}^{50}$. Nossos olhos não conseguem visualizar cinquenta eixos perpendiculares simultâneos, mas a álgebra linear nos permite calcular distâncias, ângulos e projeções nesse espaço de alta dimensionalidade com a mesmíssima exatidão geométrica.
          </p>

          <p>
            A partir dessa perspectiva, todas as perguntas fundamentais de Ciência de Dados ganham uma tradução geométrica imediata. Perguntar <em>"qual cliente é mais parecido com Ana?"</em> equivale a buscar o vetor que possui a menor distância euclidiana ou o menor ângulo angular em relação a $\\mathbf{x}_{\\text{Ana}}$. Perguntar <em>"como resumir cinquenta variáveis em apenas duas para um gráfico?"</em> equivale a projetar ortogonalmente a nuvem de pontos sobre o subespaço bidimensional de maior variância. E perguntar <em>"o que faz uma camada de rede neural profunda?"</em> equivale a aplicar uma sequência de transformações lineares matriciais que rotacionam, esticam e cisalham o espaço de dados para separar classes que antes estavam misturadas.
          </p>

          <!-- Decodificação de Notação e Termos em Blockquote Identificado -->
          <blockquote class="p-4 rounded-r-lg border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-3 not-italic">
            <div class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>Decodificação de Notação e Termos:</span>
            </div>
            <ul class="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
              <li>
                <strong>$\\mathbf{x} \\in \\mathbb{R}^n$:</strong> Um vetor coluna composto por $n$ componentes escalares reais $(x_1, x_2, \\dots, x_n)^\\top$, representando um ponto ou direção em $n$ dimensões.
              </li>
              <li>
                <strong>$\\mathbf{u} \\cdot \\mathbf{v} = \\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\sum_{i=1}^n u_i v_i$:</strong> O ${termHint("produto-escalar")} entre dois vetores de mesma dimensão, sintetizando a projeção e a magnitude conjunta em um único número escalar.
              </li>
              <li>
                <strong>$\\|\\mathbf{x}\\|_2 = \\sqrt{\\mathbf{x} \\cdot \\mathbf{x}} = \\sqrt{\\sum_{i=1}^n x_i^2}$:</strong> A ${termHint("norma-euclidiana")} (ou norma $L_2$), que quantifica a distância geométrica direta da origem até a extremidade do vetor.
              </li>
              <li>
                <strong>$\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}$:</strong> A ${termHint("similaridade-cosseno")}, que mede o alinhamento angular entre duas direções, variando de $-1$ (opostos) a $+1$ (idênticos).
              </li>
              <li>
                <strong>$\\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|_2^2} \\mathbf{v}$:</strong> A ${termHint("projecao-ortogonal")} do vetor $\\mathbf{u}$ sobre a direção gerada por $\\mathbf{v}$, decompondo $\\mathbf{u}$ na sua componente paralela e no erro residual ortogonal.
              </li>
              <li>
                <strong>$\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$:</strong> Uma matriz com $m$ linhas e $n$ colunas, operando como uma transformação linear que mapeia vetores de $\\mathbb{R}^n$ para $\\mathbb{R}^m$.
              </li>
              <li>
                <strong>$\\operatorname{det}(\\mathbf{A})$:</strong> O ${termHint("determinante")} de uma matriz quadrada, que expressa o fator de dilatação ou contração da área ou hipervolume induzido pela transformação.
              </li>
            </ul>
          </blockquote>

          <!-- Formulação Matemática Rigorosa -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.1 Operações Vetoriais e Espaços Vetoriais
            </h3>

            <p>
              Formalmente, um ${termHint("espaco-vetorial")} sobre o corpo dos números reais $\\mathbb{R}$ é um conjunto não-vazio $V$ munido de duas operações fechadas: a adição vetorial $+: V \\times V \\to V$ e a multiplicação por escalar $\\cdot: \\mathbb{R} \\times V \\to V$. Para quaisquer $\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in V$ e escalares $a, b \\in \\mathbb{R}$, devem ser satisfeitos oito axiomas estruturais fundamentais:
            </p>

            <div class="p-4 rounded-lg bg-slate-900 text-slate-100 dark:bg-slate-950 font-mono text-xs overflow-x-auto space-y-1.5 shadow-sm">
              <div class="text-slate-400 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-slate-800">Axiomas Estruturais de Espaço Vetorial</div>
              <p>1. Comutatividade da Adição: $\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$</p>
              <p>2. Associatividade da Adição: $(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})$</p>
              <p>3. Elemento Neutro Aditivo: $\\exists \\, \\mathbf{0} \\in V \\quad \\text{tal que} \\quad \\mathbf{u} + \\mathbf{0} = \\mathbf{u}$</p>
              <p>4. Inverso Aditivo: $\\forall \\mathbf{u} \\in V, \\, \\exists \\, (-\\mathbf{u}) \\in V \\quad \\text{tal que} \\quad \\mathbf{u} + (-\\mathbf{u}) = \\mathbf{0}$</p>
              <p>5. Distributividade Escalar I: $a(\\mathbf{u} + \\mathbf{v}) = a\\mathbf{u} + a\\mathbf{v}$</p>
              <p>6. Distributividade Escalar II: $(a + b)\\mathbf{u} = a\\mathbf{u} + b\\mathbf{u}$</p>
              <p>7. Compatibilidade de Multiplicação: $a(b\\mathbf{u}) = (ab)\\mathbf{u}$</p>
              <p>8. Identidade Escalar: $1 \\cdot \\mathbf{u} = \\mathbf{u}$</p>
            </div>

            <p>
              Dizemos que um conjunto de vetores $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\dots, \\mathbf{v}_k\\}$ é ${termHint("independencia-linear", "linearmente independente (LI)")}$ se a única combinação linear que resulta no vetor nulo for aquela em que todos os coeficientes escalares são estritamente iguais a zero:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\dots + c_k \\mathbf{v}_k = \\mathbf{0} \\implies c_1 = c_2 = \\dots = c_k = 0$$
            </div>

            <p>
              Se ao menos um coeficiente $c_i \\neq 0$ existir, diz-se que o conjunto é linearmente dependente (LD). Em Ciência de Dados, a dependência linear entre colunas de atributos representa a temida <em>multicolinearidade perfeita</em>: uma variável não adiciona nenhuma informação inédita ao modelo, sendo mera combinação linear das demais, o que torna matrizes de covariância singulares e inviabiliza a inversão numérica em algoritmos de regressão.
            </p>

            <p>
              Quando um conjunto de vetores é linearmente independente e, ao mesmo tempo, gera todo o espaço $V$ através de suas combinações lineares, esse conjunto recebe o nome de ${termHint("base-vetorial")}. O número de vetores de qualquer base de $V$ define a <strong>dimensão</strong> do espaço vetorial.
            </p>
          </div>

          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.2 Produto Escalar, Geometria Euclidiana e Ortogonalidade
            </h3>

            <p>
              O ${termHint("produto-escalar")} é o elo matemático que conecta a álgebra vetorial abstrata à geometria euclidiana de ângulos, comprimentos e distâncias. Definido algebricamente para dois vetores $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ como a soma dos produtos de suas componentes correspondentes:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = u_1 v_1 + u_2 v_2 + \\dots + u_n v_n = \\mathbf{u}^\\top \\mathbf{v}$$
            </div>

            <p>
              Pela Lei dos Cossenos generalizada, o produto escalar se relaciona com a geometria dos comprimentos e do ângulo $\\theta$ formado entre os vetores através da clássica identidade:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos(\\theta)$$
            </div>

            <p>
              Dessa relação decorre uma propriedade com profundas consequências analíticas: dois vetores não-nulos são ${termHint("ortogonalidade", "ortogonais")} ($\mathbf{u} \\perp \\mathbf{v}$) se e somente se o seu produto escalar for identicamente nulo:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u} \\cdot \\mathbf{v} = 0 \\iff \\cos(\\theta) = 0 \\iff \\theta = 90^\\circ \\, \\left(\\frac{\\pi}{2} \\, \\text{rad}\\right)$$
            </div>

            <p>
              A decomposição ortogonal permite calcular a ${termHint("projecao-ortogonal")} de $\\mathbf{u}$ sobre a linha gerada por $\\mathbf{v}$. A projeção é o múltiplo escalar $\\hat{\\mathbf{u}} = c\\mathbf{v}$ que minimiza a distância euclidiana $\\|\\mathbf{u} - \\hat{\\mathbf{u}}\\|$, garantindo que o vetor residual $\\mathbf{e} = \\mathbf{u} - \\hat{\\mathbf{u}}$ seja estritamente ortogonal a $\\mathbf{v}$:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|_2^2} \\right) \\mathbf{v}$$
            </div>
          </div>

          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.3 Matrizes como Transformações Lineares e o Significado do Determinante
            </h3>

            <p>
              Uma das maiores intuições que diferenciam um praticante mediano de um especialista em Ciência de Dados é compreender a matriz não apenas como um repositório de dados, mas como um ${termHint("matriz-operador", "operador linear")}. Uma função $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ é linear se satisfaz a aditividade ($T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$) e a homogeneidade escalar ($T(c\\mathbf{u}) = cT(\\mathbf{u})$). Toda transformação linear em espaços de dimensão finita é representada univocamente pela multiplicação de uma matriz por um vetor:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$T(\\mathbf{x}) = \\mathbf{A}\\mathbf{x}$$
            </div>

            <p>
              A geometria por trás de $\\mathbf{A}\\mathbf{x}$ é revelada pela forma como as colunas da matriz são construídas. Em duas dimensões, qualquer vetor $\\mathbf{x} = (x, y)^\\top$ pode ser escrito na base canônica $\\hat{i} = (1, 0)^\\top$ e $\\hat{j} = (0, 1)^\\top$ como $\\mathbf{x} = x\\hat{i} + y\\hat{j}$. Pela linearidade da transformação:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$T(\\mathbf{x}) = T(x\\hat{i} + y\\hat{j}) = x T(\\hat{i}) + y T(\\hat{j})$$
            </div>

            <p>
              Portanto, se conhecemos onde a transformação envia os vetores fundamentais $\\hat{i}$ e $\\hat{j}$, conhecemos para onde ela envia <em>absolutamente qualquer ponto do espaço</em>! Se $T(\\hat{i}) = (a, c)^\\top$ e $T(\\hat{j}) = (b, d)^\\top$, a matriz da transformação é simplesmente:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{A} = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$
            </div>

            <p>
              O que o ${termHint("determinante")} $\\operatorname{det}(\\mathbf{A}) = ad - bc$ mede geometricamente? Ele quantifica a <strong>taxa de variação de área</strong> provocada pela transformação. O quadrado unitário formado por $\\hat{i}$ e $\\hat{j}$, cuja área original vale $1$, é transformado em um paralelogramo gerado pelos vetores $(a, c)$ e $(b, d)$. A área desse paralelogramo vale exatamente $|\\operatorname{det}(\\mathbf{A})|$.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div class="p-3 rounded border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
                <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">$\\operatorname{det}(\\mathbf{A}) > 0$</span>
                <p class="text-slate-600 dark:text-slate-400">A orientação do espaço é preservada; a área de qualquer região é escalada pelo fator $\\operatorname{det}(\\mathbf{A})$.</p>
              </div>
              <div class="p-3 rounded border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
                <span class="font-bold text-amber-800 dark:text-amber-300 block mb-1">$\\operatorname{det}(\\mathbf{A}) < 0$</span>
                <p class="text-slate-600 dark:text-slate-400">O espaço sofreu uma reflexão (espelhamento de orientação), escalando as áreas por $|\\operatorname{det}(\\mathbf{A})|$.</p>
              </div>
              <div class="p-3 rounded border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20">
                <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">$\\operatorname{det}(\\mathbf{A}) = 0$</span>
                <p class="text-slate-600 dark:text-slate-400">O espaço foi colapsado em uma linha ou um ponto único; houve perda irremediável de informação dimensional e a matriz não possui inversa ($\mathbf{A}^{-1}$ não existe).</p>
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
            A álgebra linear não é mero aparato preparatório: ela constitui o motor de cálculo e a semântica operacional de quase todos os algoritmos em produção na indústria analítica moderna. A seguir, exploramos quatro das aplicações mais importantes no cotidiano da Ciência de Dados e Inteligência Artificial.
          </p>

          <div class="space-y-6 text-xs">
            
            <!-- Aplicação 1: Matriz de Dados de Projeto -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>3.1 A Matriz de Atributos de Projeto (Design Matrix $\\mathbf{X} \\in \\mathbb{R}^{n \\times d}$)</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Em qualquer problema supervisionado ou não supervisionado, a totalidade das observações é organizada em uma matriz $\\mathbf{X}$ contendo $n$ linhas (instâncias ou amostras) e $d$ colunas (atributos ou features). A matriz transposta $\\mathbf{X}^\\top$ possui dimensão $d \\times n$, de modo que a multiplicação matricial:
              </p>
              <div class="py-1 text-center font-semibold text-xs">
                $$\\mathbf{S} = \\frac{1}{n-1} \\mathbf{X}_c^\\top \\mathbf{X}_c \\in \\mathbb{R}^{d \\times d}$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                (onde $\\mathbf{X}_c$ é a matriz centrada na média) calcula a <strong>Matriz de Covariância Amostral</strong> de todas as variáveis simultaneamente em uma única operação vetorizada de alta performance, sem a necessidade de loops iterativos lentos.
              </p>
            </div>

            <!-- Aplicação 2: Similaridade de Cosseno em NLP e Busca Vetorial -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>3.2 Similaridade de Cosseno em Modelos de Linguagem e RAG</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Nos sistemas modernos de Recuperação Aumentada por Geração (RAG) e motores de busca semântica, trechos de texto são transformados em representações densas chamadas <em>embeddings</em> vetoriais em espaços de alta dimensão (ex: $\\mathbb{R}^{1536}$).
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                A distância euclidiana direta $\\|\\mathbf{u} - \\mathbf{v}\\|_2$ é sensível ao comprimento do texto (textos longos contêm mais palavras e geram vetores de maior magnitude). Para neutralizar esse viés de extensão mantendo o foco estrito no significado semântico, os bancos de dados vetoriais (Pinecone, Chroma, Milvus) calculam a ${termHint("similaridade-cosseno")}:
              </p>
              <div class="py-1 text-center font-semibold text-xs">
                $$S_C(\\mathbf{q}, \\mathbf{d}) = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\|_2 \\|\\mathbf{d}\\|_2}$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                Se os vetores já estiverem pré-normalizados com norma unitária ($\\|\\mathbf{q}\\|_2 = \\|\\mathbf{d}\\|_2 = 1$), a similaridade de cosseno colapsa em um simples produto escalar: $S_C(\\mathbf{q}, \\mathbf{d}) = \\mathbf{q} \\cdot \\mathbf{d}$, permitindo avaliar milhões de comparações por segundo via instruções de processamento paralelo SIMD e GPUs.
              </p>
            </div>

            <!-- Aplicação 3: Mínimos Quadrados Ordinários (OLS) como Projeção -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>3.3 Geometria da Regressão Linear: OLS como Projeção Ortogonal</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Em uma regressão linear múltipla, queremos encontrar o vetor de coeficientes $\\hat{\\boldsymbol{\\beta}}$ que prevê a variável alvo $\\mathbf{y} \\in \\mathbb{R}^n$ a partir da combinação linear das colunas da matriz de atributos $\\mathbf{X}$: $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. Na maioria dos casos reais, o vetor $\\mathbf{y}$ não pertence exatamente ao subespaço gerado pelas colunas de $\\mathbf{X}$ (o espaço coluna $\\operatorname{Col}(\\mathbf{X})$).
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Geometricamente, a previsão ótima $\\hat{\\mathbf{y}}$ que minimiza a soma dos resíduos quadráticos $\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2$ é precisamente a <strong>projeção ortogonal</strong> de $\\mathbf{y}$ sobre $\\operatorname{Col}(\\mathbf{X})$. A condição de ortogonalidade exige que o erro residual $\\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$ seja ortogonal a cada coluna de $\\mathbf{X}$, o que nos leva diretamente às célebres Equações Normais:
              </p>
              <div class="py-1 text-center font-semibold text-xs">
                $$\\mathbf{X}^\\top (\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = \\mathbf{0} \\iff \\mathbf{X}^\\top \\mathbf{X} \\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^\\top \\mathbf{y} \\iff \\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^\\top \\mathbf{X})^{-1} \\mathbf{X}^\\top \\mathbf{y}$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                Essa célebre fórmula analítica não é mágica algébrica: é puramente o Teorema de Pitágoras e a projeção perpendicular no espaço euclidiano de $n$ observações.
              </p>
            </div>

            <!-- Aplicação 4: Camadas Densas de Redes Neurais -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>3.4 Camadas Densas em Redes Neurais (Transformações Afins)</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Cada camada linear de uma rede neural artificial é uma transformação afim composta por uma multiplicação matricial seguida de uma translação por vetor de viés (bias):
              </p>
              <div class="py-1 text-center font-semibold text-xs">
                $$\\mathbf{z} = \\mathbf{W}\\mathbf{x} + \\mathbf{b}$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                A matriz de pesos $\\mathbf{W} \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}$ atua reorientando, girando e distorcendo a representação dos dados, enquanto o vetor $\\mathbf{b}$ desloca a origem. A aplicação subsequente de uma função não-linear de ativação (como ReLU ou GeLU) introduz dobras no espaço, permitindo à rede separar e classificar superfícies de decisão altamente complexas.
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
            Todas as fontes citadas abaixo foram submetidas à verificação de integridade canônica, com hiperlinks públicos operacionais e abertos para consulta:
          </p>

          <ul class="space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800/60">
            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">CAYLEY, Arthur.</span>
              <span class="text-slate-600 dark:text-slate-300"> A Memoir on the Theory of Matrices. <em>Philosophical Transactions of the Royal Society of London</em>, v. 148, p. 17–37, 1858.</span>
              <div class="mt-1">
                <a href="https://archive.org/details/jstor-108649" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Acesso digital via Internet Archive (Volume 148 da Royal Society)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">GRASSMANN, Hermann.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Die Lineale Ausdehnungslehre ein neuer Zweig der Mathematik</em>. Leipzig: Otto Wigand, 1844.</span>
              <div class="mt-1">
                <a href="https://archive.org/details/dielinealeausde00grasgoog" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Exemplar histórico digitalizado da edição original de 1844 (Internet Archive / NYPL)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">DEISENROTH, Marc Peter; FAISAL, A. Aldo; ONG, Cheng Soon.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Mathematics for Machine Learning</em>. Cambridge: Cambridge University Press, 2020.</span>
              <div class="mt-1">
                <a href="https://mml-book.github.io/" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Repositório Oficial Aberto (Cambridge University Press / Companion Website)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">STRANG, Gilbert.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Introduction to Linear Algebra</em>. 5th ed. Wellesley: Wellesley-Cambridge Press, 2016.</span>
              <div class="mt-1 flex flex-wrap gap-3">
                <a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Curso Aberto 18.06 no MIT OpenCourseWare
                </a>
                <span class="text-slate-400">&bull;</span>
                <a href="https://openlibrary.org/works/OL15842186W/Introduction_to_Linear_Algebra" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Registro no Open Library
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
                5. Laboratório Interativo: Espaço Vetorial, Matrizes & Projeções 2D
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
