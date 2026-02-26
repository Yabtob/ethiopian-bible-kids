import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2, Volume2 } from 'lucide-react';
import { Story } from '../data/stories';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { shareContent } from '../lib/capacitor';
import { useTranslation } from '../context/LanguageContext';

interface StoryViewProps {
  story: Story;
  onBack: () => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ story, onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  const nextPage = () => {
    if (currentPage < story.content.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      toast.success(t.storyFinished);
      onBack();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const shareStory = async () => {
    const success = await shareContent(
      story.title,
      `${story.title}

${story.content[0].substring(0, 100)}...`,
      window.location.href
    );
    if (!success) {
      // Logic handled in capacitor lib
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-gray-800 dark:text-slate-200" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">{story.title}</h2>
        <div className="flex gap-3">
          <button onClick={() => toast.info(t.audioSoon)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
            <Volume2 className="w-6 h-6 text-gray-600 dark:text-slate-400" />
          </button>
          <button onClick={shareStory} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
            <Share2 className="w-6 h-6 text-gray-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-slate-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / story.content.length) * 100}%` }}
          className="h-full bg-yellow-400"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row p-6 md:p-12 gap-8 items-center overflow-y-auto">
        <div className="w-full md:w-1/2 max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
          <img 
            src={story.imageUrl} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-4xl font-medium text-gray-800 dark:text-slate-200 leading-relaxed">
                {story.content[currentPage]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="p-8 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50 backdrop-blur-sm pb-[max(2rem,env(safe-area-inset-bottom))]">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={cn(
            "flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all",
            currentPage === 0 ? "text-gray-300 dark:text-slate-600" : "text-gray-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
          {t.previous}
        </button>

        <div className="text-gray-400 font-bold font-mono">
          {currentPage + 1} / {story.content.length}
        </div>

        <button
          onClick={nextPage}
          className="flex items-center gap-2 px-8 py-4 bg-yellow-400 text-white rounded-2xl font-bold shadow-lg shadow-yellow-200 dark:shadow-yellow-900/20 hover:bg-yellow-500 transition-all transform active:scale-95"
        >
          {currentPage === story.content.length - 1 ? t.finish : t.next}
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};