# Quotely - Random Quote Generator

A modern, polished Random Quote Generator built with React, TypeScript, and Tailwind CSS. Discover inspiring quotes from great minds across history.

![Quotely Demo](./demo-screenshot.png)

## Features

### Core Functionality
- **Random Quote Display**: Generates a new random quote on each load, never showing the same quote twice in a row
- **Quote Counter**: Shows current quote position (e.g., "Quote 5 of 60") and total generated count
- **Copy to Clipboard**: One-click copy with toast notification feedback
- **Share Options**: Share quotes directly to X (Twitter), WhatsApp, LinkedIn, or copy shareable text
- **Favorites System**: Save favorite quotes with heart icon, stored in localStorage

### User Experience
- **Dark/Light Theme**: Toggle between themes with smooth transitions, persisted in localStorage
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Smooth Animations**: Fade-in quotes, hover effects, button interactions, and theme transitions
- **Loading States**: Elegant loading indicators with animated spinners

### Accessibility
- **Keyboard Navigation**: All controls are keyboard accessible with proper focus management
- **ARIA Labels**: Comprehensive screen reader support
- **High Contrast**: Carefully designed color contrasts for readability
- **Focus Indicators**: Visible focus states on all interactive elements

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Strict mode enabled for type safety
- **Vite** - Fast build tool with hot module replacement
- **Tailwind CSS** - Utility-first CSS with custom design system
- **Lucide React** - Beautiful, lightweight icons

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx       # Reusable button component
│   │   ├── Loader.tsx       # Loading spinner with pulse animation
│   │   ├── Modal.tsx       # Accessible modal dialog
│   │   ├── ThemeToggle.tsx # Dark/light theme switch
│   │   └── Toast.tsx       # Toast notification system
│   ├── Controls.tsx        # Quote action buttons
│   ├── FavoritesList.tsx   # Saved favorites display
│   ├── Footer.tsx          # App footer
│   ├── Header.tsx          # Logo, theme toggle, favorites button
│   ├── QuoteCard.tsx       # Main quote display card
│   └── ShareSheet.tsx      # Social sharing options
├── context/
│   ├── ThemeContext.tsx    # Theme state management
│   └── ToastContext.tsx    # Toast notification context
├── data/
│   └── quotes.ts          # 60 diverse quotes dataset
├── hooks/
│   ├── useLocalStorage.ts # Persistent storage hook
│   ├── useQuotes.ts       # Quote state management
│   ├── useTheme.ts        # Theme persistence
│   └── useToast.ts        # Toast notifications
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── share.ts           # Share and clipboard utilities
├── App.tsx                # Main application component
├── index.css              # Global styles with CSS variables
└── main.tsx               # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd random-quote-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Quote Dataset

The app includes 60 curated quotes from various categories:
- Inspirational & Motivational
- Philosophy
- Science & Technology
- Leadership
- Life & Wisdom

All quotes include:
- Unique ID
- Quote text
- Author name
- Optional tags

## LocalStorage Keys

- `rqq_theme` - User's theme preference (`'light'` | `'dark'`)
- `rqq_favorites` - Array of favorited quote IDs

## Browser Support

- Modern browsers with ES6+ support
- Clipboard API for copy functionality (with fallback)
- CSS Grid and Flexbox
- CSS Custom Properties (variables)

## Performance

- Optimized bundle size with tree shaking
- Lazy animations using CSS transitions
- Minimal re-renders with React hooks
- No external dependencies beyond React ecosystem

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Add proper ARIA labels for accessibility
- Maintain responsive design principles
- Write clean, self-documenting code

## Known Issues

- None at this time. Please report any issues via GitHub.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Quotes collected from various public domain sources
- Icons by [Lucide](https://lucide.dev)
- Fonts: Inter & Playfair Display from Google Fonts

---

Made with care for the art of quotation.
