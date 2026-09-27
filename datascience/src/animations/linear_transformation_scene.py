"""
linear_transformation_scene.py - Animação didática Manim de Transformação Linear 2D.
Demonstra a distorção da malha, a preservação do paralelismo e a transformação da base.
Duração: ~8.5 segundos.
"""

from manim import *

class TransformacaoLinearMatricial(Scene):
    def construct(self):
        # 1. Grid e Títulos
        grid = NumberPlane(
            x_range=[-4, 4, 1],
            y_range=[-3, 3, 1],
            x_length=8,
            y_length=6,
            background_line_style={"stroke_opacity": 0.3}
        )

        titulo = Text("Transformação Linear: T(x) = A x", font_size=24, color=WHITE).to_edge(UP)
        subtitulo = Text("A = [[1.5, 0.8], [0.4, 1.2]]   |   det(A) = 1.48", font_size=18, color=YELLOW).next_to(titulo, DOWN, buff=0.12)

        # 2. Quadrado unitário da base
        quadrado = Polygon(
            grid.c2p(0, 0), grid.c2p(1, 0), grid.c2p(1, 1), grid.c2p(0, 1),
            color=YELLOW, fill_opacity=0.25, stroke_width=2
        )
        lbl_area = Text("Área = 1.0", font_size=14, color=YELLOW).move_to(grid.c2p(0.5, 0.5))

        # 3. Vetores canônicos i e j
        i_vec = Arrow(grid.c2p(0, 0), grid.c2p(1, 0), buff=0, color=BLUE, stroke_width=5)
        j_vec = Arrow(grid.c2p(0, 0), grid.c2p(0, 1), buff=0, color=GREEN, stroke_width=5)

        lbl_i = Text("î = (1, 0)", font_size=15, color=BLUE).next_to(i_vec.get_end(), DR, buff=0.1)
        lbl_j = Text("ĵ = (0, 1)", font_size=15, color=GREEN).next_to(j_vec.get_end(), UL, buff=0.1)

        # 4. Animação da base canônica
        self.play(FadeIn(grid), Write(titulo), run_time=1.0)
        self.play(
            GrowArrow(i_vec), FadeIn(lbl_i),
            GrowArrow(j_vec), FadeIn(lbl_j),
            FadeIn(quadrado), FadeIn(lbl_area),
            run_time=1.2
        )
        self.wait(0.8)

        # 5. Definição da matriz A = [[1.5, 0.8], [0.4, 1.2]]
        mat_vals = [[1.5, 0.8], [0.4, 1.2]]

        # Vetores transformados T(i) = (1.5, 0.4) e T(j) = (0.8, 1.2)
        novo_i = Arrow(grid.c2p(0, 0), grid.c2p(1.5, 0.4), buff=0, color=BLUE, stroke_width=5)
        novo_j = Arrow(grid.c2p(0, 0), grid.c2p(0.8, 1.2), buff=0, color=GREEN, stroke_width=5)

        novo_lbl_i = Text("T(î) = (1.5, 0.4)", font_size=14, color=BLUE).next_to(novo_i.get_end(), DR, buff=0.1)
        novo_lbl_j = Text("T(ĵ) = (0.8, 1.2)", font_size=14, color=GREEN).next_to(novo_j.get_end(), UL, buff=0.1)

        # Paralelogramo transformado
        paralelogramo = Polygon(
            grid.c2p(0, 0), grid.c2p(1.5, 0.4), grid.c2p(2.3, 1.6), grid.c2p(0.8, 1.2),
            color=YELLOW, fill_opacity=0.35, stroke_width=2
        )
        novo_lbl_area = Text("Área = |det(A)| = 1.48", font_size=14, color=YELLOW).move_to(grid.c2p(1.15, 0.8))

        # 6. Executar a transformação do espaço
        self.play(
            FadeIn(subtitulo),
            grid.animate.apply_matrix(mat_vals),
            Transform(i_vec, novo_i),
            Transform(lbl_i, novo_lbl_i),
            Transform(j_vec, novo_j),
            Transform(lbl_j, novo_lbl_j),
            Transform(quadrado, paralelogramo),
            Transform(lbl_area, novo_lbl_area),
            run_time=2.5
        )
        self.wait(1.5)
