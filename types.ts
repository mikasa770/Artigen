export enum Mood {
  Vibrant = 'Vibrant',
  Chill = 'Chill',
  Dark = 'Dark',
  Epic = 'Epic',
  Happy = 'Happy',
  Nostalgic = 'Nostalgic',
  Romantic = 'Romantic',
  Minimalist = 'Minimalist',
}

export interface MoodOption {
  value: Mood;
  label: string;
}