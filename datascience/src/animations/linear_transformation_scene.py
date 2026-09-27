"""
linear_transformation_scene.py - Animação didática Manim de Transformação Linear 2D.
Otimizada: malha cartesiana expandida para preencher a tela 16:9 sem bordas pretas espessas,
e fontes ampliadas com alto contraste para leitura imediata em telas de alta ou baixa densidade.
Duração: ~8.5 segundos.
"""

from manim import *

class TransformacaoLinearMatricial(Scene):
    def construct(self):
        # 1. Grid cartesiano ocupando praticamente toda a tela 16:9 (13.8 x 6.8)
        grid = NumberPlane(
            x_range=[-5, 5, 1],
            y_range=[-3, 3, 1],
            x_length=13.8,
            y_length=6.8,
            background_line_style={"stroke_opacity": 0.35, "stroke_width": 1.5},
            axis_config={"stroke_width": 2, "color": GRAY_B}
        ).shift(DOWN * 0.2)

        # 2. Títulos com tipografia destacada
        titulo = Text("Transformação Linear: T(x) = A x", font_size=32, weight=BOLD, color=WHITE).to_edge(UP, buff=0.2)
        subtitulo = Text("A = [[1.5, 0.8], [0.4, 1.2]]   |   det(A) = 1.48", font_size=22, color=YELLOW).next_to(titulo, DOWN, buff=0.12)

        # 3. Quadrado unitário da base canônica
        quadrado = Polygon(
            grid.c2p(0, 0), grid.c2p(1, 0), grid.c2p(1, 1), grid.c2p(0, 1),
            color=YELLOW, fill_opacity=0.3, stroke_width=3
        )
        lbl_area = Text("Área = 1.0", font_size=20, weight=BOLD, color=YELLOW).move_to(grid.c2p(0.5, 0.5))

        # 4. Vetores canônicos i e j
        i_vec = Arrow(grid.c2p(0, 0), grid.c2p(1, 0), buff=0, color=BLUE, stroke_width=7, max_tip_length_to_length_ratio=0.25)
        j_vec = Arrow(grid.c2p(0, 0), grid.c2p(0, 1), buff=0, color=GREEN, stroke_width=7, max_tip_length_to_length_ratio=0.25)

        lbl_i = Text("î = (1, 0)", font_size=24, weight=BOLD, color=BLUE).next_to(i_vec.get_end(), DR, buff=0.12)
        lbl_j = Text("ĵ = (0, 1)", font_size=24, weight=BOLD, color=GREEN).next_to(j_vec.get_end(), UL, buff=0.12)

        # 5. Animação da base canônica inicial
        self.play(FadeIn(grid), Write(titulo), run_time=0.9)
        self.play(
            GrowArrow(i_vec), FadeIn(lbl_i),
            GrowArrow(j_vec), FadeIn(lbl_j),
            FadeIn(quadrado), FadeIn(lbl_area),
            run_time=1.1
        )
        self.wait(0.8)

        # 6. Definição da matriz A = [[1.5, 0.8], [0.4, 1.2]]
        mat_vals = [[1.5, 0.8], [0.4, 1.2]]

        # Vetores transformados T(i) = (1.5, 0.4) e T(j) = (0.8, 1.2)
        novo_i = Arrow(grid.c2p(0, 0), grid.c2p(1.5, 0.4), buff=0, color=BLUE, stroke_width=7, max_tip_length_to_length_ratio=0.25)
        novo_j = Arrow(grid.c2p(0, 0), grid.c2p(0.8, 1.2), buff=0, color=GREEN, stroke_width=7, max_tip_length_to_length_ratio=0.25)

        novo_lbl_i = Text("T(î) = (1.5, 0.4)", font_size=22, weight=BOLD, color=BLUE).next_to(novo_i.get_end(), DR, buff=0.12)
        novo_lbl_j = Text("T(ĵ) = (0.8, 1.2)", font_size=22, weight=BOLD, color=GREEN).next_to(novo_j.get_end(), UL, buff=0.12)

        # Paralelogramo transformado com nova área
        paralelogramo = Polygon(
            grid.c2p(0, 0), grid.c2p(1.5, 0.4), grid.c2p(2.3, 1.6), grid.c2p(0.8, 1.2),
            color=YELLOW, fill_opacity=0.38, stroke_width=3
        )
        novo_lbl_area = Text("Área = |det(A)| = 1.48", font_size=22, weight=BOLD, color=YELLOW).move_to(grid.c2p(1.15, 0.8))

        # 7. Executar a transformação do espaço
        self.play(
            FadeIn(subtitulo),
            grid.animate.apply_matrix(mat_vals),
            Transform(i_vec, novo_i),
            Transform(lbl_i, novo_lbl_i),
            Transform(j_vec, novo_j),
            Transform(lbl_j, novo_lbl_j),
            Transform(quadrado, paralelogramo),
            Transform(lbl_area, novo_lbl_area),
            run_time=2.4
        )
        self.wait(1.5)
