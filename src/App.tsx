import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToastContext } from './context/ToastContext';
import { useQuotes } from './hooks/useQuotes';
import { Header } from './components/Header';
import { QuoteCard } from './components/QuoteCard';
import { Controls } from './components/Controls';
import { Footer } from './components/Footer';
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/Toast';
import { FavoritesList } from './components/FavoritesList';
import { ShareSheet } from './components/ShareSheet';

function QuoteApp() {
  const {
    currentQuote,
    currentIndex,
    generatedCount,
    favoriteQuotes,
    isLoading,
    nextQuote,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    totalQuotes,
  } = useQuotes();

  const { toasts, removeToast } = useToastContext();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleToggleFavorite = () => {
    if (currentQuote) {
      toggleFavorite(currentQuote.id);
    }
  };

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Header
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favoriteQuotes.length}
      />

      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12">
        <QuoteCard
          quote={currentQuote}
          isLoading={isLoading}
          currentIndex={currentIndex}
          totalQuotes={totalQuotes}
          generatedCount={generatedCount}
        />
        <Controls
          quote={currentQuote}
          isLoading={isLoading}
          onNextQuote={nextQuote}
          onShare={() => setIsShareOpen(true)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={currentQuote ? isFavorite(currentQuote.id) : false}
        />
      </main>

      <Footer />

      {/* Favorites Modal */}
      <Modal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        title="Favorite Quotes"
      >
        <FavoritesList
          quotes={favoriteQuotes}
          onRemove={handleRemoveFavorite}
        />
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Share Quote"
      >
        {currentQuote && (
          <ShareSheet
            quote={currentQuote}
            onClose={() => setIsShareOpen(false)}
          />
        )}
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <QuoteApp />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
