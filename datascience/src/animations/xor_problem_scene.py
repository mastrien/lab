"""
xor_problem_scene.py - Animação didática Manim: O Problema do XOR e a Necessidade de Redes Multicamadas.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Duração: ~8 segundos.
"""

from manim import *

class ProblemaXOR(Scene):
    def construct(self):
        # 1. Sistema cartesiano preenchendo a tela 16:9
        grid = NumberPlane(
            x_range=[-0.6, 1.6, 1],
            y_range=[-0.6, 1.6, 1],
            x_length=13.0,
            y_length=6.4,
            background_line_style={"stroke_opacity": 0.25, "stroke_width": 1.2},
            axis_config={"stroke_width": 2, "color": GRAY_B}
        ).shift(DOWN * 0.35)

        # 2. Título e subtítulo com MarkupText
        titulo = MarkupText(
            "O Problema do XOR: <i>x</i><sub>1</sub> ⊕ <i>x</i><sub>2</sub> (Minsky &amp; Papert, 1969)",
            font_size=30,
            color=WHITE
        ).to_edge(UP, buff=0.22)

        subtitulo = MarkupText(
            "Perceptron Linear: Inseparável  |  MLP com Camada Oculta: Separação Perfeita",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 3. Os 4 pontos canônicos do XOR
        # Classe 0 (Azul): (0, 0) e (1, 1)
        # Classe 1 (Laranja/Amarelo): (1, 0) e (0, 1)
        p00 = grid.c2p(0, 0)
        p11 = grid.c2p(1, 1)
        p10 = grid.c2p(1, 0)
        p01 = grid.c2p(0, 1)

        dot00 = Dot(p00, radius=0.12, color=BLUE)
        dot11 = Dot(p11, radius=0.12, color=BLUE)
        dot10 = Dot(p10, radius=0.12, color=ORANGE)
        dot01 = Dot(p01, radius=0.12, color=ORANGE)

        lbl00 = MarkupText("(0,0) → 0", font_size=18, color=BLUE_B).next_to(p00, DL, buff=0.1)
        lbl11 = MarkupText("(1,1) → 0", font_size=18, color=BLUE_B).next_to(p11, UR, buff=0.1)
        lbl10 = MarkupText("(1,0) → 1", font_size=18, color=ORANGE).next_to(p10, DR, buff=0.1)
        lbl01 = MarkupText("(0,1) → 1", font_size=18, color=ORANGE).next_to(p01, UL, buff=0.1)

        # 4. Linha reta do Perceptron simples tentando separar
        line_fail1 = Line(grid.c2p(-0.4, 0.5), grid.c2p(1.5, 0.5), color=RED, stroke_width=4)
        lbl_fail = MarkupText("Fronteira Linear: Falha (Acurácia Máx. 75%)", font_size=20, color=RED).next_to(grid.c2p(0.5, 1.4), UP, buff=0.1)

        # Rotações de tentativa do perceptron linear
        line_fail2 = Line(grid.c2p(0.5, -0.4), grid.c2p(0.5, 1.5), color=RED, stroke_width=4)
        line_fail3 = Line(grid.c2p(-0.2, -0.2), grid.c2p(1.3, 1.3), color=RED, stroke_width=4)

        # 5. Fronteira Não-Linear aprendida por MLP (2 retas combinadas ou curva sigmoidal suave)
        # Região que isola (1,0) e (0,1)
        boundary_mlp1 = Line(grid.c2p(-0.2, 0.6), grid.c2p(0.6, -0.2), color=GREEN, stroke_width=4.5)
        boundary_mlp2 = Line(grid.c2p(0.4, 1.3), grid.c2p(1.3, 0.4), color=GREEN, stroke_width=4.5)
        lbl_success = MarkupText("MLP (Camada Oculta): Separação Convexa (100%)", font_size=20, color=GREEN).next_to(grid.c2p(0.5, 1.4), UP, buff=0.1)

        # Região sombreada entre as duas retas
        polygon_fill = Polygon(
            grid.c2p(-0.2, 0.6),
            grid.c2p(0.6, -0.2),
            grid.c2p(1.3, 0.4),
            grid.c2p(0.4, 1.3),
            color=YELLOW,
            fill_opacity=0.18,
            stroke_width=0
        )

        # Animação
        self.play(FadeIn(grid), Write(titulo), run_time=0.8)
        self.play(
            FadeIn(dot00), FadeIn(lbl00),
            FadeIn(dot11), FadeIn(lbl11),
            FadeIn(dot10), FadeIn(lbl10),
            FadeIn(dot01), FadeIn(lbl01),
            FadeIn(subtitulo),
            run_time=1.2
        )
        self.wait(0.4)

        # Tentativa linear falha
        self.play(Create(line_fail1), FadeIn(lbl_fail), run_time=0.8)
        self.play(Transform(line_fail1, line_fail2), run_time=0.6)
        self.play(Transform(line_fail1, line_fail3), run_time=0.6)
        self.wait(0.5)

        # Sucesso com MLP e camadas ocultas
        self.play(
            FadeOut(line_fail1),
            FadeOut(lbl_fail),
            Create(boundary_mlp1),
            Create(boundary_mlp2),
            FadeIn(polygon_fill),
            FadeIn(lbl_success),
            run_time=1.2
        )
        self.wait(1.5)
