// Utilitário de renderização matemática KaTeX client-side

export function renderMath(element) {
  if (!element) return;

  function doRender() {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false,
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
        });
      } catch (err) {
        console.warn("Falha ao renderizar fórmulas KaTeX:", err);
      }
    }
  }

  if (window.renderMathInElement) {
    doRender();
  } else {
    // Caso KaTeX ainda esteja sendo carregado pelo navegador
    const interval = setInterval(() => {
      if (window.renderMathInElement) {
        clearInterval(interval);
        doRender();
      }
    }, 50);

    // Timeout de segurança (máximo 5 segundos de espera)
    setTimeout(() => clearInterval(interval), 5000);
  }
}
