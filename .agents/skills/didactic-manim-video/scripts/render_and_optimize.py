#!/usr/bin/env python3
"""
render_and_optimize.py - Pipeline automatizada de renderização Manim e otimização FFmpeg.

Executa a renderização da cena via Manim Community, localiza o vídeo gerado,
aplica compressão H.264 de alta eficiência com FFmpeg (CRF, yuv420p, faststart, sem áudio)
e gera o snippet HTML padronizado para incorporação na plataforma.
"""

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path


def find_ffmpeg() -> str:
    """Localiza o executável do FFmpeg no sistema operacional."""
    # 1. Variável de ambiente explícita
    if "FFMPEG_PATH" in os.environ and os.path.isfile(os.environ["FFMPEG_PATH"]):
        return os.environ["FFMPEG_PATH"]

    # 2. PATH global do sistema
    which_ffmpeg = shutil.which("ffmpeg")
    if which_ffmpeg:
        return which_ffmpeg

    # 3. Caminhos canônicos em ambientes Windows (Shotcut, Krita, WinGet, Chocolatey, etc.)
    common_windows_paths = [
        r"C:\Program Files\Shotcut\ffmpeg.exe",
        r"C:\Program Files\Krita (x64)\bin\ffmpeg.exe",
        r"C:\ProgramData\chocolatey\bin\ffmpeg.exe",
        r"C:\ffmpeg\bin\ffmpeg.exe",
        os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\WinGet\Links\ffmpeg.exe"),
    ]
    for path in common_windows_paths:
        if os.path.isfile(path):
            return path

    raise FileNotFoundError(
        "FFmpeg não foi encontrado no PATH nem nos diretórios conhecidos. "
        "Defina a variável de ambiente FFMPEG_PATH apontando para o binário ffmpeg.exe."
    )


def format_bytes(size: int) -> str:
    """Formata bytes em unidade legível (KB, MB)."""
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024.0:
            return f"{size:.1f} {unit}"
        size /= 1024.0
    return f"{size:.1f} TB"


def render_scene(script_path: Path, scene_name: str, quality: str, media_dir: Path) -> Path:
    """Executa a renderização com Manim Community."""
    quality_flag_map = {
        "low": "-ql",       # 854x480, 15fps
        "medium": "-qm",    # 1280x720, 30fps (recomendado)
        "high": "-qh",      # 1920x1080, 60fps
    }
    q_flag = quality_flag_map.get(quality, "-qm")

    cmd = [
        sys.executable,
        "-m",
        "manim",
        q_flag,
        "--media_dir",
        str(media_dir),
        str(script_path),
        scene_name,
    ]

    print(f"[Manim] Renderizando cena '{scene_name}' ({quality} quality)...")
    print(f"[Manim] Comando: {' '.join(cmd)}")

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[Erro Manim] stdout:\n{result.stdout}", file=sys.stderr)
        print(f"[Erro Manim] stderr:\n{result.stderr}", file=sys.stderr)
        raise RuntimeError(f"Falha na renderização do Manim (exit code {result.returncode}).")

    # Localizar o arquivo MP4 gerado dentro de media_dir/videos/
    video_files = list(media_dir.glob(f"videos/**/{scene_name}.mp4"))
    if not video_files:
        # Busca recursiva ampla caso o nome varie por sufixo de resolução
        video_files = list(media_dir.glob(f"**/{scene_name}*.mp4"))

    if not video_files:
        raise FileNotFoundError(f"Não foi possível localizar o vídeo gerado para a cena '{scene_name}' em {media_dir}")

    # Selecionar o mais recente
    raw_video = max(video_files, key=os.path.getmtime)
    print(f"[Manim] Vídeo bruto gerado em: {raw_video}")
    return raw_video


