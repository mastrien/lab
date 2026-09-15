// Módulo de Desafios & Quizzes Conceituais

import { QUIZZES } from "../../data/quizzes.js";

export function renderQuizzesView() {
  const container = document.createElement("div");
  container.className = "space-y-8 animate-fadeIn max-w-4xl mx-auto";

  const userAnswers = {}; // { questionId: selectedIndex }

  function render() {
    const answeredCount = Object.keys(userAnswers).length;
    let correctCount = 0;
    QUIZZES.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) correctCount++;
    });

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">🎓</span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border border-yellow-300/40 dark:border-yellow-800">
              Fixação Conceitual
            </span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Desafios & Quizzes Didáticos
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Teste sua intuição sobre KDD, overfitting, métricas e boas práticas de Ciência de Dados.
          </p>
        </div>

        <div class="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div class="text-right">
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pontuação</p>
            <p class="text-lg font-black text-indigo-600 dark:text-indigo-400">${correctCount} de ${QUIZZES.length}</p>
          </div>
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center font-bold text-indigo-600 text-sm">
            ${Math.round((correctCount / QUIZZES.length) * 100)}%
          </div>
        </div>
      </div>

      <!-- Lista de Perguntas -->
      <div class="space-y-6">
        ${QUIZZES.map((q, qIdx) => {
          const userSelected = userAnswers[q.id];
          const isAnswered = userSelected !== undefined;
          const isCorrect = userSelected === q.correctIndex;

          return `
            <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Questão ${qIdx + 1} • ${q.category}
                </span>
                ${isAnswered ? `
                  <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}">
                    ${isCorrect ? 'Correto! 🎉' : 'Incorreto ❌'}
                  </span>
                ` : ""}
              </div>

              <h3 class="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                ${q.question}
              </h3>

              <!-- Opções de Resposta -->
              <div class="space-y-2">
                ${q.options.map((opt, optIdx) => {
                  let optStyle = "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold ring-2 ring-emerald-500/20";
                    } else if (optIdx === userSelected && !isCorrect) {
                      optStyle = "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 line-through opacity-80";
                    } else {
                      optStyle = "opacity-50 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800";
                    }
                  }

                  return `
                    <button data-qid="${q.id}" data-opt="${optIdx}" ${isAnswered ? 'disabled' : ''} class="quiz-option-btn w-full text-left p-3.5 rounded-2xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${optStyle}">
                      <span class="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center font-bold text-[10px]">
                        ${String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>${opt}</span>
                    </button>
                  `;
                }).join("")}
              </div>

              <!-- Explicação Didática (Exibida após resposta) -->
              ${isAnswered ? `
                <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 text-xs space-y-1">
                  <p class="font-bold text-indigo-900 dark:text-indigo-300 uppercase text-[10px] tracking-wider">
                    💡 Explicação Pedagógica:
                  </p>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    ${q.explanation}
                  </p>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
    `;

    // Listeners das opções
    container.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.getAttribute("data-qid");
        const opt = Number(btn.getAttribute("data-opt"));
        userAnswers[qid] = opt;
        render();
      });
    });
  }

  render();
  return container;
}
