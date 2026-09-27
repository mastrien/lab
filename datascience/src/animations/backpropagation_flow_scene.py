"""
backpropagation_flow_scene.py - Animação didática Manim: Fluxo de Retropropagação e Regra da Cadeia.
Utiliza MarkupText com tags Pango (<sub>, <sup>, <i>, <b>) para renderização tipográfica perfeita.
Versão aprimorada: ritmo calmo, pausas entre mudanças de estado e animações de propagação suaves.
"""

from manim import *

class FluxoBackpropagation(Scene):
    def construct(self):
        # 1. Título e subtítulo inicial
        titulo = MarkupText(
            "Retropropagação (Backpropagation): A Regra da Cadeia no Silício",
            font_size=28,
            color=WHITE
        ).to_edge(UP, buff=0.22)

        subtitulo = MarkupText(
            "Arquitetura Feedforward: Entrada → Oculta → Saída → Custo",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        # 2. Posições dos neurônios no espaço cartesiano (16:9)
        pos_x1 = LEFT * 4.6 + UP * 1.1
        pos_x2 = LEFT * 4.6 + DOWN * 1.1

        pos_h1 = LEFT * 1.2 + UP * 1.3
        pos_h2 = LEFT * 1.2 + DOWN * 1.3

        pos_out = RIGHT * 2.6 + ORIGIN
        pos_loss = RIGHT * 5.1 + ORIGIN

        # Círculos dos neurônios
        n_x1 = Circle(radius=0.48, color=BLUE, fill_opacity=0.25).move_to(pos_x1)
        n_x2 = Circle(radius=0.48, color=BLUE, fill_opacity=0.25).move_to(pos_x2)

        n_h1 = Circle(radius=0.55, color=TEAL, fill_opacity=0.25).move_to(pos_h1)
        n_h2 = Circle(radius=0.55, color=TEAL, fill_opacity=0.25).move_to(pos_h2)

        n_out = Circle(radius=0.55, color=ORANGE, fill_opacity=0.25).move_to(pos_out)

        box_loss = Square(side_length=0.95, color=RED, fill_opacity=0.25).move_to(pos_loss)

        # Rótulos textuais
        lbl_x1 = MarkupText("<i>x</i><sub>1</sub>", font_size=24, color=BLUE_B).move_to(pos_x1)
        lbl_x2 = MarkupText("<i>x</i><sub>2</sub>", font_size=24, color=BLUE_B).move_to(pos_x2)

        lbl_h1 = MarkupText("<i>a</i><sub>1</sub>", font_size=24, color=TEAL_B).move_to(pos_h1)
        lbl_h2 = MarkupText("<i>a</i><sub>2</sub>", font_size=24, color=TEAL_B).move_to(pos_h2)

        lbl_out = MarkupText("<i>ŷ</i>", font_size=26, color=ORANGE).move_to(pos_out)
        lbl_loss = MarkupText("<i>L</i>", font_size=26, color=RED).move_to(pos_loss)

        # Sinapses (Linhas conectando as camadas)
        synapses = VGroup(
            Line(pos_x1, pos_h1, color=GRAY_B, stroke_width=2.2),
            Line(pos_x1, pos_h2, color=GRAY_B, stroke_width=2.2),
            Line(pos_x2, pos_h1, color=GRAY_B, stroke_width=2.2),
            Line(pos_x2, pos_h2, color=GRAY_B, stroke_width=2.2),
            Line(pos_h1, pos_out, color=GRAY_B, stroke_width=2.6),
            Line(pos_h2, pos_out, color=GRAY_B, stroke_width=2.6),
            Line(pos_out, pos_loss, color=GRAY_B, stroke_width=2.6)
        )

        # Rótulos de camada
        layer_in = MarkupText("Entrada", font_size=16, color=BLUE_B).next_to(pos_x1, UP, buff=0.45)
        layer_hid = MarkupText("Camada Oculta", font_size=16, color=TEAL_B).next_to(pos_h1, UP, buff=0.45)
        layer_out = MarkupText("Saída", font_size=16, color=ORANGE).next_to(pos_out, UP, buff=0.75)
        layer_loss = MarkupText("Perda", font_size=16, color=RED).next_to(pos_loss, UP, buff=0.6)

        # ==========================================
        # SEQUÊNCIA DE ANIMAÇÃO DIDÁTICA E CALMA
        # ==========================================

        # A. Construção da Arquitetura
        self.play(Write(titulo), FadeIn(subtitulo), run_time=1.2)
        self.play(
            Create(synapses),
            FadeIn(n_x1), FadeIn(lbl_x1),
            FadeIn(n_x2), FadeIn(lbl_x2),
            FadeIn(n_h1), FadeIn(lbl_h1),
            FadeIn(n_h2), FadeIn(lbl_h2),
            FadeIn(n_out), FadeIn(lbl_out),
            FadeIn(box_loss), FadeIn(lbl_loss),
            FadeIn(layer_in), FadeIn(layer_hid), FadeIn(layer_out), FadeIn(layer_loss),
            run_time=1.5
        )
        self.wait(1.2)

        # B. Fase 1: Forward Pass (Passagem Direta)
        sub_forward = MarkupText(
            "1. Passagem Direta (Forward): Propagação de Ativações <b>x</b> → <b>z</b> → <b>a</b> → <i>ŷ</i>",
            font_size=20,
            color=GREEN
        ).next_to(titulo, DOWN, buff=0.12)
        self.play(Transform(subtitulo, sub_forward), run_time=0.8)
        self.wait(0.8)

        # Propagação x -> h
        pulse_fwd1 = Line(pos_x1, pos_h1, color=GREEN, stroke_width=6)
        pulse_fwd2 = Line(pos_x1, pos_h2, color=GREEN, stroke_width=6)
        pulse_fwd3 = Line(pos_x2, pos_h1, color=GREEN, stroke_width=6)
        pulse_fwd4 = Line(pos_x2, pos_h2, color=GREEN, stroke_width=6)

        self.play(
            ShowPassingFlash(pulse_fwd1, time_width=0.45),
            ShowPassingFlash(pulse_fwd2, time_width=0.45),
            ShowPassingFlash(pulse_fwd3, time_width=0.45),
            ShowPassingFlash(pulse_fwd4, time_width=0.45),
            run_time=1.2
        )
        self.play(
            n_h1.animate.set_color(GREEN_B),
            n_h2.animate.set_color(GREEN_B),
            run_time=0.6
        )
        self.wait(0.8)

        # Propagação h -> out
        pulse_fwd_out1 = Line(pos_h1, pos_out, color=GREEN, stroke_width=6)
        pulse_fwd_out2 = Line(pos_h2, pos_out, color=GREEN, stroke_width=6)

        self.play(
            ShowPassingFlash(pulse_fwd_out1, time_width=0.45),
            ShowPassingFlash(pulse_fwd_out2, time_width=0.45),
            run_time=1.2
        )
        self.play(n_out.animate.set_color(YELLOW), run_time=0.6)
        self.wait(0.8)

        # Propagação out -> loss (Cálculo do erro)
        pulse_fwd_loss = Line(pos_out, pos_loss, color=GREEN, stroke_width=6)
        self.play(
            ShowPassingFlash(pulse_fwd_loss, time_width=0.45),
            Flash(box_loss, color=RED, flash_radius=0.7),
            run_time=1.0
        )
        self.wait(1.5)

        # C. Fase 2: Backward Pass (Retropropagação)
        sub_backward = MarkupText(
            "2. Retropropagação (Backward): Sinal de Erro <b>δ</b> Retrocedendo pela Regra da Cadeia",
            font_size=20,
            color=RED
        ).next_to(titulo, DOWN, buff=0.12)
        self.play(Transform(subtitulo, sub_backward), run_time=0.8)
        self.wait(0.8)

        # Erro loss -> out
        pulse_bwd_loss = Line(pos_loss, pos_out, color=RED, stroke_width=6.5)
        lbl_delta_out = MarkupText("<i>δ</i><sup>[<i>L</i>]</sup> = <i>ŷ</i> − <i>y</i>", font_size=18, color=RED).next_to(pos_out, DOWN, buff=0.25)

        self.play(
            ShowPassingFlash(pulse_bwd_loss, time_width=0.5),
            FadeIn(lbl_delta_out),
            run_time=1.2
        )
        self.wait(1.0)

        # Erro out -> h
        pulse_bwd_h1 = Line(pos_out, pos_h1, color=RED, stroke_width=6.5)
        pulse_bwd_h2 = Line(pos_out, pos_h2, color=RED, stroke_width=6.5)
        lbl_delta_h = MarkupText("<b>δ</b><sup>[<i>l</i>]</sup> = (<b>W</b><sup>⊤</sup><b>δ</b>) ⊙ <i>σ</i>′", font_size=18, color=RED).next_to(pos_h2, DOWN, buff=0.25)

        self.play(
            ShowPassingFlash(pulse_bwd_h1, time_width=0.5),
            ShowPassingFlash(pulse_bwd_h2, time_width=0.5),
            FadeIn(lbl_delta_h),
            run_time=1.2
        )
        self.wait(1.0)

        # Erro h -> x
        pulse_bwd_x1 = Line(pos_h1, pos_x1, color=RED, stroke_width=5.5)
        pulse_bwd_x2 = Line(pos_h1, pos_x2, color=RED, stroke_width=5.5)
        pulse_bwd_x3 = Line(pos_h2, pos_x1, color=RED, stroke_width=5.5)
        pulse_bwd_x4 = Line(pos_h2, pos_x2, color=RED, stroke_width=5.5)

        self.play(
            ShowPassingFlash(pulse_bwd_x1, time_width=0.5),
            ShowPassingFlash(pulse_bwd_x2, time_width=0.5),
            ShowPassingFlash(pulse_bwd_x3, time_width=0.5),
            ShowPassingFlash(pulse_bwd_x4, time_width=0.5),
            run_time=1.2
        )
        self.wait(1.2)

        # D. Fase 3: Atualização dos Pesos (Gradiente Descendente)
        sub_update = MarkupText(
            "3. Otimização Numérica: <b>W</b> ← <b>W</b> − <i>α</i> (<b>δ</b> <b>a</b><sup>⊤</sup>)  |  <b>b</b> ← <b>b</b> − <i>α</i> <b>δ</b>",
            font_size=20,
            color=YELLOW
        ).next_to(titulo, DOWN, buff=0.12)

        synapses_updated = synapses.copy().set_color(YELLOW).set_stroke(width=4.5)

        self.play(
            Transform(subtitulo, sub_update),
            FadeOut(lbl_delta_out),
            FadeOut(lbl_delta_h),
            FadeIn(synapses_updated),
            n_h1.animate.set_color(TEAL),
            n_h2.animate.set_color(TEAL),
            n_out.animate.set_color(ORANGE),
            run_time=1.2
        )

        # E. Pausa contemplativa final
        self.wait(3.5)
