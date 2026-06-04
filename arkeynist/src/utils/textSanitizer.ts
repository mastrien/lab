function sanitizeLatexAccents(text: string): string {
  const map: Record<string, string> = {
    "´a": "á", "´e": "é", "´i": "í", "´o": "ó", "´u": "ú", "´y": "ý", "´ı": "í",
    "´A": "Á", "´E": "É", "´I": "Í", "´O": "Ó", "´U": "Ú", "´Y": "Ý",
    "`a": "à", "`e": "è", "`i": "ì", "`o": "ò", "`u": "ù",
    "`A": "À", "`E": "È", "`I": "Ì", "`O": "Ò", "`U": "Ù",
    "~a": "ã", "~o": "õ", "~n": "ñ",
    "~A": "Ã", "~O": "Õ", "~N": "Ñ",
    "^a": "â", "^e": "ê", "^i": "î", "^o": "ô", "^u": "û", "^ı": "î",
    "^A": "Â", "^E": "Ê", "^I": "Î", "^O": "Ô", "^U": "Û",
    "¨a": "ä", "¨e": "ë", "¨i": "ï", "¨o": "ö", "¨u": "ü", "¨ı": "ï",
    "¨A": "Ä", "¨E": "Ë", "¨I": "Ï", "¨O": "Ö", "¨U": "Ü",
    "¸c": "ç", "¸C": "Ç",
    "'a": "á", "'e": "é", "'i": "í", "'o": "ó", "'u": "ú", "'y": "ý", "'ı": "í",
    "'A": "Á", "'E": "É", "'I": "Í", "'O": "Ó", "'U": "Ú", "'Y": "Ý",
    "’a": "á", "’e": "é", "’i": "í", "’o": "ó", "’u": "ú", "’y": "ý", "’ı": "í",
    "’A": "Á", "’E": "É", "’I": "Í", "’O": "Ó", "’U": "Ú", "’Y": "Ý",
    "‘a": "á", "‘e": "é", "‘i": "í", "‘o": "ó", "‘u": "ú", "‘y": "ý", "‘ı": "í",
    "‘A": "Á", "‘E": "É", "‘I": "Í", "‘O": "Ó", "‘U": "Ú", "‘Y": "Ý"
  };

  return text.replace(/\s*([´`˜ˆ^¨¸'’‘])\s*([a-zA-Zı])/g, (match, accent, letter) => {
    const normalizedAccent = accent === 'ˆ' ? '^' : accent === '˜' ? '~' : accent;
    const key = normalizedAccent + letter;
    return map[key] || match;
  });
}

/**
 * Normaliza e sanitiza um texto arbitrário para torná-lo confortável de ser digitado.
 * Subsitui aspas inteligentes, travessões complexos e colapsa espaçamentos indesejados.
 */
export function sanitizeText(text: string): string {
  if (!text) return '';

  let sanitized = sanitizeLatexAccents(text);

  return sanitized
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
