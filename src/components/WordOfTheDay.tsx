import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { Word, WordState } from '../types';
import { getRandomWord, formatDate, getShareText } from '../utils/wordUtils';

export default function WordOfTheDay() {
  const [state, setState] = useState<WordState>({
    currentWord: null,
    isLoading: true
  });

  const generateNewWord = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    const word = await getRandomWord();
    const newWord: Word = {
      ...word,
      date: formatDate(new Date())
    };
    setState({ currentWord: newWord, isLoading: false });
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  const handleShare = () => {
    if (!state.currentWord) return;
    const shareText = getShareText(state.currentWord.word, state.currentWord.definition, window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  if (state.isLoading || !state.currentWord) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-8 text-center">{state.currentWord.date}</p>
          <h1 className="text-4xl font-bold mb-4 text-center">{state.currentWord.word}</h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed text-center">{state.currentWord.definition}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={generateNewWord}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Actualiser
            </button>
            <button
              onClick={handleShare}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </button>
          </div>
        </div>
      </main>

      {/* Google AdSense */}
      <div className="w-full bg-gray-100 p-4 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1489489505901621"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
      </div>
    </div>
  );
}