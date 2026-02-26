import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Share2, Type, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book as BibleBookModel, getMockVerses } from '../data/stories';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { shareContent } from '../lib/capacitor';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

interface BibleViewProps {
  book: BibleBookModel;
  onBack: () => void;
}

const BibleView: React.FC<BibleViewProps> = ({ book, onBack }) => {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const { t } = useTranslation();

  const chapters = Array.from({ length: book.chaptersCount }, (_, i) => i + 1);

  const handleSelectChapter = (chapter: number) => {
    setCurrentChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextChapter = () => {
    if (currentChapter && currentChapter < book.chaptersCount) {
      handleSelectChapter(currentChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter && currentChapter > 1) {
      handleSelectChapter(currentChapter - 1);
    }
  };

  const toggleFontSize = () => {
    const sizes: ('sm' | 'base' | 'lg' | 'xl')[] = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(fontSize);
    setFontSize(sizes[(currentIndex + 1) % sizes.length]);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-xl';
      case 'xl': return 'text-2xl';
      default: return 'text-lg';
    }
  };

  const handleShare = async () => {
    const text = currentChapter 
      ? `${book.name} ${t.chapters} ${currentChapter}` 
      : book.name;
    
    const result = await shareContent(
      t.bible,
      `${t.welcome} ${text}`,
    );

    if (result === 'clipboard') {
      toast.success(t.linkCopied);
    }
  };

  const verses = currentChapter ? getMockVerses(book.name, currentChapter) : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-900/50 -mx-4 px-4 pb-24">
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 -mx-4 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={currentChapter ? () => setCurrentChapter(null) : onBack}
            className="rounded-full h-10 w-10 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{book.name}</h2>
            {currentChapter && (
              <p className="text-xs text-muted-foreground font-medium">{t.chapters} {currentChapter}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFontSize}
            className="rounded-full h-10 w-10"
          >
            <Type className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="rounded-full h-10 w-10"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <main className="py-6 max-w-2xl mx-auto w-full">
        {!currentChapter ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="text-center space-y-2 mb-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">{t.selectChapter}</h3>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {chapters.map((chapter) => (
                <motion.button
                  key={chapter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectChapter(chapter)}
                  className="aspect-square flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold shadow-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {chapter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-8 px-2"
          >
            <div className="space-y-6">
              {verses.map((verse) => (
                <div key={verse.number} className="flex gap-4 group">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {verse.number}
                  </span>
                  <p className={cn(
                    getFontSizeClass(),
                    "leading-relaxed text-slate-800 dark:text-slate-200 font-medium"
                  )}>
                    {verse.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-12 border-t dark:border-slate-800 mt-8">
              <Button 
                variant="outline" 
                className="rounded-xl flex items-center gap-2 dark:border-slate-700"
                onClick={handlePrevChapter}
                disabled={currentChapter === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                {t.previous}
              </Button>
              <span className="text-sm font-bold text-muted-foreground">
                {t.chapters} {currentChapter}
              </span>
              <Button 
                variant="outline" 
                className="rounded-xl flex items-center gap-2 dark:border-slate-700"
                onClick={handleNextChapter}
                disabled={currentChapter === book.chaptersCount}
              >
                {t.next}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BibleView;