def optimize_video(ffmpeg_bin: str, input_video: Path, output_video: Path, crf: int = 26) -> Path:
    """Aplica compressão H.264 otimizada para web usando FFmpeg."""
    output_video.parent.mkdir(parents=True, exist_ok=True)

    # Parâmetros de alta eficiência para animações matemáticas vetoriais:
    # -c:v libx264      : Codec universal H.264
    # -crf 26           : Excelente balanço de nitidez e tamanho reduzido
    # -preset medium    : Otimização de busca de blocos
    # -pix_fmt yuv420p  : Compatibilidade com 100% dos navegadores HTML5
    # -an               : Remove canal de áudio (animações mudas)
    # -movflags +faststart : Move o índice moov para o início para streaming instantâneo
    cmd = [
        ffmpeg_bin,
        "-y",
        "-i", str(input_video),
        "-c:v", "libx264",
        "-crf", str(crf),
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-an",
        "-movflags", "+faststart",
        str(output_video)
    ]

    print(f"[FFmpeg] Otimizando vídeo com H.264 (CRF {crf})...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[Erro FFmpeg] stderr:\n{result.stderr}", file=sys.stderr)
        raise RuntimeError(f"Falha na otimização do FFmpeg (exit code {result.returncode}).")

    raw_size = os.path.getsize(input_video)
    opt_size = os.path.getsize(output_video)
    reduction = (1 - (opt_size / raw_size)) * 100 if raw_size > 0 else 0

    print(f"[FFmpeg] Concluído:")
    print(f"  - Tamanho bruto:      {format_bytes(raw_size)}")
    print(f"  - Tamanho otimizado:  {format_bytes(opt_size)} ({reduction:.1f}% menor)")
    print(f"  - Arquivo final:      {output_video}")
    return output_video


def generate_html_component(video_rel_path: str, caption: str) -> str:
    """Gera o componente HTML centralizado com bordas arredondadas e legenda conforme diretrizes."""
    caption_text = caption or "Demonstração visual do conceito."
    return f"""<!-- Componente Didático de Vídeo (DataLab / Manim) -->
<figure class="flex flex-col items-center justify-center my-6">
  <div class="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-black">
    <video controls autoplay loop muted playsinline class="w-full h-auto block">
      <source src="{video_rel_path}" type="video/mp4">
      Seu navegador não suporta a tag de vídeo.
    </video>
  </div>
  <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium max-w-md">
    {caption_text}
  </figcaption>
</figure>"""


def main():
    parser = argparse.ArgumentParser(
        description="Renderiza cena Manim e otimiza vídeo via FFmpeg para componentes didáticos web."
    )
    parser.add_argument("-f", "--file", required=True, help="Caminho do script Python contendo a cena Manim.")
    parser.add_argument("-s", "--scene", required=True, help="Nome da classe Scene do Manim a ser renderizada.")
    parser.add_argument("-q", "--quality", choices=["low", "medium", "high"], default="medium",
                        help="Qualidade de renderização (low: 480p15, medium: 720p30, high: 1080p60). Padrão: medium.")
    parser.add_argument("-o", "--output", default="assets/videos", help="Diretório de destino para o vídeo otimizado.")
    parser.add_argument("-c", "--caption", default="", help="Descrição curta da legenda para o componente HTML.")
    parser.add_argument("--crf", type=int, default=26, help="Fator CRF do FFmpeg (18-28). Padrão: 26.")
    parser.add_argument("--temp-dir", default=".manim_build", help="Diretório temporário de trabalho do Manim.")

    args = parser.parse_args()

    script_path = Path(args.file).resolve()
    if not script_path.is_file():
        print(f"Erro: Arquivo do script não encontrado: {script_path}", file=sys.stderr)
        sys.exit(1)

    ffmpeg_bin = find_ffmpeg()
    print(f"[Ambiente] FFmpeg detectado: {ffmpeg_bin}")

    temp_dir = Path(args.temp_dir).resolve()
    temp_dir.mkdir(parents=True, exist_ok=True)

    out_dir = Path(args.output).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"{args.scene.lower()}.mp4"

    # 1. Renderizar Manim
    raw_video = render_scene(script_path, args.scene, args.quality, temp_dir)

    # 2. Otimizar FFmpeg
    optimized_video = optimize_video(ffmpeg_bin, raw_video, out_file, crf=args.crf)

    # 3. Gerar snippet HTML
    # Tenta calcular caminho relativo a partir do repositório/workspace se possível
    try:
        rel_path = os.path.relpath(optimized_video, Path.cwd()).replace("\\", "/")
    except ValueError:
        rel_path = str(optimized_video).replace("\\", "/")

    html_snippet = generate_html_component(rel_path, args.caption)

    print("\n" + "=" * 70)
    print("SNIPPET HTML PARA INCORPORAÇÃO:")
    print("=" * 70)
    print(html_snippet)
    print("=" * 70)


if __name__ == "__main__":
    main()
