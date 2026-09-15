import test from "node:test";
import assert from "node:assert/strict";

import { mean, median, stdDev, pearsonCorrelation, detectOutliersIQR } from "../src/engine/stats.js";
import { runApriori } from "../src/engine/apriori.js";
import { minMaxScaler, standardScaler } from "../src/engine/scalers.js";
import { fitPolynomialRegression, evaluateClassificationWithThreshold } from "../src/engine/mlModels.js";

test("Motor Estatístico (stats.js)", async (t) => {
  await t.test("deve calcular a média corretamente", () => {
    assert.equal(mean([2, 4, 6, 8]), 5);
  });

  await t.test("deve calcular a mediana para listas pares e ímpares", () => {
    assert.equal(median([1, 3, 5]), 3);
    assert.equal(median([1, 2, 3, 4]), 2.5);
  });

  await t.test("deve calcular a correlação de Pearson com precisão", () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    assert.equal(pearsonCorrelation(x, y), 1);
  });

  await t.test("deve detectar outliers pela regra de Tukey", () => {
    const data = [10, 12, 11, 13, 12, 10, 95];
    const res = detectOutliersIQR(data);
    assert.ok(res.outliers.includes(95));
    assert.equal(res.outliersCount, 1);
  });
});

test("Algoritmo Apriori (apriori.js - KDD)", async (t) => {
  const transactions = [
    ["Pão", "Leite"],
    ["Pão", "Manteiga"],
    ["Leite", "Manteiga"],
    ["Pão", "Leite", "Manteiga"]
  ];

  await t.test("deve identificar conjuntos frequentes de itens", () => {
    const res = runApriori(transactions, 0.5, 0.5);
    assert.ok(res.frequentItemsets.length > 0);
    const bread = res.frequentItemsets.find(i => i.items.length === 1 && i.items[0] === "Pão");
    assert.equal(bread?.support, 0.75);
  });

  await t.test("deve gerar regras com suporte, confiança e lift válidos", () => {
    const res = runApriori(transactions, 0.25, 0.5);
    assert.ok(res.rules.length > 0);
    res.rules.forEach(rule => {
      assert.ok(rule.support > 0);
      assert.ok(rule.confidence >= 0.5);
      assert.ok(rule.lift > 0);
    });
  });
});

test("Escalonamento (scalers.js)", async (t) => {
  await t.test("deve mapear valores no intervalo [0, 1] com MinMaxScaler", () => {
    const scaled = minMaxScaler([10, 20, 30]);
    assert.equal(scaled[0], 0);
    assert.equal(scaled[1], 0.5);
    assert.equal(scaled[2], 1);
  });

  await t.test("deve padronizar para média ~ 0 com StandardScaler", () => {
    const scaled = standardScaler([10, 20, 30]);
    assert.ok(Math.abs(mean(scaled)) < 0.1);
  });
});

test("Modelagem e Avaliação (mlModels.js)", async (t) => {
  await t.test("deve ajustar uma regressão linear com R² próximo de 1.0 para dados lineares", () => {
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
      { x: 4, y: 8 }
    ];
    const res = fitPolynomialRegression(points, 1);
    assert.ok(res.r2 > 0.98);
  });

  await t.test("deve calcular a Matriz de Confusão e métricas corretamente", () => {
    const samples = [
      { actual: 1, score: 0.9 }, // TP
      { actual: 1, score: 0.8 }, // TP
      { actual: 0, score: 0.7 }, // FP
      { actual: 1, score: 0.2 }, // FN
      { actual: 0, score: 0.1 }  // TN
    ];
    const res = evaluateClassificationWithThreshold(samples, 0.5);
    assert.equal(res.tp, 2);
    assert.equal(res.fp, 1);
    assert.equal(res.fn, 1);
    assert.equal(res.tn, 1);
    assert.equal(res.accuracy, 0.6);
  });
});
