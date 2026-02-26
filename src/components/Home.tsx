import React, { useState } from 'react';
import { Book as BookIcon, ChevronRight, Search, BookOpen, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bibleBooks, stories, Book as BibleBookModel, Story } from '../data/stories';
import { motion, AnimatePresence } from 'framer-motion';
import { shareApp } from '../lib/capacitor';
import { toast } from 'sonner';
import { useTranslation } from '../context/LanguageContext';
import { cn } from '../lib/utils';

interface HomeProps {
  onSelectStory: (story: Story) => void;
  onSelectBook: (book: BibleBookModel) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectStory, onSelectBook }) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'bible'>('stories');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useTranslation();

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = bibleBooks.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareApp = async () => {
    const result = await shareApp();
    if (result === 'clipboard') {
      toast.success(t.linkCopied);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">{t.welcome}</h1>
          <Badge variant="outline" className="text-xs py-1 px-3 rounded-full border-primary/20 bg-primary/5 text-primary dark:bg-primary/10">
            {language === 'am' ? 'ዛሬም ቃሉን እናንብብ' : 'Read the Word today'}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{t.subtitle}</p>

        <div className="relative group mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder={activeTab === 'stories' ? t.searchStories : t.searchBible}
            className="pl-10 h-12 rounded-2xl border-primary/10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus-visible:ring-primary shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Hero Banner for Bible */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl h-44 bg-gradient-to-br from-primary/80 to-primary-foreground border-4 border-white dark:border-slate-800 shadow-xl"
      >
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0bd4f0f4-1c43-42d2-8074-f97e510d81ef/full-bible-cover-270e9a09-1772096309977.webp" 
          alt="Bible"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
          <h2 className="text-2xl font-bold">{t.bible}</h2>
          <p className="text-xs text-white/90">
            {language === 'am' 
              ? '"ሕግህ ለእግሬ መብራት፤ ለመንገዴም ብርሃን ነው፤" መዝ 119:105' 
              : '"Your word is a lamp to my feet and a light to my path." Ps 119:105'}
          </p>
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => setActiveTab('bible')}
              className="bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {t.readBible}
            </button>
            <button 
              onClick={handleShareApp}
              className="bg-primary-foreground/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {t.share}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex bg-muted/50 dark:bg-slate-800/50 p-1 rounded-xl gap-1">
        <button
          onClick={() => setActiveTab('stories')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
            activeTab === 'stories' 
              ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
              : 'text-muted-foreground hover:bg-white/30 dark:hover:bg-slate-700/30'
          )}
        >
          {t.stories}
        </button>
        <button
          onClick={() => setActiveTab('bible')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
            activeTab === 'bible' 
              ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
              : 'text-muted-foreground hover:bg-white/30 dark:hover:bg-slate-700/30'
          )}
        >
          {t.fullBible}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stories' ? (
          <motion.div
            key="stories-grid"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20"
          >
            {filteredStories.map((story) => (
              <Card 
                key={story.id} 
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl dark:bg-slate-800"
                onClick={() => onSelectStory(story)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 dark:bg-slate-900/90 text-primary border-none shadow-sm backdrop-blur-sm">
                      {story.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 bg-white dark:bg-slate-800">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{story.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{story.summary}</p>
                </CardContent>
              </Card>
            ))}
            {filteredStories.length === 0 && (
              <div className="col-span-full py-20 text-center opacity-50">
                <p>{t.noResults}</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="bible-grid"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col gap-6 pb-20"
          >
            {/* Old Testament */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                {t.oldTestament}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredBooks.filter(b => b.category === '\u1265\u1209\u12ed \u12aa\u12f3\u1295').map(book => (
                  <BibleBookCard key={book.id} book={book} onClick={() => onSelectBook(book)} />
                ))}
              </div>
            </div>

            {/* New Testament */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                {t.newTestament}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredBooks.filter(b => b.category === '\u12a0\u12f2\u1235 \u12aa\u12f3\u1295').map(book => (
                  <BibleBookCard key={book.id} book={book} onClick={() => onSelectBook(book)} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BibleBookCard = ({ book, onClick }: { book: BibleBookModel, onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <Card 
      className="group cursor-pointer hover:border-primary/30 transition-all bg-white dark:bg-slate-800 border-primary/5 dark:border-slate-700 shadow-sm active:scale-[0.98]"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl",
            book.category === '\u1265\u1209\u12ed \u12aa\u12f3\u1295' 
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' 
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
          )}>
            <BookIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">{book.name}</h4>
            <p className="text-[10px] text-muted-foreground">{book.chaptersCount} {t.chapters}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </CardContent>
    </Card>
  );
};

export default Home;