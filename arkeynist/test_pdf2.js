import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

function sanitizeLatexAccents(text) {
  const map = {
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
    "'a": "á", "'e": "é", "'i": "í", "'o": "ó", "'u": "ú", "'y": "ý", "'ı": "í"
  };

  return text.replace(/([´`˜ˆ^¨¸'])\s*([a-zA-Zı])/g, (match, accent, letter) => {
    const normalizedAccent = accent === 'ˆ' ? '^' : accent === '˜' ? '~' : accent;
    const key = normalizedAccent + letter;
    return map[key] || match;
  });
}

async function extract() {
  const data = new Uint8Array(fs.readFileSync('../Edição Final - Especial de Natal RPG 2025.pdf'));
  pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.mjs';
  const doc = await pdfjs.getDocument({
    data,
    cMapUrl: `../../arkeynist/node_modules/pdfjs-dist/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `../../arkeynist/node_modules/pdfjs-dist/standard_fonts/`
  }).promise;
  
  for(let p = 1; p <= 5; p++) {
      const page = await doc.getPage(p);
      const textContent = await page.getTextContent();
      const rawText = textContent.items.map(i => i.str).join(' ');
      const cleanText = sanitizeLatexAccents(rawText);
      console.log("Raw page", p, rawText.substring(0, 200));
      console.log("Clean page", p, cleanText.substring(0, 200));
  }
}

extract().catch(console.error);
