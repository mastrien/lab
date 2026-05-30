# Especificação Técnica - Arkeynist

O **Arkeynist** é uma aplicação web (Single Page Application) de treinamento de digitação focada na leitura e escrita de textos longos (como livros, artigos e códigos). O objetivo do sistema é permitir que o usuário pratique digitação enquanto lê conteúdos de seu interesse, com persistência de progresso e estatísticas de desempenho salvas localmente no navegador.

---

## 1. Diretrizes de Arquitetura e Fluxo de Dados

### 1.1 Persistência de Dados (Local-First)
- **Armazenamento:** 100% cliente-side. Não há banco de dados em nuvem ou API externa para armazenamento. Isso garante privacidade completa dos dados e conformidade técnica e jurídica em relação a conteúdos protegidos por direitos autorais (livros, PDFs e artigos importados pelo usuário).
- **Tecnologia de Armazenamento:**
  - **IndexedDB:** Utilizado para salvar os textos/livros importados de grande porte e o histórico detalhado de sessões de digitação (devido ao limite de 5MB do `localStorage`).
  - **LocalStorage:** Utilizado para salvar as configurações de interface do usuário (preferências de temas, fontes, volume de áudio e modo de exibição).
- **Biblioteca Curada:** Não há biblioteca pré-carregada hospedada. O usuário constrói sua própria biblioteca importando seus arquivos, PDFs e textos, que permanecem restritos ao armazenamento do seu navegador.

### 1.2 Gerenciamento e Sessão de Leitura/Digitação
- **Persistência de Progresso:** O sistema monitora o índice exato do caractere atual em que o usuário está no texto.
- **Retomada de Sessão:** Ao sair da aplicação e retornar, o usuário pode reabrir o texto e retomar a digitação exatamente a partir do caractere onde parou. O estado da sessão salva inclui:
  - Identificador único do texto.
  - Índice do caractere atual.
  - Estatísticas acumuladas daquele texto.

---

## 2. Requisitos Funcionais

### 2.1 Interface de Digitação (Playground)
- **Painel de Texto:** Exibição do bloco de texto ativo com as seguintes distinções visuais:
  - **Caracteres já digitados corretamente:** Cor de destaque customizável (opacidade 100%).
  - **Caracteres já digitados incorretamente:** Cor de erro em destaque (vermelho-coral ou similar).
  - **Cursor (Caret):** Cursor suave (smooth caret) com estilo customizável (linha vertical, bloco, sublinhado ou apenas piscante).
  - **Caracteres pendentes:** Opacidade reduzida em relação ao texto correto para manter o foco visual no caractere ativo.
- **Modos de Visualização (Customizável pelo Usuário):**
  - **Modo Autoscroll (Linha Única):** Exibe apenas 1 ou 2 linhas horizontalmente, centralizando o cursor e deslizando o texto conforme a digitação progride.
  - **Modo Página Completa (Parágrafos):** Exibe o texto formatado em parágrafos estruturados (similar a um leitor de e-book). A página avança/desce suavemente à medida que os blocos de parágrafo são concluídos.

### 2.2 Motor de Digitação e Validação de Erros
- **Fluxo Livre com Penalização:** O usuário não é travado ao cometer um erro. Ele pode continuar digitando a sequência de caracteres, sendo estes marcados como incorretos. O usuário tem a opção de usar `Backspace` para voltar e corrigir, ou prosseguir acumulando o erro nas estatísticas finais de precisão.
- **Configurações de Rigor (Strictness):** O usuário pode ligar ou desligar parâmetros de rigor no menu de opções:
  - **Ignorar Letras Maiúsculas/Minúsculas (Case Insensitivity):** Se ativo, pressionar `a` valida o caractere `A` do texto.
  - **Ignorar Pontuação/Sinais:** Se ativo, ignora caracteres especiais e pontuações no fluxo de validação.

### 2.3 Importação de Textos (Input)
- **Área de Texto Livre:** Campo simples para colagem manual de blocos de texto.
- **Upload de Arquivos:** Suporte à importação local de arquivos `.txt`, `.md` e `.pdf`.
  - *Extração de PDF:* A extração de texto de arquivos PDF deve ocorrer de forma 100% cliente-side (ex: utilizando a biblioteca `pdfjs-dist` no frontend para ler as páginas e concatenar o texto bruto), sem envio do arquivo para processamento externo.
- **Filtro de Processamento (Sanitização):** O importador deve limpar espaços em branco excessivos, quebras de linha desnecessárias e caracteres não suportados antes de persistir o texto no IndexedDB.

### 2.4 Estatísticas e Desempenho
O sistema monitora e calcula as seguintes métricas, divididas em tempo real e consolidadas:
- **Métricas em Tempo Real:**
  - **WPM (Words Per Minute) Geral:** Média de palavras por minuto desde o início do texto ativo.
  - **CPM (Characters Per Minute):** Caracteres digitados por minuto.
  - **Precisão (%):** Porcentagem de acertos em relação ao total de teclas pressionadas.
- **Métricas Curtas (Janela Deslizante):**
  - Desempenho (WPM e Precisão) medido especificamente nas **últimas 100 palavras** digitadas.
  - Desempenho medido nos **últimos 10 segundos** de atividade contínua.
- **Estatísticas de Engajamento:**
  - **Ofensiva (Streak):** Registro de dias consecutivos de treino.
- **Histórico e Gráficos:**
  - Gráfico de linha temporal pós-sessão detalhando a oscilação de velocidade (WPM) e erros ao longo do tempo.

---

## 3. Diretrizes de Design e Customização da UI

### 3.1 Estética Minimalista e Customizável
- **Foco Visual:** Todo o foco é direcionado para a tipografia e o contraste de cores. Elementos de UI não essenciais (barras de navegação, cabeçalhos, painéis de status) são ocultados ou minimizados durante a digitação ativa.
- **Interface Customizável:** O usuário tem controle direto de:
  - **Fontes:** Seleção de fontes limpas (ex: *Inter*, *System UI*) e fontes monoespaçadas com boa diferenciação de caracteres para treinos de código (ex: *JetBrains Mono*, *Fira Code*).
  - **Paleta de Cores (Temas):** Customização manual das cores de fundo, texto ativo, erro, texto não digitado e cursor.
  - **Sons de Feedback:** Efeitos táteis e personalizáveis de cliques de teclas mecânicas (com controle de volume ou opção de desativar).

---

## 4. Stack Tecnológico Proposto (SPA)

Para implementar esta arquitetura de forma enxuta e robusta, propõe-se:
1. **Frontend:** React.js com TypeScript e Vite. O TypeScript garante segurança de tipos nos modelos de dados complexos das sessões de texto e estatísticas.
2. **Estilização:** CSS nativo (Vanilla CSS) com variáveis CSS estruturadas para suportar a troca dinâmica de temas visuais e customizações de cores configuradas pelo usuário.
3. **Banco de Dados Local:** IndexedDB gerenciado via biblioteca `localForage` ou `Dexie.js` para simplificar transações assíncronas e estruturação das tabelas de livros/textos importados e histórico de sessões.
