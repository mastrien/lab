import Dexie, { type Table } from 'dexie';

export interface Book {
  id?: number;
  title: string;
  author?: string;
  rawText: string;
  createdAt: number;
}

export interface SessionState {
  bookId: number;
  currentCharIndex: number;
  elapsedTime: number; // em milissegundos
  lastActive: number;  // timestamp de ordenação
}

export interface TrainingLog {
  id?: number;
  bookId: number;
  timestamp: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  duration: number; // em segundos
}

export class ArkeynistDatabase extends Dexie {
  books!: Table<Book, number>;
  sessionStates!: Table<SessionState, number>; // chave primária é bookId
  logs!: Table<TrainingLog, number>;

  constructor() {
    super('ArkeynistDatabase');
    this.version(1).stores({
      books: '++id, title, createdAt',
      sessionStates: 'bookId, lastActive',
      logs: '++id, bookId, timestamp',
    });
  }
}

export const db = new ArkeynistDatabase();
export default db;
