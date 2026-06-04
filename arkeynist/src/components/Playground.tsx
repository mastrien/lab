import { useEffect, useRef, useState } from 'react';
import { Pause, ChevronLeft, RotateCcw, AlertTriangle, Search, Compass, X, ChevronRight } from 'lucide-react';
import { db } from '../services/db';
import type { Book } from '../services/db';
import { useTypingEngine } from '../hooks/useTypingEngine';
import type { UserSettings } from './SettingsPanel';

interface PlaygroundProps {
  book: Book;
  initialIndex: number;
  initialTime: number;
  settings: UserSettings;
  onBackToLibrary: () => void;
  onSessionFinish: (stats: {
    wpm: number;
    cpm: number;
    accuracy: number;
    elapsedTime: number;
    totalErrors: number;
    correctCharactersArray: (boolean | null)[];
  }) => void;
}

export default function Playground({
  book,
  initialIndex,
  initialTime,
  settings,
  onBackToLibrary,
  onSessionFinish,
}: PlaygroundProps) {
  const [isFocused, setIsFocused] = useState(true);

  // Estados para o Command Palette de Navegação
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<'search' | 'percentage'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ index: number; snippet: string; percentage: number }[]>([]);
  const [sliderPercentage, setSliderPercentage] = useState(0);

  // Calcula resultados de busca de forma otimizada
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const text = book.rawText.toLowerCase();
    const results: { index: number; snippet: string; percentage: number }[] = [];
    let idx = text.indexOf(query);

    // Limita a 15 resultados para performance fluida no typing
    while (idx !== -1 && results.length < 15) {
      const start = Math.max(0, idx - 30);
      const end = Math.min(book.rawText.length, idx + query.length + 30);
      let snippet = book.rawText.slice(start, end).replace(/\n/g, ' ');
      if (start > 0) snippet = '...' + snippet;
      if (end < book.rawText.length) snippet = snippet + '...';

      const percentage = Math.round((idx / book.rawText.length) * 100);
      results.push({ index: idx, snippet, percentage });
      idx = text.indexOf(query, idx + 1);
    }
    setSearchResults(results);
  }, [searchQuery, book.rawText]);

  // Calcula preview com base no slider
  const targetSliderIndex = Math.floor((sliderPercentage / 100) * book.rawText.length);
  const sliderPreviewStart = Math.max(0, targetSliderIndex - 75);
  const sliderPreviewEnd = Math.min(book.rawText.length, targetSliderIndex + 75);
  let sliderPreviewText = book.rawText.slice(sliderPreviewStart, sliderPreviewEnd).replace(/\n/g, ' ');
  if (sliderPreviewStart > 0) sliderPreviewText = '...' + sliderPreviewText;
  if (sliderPreviewEnd < book.rawText.length) sliderPreviewText = sliderPreviewText + '...';
  
  // Instanciar o motor de digitação
  const engine = useTypingEngine(book.rawText, {
    caseSensitive: settings.caseSensitive,
    punctuationSensitive: settings.punctuationSensitive,
    accentSensitive: settings.accentSensitive ?? true,
  });

  const {
    currentCharIndex,
    correctCharactersArray,
    isTyping,
    isFinished,
    wpm,
    cpm,
    accuracy,
    wpmLast10s,
    accuracyLast10s,
    wpmLast100Words,
    accuracyLast100Words,
    elapsedTime,
    totalErrors,
    resetEngine,
    handleKeyDown,
    pauseSession,
  } = engine;

  const containerRef = useRef<HTMLDivElement>(null);
  const saveIntervalRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const autoscrollContainerRef = useRef<HTMLDivElement>(null);
  const autoscrollInnerRef = useRef<HTMLDivElement>(null);
  const prevStartIndex = useRef<number>(-1);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Reset do chunk tracker quando mudar de modo
  useEffect(() => {
    prevStartIndex.current = -1;
  }, [settings.displayMode]);

  // LERP Loop para Autoscroll extremamente fluido (60+ FPS) sem CSS Transition conflicts
  useEffect(() => {
    if (settings.displayMode !== 'autoscroll') return;

    const lerp = () => {
      if (Math.abs(targetXRef.current - currentXRef.current) > 0.1) {
        currentXRef.current += (targetXRef.current - currentXRef.current) * 0.15; // 0.15 suavidade
        if (autoscrollInnerRef.current) {
          autoscrollInnerRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(lerp);
    };
    rafRef.current = requestAnimationFrame(lerp);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [settings.displayMode]);

  // Scroll cursor view tracking
  useEffect(() => {
    if (cursorRef.current) {
      if (settings.displayMode === 'paginated') {
        cursorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        if (autoscrollContainerRef.current) {
          const containerWidth = autoscrollContainerRef.current.clientWidth;
          const cursorOffset = cursorRef.current.offsetLeft;
          const cursorWidth = cursorRef.current.offsetWidth;
          
          // Target X translation to center the cursor
          const targetX = (containerWidth / 2) - cursorOffset - (cursorWidth / 2);
          
          const chunkSize = settings.chunkSize || 200;
          const currentBlock = Math.floor(currentCharIndex / chunkSize);
          const startBlock = Math.max(0, currentBlock - 1);
          const startIndex = startBlock * chunkSize;

          if (prevStartIndex.current !== -1 && prevStartIndex.current !== startIndex) {
            // Boundary crossed, compensar instantaneamente no currentX para não pular!
            const diff = targetX - targetXRef.current;
            currentXRef.current += diff;
            targetXRef.current = targetX;
            if (autoscrollInnerRef.current) {
              autoscrollInnerRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
            }
          } else {
            if (prevStartIndex.current === -1) {
              // Primeira renderização, pular direto para a posição sem animar
              currentXRef.current = targetX;
              targetXRef.current = targetX;
              if (autoscrollInnerRef.current) {
                autoscrollInnerRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
              }
            } else {
              targetXRef.current = targetX;
            }
          }
          prevStartIndex.current = startIndex;
        }
      }
    }
  }, [currentCharIndex, settings.displayMode, settings.chunkSize]);

  // Inicializar o motor com o progresso salvo
  useEffect(() => {
    resetEngine(book.rawText, initialIndex, initialTime);
  }, [book, initialIndex, initialTime, resetEngine]);

  // Capturar eventos globais de digitação quando focado
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Abre a busca com Ctrl+F ou Ctrl+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'k')) {
        e.preventDefault();
        setIsNavOpen(true);
        pauseSession();
        return;
      }
      // Fecha a busca com Escape
      if (e.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
        containerRef.current?.focus();
        return;
      }
      if (isFocused && !isFinished && !isNavOpen) {
        handleKeyDown(e);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFocused, isFinished, isNavOpen, handleKeyDown, pauseSession]);

  // Focar o container ao montar
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // Salvamento automático do progresso no IndexedDB a cada 5 segundos se estiver digitando
  useEffect(() => {
    if (isTyping && !isFinished) {
      saveIntervalRef.current = window.setInterval(async () => {
        try {
          await db.sessionStates.put({
            bookId: book.id!,
            currentCharIndex,
            elapsedTime,
            lastActive: Date.now(),
          });
        } catch (err) {
          console.error('Erro no autosave:', err);
        }
      }, 5000);
    }

    return () => {
      if (saveIntervalRef.current) {
        window.clearInterval(saveIntervalRef.current);
      }
    };
  }, [isTyping, isFinished, currentCharIndex, elapsedTime, book.id]);

  // Ação de Pausar e Voltar (Salva o progresso final)
  const handlePauseAndExit = async () => {
    pauseSession();
    try {
      await db.sessionStates.put({
        bookId: book.id!,
        currentCharIndex,
        elapsedTime,
        lastActive: Date.now(),
      });
      onBackToLibrary();
    } catch (err) {
      console.error('Erro ao salvar progresso de saída:', err);
      onBackToLibrary();
    }
  };

  // Reiniciar a sessão a partir do início ou da posição inicial do treino
  const handleRestart = () => {
    if (window.confirm('Deseja reiniciar a leitura deste texto a partir do início?')) {
      resetEngine(book.rawText, 0, 0);
    }
  };

  // Se terminar o texto, salvar estatísticas no banco e disparar evento de conclusão
  const handleFinish = async () => {
    pauseSession();
    try {
      // Salvar progresso completo
      await db.sessionStates.put({
        bookId: book.id!,
        currentCharIndex,
        elapsedTime,
        lastActive: Date.now(),
      });

      // Gravar histórico de log de treino
      await db.logs.add({
        bookId: book.id!,
        timestamp: Date.now(),
        wpm,
        cpm,
        accuracy,
        duration: Math.round(elapsedTime / 1000),
      });

      onSessionFinish({
        wpm,
        cpm,
        accuracy,
        elapsedTime,
        totalErrors,
        correctCharactersArray,
      });
    } catch (err) {
      console.error('Erro ao salvar estatísticas de fim de treino:', err);
      onSessionFinish({
        wpm,
        cpm,
        accuracy,
        elapsedTime,
        totalErrors,
        correctCharactersArray,
      });
    }
  };

  useEffect(() => {
    if (isFinished) {
      handleFinish();
    }
  }, [isFinished]);

  // Classes dinâmicas de estilo de fonte e tamanho
  const fontClass = settings.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
  const sizeClass = settings.fontSize;

  // --- RENDERIZADORES DE VISUALIZAÇÃO ---

  // 1. Renderização em Modo Autoscroll (Linha Única)
  const renderAutoscroll = () => {
    const blockSize = settings.chunkSize || 200;
    const currentBlock = Math.floor(currentCharIndex / blockSize);
    const startBlock = Math.max(0, currentBlock - 1);
    const endBlock = currentBlock + 1;
    
    const startIndex = startBlock * blockSize;
    const endIndex = Math.min(book.rawText.length, (endBlock + 1) * blockSize);

    const viewSlice = book.rawText.slice(startIndex, endIndex);

    return (
      <div 
        ref={autoscrollContainerRef}
        className={`w-full text-left whitespace-nowrap py-12 px-4 select-none ${fontClass} ${sizeClass} tracking-wide leading-relaxed overflow-hidden relative border border-text-muted/10 rounded-xl bg-bg-primary/40`}
      >
        <div 
          ref={autoscrollInnerRef}
          className="relative inline-block will-change-transform"
        >
          {startBlock > 0 && <span className="text-text-muted/40 mr-2">...</span>}
        {viewSlice.split('').map((char, localIndex) => {
          const index = startIndex + localIndex;
          const isCorrect = correctCharactersArray[index];
          
          let charColor = 'text-text-muted/65';
          if (isCorrect === true) charColor = 'text-text-correct font-semibold';
          if (isCorrect === false) charColor = 'text-text-error font-semibold bg-text-error/10 border-b border-text-error';

          const isCursor = index === currentCharIndex;
          
          return (
            <span key={index} className={`relative inline ${charColor}`} ref={isCursor ? cursorRef : null}>
              {isCursor && (
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-color caret-pulse-anim z-10" style={{ height: '1.25em', top: '10%' }}></span>
              )}
              {char === '\n' ? '↵ ' : char}
            </span>
          );
        })}
        {endIndex < book.rawText.length && <span className="text-text-muted/40 ml-2">...</span>}
        </div>
      </div>
    );
  };

  // 2. Renderização em Modo Página Completa (Parágrafos)
  const renderPaginated = () => {
    // Implementar chunking em blocos de caracteres para performance
    const blockSize = settings.chunkSize || 200;
    const currentBlock = Math.floor(currentCharIndex / blockSize);
    const startBlock = Math.max(0, currentBlock - 1);
    const endBlock = currentBlock + 1;
    
    const startIndex = startBlock * blockSize;
    const endIndex = Math.min(book.rawText.length, (endBlock + 1) * blockSize);

    const viewSlice = book.rawText.slice(startIndex, endIndex);

    return (
      <div className={`w-full max-h-[420px] overflow-y-auto pr-2 py-6 select-none ${fontClass} ${sizeClass} leading-relaxed tracking-wide text-justify border border-text-muted/10 rounded-xl bg-bg-primary/30 px-6 scroll-smooth`}>
        {startBlock > 0 && <div className="text-text-muted/40 text-center py-4">...</div>}
        {viewSlice.split('').map((char, localIndex) => {
          const index = startIndex + localIndex;
          const isCorrect = correctCharactersArray[index];
          let charColor = 'text-text-muted/65'; // pendente
          if (isCorrect === true) charColor = 'text-text-correct';
          if (isCorrect === false) charColor = 'text-text-error font-semibold bg-text-error/10 border-b border-text-error';
          
          // Se for quebra de linha
          const isNewline = char === '\n';
          const isCursor = index === currentCharIndex;

          return (
            <span key={index} className={`relative inline ${charColor}`} ref={isCursor ? cursorRef : null}>
              {isCursor && (
                <span className="absolute -left-[1px] top-[15%] w-[2px] h-[75%] bg-accent-color caret-pulse-anim z-10"></span>
              )}
              {isNewline ? (
                <span className="text-text-muted/20 mr-1">↵<br /></span>
              ) : (
                char
              )}
            </span>
          );
        })}
        {endIndex < book.rawText.length && <div className="text-text-muted/40 text-center py-4">...</div>}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Menu Superior de Ações */}
      <div className="flex items-center justify-between border-b border-text-muted/10 pb-4">
        <button 
          onClick={handlePauseAndExit}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition duration-150 cursor-pointer font-sans"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar para Biblioteca</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              pauseSession();
              setIsNavOpen(true);
            }}
            title="Buscar e Pular Trecho (Ctrl+F)"
            className="flex items-center gap-1.5 p-2 text-text-muted hover:text-text-main hover:bg-bg-secondary rounded-lg transition duration-150 cursor-pointer font-sans"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs font-bold">Pular/Buscar</span>
          </button>

          <button
            onClick={handleRestart}
            title="Reiniciar Progresso"
            className="p-2 text-text-muted hover:text-text-main hover:bg-bg-secondary rounded-lg transition duration-150 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handlePauseAndExit}
            className="flex items-center gap-2 bg-accent-color/10 hover:bg-accent-color text-accent-color hover:text-bg-primary font-semibold text-xs py-1.5 px-3 rounded-lg transition duration-150 cursor-pointer font-sans"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pausar e Salvar</span>
          </button>
        </div>
      </div>

      {/* Título do Livro / Progresso Geral */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-main font-sans mt-0 mb-1">{book.title}</h1>
        {book.author && <p className="text-sm text-text-muted font-sans">por {book.author}</p>}
        
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-text-muted mt-3">
          <span>Progresso no Texto: {currentCharIndex.toLocaleString()} / {book.rawText.length.toLocaleString()} caracteres</span>
          <span>•</span>
          <span>{((currentCharIndex / book.rawText.length) * 100).toFixed(1)}% concluído</span>
        </div>
      </div>

      {/* Painel de Digitação Principal */}
      <div 
        ref={containerRef}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative outline-none cursor-text focus:ring-1 focus:ring-accent-color/20 rounded-xl"
      >
        {/* Renderizador Ativo */}
        {settings.displayMode === 'autoscroll' ? renderAutoscroll() : renderPaginated()}

        {/* Modal de perda de foco (Anti-distração) */}
        {!isFocused && !isFinished && (
          <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center gap-3 z-20 transition duration-150 animate-fade-in">
            <AlertTriangle className="w-10 h-10 text-accent-color" />
            <h3 className="text-lg font-bold text-text-main font-sans">Clique para focar no treino</h3>
            <p className="text-xs text-text-muted font-sans">A digitação e a contagem de tempo estão pausadas enquanto a janela estiver desfocada.</p>
            <button 
              onClick={() => containerRef.current?.focus()}
              className="bg-accent-color text-bg-primary font-bold text-xs px-4 py-2 rounded hover:opacity-90 transition duration-150 cursor-pointer font-sans"
            >
              Focar Tela
            </button>
          </div>
        )}
      </div>

      {/* Painel de Métricas e Estatísticas em Tempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* Velocidade */}
        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl flex flex-col gap-1 items-center justify-center text-center">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Velocidade Geral</span>
          <span className="text-3xl font-extrabold text-accent-color">{wpm} <span className="text-xs font-normal text-text-muted">WPM</span></span>
          <span className="text-[10px] text-text-muted mt-1">Velocidade Instantânea: {cpm} CPM</span>
        </div>

        {/* Acurácia */}
        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl flex flex-col gap-1 items-center justify-center text-center">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Precisão Geral</span>
          <span className="text-3xl font-extrabold text-text-main">{accuracy.toFixed(1)}<span className="text-xs font-normal text-text-muted">%</span></span>
          <span className="text-[10px] text-text-muted mt-1">Total de Erros: {totalErrors}</span>
        </div>

        {/* Janela Deslizante (Stats Recentes) */}
        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl flex flex-col gap-2 justify-center font-sans">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold font-mono text-center mb-1">Estatísticas Recentes</span>
          
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Últimos 10 seg:</span>
            <span className="font-bold text-text-main">{wpmLast10s} WPM <span className="text-text-muted">|</span> {accuracyLast10s}%</span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Últimas 100 pal:</span>
            <span className="font-bold text-text-main">{wpmLast100Words} WPM <span className="text-text-muted">|</span> {accuracyLast100Words}%</span>
          </div>
        </div>
      </div>

      {/* Dica Ergonomica */}
      <div className="text-center text-xs text-text-muted font-sans">
        {isTyping ? (
          <p className="animate-pulse">Sessão ativa... Pressione Backspace para apagar e corrigir erros se necessário.</p>
        ) : (
          <p>Digite qualquer caractere para iniciar o cronômetro do treino de digitação. <span className="font-mono text-[10px] bg-bg-secondary border border-text-muted/15 px-1 py-0.5 rounded text-text-muted">Ctrl+F</span> para pular trecho.</p>
        )}
      </div>

      {/* Command Palette / Modal de Navegação Avançada */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-bg-primary/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary border border-text-muted/15 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh] animate-scale-up">
            
            {/* Header do Modal */}
            <div className="p-4 border-b border-text-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-accent-color" />
                <h3 className="text-base font-bold text-text-main font-sans">Navegação e Busca</h3>
              </div>
              <button 
                onClick={() => {
                  setIsNavOpen(false);
                  containerRef.current?.focus();
                }}
                className="p-1.5 hover:bg-bg-primary/50 text-text-muted hover:text-text-main rounded-lg transition duration-150 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector de Abas */}
            <div className="flex border-b border-text-muted/10 text-sm font-sans">
              <button 
                onClick={() => setActiveNavTab('search')}
                className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 font-semibold transition duration-150 cursor-pointer ${activeNavTab === 'search' ? 'border-accent-color text-accent-color' : 'border-transparent text-text-muted hover:text-text-main'}`}
              >
                <Search className="w-4 h-4" />
                <span>Buscar Texto</span>
              </button>
              <button 
                onClick={() => setActiveNavTab('percentage')}
                className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 font-semibold transition duration-150 cursor-pointer ${activeNavTab === 'percentage' ? 'border-accent-color text-accent-color' : 'border-transparent text-text-muted hover:text-text-main'}`}
              >
                <Compass className="w-4 h-4" />
                <span>Pular por %</span>
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {activeNavTab === 'search' ? (
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                    <input 
                      type="text"
                      placeholder="Busque por capítulos, frases ou trechos... (mín. 2 letras)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-bg-primary/50 border border-text-muted/15 rounded-xl py-2 pl-9 pr-4 text-sm text-text-main placeholder-text-muted/60 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color/25 font-sans"
                      autoFocus
                    />
                  </div>

                  {/* Resultados */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    {searchQuery.trim().length >= 2 && searchResults.length === 0 ? (
                      <p className="text-center text-xs text-text-muted py-6 font-sans">Nenhum resultado encontrado para "{searchQuery}"</p>
                    ) : searchResults.length > 0 ? (
                      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                        <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider font-semibold">Ocorrências encontradas</span>
                        {searchResults.map((result, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              resetEngine(book.rawText, result.index, elapsedTime);
                              setIsNavOpen(false);
                              containerRef.current?.focus();
                            }}
                            className="text-left w-full p-3 rounded-xl bg-bg-primary/30 hover:bg-accent-color/10 border border-text-muted/10 hover:border-accent-color/30 flex items-center justify-between gap-3 group transition duration-150 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-text-main font-mono leading-relaxed truncate group-hover:text-accent-color transition duration-150">
                                {result.snippet}
                              </p>
                              <span className="text-[9px] text-text-muted font-mono block mt-1">Caractere nº {result.index.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-xs font-bold font-mono text-accent-color bg-accent-color/10 px-2 py-0.5 rounded-full">{result.percentage}%</span>
                              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-color transition duration-150" />
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-xs text-text-muted py-6 font-sans">Digite acima para buscar trechos e capítulos no livro.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 py-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-mono text-text-muted">
                      <span>Início (0%)</span>
                      <span className="text-accent-color font-bold text-sm bg-accent-color/10 px-2 py-0.5 rounded-full">{sliderPercentage}%</span>
                      <span>Fim (100%)</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPercentage}
                      onChange={(e) => setSliderPercentage(parseInt(e.target.value, 10))}
                      className="w-full h-1.5 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-color"
                    />
                  </div>

                  {/* Preview do Trecho Selecionado */}
                  <div className="bg-bg-primary/40 border border-text-muted/10 rounded-xl p-4 flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider font-semibold">Visualização do trecho</span>
                    <p className="text-xs text-text-muted font-mono leading-relaxed text-justify line-clamp-4 min-h-[4.5rem]">
                      {sliderPreviewText}
                    </p>
                    <span className="text-[9px] text-text-muted font-mono block mt-1">Ponto de partida estimado: caractere nº {targetSliderIndex.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      resetEngine(book.rawText, targetSliderIndex, elapsedTime);
                      setIsNavOpen(false);
                      containerRef.current?.focus();
                    }}
                    className="w-full bg-accent-color hover:opacity-90 text-bg-primary font-bold text-sm py-2.5 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-2 font-sans"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Pular para esta Posição ({sliderPercentage}%)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Rodapé do Modal */}
            <div className="p-3 bg-bg-primary/30 border-t border-text-muted/10 text-center text-[10px] text-text-muted font-sans">
              <span>Dica: Use as teclas <kbd className="font-mono bg-bg-secondary border border-text-muted/20 px-1 rounded">Esc</kbd> para fechar ou <kbd className="font-mono bg-bg-secondary border border-text-muted/20 px-1 rounded">Enter</kbd> nos resultados para navegar.</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
