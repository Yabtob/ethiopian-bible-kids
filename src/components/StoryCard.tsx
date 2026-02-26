import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle } from 'lucide-react';
import { Story } from '../data/stories';
import { cn } from '../lib/utils';
import { useTranslation } from '../context/LanguageContext';

interface StoryCardProps {
  story: Story;
  onClick: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const { language } = useTranslation();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-lg cursor-pointer transition-all duration-300 border-4 border-white dark:border-slate-800",
        story.color,
        "dark:bg-slate-800"
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      <div className="p-4 relative">
        <div className="flex justify-between items-center mb-2">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-yellow-600 dark:text-yellow-500 text-xs font-bold rounded-full uppercase tracking-wider">
            {story.category}
          </span>
          <div className="flex gap-2">
            <BookOpen className="w-5 h-5 text-gray-700 dark:text-slate-300" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">{story.title}</h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {story.summary}
        </p>
      </div>
      
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-yellow-400 p-2 rounded-full shadow-md"
        >
          <PlayCircle className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};