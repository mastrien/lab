/**
 * Normaliza e sanitiza um texto arbitrário para torná-lo confortável de ser digitado.
 * Subsitui aspas inteligentes, travessões complexos e colapsa espaçamentos indesejados.
 */
export function sanitizeText(text: string): string {
  if (!text) return '';

  return text
    // Normaliza quebras de linha
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Substitui tabs por 4 espaços comuns
    .replace(/\t/g, '    ')
    // Substitui aspas duplas inteligentes por aspas duplas retas comuns
    .replace(/[“”❝❞«»]/g, '"')
    // Substitui aspas simples/apóstrofes inteligentes por aspas simples retas comuns
    .replace(/[‘’`´]/g, "'")
    // Substitui travessões, meia-esquadria e hifens especiais por hífen comum
    .replace(/[—–—]/g, '-')
    // Normaliza reticências tipográficas
    .replace(/…/g, '...')
    // Colapsa múltiplos espaços em uma mesma linha para um único espaço
    .replace(/[ \t]+/g, ' ')
    // Remove múltiplos retornos de linha seguidos (mantendo no máximo 2 para parágrafos confortáveis)
    .replace(/\n{3,}/g, '\n\n')
    // Remove espaços vazios no início e fim do texto
    .trim();
}
