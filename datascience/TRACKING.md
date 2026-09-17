# Painel de Monitoramento do Conteúdo Curricular e Laboratórios (DataLab)

> **Documento Oficial de Rastreamento de Status e Implementação**  
> **Última Atualização:** Setembro de 2026  
> **Status Geral da Plataforma:** Fase 1 (Infraestrutura & Benchmark Pilot)  

---

## Legenda de Status

| Símbolo | Significado | Descrição |
| :---: | :--- | :--- |
| 🟢 | **Concluído & Validado** | Teoria completa com LaTeX, história, aplicação, refs funcionais e lab ativo |
| 🟡 | **Em Desenvolvimento / Piloto** | Estruturado ou com capítulo piloto em validação |
| 🔵 | **Com Laboratório Prático** | Já possui simulação interativa funcional (revisão de texto pendente) |
| ⚪ | **Planejado** | Mapeado no currículo com sumário e bibliografia |

---

## Matriz Geral dos 10 Eixos Canônicos

### Eixo 1: Fundamentos Matemáticos e Estatísticos
*Status Geral: 🟡 Em Desenvolvimento (Capítulo Piloto)*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Álgebra Linear Computacional** | Vetores, matrizes, determinantes, produto escalar, projeções e transformações lineares | 🟢 **CONCLUÍDO** | 🟢 **ATIVO** | `LinearAlgebra2DLab` |
| **Cap. 2: Cálculo & Otimização** | Derivadas multivariáveis, gradientes, Hessiana e SGD | ⚪ Planejado | ⚪ Planejado | GradientDescentVisualizer |
| **Cap. 3: Probabilidade & Teorema Central do Limite** | Variáveis aleatórias, distribuições teóricas, Teorema de Bayes e TCL | 🟡 **PILOTO BENCHMARK** | 🟢 **ATIVO** | `CentralLimitTheoremLab` |
| **Cap. 4: Inferência Estatística & Testes de Hipótese** | Testes t, ANOVA, p-valor, intervalos de confiança e bootstrap | ⚪ Planejado | ⚪ Planejado | HypothesisTestingLab |
| **Cap. 5: Inferência Causal** | DAGs, do-calculus de Pearl e escore de propensão | ⚪ Planejado | ⚪ Planejado | CausalDagLab |

---

### Eixo 2: Engenharia e Infraestrutura de Dados
*Status Geral: ⚪ Planejado*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Coleta & Ingestão de Dados** | Ingestão em lote vs streaming (Kafka), APIs REST/GraphQL, scraping | ⚪ Planejado | ⚪ Planejado | ApiIngestionSimulator |
| **Cap. 2: Bancos de Dados & Modelagem** | RDBMS (SQL/ACID), NoSQL (Documentos, Grafos, Colunares) | ⚪ Planejado | ⚪ Planejado | SqlPlaygroundLab |
| **Cap. 3: Data Warehouses & Lakehouses** | Modelagem dimensional (Kimball), Parquet, Iceberg e Delta Lake | ⚪ Planejado | ⚪ Planejado | ColumnarStorageInspector |
| **Cap. 4: Pipelines ETL & dbt** | Orquestração com DAGs (Airflow/Prefect) e transformações declarativas | ⚪ Planejado | ⚪ Planejado | DagPipelineBuilder |
| **Cap. 5: Computação Distribuída** | MapReduce, Apache Spark e escalabilidade distribuída | ⚪ Planejado | ⚪ Planejado | SparkPartitionSim |

---

### Eixo 3: Gestão, Qualidade e Governança de Dados
*Status Geral: ⚪ Planejado*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Qualidade e Profiling de Dados** | Completude, unicidade, consistência e testes automatizados | ⚪ Planejado | ⚪ Planejado | DataQualityCheckerLab |
| **Cap. 2: Catálogos e Linhagem (Data Lineage)** | Proveniência de dados, metadados ativos e auditoria | ⚪ Planejado | ⚪ Planejado | LineageGraphViewer |
| **Cap. 3: Governança, LGPD e Privacidade** | Conformidade, anonimização e privacidade diferencial | ⚪ Planejado | ⚪ Planejado | DifferentialPrivacyLab |

---

