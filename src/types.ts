export interface Word {
  word: string;
  definition: string;
  date: string;
}

export interface WordState {
  currentWord: Word | null;
  isLoading: boolean;
}