// Módulo de Exercícios & Quizzes Conceituais

import { QUIZZES } from "../../data/quizzes.js";
import { Icons } from "../../components/Icons.js";

export function renderQuizzesView() {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-fadeIn max-w-4xl mx-auto";

  const userAnswers = {};

  function render() {
    let correctCount = 0;
    QUIZZES.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) correctCount++;
    });

    container.innerHTML = `
      <!-- Cabeçalho -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-slate-700 dark:text-slate-300">${Icons.bookOpen("w-5 h-5")}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Avaliação Formativa
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Exercícios Conceituais
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Questões objetivas sobre metodologia KDD, trade-off viés-variância, métricas e integridade amostral.
          </p>
        </div>

        <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div class="text-right">
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Desempenho</p>
            <p class="text-base font-bold font-mono text-slate-900 dark:text-white">${correctCount} / ${QUIZZES.length}</p>
          </div>
          <div class="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
            ${Math.round((correctCount / QUIZZES.length) * 100)}%
          </div>
        </div>
      </div>

      <!-- Lista de Perguntas -->
      <div class="space-y-4">
        ${QUIZZES.map((q, qIdx) => {
          const userSelected = userAnswers[q.id];
          const isAnswered = userSelected !== undefined;
          const isCorrect = userSelected === q.correctIndex;

          return `
            <div class="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Questão ${qIdx + 1} • ${q.category}
                </span>
                ${isAnswered ? `
                  <span class="text-xs font-semibold px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}">
                    ${isCorrect ? 'Resposta Correta' : 'Resposta Incorreta'}
                  </span>
                ` : ""}
              </div>

              <h3 class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                ${q.question}
              </h3>

              <!-- Opções -->
              <div class="space-y-1.5">
                ${q.options.map((opt, optIdx) => {
                  let optStyle = "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 font-semibold";
                    } else if (optIdx === userSelected && !isCorrect) {
                      optStyle = "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700 opacity-80";
                    } else {
                      optStyle = "opacity-40 text-slate-400 border-slate-100 dark:border-slate-800";
                    }
                  }

                  return `
                    <button data-qid="${q.id}" data-opt="${optIdx}" ${isAnswered ? 'disabled' : ''} class="quiz-option-btn w-full text-left p-3 rounded-lg border text-xs leading-relaxed transition-colors flex items-start gap-2.5 ${optStyle}">
                      <span class="w-4 h-4 rounded border border-current shrink-0 flex items-center justify-center font-mono font-bold text-[10px] mt-0.5">
                        ${String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>${opt}</span>
                    </button>
                  `;
                }).join("")}
              </div>

              <!-- Justificativa Técnica -->
              ${isAnswered ? `
                <div class="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <p class="font-bold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wide">
                    Comentário Conceitual:
                  </p>
                  <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                    ${q.explanation}
                  </p>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
    `;

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