### Eixo 4: Pré-processamento, Limpeza e Engenharia de Atributos
*Status Geral: 🔵 Com Laboratório Prático (Texto em revisão)*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Limpeza e Imputação** | Valores faltantes (MCAR, MAR, MNAR), média/mediana/KNN | ⚪ Planejado | 🔵 Ativo | MissingValueImputerLab |
| **Cap. 2: Transformações e Escalonamento** | MinMax, Standard, Robust Scaler e transformações Box-Cox | ⚪ Planejado | 🟢 **ATIVO** | `ScalersComparisonLab` |
| **Cap. 3: Codificação Categórica** | One-Hot Encoding, Ordinal, Target Encoding e Hashing | ⚪ Planejado | 🔵 Ativo | OneHotEncoderLab |
| **Cap. 4: Redução de Dimensionalidade** | PCA linear, LDA e projeção geométrica ortogonal | ⚪ Planejado | 🟢 **ATIVO** | `PcaProjectionLab` |
| **Cap. 5: Seleção de Atributos** | Filtros, Wrappers (RFE) e métodos embutidos (L1/Lasso) | ⚪ Planejado | ⚪ Planejado | FeatureSelectionLab |

---

### Eixo 5: Análise Exploratória e Mineração de Dados (KDD)
*Status Geral: 🔵 Com Laboratórios Práticos (Texto em revisão)*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: O Processo KDD e CRISP-DM** | Ciclo de vida da descoberta de conhecimento e maturidade | ⚪ Planejado | ⚪ Planejado | CrispDmLifecycleViewer |
| **Cap. 2: Análise Exploratória de Tukey (EDA)** | Medidas centrais, dispersão, correlação linear e boxplot | ⚪ Planejado | 🟢 **ATIVO** | `EdaStatsLab` & `CorrelationHeatmapLab` |
| **Cap. 3: Mineração de Regras de Associação** | Algoritmo Apriori, FP-Growth, Suporte, Confiança e Lift | ⚪ Planejado | 🟢 **ATIVO** | `AprioriAssociationLab` |
| **Cap. 4: Detecção de Anomalias e Outliers** | Regra de Tukey IQR, escore Z, LOF e Isolation Forest | ⚪ Planejado | 🟢 **ATIVO** | `TukeyOutlierLab` |
| **Cap. 5: Mineração de Grafos e Redes** | Redes complexas, métricas de centralidade e PageRank | ⚪ Planejado | ⚪ Planejado | GraphCentralityLab |

---

### Eixo 6: Aprendizado de Máquina (Machine Learning)
*Status Geral: 🔵 Com Laboratórios Práticos (Texto em revisão)*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Regressão Linear e Regularização** | OLS, Ridge (L2), Lasso (L1) e regressão polinomial | ⚪ Planejado | 🟢 **ATIVO** | `PolynomialRegressionLab` |
| **Cap. 2: Classificação Supervisionada** | KNN, Regressão Logística, Naive Bayes e SVM | ⚪ Planejado | 🟢 **ATIVO** | `KnnClassifierLab` |
| **Cap. 3: Árvores de Decisão & Ensembles** | CART, Random Forest, AdaBoost, XGBoost e LightGBM | ⚪ Planejado | ⚪ Planejado | DecisionTreeVisualizer |
| **Cap. 4: Agrupamento Não-Supervisionado** | K-Means, K-Medoids, DBSCAN e agrupamento hierárquico | ⚪ Planejado | 🟢 **ATIVO** | `KMeansClusteringLab` |
| **Cap. 5: Aprendizado por Reforço** | Processos de Markov, Equação de Bellman e Q-Learning | ⚪ Planejado | ⚪ Planejado | QLearningGridworldLab |

---

### Eixo 7: Inteligência Artificial Avançada e Deep Learning
*Status Geral: ⚪ Planejado*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Redes Neurais & Backpropagation** | Neurônio de McCulloch-Pitts, MLP, funções de ativação e backprop | ⚪ Planejado | ⚪ Planejado | MlpForwardBackpropLab |
| **Cap. 2: Visão Computacional (CNNs)** | Convolução 2D, pooling, kernels Sobel e Vision Transformers | ⚪ Planejado | ⚪ Planejado | ConvolutionFilterLab |
| **Cap. 3: Processamento de Linguagem Natural** | Embeddings, LSTM, Self-Attention e Arquitetura Transformer | ⚪ Planejado | ⚪ Planejado | AttentionHeatmapLab |
| **Cap. 4: Modelos de Linguagem (LLMs & RAG)** | Treinamento de LLMs, Fine-tuning LoRA e RAG com vetorização | ⚪ Planejado | ⚪ Planejado | RagVectorSearchLab |
| **Cap. 5: Modelos Generativos** | Autoencoders, GANs e Modelos de Difusão | ⚪ Planejado | ⚪ Planejado | DiffusionLatentLab |

