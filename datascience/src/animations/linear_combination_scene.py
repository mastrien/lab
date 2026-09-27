"""
linear_combination_scene.py - Animação didática Manim de Combinação Linear.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização
tipográfica perfeita de subscritos e vetores sem depender de LaTeX externo.
Duração: ~8 segundos.
"""

from manim import *

class CombinacaoLinear(Scene):
    def construct(self):
        # 1. Sistema de coordenadas preenchendo a tela 16:9
        grid = NumberPlane(
            x_range=[-1, 6, 1],
            y_range=[-1.5, 3, 1],
            x_length=13.0,
            y_length=6.2,
            background_line_style={"stroke_opacity": 0.3, "stroke_width": 1.5},
            axis_config={"stroke_width": 2, "color": GRAY_B}
        ).shift(DOWN * 0.4 + LEFT * 0.8)

        # 2. Título e fórmula usando MarkupText com subscritos e itálicos reais
        titulo = MarkupText(
            "Combinação Linear: <i>c</i><sub>1</sub> <b>u</b> + <i>c</i><sub>2</sub> <b>v</b> = <b>w</b>",
            font_size=32,
            color=WHITE
        ).to_edge(UP, buff=0.2)
        
        formula = MarkupText(
            "2 · (1, 1) + 1.5 · (2, -0.5) = (5, 1.25)",
            font_size=24,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.15)

        # 3. Vetores base u e v com traço espesso e pontas visíveis
        u_vec = Arrow(grid.c2p(0, 0), grid.c2p(1, 1), buff=0, color=BLUE, stroke_width=6, max_tip_length_to_length_ratio=0.25)
        v_vec = Arrow(grid.c2p(0, 0), grid.c2p(2, -0.5), buff=0, color=GREEN, stroke_width=6, max_tip_length_to_length_ratio=0.25)

        lbl_u = MarkupText("<b>u</b>", font_size=26, color=BLUE).next_to(u_vec.get_end(), UL, buff=0.12)
        lbl_v = MarkupText("<b>v</b>", font_size=26, color=GREEN).next_to(v_vec.get_end(), DR, buff=0.12)

        # 4. Animação de entrada
        self.play(FadeIn(grid), Write(titulo), run_time=0.9)
        self.play(GrowArrow(u_vec), FadeIn(lbl_u), GrowArrow(v_vec), FadeIn(lbl_v), run_time=1.0)
        self.wait(0.5)

        # 5. Escalonamento: 2u e 1.5v
        scaled_u = Arrow(grid.c2p(0, 0), grid.c2p(2, 2), buff=0, color=BLUE, stroke_width=7, max_tip_length_to_length_ratio=0.2)
        scaled_v = Arrow(grid.c2p(0, 0), grid.c2p(3, -0.75), buff=0, color=GREEN, stroke_width=7, max_tip_length_to_length_ratio=0.2)
        
        lbl_2u = MarkupText("2<b>u</b>", font_size=26, color=BLUE).next_to(scaled_u.get_end(), UL, buff=0.12)
        lbl_15v = MarkupText("1.5<b>v</b>", font_size=26, color=GREEN).next_to(scaled_v.get_end(), DR, buff=0.12)

        self.play(
            Transform(u_vec, scaled_u),
            Transform(lbl_u, lbl_2u),
            Transform(v_vec, scaled_v),
            Transform(lbl_v, lbl_15v),
            FadeIn(formula),
            run_time=1.4
        )
        self.wait(0.5)

        # 6. Translação ponta-com-cauda (adicionando 1.5v à ponta de 2u)
        translated_v = Arrow(grid.c2p(2, 2), grid.c2p(5, 1.25), buff=0, color=GREEN, stroke_width=6, max_tip_length_to_length_ratio=0.2)
        lbl_shifted_v = MarkupText("+ 1.5<b>v</b>", font_size=24, color=GREEN).next_to(translated_v.get_center(), UP, buff=0.18)

        self.play(
            Transform(v_vec, translated_v),
            Transform(lbl_v, lbl_shifted_v),
            run_time=1.4
        )

        # 7. Vetor resultante w no espaço
        w_vec = Arrow(grid.c2p(0, 0), grid.c2p(5, 1.25), buff=0, color=YELLOW, stroke_width=8, max_tip_length_to_length_ratio=0.18)
        lbl_w = MarkupText("<b>w</b> = (5, 1.25)", font_size=26, color=YELLOW).next_to(w_vec.get_end(), RIGHT, buff=0.2)

        self.play(GrowArrow(w_vec), FadeIn(lbl_w), run_time=1.2)
        self.play(Indicate(w_vec, color=GOLD, scale_factor=1.1), run_time=0.8)
        self.wait(1.5)
