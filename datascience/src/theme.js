// Gerenciamento de Tema Claro / Escuro com persistência local

const STORAGE_KEY = "datalab-theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem(STORAGE_KEY, "dark");
  }
  return !isDark;
}

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}
