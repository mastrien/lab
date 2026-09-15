// Banco de desafios e quizzes conceituais para fixação didática

export const QUIZZES = [
  {
    id: "q1",
    category: "Mineração de Dados & KDD",
    question: "Em um supermercado, a regra {Cerveja} => {Fralda} possui um Lift de 2.4. Como esse valor deve ser interpretado?",
    options: [
      "A regra é inútil pois o Lift precisa ser menor que 1 para indicar relevância.",
      "Clientes que compram Cerveja têm 2.4 vezes mais probabilidade de comprar Fralda do que a média geral de compra de fraldas.",
      "O suporte da cerveja é exatamente 24% no banco de dados.",
      "A confiança da regra é de 24%."
    ],
    correctIndex: 1,
    explanation: "O Lift mede a dependência entre os itens: se Lift = 1, os itens são independentes; se Lift > 1 (aqui 2.4), a compra do antecedente alavanca positivamente a probabilidade de compra do consequente em 2.4x!"
  },
  {
    id: "q2",
    category: "Fundamentos de KDD",
    question: "Qual das seguintes alternativas representa a ordem correta das 5 etapas fundamentais do processo KDD (Knowledge Discovery in Databases)?",
    options: [
      "Mineração de Dados -> Seleção -> Transformação -> Limpeza -> Avaliação",
      "Seleção -> Limpeza/Pré-processamento -> Transformação -> Mineração de Dados -> Interpretação/Avaliação",
      "Limpeza -> Mineração de Dados -> Seleção -> Avaliação -> Transformação",
      "Transformação -> Seleção -> Limpeza -> Mineração de Dados -> Deploy"
    ],
    correctIndex: 1,
    explanation: "O processo KDD segue o fluxo: (1) Seleção dos dados de interesse, (2) Limpeza e tratamento de ruído, (3) Transformação e discretização, (4) Mineração de padrões e (5) Interpretação/Avaliação do conhecimento descoberto."
  },
  {
    id: "q3",
    category: "Machine Learning / Overfitting",
    question: "Ao ajustar uma Regressão Polinomial com grau d = 15 em um conjunto pequeno com apenas 20 pontos, o modelo atinge R² = 1.0 no treino, mas erra grosseiramente em novos dados. O que ocorreu?",
    options: [
      "Underfitting (Subajuste) devido à alta simplicidade do modelo.",
      "Overfitting (Superajuste) com alto viés e baixa variância.",
      "Overfitting (Superajuste) com baixa variância e baixo erro de teste.",
      "Overfitting (Superajuste) devido à alta complexidade, memorizando o ruído dos pontos e apresentando alta variância."
    ],
    correctIndex: 3,
    explanation: "Polinômios de grau excessivamente alto têm flexibilidade exagerada, curvando-se para passar por todos os pontos de treino (inclusive o ruído aleatório), o que caracteriza Overfitting com alta variância e incapacidade de generalização."
  },
  {
    id: "q4",
    category: "Engenharia de Atributos",
    question: "Por que devemos calcular os parâmetros de normalização (como média e desvio no StandardScaler) APENAS no conjunto de treino e depois aplicá-los ao conjunto de teste?",
    options: [
      "Para evitar Vazamento de Dados (Data Leakage), garantindo que informações do teste não contaminem o treino.",
      "Porque o Scikit-Learn proíbe normalizar conjuntos de teste.",
      "Porque o conjunto de teste nunca possui valores numéricos.",
      "Para aumentar propositalmente a precisão do modelo no teste."
    ],
    correctIndex: 0,
    explanation: "Normalizar o dataset completo antes da divisão causa Data Leakage (Vazamento de Dados): o modelo se beneficiaria indiretamente da média e dispersão dos dados de teste, gerando uma estimativa irrealista de desempenho."
  },
  {
    id: "q5",
    category: "Avaliação de Modelos",
    question: "Em um sistema de detecção de fraudes em cartões de crédito ou diagnóstico de doenças graves, qual métrica geralmente deve ser priorizada para evitar deixar fraudes/doenças passarem despercebidas?",
    options: [
      "Especificidade",
      "Recall (Sensibilidade)",
      "Acurácia Geral",
      "Taxa de Falsos Positivos"
    ],
    correctIndex: 1,
    explanation: "O Recall (Sensibilidade) mede a fração de casos positivos reais que o modelo conseguiu capturar. Em fraudes e diagnósticos médicos, um Falso Negativo (deixar um doente ir para casa ou uma fraude passar) é muito mais grave que um Falso Positivo."
  }
];
