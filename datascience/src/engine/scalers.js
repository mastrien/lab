// Engenharia de Atributos e Escalonamento de Dados

import { mean, stdDev, median, quantile } from "./stats.js";

// MinMaxScaler: mapeia os dados para o intervalo [0, 1] (ou customizado)
export function minMaxScaler(arr, featureMin = 0, featureMax = 1) {
  const nums = arr.map(Number);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (max === min) return nums.map(() => featureMin);
  return nums.map(x => Number((((x - min) / (max - min)) * (featureMax - featureMin) + featureMin).toFixed(3)));
}

// StandardScaler (Z-score): média = 0, desvio padrão = 1
export function standardScaler(arr) {
  const nums = arr.map(Number);
  const avg = mean(nums);
  const s = stdDev(nums);
  if (s === 0) return nums.map(() => 0);
  return nums.map(x => Number(((x - avg) / s).toFixed(3)));
}

// RobustScaler: robusto a outliers, usa mediana e intervalo interquartil (IQR)
export function robustScaler(arr) {
  const nums = arr.map(Number);
  const med = median(nums);
  const q1 = quantile(nums, 0.25);
  const q3 = quantile(nums, 0.75);
  const iqr = q3 - q1;
  if (iqr === 0) return nums.map(() => 0);
  return nums.map(x => Number(((x - med) / iqr).toFixed(3)));
}

// One-Hot Encoding tabular
export function oneHotEncode(rows, column) {
  const categories = Array.from(new Set(rows.map(r => r[column]))).sort();
  return rows.map(r => {
    const encoded = { ...r };
    categories.forEach(cat => {
      encoded[`${column}_${cat}`] = r[column] === cat ? 1 : 0;
    });
    return encoded;
  });
}

// PCA Simplificado 2D (Projeção nos dois eixos de maior variância)
export function computePCA2D(points2D) {
  if (!points2D || points2D.length < 3) return { projected: [], varianceExplained: [1, 0] };
  const xs = points2D.map(p => p[0]);
  const ys = points2D.map(p => p[1]);
  const xMean = mean(xs);
  const yMean = mean(ys);

  // Centralizar dados
  const centered = points2D.map(p => [p[0] - xMean, p[1] - yMean]);

  // Matriz de covariância 2x2
  let covXX = 0, covYY = 0, covXY = 0;
  centered.forEach(p => {
    covXX += p[0] * p[0];
    covYY += p[1] * p[1];
    covXY += p[0] * p[1];
  });
  const n = centered.length - 1;
  covXX /= n; covYY /= n; covXY /= n;

  // Autovalores da matriz [[covXX, covXY], [covXY, covYY]]
  const trace = covXX + covYY;
  const det = covXX * covYY - covXY * covXY;
  const lambda1 = trace / 2 + Math.sqrt(Math.max(0, (trace * trace) / 4 - det));
  const lambda2 = trace / 2 - Math.sqrt(Math.max(0, (trace * trace) / 4 - det));

  // Autovetor associado a lambda1
  let v1 = [covXY, lambda1 - covXX];
  const mag1 = Math.hypot(v1[0], v1[1]);
  if (mag1 !== 0) {
    v1 = [v1[0] / mag1, v1[1] / mag1];
  } else {
    v1 = [1, 0];
  }

  // Autovetor ortogonal
  const v2 = [-v1[1], v1[0]];

  // Projetar pontos
  const projected = centered.map(p => {
    const pc1 = p[0] * v1[0] + p[1] * v1[1];
    const pc2 = p[0] * v2[0] + p[1] * v2[1];
    return [Number(pc1.toFixed(3)), Number(pc2.toFixed(3))];
  });

  const totalVar = (lambda1 + lambda2) || 1;
  const varExp1 = Number((lambda1 / totalVar).toFixed(3));
  const varExp2 = Number((lambda2 / totalVar).toFixed(3));

  return {
    projected,
    varianceExplained: [varExp1, varExp2],
    eigenvectors: [v1, v2]
  };
}
