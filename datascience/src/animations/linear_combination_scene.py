"""
linear_combination_scene.py - Animação didática Manim de Combinação Linear.
Demonstra vetores sendo escalados e somados ponta-com-cauda no espaço euclidiano R².
Duração: ~8 segundos.
"""

from manim import *

class CombinacaoLinear(Scene):
    def construct(self):
        # 1. Sistema de coordenadas e grid
        grid = NumberPlane(
            x_range=[-1, 7, 1],
            y_range=[-2, 4, 1],
            x_length=9,
            y_length=5.5,
            background_line_style={"stroke_opacity": 0.25}
        ).shift(DOWN * 0.3 + LEFT * 0.5)

        titulo = Text("Combinação Linear: c₁u + c₂v = w", font_size=24, color=WHITE).to_edge(UP)
        formula = Text("2 · (1, 1) + 1.5 · (2, -0.5) = (5, 1.25)", font_size=18, color=YELLOW).next_to(titulo, DOWN, buff=0.15)

        # 2. Vetores base u e v
        u_vec = Arrow(grid.c2p(0, 0), grid.c2p(1, 1), buff=0, color=BLUE, stroke_width=4)
        v_vec = Arrow(grid.c2p(0, 0), grid.c2p(2, -0.5), buff=0, color=GREEN, stroke_width=4)

        lbl_u = Text("u", font_size=16, color=BLUE).next_to(u_vec.get_end(), UP, buff=0.1)
        lbl_v = Text("v", font_size=16, color=GREEN).next_to(v_vec.get_end(), DOWN, buff=0.1)

        # 3. Animação de entrada
        self.play(FadeIn(grid), Write(titulo), run_time=1.0)
        self.play(GrowArrow(u_vec), FadeIn(lbl_u), GrowArrow(v_vec), FadeIn(lbl_v), run_time=1.0)
        self.wait(0.5)

        # 4. Escalonamento: 2u e 1.5v
        scaled_u = Arrow(grid.c2p(0, 0), grid.c2p(2, 2), buff=0, color=BLUE, stroke_width=5)
        scaled_v = Arrow(grid.c2p(0, 0), grid.c2p(3, -0.75), buff=0, color=GREEN, stroke_width=5)
        
        lbl_2u = Text("2u", font_size=16, color=BLUE).next_to(scaled_u.get_end(), UP, buff=0.1)
        lbl_15v = Text("1.5v", font_size=16, color=GREEN).next_to(scaled_v.get_end(), DOWN, buff=0.1)

        self.play(
            Transform(u_vec, scaled_u),
            Transform(lbl_u, lbl_2u),
            Transform(v_vec, scaled_v),
            Transform(lbl_v, lbl_15v),
            FadeIn(formula),
            run_time=1.5
        )
        self.wait(0.5)

        # 5. Translação ponta-com-cauda (adicionando 1.5v à ponta de 2u)
        translated_v = Arrow(grid.c2p(2, 2), grid.c2p(5, 1.25), buff=0, color=GREEN, stroke_width=4)
        lbl_shifted_v = Text("+ 1.5v", font_size=15, color=GREEN).next_to(translated_v.get_center(), UP, buff=0.15)

        self.play(
            Transform(v_vec, translated_v),
            Transform(lbl_v, lbl_shifted_v),
            run_time=1.4
        )

        # 6. Vetor resultante w
        w_vec = Arrow(grid.c2p(0, 0), grid.c2p(5, 1.25), buff=0, color=YELLOW, stroke_width=6)
        lbl_w = Text("w = (5, 1.25)", font_size=18, color=YELLOW).next_to(w_vec.get_end(), RIGHT, buff=0.15)

        self.play(GrowArrow(w_vec), FadeIn(lbl_w), run_time=1.2)
        self.play(Indicate(w_vec, color=GOLD), run_time=0.8)
        self.wait(1.5)
