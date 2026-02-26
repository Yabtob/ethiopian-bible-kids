export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  category: 'ብሉይ ኪዳን' | 'አዲስ ኪዳን';
  chaptersCount: number;
}

export interface Story {
  id: string;
  title: string;
  category: string;
  content: string[]; // Changed to string array for paging
  imageUrl: string;
  summary: string;
  color: string; // Added color property
  verses?: string[];
}

export const bibleBooks: Book[] = [
  { id: 'gen', name: 'ኦሪት ዘዘፍጥረት', category: 'ብሉይ ኪዳን', chaptersCount: 50 },
  { id: 'exo', name: 'ኦሪት ዘጸአት', category: 'ብሉይ ኪዳን', chaptersCount: 40 },
  { id: 'lev', name: 'ኦሪት ዘሌዋውያን', category: 'ብሉይ ኪዳን', chaptersCount: 27 },
  { id: 'num', name: 'ኦሪት ዘኍልቍ', category: 'ብሉይ ኪዳን', chaptersCount: 36 },
  { id: 'deu', name: 'ኦሪት ዘዳግም', category: 'ብሉይ ኪዳን', chaptersCount: 34 },
  { id: 'jos', name: 'መጽሐፈ ኢያሱ', category: 'ብሉይ ኪዳን', chaptersCount: 24 },
  { id: 'psa', name: 'መዝሙረ ዳዊት', category: 'ብሉይ ኪዳን', chaptersCount: 150 },
  { id: 'isa', name: 'ትንቢተ ኢሳይያስ', category: 'ብሉይ ኪዳን', chaptersCount: 66 },
  { id: 'mat', name: 'የማቴዎስ ወንጌል', category: 'አዲስ ኪዳን', chaptersCount: 28 },
  { id: 'mar', name: 'የማርቆስ ወንጌል', category: 'አዲስ ኪዳን', chaptersCount: 16 },
  { id: 'luk', name: 'የሉቃስ ወንጌል', category: 'አዲስ ኪዳን', chaptersCount: 24 },
  { id: 'joh', name: 'የዮሐንስ ወንጌል', category: 'አዲስ ኪዳን', chaptersCount: 21 },
  { id: 'act', name: 'የሐዋርያት ሥራ', category: 'አዲስ ኪዳን', chaptersCount: 28 },
  { id: 'rom', name: 'ወደ ሮሜ ሰዎች', category: 'አዲስ ኪዳን', chaptersCount: 16 },
  { id: 'rev', name: 'የዮሐንስ ራእይ', category: 'አዲስ ኪዳን', chaptersCount: 22 },
];

export const stories: Story[] = [
  {
    id: '1',
    title: 'የዓለም አፈጣጠር',
    category: 'የመጀመሪያው ታሪክ',
    summary: 'እግዚአብሔር ዓለምን እንዴት እንደፈጠረ የሚናገር ታሪክ።',
    content: [
      'በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።',
      'ምድርም ባዶ ነበረች፥ አንዳችም አልነበረባትም፤ ጨለማም በጥልቁ ላይ ነበረ።',
      'እግዚአብሔርም፦ ብርሃን ይሁን አለ፤ ብርሃንም ሆነ።',
      'እግዚአብሔርም ብርሃኑ መልካም እንደ ሆነ አየ፤ እግዚአብሔርም ብርሃኑንና ጨለማውን ለየ።'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-blue-50',
    verses: ['ዘፍጥረት 1:1-31']
  },
  {
    id: '2',
    title: 'ኖኅና መርከቡ',
    category: 'ታዛዥነት',
    summary: 'ኖኅ ለእግዚአብሔር በመታዘዝ መርከብ የሠራበት ታሪክ።',
    content: [
      'እግዚአብሔርም ኖኅን አለው፦ አንተና ቤተ ሰብህ ሁሉ ወደ መርከብ ግቡ።',
      'ኖኅም እግዚአብሔር እንዳዘዘው ሁሉ አደረገ።',
      'ከሰባት ቀን በኋላም የጥፋት ውኃ በምድር ላይ ሆነ።'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590424765067-167f627fa137?q=80&w=1935&auto=format&fit=crop',
    color: 'bg-green-50',
    verses: ['ዘፍጥረት 6-9']
  },
  {
    id: '3',
    title: 'ዳዊትና ጎልያድ',
    category: 'ድፍረት',
    summary: 'ታናሹ ዳዊት ግዙፉን ጎልያድን በእምነት ያሸነፈበት ታሪክ።',
    content: [
      'ፍልስጥኤማዊውም ተነሥቶ ወደ ዳዊት በቀረበ ጊዜ፥ ዳዊት ፈጥኖ ወደ ሰልፉ ሮጠ።',
      'ዳዊትም እጁን ወደ ኮረጆው ዘርግቶ ከዚያ ድንጋይ ወሰደና ወነጨፈው።',
      'ፍልስጥኤማዊውም በግንባሩ ተመትቶ በምድር ላይ ወደቀ።'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1974&auto=format&fit=crop',
    color: 'bg-amber-50',
    verses: ['1 ሳሙኤል 17']
  }
];

export const getMockVerses = (bookName: string, chapter: number): Verse[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    number: i + 1,
    text: `${bookName} ምዕራፍ ${chapter} ቁጥር ${i + 1} የእግዚአብሔር ቃል ለሕይወታችን ብርሃን ነው። ይህ የናሙና ጥቅስ ነው።`
  }));
};