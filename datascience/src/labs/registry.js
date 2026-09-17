// Registro Central de Laboratórios Modulares Interativos

import { renderLinearAlgebra2DLab } from "./LinearAlgebra2DLab.js";
import { renderCentralLimitTheoremLab } from "./CentralLimitTheoremLab.js";
import { renderEdaStatsLab } from "./EdaStatsLab.js";
import { renderCorrelationHeatmapLab } from "./CorrelationHeatmapLab.js";
import { renderAprioriAssociationLab } from "./AprioriAssociationLab.js";
import { renderTukeyOutlierLab } from "./TukeyOutlierLab.js";
import { renderScalersComparisonLab } from "./ScalersComparisonLab.js";
import { renderPcaProjectionLab } from "./PcaProjectionLab.js";
import { renderPolynomialRegressionLab } from "./PolynomialRegressionLab.js";
import { renderKnnClassifierLab } from "./KnnClassifierLab.js";
import { renderKMeansClusteringLab } from "./KMeansClusteringLab.js";
import { renderConfusionMatrixRocLab } from "./ConfusionMatrixRocLab.js";

export const LAB_REGISTRY = [
  {
    id: "linear-algebra-lab",
    name: "Espaço Vetorial, Matrizes & Projeções 2D",
    axisId: "axis-1",
    axisName: "Eixo 1: Fundamentos",
    chapterId: "axis-1-cap-1-linear-algebra",
    chapterTitle: "Álgebra Linear Computacional",
    category: "Álgebra Linear & Geometria",
    shortDesc: "Simulador interativo de transformações lineares 2D, cálculo de determinantes, produto escalar e projeção ortogonal.",
    render: renderLinearAlgebra2DLab
  },
  {
    id: "clt-lab",
    name: "Teorema Central do Limite",
    axisId: "axis-1",
    axisName: "Eixo 1: Fundamentos",
    chapterId: "axis-1-cap-3-clt",
    chapterTitle: "Probabilidade Teórica e o Teorema Central do Limite",
    category: "Probabilidade & Inferência",
    shortDesc: "Simulador de convergência gaussiana a partir de populações assimétricas com ajuste de tamanho amostral (N).",
    render: renderCentralLimitTheoremLab
  },
  {
    id: "eda-stats-lab",
    name: "Estatística Descritiva & Profiling",
    axisId: "axis-5",
    axisName: "Eixo 5: KDD & EDA",
    chapterId: "axis-5-cap-2-tukey-eda",
    chapterTitle: "Análise Exploratória de Dados de John Tukey (EDA)",
    category: "Estatística Descritiva",
    shortDesc: "Tabela quantitativa paramétrica e não-paramétrica (média, desvio, quartis e IQR) sobre o dataset ativo.",
    render: renderEdaStatsLab
  },
  {
    id: "correlation-lab",
    name: "Matriz de Correlação & Dispersão 2D",
    axisId: "axis-5",
    axisName: "Eixo 5: KDD & EDA",
    chapterId: "axis-5-cap-2-tukey-eda",
    chapterTitle: "Análise Exploratória de Dados de John Tukey (EDA)",
    category: "Estatística Descritiva",
    shortDesc: "Heatmap interativo de coeficientes de Pearson com inspeção instantânea de dispersão bivariada ao clique.",
    render: renderCorrelationHeatmapLab
  },
  {
    id: "apriori-lab",
    name: "Mineração de Regras de Associação (Apriori)",
    axisId: "axis-5",
    axisName: "Eixo 5: KDD & EDA",
    chapterId: "axis-5-cap-3-apriori",
    chapterTitle: "Mineração de Regras de Associação e Algoritmo Apriori",
    category: "Mineração de Padrões",
    shortDesc: "Descoberta de regras A ⇒ B com controles dinâmicos de Suporte, Confiança e ordenação por Lift.",
    render: renderAprioriAssociationLab
  },
  {
    id: "tukey-outlier-lab",
    name: "Detecção de Outliers (Tukey IQR)",
    axisId: "axis-5",
    axisName: "Eixo 5: KDD & EDA",
    chapterId: "axis-5-cap-4-outliers",
    chapterTitle: "Detecção de Anomalias e Outliers",
    category: "Mineração de Padrões",
    shortDesc: "Cálculo de barreiras de corte [Q1 - k·IQR, Q3 + k·IQR] e visualização com faixas de tolerância.",
    render: renderTukeyOutlierLab
  },
  {
    id: "scalers-lab",
    name: "Comparador de Escalonadores Numéricos",
    axisId: "axis-4",
    axisName: "Eixo 4: Pré-Processamento",
    chapterId: "axis-4-cap-2-scalers",
    chapterTitle: "Transformações Numéricas e Escalonamento",
    category: "Engenharia de Dados",
    shortDesc: "Comparação lado a lado de transformações MinMaxScaler [0, 1], StandardScaler (Z-Score) e RobustScaler.",
    render: renderScalersComparisonLab
  },
  {
    id: "pca-lab",
    name: "Redução de Dimensionalidade 2D (PCA)",
    axisId: "axis-4",
    axisName: "Eixo 4: Pré-Processamento",
    chapterId: "axis-4-cap-4-pca",
    chapterTitle: "Redução de Dimensionalidade e Projeções Lineares",
    category: "Engenharia de Dados",
    shortDesc: "Projeção ortogonal das variáveis originais sobre os 2 componentes principais de maior variância.",
    render: renderPcaProjectionLab
  },
  {
    id: "polynomial-regression-lab",
    name: "Regressão Polinomial & Viés-Variância",
    axisId: "axis-6",
    axisName: "Eixo 6: Machine Learning",
    chapterId: "axis-6-cap-1-regression",
    chapterTitle: "Regressão Linear, Polinomial e Regularizações",
    category: "Modelagem Preditiva",
    shortDesc: "Ajuste interativo de polinômios de grau 1 a 8 com diagnóstico de underfitting e overfitting.",
    render: renderPolynomialRegressionLab
  },
  {
    id: "knn-classifier-lab",
    name: "Classificador K-Nearest Neighbors (KNN 2D)",
    axisId: "axis-6",
    axisName: "Eixo 6: Machine Learning",
    chapterId: "axis-6-cap-2-classification",
    chapterTitle: "Classificação Supervisionada e Fronteiras de Decisão",
    category: "Modelagem Preditiva",
    shortDesc: "Variação do número de vizinhos K e métricas de distância com mapa de fronteiras de decisão.",
    render: renderKnnClassifierLab
  },
  {
    id: "kmeans-lab",
    name: "Agrupamento K-Means & Método do Cotovelo",
    axisId: "axis-6",
    axisName: "Eixo 6: Machine Learning",
    chapterId: "axis-6-cap-4-clustering",
    chapterTitle: "Agrupamento Não-Supervisionado (Clustering)",
    category: "Modelagem Não-Supervisionada",
    shortDesc: "Execução passo a passo da convergência de centroides com gráfico de inércia e método do cotovelo.",
    render: renderKMeansClusteringLab
  },
  {
    id: "confusion-roc-lab",
    name: "Matriz de Confusão & Curva ROC/AUC",
    axisId: "axis-8",
    axisName: "Eixo 8: Avaliação",
    chapterId: "axis-8-cap-2-classification-metrics",
    chapterTitle: "Métricas de Classificação, Matriz de Confusão e Curva ROC",
    category: "Avaliação & Diagnóstico",
    shortDesc: "Simulador de limiar de corte probabilístico atualizando taxas de erro e ponto na curva ROC em tempo real.",
    render: renderConfusionMatrixRocLab
  }
];

export function getLabById(id) {
  return LAB_REGISTRY.find(lab => lab.id === id);
}
