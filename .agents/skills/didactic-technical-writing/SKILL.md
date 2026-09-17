---
name: didactic-technical-writing
description: >-
  Guia metodológico e procedural para redação de capítulos didáticos, materiais científicos,
  notação matemática em LaTeX (KaTeX), validação de fontes canônicas e componentes interativos no ecossistema DataLab.
  Ative esta skill ao redigir, expandir ou revisar capítulos, eixos temáticos ou artigos técnicos.
---

# Didactic Technical Writing (Guia Canônico de Redação Técnica e Didática)

Esta skill estabelece o fluxo de trabalho obrigatório e as diretrizes pedagógicas, técnicas e estruturais para a produção e revisão de capítulos, artigos científicos e documentação técnica no ecossistema do laboratório.

---

## 1. Estrutura Canônica de um Capítulo

Cada capítulo estruturado da plataforma deve seguir rigorosamente as seguintes seções semânticas:

1. **Cabeçalho & Breadcrumbs:**
   - Identificação do Eixo Temático (ex: *Eixo 1 — Fundamentos Matemáticos e Estatísticos*).
   - Identificação do Capítulo e Título (ex: *Capítulo 1.5 — Teorema Central do Limite*).
   - Subtítulo conceitual claro e objetivo que resume a tese central.

2. **Origem Epistemológica e Contexto Histórico:**
   - **Por que surgiu:** Qual problema prático, científico ou observacional motivou o desenvolvimento da técnica.
   - **Quem e quando:** Cientistas, matemáticos ou pesquisadores pioneiros, com o ano exato da formulação.
   - **Obras seminais:** Citação da publicação original com links canônicos e perenes (Internet Archive, EuDML, Gallica, Open Library).

3. **Fundamentação Teórica e Formulação Matemática:**
   - **Intuição Prévia no Fluxo Principal:**
     * Sempre apresentar analogias tangíveis do mundo real (ex: dados, moedas, tempos de atendimento, medições físicas) antes de apresentar fórmulas matemáticas.
     * A intuição didática deve permanecer no **fluxo contínuo do texto principal** como parágrafos normais, **sem** encapsulamento em blockquotes ou caixas separadas.
   - **Decodificação de Termos em Blockquote Identificado:**
     * Imediatamente após ou junto às formulações formais, incluir um blockquote com identificação visual destacada (ex: borda lateral `border-l-4 border-teal-500` e cabeçalho formal como `Decodificação de Notação e Termos:`).
     * Explicar termo a termo cada componente matemático ($X_i, \mathbb{E}[X], \operatorname{Var}(X), \sigma, \bar{X}_n, Z_n$).
     * Isso assegura que o leitor possa consultar a notação a qualquer momento sem confundi-la com a narrativa principal.
   - **Glossário Interativo e Dicas Flutuantes (`termHint`):**
     * Termos técnicos que pertençam a outras áreas ou cuja explicação completa sobrecarregaria o texto devem receber a marcação `termHint("id-do-termo")`.
   - **Notação KaTeX Segura:**
     * Formulação rigorosa delimitada por `$$ ... $$` para blocos e `$ ... $` para inline.

4. **Exemplificação e Aplicações no Mundo Real:**
   - Casos reais de uso em Ciência de Dados, Engenharia de Software ou Machine Learning (ex: Testes A/B, convergência de gradiente estocástico, intervalos de confiança).
   - Interpretação prática das premissas e limitações (ex: amostras pequenas, distribuições com cauda pesada sem variância finita).

5. **Referências Bibliográficas Canônicas:**
   - Referências completas no padrão ABNT/APA.
   - Todos os links externos devem ser canônicos e com verificação prévia de status HTTP 200.

6. **Laboratório Interativo Integrado:**
   - Bancada experimental modular (simulador) embutida ao final do texto, permitindo ao leitor manipular parâmetros e comprovar empiricamente a teoria exposta.

---

## 2. Regras de Notação Matemática & KaTeX em JavaScript

