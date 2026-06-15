# League Whiteboard - Plano de Projeto

## 1. Resumo do Projeto
O **League Whiteboard** será uma plataforma interativa (em formato de quadro branco digital) focada na explicação e simulação de **itemização em League of Legends**. 

### Objetivos Principais
*   **Visualização Dinâmica:** Permitir que jogadores criem conexões visuais entre campeões, itens, runas e seus respectivos atributos.
*   **Simulação de Status:** Exibir em tempo real as mudanças nos atributos (Vida, Dano, Armadura, Aceleração de Habilidade, etc.) com base nas escolhas de itens e runas.
*   **Comparação de Builds:** Facilitar o confronto direto entre duas ou mais construções de itens (ex: Build de Crítico vs Build de Letalidade) para avaliar eficiência de ouro, tempo para matar (TTK) e dano efetivo.
*   **Simulação de efeito/dano:** Simular dano físico e mágico em alvos com quantidades especificadas de armadura e resistência mágica, percentual de redução em cooldown de habilidades e redução da duração de controle de grupo conforme a tenacidade especificada.

---

## 2. Perguntas para Amadurecer a Ideia
Para definir o escopo inicial e a arquitetura técnica do projeto, precisamos responder às seguintes questões:

1.  **Público-Alvo Principal:**
    *   O foco inicial deve ser em jogadores iniciantes e intermediários (com explicações conceituais básicas de atributos e sinergias)?
    *   Ou o foco será em jogadores avançados e analistas (com foco em cálculos matemáticos precisos de DPS, curvas de escala de dano e micro-otimização de ouro)?

> Resposta: O foco é que a ferramenta sirva também para jogadores iniciantes/intermediários testarem builds, mas também principalmente permitir que jogadores experientes consigam de forma clara e intuitiva explicar uma itemização para outros jogadores, o foco aqui é facilitar o processo de docência.

2.  **Interface de Usuário (Design e UX):**
    *   Devemos adotar um estilo Canvas livre infinito (estilo Figma/Excalidraw/Miro), onde os usuários arrastam cartas de campeões e itens e desenham setas de explicação?
    *   Ou um formato estruturado baseado em colunas de comparação de builds e tabelas interativas seria mais claro e fácil de navegar?

> Resposta: Vamos usar um formato estruturado. Um exemplo de tela (e a primeira que será desenvolvida) é um placar, análogo ao placar canônico que aparece durante as partidas com cinco jogadores de cada lado, sendo possível colocar campeões nas posições (rotas) desejadas e atribuir itens a esses campeões. Antes de desenvolver o MVP, me lembre de criar exemplos de casos de uso que guiarão nosso desenvolvimento das funcionalidades.

3.  **Simulação Física de Combate:**
    *   Será necessário simular um "combate virtual" entre dois campeões (Campeão A atacando Campeão B) para ver a mitigação de dano real por armadura/resistência mágica?
    *   Ou apenas o cálculo bruto de status e passivas descritivas é suficiente para a primeira versão?

> Podemos trabalhar apenas com quantidades de dano e atributos de resistência, sem necessariamente ter um campeão vinculado.

4.  **Compartilhamento e Comunidade:**
    *   Os usuários poderão salvar seus quadros brancos localmente (no navegador via `localStorage`)?
    *   Ou devemos implementar um backend simples para salvar os quadros e gerar links compartilháveis (ex: `league-whiteboard.com/board/xyz`) para que criadores de conteúdo possam compartilhar guias de itemização?

> Vamos tomar a decisão mais fácil de voltar atrás no futuro se for necessário, será possível importar/exportar os cenários criados através de um arquivo JSON em um formato customizado.

