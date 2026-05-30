import * as pdfjs from 'pdfjs-dist';

// Configuração do Worker para processamento assíncrono em Web Workers.
// Tenta carregar o worker local via Vite. Se houver falha, faz fallback para o CDN oficial do Unpkg da versão exata instalada.
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch (e) {
  const version = pdfjs.version || '6.0.227';
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

/**
 * Lê um arquivo PDF e extrai todo o conteúdo de texto de forma assíncrona.
 */
export async function extractTextFromPdf(
  file: File,
  onProgress?: (processed: number, total: number) => void
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  const totalPages = pdf.numPages;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Concatena as strings dos itens de texto da página
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
      
    fullText += pageText + '\n\n';
    
    if (onProgress) {
      onProgress(pageNum, totalPages);
    }
  }

  return fullText;
}
