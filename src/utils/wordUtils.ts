import { Word } from '../types';

export async function getRandomWord(): Promise<Word> {
  try {
    const wordResponse = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const [word] = await wordResponse.json();

    const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const dictData = await dictResponse.json();

    if (dictData.title === "No Definitions Found") {
      // Liste de secours pour les mots courants
      const backupWords = [
        { word: "Happy", definition: "Feeling or showing pleasure or contentment." },
        { word: "Sad", definition: "Feeling or showing sorrow; unhappy." },
        { word: "Run", definition: "Move at a speed faster than a walk." }
      ];
      const randomBackup = backupWords[Math.floor(Math.random() * backupWords.length)];
      return randomBackup;
    }

    const definition = dictData[0].meanings[0].definitions[0].definition;
    return { word, definition };
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
    return { word: "Erreur", definition: "Impossible de charger un mot pour le moment." };
  }
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