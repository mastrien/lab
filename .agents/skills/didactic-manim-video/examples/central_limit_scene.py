"""
central_limit_scene.py - Exemplo didático Manim do Teorema Central do Limite.
Demonstra a transição intuitiva de uma distribuição uniforme/retangular para a curva em sino normal.
Duração aproximada: ~9 segundos.
"""

import numpy as np
from manim import *

class TeoremaCentralDoLimite(Scene):
    def construct(self):
        # 1. Título e eixos
        titulo = Text("Teorema Central do Limite", font_size=28, color=WHITE).to_edge(UP)
        subtitulo = Text("Distribuição das Médias Amostrais (N cresce)", font_size=18, color=LIGHT_GRAY).next_to(titulo, DOWN, buff=0.15)
        
        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[0, 1.2, 0.2],
            x_length=7,
            y_length=3.5,
            axis_config={"color": GRAY, "stroke_width": 2}
        ).shift(DOWN * 0.5)

        # 2. Distribuição inicial uniforme (N = 1)
        uniforme_rect = Rectangle(width=4.0, height=1.0, color=BLUE, fill_opacity=0.3).move_to(axes.c2p(0, 0.3))
        lbl_n1 = Text("N = 1 (Distribuição Uniforme Original)", font_size=16, color=BLUE).next_to(axes, DOWN, buff=0.3)

        self.play(Write(titulo), FadeIn(subtitulo), Create(axes), run_time=1.0)
        self.play(FadeIn(uniforme_rect), FadeIn(lbl_n1), run_time=1.0)
        self.wait(1.0)

        # 3. Transição para N = 5 (Distribuição Triangular / Suave)
        triangulo = Polygon(
            axes.c2p(-2, 0), axes.c2p(0, 0.6), axes.c2p(2, 0),
            color=YELLOW, fill_opacity=0.35
        )
        lbl_n5 = Text("N = 5 (Convolução Inicial)", font_size=16, color=YELLOW).next_to(axes, DOWN, buff=0.3)

        self.play(
            ReplacementTransform(uniforme_rect, triangulo),
            ReplacementTransform(lbl_n1, lbl_n5),
            run_time=1.5
        )
        self.wait(1.0)

        # 4. Transição para N = 30 (Curva Gaussiana Normal)
        normal_curve = axes.plot(
            lambda x: np.exp(-0.5 * (x**2)) / np.sqrt(2 * np.pi) * 2.2,
            x_range=[-2.8, 2.8],
            color=GREEN
        )
        normal_area = axes.get_area(normal_curve, x_range=[-2.8, 2.8], color=GREEN, opacity=0.3)
        lbl_n30 = Text("N = 30 (Emergência da Distribuição Normal)", font_size=16, color=GREEN).next_to(axes, DOWN, buff=0.3)

        self.play(
            ReplacementTransform(triangulo, VGroup(normal_curve, normal_area)),
            ReplacementTransform(lbl_n5, lbl_n30),
            run_time=1.8
        )
        self.wait(1.5)