---

### Eixo 8: Avaliação, Diagnóstico e Validação de Modelos
*Status Geral: 🔵 Com Laboratórios Práticos (Texto em revisão)*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Estratégias de Validação** | Holdout, K-Fold, Validação Estratificada e TimeSeriesSplit | ⚪ Planejado | ⚪ Planejado | CrossValidationSplitLab |
| **Cap. 2: Métricas de Classificação & ROC/AUC** | Matriz de Confusão, Acurácia, Precisão, Recall, F1 e ROC | ⚪ Planejado | 🟢 **ATIVO** | `ConfusionMatrixRocLab` |
| **Cap. 3: Métricas de Regressão** | MAE, MSE, RMSE, R² e análise de resíduos | ⚪ Planejado | 🔵 Ativo | ResidualAnalysisLab |
| **Cap. 4: Diagnóstico de Viés-Variância** | Dilema Viés-Variância, curvas de aprendizado e overfitting | ⚪ Planejado | 🟢 **ATIVO** | `PolynomialRegressionLab` |

---

### Eixo 9: Visualização de Dados e Comunicação
*Status Geral: ⚪ Planejado*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: A Gramática dos Gráficos** | Camadas de Wilkinson (dados, estéticas, geometrias, escalas) | ⚪ Planejado | ⚪ Planejado | GrammarOfGraphicsBuilder |
| **Cap. 2: Semiótica Visual e Princípios de Tufte** | Canais perceptivos de Bertin, data-ink ratio e integridade gráfica | ⚪ Planejado | ⚪ Planejado | TuftePerceptionLab |
| **Cap. 3: Tipologias de Visualização** | Distribuições, composições, correlações e mapas coropléticos | ⚪ Planejado | ⚪ Planejado | ChartChooserLab |
| **Cap. 4: Data Storytelling & Comunicação** | Narrativa com dados, hierarquia de informação e relatórios | ⚪ Planejado | ⚪ Planejado | StorytellingDashboardLab |

---

### Eixo 10: MLOps, Produção e IA Responsável
*Status Geral: ⚪ Planejado*

| Capítulo | Tópicos e Ramificações | Status Teoria | Status Lab | Laboratório Associado |
| :--- | :--- | :---: | :---: | :--- |
| **Cap. 1: Ciclo de Vida e Versionamento** | Git, DVC, registro de modelos e rastreamento de experimentos | ⚪ Planejado | ⚪ Planejado | ModelRegistrySim |
| **Cap. 2: Deploy e Servidão de Modelos** | APIs de inferência, contêineres e inferência em borda | ⚪ Planejado | ⚪ Planejado | InferenceLatencySim |
| **Cap. 3: Observabilidade e Derivas (Drift)** | Detecção de Data Drift, Concept Drift e retreino | ⚪ Planejado | ⚪ Planejado | DriftDetectionLab |
| **Cap. 4: Explicabilidade (XAI)** | SHAP (valores de Shapley) e LIME com explicabilidade local | ⚪ Planejado | ⚪ Planejado | ShapWaterfallLab |
| **Cap. 5: Ética & Justiça Algorítmica (Fairness)** | Paridade demográfica, auditoria de viés e princípios FAIR | ⚪ Planejado | ⚪ Planejado | FairnessMetricsAuditor |

---

## Próximos Passos Imediatos
1. ✅ Adicionar KaTeX e criar `src/utils/mathRenderer.js`.
2. ✅ Criar componente `ChapterToc.js` para navegação interna nos capítulos.
3. ✅ Criar catálogo estruturado `src/data/curriculum.js`.
4. 🔄 Implementar `CentralLimitTheoremLab.js` e registrar laboratórios em `src/labs/registry.js`.
5. 🔄 Construir o Hub de Laboratórios com visualização em árvore (`LabsCatalogView.js`).
6. 🔄 Redigir e renderizar o **Capítulo Piloto Benchmark** (Eixo 1, Cap. 3).