5.  **Abrangência de Modos de Jogo:**
    *   O simulador cobrirá apenas o mapa tradicional (Summoner's Rift)?
    *   Ou incluirá também itens, atributos e modificadores específicos de modos alternativos como ARAM e Arena (que possuem preços e balanceamentos de atributos distintos)?

> Apenas o mapa tradicional Summoner's Rift

6.  **Idiomas (Internacionalização):**
    *   O projeto deve ser construído pensando em múltiplos idiomas (Pt-BR e En-US) desde a fundação? (A API de dados da Riot suporta isso nativamente).

> Sim

---

## 3. Pesquisa de Disponibilidade de Dados (Fontes da Riot Games)
Para alimentar o projeto com dados atualizados sobre campeões, itens, runas, preços e atributos, as seguintes fontes oficiais e comunitárias foram mapeadas:

### A. Riot Games Data Dragon (DDragon) - Oficial
O **Data Dragon** é o repositório de dados estáticos oficial da Riot Games. Ele **não requer chaves de API** para leitura de dados comuns e é atualizado a cada novo patch lançado.

*   **Identificação da Versão Atual:**
    Antes de buscar os dados, é preciso consultar a lista de patches para obter a versão mais recente (ex: `16.12.1`):
    `https://ddragon.leagueoflegends.com/api/versions.json`
*   **Base URL do CDN:**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/`

#### Endpoints de Dados (JSON):
*   **Campeões (Básico e Ícones):**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/data/en_US/champion.json` (ou `pt_BR/champion.json` para português).
*   **Detalhes do Campeão (Habilidades, Escalas e Passiva):**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/data/en_US/champion/{IdCampeao}.json` (ex: `Aatrox.json`).
*   **Itens (Atributos, Preços, Receitas, Tags e Descrições):**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/data/en_US/item.json`
*   **Runas Reforçadas (Caminhos, Slots e Atributos):**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/data/en_US/runesReforged.json`

#### Endpoints de Imagens (Ícones):
*   **Ícone do Campeão:**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/img/champion/{image.full}`
*   **Ícone do Item:**
    `https://ddragon.leagueoflegends.com/cdn/{versao}/img/item/{image.full}`
*   **Ícone da Runa:**
    `https://ddragon.leagueoflegends.com/cdn/img/{icon}` (o caminho da imagem é fornecido dentro do JSON de runas).

*   **Limitação do DDragon:** As descrições nos JSONs oficiais da Riot frequentemente contêm tags HTML de estilização não formatadas do jogo (ex: `<physicalDamage>`, `<scaleAP>`), exigindo um parser de texto para torná-las legíveis.

---

### B. Community Dragon (CDragon) - Alternativa Comunitária Recomendada
O **Community Dragon** é uma ferramenta mantida pela comunidade que extrai dados diretamente do cliente do jogo (incluindo o servidor de testes PBE). Ele é amplamente utilizado em projetos de terceiros devido à sua alta fidelidade e atualizações em tempo real.

*   **Endpoint Principal:** [https://raw.communitydragon.org/latest/](https://raw.communitydragon.org/latest/)
*   **Vantagens sobre o DDragon:**
    *   Contem dados específicos de modos como Arena (que muitas vezes não são bem documentados no DDragon).
    *   Fornece descrições de itens e campeões limpas de tags proprietárias do jogo ou pré-renderizadas de forma mais amigável.
    *   Disponibiliza novos assets visuais antes mesmo de serem publicados no CDN oficial do DDragon.

---

### C. Riot Games Developer API - Oficial (Tempo Real)
Para obter informações de partidas ao vivo, histórico de jogadores e taxas de vitória/escolha de itens reais, é necessário utilizar a API oficial.

*   **Portal do Desenvolvedor:** [https://developer.riotgames.com/](https://developer.riotgames.com/)
*   **Requisitos:** Exige o registro do projeto para obter uma chave de API (`RGAPI-xxx`), que possui limites de requisição rígidos (rate limiting).
*   **Necessidade no Projeto:** **Baixa/Nula para a fase inicial.** Uma vez que o *League Whiteboard* é um simulador estático focado em mecânicas de itemização e explicações visuais, os dados estáticos do DDragon e CDragon são perfeitamente suficientes e não possuem restrições de acesso por chaves ou limites de tráfego.

### D. Estratégia de Carregamento e Armazenamento (Recomendação)

Como os navegadores barram requisições `fetch` diretas ao Data Dragon/CDragon devido a políticas de **CORS** (falta de cabeçalhos `Access-Control-Allow-Origin` nos servidores da Riot), adotaremos uma estratégia híbrida extremamente eficiente e com custo de armazenamento praticamente **irrelevante**:

#### 1. Imagens e Ícones (Campeões, Itens e Runas)
*   **Armazenamento no Projeto:** **0 bytes**
*   **Estratégia:** Exibição via tags HTML `<img>` com `src` apontando diretamente para as URLs do CDN oficial da Riot (`ddragon.leagueoflegends.com/cdn/...`). As tags de imagem não são afetadas pelas restrições de CORS. O navegador do usuário fará o download das imagens sob demanda diretamente dos servidores da Riot (com excelente cache da própria Riot/Cloudflare).

#### 2. Dados e Atributos (Arquivos JSON)
Para ler e processar os atributos, receitas de itens e status dos campeões com JavaScript, precisamos fazer chamadas locais para evitar problemas de CORS. O tamanho desses arquivos é mínimo:

| Arquivo JSON | Conteúdo | Tamanho Original (Uncompressed) | Tamanho Compactado (Gzip/Brotli) |
| :--- | :--- | :--- | :--- |
| `champion.json` | Lista e status base de todos os ~160+ campeões | ~350 KB | ~50 KB |
| `item.json` | Todos os itens, receitas, custos e atributos | ~250 KB | ~40 KB |
| `runesReforged.json` | Caminhos, slots e runas | ~30 KB | ~5 KB |
| **Total (Por Idioma)** | **Dados fundamentais do simulador** | **~630 KB** | **~95 KB** |

*   **Estratégia:** Salvaremos esses arquivos JSON estáticos diretamente no diretório público do projeto (`public/data/pt_BR/` e `public/data/en_US/`). Eles serão carregados junto com a aplicação.
*   **Atualização de Patches:** Um script simples em Node.js (opcional) poderá ser rodado antes do deploy para baixar as novas versões do JSON sempre que houver atualização de patch de League of Legends, mantendo a aplicação sempre atualizada de forma automatizada.

---

## 4. Casos de Uso e Módulos do Sistema

Como o projeto seguirá o padrão "serverless" (100% executado no cliente, sem backend ativo), todas as regras de negócios, cálculos de simulação e armazenamento de dados serão feitos diretamente no navegador utilizando HTML5, CSS3, JavaScript/TypeScript e `localStorage`.

### Módulo 1: Placar (Scoreboard)
Uma representação interativa do placar clássico de League of Legends (tecla Tab do jogo).
*   **Funcionalidades:**
    *   **Estrutura de Times:** 5 campeões para o Time Azul e 5 campeões para o Time Vermelho organizados pelas rotas (Top, Jungle, Mid, ADC, Support).
    *   **Seleção Dinâmica:** O usuário pode clicar em qualquer slot e selecionar o Campeão correspondente da lista (com auto-complete rápido e ícone oficial).
    *   **Itemização Individual:** Cada campeão possui 6 slots de itens (+ 1 slot de sentinela/trinket). Ao selecionar um item, os atributos e o preço total da build são recalculados instantaneamente.
    *   **Controle Financeiro:** O painel exibe o custo de ouro acumulado por campeão e o ouro total de cada equipe, ajudando a demonstrar o impacto econômico de diferentes estratégias.

### Módulo 2: Simulador de Danos e Efeitos
Calculadora interativa de combate e redução de atributos focada em explicar o impacto de resistências e utilidade.
*   **Funcionalidades:**
    *   **Cálculo de Dano Efetivo:**
        *   **Entradas:** Valor bruto do dano e o tipo (Físico, Mágico ou Verdadeiro).
        *   **Alvo de Teste:** Configuração customizada de Armadura (para dano físico) e Resistência Mágica (para dano mágico).
        *   **Saída:** Exibição matemática do dano final sofrido após a mitigação pela fórmula padrão do League of Legends:
            $$\text{Dano Recebido} = \text{Dano Bruto} \times \left( \frac{100}{100 + \text{Resistência}} \right) \quad (\text{para Resistência} \ge 0)$$
    *   **Cálculo de Tenacidade e Duração de CC:**
        *   **Entradas:** Tempo de duração original do efeito de Controle de Grupo (CC) em segundos e a porcentagem de Tenacidade do alvo.
        *   **Saída:** Duração final do CC em segundos.
            $$\text{Duração Final} = \text{Duração Original} \times \left( 1 - \frac{\text{Tenacidade}}{100} \right)$$
    *   **Calculadora de Aceleração de Habilidade (Ability Haste):**
        *   **Entrada:** Quantidade de Aceleração de Habilidade (AH).
        *   **Saída:** Porcentagem exata de Redução de Tempo de Recarga (CDR) gerada.
            $$\text{CDR \%} = \left( 1 - \frac{100}{100 + \text{AH}} \right) \times 100$$

### Módulo 3: Runas (Rune Planner)
Interface visual interativa baseada no criador de runas oficial do cliente de League of Legends.
*   **Funcionalidades:**
    *   **Seleção de Árvores:** Escolha do caminho principal (Precisão, Dominação, Feitiçaria, Determinação ou Inspiração) e caminho secundário.
    *   **Interatividade:** Seleção de runas principais (Keystones), runas menores de cada linha e os três Shards de atributos (Ofensivo, Flex, Defensivo).
    *   **Persistência (Local Storage):** Salvamento automático local no navegador para que o usuário não perca suas combinações criadas ao atualizar ou reabrir a página.

### Módulo 4: Mapa Interativo
Uma visualização do mapa clássico de Summoner's Rift para ilustrar rotas, controle de visão e movimentação.
*   **Funcionalidades:**
    *   **Imagem Oficial Atualizada:** Exibição da versão mais recente do mapa Summoner's Rift.
    *   **Navegação Fluida:** Mecanismos de zoom suave (via roda do mouse / pinch-to-zoom) e arrasto (pan) para navegar pelo mapa de forma agradável e responsiva, implementados puramente no frontend.


