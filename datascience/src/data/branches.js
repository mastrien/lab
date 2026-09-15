// Catálogo abrangente de ramificações da Ciência de Dados

export const DS_BRANCHES = [
  // Módulos Ativos do DataLab
  {
    id: "kdd",
    name: "Mineração de Dados & KDD",
    category: "Engenharia de Descoberta",
    status: "active",
    badge: "Essencial",
    badgeColor: "emerald",
    icon: "⛏️",
    shortDesc: "O processo KDD de ponta a ponta: regras de associação (Apriori), suporte, confiança e mineração de padrões.",
    summary: "Seção dedicada ao processo de Knowledge Discovery in Databases (KDD) e suas 5 etapas fundamentais."
  },
  {
    id: "eda",
    name: "Análise Exploratória (EDA)",
    category: "Fundamentos Analíticos",
    status: "active",
    badge: "Essencial",
    badgeColor: "blue",
    icon: "📊",
    shortDesc: "Diagnóstico de saúde da base, tipos de variáveis, estatísticas descritivas e matriz de correlação interativa.",
    summary: "Entenda a distribuição, assimetria, nulos e relações entre variáveis antes de qualquer modelagem."
  },
  {
    id: "preprocessing",
    name: "Pré-Processamento & Features",
    category: "Engenharia de Dados",
    status: "active",
    badge: "Essencial",
    badgeColor: "amber",
    icon: "⚙️",
    shortDesc: "Scalers visuais (Standard vs MinMax), One-Hot Encoding e redução de dimensionalidade (PCA 2D/3D).",
    summary: "Transforme dados brutos em representações numéricas otimizadas para algoritmos de Machine Learning."
  },
  {
    id: "supervised",
    name: "Aprendizado Supervisionado",
    category: "Machine Learning",
    status: "active",
    badge: "Interativo",
    badgeColor: "violet",
    icon: "🧠",
    shortDesc: "Fronteiras de decisão 2D (KNN, Árvore de Decisão) e simulador de Overfitting na Regressão Polinomial.",
    summary: "Ajuste hiperparâmetros em tempo real e visualize como o algoritmo aprende e separa as classes."
  },
  {
    id: "unsupervised",
    name: "Não-Supervisionado & Clustering",
    category: "Machine Learning",
    status: "active",
    badge: "Interativo",
    badgeColor: "indigo",
    icon: "🧩",
    shortDesc: "K-Means passo a passo com migração de centroides e gráfico do método do cotovelo (Elbow Curve).",
    summary: "Descubra agrupamentos naturais e estruturas ocultas em dados sem rótulos prévios."
  },
  {
    id: "evaluation",
    name: "Avaliação & Métricas",
    category: "Validação & Diagnóstico",
    status: "active",
    badge: "Interativo",
    badgeColor: "rose",
    icon: "🎯",
    shortDesc: "Matriz de Confusão dinâmica com slider de Threshold (limiar de corte) e cálculo de Curva ROC/AUC.",
    summary: "Entenda o trade-off entre Precisão e Recall e como escolher o melhor ponto de corte para o negócio."
  },
  {
    id: "mylab",
    name: "Meu Laboratório DS",
    category: "Playground & Prática",
    status: "active",
    badge: "Prático",
    badgeColor: "cyan",
    icon: "🧪",
    shortDesc: "Importe seus próprios dados em CSV e execute o pipeline completo diretamente no navegador.",
    summary: "Ambiente prático inspirado no Garu: carregue sua planilha e aplique profiling e modelagem localmente."
  },
  {
    id: "quizzes",
    name: "Desafios & Quizzes",
    category: "Educação & Fixação",
    status: "active",
    badge: "Gamificado",
    badgeColor: "yellow",
    icon: "🎓",
    shortDesc: "Teste e fixe seus conhecimentos conceituais com feedback imediato e explicações didáticas.",
    summary: "Perguntas desafiadoras sobre viés, variância, KDD, vazamento de dados e seleção de algoritmos."
  },

  // Ramificações Futuras (Placeholders Interativos)
  {
    id: "deep-learning",
    name: "Deep Learning & Redes Neurais",
    category: "Inteligência Artificial Avançada",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "purple",
    icon: "🤖",
    shortDesc: "Perceptron, funções de ativação (ReLU, Sigmoid), retropropagação (backpropagation) e redes neurais profundas.",
    details: {
      tagline: "O poder das representações hierárquicas e arquiteturas neurais profundas.",
      importance: "O Deep Learning revolucionou áreas como reconhecimento de voz, geração de texto e visão computacional, permitindo que computadores aprendam padrões abstratos diretamente de dados complexos e não estruturados sem necessidade de engenharia manual de features.",
      topics: [
        "Neurônio Artificial & Perceptron Multicamadas (MLP)",
        "Funções de Ativação Interativas: Sigmoid, Tanh, ReLU e Leaky ReLU",
        "Visualizador de Forward e Backpropagation com Gradiente Descendente",
        "Redes Neurais Convolucionais (CNN) e Recorrentes (RNN/LSTM)"
      ],
      tools: ["TensorFlow.js", "ONNX Web Runtime", "PyTorch concepts"]
    }
  },
  {
    id: "nlp",
    name: "Processamento de Linguagem Natural (NLP)",
    category: "Dados Não-Estruturados",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "sky",
    icon: "💬",
    shortDesc: "Tokenização, Bag-of-Words, TF-IDF, Word Embeddings semânticos e arquitetura Transformers.",
    details: {
      tagline: "Ensinando máquinas a compreender, interpretar e gerar linguagem humana.",
      importance: "A maior parte do conhecimento humano reside em textos não estruturados. O NLP capacita sistemas a realizar análise de sentimentos, tradução automática, extração de entidades e respostas a perguntas (LLMs).",
      topics: [
        "Pipeline de Texto: Limpeza, Remoção de Stopwords, Stemming e Lematização",
        "Vetorização: Bag-of-Words e Term Frequency-Inverse Document Frequency (TF-IDF)",
        "Espaços Vetoriais Semânticos: Word2Vec e Cosine Similarity",
        "Mecanismo de Atenção (Attention Mechanism) e Arquitetura Transformer"
      ],
      tools: ["NLTK concepts", "HuggingFace Transformers", "Word2Vec 3D Explorer"]
    }
  },
  {
    id: "computer-vision",
    name: "Visão Computacional",
    category: "Dados Visuais",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "teal",
    icon: "👁️",
    shortDesc: "Matrizes de pixels, convoluções 2D interativas (filtros Sobel, Gaussian Blur) e segmentação de imagens.",
    details: {
      tagline: "Extração de significado, padrões e geometria a partir de imagens e vídeos digitais.",
      importance: "Desde diagnósticos médicos por imagem até veículos autônomos e biometria facial, a Visão Computacional transforma tensores de pixels em inteligência visual acionável.",
      topics: [
        "Estrutura Digital da Imagem (Canais RGB, Grayscale e Histograma de Cores)",
        "Convoluções Interativas 2D: Aplique filtros Sobel, Blur e Sharpen no navegador",
        "Detecção de Bordas, Cantos e Características Relevantes",
        "Classificação e Detecção de Objetos com Redes Convolucionais"
      ],
      tools: ["OpenCV concepts", "Canvas Pixel Manipulation", "YOLO visualizer"]
    }
  },
  {
    id: "time-series",
    name: "Séries Temporais & Previsão",
    category: "Modelagem Sequencial",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "orange",
    icon: "📈",
    shortDesc: "Decomposição temporal (tendência, sazonalidade, ruído), médias móveis e modelos autoregressivos.",
    details: {
      tagline: "Compreensão do passado para projetar horizontes no futuro.",
      importance: "Diferente de dados tabulares comuns, séries temporais possuem dependência temporal crítica. São a base para previsão de demanda, séries financeiras, consumo de energia e sensores IoT.",
      topics: [
        "Componentes de Séries: Tendência, Sazonalidade Cíclica e Ruído Estocástico",
        "Estacionariedade e Testes de Raiz Unitária (Dickey-Fuller)",
        "Suavização Exponencial e Médias Móveis Ponderadas",
        "Modelos ARIMA (AutoRegressive Integrated Moving Average) e Prophet"
      ],
      tools: ["Plotly Time-Series", "Seasonal Decomposer", "ARIMA Simulator"]
    }
  },
  {
    id: "graph-analytics",
    name: "Grafos & Redes Complexas",
    category: "Conectividade & Topologia",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "fuchsia",
    icon: "🕸️",
    shortDesc: "Nós, arestas, centralidade de grau, algoritmo PageRank e detecção de comunidades em redes.",
    details: {
      tagline: "Descobrindo relações, conexões e influência em redes interconectadas.",
      importance: "Muitos problemas do mundo real não são linhas e colunas, mas redes: redes sociais, rotas de transporte, biologia de proteínas e transações financeiras suspeitas (combate a fraudes).",
      topics: [
        "Fundamentos de Teoria dos Grafos: Nós, Arestas direcionadas e com pesos",
        "Métricas de Centralidade: Grau, Intermediação (Betweenness) e Closeness",
        "O Algoritmo PageRank: Como links determinam autoridade",
        "Detecção de Comunidades (Louvain) e Agrupamentos Topológicos"
      ],
      tools: ["D3.js Force Graphs", "NetworkX concepts", "Cytoscape"]
    }
  },
  {
    id: "mlops",
    name: "MLOps & Ciclo de Vida de Modelos",
    category: "Engenharia & Produção",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "lime",
    icon: "🚀",
    shortDesc: "Da experimentação ao deploy: versionamento de dados, monitoramento de Data Drift e esteiras CI/CD.",
    details: {
      tagline: "Levar modelos do laboratório para o mundo real com confiabilidade e escala.",
      importance: "Mais de 80% dos modelos de Data Science nunca chegam a gerar valor porque falham na etapa de implantação e manutenção. MLOps une DevOps com Machine Learning.",
      topics: [
        "Ciclo de Vida de Modelos: Treinamento, Empacotamento, Registro e Deploy",
        "Detecção de Data Drift e Concept Drift quando os dados do mundo mudam",
        "Versionamento de Dados e Modelos com DVC e MLflow",
        "APIs de Inferência e Monitoramento de Latência e Erros"
      ],
      tools: ["MLflow concepts", "Docker for DS", "Drift Visualizer"]
    }
  },
  {
    id: "ai-ethics",
    name: "Ética, Viés & IA Responsável",
    category: "Governança & Sociedade",
    status: "upcoming",
    badge: "Em Breve",
    badgeColor: "pink",
    icon: "⚖️",
    shortDesc: "Identificação de viés algorítmico, métricas de justiça (fairness) e explicabilidade de modelos (XAI / SHAP).",
    details: {
      tagline: "Garantindo que algoritmos sejam justos, transparentes, auditáveis e éticos.",
      importance: "Sistemas automatizados tomam decisões sobre concessão de crédito, contratação de pessoas e justiça penal. Garantir que esses modelos não perpetuem preconceitos históricos é um dever fundamental do cientista de dados.",
      topics: [
        "Origens do Viés em Dados: Amostragem, Rótulos Históricos e Variáveis Ocultas",
        "Métricas Matemáticas de Justiça: Paridade Demográfica e Oportunidade Igualada",
        "Explicabilidade e Interpretabilidade (XAI): SHAP e LIME simplificados",
        "Privacidade de Dados: Anonimização e Privacidade Diferencial"
      ],
      tools: ["SHAP Waterfall simulator", "Fairness Metrics Inspector"]
    }
  }
];
