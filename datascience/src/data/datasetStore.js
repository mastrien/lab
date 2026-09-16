// Gerenciador central e reativo de datasets no navegador (LocalStorage)

import { SAMPLE_DATASETS } from "./datasets.js";

const ACTIVE_DATASET_KEY = "datalab_active_dataset_id";
const CUSTOM_DATASETS_KEY = "datalab_custom_datasets";

// Auxiliar para inferir tipos de colunas
export function inferColumnTypes(data, columns) {
  const types = {};
  columns.forEach(col => {
    let numericCount = 0;
    let totalValid = 0;
    data.forEach(row => {
      const val = row[col];
      if (val !== undefined && val !== null && val !== "") {
        totalValid++;
        if (!isNaN(Number(val))) numericCount++;
      }
    });
    types[col] = (totalValid > 0 && numericCount / totalValid > 0.8) ? "numeric" : "categorical";
  });
  return types;
}

// Parser de CSV puro em JavaScript
export function parseCSVString(text, filename = "dataset_custom.csv") {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return null;
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const rawHeaders = lines[0].split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ""));
  // Evitar cabeçalhos vazios
  const headers = rawHeaders.map((h, i) => h || `coluna_${i + 1}`);

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ""));
    const row = {};
    headers.forEach((h, idx) => {
      const val = values[idx];
      if (val === undefined || val === "") {
        row[h] = null;
      } else {
        const num = Number(val);
        row[h] = !isNaN(num) ? num : val;
      }
    });
    data.push(row);
  }

  const types = inferColumnTypes(data, headers);
  const numericColumns = headers.filter(h => types[h] === "numeric");
  const categoricalColumns = headers.filter(h => types[h] === "categorical");

  // Identificar candidata à coluna alvo
  let target = categoricalColumns[categoricalColumns.length - 1] || headers[headers.length - 1];

  return {
    id: "custom_" + Date.now(),
    name: filename.replace(/\.[^/.]+$/, ""),
    isCustom: true,
    columns: headers,
    numericColumns,
    categoricalColumns,
    types,
    target,
    data
  };
}

export function getCustomDatasets() {
  try {
    const raw = localStorage.getItem(CUSTOM_DATASETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Erro ao carregar datasets customizados:", e);
    return [];
  }
}

export function getAllDatasets() {
  const builtIn = Object.values(SAMPLE_DATASETS).map(d => {
    if (d.id === "supermarket") {
      return {
        ...d,
        isCustom: false,
        columns: ["transacao_id", "itens"],
        numericColumns: [],
        categoricalColumns: ["itens"]
      };
    }
    const types = d.types || inferColumnTypes(d.data, d.columns);
    return {
      ...d,
      isCustom: false,
      types,
      numericColumns: d.columns.filter(c => types[c] === "numeric"),
      categoricalColumns: d.columns.filter(c => types[c] === "categorical")
    };
  });

  const custom = getCustomDatasets();
  return [...builtIn, ...custom];
}

export function getActiveDataset() {
  const all = getAllDatasets();
  const activeId = localStorage.getItem(ACTIVE_DATASET_KEY) || "iris";
  const found = all.find(d => d.id === activeId);
  return found || all[0];
}

export function setActiveDataset(id) {
  localStorage.setItem(ACTIVE_DATASET_KEY, id);
  window.dispatchEvent(new CustomEvent("datalab:dataset-change", { detail: { id } }));
}

export function saveCustomDataset(datasetObj) {
  const custom = getCustomDatasets();
  const existingIndex = custom.findIndex(d => d.id === datasetObj.id);
  if (existingIndex >= 0) {
    custom[existingIndex] = datasetObj;
  } else {
    custom.push(datasetObj);
  }
  localStorage.setItem(CUSTOM_DATASETS_KEY, JSON.stringify(custom));
  setActiveDataset(datasetObj.id);
}

export function deleteCustomDataset(id) {
  const custom = getCustomDatasets().filter(d => d.id !== id);
  localStorage.setItem(CUSTOM_DATASETS_KEY, JSON.stringify(custom));
  const currentActive = localStorage.getItem(ACTIVE_DATASET_KEY);
  if (currentActive === id) {
    setActiveDataset("iris");
  } else {
    window.dispatchEvent(new CustomEvent("datalab:dataset-change", { detail: { id: "deleted" } }));
  }
}

export function onDatasetChange(callback) {
  const handler = (e) => callback(getActiveDataset(), e.detail);
  window.addEventListener("datalab:dataset-change", handler);
  return () => window.removeEventListener("datalab:dataset-change", handler);
}
