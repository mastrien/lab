"""
backpropagation_flow_scene.py - Animação didática Manim: Fluxo de Retropropagação e Regra da Cadeia.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Duração: ~8 segundos.
"""

from manim import *

class FluxoBackpropagation(Scene):
    def construct(self):
        # 1. Título e subtítulo
        titulo = MarkupText(
            "Retropropagação (Backpropagation): A Regra da Cadeia no Silício",
            font_size=28,
            color=WHITE
        ).to_edge(UP, buff=0.22)

        subtitulo = MarkupText(
            "Forward: <b>x</b> → <b>z</b> → <b>a</b> → <i>ŷ</i>  |  Backward: <b>δ</b> ← ∂<i>L</i>/∂<b>W</b>",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 2. Nós da rede neural (Entrada -> Oculta -> Saída)
        # Posições no espaço
        pos_x1 = LEFT * 4.5 + UP * 1.0
        pos_x2 = LEFT * 4.5 + DOWN * 1.0

        pos_h1 = LEFT * 1.2 + UP * 1.3
        pos_h2 = LEFT * 1.2 + DOWN * 1.3

        pos_out = RIGHT * 2.8 + ORIGIN
        pos_loss = RIGHT * 5.2 + ORIGIN

        # Círculos dos neurônios
        n_x1 = Circle(radius=0.45, color=BLUE, fill_opacity=0.25).move_to(pos_x1)
        n_x2 = Circle(radius=0.45, color=BLUE, fill_opacity=0.25).move_to(pos_x2)

        n_h1 = Circle(radius=0.55, color=TEAL, fill_opacity=0.25).move_to(pos_h1)
        n_h2 = Circle(radius=0.55, color=TEAL, fill_opacity=0.25).move_to(pos_h2)

        n_out = Circle(radius=0.55, color=ORANGE, fill_opacity=0.25).move_to(pos_out)

        box_loss = Square(side_length=0.9, color=RED, fill_opacity=0.25).move_to(pos_loss)

        # Rótulos
        lbl_x1 = MarkupText("<i>x</i><sub>1</sub>", font_size=22, color=BLUE_B).move_to(pos_x1)
        lbl_x2 = MarkupText("<i>x</i><sub>2</sub>", font_size=22, color=BLUE_B).move_to(pos_x2)

        lbl_h1 = MarkupText("<i>a</i><sub>1</sub>", font_size=22, color=TEAL_B).move_to(pos_h1)
        lbl_h2 = MarkupText("<i>a</i><sub>2</sub>", font_size=22, color=TEAL_B).move_to(pos_h2)

        lbl_out = MarkupText("<i>ŷ</i>", font_size=24, color=ORANGE).move_to(pos_out)
        lbl_loss = MarkupText("<i>L</i>", font_size=24, color=RED).move_to(pos_loss)

        # Sinapses (Linhas direcionadas)
        synapses = VGroup(
            Line(pos_x1, pos_h1, color=GRAY_B, stroke_width=2),
            Line(pos_x1, pos_h2, color=GRAY_B, stroke_width=2),
            Line(pos_x2, pos_h1, color=GRAY_B, stroke_width=2),
            Line(pos_x2, pos_h2, color=GRAY_B, stroke_width=2),
            Line(pos_h1, pos_out, color=GRAY_B, stroke_width=2.5),
            Line(pos_h2, pos_out, color=GRAY_B, stroke_width=2.5),
            Line(pos_out, pos_loss, color=GRAY_B, stroke_width=2.5)
        )

        # 3. Animação de Entrada da Estrutura
        self.play(Write(titulo), FadeIn(subtitulo), run_time=0.8)
        self.play(
            Create(synapses),
            FadeIn(n_x1), FadeIn(lbl_x1),
            FadeIn(n_x2), FadeIn(lbl_x2),
            FadeIn(n_h1), FadeIn(lbl_h1),
            FadeIn(n_h2), FadeIn(lbl_h2),
            FadeIn(n_out), FadeIn(lbl_out),
            FadeIn(box_loss), FadeIn(lbl_loss),
            run_time=1.2
        )
        self.wait(0.4)

        # 4. Fase 1: Forward Pass (Pulsos verdes propagando da esquerda para a direita)
        forward_text = MarkupText("Passagem Direta: Propagação de Ativações e Cálculo de <i>L</i>(<i>ŷ</i>, <i>y</i>)", font_size=20, color=GREEN).next_to(titulo, DOWN, buff=0.12)
        
        pulse_fwd1 = Line(pos_x1, pos_h1, color=GREEN, stroke_width=5)
        pulse_fwd2 = Line(pos_x2, pos_h2, color=GREEN, stroke_width=5)
        pulse_fwd_out = Line(pos_h1, pos_out, color=GREEN, stroke_width=5)
        pulse_fwd_loss = Line(pos_out, pos_loss, color=GREEN, stroke_width=5)

        self.play(Transform(subtitulo, forward_text), run_time=0.4)
        self.play(ShowPassingFlash(pulse_fwd1, time_width=0.4), ShowPassingFlash(pulse_fwd2, time_width=0.4), run_time=0.7)
        self.play(ShowPassingFlash(pulse_fwd_out, time_width=0.4), run_time=0.6)
        self.play(ShowPassingFlash(pulse_fwd_loss, time_width=0.4), Flash(box_loss, color=RED), run_time=0.6)
        self.wait(0.4)

        # 5. Fase 2: Backward Pass (Pulsos vermelhos fluindo da direita para a esquerda)
        backward_text = MarkupText("Retropropagação: Gradientes <b>δ</b> fluindo via Regra da Cadeia", font_size=20, color=RED).next_to(titulo, DOWN, buff=0.12)

        pulse_bwd_loss = Line(pos_loss, pos_out, color=RED, stroke_width=6)
        pulse_bwd_h1 = Line(pos_out, pos_h1, color=RED, stroke_width=6)
        pulse_bwd_h2 = Line(pos_out, pos_h2, color=RED, stroke_width=6)
        pulse_bwd_x1 = Line(pos_h1, pos_x1, color=RED, stroke_width=5)
        pulse_bwd_x2 = Line(pos_h2, pos_x2, color=RED, stroke_width=5)

        self.play(Transform(subtitulo, backward_text), run_time=0.4)
        self.play(ShowPassingFlash(pulse_bwd_loss, time_width=0.5), run_time=0.6)
        self.play(ShowPassingFlash(pulse_bwd_h1, time_width=0.5), ShowPassingFlash(pulse_bwd_h2, time_width=0.5), run_time=0.7)
        self.play(ShowPassingFlash(pulse_bwd_x1, time_width=0.5), ShowPassingFlash(pulse_bwd_x2, time_width=0.5), run_time=0.7)

        # 6. Atualização de Pesos Final
        update_text = MarkupText("Atualização dos Pesos: <b>W</b><sub>novo</sub> = <b>W</b> − <i>α</i> ∂<i>L</i>/∂<b>W</b>", font_size=20, color=YELLOW).next_to(titulo, DOWN, buff=0.12)
        self.play(Transform(subtitulo, update_text), run_time=0.5)
        self.wait(1.5)
