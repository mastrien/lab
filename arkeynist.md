# 🌌 Arkeynist - O Arcanista da Digitação

Bem-vindo ao **Arkeynist**, um sistema inovador que transforma qualquer texto (artigos, livros, códigos, letras de música ou conteúdos personalizados) em um treino interativo e altamente imersivo de digitação. 

O nome **Arkeynist** surge da fusão de *Arcane* (ligado ao místico, ao conhecimento antigo e à escrita de pergaminhos) com *Key* (tecla) e *Keyboardist* (digitador).

---

## 🔮 Visão Geral e Conceito

Diferente de plataformas tradicionais, o Arkeynist é um treino de digitação focado na escrita/leitura de longos textos. A ideia surgiu do conceito de ler textos enquanto pratica digitação, podendo treinar com seus livros e artigos favoritos. Todos os textos processados pelo sistema são salvos apenas localmente no seu navegador.

### Os Pilares do Arkeynist:
1. **Transmutação de Textos (Input Dinâmico):** O usuário pode colar qualquer texto, enviar um arquivo (.txt, .md, .pdf), inserir uma URL de artigo ou escolher de uma biblioteca curada de clássicos literários, poemas ou snippets de código de programação.
2. **Estética Minimalista:** Interface minimalista com cores de destaque customizáveis nas configurações. Possibilidade de alternar entre modo escuro/claro.
3. **Micro-interações Vivazes:** Efeitos visuais táteis ao digitar — sons táteis opcionais customizáveis de teclas mecânicas de alta qualidade ou cliques mágicos sutis.
4. **Gamificação com Propósito:** Medição clássica de **WPM** e **CPM** (Palavras por Minuto) e **Precisão**. O progresso no texto pode desbloquear elementos visuais, insígnias de alquimista ou novos "grimórios" (temas visuais). As estatísticas, como dias de treino em sequência (ofensiva), assim como as estatísticas de precisão e velocidade medidas nas últimas 100 palavras e nos últimos 10 segundos devem ser registradas e visíveis em uma tela de estatísticas.
5. **Gestão de textos:** Queremos possibilitar a leitura de livros e artigos longos enquanto o usuário digita, portanto é essencial que o usuário possa pausar a leitura, sair e voltar outro dia continuando de onde parou.

---

## 🛠️ Arquitetura e Funcionalidades Propostas

### 1. Tela Principal de Digitação
- **Painel de Texto:** Exibição elegante do texto a ser digitado, com diferenciação visual clara entre caracteres digitados corretamente, incorretos e o caractere atual (cor de destaque customizada para os caracteres corretos, opacidade menor para os caracteres ainda não digitados, mas mantendo-os visíveis).
- **Indicadores Dinâmicos:** Painel flutuante de estatísticas em tempo real (WPM, Acurácia e Progresso Total).

### 2. Mecanismo de Importação
- **Área de Conversão:** Campo inteligente onde o usuário joga um texto arbitrário e o sistema limpa caracteres problemáticos, formata parágrafos em blocos confortáveis e prepara a sessão de treino.

### 3. Registro (Estatísticas e Histórico)
- Histórico visual do desenvolvimento da velocidade e acurácia através de gráficos interativos e dinâmicos de linha do tempo.
- Conquistas e Títulos desbloqueáveis com base no volume de texto transmutado.

---

## 🎨 Identidade Visual e Estética (Diretrizes Premium)
- **Paleta de Cores Recomendada (Dark/Mystic Mode):**
  - **Fundo Primário:** Slate/Indigo Profundo (`#0f111a` ou HSL equivalente) para reduzir fadiga ocular.
  - **Texto Não Digitado:** Cinza-azulado fosco, de baixo contraste (`#4e5569`).
  - **Texto Digitado Correto:** Roxo-brilhante ou Verde-esmeralda suave (`#a78bfa` ou `#34d399`).
  - **Texto Digitado Incorreto:** Vermelho-coral vibrante (`#fb7185`).
  - **Destaques/Detalhes:** Ouro/Bronze envelhecido (`#fbbf24`) para bordas de botões, barras de progresso e runas de status.
- **Tipografia:** Uso de fontes geométricas e expressivas como *Outfit* ou *Cinzel* para cabeçalhos (estética arcana) e *JetBrains Mono* ou *Inter* para o corpo de digitação (legibilidade máxima).

---

## ❓ Perguntas para Refinamento e Amadurecimento da Ideia

Para moldar o **Arkeynist** no sistema ideal e definir o escopo tecnológico inicial, reflita e responda às perguntas abaixo. Elas ajudarão a guiar os próximos passos do desenvolvimento:

### 🚀 Escopo e Plataforma
1. **Qual será o ecossistema principal do Arkeynist nesta fase inicial?**
   - *Opção A:* Uma aplicação web moderna (Single Page Application com HTML/CSS/JS puros ou usando um framework como React/Vite/Next.js) rodando diretamente no navegador.

2. **Como você imagina o fluxo de armazenamento de dados e progresso?**
   - *Opção A:* Apenas local no navegador (`LocalStorage` / `IndexedDB`), focado em privacidade, velocidade e zero necessidade de servidores de banco de dados inicialmente (Esse projeto não prevê manter um banco de dados tão cedo, não queremos ter que lidar com dados sob direitos autorais salvos em bancos, como livros ou artigos, por isso esses materiais SEMPRE ficarão salvos APENAS localmente).

### 🎮 Experiência de Digitação e Mecânicas
3. **No modo de digitação de textos longos (como capítulos de livros), como o sistema deve gerenciar a visualização do texto?**

   - *Opção ESCOLHIDA: Customizável.* Deixe o usuário escolher entre as duas visualizações.

   - *Opção A: Linha Única Autoscroll.* Apenas uma ou duas linhas são mostradas, deslizando horizontalmente ou verticalmente conforme o usuário avança (estilo Monkeytype tradicional).
   - *Opção B: Modo Página Completa.* O texto é exibido em formato de parágrafos estruturados (como um leitor de e-book ou pergaminho completo), e a página desce suavemente conforme os parágrafos são concluídos.

4. **Como lidaremos com erros de digitação durante o treino?**

   - *Opção B: Fluxo livre com penalização.* O usuário pode continuar digitando mesmo errando, marcando as palavras subsequentes com erro até que ele decida voltar e corrigir, ou simplesmente aceitando a perda de acurácia no final da corrida. (Observação: o foco da aplicação é tornar a leitura uma experiência agradável para as pessoas que sentem prazer em digitar, de modo que possam ler enquanto digitam o que estão lendo, vamos registrar estatísticas de desempenho mas o conceito de "corrida" não é nosso foco aqui). Deixe o usuário escolher nas configurações o quão rigoroso será o marcador de respostas "certas" e "erradas", por exemplo se serão considerados sinais ou letras maiúsculas/minúsculas.

### 📚 Funcionalidades Adicionais e Diferenciais
5. **Gostaria de ter suporte nativo a uma biblioteca local pré-carregada de textos clássicos ou públicos?**
   - Se sim, que tipo de conteúdo você mais gostaria de ver (ex: clássicos da literatura mundial traduzidos, histórias de fantasia/sci-fi originais, documentação técnica de programação, poesias famosas)?

   Não. A biblioteca fica salva exclusivamente localmente e é construída pelo usuário.
