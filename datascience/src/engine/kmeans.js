// Algoritmo K-Means Interativo com Controle Passo a Passo e Método do Cotovelo (Elbow Method)

export function initKMeans(points, k = 3) {
  if (!points || points.length === 0) return null;

  // Sorteio de k centroides iniciais distintos
  const shuffled = [...points].sort(() => 0.5 - Math.random());
  const centroids = shuffled.slice(0, Math.min(k, shuffled.length)).map((p, idx) => ({
    id: idx,
    x: p.x,
    y: p.y,
    prevX: p.x,
    prevY: p.y
  }));

  return {
    k,
    points: points.map(p => ({ ...p, cluster: 0 })),
    centroids,
    iteration: 0,
    converged: false,
    inertia: 0
  };
}

export function stepKMeans(state) {
  if (!state || state.converged) return state;

  const { points, centroids, k } = state;

  // 1. Associação: atribuir cada ponto ao centroide mais próximo
  let totalInertia = 0;
  const updatedPoints = points.map(p => {
    let minDist = Infinity;
    let closestCluster = 0;

    centroids.forEach((c, idx) => {
      const distSq = Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
      if (distSq < minDist) {
        minDist = distSq;
        closestCluster = idx;
      }
    });

    totalInertia += minDist;
    return { ...p, cluster: closestCluster };
  });

  // 2. Atualização dos centroides para a média dos seus membros
  let maxCentroidShift = 0;
  const updatedCentroids = centroids.map((c, idx) => {
    const clusterPoints = updatedPoints.filter(p => p.cluster === idx);
    if (clusterPoints.length === 0) {
      return { ...c, prevX: c.x, prevY: c.y };
    }

    const newX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
    const newY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;
    const shift = Math.hypot(newX - c.x, newY - c.y);
    if (shift > maxCentroidShift) maxCentroidShift = shift;

    return {
      id: idx,
      x: Number(newX.toFixed(2)),
      y: Number(newY.toFixed(2)),
      prevX: c.x,
      prevY: c.y
    };
  });

  const converged = maxCentroidShift < 0.01 || state.iteration >= 50;

  return {
    k,
    points: updatedPoints,
    centroids: updatedCentroids,
    iteration: state.iteration + 1,
    converged,
    inertia: Number(totalInertia.toFixed(2))
  };
}

// Cálculo da curva de inércia para o Método do Cotovelo (Elbow Curve)
export function computeElbowCurve(points, maxK = 6) {
  const curve = [];

  for (let k = 1; k <= maxK; k++) {
    let state = initKMeans(points, k);
    if (!state) continue;

    for (let iter = 0; iter < 20; iter++) {
      state = stepKMeans(state);
      if (state.converged) break;
    }

    curve.push({ k, inertia: state.inertia });
  }

  return curve;
}
