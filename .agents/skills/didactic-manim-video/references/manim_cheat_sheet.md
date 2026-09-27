# Guia Rápido de Referência do Manim Community

Este guia reúne as estruturas essenciais, mobjects, animações e boas práticas para a criação de clipes curtos e didáticos.

---

## 1. Estrutura Canônica de uma Cena

```python
from manim import *

class ConceitoDidatico(Scene):
    def construct(self):
        # 1. Configuração do ambiente ou eixos
        plane = NumberPlane(
            x_range=[-5, 5, 1],
            y_range=[-3, 3, 1],
            background_line_style={"stroke_opacity": 0.4}
        )
        
        # 2. Criação de objetos
        titulo = Text("Transformação Linear", font_size=32).to_edge(UP)
        vetor = Arrow(ORIGIN, [2, 1, 0], buff=0, color=BLUE)
        rotulo = Text("v = [2, 1]", font_size=20, color=BLUE).next_to(vetor.get_end(), UR, buff=0.1)
        
        # 3. Animações encadeadas (curtas e fluidas)
        self.play(FadeIn(plane), Write(titulo), run_time=1.0)
        self.play(GrowArrow(vetor), FadeIn(rotulo), run_time=1.0)
        self.wait(1.0)
        
        # 4. Transformação dinâmica
        vetor_transformado = Arrow(ORIGIN, [3, 2, 0], buff=0, color=TEAL)
        self.play(Transform(vetor, vetor_transformado), run_time=1.2)
        self.wait(1.5)
```

---

## 2. Tipos de Texto e Fórmulas: `MarkupText` (Recomendado) vs `Text` vs `MathTex`

| Classe | Dependência Externa | Quando Usar |
| :--- | :--- | :--- |
| **`MarkupText("<i>c</i><sub>1</sub> <b>u</b>")`** | Pango/Cairo (100% nativo) | **Recomendado para notação matemática e fórmulas.** Suporta subscritos (`<sub>`), sobrescritos (`<sup>`), itálicos (`<i>`), negritos (`<b>`) e cores sem precisar de LaTeX. |
| **`Text("Texto puro", font="sans-serif")`** | Pango/Cairo (100% nativo) | Rótulos simples sem subscritos ou formatações matemáticas mistas. |
| **`MathTex(r"\int_0^\infty e^{-x^2} dx")`** | Requer distribuição LaTeX (`latex`, `dvipng`) | Apenas quando o ambiente possuir LaTeX completo instalado no sistema operacional. |

> **Padrão Canônico do DataLab:** Sempre use `MarkupText` para expressões matemáticas com índices ou notação vetorial, por exemplo:
> `MarkupText("Combinação Linear: <i>c</i><sub>1</sub> <b>u</b> + <i>c</i><sub>2</sub> <b>v</b> = <b>w</b>", font_size=32)`
> Isso garante subscritos visualmente distintos, itálico em escalares e negrito em vetores sem risco de quebra por ausência de LaTeX.

---

## 3. Mobjects Geométricos Fundamentais

* **Pontos e Vetores:**
  * `Dot(point=[x, y, 0], radius=0.08, color=YELLOW)`
  * `Arrow(start=ORIGIN, end=[x, y, 0], buff=0, color=BLUE)`
  * `Line(start=[x1, y1, 0], end=[x2, y2, 0], stroke_width=3)`
* **Formas e Polígonos:**
  * `Circle(radius=1.5, color=RED, fill_opacity=0.2)`
  * `Square(side_length=2.0, color=GREEN)`
  * `Rectangle(width=4.0, height=2.0, color=PURPLE)`
  * `Polygon(*vertices, color=GOLD, fill_opacity=0.3)`
* **Sistemas de Coordenadas:**
  * `Axes(x_range=[-4, 4, 1], y_range=[-2, 2, 1], axis_config={"include_numbers": True})`
  * `NumberPlane()`: Malha completa para álgebra linear e cálculo.
  * `axes.plot(lambda x: x**2, x_range=[-2, 2], color=BLUE)`

---

## 4. Animações e Ritmo Didático

Para manter os vídeos **curtos, envolventes e leves** (5 a 15 segundos):

1. **Entrada:** `Create(mobject)`, `Write(text)`, `FadeIn(mobject)`, `GrowFromCenter(mobject)` (Duração típica: `0.8s` a `1.2s`).
2. **Transformação:** `Transform(origem, destino)`, `ReplacementTransform(...)` (Duração típica: `1.0s` a `1.5s`).
3. **Ênfase:** `Indicate(mobject)`, `Circumscribe(mobject)`, `Flash(point)` (Duração: `0.6s` a `0.8s`).
4. **Pausa Reflexiva:** Use `self.wait(1.0)` ou `self.wait(1.5)` no ponto culminante para o leitor absorver a ideia. Evite esperas mortas maiores que 2 segundos.
5. **Duração Total Recomendada:** 6 a 12 segundos para a maioria das demonstrações conceituais de um único fenômeno.

---

## 5. Paleta de Cores Recomendada (Alto Contraste)

* Fundo padrão do Manim é escuro (`#000000`).
* Cores contrastantes recomendadas:
  * Primária: `BLUE` ou `TEAL`
  * Destaque / Acento: `YELLOW` ou `GOLD`
  * Secundária / Comparação: `GREEN` ou `EMERALD`
  * Alerta / Diferença: `RED` ou `MAROON`
  * Neutros: `WHITE`, `LIGHT_GRAY`, `GRAY`
