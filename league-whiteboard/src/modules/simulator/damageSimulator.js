/**
 * Calcula o dano final recebido após mitigação por resistência.
 *
 * @param {number} rawDamage - O valor bruto do dano aplicado.
 * @param {'physical' | 'magic' | 'true'} damageType - O tipo de dano.
 * @param {number} resistance - O valor da resistência (Armadura ou Resistência Mágica). Ignorado se o tipo for true.
 * @returns {number} O dano final após mitigação.
 */
export function calculateDamage(rawDamage, damageType, resistance = 0) {
  if (damageType === 'true') {
    return rawDamage;
  }

  let multiplier = 1;
  if (resistance >= 0) {
    multiplier = 100 / (100 + resistance);
  } else {
    // Fórmula para resistência negativa: multiplier = 2 - 100 / (100 - resistance)
    multiplier = 2 - 100 / (100 - resistance);
  }

  return rawDamage * multiplier;
}

/**
 * Calcula a duração final de um efeito de controle de grupo (CC) após aplicação de Tenacidade.
 *
 * @param {number} originalDuration - A duração inicial do efeito em segundos.
 * @param {number} tenacityPercent - A tenacidade do alvo em porcentagem (0 a 100).
 * @param {Object} [options] - Opções de cálculo adicionais.
 * @param {boolean} [options.clampMinDuration=false] - Se verdadeiro, limita a duração mínima ao padrão do jogo (0.5s).
 * @returns {number} A duração final do CC em segundos.
 */
export function calculateCCDuration(originalDuration, tenacityPercent, options = {}) {
  const tenacity = Math.max(0, Math.min(100, tenacityPercent));
  let duration = originalDuration * (1 - tenacity / 100);

  if (options.clampMinDuration) {
    // Na maioria dos CCs de League of Legends, a duração não pode ser reduzida abaixo de 0.5s
    duration = Math.max(0.5, duration);
  }

  return duration;
}

/**
 * Converte Aceleração de Habilidade (Ability Haste) para porcentagem de Redução de Tempo de Recarga (CDR).
 *
 * @param {number} abilityHaste - O valor de Aceleração de Habilidade.
 * @returns {number} A porcentagem de CDR correspondente (0 a 100).
 */
export function calculateCDR(abilityHaste) {
  const ah = Math.max(0, abilityHaste);
  return (ah / (100 + ah)) * 100;
}
