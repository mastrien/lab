import React, { useState, useRef } from 'react';
import { Upload, BookOpen, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '../services/db';
import { sanitizeText } from '../utils/textSanitizer';
import { extractTextFromPdf } from '../utils/pdfExtractor';

interface ImportPanelProps {
  onImportSuccess: () => void;
}

export default function ImportPanel({ onImportSuccess }: ImportPanelProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rawText, setRawText] = useState('');
  
  // File upload states
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rawText.trim()) {
      setStatusMsg({ type: 'error', text: 'Por favor, preencha o título e o conteúdo do texto.' });
      return;
    }

    try {
      setLoading(true);
      const sanitized = sanitizeText(rawText);
      await db.books.add({
        title: title.trim(),
        author: author.trim() || undefined,
        rawText: sanitized,
        createdAt: Date.now(),
      });

      setTitle('');
      setAuthor('');
      setRawText('');
      setStatusMsg({ type: 'success', text: `Texto "${title}" importado com sucesso para a biblioteca!` });
      onImportSuccess();
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Erro ao salvar texto no banco de dados local.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatusMsg(null);
    setLoading(true);

    const fileType = file.name.split('.').pop()?.toLowerCase();
    let text = '';

    try {
      if (fileType === 'txt' || fileType === 'md') {
        const reader = new FileReader();
        text = await new Promise<string>((resolve, reject) => {
          reader.onload = (event) => resolve(event.target?.result as string || '');
          reader.onerror = () => reject(new Error('Erro ao ler arquivo de texto.'));
          reader.readAsText(file);
        });
      } else if (fileType === 'pdf') {
        text = await extractTextFromPdf(file, (current, total) => {
          setProgress({ current, total });
        });
      } else {
        throw new Error('Formato de arquivo não suportado. Use apenas .txt, .md ou .pdf.');
      }

      if (!text || text.trim().length === 0) {
        throw new Error('O arquivo importado está vazio ou não possui texto extraível.');
      }

      const sanitized = sanitizeText(text);
      const defaultTitle = file.name.replace(/\.[^/.]+$/, ""); // remove extension

      await db.books.add({
        title: defaultTitle,
        rawText: sanitized,
        createdAt: Date.now(),
      });

      setStatusMsg({ type: 'success', text: `Arquivo "${file.name}" processado e adicionado à biblioteca!` });
      onImportSuccess();
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || 'Ocorreu um erro ao processar o arquivo.' });
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-bg-secondary border border-text-muted/20 p-6 rounded-xl flex flex-col gap-6">
      <div className="flex items-center gap-2 border-b border-text-muted/10 pb-3">
        <Upload className="w-5 h-5 text-accent-color" />
        <h2 className="text-xl font-bold text-text-main font-sans">Importar Novos Textos</h2>
      </div>

      {/* Upload de Arquivos Drag & Drop */}
      <div 
        onClick={triggerFileInput}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition duration-200 ${
          loading 
            ? 'border-text-muted/20 bg-bg-primary/50 pointer-events-none' 
            : 'border-text-muted/40 hover:border-accent-color hover:bg-bg-primary/30'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept=".txt,.md,.pdf" 
          className="hidden" 
        />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-accent-color animate-spin" />
            <p className="text-sm font-medium">Processando arquivo localmente...</p>
            {progress.total > 0 && (
              <p className="text-xs text-text-muted font-mono">
                Lendo páginas do PDF: {progress.current} / {progress.total} ({Math.round((progress.current / progress.total) * 100)}%)
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <FileText className="w-10 h-10 text-text-muted" />
            <p className="text-sm font-medium text-text-main">
              Arraste ou clique para enviar arquivos <span className="text-accent-color">.txt</span>, <span className="text-accent-color">.md</span> ou <span className="text-accent-color">.pdf</span>
            </p>
            <p className="text-xs text-text-muted">A extração e processamento ocorrem 100% de forma segura e privada no seu navegador</p>
          </div>
        )}
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-lg flex items-start gap-3 border ${
          statusMsg.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span className="text-sm font-sans">{statusMsg.text}</span>
        </div>
      )}

      {/* Importação Manual */}
      <form onSubmit={handleManualImport} className="flex flex-col gap-4 border-t border-text-muted/10 pt-5">
        <p className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono">Ou cole o texto manualmente</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-muted font-mono">Título do Texto *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Pequeno Príncipe" 
              className="bg-bg-primary border border-text-muted/20 rounded px-3 py-2 text-sm text-text-main focus:outline-none focus:border-accent-color transition duration-150 font-sans"
              disabled={loading}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-muted font-mono">Autor (Opcional)</label>
            <input 
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Antoine de Saint-Exupéry" 
              className="bg-bg-primary border border-text-muted/20 rounded px-3 py-2 text-sm text-text-main focus:outline-none focus:border-accent-color transition duration-150 font-sans"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-text-muted font-mono font-sans">Conteúdo do Texto *</label>
          <textarea 
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Cole seu texto aqui para iniciar seu treino de digitação..." 
            className="bg-bg-primary border border-text-muted/20 rounded p-3 text-sm text-text-main min-h-[140px] focus:outline-none focus:border-accent-color transition duration-150 font-sans"
            disabled={loading}
            required
          />
        </div>

        <button 
          type="submit"
          disabled={loading || !title.trim() || !rawText.trim()}
          className="bg-accent-color text-bg-primary font-bold rounded py-2.5 px-4 text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition duration-150 font-sans flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Salvar Texto na Biblioteca</span>
        </button>
      </form>
    </div>
  );
}
