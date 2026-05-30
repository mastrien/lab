import { useEffect, useState } from 'react';
import { Book as BookIcon, Play, Trash2, Calendar, FileText } from 'lucide-react';
import { db } from '../services/db';
import type { Book, SessionState } from '../services/db';

interface BookListProps {
  onSelectBook: (book: Book, startIndex: number, savedTime: number) => void;
  refreshTrigger: number;
}

interface BookWithProgress extends Book {
  progress?: SessionState;
}

export default function BookList({ onSelectBook, refreshTrigger }: BookListProps) {
  const [books, setBooks] = useState<BookWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const allBooks = await db.books.toArray();
      const allStates = await db.sessionStates.toArray();
      
      const mapped: BookWithProgress[] = allBooks.map(book => {
        const progress = allStates.find(state => state.bookId === book.id);
        return { ...book, progress };
      });

      // Ordenar por mais recentemente acessado, ou por data de criação
      mapped.sort((a, b) => {
        const timeA = a.progress?.lastActive || a.createdAt;
        const timeB = b.progress?.lastActive || b.createdAt;
        return timeB - timeA;
      });

      setBooks(mapped);
    } catch (err) {
      console.error('Erro ao ler biblioteca local:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const handleDeleteBook = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza de que deseja excluir este texto e todo o seu progresso de treino?')) {
      return;
    }

    try {
      await db.books.delete(id);
      await db.sessionStates.delete(id);
      await db.logs.where('bookId').equals(id).delete();
      fetchBooks();
    } catch (err) {
      console.error('Erro ao excluir livro:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-text-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-color mb-3"></div>
        <p className="text-sm font-mono">Carregando Biblioteca...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="bg-bg-secondary/40 border border-dashed border-text-muted/30 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
        <BookIcon className="w-12 h-12 text-text-muted/60" />
        <div>
          <h3 className="text-lg font-bold text-text-main font-sans">Sua biblioteca está vazia</h3>
          <p className="text-sm text-text-muted mt-1 max-w-sm font-sans">Use o painel ao lado para colar textos ou enviar arquivos TXT, MD e PDF para começar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-text-muted/10 pb-3">
        <h2 className="text-xl font-bold text-text-main font-sans flex items-center gap-2">
          <BookIcon className="w-5 h-5 text-accent-color" />
          <span>Sua Biblioteca ({books.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[620px] overflow-y-auto pr-1">
        {books.map((book) => {
          const charIndex = book.progress?.currentCharIndex || 0;
          const totalChars = book.rawText.length;
          const progressPercent = totalChars > 0 ? (charIndex / totalChars) * 100 : 0;
          const formattedDate = new Date(book.createdAt).toLocaleDateString('pt-BR');
          
          return (
            <div 
              key={book.id}
              onClick={() => onSelectBook(book, charIndex, book.progress?.elapsedTime || 0)}
              className="group bg-bg-secondary hover:bg-bg-secondary/80 border border-text-muted/15 hover:border-accent-color/40 p-4 rounded-xl cursor-pointer transition duration-150 flex items-center justify-between gap-4"
            >
              <div className="flex-grow min-w-0 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-main group-hover:text-accent-color truncate text-base font-sans">
                    {book.title}
                  </span>
                  {book.author && (
                    <span className="text-xs text-text-muted truncate font-sans">
                      por {book.author}
                    </span>
                  )}
                </div>

                {/* Barra de Progresso */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-grow bg-bg-primary h-2 rounded-full overflow-hidden border border-text-muted/5">
                    <div 
                      className="bg-accent-color h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold shrink-0 text-text-main">
                    {progressPercent.toFixed(1)}%
                  </span>
                </div>

                {/* Metadados */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-text-muted font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{totalChars.toLocaleString()} caracteres</span>
                  </span>
                  {book.progress && (
                    <span className="text-accent-color/80">
                      Parado em: {charIndex.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => handleDeleteBook(book.id!, e)}
                  title="Excluir Texto"
                  className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition duration-150 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectBook(book, charIndex, book.progress?.elapsedTime || 0)}
                  title={book.progress ? "Continuar Leitura/Treino" : "Iniciar Leitura/Treino"}
                  className="p-2 bg-accent-color/10 hover:bg-accent-color text-accent-color hover:text-bg-primary rounded-lg transition duration-150 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
