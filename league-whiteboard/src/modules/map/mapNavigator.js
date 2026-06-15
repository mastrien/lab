/**
 * Classe responsável por gerenciar a lógica matemática de zoom e pan (navegação de mapa) 
 * de forma desacoplada do DOM para manter a separação de responsabilidades.
 */
export class MapNavigator {
  constructor(options = {}) {
    this.minZoom = options.minZoom ?? 0.5;
    this.maxZoom = options.maxZoom ?? 4.0;
    this.reset();
  }

  /**
   * Reseta a escala (zoom) e translação (pan) para os valores iniciais padrão.
   */
  reset() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
  }

  /**
   * Retorna o estado atual de navegação.
   * @returns {{zoom: number, panX: number, panY: number}}
   */
  getState() {
    return {
      zoom: this.zoom,
      panX: this.panX,
      panY: this.panY
    };
  }

  /**
   * Move o mapa pelas coordenadas fornecidas (delta X e delta Y).
   */
  pan(dx, dy) {
    this.panX += dx;
    this.panY += dy;
  }

  /**
   * Define diretamente o zoom, respeitando os limites mínimo e máximo.
   */
  setZoom(newZoom) {
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
  }

  /**
   * Aplica zoom dinâmico tendo um ponto focal específico (geralmente a posição do cursor do mouse).
   * 
   * @param {number} delta - Razão de mudança (ex: 0.1 para zoom in, -0.1 para zoom out).
   * @param {number} clientX - Coordenada X do ponto focal.
   * @param {number} clientY - Coordenada Y do ponto focal.
   */
  zoomAt(delta, clientX, clientY) {
    const oldZoom = this.zoom;
    this.setZoom(oldZoom * (1 + delta));
    
    // Proporção de mudança no zoom
    const factor = this.zoom / oldZoom;
    
    // Ajusta as coordenadas do pan para pivotar ao redor do ponto focal
    this.panX = clientX - (clientX - this.panX) * factor;
    this.panY = clientY - (clientY - this.panY) * factor;
  }
}
