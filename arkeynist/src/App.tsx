import { useState, useEffect } from 'react';
import { Keyboard, Flame } from 'lucide-react';
import BookList from './components/BookList';
import ImportPanel from './components/ImportPanel';
import SettingsPanel from './components/SettingsPanel';
import type { UserSettings } from './components/SettingsPanel';
import Playground from './components/Playground';
import StatsSummary from './components/StatsSummary';
import type { Book } from './services/db';

export default function App() {
  // 1. Estado de Configurações
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('arkeynist_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      theme: 'dark-slate',
      caseSensitive: true,
      punctuationSensitive: true,
      accentSensitive: true,
      fontSize: 'text-lg',
      displayMode: 'paginated',
      fontFamily: 'sans',
      chunkSize: 200,
    };
  });

  // Aplicar tema dinamicamente no elemento root HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    localStorage.setItem('arkeynist_settings', JSON.stringify(settings));
  }, [settings]);

  // 2. Estados de Navegação e Sessão
  const [activeScreen, setActiveScreen] = useState<'library' | 'typing' | 'summary'>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [savedTime, setSavedTime] = useState(0);
  
  // Estatísticas finais
  const [sessionStats, setSessionStats] = useState<{
    wpm: number;
    cpm: number;
    accuracy: number;
    elapsedTime: number;
    totalErrors: number;
    correctCharactersArray: (boolean | null)[];
  } | null>(null);

  // Trigger para forçar recarregamento do BookList quando novos itens forem salvos
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 3. Ofensiva (Streak)
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const checkStreak = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastActiveStr = localStorage.getItem('arkeynist_last_active_date');
      const savedStreakStr = localStorage.getItem('arkeynist_streak');
      let currentStreak = savedStreakStr ? parseInt(savedStreakStr, 10) : 1;

      if (lastActiveStr) {
        const lastActiveDate = new Date(lastActiveStr);
        lastActiveDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - lastActiveDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1; // quebrou o streak
        }
        // Se diffDays for 0, o dia é o mesmo, mantém o streak atual
      } else {
        currentStreak = 1;
      }

      localStorage.setItem('arkeynist_last_active_date', today.toISOString());
      localStorage.setItem('arkeynist_streak', currentStreak.toString());
      setStreak(currentStreak);
    };

    checkStreak();
  }, []);

  const handleSelectBook = (book: Book, startIdx: number, elapsed: number) => {
    setSelectedBook(book);
    setStartIndex(startIdx);
    setSavedTime(elapsed);
    setActiveScreen('typing');
  };

  const handleSessionFinish = (stats: typeof sessionStats) => {
    setSessionStats(stats);
    setActiveScreen('summary');
    setRefreshTrigger(prev => prev + 1); // atualiza a biblioteca
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-main flex flex-col font-sans transition duration-200">
      
      {/* Top Header Barra de Navegação */}
      <header className="border-b border-text-muted/15 bg-bg-secondary/40 backdrop-blur-[2px] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveScreen('library')}>
            <div className="bg-accent-color text-bg-primary p-2 rounded-lg shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-text-main font-sans">Arkeynist</span>
              <span className="text-[10px] text-text-muted font-mono block -mt-1 uppercase tracking-wider font-semibold">typing reader</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Widget de Streak */}
            <div 
              title={`Ofensiva de Treino: ${streak} dia(s) consecutivo(s)`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold"
            >
              <Flame className="w-4 h-4 fill-current shrink-0 animate-bounce" />
              <span>{streak}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {activeScreen === 'library' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Coluna Esquerda: Listagem de Livros e Progresso */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <BookList 
                onSelectBook={handleSelectBook} 
                refreshTrigger={refreshTrigger} 
              />
            </div>

            {/* Coluna Direita: Importação e Configurações */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ImportPanel 
                onImportSuccess={() => setRefreshTrigger(prev => prev + 1)} 
              />
              <SettingsPanel 
                settings={settings} 
                onUpdateSettings={setSettings} 
              />
            </div>

          </div>
        )}

        {activeScreen === 'typing' && selectedBook && (
          <Playground
            book={selectedBook}
            initialIndex={startIndex}
            initialTime={savedTime}
            settings={settings}
            onBackToLibrary={() => {
              setActiveScreen('library');
              setRefreshTrigger(prev => prev + 1);
            }}
            onSessionFinish={handleSessionFinish}
          />
        )}

        {activeScreen === 'summary' && selectedBook && sessionStats && (
          <StatsSummary
            bookTitle={selectedBook.title}
            stats={sessionStats}
            onClose={() => {
              setActiveScreen('library');
              setSelectedBook(null);
              setSessionStats(null);
            }}
          />
        )}
      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-text-muted/10 py-6 text-center text-xs text-text-muted">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <span>Arkeynist MVP © {new Date().getFullYear()}</span>
          <span className="flex items-center gap-1">
            <span>Privacidade total: dados processados e mantidos apenas localmente</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
