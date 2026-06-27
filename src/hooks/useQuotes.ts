import { useState, useCallback, useEffect } from 'react';
import type { Quote } from '../types';
import { quotes, getRandomIndex } from '../data/quotes';
import { useLocalStorage } from './useLocalStorage';

interface UseQuotesReturn {
  currentQuote: Quote | null;
  currentIndex: number;
  generatedCount: number;
  favorites: string[];
  favoriteQuotes: Quote[];
  isLoading: boolean;
  nextQuote: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
  totalQuotes: number;
}

export function useQuotes(): UseQuotesReturn {
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getRandomIndex(quotes.length)
  );
  const [generatedCount, setGeneratedCount] = useState<number>(1);
  const [favorites, setFavorites] = useLocalStorage<string[]>('rqq_favorites', []);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate brief loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const currentQuote = quotes[currentIndex] || null;

  const nextQuote = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const newIndex = getRandomIndex(quotes.length, currentIndex);
      setCurrentIndex(newIndex);
      setGeneratedCount((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [currentIndex]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fav) => fav !== id));
    },
    [setFavorites]
  );

  const favoriteQuotes = favorites
    .map((id) => quotes.find((q) => q.id === id))
    .filter((q): q is Quote => q !== undefined);

  return {
    currentQuote,
    currentIndex,
    generatedCount,
    favorites,
    favoriteQuotes,
    isLoading,
    nextQuote,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    totalQuotes: quotes.length,
  };
}
