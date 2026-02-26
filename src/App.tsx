import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Home as HomeIcon, BookOpen, User, Share2, Settings, Moon, Sun, Languages } from 'lucide-react';
import Home from './components/Home';
import { Story, Book as BibleBookModel } from './data/stories';
import { Toaster } from 'sonner';
import { MobileProvider } from './components/MobileProvider';
import { hideSplashScreen, shareApp } from './lib/capacitor';
import { toast } from 'sonner';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { cn } from './lib/utils';

// Lazy loading components for faster startup
const StoryView = lazy(() => import('./components/StoryView').then(module => ({ default: module.StoryView })));
const BibleView = lazy(() => import('./components/BibleView'));

function AppContent() {
  const [activeView, setActiveView] = useState<'home' | 'story' | 'bible' | 'settings'>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedBook, setSelectedBook] = useState<BibleBookModel | null>(null);
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Perform startup optimizations
    const initApp = async () => {
      // Give the app a small moment to render before hiding splash
      setTimeout(async () => {
        await hideSplashScreen();
      }, 500);
    };
    
    initApp();
  }, []);

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setActiveView('story');
    window.scrollTo(0, 0);
  };

  const handleSelectBook = (book: BibleBookModel) => {
    setSelectedBook(book);
    setActiveView('bible');
    window.scrollTo(0, 0);
  };

  const handleBackHome = () => {
    setActiveView('home');
    setSelectedStory(null);
    setSelectedBook(null);
    window.scrollTo(0, 0);
  };

  const handleShareApp = async () => {
    const result = await shareApp();
    if (result === 'clipboard') {
      toast.success(t.linkCopied);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'am' ? 'en' : 'am');
  };

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300",
      "bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50 pb-20"
    )}>
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-2xl relative">
        <main className="p-4 pt-6 min-h-full">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted-foreground animate-pulse">{t.loading}</p>
            </div>
          }>
            {activeView === 'home' && (
              <Home 
                onSelectStory={handleSelectStory} 
                onSelectBook={handleSelectBook} 
              />
            )}
            
            {activeView === 'story' && selectedStory && (
              <StoryView 
                story={selectedStory} 
                onBack={handleBackHome} 
              />
            )}

            {activeView === 'bible' && selectedBook && (
              <BibleView 
                book={selectedBook} 
                onBack={handleBackHome} 
              />
            )}

            {activeView === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-primary mb-2">{t.settings}</h1>
                  <p className="text-muted-foreground">{t.subtitle}</p>
                </header>

                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold">{t.nightMode}</h3>
                        <p className="text-xs text-muted-foreground">{theme === 'dark' ? 'Dark theme' : 'Light theme'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={cn(
                        "w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center shadow-inner",
                        theme === 'dark' ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300",
                        theme === 'dark' ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Languages className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{t.language}</h3>
                        <p className="text-xs text-muted-foreground">{language === 'am' ? 'Amharic (አማርኛ)' : 'English'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={toggleLanguage}
                      className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all"
                    >
                      {language === 'am' ? 'English' : 'አማርኛ'}
                    </button>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{t.share}</h3>
                        <p className="text-xs text-muted-foreground">Share the app with others</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleShareApp}
                      className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                    >
                      {t.share}
                    </button>
                  </div>
                </div>

                <div className="mt-12 text-center opacity-30">
                  <p className="text-xs">Version 1.0.0</p>
                  <p className="text-[10px] mt-1">© 2025 Kids Bible Ethiopia</p>
                </div>
              </div>
            )}
          </Suspense>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 flex items-center justify-around py-3 px-6 z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors duration-300">
          <NavItem 
            icon={<HomeIcon className="w-6 h-6" />} 
            label={t.home} 
            active={activeView === 'home'} 
            onClick={handleBackHome} 
          />
          <NavItem 
            icon={<BookOpen className="w-6 h-6" />} 
            label={t.stories} 
            active={activeView === 'story'} 
            onClick={() => {
              if (activeView !== 'home') handleBackHome();
            }} 
          />
          <NavItem 
            icon={<Share2 className="w-6 h-6" />} 
            label={t.share} 
            active={false} 
            onClick={handleShareApp} 
          />
          <NavItem 
            icon={<Settings className="w-6 h-6" />} 
            label={t.settings} 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')} 
          />
        </nav>
      </div>
      <Toaster position="top-center" expand={true} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MobileProvider>
          <AppContent />
        </MobileProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

const NavItem = ({ icon, label, active, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean,
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all",
      active ? 'text-primary scale-110' : 'text-muted-foreground hover:text-slate-600 dark:hover:text-slate-300'
    )}
  >
    <div className={cn(
      "p-1 rounded-xl transition-all",
      active ? 'bg-primary/10 shadow-inner' : ''
    )}>
      {icon}
    </div>
    <span className={cn(
      "text-[10px] font-bold",
      active ? 'opacity-100' : 'opacity-70'
    )}>{label}</span>
  </button>
);

export default App;