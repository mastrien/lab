// Implementação pura do Algoritmo Apriori para Mineração de Regras de Associação e Padrões Frequentes (KDD)

export function runApriori(transactions, minSupport = 0.2, minConfidence = 0.5) {
  const n = transactions.length;
  if (n === 0) return { frequentItemsets: [], rules: [], allItems: [] };

  // 1. Coletar todos os itens únicos
  const itemCounts = {};
  transactions.forEach(t => {
    const uniqueInTx = Array.from(new Set(t));
    uniqueInTx.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
  });

  const allItems = Object.keys(itemCounts).sort();

  // 2. Frequência de suporte para qualquer conjunto de itens
  function getSupport(itemset) {
    let count = 0;
    for (const t of transactions) {
      const set = new Set(t);
      if (itemset.every(item => set.has(item))) {
        count++;
      }
    }
    return count / n;
  }

  // 3. Itemsets de tamanho 1 que atendem ao minSupport
  let currentItemsets = allItems
    .map(item => [item])
    .filter(itemset => getSupport(itemset) >= minSupport);

  const allFrequentItemsets = [];
  currentItemsets.forEach(itemset => {
    allFrequentItemsets.push({
      items: itemset,
      support: Number(getSupport(itemset).toFixed(3)),
      count: Math.round(getSupport(itemset) * n)
    });
  });

  // 4. Gerar itemsets candidatos de tamanhos superiores (k=2, k=3...)
  let k = 2;
  while (currentItemsets.length > 0 && k <= 4) {
    const nextCandidates = [];
    const prevItems = currentItemsets.map(s => s.sort().join("|||"));

    for (let i = 0; i < currentItemsets.length; i++) {
      for (let j = i + 1; j < currentItemsets.length; j++) {
        const combined = Array.from(new Set([...currentItemsets[i], ...currentItemsets[j]])).sort();
        if (combined.length === k) {
          const key = combined.join("|||");
          if (!nextCandidates.some(c => c.join("|||") === key)) {
            nextCandidates.push(combined);
          }
        }
      }
    }

    const frequentK = [];
    for (const candidate of nextCandidates) {
      const supp = getSupport(candidate);
      if (supp >= minSupport) {
        frequentK.push(candidate);
        allFrequentItemsets.push({
          items: candidate,
          support: Number(supp.toFixed(3)),
          count: Math.round(supp * n)
        });
      }
    }

    currentItemsets = frequentK;
    k++;
  }

  // 5. Gerar Regras de Associação (X -> Y)
  const rules = [];

  for (const itemsetObj of allFrequentItemsets) {
    const items = itemsetObj.items;
    if (items.length >= 2) {
      // Gerar todos os subconjuntos não-vazios como antecedentes
      const subsets = getAllSubsets(items);
      for (const antecedent of subsets) {
        if (antecedent.length > 0 && antecedent.length < items.length) {
          const consequent = items.filter(item => !antecedent.includes(item));
          const suppXY = itemsetObj.support;
          const suppX = getSupport(antecedent);
          const suppY = getSupport(consequent);

          if (suppX > 0 && suppY > 0) {
            const confidence = suppXY / suppX;
            const lift = confidence / suppY;

            if (confidence >= minConfidence) {
              rules.push({
                antecedent,
                consequent,
                support: Number(suppXY.toFixed(3)),
                confidence: Number(confidence.toFixed(3)),
                lift: Number(lift.toFixed(3)),
                antecedentSupport: Number(suppX.toFixed(3)),
                consequentSupport: Number(suppY.toFixed(3))
              });
            }
          }
        }
      }
    }
  }

  // Ordenar regras por Lift descendente
  rules.sort((a, b) => b.lift - a.lift);

  return {
    frequentItemsets: allFrequentItemsets.sort((a, b) => b.support - a.support),
    rules,
    totalTransactions: n,
    allItems
  };
}

// Função auxiliar para gerar todos os subconjuntos de um array
function getAllSubsets(array) {
  const result = [[]];
  for (const value of array) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], value]);
    }
  }
  return result;
}

export const apriori = runApriori;
