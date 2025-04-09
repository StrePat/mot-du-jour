import { words } from '../data/words';

export function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getShareText(word: string, definition: string, url: string): string {
  return `Mot du jour : ${word} – ${definition}. Découvre plus sur ${url}`;
}