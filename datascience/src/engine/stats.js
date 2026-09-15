// Funções estatísticas essenciais para Análise Exploratória e Profiling de Dados

export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + (Number(val) || 0), 0);
  return sum / arr.length;
}

export function median(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].map(Number).filter(v => !isNaN(v)).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mode(arr) {
  if (!arr || arr.length === 0) return [];
  const freq = {};
  let maxCount = 0;
  arr.forEach(val => {
    freq[val] = (freq[val] || 0) + 1;
    if (freq[val] > maxCount) maxCount = freq[val];
  });
  return Object.keys(freq).filter(k => freq[k] === maxCount);
}

export function variance(arr) {
  if (!arr || arr.length <= 1) return 0;
  const avg = mean(arr);
  const sumSquareDiff = arr.reduce((acc, val) => acc + Math.pow(Number(val) - avg, 2), 0);
  return sumSquareDiff / (arr.length - 1);
}

export function stdDev(arr) {
  return Math.sqrt(variance(arr));
}

export function quantile(arr, q) {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].map(Number).filter(v => !isNaN(v)).sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}

export function summaryStats(arr) {
  const nums = arr.map(Number).filter(v => !isNaN(v));
  if (nums.length === 0) {
    return { count: 0, mean: 0, median: 0, std: 0, min: 0, max: 0, q1: 0, q3: 0, iqr: 0 };
  }
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const q1 = quantile(nums, 0.25);
  const q3 = quantile(nums, 0.75);
  const iqr = q3 - q1;
  return {
    count: nums.length,
    mean: Number(mean(nums).toFixed(2)),
    median: Number(median(nums).toFixed(2)),
    std: Number(stdDev(nums).toFixed(2)),
    min: Number(min.toFixed(2)),
    max: Number(max.toFixed(2)),
    q1: Number(q1.toFixed(2)),
    q3: Number(q3.toFixed(2)),
    iqr: Number(iqr.toFixed(2))
  };
}

// Coeficiente de Correlação de Pearson (-1 a +1)
export function pearsonCorrelation(x, y) {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;
  const xMean = mean(x.slice(0, n));
  const yMean = mean(y.slice(0, n));
  let num = 0;
  let den1 = 0;
  let den2 = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - xMean;
    const dy = y[i] - yMean;
    num += dx * dy;
    den1 += dx * dx;
    den2 += dy * dy;
  }

  const den = Math.sqrt(den1 * den2);
  if (den === 0) return 0;
  return Number((num / den).toFixed(3));
}

// Coeficiente de Correlação de Postos de Spearman
export function spearmanCorrelation(x, y) {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;

  function getRanks(arr) {
    const indexed = arr.map((val, idx) => ({ val, idx }));
    indexed.sort((a, b) => a.val - b.val);
    const ranks = new Array(arr.length);
    let i = 0;
    while (i < indexed.length) {
      let j = i;
      while (j < indexed.length - 1 && indexed[j].val === indexed[j + 1].val) {
        j++;
      }
      const avgRank = (i + j + 2) / 2;
      for (let k = i; k <= j; k++) {
        ranks[indexed[k].idx] = avgRank;
      }
      i = j + 1;
    }
    return ranks;
  }

  const xRanks = getRanks(x.slice(0, n));
  const yRanks = getRanks(y.slice(0, n));
  return pearsonCorrelation(xRanks, yRanks);
}

// Detecção de Outliers via Regra de Tukey (IQR)
export function detectOutliersIQR(arr, factor = 1.5) {
  const nums = arr.map(Number).filter(v => !isNaN(v));
  const q1 = quantile(nums, 0.25);
  const q3 = quantile(nums, 0.75);
  const iqr = q3 - q1;
  const lowerBound = q1 - factor * iqr;
  const upperBound = q3 + factor * iqr;

  const outliers = nums.filter(v => v < lowerBound || v > upperBound);
  return {
    lowerBound: Number(lowerBound.toFixed(2)),
    upperBound: Number(upperBound.toFixed(2)),
    outliers,
    outliersCount: outliers.length,
    percentage: Number(((outliers.length / nums.length) * 100).toFixed(1))
  };
}
