/**
 * Classe que gerencia o estado e persistência local do Comparador de Builds.
 */
export class BuildComparator {
  constructor(options = {}) {
    this.storage = options.storage || (typeof window !== 'undefined' ? window.localStorage : null);
    this.state = this._getInitialState();
  }

  /**
   * Retorna o estado inicial padrão do comparador.
   * @private
   */
  _getInitialState() {
    return {
      championId: null,
      builds: [
        { id: 'build-1', name: 'Build 1', items: [null, null, null, null, null, null], trinket: null },
        { id: 'build-2', name: 'Build 2', items: [null, null, null, null, null, null], trinket: null }
      ]
    };
  }

  /**
   * Define o campeão que está sendo comparado.
   */
  setChampion(championId) {
    this.state.championId = championId || null;
    this.save();
  }

  /**
   * Adiciona uma nova build com o nome especificado.
   * @returns {string} ID da build criada.
   */
  addBuild(name = 'Nova Build') {
    const id = `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.state.builds.push({
      id,
      name,
      items: [null, null, null, null, null, null],
      trinket: null
    });
    this.save();
    return id;
  }

  /**
   * Remove uma build pelo ID.
   */
  removeBuild(buildId) {
    this.state.builds = this.state.builds.filter(b => b.id !== buildId);
    this.save();
  }

  /**
   * Atualiza o nome de uma build.
   */
  updateBuildName(buildId, name) {
    const build = this.state.builds.find(b => b.id === buildId);
    if (build) {
      build.name = name;
      this.save();
    }
  }

  /**
   * Define um item em uma determinada posição da build.
   */
  setItem(buildId, index, itemId) {
    const build = this.state.builds.find(b => b.id === buildId);
    if (build && index >= 0 && index < 6) {
      build.items[index] = itemId || null;
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Remove o item de uma determinada posição da build.
   */
  removeItem(buildId, index) {
    const build = this.state.builds.find(b => b.id === buildId);
    if (build && index >= 0 && index < 6) {
      build.items[index] = null;
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Define o trinket da build.
   */
  setTrinket(buildId, trinketId) {
    const build = this.state.builds.find(b => b.id === buildId);
    if (build) {
      build.trinket = trinketId || null;
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Salva o estado atual no storage.
   */
  save() {
    if (this.storage) {
      this.storage.setItem('lw-comparator', JSON.stringify(this.state));
    }
  }

  /**
   * Carrega o estado salvo no storage.
   */
  load() {
    if (!this.storage) return false;
    const data = this.storage.getItem('lw-comparator');
    if (!data) return false;
    try {
      const parsed = JSON.parse(data);
      this.state = {
        championId: parsed.championId ?? null,
        builds: Array.isArray(parsed.builds) ? parsed.builds : []
      };
      return true;
    } catch (e) {
      return false;
    }
  }
}
