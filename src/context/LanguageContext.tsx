import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'am' | 'en';

interface Translation {
  welcome: string;
  subtitle: string;
  searchStories: string;
  searchBible: string;
  stories: string;
  bible: string;
  fullBible: string;
  oldTestament: string;
  newTestament: string;
  noResults: string;
  chapters: string;
  selectChapter: string;
  back: string;
  next: string;
  previous: string;
  finish: string;
  share: string;
  settings: string;
  home: string;
  audioSoon: string;
  linkCopied: string;
  storyFinished: string;
  loading: string;
  nightMode: string;
  language: string;
  switchLanguage: string;
  readBible: string;
}

const translations: Record<Language, Translation> = {
  am: {
    welcome: 'ሰላም ለእላንተ ይሁን! 👋',
    subtitle: 'የእግዚአብሔርን ቃል ለልጆች በሚሆን መልክ እናንብብ።',
    searchStories: 'ታሪኮችን ፈልግ...',
    searchBible: 'የመጽሐፍ ቅዱስ መጻሕፍትን ፈልግ...',
    stories: 'ታሪኮች',
    bible: 'መጽሐፍ ቅዱስ',
    fullBible: 'ሙሉ መጽሐፍ ቅዱስ',
    oldTestament: 'ብሉይ ኪዳን',
    newTestament: 'ሐዲስ ኪዳን',
    noResults: 'ምንም አልተገኘም',
    chapters: 'ምዕራፎች',
    selectChapter: 'ምዕራፍ ይምረጡ',
    back: 'ወደ ኋላ',
    next: 'ቀጣይ',
    previous: 'የበፊቱ',
    finish: 'ጨርስ',
    share: 'አጋራ',
    settings: 'መቼት',
    home: 'ቤት',
    audioSoon: 'ኦዲዮ በቅርቡ ይለቀቃል',
    linkCopied: 'ሊንኩ ተገልብጧል!',
    storyFinished: 'ታሪኩን ጨርሰሃል! ጎበዝ!',
    loading: 'እየጫነ ነው...',
    nightMode: 'የምሽት ሁኔታ',
    language: 'ቋንቋ',
    switchLanguage: 'Switch to English',
    readBible: 'መጽሐፍ ቅዱስን አንብብ'
  },
  en: {
    welcome: 'Peace be with you! 👋',
    subtitle: "Let's read God's word in a way that's easy for kids.",
    searchStories: 'Search stories...',
    searchBible: 'Search Bible books...',
    stories: 'Stories',
    bible: 'Bible',
    fullBible: 'Full Bible',
    oldTestament: 'Old Testament',
    newTestament: 'New Testament',
    noResults: 'No results found',
    chapters: 'chapters',
    selectChapter: 'Select Chapter',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    share: 'Share',
    settings: 'Settings',
    home: 'Home',
    audioSoon: 'Audio coming soon',
    linkCopied: 'Link copied!',
    storyFinished: 'You finished the story! Well done!',
    loading: 'Loading...',
    nightMode: 'Night Mode',
    language: 'Language',
    switchLanguage: 'ወደ አማርኛ ቀይር',
    readBible: 'Read Bible'
  }
};

interface LanguageContextType {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved) return saved;
    }
    return 'am';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    t: translations[language],
    setLanguage: handleSetLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};