Ao escrever templates JavaScript (strings delimitadas por backticks `` ` ``):

1. **Escape de Contrabarra Dupla Obrigatório (`\\`):**
   - O compilador JavaScript interpreta `\x` em template strings como sequência de escape hexadecimal. O uso de barras simples como `\xrightarrow` causará um `SyntaxError: Invalid hexadecimal escape sequence` irrecuperável que impede a aplicação de carregar.
   - Sempre use barra dupla em **todos** os comandos KaTeX dentro de templates JS:
     * `\\mathbb{E}`, `\\mathbb{R}`, `\\mathbb{P}`
     * `\\operatorname{Var}`, `\\operatorname{Cov}`
     * `\\frac{a}{b}`, `\\sqrt{n}`, `\\sum_{i=1}^n`, `\\int`
     * `\\sigma`, `\\mu`, `\\alpha`, `\\epsilon`
     * `\\xrightarrow{d}`, `\\xrightarrow{P}`, `\\xrightarrow{q.c.}`
     * `\\mathcal{N}(\\mu, \\sigma^2)`

2. **Delimitação Estrita:**
   - Fórmulas inline: `$ ... $`
   - Fórmulas de destaque (bloco): `$$ ... $$`
   - Nunca deixe termos matemáticos (como `\mu` ou `\sigma^2`) sem delimitadores `$`, inclusive em tooltips, títulos ou notas explicativas.

3. **Renderização Dinâmica:**
   - Sempre invoque `renderMath(containerElement)` após a injeção do HTML no DOM.

---

## 3. Glossário Interativo e Notas Conceituais (`termHint`)

Para termos técnicos específicos que requerem clarificação rápida sem desviar o foco da leitura principal:

```javascript
import { termHint, initGlossaryTooltips } from "../../components/GlossaryTooltip.js";

// No template HTML do artigo:
`O teorema assume uma sequência de variáveis ${termHint("iid")} com média finita...`

// Ao renderizar o container do capítulo:
setTimeout(() => {
  renderMath(articleEl);
  initGlossaryTooltips(articleEl);
}, 10);
```

### Regras do Glossário:
- Todo termo deve ter uma entrada registrada no dicionário de `GlossaryTooltip.js`.
- A entrada deve possuir:
  * `term`: Nome amigável.
  * `notation`: Fórmula matemática resumida (com delimitadores e barras duplas).
  * `title`: Título formal da nota.
  * `definition`: Definição conceitual precisa com KaTeX compilável.
  * `intuition`: Exemplo didático do dia a dia ou analogia intuitiva.
- A função `initGlossaryTooltips` deve invocar `renderMath(tooltipEl)` para que qualquer notação matemática dentro dos tooltips seja renderizada instantaneamente.

---

## 4. Integridade de Fontes e Links Canônicos

1. **Validação Prévia de Status HTTP:**
   - Nunca invente links, DOIs não testados ou links protegidos por paywall/login com retorno HTTP 403.
   - Sempre utilize fontes de acesso público permanente:
     * Internet Archive (`archive.org/details/...`)
     * Open Library (`openlibrary.org/books/...`)
     * EuDML (`eudml.org/doc/...`)
     * Gallica / BnF (`gallica.bnf.fr`)
     * Repositórios de pré-prints abertos (arXiv, PubMed Central)
2. **Links Internos da SPA:**
   - Devem utilizar rotas registradas na aplicação (ex: `#tracking`, `#catalogo`, `#lab`).

---

## 5. Pureza de Sintaxe e Semântica Web

- **HTML Puro em Templates JS:** Não misture sintaxe de Markdown (como `*texto*` ou `**negrito**`) em strings injetadas via `innerHTML`. Use exclusivamente as tags semânticas `<em>` e `<strong>`.
- **Tipografia e Cores:**
  * Paleta neutra (zinc / slate) respeitando temas claro e escuro (`dark:`).
  * Sem gradientes chamativos, sem emojis decorativos em títulos e botões, sem bordas em formato de pílula (`rounded-full` em botões de ação).
- **Sumário Lateral (TOC):**
  * Fundo transparente (`bg-transparent`).
  * Ocultar ícones redundantes de navegação na versão desktop.
  * Fixação inteligente via CSS `sticky top-24 self-start` para acompanhar a leitura confortavelmente.

---

## 6. Checklist de Qualidade Antes da Publicação

Antes de submeter ou finalizar qualquer capítulo ou artigo:

- [ ] **Contexto Histórico:** Consta quem criou, quando e qual problema prático originou a formulação?
- [ ] **Intuição no Fluxo Principal:** A analogia/intuição concreta está presente como texto normal contínuo (sem blockquotes)?
- [ ] **Decodificação de Termos:** A explicação termo a termo dos símbolos matemáticos está em um blockquote identificado com cabeçalho destacado?
- [ ] **Escape KaTeX:** Todas as barras invertidas em templates JS estão duplicadas (`\\`)? Nenhum `\x` isolado?
- [ ] **Delimitadores KaTeX:** Todas as notações matemáticas (incluindo variáveis soltas em tooltips) estão entre `$ ... $` ou `$$ ... $$`?
- [ ] **Tooltips Interativos:** Os termos técnicos complementares usam `termHint()` e são compilados pelo KaTeX?
- [ ] **Sem Markdown em HTML:** As marcações de ênfase utilizam `<em>` e `<strong>` em vez de asteriscos?
- [ ] **Links Verificados:** Todos os links externos retornam status 200 e estão operacionais?
- [ ] **TOC Responsivo:** O sumário lateral tem fundo transparente e posição `sticky` sem poluição visual?
- [ ] **Validação de Testes:** A suíte de sintaxe e renderização (`node tests/check_syntax.js && node tests/render.node.test.js`) foi executada com 100% de sucesso?
