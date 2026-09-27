# Otimização de Vídeos Didáticos com FFmpeg para Web

Animações geradas pelo Manim contêm áreas sólidas, linhas nítidas e ausência de ruído fotográfico. Com os parâmetros corretos do FFmpeg, é possível reduzir o tamanho do arquivo em até **75% a 90%** sem degradação visual perceptível.

---

## 1. Comando Canônico de Otimização

```bash
ffmpeg -y -i video_bruto.mp4 \
  -c:v libx264 \
  -crf 26 \
  -preset medium \
  -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  video_otimizado.mp4
```

---

## 2. Decodificação dos Parâmetros

| Flag | Finalidade Técnica | Benefício no DataLab |
| :--- | :--- | :--- |
| **`-c:v libx264`** | Codificador de vídeo H.264 (AVC) | Compatibilidade com 100% dos navegadores (Desktop e Mobile). |
| **`-crf 26`** | *Constant Rate Factor* (taxa de qualidade visual constante) | Para gráficos vetoriais/matemáticos, CRF 26 mantém linhas perfeitas e texto legível gerando arquivos entre 200KB e 800KB. |
| **`-preset medium`** | Algoritmo de busca de redundância temporal | Excelente equilíbrio entre tempo de encode e eficiência de compressão. |
| **`-pix_fmt yuv420p`** | Amostragem de croma 4:2:0 em 8 bits | Obrigatório. Sem essa flag, o FFmpeg pode usar perfis avançados (ex: YUV444p) que telas de iPhones e navegadores legados não conseguem decodificar por hardware. |
| **`-an`** | Desativa canais de áudio (*No Audio*) | Elimina overhead de streams de áudio vazios ou mudos comuns em animações matemáticas. |
| **`-movflags +faststart`** | Reposiciona o átomo de metadados `moov` para o início do arquivo | Permite que o navegador inicie a reprodução instantânea antes mesmo de terminar o download do arquivo inteiro (Progressive Streaming). |

---

## 3. Redução de Taxa de Quadros (Opcional para Clipes Estáticos)

Se a animação for primordialmente composta por transições lineares lentas, forçar 24 ou 30 fps reduz ainda mais o tamanho sem prejuízo:

```bash
ffmpeg -i input.mp4 -r 24 -c:v libx264 -crf 27 -pix_fmt yuv420p -an -movflags +faststart output.mp4
```

---

## 4. Tabela de Comparação de Tamanhos Típicos

| Duração | Resolução / FPS | Tamanho Bruto (Manim) | Tamanho Otimizado (FFmpeg) | Economia |
| :---: | :---: | :---: | :---: | :---: |
| 6 segundos | 720p @ 30fps | ~2.8 MB | ~350 KB | **87.5%** |
| 10 segundos | 720p @ 30fps | ~5.2 MB | ~620 KB | **88.1%** |
| 15 segundos | 720p @ 30fps | ~8.4 MB | ~980 KB | **88.3%** |
| 8 segundos | 480p @ 15fps | ~1.5 MB | ~180 KB | **88.0%** |
