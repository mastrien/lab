"""
gradient_descent_scene.py - Animação didática Manim: Trajetória da Descida de Gradiente.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Duração: ~8 segundos.
"""

from manim import *
import numpy as np

class DescidaGradiente(Scene):
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

        # 2. Título e fórmula com MarkupText
        titulo = MarkupText(
            "Descida de Gradiente: <b>w</b><sub><i>t</i>+1</sub> = <b>w</b><sub><i>t</i></sub> − <i>α</i> <b>∇</b><i>L</i>(<b>w</b><sub><i>t</i></sub>)",
            font_size=30,
            color=WHITE
        ).to_edge(UP, buff=0.22)

        formula_step = MarkupText(
            "Passo iterativo na direção oposta ao gradiente local",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 3. Curvas de nível da função de perda L(w1, w2) = 0.5 * (w1^2 + 4 w2^2)
        levels = [0.4, 1.2, 2.5, 4.2, 6.5]
        ellipses = VGroup()
        for idx, c in enumerate(levels):
            a = np.sqrt(2 * c)
            b = np.sqrt(2 * c / 4.0)
            p_a = grid.c2p(a, 0)[0] - grid.c2p(0, 0)[0]
            p_b = grid.c2p(0, b)[1] - grid.c2p(0, 0)[1]
            ellipse = Ellipse(
                width=p_a * 2,
                height=p_b * 2,
                color=TEAL_E,
                stroke_width=2.0 + idx * 0.4,
                stroke_opacity=0.55 + idx * 0.08
            ).move_to(grid.c2p(0, 0))
            ellipses.add(ellipse)

        dot_min = Dot(grid.c2p(0, 0), radius=0.08, color=YELLOW)
        lbl_min = MarkupText("Mínimo Global <b>w</b>*", font_size=18, color=YELLOW).next_to(dot_min, DOWN, buff=0.15)

        # 4. Trajetória com passos discretos: w0 -> w1 -> w2 -> w3 -> w4
        # L(w1, w2) = 0.5 * (w1^2 + 4 w2^2)
        # grad = (w1, 4 w2)
        # alpha = 0.35
        # w_next = (w1 - 0.35 * w1, w2 - 0.35 * 4 * w2) = (0.65 w1, -0.4 w2)
        pts = [
            (-3.2, 1.6),
            (-2.08, -0.64),
            (-1.35, 0.26),
            (-0.88, -0.10),
            (-0.57, 0.04),
            (-0.37, -0.02),
            (-0.15, 0.0)
        ]

        # 5. Sequência de Animação
        self.play(FadeIn(grid), Write(titulo), run_time=0.8)
        self.play(Create(ellipses), FadeIn(dot_min), FadeIn(lbl_min), FadeIn(formula_step), run_time=1.1)

        # Criar ponto inicial w0
        w0_pos = grid.c2p(pts[0][0], pts[0][1])
        tracer_dot = Dot(w0_pos, radius=0.1, color=ROSE_D if hasattr(self, 'ROSE_D') else RED)
        lbl_w0 = MarkupText("<b>w</b><sub>0</sub>", font_size=22, color=RED).next_to(w0_pos, UL, buff=0.1)

        self.play(FadeIn(tracer_dot), FadeIn(lbl_w0), run_time=0.7)
        self.wait(0.3)

        # Passo a passo da descida com setas e segmentos
        last_pos = w0_pos
        for step_idx in range(1, len(pts)):
            next_coord = pts[step_idx]
            next_pos = grid.c2p(next_coord[0], next_coord[1])

            step_arrow = Arrow(
                last_pos,
                next_pos,
                buff=0,
                color=RED if step_idx == 1 else ORANGE,
                stroke_width=5 if step_idx <= 2 else 3.5,
                max_tip_length_to_length_ratio=0.25
            )

            # Rótulo de passo
            step_lbl = MarkupText(
                f"<b>w</b><sub>{step_idx}</sub>",
                font_size=18,
                color=ORANGE
            ).next_to(next_pos, UP if next_coord[1] >= 0 else DOWN, buff=0.1)

            step_text = MarkupText(
                f"Iteração <i>t</i> = {step_idx}: ||<b>∇</b><i>L</i>|| decrescendo",
                font_size=20,
                color=YELLOW
            ).next_to(titulo, DOWN, buff=0.12)

            self.play(
                GrowArrow(step_arrow),
                tracer_dot.animate.move_to(next_pos),
                FadeIn(step_lbl),
                Transform(formula_step, step_text),
                run_time=0.75
            )
            last_pos = next_pos

        final_text = MarkupText(
            "Convergência alcançada no ponto ótimo <b>w</b>*!",
            font_size=20,
            color=GREEN
        ).next_to(titulo, DOWN, buff=0.12)

        self.play(Transform(formula_step, final_text), run_time=0.6)
        self.wait(1.5)
