"""
gradient_contour_scene.py - Animação didática Manim: Gradiente e Ortogonalidade às Curvas de Nível.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Duração: ~8 segundos.
"""

from manim import *
import numpy as np

class GradienteCurvasNivel(Scene):
    def construct(self):
        # 1. Sistema de coordenadas preenchendo a tela 16:9
        grid = NumberPlane(
            x_range=[-4.5, 4.5, 1],
            y_range=[-2.5, 2.5, 1],
            x_length=13.0,
            y_length=6.4,
            background_line_style={"stroke_opacity": 0.25, "stroke_width": 1.2},
            axis_config={"stroke_width": 2, "color": GRAY_B}
        ).shift(DOWN * 0.35)

        # 2. Título e subtítulo didáticos com MarkupText
        titulo = MarkupText(
            "O Vetor Gradiente: <b>∇</b><i>f</i>(<b>x</b>) ⊥ Curva de Nível",
            font_size=30,
            color=WHITE
        ).to_edge(UP, buff=0.22)

        subtitulo = MarkupText(
            "+<b>∇</b><i>f</i>: Direção de Maior Subida  |  −<b>∇</b><i>f</i>: Direção de Maior Descida",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 3. Desenhar curvas de nível elípticas concêntricas: f(x, y) = x^2 + 3 y^2 = c
        # a = sqrt(c), b = sqrt(c/3)
        levels = [0.8, 1.8, 3.2, 5.0, 7.2]
        ellipses = VGroup()
        for idx, c in enumerate(levels):
            a = np.sqrt(c)
            b = np.sqrt(c / 2.5)
            # Escalar para unidades do grid
            p_a = grid.c2p(a, 0)[0] - grid.c2p(0, 0)[0]
            p_b = grid.c2p(0, b)[1] - grid.c2p(0, 0)[1]
            ellipse = Ellipse(
                width=p_a * 2,
                height=p_b * 2,
                color=BLUE_D,
                stroke_width=2.0 + idx * 0.4,
                stroke_opacity=0.6 + idx * 0.08
            ).move_to(grid.c2p(0, 0))
            ellipses.add(ellipse)

        lbl_min = MarkupText("Mínimo (0,0)", font_size=18, color=GRAY_B).next_to(grid.c2p(0, 0), DOWN, buff=0.15)
        dot_min = Dot(grid.c2p(0, 0), radius=0.08, color=YELLOW)

        # 4. Ponto sobre a curva de nível média (c = 3.2)
        # x0 = 1.3, y0 = 0.77
        x0, y0 = 1.3, 0.77
        pt_pos = grid.c2p(x0, y0)
        dot_x0 = Dot(pt_pos, radius=0.1, color=WHITE)
        lbl_x0 = MarkupText("<b>x</b><sub>0</sub>", font_size=24, color=WHITE).next_to(pt_pos, UL, buff=0.1)

        # Gradiente em f(x, y) = x^2 + 2.5 y^2:
        # df/dx = 2x = 2.6, df/dy = 5y = 3.85
        # Vetor gradiente normalizado para visualização
        gx, gy = 2 * x0, 5 * y0
        norm_g = np.hypot(gx, gy)
        scale_arrow = 1.4
        arrow_dx = (gx / norm_g) * scale_arrow
        arrow_dy = (gy / norm_g) * scale_arrow

        # Reta tangente à curva de nível (ortogonal ao gradiente: tx = -dy, ty = dx)
        tx = -gy / norm_g * 1.5
        ty = gx / norm_g * 1.5
        tangente = Line(
            grid.c2p(x0 - tx, y0 - ty),
            grid.c2p(x0 + tx, y0 + ty),
            color=GRAY_A,
            stroke_width=3,
            stroke_opacity=0.8
        )
        lbl_tan = MarkupText("Reta Tangente", font_size=18, color=GRAY_A).next_to(tangente.get_start(), DR, buff=0.1)

        # Vetor Gradiente (+grad)
        grad_arrow = Arrow(
            pt_pos,
            grid.c2p(x0 + arrow_dx, y0 + arrow_dy),
            buff=0,
            color=GREEN,
            stroke_width=6,
            max_tip_length_to_length_ratio=0.25
        )
        lbl_grad = MarkupText("+<b>∇</b><i>f</i>(<b>x</b><sub>0</sub>)", font_size=22, color=GREEN).next_to(grad_arrow.get_end(), UR, buff=0.1)

        # Vetor Descida (-grad)
        neg_grad_arrow = Arrow(
            pt_pos,
            grid.c2p(x0 - arrow_dx, y0 - arrow_dy),
            buff=0,
            color=RED,
            stroke_width=6,
            max_tip_length_to_length_ratio=0.25
        )
        lbl_neg_grad = MarkupText("−<b>∇</b><i>f</i>(<b>x</b><sub>0</sub>)", font_size=22, color=RED).next_to(neg_grad_arrow.get_end(), DL, buff=0.1)

        # Ângulo reto simbolizando 90° entre tangente e gradiente
        angle_elbow = RightAngle(
            Line(pt_pos, grid.c2p(x0 + tx, y0 + ty)),
            Line(pt_pos, grid.c2p(x0 + arrow_dx, y0 + arrow_dy)),
            length=0.25,
            color=YELLOW,
            stroke_width=2
        )

        # 5. Sequência de Animação
        self.play(FadeIn(grid), Write(titulo), run_time=0.8)
        self.play(Create(ellipses), FadeIn(dot_min), FadeIn(lbl_min), run_time=1.2)
        self.wait(0.3)

        self.play(FadeIn(dot_x0), FadeIn(lbl_x0), Create(tangente), FadeIn(lbl_tan), run_time=1.0)
        self.play(FadeIn(angle_elbow), run_time=0.4)
        self.wait(0.3)

        self.play(GrowArrow(grad_arrow), FadeIn(lbl_grad), FadeIn(subtitulo), run_time=1.1)
        self.wait(0.5)

        self.play(GrowArrow(neg_grad_arrow), FadeIn(lbl_neg_grad), run_time=1.1)
        self.wait(1.5)
