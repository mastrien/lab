"""
linear_transformation_scene.py - Exemplo didático Manim de Transformação Linear 2D.
Demonstra a distorção do espaço e a transformação da base canônica por uma matriz de cisalhamento.
Duração aproximada: ~8 segundos.
"""

from manim import *

class TransformacaoLinear2D(Scene):
    def construct(self):
        # 1. Configurar malha cartesiana e título
        grid = NumberPlane(
            x_range=[-4, 4, 1],
            y_range=[-3, 3, 1],
            background_line_style={"stroke_opacity": 0.3}
        )
        
        titulo = Text("Transformação Linear: Cisalhamento (Shear)", font_size=26, color=WHITE).to_edge(UP)
        matriz_rotulo = Text("A = [[1, 1], [0, 1]]", font_size=20, color=YELLOW).next_to(titulo, DOWN, buff=0.2)

        # 2. Vetores da base canônica i e j
        i_hat = Arrow(ORIGIN, RIGHT, buff=0, color=BLUE, stroke_width=4)
        j_hat = Arrow(ORIGIN, UP, buff=0, color=GREEN, stroke_width=4)
        
        lbl_i = Text("î = (1, 0)", font_size=16, color=BLUE).next_to(i_hat.get_end(), DOWN, buff=0.15)
        lbl_j = Text("ĵ = (0, 1)", font_size=16, color=GREEN).next_to(j_hat.get_end(), LEFT, buff=0.15)

        # 3. Animação inicial
        self.play(FadeIn(grid), Write(titulo), Write(matriz_rotulo), run_time=1.0)
        self.play(GrowArrow(i_hat), FadeIn(lbl_i), GrowArrow(j_hat), FadeIn(lbl_j), run_time=1.0)
        self.wait(1.0)

        # 4. Transformação: x' = x + y, y' = y
        matrix = [[1, 1], [0, 1]]
        
        novo_i = Arrow(ORIGIN, RIGHT, buff=0, color=BLUE, stroke_width=4) # i permanece (1, 0)
        novo_j = Arrow(ORIGIN, [1, 1, 0], buff=0, color=GREEN, stroke_width=4) # j vai para (1, 1)
        novo_lbl_j = Text("T(ĵ) = (1, 1)", font_size=16, color=GREEN).next_to(novo_j.get_end(), UR, buff=0.15)

        self.play(
            grid.animate.apply_matrix(matrix),
            Transform(j_hat, novo_j),
            Transform(lbl_j, novo_lbl_j),
            run_time=2.0
        )
        self.wait(1.5)
