import { useState, useEffect, useCallback, useRef } from 'react';

export interface KeyPressRecord {
  timestamp: number;
  isCorrect: boolean;
}

export interface TypingEngineConfig {
  caseSensitive: boolean;
  punctuationSensitive: boolean;
  accentSensitive: boolean;
}

export interface UseTypingEngineReturn {
  currentCharIndex: number;
  correctCharactersArray: (boolean | null)[];
  isTyping: boolean;
  isFinished: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
  wpmLast10s: number;
  accuracyLast10s: number;
  wpmLast100Words: number;
  accuracyLast100Words: number;
  elapsedTime: number; // em milissegundos
  totalErrors: number;
  resetEngine: (newText: string, startIndex?: number, savedTime?: number) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  startSession: () => void;
  pauseSession: () => void;
}

export function useTypingEngine(
  text: string,
  config: TypingEngineConfig
): UseTypingEngineReturn {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctCharactersArray, setCorrectCharactersArray] = useState<(boolean | null)[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0);

  // Timings
  const [elapsedTime, setElapsedTime] = useState(0); // em milissegundos
  const startTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);

  // Registro para métricas deslizantes
  const keypressRecordsRef = useRef<KeyPressRecord[]>([]);

  // Resetar o motor
  const resetEngine = useCallback((newText: string, startIndex = 0, savedTime = 0) => {
    setCurrentCharIndex(startIndex);
    setCorrectCharactersArray(new Array(newText.length).fill(null));
    setIsTyping(false);
    setIsFinished(false);
    setTotalErrors(0);
    setElapsedTime(savedTime);
    accumulatedTimeRef.current = savedTime;
    startTimeRef.current = null;
    keypressRecordsRef.current = [];

    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Parar o timer
  const pauseSession = useCallback(() => {
    if (isTyping && timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      if (startTimeRef.current) {
        accumulatedTimeRef.current += Date.now() - startTimeRef.current;
      }
      startTimeRef.current = null;
      setIsTyping(false);
    }
  }, [isTyping]);

  // Iniciar o timer
  const startSession = useCallback(() => {
    if (!isTyping && !isFinished && text.length > 0) {
      setIsTyping(true);
      startTimeRef.current = Date.now();
      timerIntervalRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const currentSessionTime = Date.now() - startTimeRef.current;
          setElapsedTime(accumulatedTimeRef.current + currentSessionTime);
        }
      }, 100);
    }
  }, [isTyping, isFinished, text.length]);

  // Limpar timer no unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Auxiliar para checar igualdade de caractere baseada no rigor configurado
  const validateMatch = useCallback((typed: string, target: string): boolean => {
    let t = typed;
    let g = target;

    if (!config.caseSensitive) {
      t = t.toLowerCase();
      g = g.toLowerCase();
    }

    if (!config.accentSensitive) {
      t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      g = g.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    if (!config.punctuationSensitive) {
      // Se desativada a pontuação e o caractere alvo for pontuação, aceita qualquer tecla
      const isPunct = /[\.,\/#!$%\^&\*;:{}=\-_`~()?"'–—\[\]{}]/g.test(g);
      if (isPunct) return true;
    }

    return t === g;
  }, [config]);

  // Capturar teclas pressionadas
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFinished || text.length === 0) return;

    // Impedir scroll de tela ao apertar espaço
    if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault();
    }

    // Iniciar sessão no primeiro caractere digitado
    if (!isTyping && e.key.length === 1) {
      startSession();
    }

    // 1. Tecla BACKSPACE
    if (e.key === 'Backspace') {
      if (e.ctrlKey) {
        let newIndex = currentCharIndex;
        // Pular espaços/quebras de linha para trás
        while (newIndex > 0 && (text[newIndex - 1] === ' ' || text[newIndex - 1] === '\n')) {
          newIndex--;
        }
        // Pular os caracteres da palavra
        while (newIndex > 0 && text[newIndex - 1] !== ' ' && text[newIndex - 1] !== '\n') {
          newIndex--;
        }

        if (newIndex < currentCharIndex) {
          setCurrentCharIndex(newIndex);
          setCorrectCharactersArray(prev => {
            const next = [...prev];
            for (let i = newIndex; i < currentCharIndex; i++) {
              next[i] = null;
            }
            return next;
          });
        }
      } else {
        if (currentCharIndex > 0) {
          const newIndex = currentCharIndex - 1;
          setCurrentCharIndex(newIndex);
          setCorrectCharactersArray(prev => {
            const next = [...prev];
            next[newIndex] = null;
            return next;
          });
        }
      }
      return;
    }

    // Ignorar teclas de controle (Shift, Ctrl, Alt, CapsLock, etc.)
    let typedKey = e.key;
    if (typedKey === 'Enter') {
      typedKey = '\n';
    }

    if (typedKey.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    // 2. Teclas Normais de Escrita
    if (currentCharIndex < text.length) {
      const targetChar = text[currentCharIndex];
      const isCorrect = validateMatch(typedKey, targetChar);

      if (!isCorrect) {
        setTotalErrors(prev => prev + 1);
      }

      setCorrectCharactersArray(prev => {
        const next = [...prev];
        next[currentCharIndex] = isCorrect;
        return next;
      });

      // Registrar tecla no histórico deslizante
      keypressRecordsRef.current.push({
        timestamp: Date.now(),
        isCorrect,
      });

      // Avançar cursor
      const nextIndex = currentCharIndex + 1;
      setCurrentCharIndex(nextIndex);

      // Finalizar se atingir o fim
      if (nextIndex >= text.length) {
        setIsFinished(true);
        pauseSession();
      }
    }
  }, [currentCharIndex, text, isTyping, isFinished, validateMatch, startSession, pauseSession]);

  // --- MÉTRIQUES GERAIS ---
  const timeInMinutes = elapsedTime > 0 ? elapsedTime / 60000 : 0;
  
  // Total de caracteres digitados corretamente
  const correctCount = correctCharactersArray.filter(v => v === true).length;
  const incorrectCount = correctCharactersArray.filter(v => v === false).length;
  const totalTyped = correctCount + incorrectCount;

  const wpm = timeInMinutes > 0 ? (correctCount / 5) / timeInMinutes : 0;
  const cpm = timeInMinutes > 0 ? correctCount / timeInMinutes : 0;
  const accuracy = totalTyped > 0 ? (correctCount / totalTyped) * 100 : 100;

  // --- MÉTRIQUES DESLIZANTES ---
  
  // 1. Últimos 10 Segundos
  const [sliding10s, setSliding10s] = useState({ wpm: 0, accuracy: 100 });
  
  // 2. Últimas 100 Palavras (aproximadamente 500 caracteres)
  const [sliding100Words, setSliding100Words] = useState({ wpm: 0, accuracy: 100 });

  const currentMetricsRef = useRef({ wpm, accuracy });
  useEffect(() => {
    currentMetricsRef.current = { wpm, accuracy };
  }, [wpm, accuracy]);

  useEffect(() => {
    if (!isTyping) {
      setSliding10s({ wpm: currentMetricsRef.current.wpm, accuracy: currentMetricsRef.current.accuracy });
      setSliding100Words({ wpm: currentMetricsRef.current.wpm, accuracy: currentMetricsRef.current.accuracy });
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const records = keypressRecordsRef.current;

      // Calcular janela de 10 segundos
      const tenSecAgo = now - 10000;
      const records10s = records.filter(r => r.timestamp >= tenSecAgo);
      const correct10s = records10s.filter(r => r.isCorrect).length;
      const total10s = records10s.length;

      // 10s = 1/6 minutos. WPM = (correct / 5) / (1/6) = correct * 1.2
      const wpm10s = correct10s * 1.2;
      const acc10s = total10s > 0 ? (correct10s / total10s) * 100 : 100;

      setSliding10s({
        wpm: parseFloat(wpm10s.toFixed(1)),
        accuracy: parseFloat(acc10s.toFixed(1)),
      });

      // Calcular janela das últimas 100 palavras (500 caracteres digitados)
      const last500Records = records.slice(-500);
      if (last500Records.length >= 10) {
        const firstTimestamp = last500Records[0].timestamp;
        const lastTimestamp = last500Records[last500Records.length - 1].timestamp;
        const durationMs = lastTimestamp - firstTimestamp;
        
        if (durationMs > 1000) {
          const durationMin = durationMs / 60000;
          const correct500 = last500Records.filter(r => r.isCorrect).length;
          const wpm500 = (correct500 / 5) / durationMin;
          const acc500 = (correct500 / last500Records.length) * 100;

          setSliding100Words({
            wpm: parseFloat(wpm500.toFixed(1)),
            accuracy: parseFloat(acc500.toFixed(1)),
          });
        }
      } else {
        setSliding100Words({
          wpm: parseFloat(currentMetricsRef.current.wpm.toFixed(1)),
          accuracy: parseFloat(currentMetricsRef.current.accuracy.toFixed(1)),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTyping]);

  return {
    currentCharIndex,
    correctCharactersArray,
    isTyping,
    isFinished,
    wpm: parseFloat(wpm.toFixed(1)),
    cpm: Math.round(cpm),
    accuracy: parseFloat(accuracy.toFixed(1)),
    wpmLast10s: sliding10s.wpm,
    accuracyLast10s: sliding10s.accuracy,
    wpmLast100Words: sliding100Words.wpm,
    accuracyLast100Words: sliding100Words.accuracy,
    elapsedTime,
    totalErrors,
    resetEngine,
    handleKeyDown,
    startSession,
    pauseSession,
  };
}
