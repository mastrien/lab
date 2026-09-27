// Capítulo 7.1: Redes Neurais Artificiais e Backpropagation
// Redigido estritamente conforme a skill canônica 'didactic-technical-writing'

import { getLabById } from "../../../labs/registry.js";
import { renderChapterToc } from "../../../components/ChapterToc.js";
import { renderMath } from "../../../utils/mathRenderer.js";
import { termHint, initGlossaryTooltips } from "../../../components/GlossaryTooltip.js";
import { Icons } from "../../../components/Icons.js";

export function renderNeuralNetworksChapter(container, axis, chapter) {
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
            A arquitetura fundamental do neurônio artificial, o colapso linear, o Teorema da Aproximação Universal e a dedução vetorial rigorosa da retropropagação do erro via regra da cadeia.
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
            As Redes Neurais Artificiais representam uma das jornadas intelectuais mais fascinantes e dramáticas da ciência da computação. Longe de constituírem uma invenção recente impulsionada pelo Vale do Silício, sua formulação teórica atravessou mais de oito décadas de avanços pioneiros, controvérsias epistemológicas devastadoras e invernos conceituais prolongados. Como observa o professor <strong>Simon Haykin</strong> em seu tratado clássico <em>Redes Neurais: Princípios e Prática</em>, cada novo modelo na história do conexionismo emergiu precisamente para superar uma limitação fundamental e paralisante do modelo que o antecedeu.
          </p>

          <p>
            O ponto de partida ocorreu em 1943, quando o neurofisiologista <strong>Warren McCulloch</strong> e o lógico matemático <strong>Walter Pitts</strong> publicaram o artigo fundador <a href="https://archive.org/details/bulletinofmathem05chic" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>A Logical Calculus of the Ideas Immanent in Nervous Activity</em></a> (Bulletin of Mathematical Biophysics, Vol. 5, pp. 115–133). McCulloch e Pitts demonstraram que um modelo matemático simplificado de neurônio biológico — que combinava sinais binários de entrada através de uma função degrau com limiar rígido $\theta$ — era capaz de implementar operadores lógicos booleanos fundamentais ($E$, $OU$, $NÃO$), provando que redes de neurônios possuíam o poder computacional equivalente ao de uma Máquina de Turing universal.
          </p>

          <p>
            Contudo, o neurônio de McCulloch-Pitts possuía uma limitação estrutural intransponível: <strong>ele não aprendia</strong>. Todos os limiares e conexões tinham de ser desenhados e calculados manualmente por um projetista humano. A rede sabia executar uma função lógica pré-determinada, mas não dispunha de nenhum mecanismo empírico para descobrir por conta própria como resolver uma tarefa. Vale notar a curiosidade epistemológica: o próprio termo "Inteligência Artificial" só seria cunhado treze anos depois, em 1956, por John McCarthy na conferência de Dartmouth — McCulloch e Pitts inauguraram o conexionismo computacional antes mesmo de a área ter um nome formal.
          </p>

          <p>
            A chave para o aprendizado foi proposta em 1949 pelo psicólogo canadense <strong>Donald Hebb</strong> em sua obra seminal <a href="https://archive.org/details/organizationofbe00hebbrich" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>The Organization of Behavior: A Neuropsychological Theory</em></a>. Hebb postulou o princípio da plasticidade sináptica: quando duas células nervosas disparam repetidamente de maneira simultânea, a conexão biológica entre elas é reforçada, premissa popularizada pelo aforismo <em>"neurons that fire together, wire together"</em>. O grande salto conceitual de Hebb foi demonstrar que <strong>o aprendizado mora na força das conexões</strong>, fornecendo a base biológica indispensável para a noção matemática de pesos sinápticos ajustáveis.
          </p>

          <p>
            Em 1958, o psicólogo americano <strong>Frank Rosenblatt</strong> integrou a unidade de McCulloch-Pitts à plasticidade de Hebb, dando origem ao <strong>Perceptron</strong> no Laboratório Aeronáutico de Cornell, documentado em <a href="https://archive.org/details/perceptronprobab00rose" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain</em></a>. Rosenblatt dotou o neurônio de pesos reais adaptativos e formulou uma regra de aprendizado empírico com taxa $\eta$. Além da teoria, Rosenblatt materializou a ideia na prática construindo o <strong>Mark I Perceptron</strong>: uma máquina física analógica equipada com uma "retina" de 400 fotocélulas de sulfeto de cádmio ($20 \times 20$ pixels) acopladas a potenciômetros rotativos ajustados por motores elétricos passo-a-passo. Em 1962, Rosenblatt e Albert Novikoff formalizaram o célebre <em>Teorema da Convergência do Perceptron</em>: se duas classes de dados forem linearmente separáveis por um hiperplano, a regra de atualização garante a convergência para uma fronteira sem erros em um número finito de iterações.
          </p>

          <p>
            Quase simultaneamente, em 1960, <strong>Bernard Widrow</strong> e <strong>Ted Hoff</strong> na Universidade de Stanford apresentaram o <strong>ADALINE (ADAptive LINear Element)</strong> no artigo seminal <a href="http://www-isl.stanford.edu/~widrow/papers/c1960adaptiveswitching.pdf" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Adaptive Switching Circuits</em></a>. O ADALINE introduziu um divisor de águas na mecânica de otimização: enquanto o Perceptron de Rosenblatt corrigia os pesos somente quando a saída binária discretizada errava a classificação ($y \ne \hat{y}$), o ADALINE media a distância contínua entre a soma pré-sináptica antes da ativação e o alvo desejado, ajustando os pesos proporcionalmente à magnitude do erro real contínuo. Essa regra, batizada de <strong>Regra Delta</strong> ou <strong>LMS (Least Mean Squares)</strong>, constituiu a primeira manifestação prática da descida do gradiente em unidades neurais, estabelecendo os alicerces diretos para o treinamento moderno por diferenciação.
          </p>

          <p>
            Todavia, a euforia generalizada da década de 1960 sofreu uma paralisia abrupta em 1969. Os pioneiros da inteligência artificial do MIT <strong>Marvin Minsky</strong> e <strong>Seymour Papert</strong> publicaram o célebre tratado analítico <a href="https://openlibrary.org/works/OL262272W/Perceptrons" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Perceptrons: An Introduction to Computational Geometry</em></a>. Minsky e Papert demonstraram matematicamente que o Perceptron de camada única era incapaz de solucionar problemas não-linearmente separáveis elementares, a exemplo do operador booleano do <strong>OU-Exclusivo (XOR)</strong>. Embora reconhecessem que redes com camadas intermediárias (camadas ocultas) contornariam a barreira, argumentaram com profundo ceticismo que não existia qualquer método viável para estender o aprendizado e descobrir como calibrar os pesos internos dessas camadas intermediárias. O impacto da obra foi fulminante: agências governamentais cortaram os financiamentos e o campo mergulhou no primeiro grande <strong>Inverno da Inteligência Artificial</strong> (<em>AI Winter</em>).
          </p>

          <p>
            O impasse apontado por Minsky só foi superado em sua plenitude em 1986 por <strong>David Rumelhart</strong>, <strong>Geoffrey Hinton</strong> e <strong>Ronald Williams</strong> no artigo histórico da Nature <a href="https://www.nature.com/articles/323533a0" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Learning representations by back-propagating errors</em></a> (antecipado conceitualmente na tese doutoral de Paul Werbos em 1974). A grande revolução residiu em substituir funções degrau não-deriváveis por funções de ativação contínuas e suaves (como a sigmóide logística) e aplicar a <strong>regra da cadeia do cálculo diferencial multivariado</strong> para retropropagar o sinal de erro da camada de saída até as primeiras sinapses. Esse mecanismo de <strong>Retropropagação (Backpropagation)</strong> permitiu que camadas ocultas aprendessem representações latentes automaticamente. Em 1989 e 1991, <strong>George Cybenko</strong> e <strong>Kurt Hornik</strong> demonstraram o <a href="https://eudml.org/doc/184131" target="_blank" rel="noopener noreferrer" class="text-slate-900 dark:text-white font-semibold underline decoration-slate-400 hover:decoration-slate-900"><em>Teorema da Aproximação Universal</em></a>, provando que redes neurais com camadas ocultas não-lineares têm a garantia matemática de aproximar qualquer função contínua multidimensional arbitrária.
          </p>

          <!-- Síntese Cronológica da Evolução Teórica -->
          <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-2">
            <span class="font-bold text-slate-900 dark:text-white text-xs block">Linha do Tempo Dialética do Conexionismo:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold block text-[11px]">1943 &bull; McCulloch &amp; Pitts</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">Neurônio lógico com limiar rígido. <em>Limitação:</em> pesos fixos manuais, incapaz de aprender.</p>
              </div>
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-teal-600 dark:text-teal-400 font-bold block text-[11px]">1949 &bull; Donald Hebb</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">Plasticidade sináptica. O aprendizado reside no reforço e enfraquecimento das conexões.</p>
              </div>
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-sky-600 dark:text-sky-400 font-bold block text-[11px]">1958 &bull; Frank Rosenblatt</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">Perceptron com pesos ajustáveis, máquina física Mark I e Teorema da Convergência.</p>
              </div>
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-amber-600 dark:text-amber-400 font-bold block text-[11px]">1960 &bull; Widrow &amp; Hoff</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">ADALINE e Regra Delta (LMS). Ajuste proporcional ao erro contínuo pré-ativação via gradiente.</p>
              </div>
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-rose-600 dark:text-rose-400 font-bold block text-[11px]">1969 &bull; Minsky &amp; Papert</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">Incapacidade no XOR para camada única e ausência de método para treinar camadas ocultas.</p>
              </div>
              <div class="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold block text-[11px]">1986 &bull; Rumelhart et al.</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">Backpropagation e ativações suaves, distribuindo o crédito do erro via regra da cadeia.</p>
              </div>
            </div>
          </div>
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
            Para compreender a arquitetura de uma rede neural e a necessidade de suas peças matemáticas, imagine uma folha de papel transparente onde foram desenhados quatro pontos: dois azuis e dois vermelhos, intercalados diagonalmente (o exato arranjo do operador XOR).
          </p>

          <p>
            Se você tiver apenas uma régua rígida e tentar traçar uma única linha reta no papel (o equivalente a um ${termHint("perceptron")} linear de camada única), você logo perceberá que é geometricamente impossível separar os pontos azuis dos vermelhos com um único corte. Se a reta deixar dois azuis de um lado, ela obrigatoriamente capturará um vermelho junto. A acurácia máxima que uma linha reta consegue obter no XOR é de meros $75\\%$.
          </p>

          <p>
            Agora, imagine o que acontece se você pegar essa folha de papel e <strong>dobrá-la fisicamente ao meio</strong>. Ao curvar e deformar o papel no espaço tridimensional, os dois pontos azuis aproximam-se no verso da dobra, enquanto os dois vermelhos permanecem na face anterior. Agora, com o papel dobrado, um único corte plano de tesoura separa perfeitamente todas as cores!
          </p>

          <p>
            Essa dobra espacial é exatamente o que as <strong>camadas ocultas</strong> e as ${termHint("funcao-ativacao", "funções de ativação não-lineares")} realizam nos dados. Cada camada intermediária de um ${termHint("mlp", "Perceptron Multicamadas (MLP)")} atua distorcendo, esticando e dobrando o espaço vetorial de entrada até que conjuntos intrincados e não-lineares de dados se tornem linearmente separáveis pela camada final de classificação.
          </p>

          <!-- Correspondência Biológica vs. Abstração Matemática -->
          <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
            <span class="font-bold text-slate-900 dark:text-white text-xs block">Correspondência Neurobiológica vs. Formulação Algébrica:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                <span class="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">1. Dendritos &rarr; Entradas ($\\mathbf{x}$)</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-1">Canais receptores que captam estímulos elétricos brutos provindos de sensores externos ou neurônios vizinhos ($x_1, x_2, \\dots, x_m$).</p>
              </div>
              <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                <span class="font-bold text-teal-600 dark:text-teal-400 block text-[11px]">2. Sinapses &rarr; Pesos ($w_i$)</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-1">Fendas químicas que modulam a condutância do sinal: pesos positivos excitam, pesos negativos inibem a transmissão.</p>
              </div>
              <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                <span class="font-bold text-amber-600 dark:text-amber-400 block text-[11px]">3. Corpo Celular &rarr; Soma ($z$)</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-1">O <em>soma</em> integra todos os potenciais pós-sinápticos recebidos somados à polarização interna: $z = \\sum w_i x_i + b$.</p>
              </div>
              <div class="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px]">4. Axônio &rarr; Disparo ($\\sigma(z)$)</span>
                <p class="text-slate-600 dark:text-slate-400 text-[10px] mt-1">Gera o potencial de ação (tudo-ou-nada no degrau; disparo suave na sigmóide), propagando a predição $\\hat{y}$ adiante.</p>
              </div>
            </div>
          </div>

          <!-- A Parábola Intuitiva da Decisão de Emma -->
          <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3 text-xs">
            <span class="font-bold text-slate-900 dark:text-white text-xs block">Intuição Fundamental: O Dilema de Decisão de Emma</span>
            <p class="text-slate-600 dark:text-slate-300">
              Imagine uma estudante, Emma, decidindo se vai a um festival de música ao ar livre esta noite. Sua decisão binária final ($1$ = vai, $0$ = fica em casa) depende de três variáveis de entrada:
            </p>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li><strong>$x_1$:</strong> Os amigos mais próximos dela vão ao show? ($1 = \\text{sim}, 0 = \\text{não}$)</li>
              <li><strong>$x_2$:</strong> A previsão meteorológica indica chuva torrencial? ($1 = \\text{sim}, 0 = \\text{não}$)</li>
              <li><strong>$x_3$:</strong> O local do show fica próximo ou conta com transporte público direto? ($1 = \\text{sim}, 0 = \\text{não}$)</li>
            </ul>
            <p class="text-slate-600 dark:text-slate-300">
              Esses fatores têm pesos idênticos na consciência de Emma? Certamente não. Para Emma, a companhia dos amigos é determinante ($w_1 = +0.8$), a chuva é um fator fortemente desestimulador ($w_2 = -0.6$), enquanto a proximidade é conveniente, porém secundária ($w_3 = +0.3$). O produto ponderado $\\sum_{i=1}^3 w_i x_i$ reflete com precisão o balanço de forças de suas prioridades pessoais.
            </p>
            <div class="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span class="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">E o que é o Viés (Bias $b$)? A Predisposição Natural</span>
              <p class="text-slate-600 dark:text-slate-300 text-[11px]">
                O viés $b$ representa a <em>inclinação basal prévia</em> de Emma, mesmo quando todos os estímulos externos são nulos ($x_1 = x_2 = x_3 = 0$). Se Emma for uma entusiasta que adora qualquer evento social, ela terá um viés alto e positivo ($b = +0.5$): ela tende a ir por padrão ("topo qualquer parada"). Se Emma for naturalmente caseira e relutante, terá um viés expressivamente negativo ($b = -0.9$): ela exigirá motivos excepcionais combinados para superar sua inércia de conforto e sair de casa.
              </p>
              <p class="text-slate-600 dark:text-slate-400 text-[10px]">
                Algebricamente, o bias é exatamente o limiar de disparo $\\theta$ de McCulloch-Pitts deslocado: dizer que o neurônio dispara quando $\\sum w_i x_i \\ge \\theta$ é estritamente idêntico a dizer $\\sum w_i x_i - \\theta \\ge 0$, revelando que $b = -\\theta$.
              </p>
            </div>
          </div>

          <!-- A Mecânica de Aprendizado e os Três Casos Universais -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              A Regra de Aprendizado do Perceptron: Os Três Casos Universais
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              O Perceptron inicia seu treinamento com pesos aleatórios ingênuos. Ao confrontar a resposta esperada $y \\in \\{0, 1\\}$ com a sua predição calculada $\\hat{y} \\in \\{0, 1\\}$, a regra formulada por Rosenblatt ajusta cada conexão com taxa de aprendizado $\\eta$:
            </p>
            <div class="py-1 text-center font-semibold font-mono text-xs">
              $$\\Delta w_i = \\eta (y - \\hat{y}) x_i, \\qquad \\Delta b = \\eta (y - \\hat{y})$$
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              Embora aparente simplicidade, essa equação contempla exatamente <strong>três cenários universais exaustivos</strong>:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 text-xs block">1. Acerto ($y = \\hat{y}$)</span>
                <div class="font-mono text-[11px] text-slate-500">Erro: $y - \\hat{y} = 0$</div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  Como o erro é nulo, $\\Delta w_i = 0$ e $\\Delta b = 0$. Nenhum peso é modificado, preservando o equilíbrio já conquistado pelo neurônio.
                </p>
              </div>
              <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span class="font-bold text-rose-600 dark:text-rose-400 text-xs block">2. Falso Positivo ($y=0, \\hat{y}=1$)</span>
                <div class="font-mono text-[11px] text-rose-500">Erro: $0 - 1 = -1$</div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  O neurônio disparou indevidamente. Os pesos das entradas que estavam ligadas ($x_i=1$) diminuem em $-\\eta$, puxando a soma ponderada para baixo em iterações futuras.
                </p>
              </div>
              <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span class="font-bold text-indigo-600 dark:text-indigo-400 text-xs block">3. Falso Negativo ($y=1, \\hat{y}=0$)</span>
                <div class="font-mono text-[11px] text-indigo-500">Erro: $1 - 0 = +1$</div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  O neurônio silenciou indevidamente. Os pesos das entradas que estavam ativas ($x_i=1$) aumentam em $+\\eta$, impulsionando a soma para que atinja o limiar de disparo.
                </p>
              </div>
            </div>
            <div class="p-2.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300">
              <strong>O Papel Causal do Multiplicador $x_i$:</strong> Se uma entrada estava inativa ($x_i = 0$), o termo $\\eta (y - \\hat{y}) \\cdot 0 = 0$ anula a correção de seu peso. Isso garante que <strong>apenas as variáveis que efetivamente contribuíram para a decisão errônea sejam corrigidas</strong>, poupando variáveis inertes de penalidades injustificadas.
            </div>
          </div>

          <!-- Decodificação de Notação e Termos em Blockquote Identificado -->
          <blockquote class="p-4 rounded-r-lg border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-3 not-italic">
            <div class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>Decodificação de Notação e Termos:</span>
            </div>
            <ul class="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
              <li>
                <strong>$\\mathbf{x} \\in \\mathbb{R}^{n_0}$:</strong> O vetor de atributos de entrada (amostra com $n_0$ variáveis numéricas).
              </li>
              <li>
                <strong>$\\mathbf{W}^{[l]} \\in \\mathbb{R}^{n_l \\times n_{l-1}}$:</strong> A matriz de pesos sinápticos conectando a camada $l-1$ com $n_{l-1}$ neurônios à camada $l$ com $n_l$ neurônios.
              </li>
              <li>
                <strong>$\\mathbf{b}^{[l]} \\in \\mathbb{R}^{n_l}$:</strong> O vetor de viés (<em>bias</em>) da camada $l$, operando como o limiar de ativação basal de cada unidade.
              </li>
              <li>
                <strong>$\\mathbf{z}^{[l]} = \\mathbf{W}^{[l]} \\mathbf{a}^{[l-1]} + \\mathbf{b}^{[l]}$:</strong> O vetor de potenciais de ativação pré-sinápticos (combinação linear afim).
              </li>
              <li>
                <strong>$\\sigma(\\cdot): \\mathbb{R} \\to \\mathbb{R}$:</strong> A ${termHint("funcao-ativacao")} não-linear (como ReLU, Sigmóide ou Tanh) aplicada elemento a elemento.
              </li>
              <li>
                <strong>$\\mathbf{a}^{[l]} = \\sigma(\\mathbf{z}^{[l]})$:</strong> O vetor de ativações pós-sinápticas (disparo de saída da camada $l$, com $\\mathbf{a}^{[0]} = \\mathbf{x}$).
              </li>
              <li>
                <strong>$\\mathcal{L}(\\hat{y}, y)$:</strong> A função de perda escalar que quantifica a discrepância entre a predição da rede $\\hat{y} = a^{[L]}$ e o alvo real $y$.
              </li>
              <li>
                <strong>$\\boldsymbol{\\delta}^{[l]} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}^{[l]}} \\in \\mathbb{R}^{n_l}$:</strong> O sinal de erro retropropagado até a camada $l$, alicerce matemático do algoritmo de ${termHint("backpropagation")}.
              </li>
            </ul>
          </blockquote>

          <!-- Subseção 2.1: Neurônio Artificial, Colapso Linear e o Enigma do XOR -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.1 A Anatomia do Neurônio Artificial, o Teorema do Colapso Linear e a Geometria do XOR
            </h3>

            <p>
              O bloco construtivo elementar de qualquer rede profunda é o ${termHint("neuronio-artificial")}. Algebricamente, o $j$-ésimo neurônio de uma camada recebe um vetor de sinais $\\mathbf{a} = (a_1, a_2, \\dots, a_m)^\\top$ e executa duas operações consecutivas rigorosas:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$z_j = \\sum_{i=1}^m w_{ji} a_i + b_j = \\mathbf{w}_j^\\top \\mathbf{a} + b_j, \\qquad a_j = \\sigma(z_j)$$
            </div>

            <p>
              Por que a presença da função não-linear $\\sigma(\\cdot)$ é estritamente obrigatória? Considere uma rede neural profunda com $L$ camadas onde todas as funções de ativação fossem puramente lineares: $\\sigma(z) = z$. O cálculo da saída para a entrada $\\mathbf{x}$ seria uma cadeia direta de multiplicações de matrizes:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\hat{\\mathbf{y}} = \\mathbf{W}^{[L]} (\\mathbf{W}^{[L-1]} (\\dots (\\mathbf{W}^{[1]} \\mathbf{x} + \\mathbf{b}^{[1]}) \\dots ) + \\mathbf{b}^{[L-1]}) + \\mathbf{b}^{[L]}$$
            </div>

            <p>
              Pela associatividade da multiplicação matricial, o produto acumulado $\\mathbf{W}^{[L]} \\mathbf{W}^{[L-1]} \\dots \\mathbf{W}^{[1]}$ colapsa em uma única matriz equivalente $\\mathbf{W}_{\\text{eq}}$, e os vieses combinam-se em um vetor constante $\\mathbf{b}_{\\text{eq}}$:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\hat{\\mathbf{y}} = \\mathbf{W}_{\\text{eq}} \\mathbf{x} + \\mathbf{b}_{\\text{eq}}$$
            </div>

            <p>
              Isso demonstra o <strong>Teorema do Colapso Linear</strong>: sem funções de ativação não-lineares, uma rede neural profunda de cem camadas é algebricamente idêntica a uma regressão linear simples de camada única. A capacidade de empilhar representações hierárquicas complexas reside exclusivamente nas não-linearidades introduzidas por $\\sigma(z)$.
            </p>

            <!-- Demonstração Animada em Vídeo (Manim): O Problema do XOR -->
            <figure class="flex flex-col items-center justify-center my-6">
              <div class="w-full max-w-xl aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
                <video controls autoplay loop muted playsinline class="w-full h-full object-cover block">
                  <source src="assets/videos/problemaxor.mp4" type="video/mp4">
                  Seu navegador não suporta a tag de vídeo.
                </video>
              </div>
              <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md">
                O Problema do XOR (Minsky &amp; Papert, 1969): inseparabilidade linear do Perceptron simples (acurácia máxima de $75\\%$) e resolução com $100\\%$ de separação convexa via camada oculta não-linear.
              </figcaption>
            </figure>

            <!-- Análise Geométrica e Decomposição Lógica do XOR -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
              <span class="font-bold text-slate-900 dark:text-white text-xs block">A Decomposição Lógica do XOR em Duas Fronteiras Lineares:</span>
              <p class="text-slate-600 dark:text-slate-300">
                No espaço bidimensional $\\mathbb{R}^2$, a fronteira de decisão de um neurônio isolado é definida pela reta $w_1 x_1 + w_2 x_2 + b = 0$. Enquanto os operadores booleanos $E$ (AND) e $OU$ (OR) são linearmente separáveis por uma única reta (o AND isola $(1,1)$ dos demais; o OR isola $(0,0)$ dos demais), o operador $XOR$ possui saídas positivas em $(0,1)$ e $(1,0)$ e saídas nulas em $(0,0)$ e $(1,1)$. Como os pares de mesma classe ocupam diagonais opostas, nenhuma reta única consegue segregá-los.
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                A solução arquitetural consiste em decompor o XOR na conjunção lógica de duas portas primitivas linearmente separáveis:
              </p>
              <div class="py-1 text-center font-semibold font-mono text-xs text-indigo-600 dark:text-indigo-400">
                $$\\text{XOR}(x_1, x_2) = \\text{OR}(x_1, x_2) \\land \\text{NAND}(x_1, x_2)$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                Essa decomposição revela a mecânica geométrica exata executada por um Perceptron Multicamadas com 2 neurônios ocultos e 1 neurônio de saída:
              </p>
              <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>Neurônio Oculto 1 ($h_1$ - Porta OR):</strong> Traça uma primeira reta que isola e descarta a origem $(0,0)$, disparando $1$ para os outros três pontos.</li>
                <li><strong>Neurônio Oculto 2 ($h_2$ - Porta NAND):</strong> Traça uma segunda reta que isola e descarta o vértice oposto $(1,1)$, disparando $1$ para os outros três pontos.</li>
                <li><strong>Neurônio de Saída ($y$ - Porta AND):</strong> Recebe $h_1$ e $h_2$ e calcula sua conjunção lógica ($h_1 \\land h_2$), disparando exclusivamente quando <em>ambos</em> os neurônios ocultos estão ativos simultaneamente — o que ocorre com precisão cirúrgica apenas na faixa diagonal onde residem $(0,1)$ e $(1,0)$!</li>
              </ul>
              <div class="p-2 rounded bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-800 dark:text-indigo-300">
                <strong>O Papel Revolucionário do Backpropagation:</strong> Enquanto neste problema bidimensional pudemos definir manualmente as retas $h_1$ e $h_2$, em aplicações reais com centenas de dimensões e bilhões de parâmetros (como visão computacional e modelos de linguagem), é humanamente impossível desenhar as fronteiras intermediárias. O algoritmo de Retropropagação é a engrenagem que descobre e esculpe essas representações latentes automaticamente por descida do gradiente.
              </div>
            </div>
          </div>

          <!-- Subseção 2.2: Funções de Ativação -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.2 O Zoológico das Funções de Ativação e o Desaparecimento do Gradiente
            </h3>

            <p>
              A escolha de $\\sigma(z)$ determina a dinâmica de propagação e a estabilidade numérica dos gradientes em redes profundas. Historicamente, três famílias principais de funções moldaram o campo:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <!-- Sigmoide -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <span class="font-bold text-slate-900 dark:text-white block text-xs">1. ${termHint("sigmoide")} (Logística)</span>
                <div class="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                  $$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  Mapeia $\\mathbb{R} \\to (0, 1)$. Sua derivada é dada por $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$, cujo valor máximo é exatamente $0.25$ em $z = 0$.
                </p>
                <div class="p-1.5 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-[10px]">
                  <strong>Saturação:</strong> Para $|z| > 4$, a derivada tende a zero, anulando o gradiente.
                </div>
              </div>

              <!-- Tanh -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <span class="font-bold text-slate-900 dark:text-white block text-xs">2. Tangente Hiperbólica</span>
                <div class="font-mono text-[11px] text-teal-600 dark:text-teal-400">
                  $$\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$$
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  Mapeia $\\mathbb{R} \\to (-1, 1)$, sendo centrada em zero (média nula). Derivada $\\tanh'(z) = 1 - \\tanh^2(z)$, com pico unitário igual a $1.0$ em $z = 0$.
                </p>
                <div class="p-1.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-[10px]">
                  <strong>Limitação:</strong> Reduz o viés sistemático, mas ainda sofre de saturação em caudas extremas.
                </div>
              </div>

              <!-- ReLU -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <span class="font-bold text-slate-900 dark:text-white block text-xs">3. ${termHint("relu")} (Rectified Linear)</span>
                <div class="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  $$\\operatorname{ReLU}(z) = \\max(0, z)$$
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-[11px]">
                  Derivada constante e igual a $1$ para qualquer $z > 0$, e $0$ para $z < 0$. Padrão dominante da indústria moderna.
                </p>
                <div class="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[10px]">
                  <strong>Anti-Vanishing:</strong> Derivada unitária permite que o sinal de gradiente atravesse dezenas de camadas sem atenuação.
                </div>
              </div>

            </div>

            <p class="pt-2">
              A razão matemática pela qual a ReLU substituiu a Sigmóide nas camadas profundas é o fenômeno do <strong>${termHint("vanishing-gradient")}</strong>. Quando a regra da cadeia é calculada ao longo de $L$ camadas saturadas por sigmóides, o gradiente retropropagado é multiplicado por $L$ derivadas locais menores que $0.25$:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\prod_{l=1}^L \\sigma'(z^{[l]}) \\le (0.25)^L$$
            </div>

            <p>
              Em uma rede de apenas $10$ camadas, temos $(0.25)^{10} \\approx 9.5 \\times 10^{-7}$. O gradiente que alcança os pesos da primeira camada torna-se praticamente nulo, paralisando o aprendizado da base do modelo. Com a ReLU, a derivada no regime ativo é sempre estritamente $1$, permitindo que o gradiente viaje intacto através de redes com centenas de camadas (como ResNets e Transformers).
            </p>
          </div>

          <!-- Subseção 2.3: Teorema da Aproximação Universal -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.3 O Perceptron Multicamadas (MLP) e o Teorema da Aproximação Universal
            </h3>

            <p>
              Um ${termHint("mlp", "Perceptron Multicamadas (MLP)")} é formalmente definido pela composição sucessiva de $L$ camadas densas:
            </p>

            <div class="py-2 text-center text-sm font-semibold">
              $$\\mathbf{a}^{[0]} = \\mathbf{x}, \\qquad \\mathbf{z}^{[l]} = \\mathbf{W}^{[l]} \\mathbf{a}^{[l-1]} + \\mathbf{b}^{[l]}, \\qquad \\mathbf{a}^{[l]} = \\sigma(\\mathbf{z}^{[l]}), \\quad \\forall l \\in \\{1, 2, \\dots, L\\}$$
            </div>

            <p>
              A fundamentação teórica de que essa estrutura é capaz de aprender padrões complexos foi formalizada por George Cybenko (1989) e Kurt Hornik (1991) no <strong>${termHint("aproximacao-universal", "Teorema da Aproximação Universal")}</strong>:
            </p>

            <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span class="font-bold text-slate-900 dark:text-white text-xs block">Enunciado Formal de Cybenko-Hornik:</span>
              <p class="text-slate-600 dark:text-slate-300">
                Seja $I_n = [0, 1]^n$ o hipercubo unitário compacto em $\\mathbb{R}^n$, e denote por $C(I_n)$ o espaço de funções contínuas sobre $I_n$. Seja $\\sigma$ qualquer função contínua não-linear sigmoidal ou discriminatória. Para qualquer função contínua arbitrária $f \\in C(I_n)$ e qualquer tolerância positiva $\\varepsilon > 0$, existe uma rede neural de <strong>apenas uma camada oculta</strong> com um número finito $N$ de neurônios, pesos $\\mathbf{w}_i, \\mathbf{w}_i'$ e vieses $b_i$, dada por:
              </p>
              <div class="py-1 text-center font-semibold font-mono text-xs">
                $$F(\\mathbf{x}) = \\sum_{i=1}^N \\alpha_i \\sigma(\\mathbf{w}_i^\\top \\mathbf{x} + b_i)$$
              </div>
              <p class="text-slate-600 dark:text-slate-300">
                tal que a aproximação satisfaz: $\\sup_{\\mathbf{x} \\in I_n} |F(\\mathbf{x}) - f(\\mathbf{x})| < \\varepsilon$.
              </p>
            </div>

            <p>
              Embora o teorema garanta que uma rede rasa (com 1 camada oculta) seja teoricamente capaz de representar qualquer função, o número de neurônios necessários $N$ pode crescer exponencialmente com a dimensão dos dados ($N \\sim \\mathcal{O}(2^d)$). É aqui que entra o poder do <strong>Deep Learning</strong>: redes profundas decompõem o problema em uma hierarquia de funções mais simples, alcançando a mesma capacidade expressiva com um número exponencialmente menor de parâmetros.
            </p>
          </div>

          <!-- Subseção 2.4: Mecânica Rigorosa do Backpropagation -->
          <div class="space-y-4 pt-2">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              2.4 A Mecânica Rigorosa do Backpropagation (Dedução Completa)
            </h3>

            <p>
              O ${termHint("backpropagation")} é o algoritmo analítico exato que viabiliza o ajuste de todos os parâmetros $\\mathbf{W}^{[l]}$ e $\\mathbf{b}^{[l]}$ da rede. Ele opera em duas fases síncronas:
            </p>

            <!-- Demonstração Animada em Vídeo (Manim): Fluxo do Backpropagation -->
            <figure class="flex flex-col items-center justify-center my-6">
              <div class="w-full max-w-xl aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
                <video controls autoplay loop muted playsinline class="w-full h-full object-cover block">
                  <source src="assets/videos/fluxobackpropagation.mp4" type="video/mp4">
                  Seu navegador não suporta a tag de vídeo.
                </video>
              </div>
              <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md">
                Fluxo de processamento em rede neural feedforward: a Passagem Direta (Forward) propaga as ativações $\\mathbf{x} \\to \\mathbf{z} \\to \\mathbf{a} \\to \\hat{y}$ até a perda $\\mathcal{L}$; em seguida, a Retropropagação (Backward) calcula recursivamente os gradientes $\\boldsymbol{\\delta}$ pela regra da cadeia para atualizar os pesos sinápticos $\\mathbf{W}$.
              </figcaption>
            </figure>

            <div class="space-y-4 text-xs">
              
              <!-- Fase 1: Forward -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Fase 1: Passagem Direta (Forward Pass)</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono text-[10px]">Entrada &rarr; Saída</span>
                </h4>
                <p class="text-slate-600 dark:text-slate-300">
                  Para uma amostra de entrada $\\mathbf{x}$, propagamos camada por camada, armazenando os vetores pré-sinápticos $\\mathbf{z}^{[l]}$ e ativações $\\mathbf{a}^{[l]}$ na memória:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs">
                  $$\\mathbf{z}^{[l]} = \\mathbf{W}^{[l]} \\mathbf{a}^{[l-1]} + \\mathbf{b}^{[l]}, \\qquad \\mathbf{a}^{[l]} = \\sigma(\\mathbf{z}^{[l]}), \\quad \\forall l = 1, \\dots, L$$
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Na camada de saída $L$, a predição $\\hat{y} = a^{[L]}$ é confrontada com o rótulo verdadeiro $y$ através da função de Entropia Cruzada Binária (Log-Loss):
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs">
                  $$\\mathcal{L}(\\hat{y}, y) = - \\left[ y \\ln(\\hat{y}) + (1 - y) \\ln(1 - \\hat{y}) \\right]$$
                </div>
              </div>

              <!-- Fase 2: Backward -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Fase 2: Dedução do Sinal de Erro da Saída ($\\boldsymbol{\\delta}^{[L]}$)</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">Regra da Cadeia Base</span>
                </h4>
                <p class="text-slate-600 dark:text-slate-300">
                  Definimos o sinal de erro da camada $l$ como a derivada parcial do custo com respeito ao potencial pré-ativado: $\\boldsymbol{\\delta}^{[l]} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}^{[l]}}$. Pela regra da cadeia:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs">
                  $$\\delta^{[L]} = \\frac{\\partial \\mathcal{L}}{\\partial z^{[L]}} = \\frac{\\partial \\mathcal{L}}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial z^{[L]}} = \\left( - \\frac{y}{\\hat{y}} + \\frac{1 - y}{1 - \\hat{y}} \\right) \\cdot \\hat{y}(1 - \\hat{y}) = \\frac{\\hat{y} - y}{\\hat{y}(1 - \\hat{y})} \\cdot \\hat{y}(1 - \\hat{y})$$
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  Os termos do denominador cancelam-se perfeitamente com a derivada da função sigmóide, resultando em uma equação elegante e numericamente estável:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  $$\\delta^{[L]} = \\hat{y} - y$$
                </div>
              </div>

              <!-- Fase 3: Retropropagação -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Fase 3: Propagação Recursiva para Camadas Ocultas ($\\boldsymbol{\\delta}^{[l]}$)</span>
                  <span class="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-mono text-[10px]">Saída &rarr; Entrada</span>
                </h4>
                <p class="text-slate-600 dark:text-slate-300">
                  Para calcular o erro na camada anterior $l$, aplicamos novamente a regra da cadeia matricial através da matriz transposta de pesos $\\mathbf{W}^{[l+1]\\top}$ e multiplicamos elemento a elemento (produto Hadamard $\\odot$) pela derivada local da função de ativação:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs text-rose-600 dark:text-rose-400">
                  $$\\boldsymbol{\\delta}^{[l]} = \\left( \\mathbf{W}^{[l+1]\\top} \\boldsymbol{\\delta}^{[l+1]} \\right) \\odot \\sigma'(\\mathbf{z}^{[l]})$$
                </div>
              </div>

              <!-- Fase 4: Gradientes de Parâmetros -->
              <div class="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Fase 4: Cálculo dos Gradientes e Atualização dos Pesos</span>
                  <span class="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-mono text-[10px]">Otimização Numérica</span>
                </h4>
                <p class="text-slate-600 dark:text-slate-300">
                  Com os sinais de erro $\\boldsymbol{\\delta}^{[l]}$ calculados, as derivadas parciais da perda com respeito aos parâmetros sinápticos são expressas pelo produto externo:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs">
                  $$\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{[l]}} = \\boldsymbol{\\delta}^{[l]} (\\mathbf{a}^{[l-1]})^\\top, \\qquad \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}^{[l]}} = \\boldsymbol{\\delta}^{[l]}$$
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  A atualização dos pesos com taxa de aprendizado $\\alpha$ opera diretamente:
                </p>
                <div class="py-1 text-center font-semibold font-mono text-xs">
                  $$\\mathbf{W}^{[l]} \\leftarrow \\mathbf{W}^{[l]} - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{[l]}}, \\qquad \\mathbf{b}^{[l]} \\leftarrow \\mathbf{b}^{[l]} - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}^{[l]}}$$
                </div>
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
            O Perceptron Multicamadas e o algoritmo de Backpropagation constituem o motor primitivo sobre o qual repousam todas as arquiteturas contemporâneas de inteligência artificial. Abaixo examinamos quatro desafios de engenharia reais:
          </p>

          <div class="space-y-6 text-xs">
            
            <!-- Aplicação 1: Classificação Não-Linear -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>3.1 Detecção de Fraude em Meios de Pagamento com Fronteiras Poligonais</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Em transações bancárias e de e-commerce, clientes legítimos e fraudadores não se separam por um único plano reto de valor monetário e horário. Padrões de fraude envolvem bolsões concêntricos e correlações não-lineares sutis (ex: transações de valores médios feitas consecutivamente em intervalos anômalos de segundos).
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Enquanto modelos lineares como Regressão Logística ou SVM linear exigem a criação manual de atributos cruzados e polinomiais ($x_1^2, x_1 x_2$), uma rede MLP de duas camadas ocultas aprende automaticamente a representação geométrica dos bolsões de fraude, isolando regiões irregulares no espaço latente.
              </p>
            </div>

            <!-- Aplicação 2: Inicialização de Pesos -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>3.2 A Física da Inicialização de Pesos: Glorot/Xavier e He/Kaiming</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Inicializar todos os pesos com zeros ($\mathbf{W} = \mathbf{0}$) é fatal para uma rede neural: todos os neurônios da camada oculta calculam exatamente a mesma ativação e recebem exatamente o mesmo gradiente, sofrendo do <em>problema de quebra de simetria</em>. A rede colapsa como se possuísse apenas um neurônio.
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Entretanto, gerar números aleatórios gaussianos ingênuos com variância excessiva faz as ativações explodirem ou saturarem na sigmóide. A solução matemática formal decorre da preservação da variância das ativações ao longo das camadas:
              </p>
              <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>Inicialização de Glorot / Xavier (2010):</strong> Para ativações Tanh e Sigmóide, amostragem com $\operatorname{Var}(W) = \frac{2}{n_{\text{in}} + n_{\text{out}}}$.</li>
                <li><strong>Inicialização de He / Kaiming (2015):</strong> Para ativações ReLU (onde metade dos neurônios é desligada para entradas negativas), amostragem com $\operatorname{Var}(W) = \frac{2}{n_{\text{in}}}$.</li>
              </ul>
            </div>

            <!-- Aplicação 3: Regularização Dropout -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>3.3 Regularização por Dropout: Ensembles Implícitos de Redes Neurais</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Devido à imensa quantidade de parâmetros livres, redes neurais densas possuem alta facilidade para memorizar ruídos e sofrer de sobreajuste (<em>overfitting</em>).
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Em 2014, Nitish Srivastava e Geoffrey Hinton introduziram o <strong>Dropout</strong>: a cada mini-batch de treinamento, cada neurônio oculto tem uma probabilidade $p$ (ex: $50\\%$) de ser temporariamente desativado (zerado). Esse mecanismo impede que neurônios desenvolvam co-adaptações patológicas mútuas, forçando cada unidade a aprender atributos robustos e atuando matematicamente como um comitê (<em>ensemble</em>) de $2^N$ sub-redes treinadas em conjunto.
              </p>
            </div>

            <!-- Aplicação 4: GPUs e Aceleração Matricial -->
            <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>3.4 Do Grafo Computacional ao Silício: Aceleração em GPUs e TPUs</span>
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                Na sua essência, tanto a passagem direta quanto a retropropagação são sequências massivas de produtos matriciais densos: $\mathbf{Z} = \mathbf{W}\mathbf{A} + \mathbf{b}$ e $\mathbf{W}^\top \boldsymbol{\delta}$.
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Processadores modernos (CPUs) possuem poucos núcleos otimizados para instruções seriais complexas. Já as GPUs (Graphics Processing Units) contêm milhares de núcleos menores paralelos capazes de executar multiplicações e acumulações matriciais (GEMM - <em>General Matrix Multiplication</em>) com precisão de ponto flutuante reduzida (FP16, BF16 ou FP8 em Tensor Cores), acelerando o treinamento de dias ou meses para poucas horas.
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
            Todas as fontes canônicas e artigos seminais citados abaixo possuem links de acesso aberto e permanente validados:
          </p>

          <ul class="space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800/60">
            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">HAYKIN, Simon.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Redes Neurais: Princípios e Prática</em>. 2. ed. Porto Alegre: Bookman, 2001.</span>
              <div class="mt-1">
                <span class="text-slate-500 dark:text-slate-400 text-[11px]">Tratado canônico de referência para fundamentos neurocomputacionais e dinâmica conexionista.</span>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">McCULLOCH, Warren S.; PITTS, Walter.</span>
              <span class="text-slate-600 dark:text-slate-300"> A Logical Calculus of the Ideas Immanent in Nervous Activity. <em>Bulletin of Mathematical Biophysics</em>, v. 5, p. 115–133, 1943.</span>
              <div class="mt-1">
                <a href="https://archive.org/details/bulletinofmathem05chic" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Edição original digitalizada no Internet Archive (Volume 5 da Universidade de Chicago)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">HEBB, Donald O.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>The Organization of Behavior: A Neuropsychological Theory</em>. New York: John Wiley &amp; Sons, 1949.</span>
              <div class="mt-1">
                <a href="https://archive.org/details/organizationofbe00hebbrich" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Obra seminal digitalizada no Internet Archive
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">ROSENBLATT, Frank.</span>
              <span class="text-slate-600 dark:text-slate-300"> The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain. <em>Psychological Review</em>, v. 65, n. 6, p. 386–408, 1958.</span>
              <div class="mt-1">
                <a href="https://archive.org/details/perceptronprobab00rose" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Publicação original preservada no Internet Archive / Cornell Aeronautical Laboratory
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">WIDROW, Bernard; HOFF, Marcian E.</span>
              <span class="text-slate-600 dark:text-slate-300"> Adaptive switching circuits. In: <em>1960 IRE WESCON Convention Record</em>, v. 4, p. 96–104, 1960.</span>
              <div class="mt-1 flex flex-wrap gap-3">
                <a href="http://www-isl.stanford.edu/~widrow/papers/c1960adaptiveswitching.pdf" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Arquivo Oficial no Stanford Information Systems Laboratory
                </a>
                <span class="text-slate-400">&bull;</span>
                <a href="https://apps.dtic.mil/sti/citations/AD0241531" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Registro Técnico DTIC (AD0241531)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">MINSKY, Marvin; PAPERT, Seymour.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Perceptrons: An Introduction to Computational Geometry</em>. Cambridge: MIT Press, 1969.</span>
              <div class="mt-1">
                <a href="https://openlibrary.org/works/OL262272W/Perceptrons" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Registro e ficha histórica na Open Library (MIT Press)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">RUMELHART, David E.; HINTON, Geoffrey E.; WILLIAMS, Ronald J.</span>
              <span class="text-slate-600 dark:text-slate-300"> Learning representations by back-propagating errors. <em>Nature</em>, v. 323, p. 533–536, 1986.</span>
              <div class="mt-1 flex flex-wrap gap-3">
                <a href="https://www.nature.com/articles/323533a0" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Artigo Oficial na Revista Nature
                </a>
                <span class="text-slate-400">&bull;</span>
                <a href="https://archive.org/details/nature-323-533" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Cópia Aberta no Internet Archive
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">CYBENKO, George.</span>
              <span class="text-slate-600 dark:text-slate-300"> Approximation by superpositions of a sigmoidal function. <em>Mathematics of Control, Signals and Systems</em>, v. 2, p. 303–314, 1989.</span>
              <div class="mt-1">
                <a href="https://eudml.org/doc/184131" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Acesso digital aberto na European Digital Mathematics Library (EuDML)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">GOODFELLOW, Ian; BENGIO, Yoshua; COURVILLE, Aaron.</span>
              <span class="text-slate-600 dark:text-slate-300"> <em>Deep Learning</em>. Cambridge: MIT Press, 2016.</span>
              <div class="mt-1">
                <a href="https://www.deeplearningbook.org/" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Edição Aberta Online (MIT Press Companion Website)
                </a>
              </div>
            </li>

            <li class="pt-3">
              <span class="font-bold text-slate-900 dark:text-white">LeCUN, Yann; BENGIO, Yoshua; HINTON, Geoffrey.</span>
              <span class="text-slate-600 dark:text-slate-300"> Deep learning. <em>Nature</em>, v. 521, p. 436–444, 2015.</span>
              <div class="mt-1">
                <a href="https://www.nature.com/articles/nature14539" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800">
                  Artigo de Revisão Científica na Revista Nature
                </a>
              </div>
            </li>
          </ul>
        </section>

        <!-- Seção 5: Laboratório Interativo Integrado -->
        <section id="sec-laboratorio-interativo" class="space-y-4 scroll-mt-24 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              5. Laboratório Interativo: Playground de Redes Neurais (MLP 2D)
            </h2>
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
