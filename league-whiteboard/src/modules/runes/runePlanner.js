/**
 * Classe que gerencia o estado e persistência local de uma página de runas.
 */
export class RunePlanner {
  constructor(options = {}) {
    // Permite injeção de dependência do storage para testes
    this.storage = options.storage || (typeof window !== 'undefined' ? window.localStorage : null);
    this.state = this._getInitialState();
  }

  /**
   * Retorna o estado inicial limpo de uma página de runas.
   * @private
   */
  _getInitialState() {
    return {
      primaryPathId: null,
      secondaryPathId: null,
      keystoneId: null,
      primaryRuneIds: [null, null, null],
      secondaryRuneIds: [null, null],
      shardIds: [null, null, null]
    };
  }

  /**
   * Define o caminho de runas principal.
   */
  setPrimaryPath(pathId) {
    pathId = pathId != null ? Number(pathId) : null;
    if (this.state.primaryPathId === pathId) return true;

    // Se o caminho principal for definido igual ao secundário atual, limpa o secundário
    if (this.state.secondaryPathId === pathId) {
      this.state.secondaryPathId = null;
      this.state.secondaryRuneIds = [null, null];
    }

    this.state.primaryPathId = pathId;
    this.state.keystoneId = null;
    this.state.primaryRuneIds = [null, null, null];
    return true;
  }

  /**
   * Define o caminho de runas secundário.
   * @returns {boolean} Falso se tentar definir o mesmo caminho do principal.
   */
  setSecondaryPath(pathId) {
    pathId = pathId != null ? Number(pathId) : null;
    if (pathId && this.state.primaryPathId === pathId) {
      return false;
    }
    if (this.state.secondaryPathId === pathId) return true;

    this.state.secondaryPathId = pathId;
    this.state.secondaryRuneIds = [null, null];
    return true;
  }

  /**
   * Define a Runa Keystone (Runa Principal).
   */
  setKeystone(keystoneId) {
    this.state.keystoneId = keystoneId != null ? Number(keystoneId) : null;
    return true;
  }

  /**
   * Define uma runa menor no caminho principal em um slot específico (0 a 2).
   */
  setPrimaryRune(slotIndex, runeId) {
    if (slotIndex < 0 || slotIndex >= 3) {
      return false;
    }
    this.state.primaryRuneIds[slotIndex] = runeId != null ? Number(runeId) : null;
    return true;
  }

  /**
   * Define uma runa menor no caminho secundário em um slot específico (0 a 1).
   */
  setSecondaryRune(slotIndex, runeId) {
    if (slotIndex < 0 || slotIndex >= 2) {
      return false;
    }
    this.state.secondaryRuneIds[slotIndex] = runeId != null ? Number(runeId) : null;
    return true;
  }

  /**
   * Define um shard de atributo em um slot específico (0 a 2).
   * Slot 0: Ofensivo, Slot 1: Flex, Slot 2: Defensivo.
   */
  setShard(slotIndex, shardId) {
    if (slotIndex < 0 || slotIndex >= 3) {
      return false;
    }
    this.state.shardIds[slotIndex] = shardId != null ? Number(shardId) : null;
    return true;
  }

  /**
   * Verifica se a página de runas atual está completa e válida.
   */
  isValid() {
    const s = this.state;
    return (
      s.primaryPathId !== null &&
      s.secondaryPathId !== null &&
      s.keystoneId !== null &&
      s.primaryRuneIds.every(id => id !== null) &&
      s.secondaryRuneIds.every(id => id !== null) &&
      s.shardIds.every(id => id !== null)
    );
  }

  /**
   * Limpa todas as seleções de runas.
   */
  clear() {
    this.state = this._getInitialState();
  }

  /**
   * Exporta o estado atual das runas em um formato serializável.
   */
  exportState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Importa um estado para o planejador de runas.
   */
  importState(newState) {
    if (!newState || typeof newState !== 'object') {
      throw new Error('Estado de runas inválido para importação.');
    }
    this.state = {
      primaryPathId: newState.primaryPathId != null ? Number(newState.primaryPathId) : null,
      secondaryPathId: newState.secondaryPathId != null ? Number(newState.secondaryPathId) : null,
      keystoneId: newState.keystoneId != null ? Number(newState.keystoneId) : null,
      primaryRuneIds: Array.isArray(newState.primaryRuneIds)
        ? newState.primaryRuneIds.map(id => id != null ? Number(id) : null)
        : [null, null, null],
      secondaryRuneIds: Array.isArray(newState.secondaryRuneIds)
        ? newState.secondaryRuneIds.map(id => id != null ? Number(id) : null)
        : [null, null],
      shardIds: Array.isArray(newState.shardIds)
        ? newState.shardIds.map(id => id != null ? Number(id) : null)
        : [null, null, null]
    };
  }

  /**
   * Salva a página de runas atual no storage configurado.
   */
  save(pageName) {
    if (!this.storage) return false;
    const key = `lw-runes-${pageName}`;
    this.storage.setItem(key, JSON.stringify(this.exportState()));
    return true;
  }

  /**
   * Carrega uma página de runas do storage configurado.
   */
  load(pageName) {
    if (!this.storage) return false;
    const key = `lw-runes-${pageName}`;
    const data = this.storage.getItem(key);
    if (!data) return false;

    try {
      const state = JSON.parse(data);
      this.importState(state);
      return true;
    } catch (e) {
      return false;
    }
  }
}
