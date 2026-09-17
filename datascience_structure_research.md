# Estrutura Canônica, Definições e Taxonomia da Ciência de Dados

> **Documento de Pesquisa Estrutural e Referencial Pedagógico**  
> **Projeto:** DataLab (Laboratório Interativo de Ciência de Dados)  
> **Data:** Setembro de 2026  
> **Status:** Referência Canônica de Conteúdo e Arquitetura Curricular  

---

## Sumário
1. [Introdução e Propósito](#1-introdução-e-propósito)
2. [Definições Canônicas e Padrões Internacionais](#2-definições-canônicas-e-padrões-internacionais)
   - [Normas Oficiais (ISO/IEC e NIST)](#normas-oficiais-isoiec-e-nist)
   - [Diretrizes Curriculares Acadêmicas (ACM / IEEE / ASA)](#diretrizes-curriculares-acadêmicas-acm--ieee--asa)
   - [Evolução Histórica e Epistemológica](#evolução-histórica-e-epistemológica)
3. [Taxonomia Sistemática: Subáreas e Ramificações](#3-taxonomia-sistemática-subáreas-e-ramificações)
   - [Eixo 1: Fundamentos Matemáticos e Estatísticos](#eixo-1-fundamentos-matemáticos-e-estatísticos)
   - [Eixo 2: Engenharia e Infraestrutura de Dados](#eixo-2-engenharia-e-infraestrutura-de-dados)
   - [Eixo 3: Gestão, Qualidade e Governança de Dados](#eixo-3-gestão-qualidade-e-governança-de-dados)
   - [Eixo 4: Pré-processamento, Limpeza e Engenharia de Atributos](#eixo-4-pré-processamento-limpeza-e-engenharia-de-atributos)
   - [Eixo 5: Análise Exploratória e Mineração de Dados (KDD)](#eixo-5-análise-exploratória-e-mineração-de-dados-kdd)
   - [Eixo 6: Aprendizado de Máquina (Machine Learning)](#eixo-6-aprendizado-de-máquina-machine-learning)
   - [Eixo 7: Inteligência Artificial Avançada e Deep Learning](#eixo-7-inteligência-artificial-avançada-e-deep-learning)
   - [Eixo 8: Avaliação, Diagnóstico e Validação de Modelos](#eixo-8-avaliação-diagnóstico-e-validação-de-modelos)
   - [Eixo 9: Visualização de Dados e Comunicação](#eixo-9-visualização-de-dados-e-comunicação)
   - [Eixo 10: MLOps, Produção e IA Responsável](#eixo-10-mlops-produção-e-ia-responsável)
4. [Mapeamento para Laboratórios Interativos no Navegador](#4-mapeamento-para-laboratórios-interativos-no-navegador)
5. [Referências Bibliográficas e Normativas](#5-referências-bibliográficas-e-normativas)

---

## 1. Introdução e Propósito

Este documento consolida a pesquisa aprofundada a respeito dos fundamentos conceituais, normas técnicas e estrutura de ramos da Ciência de Dados (*Data Science*). Seu propósito é fornecer a fundamentação teórica necessária para o planejamento, organização curricular e implementação dos módulos educacionais interativos do projeto **DataLab**.

A Ciência de Dados consolidou-se no século XXI não meramente como a fusão instrumental de programação com análise estatística, mas como uma disciplina científica e de engenharia orientada à extração empírica e sistemática de conhecimento acionável a partir de dados.

---

## 2. Definições Canônicas e Padrões Internacionais

### Normas Oficiais (ISO/IEC e NIST)

1. **ISO/IEC 20546:2019 (*Information technology — Big data — Overview and vocabulary*) & ISO/IEC 22989:2022 (*Artificial intelligence*):**
   > *"Data science is the extraction of actionable knowledge from data through a process of discovery, or hypothesis and hypothesis testing."*  
   > *(A extração de conhecimento acionável a partir de dados por meio de um processo de descoberta, ou de formulação e teste de hipóteses.)*
   
   A norma internacional destaca que o conhecimento produzido deve ser **acionável** (*actionable*) — ou seja, capaz de fundamentar decisões, inferências e automações — e obtido tanto de forma indutiva/exploratória (descoberta de padrões latentes) quanto dedutiva (teste de hipóteses prévias).

2. **NIST SP 1500-1 (*NIST Big Data Interoperability Framework: Volume 1, Definitions*):**
   > Define a Ciência de Dados como a síntese empírica de conhecimento acionável a partir de dados brutos ao longo de todo o ciclo de vida (*Data Life Cycle*), integrando técnicas computacionais, estatísticas, linguísticas e conhecimento de domínio.

### Diretrizes Curriculares Acadêmicas (ACM / IEEE / ASA)

1. **ACM / IEEE-CS / ASA Task Force (*Computing Competencies for Undergraduate Data Science Curricula*, 2021):**
   A força-tarefa conjunta das principais sociedades científicas mundiais categorizou as competências nucleares de Ciência de Dados em 11 Áreas de Conhecimento Computacional (*Knowledge Areas* - KAs), integradas intrinsecamente a disciplinas matemáticas (Álgebra Linear, Cálculo, Estruturas Discretas) e estatísticas (Probabilidade, Inferência e Modelagem):
   - *Analysis and Presentation (AP)*
   - *Artificial Intelligence (AI)*
   - *Big Data Systems (BDS)*
   - *Computing and Computer Fundamentals (CCF)*
   - *Data Acquisition, Management, and Governance (DG)*
   - *Data Mining (DM)*
   - *Data Privacy, Security, Integrity, and Analysis for Security (DP)*
   - *Machine Learning (ML)*
   - *Professionalism & Ethics (PR)*
   - *Programming, Data Structures, and Algorithms (PDA)*
   - *Software Development and Maintenance (SDM)*

2. **EDISON Data Science Framework (EDSF - European Union Horizon 2020):**
   Define o Perfil Profissional e o Corpo de Conhecimento (*DS-BoK - Data Science Body of Knowledge*), estruturado em 5 grandes grupos de competências:
   - *Data Analytics (DA):* Estatística, machine learning, mineração de texto e negócios.
   - *Data Science Engineering (DSENG):* Software, infraestrutura em nuvem, bancos de dados e sistemas distribuídos.
   - *Data Management and Governance (DSDM):* Preservação, linhagem, curadoria, conformidade e metadados.
   - *Research / Business Process Methods (DSRM / DSBPM):* Metodologias formais de experimentação e gestão de projetos.
   - *Domain Knowledge (DSBA):* Aplicação especializada e métricas de impacto no domínio.

### Evolução Histórica e Epistemológica

A conceituação contemporânea de Ciência de Dados resulta de marcos epistemológicos cruciais ao longo das últimas décadas:

* **John W. Tukey (1962, *"The Future of Data Analysis"* & 1977, *"Exploratory Data Analysis"*):**  
  Tukey desafiou a visão estritamente teórica da estatística matemática, defendendo que a "análise de dados" deveria ser tratada como uma ciência empírica autônoma focada no aprendizado com evidências reais, cunhando os conceitos e técnicas fundamentais da Análise Exploratória de Dados (EDA).
* **Peter Naur (1974, *"Concise Survey of Computer Methods"*):**  
  Pioneiro na utilização sistemática do termo *Data Science* (ou *Datalogy*), definindo-a como a ciência do tratamento de dados, suas representações e propriedades lógicas independentemente do hardware computacional.
* **C. F. Jeff Wu (1997, Inaugural Lecture *"Statistics = Data Science?"*):**  
  Propôs que a Estatística fosse renomeada para Ciência de Dados, organizando seu tripé disciplinar em: (1) Coleta de dados, (2) Modelagem e análise, e (3) Tomada de decisão.
* **Leo Breiman (2001, *"Statistical Modeling: The Two Cultures"*):**  
  Delineou a clássica distinção metodológica entre:
  1. *Cultura da Modelagem Estocástica:* Assume que os dados derivam de um processo estocástico gerador específico (ex.: regressão linear paramétrica, distribuições pré-assumidas, testes de p-valor).
  2. *Cultura da Modelagem Algorítmica:* Trata a natureza como uma "caixa preta desconhecida", mensurando o sucesso estritamente pela capacidade preditiva empírica do algoritmo em dados de teste não vistos (fundamento moderno do Machine Learning).
* **William S. Cleveland (2001, *"Data Science: An Action Plan for Expanding the Technical Areas of the Field of Statistics"*):**  
  Estruturou a transição da estatística para a ciência de dados em 6 áreas: Investigações Multidisciplinares, Modelos e Métodos para Dados, Computação com Dados, Pedagogia, Avaliação de Ferramentas e Teoria.
* **Jim Gray (2009, *"The Fourth Paradigm: Data-Intensive Scientific Discovery"*):**  
  Classificou a história da descoberta científica em 4 paradigmas: (1) Empírico/Descritivo, (2) Teórico/Leis analíticas, (3) Simulação computacional complexa, e (4) Descoberta intensiva orientada a dados (*Big Data*).
* **Drew Conway (2010, *"The Data Science Venn Diagram"*):**  
  Apresentou o diagrama de Venn seminal que ilustra a ciência de dados na intersecção entre: (1) *Hacking Skills* (Computação e programação), (2) *Math & Statistics Knowledge* (Matemática e probabilidade), e (3) *Substantive Expertise* (Domínio de negócio ou científico).
* **Vasant Dhar (2013, *"Data Science and Prediction"*):**  
  Formalizou a virada de paradigma onde os modelos deixam de ter papel unicamente explicativo retrospectivo e passam a ser julgados primariamente pela capacidade preditiva prospectiva e generalização empírica.
* **David Donoho (2017, *"50 Years of Data Science"*):**  
  Diferenciou *Lesser Data Science* (o uso imediatista de bibliotecas e frameworks de escala) de **Greater Data Science (GDS)**, uma disciplina duradoura e ampla fundamentada em 6 divisões de práticas e investigação metódica.

---

## 3. Taxonomia Sistemática: Subáreas e Ramificações

Apresenta-se a seguir a taxonomia exaustiva da Ciência de Dados, decomposta em 10 grandes eixos canônicos, detalhando suas ramificações, técnicas, algoritmos e objetos de estudo.

```
Ciência de Dados
├── 1. Fundamentos Matemáticos e Estatísticos
├── 2. Engenharia e Infraestrutura de Dados
├── 3. Gestão, Qualidade e Governança de Dados
├── 4. Pré-processamento, Limpeza e Engenharia de Atributos
├── 5. Análise Exploratória e Mineração de Dados (KDD)
├── 6. Aprendizado de Máquina (Machine Learning)
├── 7. Inteligência Artificial Avançada e Deep Learning
├── 8. Avaliação, Diagnóstico e Validação de Modelos
├── 9. Visualização de Dados e Comunicação (Storytelling)
└── 10. MLOps, Produção e IA Responsável
```

---

### Eixo 1: Fundamentos Matemáticos e Estatísticos

1. **Álgebra Linear Computacional:**
   - *Vetores e Espaços Vetoriais:* Normas ($L_1$, $L_2$, $L_\infty$), produto interno, ortogonalidade, projeções ortogonais e hiperplanos.
   - *Álgebra Matricial:* Posto (*rank*), traço, determinante, inversão e pseudo-inversa de Moore-Penrose.
   - *Decomposições Matriciais:* Autovalores e Autovetores (*Eigen-decomposition*), Decomposição em Valores Singulares (SVD), Fatoração LU e Cholesky.
   - *Tensores e Álgebra Multilinear:* Operações tensoriais aplicadas a redes neurais e modelos multidimensionais.

2. **Cálculo Multivariável e Otimização:**
   - *Cálculo Diferencial:* Derivadas parciais, vetor gradiente ($\nabla$), matriz Jacobiana e matriz Hessiana.
   - *Regra da Cadeia Multivariável:* Fundamento matemático da retropropagação de erro (*backpropagation*).
   - *Otimização Matemática:* Máximos e mínimos locais e globais, multiplicadores de Lagrange para restrições, condições KKT (*Karush-Kuhn-Tucker*).
   - *Algoritmos de Otimização Numérica:* Gradiente Descendente Estocástico (SGD), Momentum, Nesterov, RMSprop, Adam, algoritmos de segunda ordem (BFGS / L-BFGS).

3. **Probabilidade e Distribuições Teóricas:**
   - *Espaço Amostral e Variáveis Aleatórias:* Variáveis discretas e contínuas, funções de massa de probabilidade (PMF) e de densidade (PDF), função cumulativa (CDF).
   - *Distribuições Canônicas:* Bernoulli, Binomial, Poisson, Geométrica, Gaussiana (Normal univariada e multivariada), Exponencial, Log-normal, Beta, Gama, Qui-quadrado ($\chi^2$), t de Student e F de Snedecor.
   - *Teoremas Assintóticos:* Teorema de Bayes, Desigualdade de Chebyshev, Lei dos Grandes Números e Teorema Central do Limite (TCL).

4. **Inferência Estatística e Testes de Hipótese:**
   - *Estimação de Parâmetros:* Estimador de Máxima Verossimilhança (MLE), Método dos Momentos, Estimadores Bayesianos (MAP).
   - *Intervalos de Confiança e Significância:* Margem de erro, p-valor e interpretação contra o nível de significância ($\alpha$).
   - *Testes Paramétricos:* Teste t de Student (amostras pareadas e independentes), Teste Z, Análise de Variância (ANOVA One-Way e Two-Way).
   - *Testes Não-Paramétricos:* Mann-Whitney U, Wilcoxon Signed-Rank, Kruskal-Wallis, Teste Qui-Quadrado de Independência e de Aderência.
   - *Métodos Computacionais:* Reamostragem por Bootstrap (não paramétrico e paramétrico) e testes de permutação.

5. **Inferência Causal e Modelagem Estrutural:**
   - *Teoria Causal de Judea Pearl:* Grafos Acíclicos Dirigidos (DAGs), critério de porta dos fundos (*back-door criterion*) e cálculo de intervenções (*do-calculus*).
   - *Estimadores Quase-Experimentais:* Pareamento por escore de propensão (*Propensity Score Matching*), Diferença em Diferenças (DiD), Regressão Descontínua (RDD) e Variáveis Instrumentais (IV).

---

### Eixo 2: Engenharia e Infraestrutura de Dados

1. **Coleta e Ingestão de Dados:**
   - *Ingestão em Lote (Batch):* Extração periódica de bancos operacionais, dumps e arquivos corporativos.
   - *Ingestão em Tempo Real (Streaming):* Protocolos de mensageria e logs distribuídos (Apache Kafka, Apache Pulsar, RabbitMQ, MQTT para IoT).
   - *Interfaces e Extração:* APIs RESTful, GraphQL, gRPC, web scraping e automação de coleta (BeautifulSoup, Scrapy, Playwright).

2. **Arquiteturas de Armazenamento e Bancos de Dados:**
   - *Relacionais (RDBMS / SQL):* Normalização de dados (1FN a 3FN), índices B-Tree, otimização de consultas e semântica transacional ACID (PostgreSQL, MySQL).
   - *Bancos NoSQL:*
     - *Document-oriented:* MongoDB, CouchDB.
     - *Key-Value:* Redis, Amazon DynamoDB.
     - *Wide-column:* Apache Cassandra, ScyllaDB, Google Bigtable.
     - *Graph databases:* Neo4j, Amazon Neptune.
   - *Armazenamento Analítico e Modern Data Stack:*
     - *Data Warehouses:* Modelagem dimensional (Kimball: Star Schema, Snowflake Schema), bancos colunares (Snowflake, Google BigQuery, Amazon Redshift, ClickHouse).
     - *Data Lakes e Lakehouses:* Armazenamento em nuvem de objetos brutos (S3, GCS) combinado com formatos de tabela transacionais abertos (Delta Lake, Apache Iceberg, Apache Hudi, Parquet, ORC).

3. **Pipelines de Dados e Transformação (ETL / ELT):**
   - *Orquestração de Fluxos de Trabalho:* DAGs de tarefas orientadas a eventos e tempo (Apache Airflow, Prefect, Dagster, Temporal).
   - *Transformação Centrada em SQL:* Frameworks declarativos de modelagem de dados, testes automatizados e linhagem (dbt - *data build tool*).

4. **Computação Distribuída e Escalabilidade (Big Data):**
   - *Frameworks de Computação Massiva:* Paradigma MapReduce, Apache Spark (Spark SQL, DataFrames, RDDs), Apache Flink (processamento de fluxo de baixa latência).
   - *Paralelização em Python:* Dask, Ray (escalonamento distribuído de tarefas e modelos de ML).

---

### Eixo 3: Gestão, Qualidade e Governança de Dados

1. **Qualidade e Profiling de Dados:**
   - *Métricas de Qualidade:* Completude, consistência, conformidade, unicidade, acurácia e pontualidade (*timeliness*).
   - *Testes Automatizados de Dados:* Ferramentas de verificação declarativa (Great Expectations, Soda, Deequ).

2. **Metadados e Linhagem de Dados (*Data Lineage*):**
   - *Rastreabilidade de Ponta a Ponta:* Proveniência de dados (*Data Provenance*), mapeamento de dependências upstream e downstream (OpenLineage, Amundsen, DataHub).
   - *Catálogos de Dados Corporativos:* Glossário de negócios, dicionário de dados e indexação semântica.

3. **Governança, Conformidade e Segurança:**
   - *Legislação e Regulamentação:* LGPD (Brasil), GDPR (União Europeia), HIPAA, CCPA.
   - *Segurança e Anonimização:* Mascaramento de dados, pseudonimização, hash criptográfico e privacidade diferencial (*Differential Privacy*).
   - *Políticas de Acesso:* RBAC (*Role-Based Access Control*) e ABAC (*Attribute-Based Access Control*).

---

### Eixo 4: Pré-processamento, Limpeza e Engenharia de Atributos

1. **Limpeza e Tratamento de Dados:**
   - *Tratamento de Dados Ausentes (Missing Values):*
     - Diagnóstico de mecanismos: MCAR (*Missing Completely at Random*), MAR (*Missing at Random*), MNAR (*Missing Not at Random*).
     - Técnicas de tratamento: Remoção de instâncias/colunas, imputação por medidas centrais (média, mediana, moda), imputação preditiva (KNN Imputer, MICE - *Multivariate Imputation by Chained Equations*).
   - *Tratamento de Inconsistências e Ruídos:* Normalização de caixas de texto, correção de formatos de data/hora, remoção de duplicatas exatas e aproximadas (*Fuzzy Matching*).

2. **Transformações Numéricas:**
   - *Escalonamento e Normalização:*
     - Min-Max Scaler: Mapeamento linear para o intervalo $[0, 1]$.
     - Standard Scaler (Z-Score): Subtração da média e divisão pelo desvio-padrão ($\mu=0, \sigma=1$).
     - Robust Scaler: Escalonamento por mediana e intervalo interquartil (IQR), imune a outliers extremos.
   - *Transformações de Estabilização de Variância:* Transformação Logarítmica, Transformação de Box-Cox, Transformação de Yeo-Johnson.
   - *Discretização (Binning):* Binning de mesma largura (*Equal-width*), mesmo tamanho amostral (*Equal-frequency / Quantis*) ou baseado em árvores.

3. **Codificação Categórica (*Categorical Encoding*):**
   - *Variáveis Nominais:* One-Hot Encoding (com tratamento de categorias raras / alta cardinalidade), Dummy Encoding, Binary Encoding, Hashing Trick.
   - *Variáveis Ordinais:* Ordinal / Label Encoding respeitando a hierarquia intrínseca.
   - *Métodos Supervisionados:* Target / Mean Encoding (com técnicas de suavização bayesiana para evitar overfitting e *target leakage*), Weight of Evidence (WoE).

4. **Engenharia de Atributos (*Feature Engineering*):**
   - *Interações Numéricas:* Relações de proporção, diferenças, produtos e recursos polinomiais (*Polynomial Features*).
   - *Recursos Temporais e Cíclicos:* Decomposição de datas (dia da semana, mês, trimestre), transformações senoidais/cossenoidais para variáveis cíclicas (horas, meses).
   - *Agregações de Janela:* Médias móveis, desvios móveis, lags temporais e expansão cumulativa em séries temporais.

5. **Redução de Dimensionalidade e Seleção de Atributos:**
   - *Métodos Lineares de Projeção:* Análise de Componentes Principais (PCA), Discriminante Linear de Fisher (LDA).
   - *Métodos Não-Lineares de Manifold:* t-SNE (*t-Distributed Stochastic Neighbor Embedding*), UMAP (*Uniform Manifold Approximation and Projection*).
   - *Seleção de Atributos (*Feature Selection*):*
     - *Métodos de Filtro:* Correlação linear, Informação Mútua (*Mutual Information*), Teste Chi-Quadrado, ANOVA F-value.
     - *Métodos Wrapper:* Eliminação Recursiva de Recursos (RFE), Seleção Direta Sequencial (SFS).
     - *Métodos Embutidos (*Embedded*):* Regularização L1 (Lasso), Importância de variáveis por impureza de Gini ou ganho de split em árvores.

---

### Eixo 5: Análise Exploratória e Mineração de Dados (KDD)

1. **Metodologias do Processo KDD:**
   - *Processo KDD Canônico (Fayyad et al.):* Seleção de dados $\rightarrow$ Pré-processamento $\rightarrow$ Transformação $\rightarrow$ Mineração de Dados $\rightarrow$ Interpretação e Avaliação de Conhecimento.
   - *Framework CRISP-DM:* Entendimento do Negócio, Entendimento dos Dados, Preparação dos Dados, Modelagem, Avaliação, Implantação.
   - *Metodologias Alternativas:* SEMMA (Sample, Explore, Modify, Model, Assess) e OSEMN (Obtain, Scrub, Explore, Model, iNterpret).

2. **Análise Exploratória de Dados (EDA - Tukey):**
   - *Estatística Descritiva Univariada:* Medidas de tendência central (média aritmética, ponderada, truncada, mediana, moda), medidas de dispersão (variância, desvio-padrão, coeficiente de variação, IQR) e medidas de forma (assimetria/skewness, curtose).
   - *Análise Bivariada e Multivariada:* Coeficiente de Correlação Linear de Pearson, Correlação de Postos de Spearman, Tau de Kendall.

3. **Mineração de Regras de Associação e Itens Frequentes:**
   - *Algoritmos Fundamentais:* Apriori (baseado na propriedade de fecho descendente / poda anti-monótona), FP-Growth (*Frequent Pattern Tree*, que dispensa a geração combinatória de candidatos), ECLAT (*Equivalence Class Clustering and Transformation*).
   - *Métricas de Qualidade de Regras:*
     - Suporte: $Support(A \Rightarrow B) = P(A \cap B)$
     - Confiança: $Confidence(A \Rightarrow B) = \frac{P(A \cap B)}{P(A)}$
     - Lift: $Lift(A \Rightarrow B) = \frac{P(A \cap B)}{P(A) \cdot P(B)}$
     - Convicção e Alavancagem (*Leverage* e *Conviction*).

4. **Detecção de Anomalias e Outliers:**
   - *Métodos Estatísticos:* Regra do Intervalo Interquartil de Tukey ($Q_1 - 1.5 \cdot IQR$, $Q_3 + 1.5 \cdot IQR$), escore Z padronizado, escore Z modificado pela mediana (MAD), Distância de Mahalanobis.
   - *Métodos Baseados em Distância e Densidade:* Local Outlier Factor (LOF), k-NN Outlier Score, DBSCAN (ruídos como outliers).
   - *Métodos Baseados em Modelos e Árvores:* Isolation Forest (isolamento rápido por cortes aleatórios no espaço), One-Class SVM, Autoencoders neurais (baseados no erro de reconstrução).

5. **Mineração de Sequências, Grafos e Redes Complexas:**
   - *Padrões Sequenciais:* PrefixSpan, GSP (*Generalized Sequential Pattern*).
   - *Análise de Grafos e Redes Sociais:* Métricas de centralidade (grau, proximidade, intermediação / *betweenness*, autovetor, PageRank), detecção de comunidades (algoritmo de Louvain, modularidade).

---

### Eixo 6: Aprendizado de Máquina (Machine Learning)

1. **Aprendizado Supervisionado:**
   - **Modelos de Regressão:**
     - Regressão Linear Simples e Múltipla (Método dos Mínimos Quadrados Ordinários - OLS).
     - Regressão com Regularização: Ridge ($L_2$), Lasso ($L_1$), ElasticNet ($L_1 + L_2$).
     - Regressão Polinomial e Splines.
     - Support Vector Regression (SVR com kernels linear, polinomial e RBF).
   - **Modelos de Classificação:**
     - Regressão Logística (Binária, Multinomial, One-vs-Rest).
     - K-Nearest Neighbors (KNN - métricas de distância Euclidiana, Manhattan, Minkowski).
     - Naive Bayes (Gaussiano, Multinomial, Bernoulli).
     - Support Vector Machines (SVM - margens rígidas e suaves, truque do kernel).
   - **Modelos Baseados em Árvores e Ensembles:**
     - Árvores de Decisão (Algoritmos CART, ID3, C4.5; critérios de divisão: Impureza de Gini, Entropia / Ganho de Informação).
     - Métodos de Bagging: Bootstrap Aggregating clássico, Random Forests, Extra Trees.
     - Métodos de Boosting: AdaBoost, Gradient Boosting Machine (GBM), XGBoost, LightGBM, CatBoost.
     - Stacking e Voting Classifiers/Regressors.

2. **Aprendizado Não Supervisionado:**
   - **Agrupamento Particional:** K-Means (K-Means++, Mini-Batch K-Means), K-Medoids (PAM).
   - **Agrupamento Hierárquico:** Aglomerativo (critérios de ligação: Ward, Complete, Average, Single Linkage) e Divisivo (Dendrogramas).
   - **Agrupamento Baseado em Densidade:** DBSCAN (*Density-Based Spatial Clustering of Applications with Noise*), OPTICS, HDBSCAN (*Hierarchical DBSCAN*).
   - **Modelos de Mistura Probabilística:** Modelos de Mistura Gaussiana (GMM) ajustados pelo algoritmo EM (*Expectation-Maximization*).
   - **Mapeamento Topológico:** Redes Neurais de Kohonen / Mapas Auto-Organizáveis (SOM).

3. **Aprendizado Semi-Supervisionado e Auto-Supervisionado:**
   - *Técnicas Semi-Supervisionadas:* Pseudo-rotulagem (*Pseudo-Labeling*), Propagação de Rótulos em Grafos (*Label Spreading*), Co-Training.
   - *Aprendizado Auto-Supervisionado (SSL):* Formulação de tarefas pretextuais (*Pretext Tasks*), Aprendizado Contrastivo (SimCLR, MoCo, BYOL).

4. **Aprendizado por Reforço (*Reinforcement Learning*):**
   - *Estrutura Teórica:* Processos de Decisão de Markov (MDP), Estados, Ações, Recompensas, Equação de Bellman.
   - *Métodos Baseados em Valor (Model-Free):* Q-Learning tabular, SARSA, Deep Q-Networks (DQN, Double DQN, Dueling DQN).
   - *Métodos de Gradiente de Política:* REINFORCE, Proximal Policy Optimization (PPO), Soft Actor-Critic (SAC).
   - *Aplicações:* Otimização de rotas, alocação de recursos em nuvem, controle dinâmico de preços.

---

### Eixo 7: Inteligência Artificial Avançada e Deep Learning

1. **Redes Neurais Artificiais (ANN):**
   - *Arquitetura Fundamental:* Neurônio artificial de McCulloch-Pitts, Perceptron simples, Perceptron Multicamadas (MLP).
   - *Treinamento e Propagação:* Forward pass, retropropagação de gradientes (*backpropagation*), cálculo de derivadas em grafo computacional.
   - *Funções de Ativação:* Sigmoid, Tanh, ReLU (*Rectified Linear Unit*), Leaky ReLU, ELU, GeLU, Softmax.
   - *Técnicas de Regularização e Estabilização:* Dropout, Batch Normalization, Layer Normalization, Weight Decay ($L_2$), Early Stopping.

2. **Visão Computacional (*Computer Vision*):**
   - *Fundamentos Convolucionais:* Operação de convolução 2D, kernels/filtros, stride, padding, camadas de pooling (Max Pooling, Average Pooling).
   - *Arquiteturas Convolucionais Clássicas e Modernas:* LeNet-5, AlexNet, VGG, ResNet (conexões residuais / *skip connections*), EfficientNet, ConvNeXt.
   - *Tarefas Especializadas de Imagem:*
     - Classificação e Reconhecimento.
     - Detecção de Objetos: Família YOLO (You Only Look Once), Faster R-CNN, SSD.
     - Segmentação: Semântica (U-Net, SegNet) e de Instâncias (Mask R-CNN).
   - *Visão com Transformers:* Vision Transformers (ViT), Swin Transformer.

3. **Processamento de Linguagem Natural (PLN / NLP):**
   - *Representação Vetorial de Texto:* Bag-of-Words (BoW), TF-IDF, N-gramas, Embeddings distribuídos densos (Word2Vec CBOW e Skip-Gram, GloVe, FastText).
   - *Modelos Sequenciais Recorrentes:* Recurrent Neural Networks (RNN), Long Short-Term Memory (LSTM), Gated Recurrent Unit (GRU).
   - *A Revolução do Mecanismo de Atenção e Transformers:*
     - Mecanismo de Auto-Atenção (*Self-Attention*) e Atenção Multi-Cabeça (*Multi-Head Attention* - Vaswani et al., 2017).
     - Codificadores puros: BERT (*Bidirectional Encoder Representations from Transformers*), RoBERTa.
     - Decodificadores autoregressivos: Família GPT (Generative Pre-trained Transformer).
     - Modelos Sequência-para-Sequência: T5, BART.
   - *Modelos de Linguagem de Grande Porte (LLMs):*
     - Pré-treinamento não supervisionado, alinhamento por feedback humano (RLHF / DPO).
     - Adaptação eficiente de parâmetros (PEFT): LoRA (*Low-Rank Adaptation*), QLoRA, Prefix Tuning.
     - Recuperação Aumentada por Geração (RAG - *Retrieval-Augmented Generation*) com bancos de dados vetoriais (Milvus, Pinecone, Chroma, Qdrant).

4. **Modelos Generativos (*Generative AI*):**
   - *Autoencoders Variacionais (VAEs):* Espaços latentes contínuos, divergência de Kullback-Leibler (KL Divergence).
   - *Redes Adversárias Generativas (GANs):* Competição minimax entre Gerador e Discriminador, DCGAN, CycleGAN, StyleGAN.
   - *Modelos de Difusão:* Equações diferenciais estocásticas e processos de difusão reversa (DDPM, Latent Diffusion / Stable Diffusion).

---

### Eixo 8: Avaliação, Diagnóstico e Validação de Modelos

1. **Protocolos de Validação e Particionamento:**
   - *Método Holdout:* Divisão estratificada em Treino, Validação e Teste.
   - *Validação Cruzada (Cross-Validation):* K-Fold clássico, K-Fold Estratificado (para classes desbalanceadas), Repeated K-Fold, Leave-One-Out (LOO), Group K-Fold (para dados agrupados/hierárquicos).
   - *Validação Temporal:* TimeSeriesSplit, validação em janela deslizante (*Rolling Window*) e expansiva (*Expanding Window*) para prevenir vazamento temporal (*look-ahead bias*).
   - *Prevenção de Vazamento de Dados (Data Leakage):* Isolamento estrito de escalonadores, imputadores e codificadores categóricos exclusivamente no conjunto de treino antes de qualquer transformação no teste.

2. **Métricas de Desempenho:**
   - **Classificação:**
     - Matriz de Confusão: Verdadeiros Positivos (TP), Falsos Positivos (FP), Verdadeiros Negativos (TN), Falsos Negativos (FN).
     - Acurácia: $\frac{TP + TN}{TP + TN + FP + FN}$
     - Precisão (*Precision*): $\frac{TP}{TP + FP}$
     - Revocação / Sensibilidade (*Recall*): $\frac{TP}{TP + FN}$
     - Especificidade: $\frac{TN}{TN + FP}$
     - F1-Score e F-Beta Score: Média harmônica entre Precisão e Revocação.
     - Curva ROC (*Receiver Operating Characteristic*) e Área sob a Curva (AUC-ROC).
     - Curva Precision-Recall (PR-AUC), essencial para problemas com severo desbalanceamento de classes.
     - Entropia Cruzada / Perda Logarítmica (*Log-Loss*).
     - Coeficiente Kappa de Cohen e Coeficiente de Correlação de Matthews (MCC).
   - **Regressão:**
     - Erro Médio Absoluto (MAE): $\frac{1}{n}\sum |y - \hat{y}|$
     - Erro Quadrático Médio (MSE): $\frac{1}{n}\sum (y - \hat{y})^2$
     - Raiz do Erro Quadrático Médio (RMSE): $\sqrt{MSE}$
     - Erro Percentual Absoluto Médio (MAPE).
     - Coeficiente de Determinação ($R^2$) e $R^2$ Ajustado (penalizado pelo número de preditores).
   - **Agrupamento (Não Supervisionado):**
     - Métricas Intrínsecas: Coeficiente de Silhueta ($-1$ a $+1$), Índice de Davies-Bouldin, Índice Calinski-Harabasz, Inércia intra-cluster (método do cotovelo).
     - Métricas Extrínsecas (com rótulos reais): Ajuste do Índice Rand (ARI), Informação Mútua Ajustada (AMI), Homogeneidade e Completude.

3. **Diagnóstico Teórico e Calibração:**
   - *Dilema Viés-Variância (*Bias-Variance Tradeoff*):*
     - Erro Total = $\text{Viés}^2 + \text{Variância} + \text{Erro Irredutível}$.
     - Identificação de Subajuste (*Underfitting* - alto viés) e Sobreajuste (*Overfitting* - alta variância).
   - *Curvas de Aprendizado e Curvas de Validação:* Análise de erro versus tamanho do dataset e hiperparâmetros de complexidade.
   - *Calibração de Probabilidades:* Curvas de calibração (*Reliability Diagrams*), Escalonamento de Platt (*Platt Scaling*) e Regressão Isotônica.

---

### Eixo 9: Visualização de Dados e Comunicação

1. **Fundamentos Teóricos e Semiótica Gráfica:**
   - *A Gramática dos Gráficos (Leland Wilkinson):* Estrutura formal composta por Dados, Mapeamento Estético (*Aesthetics*), Geometrias (*Geoms*), Facetas (*Facets*), Estatísticas (*Stats*), Coordenadas e Temas.
   - *Semiótica da Percepção Visual (Jacques Bertin e Edward Tufte):*
     - Canais perceptivos ordenados por precisão decrescente: Posição ao longo de uma escala comum, posição ao longo de escalas não alinhadas, comprimento, direção/ângulo, área, volume, curvatura, matiz e saturação de cor.
     - Princípios de Tufte: Relação Dado-Tinta (*Data-Ink Ratio*), eliminação de poluição gráfica (*chartjunk*), honestidade nos fatores de distorção visual (*Lie Factor*).

2. **Tipologias de Gráficos e Escolha Visual:**
   - *Visualização de Distribuição:* Histograma, Gráficos de Densidade por Kernel (KDE), Boxplot, Violin Plot, Empirical Cumulative Distribution Function (ECDF).
   - *Visualização de Relação e Correlação:* Gráficos de Dispersão 2D e 3D (*Scatter Plots*), Matrizes de Dispersão (*Pairplots*), Mapas de Calor de Correlação (*Heatmaps*), Gráficos de Bolhas.
   - *Visualização de Comparação e Composição:* Gráficos de Barras (agrupadas e empilhadas), Gráficos de Linha, Áreas Empilhadas, Treemaps, Gráficos de Waterfall.
   - *Visualização de Fluxo e Redes:* Diagramas de Sankey, Diagramas de Cordas, Grafos de Nós e Arestas dirigidas.
   - *Visualização Geoespacial:* Mapas de Coropletas, Mapas de Símbolos Proporcionais, Mapas de Calor Geoespaciais (*Kernel Density Surface*).

3. **Interatividade e Visualização na Web:**
   - *Bibliotecas Especializadas:* D3.js (*Data-Driven Documents*), Vega-Lite, Plotly, Chart.js.
   - *Princípio de Shneiderman:* *"Overview first, zoom and filter, then details-on-demand"* (Visão geral primeiro, zoom e filtro, detalhes sob demanda).

4. **Data Storytelling e Comunicação com Stakeholders:**
   - Estrutura narrativa em 3 atos: Contexto/Problema $\rightarrow$ Evidência Baseada em Dados $\rightarrow$ Recomendação Acionável.
   - Adequação do nível de detalhamento técnico ao público-alvo (especialistas técnicos versus tomadores de decisão executivos).

---

### Eixo 10: MLOps, Produção e IA Responsável

1. **Ciclo de Vida de MLOps (*Machine Learning Operations*):**
   - *Versionamento Multidimensional:* Versionamento de código (Git), versionamento de dados e artefatos de modelo (DVC - *Data Version Control*, Git LFS).
   - *Rastreamento de Experimentos (*Experiment Tracking*):* Registro de parâmetros, métricas e artefatos por execução (MLflow, Weights & Biases, Neptune.ai).
   - *Registro de Modelos (*Model Registry*):* Governança de versões candidatas, homologação e promoção de modelos (Staging $\rightarrow$ Production).

2. **Deploy, Empacotamento e Servidão de Modelos (*Model Serving*):**
   - *Microsserviços e Contêineres:* Docker, Kubernetes (K8s), orquestração via KServe ou Seldon Core.
   - *APIs de Inferência:* Servidores de inferência de baixa latência (FastAPI, Triton Inference Server, TorchServe, TF Serving).
   - *Paradigmas de Inferência:*
     - Inferência Online / Síncrona (tempo real via HTTP/gRPC).
     - Inferência em Lote / Assíncrona (processamento periódico em larga escala).
     - Inferência em Streaming (processamento em tempo real sobre tópicos Kafka).
     - Inferência em Borda (*Edge AI*): Conversão e quantização para execução em dispositivos móveis/embarados (ONNX Runtime, TensorRT, TensorFlow Lite, OpenVINO).

3. **Monitoramento e Observabilidade Contínua:**
   - *Degradação de Desempenho e Derivas:*
     - Deriva de Dados (*Data Drift / Covariate Shift*): Mudança na distribuição dos atributos preditores $P(X)$.
     - Deriva de Conceito (*Concept Drift*): Mudança na relação matemática entre os atributos preditores e o alvo $P(Y|X)$.
     - Deriva de Rótulo (*Prior Probability Shift*): Mudança na distribuição marginal das classes $P(Y)$.
   - *Testes de Deriva Estatística:* Teste de Kolmogorov-Smirnov (KS), Divergência de Kullback-Leibler (KL), Population Stability Index (PSI).
   - *Automação de Retreinamento:* Pipelines de CI/CD/CT (*Continuous Integration / Continuous Deployment / Continuous Training*).

4. **Interpretabilidade e Explicabilidade (XAI - *Explainable AI*):**
   - *Modelos Intrinsecamente Interpretáveis ("Caixa Branca"):* Regressão Linear com coeficientes padronizados, Árvores de Decisão curtas, Modelos Aditivos Generalizados (GAMs).
   - *Técnicas Agnósticas de Explicação Pós-Hoc ("Caixa Preta"):*
     - SHAP (*Shapley Additive exPlanations*): Baseado na Teoria dos Jogos Cooperativos de Lloyd Shapley, mensura a contribuição marginal de cada feature (Valores de Shapley locais e globais).
     - LIME (*Local Interpretable Model-agnostic Explanations*): Ajusta modelos lineares locais no entorno imediato de predições individuais.
     - Gráficos de Dependência Parcial (PDP) e Individual Conditional Expectation (ICE).
     - Importância por Permutação (*Permutation Feature Importance*).

5. **Ética, Justiça Algorítmica e Ciência da Ciência de Dados:**
   - *Justiça Algorítmica (*Fairness*):*
     - Auditoria de disparidade de impacto contra atributos protegidos (gênero, raça, idade).
     - Métricas de justiça: Paridade Demográfica (*Demographic Parity*), Igualdade de Oportunidades (*Equal Opportunity*), Igualdade de Probabilidades (*Equalized Odds*).
   - *Princípios FAIR para Dados e Ciência:* *Findable* (Localizável), *Accessible* (Acessível), *Interoperable* (Interoperável) e *Reusable* (Reutilizável).
   - *Metaciência da Análise de Dados (*Science about Data Science* - Donoho):*
     - Estudos sobre reprodutibilidade computacional, pré-registro de análises e combate ao *p-hacking* e *data snooping*.

---

## 4. Mapeamento para Laboratórios Interativos no Navegador

Para orientar a materialização educacional no **DataLab**, a tabela a seguir mapeia como os conceitos de cada eixo podem ser concretizados em ferramentas e laboratórios interativos 100% *client-side* (JavaScript/HTML5):

| Eixo / Subárea | Aplicação no DataLab | Implementação Interativa Recomendada |
| :--- | :--- | :--- |
| **1. Fundamentos** | Simulador de Teorema Central do Limite e Testes de Hipótese | Slider de tamanho amostral ($N$), histograma em tempo real de médias amostrais e cálculo dinâmico de p-valor |
| **2. Engenharia** | Playground de SQL e Modelagem de Esquema | Interpretador SQL em memória (ex: SQL.js/DuckDB-Wasm) e diagramador visual de tabelas e chaves |
| **3. Governança** | Verificador de Qualidade e Mascarador de Dados | Analisador de completude de colunas e regras interativas de anonimização (Hashing, Mascaramento) |
| **4. Wrangling** | Painel de Pré-Processamento Reativo | Botões interativos de normalização (MinMax, Standard, Robust) com visualização instantânea antes/depois |
| **5. KDD & EDA** | Matriz de Correlação e Mineração Apriori | Heatmap interativo com filtro de Pearson e gerador de regras de associação com sliders de suporte/confiança |
| **6. Machine Learning** | Ajuste de Regressão Polinomial e Classificador KNN | Canvas interativo com clique para adicionar pontos, ajuste de curva em tempo real e visualização de fronteiras de decisão |
| **7. Deep Learning** | Simulador de Rede Neural Feedforward (MLP) | Visualizador gráfico de nós/pesos, forward pass passo a passo com ativações selecionáveis (ReLU, Sigmoid) |
| **8. Avaliação** | Matriz de Confusão e Curva ROC Interativa | Slider de limiar de decisão (*decision threshold*) atualizando matriz de confusão e ponto na curva ROC dinamicamente |
| **9. Visualização** | Construtor da Gramática dos Gráficos | Painel estilo ggplot2/Vega-Lite onde o usuário seleciona eixos $X$, $Y$, cor e tipo geométrico |
| **10. MLOps & XAI** | Simulador de Concept Drift e Calculadora SHAP | Gráfico de evolução temporal de predições com injeção manual de deriva e cascata (*waterfall*) de impacto de features |

---

## 5. Referências Bibliográficas e Normativas

### Normas Internacionais e Padrões Governamentais
1. **ISO/IEC 20546:2019:** *Information technology — Big data — Overview and vocabulary*. International Organization for Standardization / International Electrotechnical Commission, Genebra, 2019.
2. **ISO/IEC 22989:2022:** *Information technology — Artificial intelligence — Artificial intelligence concepts and terminology*. ISO/IEC JTC 1/SC 42, 2022.
3. **NIST SP 1500-1:** *NIST Big Data Interoperability Framework: Volume 1, Definitions*. National Institute of Standards and Technology, U.S. Department of Commerce, 2015 (revisado em 2019).

### Diretrizes Curriculares e Relatórios Institucionais
4. **ACM Data Science Task Force (2021):** *Computing Competencies for Undergraduate Data Science Curricula*. Association for Computing Machinery (ACM), co-patrocinado por IEEE-CS, ASA, MAA e SIAM. Disponível em: `https://www.acm.org/education/curricula-recommendations`.
5. **EDISON Data Science Framework (EDSF):** *Data Science Competence Framework (CF-DS)* e *Data Science Body of Knowledge (DS-BoK)*. Projeto Europeu Horizon 2020, União Europeia, 2017.
6. **National Academies of Sciences, Engineering, and Medicine (2018):** *Data Science for Undergraduates: Opportunities and Options*. Washington, DC: The National Academies Press. ISBN 978-0-309-47559-4.

### Artigos Seminais e Fundamentação Epistemológica
7. **Breiman, L. (2001):** *"Statistical Modeling: The Two Cultures"*. *Statistical Science*, 16(3), pp. 199–231.
8. **Cleveland, W. S. (2001):** *"Data Science: An Action Plan for Expanding the Technical Areas of the Field of Statistics"*. *International Statistical Review*, 69(1), pp. 21–26.
9. **Conway, D. (2010):** *"The Data Science Venn Diagram"*. *Data Science Lab*.
10. **Dhar, V. (2013):** *"Data Science and Prediction"*. *Communications of the ACM*, 56(12), pp. 64–73.
11. **Donoho, D. (2017):** *"50 Years of Data Science"*. *Journal of Computational and Graphical Statistics*, 26(4), pp. 745–766.
12. **Fayyad, U., Piatetsky-Shapiro, G., & Smyth, P. (1996):** *"From Data Mining to Knowledge Discovery in Databases"*. *AI Magazine*, 17(3), pp. 37–54.
13. **Gray, J. (2009):** *"Jim Gray on eScience: A Transformed Scientific Method"*. Em Hey, T., Tansley, S., & Tolle, K. (Eds.), *The Fourth Paradigm: Data-Intensive Scientific Discovery*. Microsoft Research, pp. xix–xxxiii.
14. **Naur, P. (1974):** *Concise Survey of Computer Methods*. Petrocelli Books, Nova York.
15. **Tukey, J. W. (1962):** *"The Future of Data Analysis"*. *The Annals of Mathematical Statistics*, 33(1), pp. 1–67.
16. **Tukey, J. W. (1977):** *Exploratory Data Analysis*. Addison-Wesley Publishing Company, Reading, Mass.

### Literatura de Referência em Aprendizado de Máquina e Visualização
17. **Hastie, T., Tibshirani, R., & Friedman, J. (2009):** *The Elements of Statistical Learning: Data Mining, Inference, and Prediction*. 2ª Edição, Springer.
18. **Provost, F., & Fawcett, T. (2013):** *Data Science for Business: What You Need to Know about Data Mining and Data-Analytic Thinking*. O'Reilly Media.
19. **Wilkinson, L. (2005):** *The Grammar of Graphics*. 2ª Edição, Statistics and Computing, Springer Science+Business Media.
20. **Tufte, E. R. (2001):** *The Visual Display of Quantitative Information*. 2ª Edição, Graphics Press, Cheshire, Connecticut.
