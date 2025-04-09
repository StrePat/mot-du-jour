import { Word } from '../types';

export async function getRandomWord(): Promise<Word> {
  try {
    // Étape 1 : Récupérer un mot aléatoire
    const wordResponse = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const [word] = await wordResponse.json();

    // Étape 2 : Récupérer la définition depuis Free Dictionary API
    const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const dictData = await dictResponse.json();

    // Vérifier si une définition existe
    if (dictData.title === "No Definitions Found") {
      return { word, definition: "Définition non disponible pour ce mot." };
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