// Modelos de Machine Learning Client-Side e Métricas de Avaliação

// 1. Regressão Polinomial (com regularização suave para estabilidade numérica e demonstração de overfitting)
export function fitPolynomialRegression(points, degree = 1, lambda = 1e-4) {
  if (!points || points.length < 2) return { predict: () => 0, r2: 0, mse: 0, mae: 0, coeffs: [] };

  const n = points.length;
  const m = degree + 1;

  // Montar matriz de Vandermonde X e vetor Y
  // X: n x m onde X[i][j] = x_i^j
  // Resolver (X^T * X + lambda * I) * w = X^T * Y
  const XtX = Array.from({ length: m }, () => new Array(m).fill(0));
  const XtY = new Array(m).fill(0);

  // Normalização prévia de x para [-1, 1] internamente para evitar estouro numérico com potências
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const xRange = (xMax - xMin) || 1;

  function normX(x) {
    return 2 * (x - xMin) / xRange - 1;
  }

  for (let i = 0; i < n; i++) {
    const nx = normX(points[i].x);
    const y = points[i].y;
    const powers = new Array(m);
    powers[0] = 1;
    for (let p = 1; p < m; p++) powers[p] = powers[p - 1] * nx;

    for (let r = 0; r < m; r++) {
      XtY[r] += powers[r] * y;
      for (let c = 0; c < m; c++) {
        XtX[r][c] += powers[r] * powers[c];
      }
    }
  }

  // Regularização L2 Ridge
  for (let i = 1; i < m; i++) {
    XtX[i][i] += lambda;
  }

  // Eliminação de Gauss com pivoteamento parcial
  const coeffs = solveLinearSystem(XtX, XtY);

  function predict(x) {
    const nx = normX(x);
    let val = 0;
    let power = 1;
    for (let i = 0; i < m; i++) {
      val += (coeffs[i] || 0) * power;
      power *= nx;
    }
    return val;
  }

  // Calcular métricas R², MSE e MAE
  let ssTotal = 0;
  let ssRes = 0;
  let absErrSum = 0;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;

  for (let i = 0; i < n; i++) {
    const pred = predict(points[i].x);
    const err = points[i].y - pred;
    ssRes += err * err;
    ssTotal += Math.pow(points[i].y - yMean, 2);
    absErrSum += Math.abs(err);
  }

  const mse = ssRes / n;
  const mae = absErrSum / n;
  const r2 = ssTotal > 0 ? Math.max(-1, 1 - ssRes / ssTotal) : 0;

  return {
    predict,
    r2: Number(r2.toFixed(3)),
    mse: Number(mse.toFixed(2)),
    mae: Number(mae.toFixed(2)),
    coeffs: coeffs.map(c => Number(c.toFixed(2)))
  };
}

// Resolução de sistema linear Ax = B por eliminação Gaussiana
function solveLinearSystem(A, B) {
  const n = B.length;
  const M = A.map((row, i) => [...row, B[i]]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    if (Math.abs(M[i][i]) < 1e-12) continue;

    for (let k = i + 1; k < n; k++) {
      const c = -M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) {
        M[k][j] = i === j ? 0 : M[k][j] + c * M[i][j];
      }
    }
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j++) sum -= M[i][j] * x[j];
    x[i] = Math.abs(M[i][i]) > 1e-12 ? sum / M[i][i] : 0;
  }
  return x;
}

// 2. Classificador KNN 2D
export function predictKNN(trainPoints, qx, qy, k = 3, metric = "euclidean") {
  if (!trainPoints || trainPoints.length === 0) return 0;

  const distances = trainPoints.map(p => {
    const dx = p.x - qx;
    const dy = p.y - qy;
    const dist = metric === "manhattan" ? Math.abs(dx) + Math.abs(dy) : Math.hypot(dx, dy);
    return { dist, label: p.label };
  });

  distances.sort((a, b) => a.dist - b.dist);
  const kNearest = distances.slice(0, Math.min(k, distances.length));

  const votes = {};
  kNearest.forEach(n => {
    votes[n.label] = (votes[n.label] || 0) + 1;
  });

  let bestLabel = null;
  let maxVotes = -1;
  for (const [label, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      bestLabel = label;
    }
  }
  return bestLabel;
}

// 3. Matriz de Confusão e Métricas baseadas em Threshold
export function evaluateClassificationWithThreshold(samples, threshold = 0.5) {
  // samples: array de { score: number (0 a 1), actual: 1 | 0 }
  let tp = 0, fp = 0, fn = 0, tn = 0;

  samples.forEach(s => {
    const predicted = s.score >= threshold ? 1 : 0;
    if (s.actual === 1 && predicted === 1) tp++;
    else if (s.actual === 0 && predicted === 1) fp++;
    else if (s.actual === 1 && predicted === 0) fn++;
    else if (s.actual === 0 && predicted === 0) tn++;
  });

  const total = tp + fp + fn + tn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0; // Sensibilidade
  const specificity = (tn + fp) > 0 ? tn / (tn + fp) : 0;
  const f1 = (precision + recall) > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

  return {
    tp, fp, fn, tn,
    total,
    accuracy: Number(accuracy.toFixed(3)),
    precision: Number(precision.toFixed(3)),
    recall: Number(recall.toFixed(3)),
    specificity: Number(specificity.toFixed(3)),
    f1: Number(f1.toFixed(3))
  };
}

// 4. Curva ROC e Cálculo de AUC (Área sob a curva ROC)
export function computeROCCurve(samples) {
  const steps = 101;
  const curvePoints = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const res = evaluateClassificationWithThreshold(samples, t);
    const tpr = res.recall; // TP / P
    const fpr = (res.fp + res.tn) > 0 ? res.fp / (res.fp + res.tn) : 0;
    curvePoints.push({ threshold: Number(t.toFixed(2)), fpr: Number(fpr.toFixed(3)), tpr: Number(tpr.toFixed(3)) });
  }

  // Ordenar por FPR crescente para cálculo da área pelo método dos trapézios
  const sortedPoints = [...curvePoints].sort((a, b) => a.fpr - b.fpr || a.tpr - b.tpr);
  let auc = 0;
  for (let i = 1; i < sortedPoints.length; i++) {
    const deltaFpr = sortedPoints[i].fpr - sortedPoints[i - 1].fpr;
    const avgTpr = (sortedPoints[i].tpr + sortedPoints[i - 1].tpr) / 2;
    auc += deltaFpr * avgTpr;
  }

  return {
    curvePoints,
    auc: Number(Math.max(0.5, Math.min(1.0, auc)).toFixed(3))
  };
}
