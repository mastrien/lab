# Estrutura Interna de um Arquivo DOCX (OpenXML)

Um arquivo `.docx` é, na verdade, um arquivo compactado (ZIP) que segue a especificação **Office Open XML (OOXML)**. Quando renomeado para `.zip` e extraído, revela um conjunto de pastas e arquivos XML organizados hierarquicamente.

---

## 1. Estrutura de Diretórios Global

Abaixo está o mapa de arquivos e diretórios padrão de um contêiner `.docx`:

```
meu_documento.docx (ZIP)
├── [Content_Types].xml           # Mapeamento global de tipos MIME (indispensável)
├── _rels/
│   └── .rels                     # Relacionamentos globais de nível de pacote
├── docProps/
│   ├── app.xml                   # Metadados da aplicação (páginas, palavras, etc.)
│   └── core.xml                  # Metadados principais (autor, data de criação, título)
└── word/
    ├── _rels/
    │   └── document.xml.rels     # Associa IDs de relacionamentos (rId) a recursos (imagens, cabeçalhos)
    ├── document.xml              # O corpo principal do documento (conteúdo textual e tabelas)
    ├── styles.xml                # Definição e propriedades de todos os estilos aplicados
    ├── numbering.xml             # Configuração de listas numeradas e com marcadores
    ├── fontTable.xml             # Tabela de fontes utilizadas e suas especificidades
    ├── settings.xml              # Configurações globais do documento (ex: zoom, compatibilidade)
    ├── header1.xml, header2.xml  # Conteúdo dos cabeçalhos das diferentes seções
    ├── footer1.xml, footer2.xml  # Conteúdo dos rodapés das diferentes seções
    ├── media/                    # Pasta que armazena os arquivos binários (imagens, vídeos)
    │   ├── image1.png
    │   └── image2.jpeg
    └── theme/
        └── theme1.xml            # Configuração do tema de design (cores, fontes primárias/secundárias)
```

---

## 2. Arquivos de Configuração Críticos

### A. `[Content_Types].xml`
Este arquivo é o primeiro a ser lido pelo leitor de DOCX. Ele atua como um manifesto indicando quais são os tipos de dados de cada arquivo dentro do ZIP. Sem ele, a aplicação host (ex: Microsoft Word) rejeita o arquivo como corrompido.
* Exemplo: mapeia a extensão `.xml` para o tipo de conteúdo do Word, `.png` para imagens, etc.

### B. `_rels/.rels` (Relacionamentos Globais)
Define o ponto de partida do pacote. Ele aponta para onde está localizado o documento principal (`word/document.xml`) usando a sintaxe de relacionamento OpenXML:
```xml
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
```

---

## 3. Estrutura da Pasta `word/` (O Payload)

### A. `word/document.xml`
Contém o texto visível do documento. A estrutura básica é hierárquica:
* **`w:body`**: O corpo principal.
  * **`w:p` (Paragraph)**: Um parágrafo de texto ou elemento de bloco.
    * **`w:pPr` (Paragraph Properties)**: Propriedades do parágrafo inteiro (alinhamento, recuo, espaçamento de linhas, estilo aplicado).
    * **`w:r` (Run)**: Uma sequência contígua de texto que compartilha a mesma formatação exata.
      * **`w:rPr` (Run Properties)**: Formatação do run (negrito, itálico, sublinhado, tamanho da fonte, cor, fonte).
      * **`w:t` (Text)**: O texto puro.
      * **`w:drawing`**: Imagem embutida ou elemento gráfico.
  * **`w:tbl` (Table)**: Uma tabela.
    * **`w:tr` (Table Row)**: Uma linha de tabela.
      * **`w:tc` (Table Cell)**: Uma célula, que internamente contém novos parágrafos (`w:p`).
  * **`w:sectPr` (Section Properties)**: Configuração geométrica da seção (margens, colunas, tamanho da página, orientação e referências de cabeçalho/rodapé). Ocorre no final de parágrafos que encerram uma seção, ou na raiz do corpo (`w:body`) para a seção final do documento.

