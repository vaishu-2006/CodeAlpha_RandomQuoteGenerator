export interface Quote {
  id: string;
  text: string;
  author: string;
  tags?: string[];
}

export type Theme = 'light' | 'dark';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface AppState {
  quotes: Quote[];
  currentIndex: number;
  generatedCount: number;
  favorites: string[];
  isLoading: boolean;
  error: string | null;
}
