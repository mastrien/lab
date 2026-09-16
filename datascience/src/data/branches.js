// Catálogo abrangente de ramificações da Ciência de Dados

export const DS_BRANCHES = [
  // Módulos Ativos do DataLab
  {
    id: "kdd",
    name: "Mineração de Dados & KDD",
    category: "Descoberta de Conhecimento",
    status: "active",
    badge: "Disponível",
    iconKey: "database",
    shortDesc: "Etapas do processo KDD, regras de associação com o algoritmo Apriori e mineração de anomalias com IQR.",
    summary: "Estudo formal do processo de Knowledge Discovery in Databases e algoritmos de identificação de padrões."
  },
  {
    id: "eda",
    name: "Análise Exploratória (EDA)",
    category: "Estatística Descritiva",
    status: "active",
    badge: "Disponível",
    iconKey: "chart",
    shortDesc: "Tipos de atributos, medidas de tendência central e dispersão, matriz de correlação e dispersão bivariada.",
    summary: "Inspeção sistemática de distribuições, variâncias e correlações lineares em datasets tabulares."
  },
  {
    id: "preprocessing",
    name: "Pré-Processamento & Features",
    category: "Engenharia de Dados",
    status: "active",
    badge: "Disponível",
    iconKey: "sliders",
    shortDesc: "Normalização e padronização (MinMax, Standard, Robust), codificação One-Hot e projeção ortogonal PCA 2D.",
    summary: "Transformações numéricas e geométricas para preparação de conjuntos de dados para modelagem estatística."
  },
  {
    id: "supervised",
    name: "Aprendizado Supervisionado",
    category: "Modelagem Preditiva",
    status: "active",
    badge: "Disponível",
    iconKey: "brain",
    shortDesc: "Regressão polinomial com diagnóstico de viés e variância, e classificador K-Nearest Neighbors com fronteiras 2D.",
    summary: "Algoritmos supervisionados de regressão e classificação com ajuste interativo de hiperparâmetros."
  },
  {
    id: "unsupervised",
    name: "Não-Supervisionado (Clustering)",
    category: "Agrupamento de Dados",
    status: "active",
    badge: "Disponível",
    iconKey: "scatter",
    shortDesc: "Execução passo a passo do algoritmo K-Means, atualização de centroides e análise da inércia (Método do Cotovelo).",
    summary: "Particionamento de amostras sem rótulo prévio baseado em medidas de distância euclidiana."
  },
  {
    id: "evaluation",
    name: "Avaliação & Métricas",
    category: "Diagnóstico de Modelos",
    status: "active",
    badge: "Disponível",
    iconKey: "target",
    shortDesc: "Matriz de Confusão com limiar de decisão dinâmico, taxas de erro e Curva ROC com cálculo de AUC.",
    summary: "Métricas quantitativas para diagnóstico de classificadores binários sob variação de threshold."
  },
  {
    id: "mylab",
    name: "Gerenciador de Datasets & Lab",
    category: "Laboratório Prático",
    status: "active",
    badge: "Disponível",
    iconKey: "table",
    shortDesc: "Importação e persistência local de arquivos CSV, inspeção tabular e modelagem rápida diretamente no navegador.",
    summary: "Ambiente para upload de dados próprios e aplicação dos métodos disponíveis na plataforma."
  },
  {
    id: "quizzes",
    name: "Exercícios Conceituais",
    category: "Fixação e Avaliação",
    status: "active",
    badge: "Disponível",
    iconKey: "bookOpen",
    shortDesc: "Questões comentadas sobre fundamentos de KDD, métricas, vazamento de dados e trade-off viés-variância.",
    summary: "Avaliação formativa com feedback teórico imediato sobre conceitos fundamentais."
  },

  // Ramificações Futuras (Placeholders Estruturados)
  {
    id: "deep-learning",
    name: "Deep Learning & Redes Neurais",
    category: "Modelos Conexistas",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "cpu",
    shortDesc: "Topologias multicamadas (MLP), funções de ativação, retropropagação do erro e redes convolucionais.",
    details: {
      tagline: "Arquiteturas de redes neurais profundas para representação hierárquica de características.",
      importance: "O aprendizado profundo permite extrair padrões abstratos em domínios de alta dimensionalidade como imagens, sinais sonoros e representações densas.",
      topics: [
        "Perceptron Simples e Multicamadas (MLP)",
        "Funções de Ativação: Sigmoide, Tangente Hiperbólica e ReLU",
        "Algoritmo de Retropropagação (Backpropagation) e Otimizadores (SGD, Adam)",
        "Fundamentos de Redes Convolucionais (CNN) para dados em grade"
      ],
      tools: ["TensorFlow.js", "ONNX Runtime Web"]
    }
  },
  {
    id: "nlp",
    name: "Processamento de Linguagem Natural",
    category: "Dados Textuais",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "messageSquare",
    shortDesc: "Normalização textual, modelos Bag-of-Words, representação TF-IDF e embeddings semânticos.",
    details: {
      tagline: "Extração de estruturas sintáticas e semânticas de corpos textuais.",
      importance: "Permite estruturar e analisar grandes volumes de dados não tabulares para tarefas de classificação de texto, análise de tópicos e recuperação de informação.",
      topics: [
        "Pré-processamento Textual: Tokenização, Remoção de Stopwords e Lematização",
        "Representações Vetoriais: Bag-of-Words e Matriz TF-IDF",
        "Espaços Vetoriais Contínuos: Word Embeddings e Similaridade de Cosseno",
        "Mecanismos de Atenção e Introdução a Modelos Baseados em Transformers"
      ],
      tools: ["NLTK (conceitual)", "Transformers JS"]
    }
  },
  {
    id: "computer-vision",
    name: "Visão Computacional",
    category: "Processamento de Imagens",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "eye",
    shortDesc: "Operações matriciais sobre canais de cor, filtros convolucionais 2D e extração de contornos.",
    details: {
      tagline: "Processamento matemático e geométrico de sinais visuais digitais.",
      importance: "Tratamento de imagens matriciais para segmentação, detecção de bordas e extração de características visuais para tomada de decisão automatizada.",
      topics: [
        "Representação Matricial de Imagens: Canais RGB e Escala de Cinza",
        "Filtros de Convolução 2D: Passa-baixas (Blur) e Passa-altas (Sobel / Detecção de Bordas)",
        "Equalização de Histograma e Binarização Adaptativa",
        "Classificação e Segmentação Semântica de Regiões de Interesse"
      ],
      tools: ["Canvas 2D Image Filtering", "OpenCV Web"]
    }
  },
  {
    id: "time-series",
    name: "Séries Temporais",
    category: "Dados Sequenciais",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "trendingUp",
    shortDesc: "Decomposição aditiva e multiplicativa, médias móveis, autocorrelação e modelos autoregressivos.",
    details: {
      tagline: "Análise quantitativa de sequências temporais com autocorrelação.",
      importance: "Diferencia-se de dados tabulares pelo fator de ordenação temporal estrita, sendo indispensável em previsão de demanda, monitoramento de métricas e economia.",
      topics: [
        "Componentes Estruturais: Tendência, Sazonalidade e Resíduos Estocásticos",
        "Estacionariedade e Funções de Autocorrelação (ACF / PACF)",
        "Suavização Exponencial Simples e de Holt-Winters",
        "Introdução a Modelos Lineares Autoregressivos (AR, MA, ARIMA)"
      ],
      tools: ["Plotly.js Time Series", "Seasonal Decomposer"]
    }
  },
  {
    id: "graph-analytics",
    name: "Grafos & Redes Complexas",
    category: "Topologia e Conectividade",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "network",
    shortDesc: "Matrizes de adjacência, métricas de centralidade, propagação e detecção de comunidades.",
    details: {
      tagline: "Modelagem de relacionamentos e entidades interdependentes em estruturas de grafos.",
      importance: "Muitos sistemas complexos (redes biológicas, sistemas viários e redes sociais) são modelados formalmente através de nós e arestas com pesos e direcionamentos.",
      topics: [
        "Representação de Grafos: Matriz de Adjacência e Lista de Arestas",
        "Métricas Estruturais: Grau, Intermediação (Betweenness) e Proximidade",
        "Algoritmo PageRank e Difusão de Informação",
        "Particionamento de Grafos e Detecção de Comunidades"
      ],
      tools: ["D3.js Network Graph", "Cytoscape"]
    }
  },
  {
    id: "mlops",
    name: "MLOps & Governança",
    category: "Engenharia de Sistemas",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "gitBranch",
    shortDesc: "Rastreabilidade de experimentos, desvio de dados (data drift), reprodutibilidade e empacotamento.",
    details: {
      tagline: "Práticas e esteiras de engenharia para sustentação de modelos analíticos em produção.",
      importance: "Garante a reprodutibilidade dos experimentos científicos e monitora a perda de acurácia com a alteração temporal do perfil dos dados reais.",
      topics: [
        "Ciclo de Vida de Modelos: Treino, Registro, Homologação e Monitoramento",
        "Detecção de Data Drift e Deslocamento de Conceito (Concept Drift)",
        "Versionamento de Dados e Código para Reprodutibilidade",
        "Métricas de Latência de Inferência e Governança de Parâmetros"
      ],
      tools: ["MLflow concepts", "Drift Visualizer"]
    }
  },
  {
    id: "ai-ethics",
    name: "Ética, Viés & IA Responsável",
    category: "Governança e Confiabilidade",
    status: "upcoming",
    badge: "Planejado",
    iconKey: "shieldCheck",
    shortDesc: "Definições matemáticas de justiça (fairness), viés amostral e explicabilidade com SHAP e LIME.",
    details: {
      tagline: "Avaliação de imparcialidade, transparência e explicabilidade de sistemas algorítmicos.",
      importance: "Aborda a responsabilidade ética na modelagem de decisões automatizadas, evitando a propagação de viés discriminatório em grupos sub-representados.",
      topics: [
        "Origens do Viés Amostral e Variáveis de Confusão",
        "Critérios Formais de Justiça: Paridade Demográfica e Oportunidades Igualadas",
        "Explicabilidade Local e Global: Valores de Shapley (SHAP) e LIME",
        "Anonimização e Princípios de Privacidade Diferencial"
      ],
      tools: ["SHAP Waterfall simulator", "Fairness Metrics Panel"]
    }
  }
];
