"""
xor_problem_scene.py - Animação didática Manim: O Problema do XOR e a Necessidade de Redes Multicamadas.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Versão aprimorada: ritmo calmo, pausas reflexivas generosas e retas estendidas cobrindo os pontos laranjas.
"""

from manim import *

class ProblemaXOR(Scene):
    def construct(self):
        # 1. Sistema cartesiano cobrindo amplamente o enquadramento 16:9
        grid = NumberPlane(
            x_range=[-0.7, 1.7, 1],
            y_range=[-0.7, 1.7, 1],
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
            "Perceptron Simples vs. Perceptron Multicamadas (MLP)",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 3. Os 4 pontos canônicos do XOR
        # Classe 0 (Azul): (0, 0) e (1, 1)
        # Classe 1 (Laranja): (1, 0) e (0, 1)
        p00 = grid.c2p(0, 0)
        p11 = grid.c2p(1, 1)
        p10 = grid.c2p(1, 0)
        p01 = grid.c2p(0, 1)

        dot00 = Dot(p00, radius=0.13, color=BLUE)
        dot11 = Dot(p11, radius=0.13, color=BLUE)
        dot10 = Dot(p10, radius=0.13, color=ORANGE)
        dot01 = Dot(p01, radius=0.13, color=ORANGE)

        lbl00 = MarkupText("(0,0) → 0", font_size=19, color=BLUE_B).next_to(p00, DL, buff=0.12)
        lbl11 = MarkupText("(1,1) → 0", font_size=19, color=BLUE_B).next_to(p11, UR, buff=0.12)
        lbl10 = MarkupText("(1,0) → 1", font_size=19, color=ORANGE).next_to(p10, DR, buff=0.12)
        lbl01 = MarkupText("(0,1) → 1", font_size=19, color=ORANGE).next_to(p01, UL, buff=0.12)

        # 4. Linhas de tentativa do Perceptron linear
        line_fail = Line(grid.c2p(-0.5, 0.5), grid.c2p(1.5, 0.5), color=RED, stroke_width=4.5)
        lbl_fail = MarkupText("Fronteira Linear Única: Inseparável (Máx. 75%)", font_size=20, color=RED).next_to(grid.c2p(0.5, 1.45), UP, buff=0.1)

        line_fail_v = Line(grid.c2p(0.5, -0.5), grid.c2p(0.5, 1.5), color=RED, stroke_width=4.5)
        line_fail_d = Line(grid.c2p(-0.3, -0.3), grid.c2p(1.4, 1.4), color=RED, stroke_width=4.5)

        # 5. Fronteira Não-Linear aprendida por MLP (2 retas combinadas estendidas generosamente)
        # Linha 1 (h1 - OR): x1 + x2 = 0.5 (descarta a origem (0,0))
        # Estendida de x1 = -0.65 (y = 1.15) até x1 = 1.15 (y = -0.65)
        # Ultrapassa com folga tanto (0,1) quanto (1,0)
        boundary_mlp1 = Line(grid.c2p(-0.65, 1.15), grid.c2p(1.15, -0.65), color=GREEN, stroke_width=4.5)
        lbl_h1 = MarkupText("<i>h</i><sub>1</sub> (OR)", font_size=17, color=GREEN).next_to(grid.c2p(1.15, -0.55), UR, buff=0.08)

        # Linha 2 (h2 - NAND): x1 + x2 = 1.5 (descarta o vértice (1,1))
        # Estendida de x1 = -0.15 (y = 1.65) até x1 = 1.65 (y = -0.15)
        boundary_mlp2 = Line(grid.c2p(-0.15, 1.65), grid.c2p(1.65, -0.15), color=GREEN, stroke_width=4.5)
        lbl_h2 = MarkupText("<i>h</i><sub>2</sub> (NAND)", font_size=17, color=GREEN).next_to(grid.c2p(1.5, 0.05), UR, buff=0.08)

        # Região sombreada convexa entre as duas retas
        polygon_fill = Polygon(
            grid.c2p(-0.65, 1.15),
            grid.c2p(1.15, -0.65),
            grid.c2p(1.65, -0.15),
            grid.c2p(-0.15, 1.65),
            color=YELLOW,
            fill_opacity=0.22,
            stroke_width=0
        )

        lbl_success = MarkupText("MLP (Camadas Ocultas): Separação Convexa (100%)", font_size=20, color=GREEN).next_to(grid.c2p(0.5, 1.45), UP, buff=0.1)

        # ==========================================
        # SEQUÊNCIA DE ANIMAÇÃO DIDÁTICA E CALMA
        # ==========================================

        # A. Apresentação inicial do espaço
        self.play(FadeIn(grid), Write(titulo), FadeIn(subtitulo), run_time=1.2)
        self.wait(1.0)

        # B. Marcação dos pontos da Classe 0 (Azul)
        self.play(FadeIn(dot00), FadeIn(lbl00), FadeIn(dot11), FadeIn(lbl11), run_time=1.2)
        self.wait(0.8)

        # C. Marcação dos pontos da Classe 1 (Laranja)
        self.play(FadeIn(dot10), FadeIn(lbl10), FadeIn(dot01), FadeIn(lbl01), run_time=1.2)
        self.wait(1.5)

        # D. Falha do Perceptron Linear Simples
        sub_linear = MarkupText("Tentativa 1: Hiperplano Rígido (Perceptron de Camada Única)", font_size=20, color=RED).next_to(titulo, DOWN, buff=0.12)
        self.play(Transform(subtitulo, sub_linear), run_time=0.8)
        self.wait(0.6)

        self.play(Create(line_fail), FadeIn(lbl_fail), run_time=1.2)
        self.wait(1.2)

        self.play(Transform(line_fail, line_fail_v), run_time=1.2)
        self.wait(1.0)

        self.play(Transform(line_fail, line_fail_d), run_time=1.2)
        self.wait(1.5)

        # E. Transição para o Perceptron Multicamadas
        self.play(FadeOut(line_fail), FadeOut(lbl_fail), run_time=0.8)
        sub_mlp = MarkupText("Solução MLP: Composição Não-Linear de 2 Fronteiras (OR + NAND)", font_size=20, color=GREEN).next_to(titulo, DOWN, buff=0.12)
        self.play(Transform(subtitulo, sub_mlp), run_time=0.8)
        self.wait(0.8)

        # F. Construção das retas estendidas e faixa convexa
        self.play(Create(boundary_mlp1), FadeIn(lbl_h1), run_time=1.3)
        self.wait(0.8)

        self.play(Create(boundary_mlp2), FadeIn(lbl_h2), run_time=1.3)
        self.wait(0.8)

        self.play(FadeIn(polygon_fill), FadeIn(lbl_success), run_time=1.5)
        
        # G. Pausa contemplativa final
        self.wait(3.5)
