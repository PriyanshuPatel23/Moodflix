export interface Mood {
  id: string;
  mood: string;
  title: string;
  description: string;
  emoji: string;
  genreIds: number[];
}

export const MOODS: Mood[] = [
  {
    id: '1',
    mood: 'chill',
    title: 'Chill',
    description: 'Relaxing films for a quiet night',
    emoji: '😌',
    genreIds: [18, 10749],
  },
  {
    id: '2',
    mood: 'thriller',
    title: 'Thriller Night',
    description: 'Keep your eyes on the screen',
    emoji: '🎬',
    genreIds: [53, 27],
  },
  {
    id: '3',
    mood: 'feel-good',
    title: 'Feel-Good',
    description: 'Instant smile makers',
    emoji: '😂',
    genreIds: [35, 10751],
  },
  {
    id: '4',
    mood: 'rainy-day',
    title: 'Rainy Day',
    description: 'Melancholy & cozy classics',
    emoji: '🌧️',
    genreIds: [18],
  },
  {
    id: '5',
    mood: 'heartbreak',
    title: 'Heartbreak',
    description: 'For the emotional release',
    emoji: '💔',
    genreIds: [10749, 18],
  },
  {
    id: '6',
    mood: 'adrenaline',
    title: 'Adrenaline',
    description: 'Fast-paced and high-stakes',
    emoji: '🔥',
    genreIds: [28, 12],
  },
];
