// Base Curricular Canônica Estruturada em 10 Eixos

export const CURRICULUM_AXES = [
  {
    id: "axis-1",
    number: 1,
    slug: "fundamentos",
    title: "Fundamentos Matemáticos e Estatísticos",
    tagline: "A base analítica para inferência, modelagem formal e otimização.",
    iconKey: "target",
    shortDesc: "Álgebra linear computacional, cálculo diferencial, teoria de probabilidades, testes de hipóteses e inferência causal.",
    chapters: [
      {
        id: "axis-1-cap-1-linear-algebra",
        number: 1,
        title: "Álgebra Linear Computacional",
        shortDesc: "Vetores, espaços vetoriais, operações matriciais, determinantes, produto escalar e transformações lineares.",
        status: "complete",
        hasLab: true,
        labId: "linear-algebra-lab"
      },
      {
        id: "axis-1-cap-2-calculus-opt",
        number: 2,
        title: "Cálculo Multivariável e Otimização Numérica",
        shortDesc: "Gradientes, Jacobiana, Hessiana, funções de perda e algoritmos de descida de gradiente (SGD e Adam).",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-1-cap-3-clt",
        number: 3,
        title: "Probabilidade Teórica e o Teorema Central do Limite",
        shortDesc: "Variáveis aleatórias, distribuições teóricas, Teorema de Bayes e a convergência assintótica do TCL.",
        status: "pilot",
        hasLab: true,
        labId: "clt-lab"
      },
      {
        id: "axis-1-cap-4-inference",
        number: 4,
        title: "Inferência Estatística e Testes de Hipótese",
        shortDesc: "Estimação pontual e intervalar, teste t de Student, ANOVA, p-valor e métodos de reamostragem bootstrap.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-1-cap-5-causal",
        number: 5,
        title: "Inferência Causal e Modelos Estruturais",
        shortDesc: "Grafos acíclicos dirigidos (DAGs), do-calculus de Pearl e pareamento por escore de propensão.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-2",
    number: 2,
    slug: "engenharia",
    title: "Engenharia e Infraestrutura de Dados",
    tagline: "Sistemas distribuídos, armazenamento escalável e esteiras de dados.",
    iconKey: "database",
    shortDesc: "Ingestão batch e streaming (Kafka), bancos relacionais e NoSQL, Data Warehouses, Lakehouses e pipelines ETL com dbt.",
    chapters: [
      {
        id: "axis-2-cap-1-ingestion",
        number: 1,
        title: "Coleta, Ingestão e Mensageria de Dados",
        shortDesc: "Ingestão contínua em streaming, logs distribuídos com Apache Kafka e APIs REST/GraphQL.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-2-cap-2-databases",
        number: 2,
        title: "Bancos de Dados Relacionais e NoSQL",
        shortDesc: "Garantias ACID em SQL, modelagem relacional, documentos NoSQL, grafos e bancos colunares.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-2-cap-3-lakehouse",
        number: 3,
        title: "Data Warehouses, Lakes e Lakehouses",
        shortDesc: "Modelagem dimensional de Kimball, formatos abertos colunares (Parquet, Iceberg, Delta Lake).",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-2-cap-4-pipelines",
        number: 4,
        title: "Orquestração e Pipelines ETL/ELT com dbt",
        shortDesc: "DAGs de tarefas com Airflow/Prefect, transformações analíticas em SQL e testes automatizados.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-2-cap-5-distributed",
        number: 5,
        title: "Computação Massiva e Processamento Distribuído",
        shortDesc: "Paradigma MapReduce, processamento em memória com Apache Spark e paralelização com Ray.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-3",
    number: 3,
    slug: "governanca",
    title: "Gestão, Qualidade e Governança de Dados",
    tagline: "Confiabilidade corporativa, conformidade legal e integridade dos ativos.",
    iconKey: "shieldCheck",
    shortDesc: "Profiling e validação de qualidade de dados, linhagem ponta a ponta (data lineage), LGPD/GDPR e privacidade diferencial.",
    chapters: [
      {
        id: "axis-3-cap-1-quality",
        number: 1,
        title: "Qualidade, Validação e Profiling de Dados",
        shortDesc: "Métricas de integridade, testes declarativos de dados e profilaxia contra anomalias.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-3-cap-2-lineage",
        number: 2,
        title: "Metadados Ativos e Linhagem de Dados (Data Lineage)",
        shortDesc: "Rastreabilidade de proveniência de dados e catálogo corporativo de metadados.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-3-cap-3-privacy",
        number: 3,
        title: "Governança Regulatória, LGPD e Privacidade Diferencial",
        shortDesc: "Conformidade com LGPD/GDPR, anonimização matemática e mecanismos de perturbação Laplace.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-4",
    number: 4,
    slug: "preprocessamento",
    title: "Pré-Processamento e Engenharia de Atributos",
    tagline: "Transformação de dados brutos em representações matemáticas ótimas.",
    iconKey: "sliders",
    shortDesc: "Limpeza de ruídos, imputação de faltantes, normalizadores numéricos, One-Hot Encoding e redução por PCA.",
    chapters: [
      {
        id: "axis-4-cap-1-imputation",
        number: 1,
        title: "Higienização e Imputação de Dados Ausentes",
        shortDesc: "Diagnóstico dos mecanismos MCAR, MAR, MNAR e métodos estatísticos e iterativos de imputação.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-4-cap-2-scalers",
        number: 2,
        title: "Transformações Numéricas e Escalonamento",
        shortDesc: "MinMaxScaler, StandardScaler, RobustScaler e transformações de estabilização de variância (Box-Cox).",
        status: "in_progress",
        hasLab: true,
        labId: "scalers-lab"
      },
      {
        id: "axis-4-cap-3-encoding",
        number: 3,
        title: "Codificação Categórica e Engenharia de Atributos",
        shortDesc: "One-Hot Encoding, codificação ordinal, target encoding com suavização e atributos temporais/cíclicos.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-4-cap-4-pca",
        number: 4,
        title: "Redução de Dimensionalidade e Projeções Lineares",
        shortDesc: "Análise de Componentes Principais (PCA), preservação de variância e projeção ortogonal 2D.",
        status: "in_progress",
        hasLab: true,
        labId: "pca-lab"
      },
      {
        id: "axis-4-cap-5-selection",
        number: 5,
        title: "Seleção de Atributos (Feature Selection)",
        shortDesc: "Métodos de filtro, eliminação recursiva (RFE) e seleção embutida com penalização L1 (Lasso).",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-5",
    number: 5,
    slug: "kdd-eda",
    title: "Análise Exploratória e Mineração de Dados (KDD)",
    tagline: "Descoberta não direcionada de padrões, regras intrínsecas e anomalias.",
    iconKey: "chart",
    shortDesc: "Metodologias KDD e CRISP-DM, estatística descritiva de Tukey, regras de associação com Apriori e detecção de outliers.",
    chapters: [
      {
        id: "axis-5-cap-1-kdd-process",
        number: 1,
        title: "O Processo KDD e a Metodologia CRISP-DM",
        shortDesc: "As etapas formais de descoberta de conhecimento em bases de dados e boas práticas de projetos analíticos.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-5-cap-2-tukey-eda",
        number: 2,
        title: "Análise Exploratória de Dados de John Tukey (EDA)",
        shortDesc: "Medidas de tendência central, dispersão empírica, matrizes de correlação e gráficos bivariados.",
        status: "in_progress",
        hasLab: true,
        labId: "eda-stats-lab"
      },
      {
        id: "axis-5-cap-3-apriori",
        number: 3,
        title: "Mineração de Regras de Associação e Algoritmo Apriori",
        shortDesc: "Propriedade anti-monótona, conjuntos frequentes de itens e métricas de Suporte, Confiança e Lift.",
        status: "in_progress",
        hasLab: true,
        labId: "apriori-lab"
      },
      {
        id: "axis-5-cap-4-outliers",
        number: 4,
        title: "Detecção de Anomalias e Outliers",
        shortDesc: "Regra do intervalo interquartil (Tukey IQR), escore Z, métodos baseados em densidade e Isolation Forest.",
        status: "in_progress",
        hasLab: true,
        labId: "tukey-outlier-lab"
      },
      {
        id: "axis-5-cap-5-graphs",
        number: 5,
        title: "Mineração de Sequências, Grafos e Redes Complexas",
        shortDesc: "Padrões sequenciais, análise topológica de grafos, centralidade e algoritmo PageRank.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-6",
    number: 6,
    slug: "machine-learning",
    title: "Aprendizado de Máquina (Machine Learning)",
    tagline: "Indução estatística, algoritmos preditivos e agrupamento inteligente.",
    iconKey: "brain",
    shortDesc: "Regressão polinomial, regularizações L1/L2, classificação KNN/SVM/Árvores/Ensembles, K-Means e aprendizado por reforço.",
    chapters: [
      {
        id: "axis-6-cap-1-regression",
        number: 1,
        title: "Regressão Linear, Polinomial e Regularizações",
        shortDesc: "Mínimos Quadrados Ordinários (OLS), regressão polinomial, Ridge ($L_2$) e Lasso ($L_1$).",
        status: "in_progress",
        hasLab: true,
        labId: "polynomial-regression-lab"
      },
      {
        id: "axis-6-cap-2-classification",
        number: 2,
        title: "Classificação Supervisionada e Fronteiras de Decisão",
        shortDesc: "K-Nearest Neighbors (KNN), Regressão Logística, Naive Bayes e Support Vector Machines (SVM).",
        status: "in_progress",
        hasLab: true,
        labId: "knn-classifier-lab"
      },
      {
        id: "axis-6-cap-3-trees",
        number: 3,
        title: "Árvores de Decisão e Métodos Ensemble",
        shortDesc: "Algoritmos CART, Random Forest, Gradient Boosting Machine (GBM), XGBoost e LightGBM.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-6-cap-4-clustering",
        number: 4,
        title: "Agrupamento Não-Supervisionado (Clustering)",
        shortDesc: "K-Means particional, critério do cotovelo (inércia), agrupamento hierárquico e DBSCAN.",
        status: "in_progress",
        hasLab: true,
        labId: "kmeans-lab"
      },
      {
        id: "axis-6-cap-5-rl",
        number: 5,
        title: "Fundamentos de Aprendizado por Reforço",
        shortDesc: "Processos de Decisão de Markov (MDP), Equação de Bellman e algoritmo Q-Learning.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-7",
    number: 7,
    slug: "deep-learning",
    title: "Inteligência Artificial Avançada e Deep Learning",
    tagline: "Representações neurais profundas, visão computacional e modelos de linguagem.",
    iconKey: "cpu",
    shortDesc: "Perceptrons multicamadas (MLP), retropropagação (backprop), convoluções 2D, Transformers, LLMs, RAG e modelos generativos.",
    chapters: [
      {
        id: "axis-7-cap-1-neural-networks",
        number: 1,
        title: "Redes Neurais Artificiais e Backpropagation",
        shortDesc: "Neurônio artificial, Perceptron Multicamadas (MLP), funções de ativação e retropropagação do erro.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-7-cap-2-computer-vision",
        number: 2,
        title: "Visão Computacional e Redes Convolucionais (CNN)",
        shortDesc: "Operações de convolução 2D, pooling, kernels de realce e Vision Transformers (ViT).",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-7-cap-3-nlp-transformers",
        number: 3,
        title: "Processamento de Linguagem Natural e Transformers",
        shortDesc: "Embeddings densos, mecanismo de auto-atenção multi-cabeça e arquiteturas BERT/GPT.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-7-cap-4-llms-rag",
        number: 4,
        title: "Modelos de Linguagem de Grande Porte (LLMs) e RAG",
        shortDesc: "Ajuste fino eficiente (LoRA/QLoRA) e arquitetura de Geração Aumentada por Recuperação.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-7-cap-5-generative",
        number: 5,
        title: "Modelos Generativos e Espaços Latentes",
        shortDesc: "Autoencoders Variacionais (VAEs), Redes Adversárias Generativas (GANs) e Modelos de Difusão.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-8",
    number: 8,
    slug: "avaliacao",
    title: "Avaliação, Diagnóstico e Validação de Modelos",
    tagline: "Garantia de generalização empírica e métricas de desempenho confiáveis.",
    iconKey: "check",
    shortDesc: "Validação cruzada (K-Fold), Matriz de Confusão, Curva ROC/AUC, Precision-Recall, trade-off viés-variância e calibração.",
    chapters: [
      {
        id: "axis-8-cap-1-validation-strategies",
        number: 1,
        title: "Estratégias de Particionamento e Validação Cruzada",
        shortDesc: "Holdout estratificado, K-Fold Cross-Validation, TimeSeriesSplit e prevenção de vazamento de dados.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-8-cap-2-classification-metrics",
        number: 2,
        title: "Métricas de Classificação, Matriz de Confusão e Curva ROC",
        shortDesc: "Acurácia, Precisão, Sensibilidade (Recall), F1-Score, Curva ROC/AUC e Curva Precision-Recall sob threshold dinâmico.",
        status: "in_progress",
        hasLab: true,
        labId: "confusion-roc-lab"
      },
      {
        id: "axis-8-cap-3-regression-metrics",
        number: 3,
        title: "Métricas de Regressão e Diagnóstico de Resíduos",
        shortDesc: "MAE, MSE, RMSE, R² ajustado e inspeção de resíduos para homocedasticidade.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-8-cap-4-bias-variance",
        number: 4,
        title: "Dilema Viés-Variância e Diagnóstico de Sobreajuste",
        shortDesc: "Decomposição do erro esperado, curvas de aprendizado e estratégias de regularização contra overfitting.",
        status: "in_progress",
        hasLab: true,
        labId: "polynomial-regression-lab"
      }
    ]
  },
  {
    id: "axis-9",
    number: 9,
    slug: "visualizacao",
    title: "Visualização de Dados e Comunicação",
    tagline: "Semiótica visual, eficiência gráfica e data storytelling acionável.",
    iconKey: "eye",
    shortDesc: "A Gramática dos Gráficos de Leland Wilkinson, princípios de integridade gráfica de Tufte, dashboards e narrativa orientada a dados.",
    chapters: [
      {
        id: "axis-9-cap-1-grammar-graphics",
        number: 1,
        title: "A Gramática dos Gráficos (Grammar of Graphics)",
        shortDesc: "Camadas formais de dados, estéticas, geometrias, facetas, coordenadas e temas visuais.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-9-cap-2-semiotics-tufte",
        number: 2,
        title: "Semiótica Perceptual e Princípios de Edward Tufte",
        shortDesc: "Canais visuais de Bertin, proporção dado-tinta (data-ink ratio) e combate a distorções visuais.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-9-cap-3-chart-types",
        number: 3,
        title: "Tipologias Gráficas e Escolha Visual de Representação",
        shortDesc: "Gráficos ideais para distribuições, relações bivariadas, composições proporcionais e séries temporais.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-9-cap-4-storytelling",
        number: 4,
        title: "Data Storytelling e Comunicação Estratégica",
        shortDesc: "Estruturação narrativa orientada a tomadores de decisão e tradução de métricas para impacto prático.",
        status: "planned",
        hasLab: false
      }
    ]
  },
  {
    id: "axis-10",
    number: 10,
    slug: "mlops",
    title: "MLOps, Engenharia de Produção e IA Responsável",
    tagline: "Operacionalização sustentável, explicabilidade e justiça algorítmica.",
    iconKey: "gitBranch",
    shortDesc: "Ciclo de vida de modelos, rastreamento de experimentos, detecção de Data Drift e Concept Drift, explicabilidade com SHAP/LIME e fairness.",
    chapters: [
      {
        id: "axis-10-cap-1-lifecycle",
        number: 1,
        title: "Ciclo de Vida de Modelos e Rastreamento de Experimentos",
        shortDesc: "Versionamento de dados e modelos (DVC), registros formais e esteiras de integração contínua (CI/CD/CT).",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-10-cap-2-serving",
        number: 2,
        title: "Deploy e Servidores de Inferência de Modelos",
        shortDesc: "APIs de inferência síncrona/assíncrona, microsserviços conteinerizados e otimização para inferência em borda.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-10-cap-3-drift",
        number: 3,
        title: "Monitoramento Contínuo: Data Drift e Concept Drift",
        shortDesc: "Testes estatísticos de Kolmogorov-Smirnov, divergência KL e automação de retreino por decaimento de acurácia.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-10-cap-4-xai",
        number: 4,
        title: "Explicabilidade e Interpretabilidade (XAI)",
        shortDesc: "Valores de Shapley cooperativos (SHAP), explicações lineares locais (LIME) e gráficos de dependência parcial.",
        status: "planned",
        hasLab: false
      },
      {
        id: "axis-10-cap-5-fairness",
        number: 5,
        title: "Ética, Justiça Algorítmica (Fairness) e Reprodutibilidade",
        shortDesc: "Auditoria de disparidade de impacto contra atributos protegidos, paridade demográfica e princípios FAIR.",
        status: "planned",
        hasLab: false
      }
    ]
  }
];

// Helper functions para consulta do currículo
export function getAxisById(axisId) {
  return CURRICULUM_AXES.find(a => a.id === axisId || a.slug === axisId || a.number.toString() === axisId);
}

export function getChapterById(chapterId) {
  for (const axis of CURRICULUM_AXES) {
    const chap = axis.chapters.find(c => c.id === chapterId);
    if (chap) return { axis, chapter: chap };
  }
  return null;
}