### B. `word/styles.xml`
Armazena os estilos globais. Cada estilo possui um identificador único (`w:styleId`) e um nome de exibição (`w:name`).
* Ele define a árvore de herança através do elemento `<w:basedOn w:val="styleId"/>`.
* A formatação padrão do documento como um todo é definida em `<w:docDefaults>`.

### C. `word/_rels/document.xml.rels`
Mapeia os IDs locais do documento (`rId`) para os recursos físicos. 
* Se um run no documento contém uma imagem através de um `rId1`, este arquivo traduz que `rId1` aponta para `media/image1.png`.
* Da mesma forma, indica qual arquivo XML externo representa os cabeçalhos (`header1.xml`) e rodapés (`footer1.xml`).

---

## 4. O Fluxo de Herança de Estilo (Cascateamento)

Para determinar como um único caractere deve ser exibido, o processador DOCX avalia as seguintes camadas em ordem de prioridade (a primeira que definir a propriedade vence):

```
┌────────────────────────────────────────┐
│ 1. Formatação Direta do Run (w:r/w:rPr)│
└───────────────────┬────────────────────┘
                    ▼
┌────────────────────────────────────────┐
│ 2. Formatação do Parágrafo (w:p/w:rPr) │
└───────────────────┬────────────────────┘
                    ▼
┌────────────────────────────────────────┐
│ 3. Estilos de Caractere (styles.xml)   │
└───────────────────┬────────────────────┘
                    ▼
┌────────────────────────────────────────┐
│ 4. Estilos de Parágrafo (styles.xml)   │
└───────────────────┬────────────────────┘
                    ▼
┌────────────────────────────────────────┐
│ 5. Padrões do Documento (docDefaults)  │
└───────────────────┬────────────────────┘
                    ▼
┌────────────────────────────────────────┐
│ 6. Padrões da Aplicação (Built-in)     │
└────────────────────────────────────────┘
```

---

## 5. Diretrizes para o "Plano B" (Conversão Genérica)

A nossa abordagem atual tentou adivinhar o papel dos elementos baseado em buscas heurísticas diretas (regex para identificar seções, verificações ad-hoc de negrito e centralização). Isso a torna frágil e muito acoplada ao documento de exemplo.

Para um parser genérico, robusto e escalável (Plano B), devemos seguir estes pilares:

### A. Construir uma Árvore de Sintaxe Abstrata (AST) Intermediária
Em vez de traduzir diretamente de XML para HTML ou LaTeX, o parser deve:
1. Analisar o contêiner XML e traduzi-lo para uma estrutura neutra em formato JSON (uma AST).
2. Resolver todas as propriedades herdadas (como fontes, tamanhos e alinhamentos) e criar nós consolidados com estilos computados.

```
[XML DOCX] ──► [Parser & Resolução de Estilos] ──► [AST Neutra (JSON)]
                                                          │
                                         ┌────────────────┴────────────────┐
                                         ▼                                 ▼
                                 [Gerador HTML]                    [Gerador LaTeX]
```

### B. Mapeamento de Estilos Estruturais em Vez de Estilos Visuais
* Em vez de usar heurísticas visuais (ex: "se está centralizado e tem fonte grande, é um título"), o conversor deve respeitar o **nível de hierarquia** real (`w:outlineLvl` nas propriedades do estilo ou parágrafo, ou `w:pStyle` contendo cabeçalhos oficiais).
* Parágrafos que não possuem estilo explícito herdam o estilo `'Normal'`. Devem ser traduzidos estritamente como parágrafos padrão, a menos que marcados de outra forma pelo esquema de numeração ou tabelas.

### C. Geradores Desacoplados (Renderers)
* O gerador LaTeX e o renderizador HTML devem ser apenas consumidores da AST neutra.
* O gerador HTML aplica regras de CSS limpas, replicando a geometria da página sem acoplamento de classes fixas.
* O gerador LaTeX mapeia tags estruturais da AST (como listas, seções, tabelas e rodapés) para comandos padrão equivalentes do LaTeX (`\section`, `\begin{enumerate}`, `\begin{tabular}`), gerando um código enxuto e idiomático.
