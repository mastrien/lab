import { describe, it, expect } from "vitest";
import { mean, median, stdDev, pearsonCorrelation, detectOutliersIQR } from "../src/engine/stats.js";
import { runApriori } from "../src/engine/apriori.js";
import { minMaxScaler, standardScaler } from "../src/engine/scalers.js";
import { fitPolynomialRegression, evaluateClassificationWithThreshold } from "../src/engine/mlModels.js";

describe("Motor Estatístico (stats.js)", () => {
  it("deve calcular a média corretamente", () => {
    expect(mean([2, 4, 6, 8])).toBe(5);
  });

  it("deve calcular a mediana para listas pares e ímpares", () => {
    expect(median([1, 3, 5])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("deve calcular a correlação de Pearson com precisão", () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10]; // Correlação linear perfeita positiva
    expect(pearsonCorrelation(x, y)).toBe(1);
  });

  it("deve detectar outliers pela regra de Tukey", () => {
    const data = [10, 12, 11, 13, 12, 10, 95]; // 95 é outlier
    const res = detectOutliersIQR(data);
    expect(res.outliers).toContain(95);
    expect(res.outliersCount).toBe(1);
  });
});

describe("Algoritmo Apriori (apriori.js - KDD)", () => {
  const transactions = [
    ["Pão", "Leite"],
    ["Pão", "Manteiga"],
    ["Leite", "Manteiga"],
    ["Pão", "Leite", "Manteiga"]
  ];

  it("deve identificar conjuntos frequentes de itens", () => {
    const res = runApriori(transactions, 0.5, 0.5);
    expect(res.frequentItemsets.length).toBeGreaterThan(0);
    // Pão aparece em 3 de 4 transações (suporte 0.75)
    const bread = res.frequentItemsets.find(i => i.items.length === 1 && i.items[0] === "Pão");
    expect(bread?.support).toBe(0.75);
  });

  it("deve gerar regras de associação com suporte, confiança e lift válidos", () => {
    const res = runApriori(transactions, 0.25, 0.5);
    expect(res.rules.length).toBeGreaterThan(0);
    res.rules.forEach(rule => {
      expect(rule.support).toBeGreaterThan(0);
      expect(rule.confidence).toBeGreaterThanOrEqual(0.5);
      expect(rule.lift).toBeGreaterThan(0);
    });
  });
});

describe("Escalonamento (scalers.js)", () => {
  it("deve mapear valores no intervalo [0, 1] com MinMaxScaler", () => {
    const scaled = minMaxScaler([10, 20, 30]);
    expect(scaled[0]).toBe(0);
    expect(scaled[1]).toBe(0.5);
    expect(scaled[2]).toBe(1);
  });

  it("deve padronizar para média ~ 0 com StandardScaler", () => {
    const scaled = standardScaler([10, 20, 30]);
    expect(mean(scaled)).toBeCloseTo(0, 1);
  });
});

describe("Modelagem e Avaliação (mlModels.js)", () => {
  it("deve ajustar uma regressão linear com R² próximo de 1.0 para dados lineares", () => {
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
      { x: 4, y: 8 }
    ];
    const res = fitPolynomialRegression(points, 1);
    expect(res.r2).toBeGreaterThan(0.98);
  });

  it("deve calcular a Matriz de Confusão e métricas corretamente", () => {
    const samples = [
      { actual: 1, score: 0.9 }, // TP
      { actual: 1, score: 0.8 }, // TP
      { actual: 0, score: 0.7 }, // FP
      { actual: 1, score: 0.2 }, // FN
      { actual: 0, score: 0.1 }  // TN
    ];
    const res = evaluateClassificationWithThreshold(samples, 0.5);
    expect(res.tp).toBe(2);
    expect(res.fp).toBe(1);
    expect(res.fn).toBe(1);
    expect(res.tn).toBe(1);
    expect(res.accuracy).toBe(0.6); // (2+1)/5 = 0.6
  });
});
