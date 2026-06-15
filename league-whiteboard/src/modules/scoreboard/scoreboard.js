const ROLES = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
const TEAMS = ['blue', 'red'];

/**
 * Classe que gerencia o estado e regras de negócios do Placar do League Whiteboard.
 */
export class Scoreboard {
  constructor() {
    this.state = this._getInitialState();
  }

  /**
   * Retorna um estado limpo inicial do placar.
   * @private
   */
  _getInitialState() {
    const state = { blue: {}, red: {} };
    TEAMS.forEach(team => {
      ROLES.forEach(role => {
        state[team][role] = {
          champion: null,
          items: [],
          trinket: null
        };
      });
    });
    return state;
  }

  /**
   * Valida se o time e rota fornecidos são válidos no League of Legends.
   * @private
   */
  _validateRoleAndTeam(team, role) {
    if (!TEAMS.includes(team)) {
      throw new Error(`Time inválido: ${team}. Deve ser 'blue' ou 'red'.`);
    }
    if (!ROLES.includes(role)) {
      throw new Error(`Rota inválida: ${role}. Deve ser um dos seguintes: ${ROLES.join(', ')}.`);
    }
  }

  /**
   * Obtém a cópia do slot de um time e rota específicos.
   */
  getSlot(team, role) {
    this._validateRoleAndTeam(team, role);
    return this.state[team][role];
  }

  /**
   * Define o campeão associado a um slot específico.
   */
  setChampion(team, role, championId) {
    this._validateRoleAndTeam(team, role);
    this.state[team][role].champion = championId || null;
  }

  /**
   * Adiciona um item ao slot de itens regulares (limite máximo de 6).
   * @returns {boolean} Verdadeiro se adicionado com sucesso, falso se atingiu o limite de 6.
   */
  addItem(team, role, itemId) {
    this._validateRoleAndTeam(team, role);
    const slot = this.state[team][role];
    if (slot.items.length >= 6) {
      return false;
    }
    slot.items.push(itemId);
    return true;
  }

  /**
   * Remove um item do slot de itens pelo índice fornecido.
   * @returns {boolean} Verdadeiro se removido com sucesso, falso se o índice for inválido.
   */
  removeItem(team, role, index) {
    this._validateRoleAndTeam(team, role);
    const slot = this.state[team][role];
    if (index < 0 || index >= slot.items.length) {
      return false;
    }
    slot.items.splice(index, 1);
    return true;
  }

  /**
   * Define o item de sentinela/trinket de um slot específico.
   */
  setTrinket(team, role, trinketId) {
    this._validateRoleAndTeam(team, role);
    this.state[team][role].trinket = trinketId || null;
  }

  /**
   * Calcula o custo total em ouro dos itens equipados em um determinado slot.
   */
  calculateSlotGold(team, role, itemDb) {
    this._validateRoleAndTeam(team, role);
    const slot = this.state[team][role];
    let totalGold = 0;

    // Calcular itens regulares
    slot.items.forEach(itemId => {
      const item = itemDb[itemId];
      if (item && item.gold) {
        totalGold += item.gold.total || 0;
      }
    });

    // Calcular trincket
    if (slot.trinket) {
      const trinket = itemDb[slot.trinket];
      if (trinket && trinket.gold) {
        totalGold += trinket.gold.total || 0;
      }
    }

    return totalGold;
  }

  /**
   * Calcula o custo total em ouro de todos os itens de uma equipe.
   */
  calculateTeamGold(team, itemDb) {
    if (!TEAMS.includes(team)) {
      throw new Error(`Time inválido: ${team}.`);
    }
    let teamGold = 0;
    ROLES.forEach(role => {
      teamGold += this.calculateSlotGold(team, role, itemDb);
    });
    return teamGold;
  }

  /**
   * Exporta o estado atual do placar como um objeto puro (JSON serializável).
   */
  exportState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Importa um estado para o placar, validando sua estrutura básica.
   */
  importState(newState) {
    if (!newState || typeof newState !== 'object') {
      throw new Error('Estado inválido para importação.');
    }
    
    // Validação profunda
    TEAMS.forEach(team => {
      if (!newState[team] || typeof newState[team] !== 'object') {
        throw new Error(`Estado inválido: falta a definição do time ${team}.`);
      }
      ROLES.forEach(role => {
        const slot = newState[team][role];
        if (!slot || typeof slot !== 'object') {
          throw new Error(`Estado inválido: rota ${role} do time ${team} está ausente ou corrompida.`);
        }
        if (!('champion' in slot) || !Array.isArray(slot.items) || !('trinket' in slot)) {
          throw new Error(`Estado inválido: estrutura de chaves incorreta no slot ${team} ${role}.`);
        }
      });
    });

    this.state = JSON.parse(JSON.stringify(newState));
  }
}
