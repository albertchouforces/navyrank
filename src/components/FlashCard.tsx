import { useState, useEffect } from 'react';
import { NavyRank } from '../data/navyRanks';
import { Check, X, ImageOff, BookOpen } from 'lucide-react';
import { RankImagePlaceholder } from './RankImagePlaceholder';

interface FlashCardProps {
  rank: NavyRank;
  options: string[];
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function FlashCard({ 
  rank, 
  options, 
  onAnswer, 
  onNext,
  questionNumber,
  totalQuestions
}: FlashCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset state when rank changes (including when restarting)
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setImageLoaded(false);
    setImageError(false);
  }, [rank]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    const correct = answer === rank.rank;
    onAnswer(correct);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setImageLoaded(false);
    setImageError(false);
    onNext();
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
      <div className="flex flex-col w-full">
        {/* Question Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Identify this rank:</h3>
            <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <div className="w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              {!imageLoaded && !imageError && (
                <RankImagePlaceholder rank={rank.rank} />
              )}
              {imageError ? (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ImageOff size={32} />
                  <p className="text-sm mt-2">Image not available</p>
                </div>
              ) : (
                <img
                  src={rank.imageUrl}
                  alt="Rank insignia"
                  className={`max-w-32 max-h-32 ${imageLoaded ? 'block' : 'hidden'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                />
              )}
            </div>
            <p className="text-lg text-gray-600 italic text-center max-w-xl">{rank.description}</p>
          </div>
        </div>

        {/* Options Section - Fixed width container */}
        <div className="w-full p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`w-full min-h-[60px] p-4 text-left rounded-lg transition-colors flex items-center justify-between ${
                  showResult
                    ? option === rank.rank
                      ? 'bg-green-100 border-2 border-green-500'
                      : selectedAnswer === option
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-gray-100'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span>{option}</span>
                {showResult && (
                  <span>
                    {option === rank.rank && (
                      <Check className="text-green-600" size={20} />
                    )}
                    {selectedAnswer === option && option !== rank.rank && (
                      <X className="text-red-600" size={20} />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Result Section */}
        {showResult && (
          <div className="w-full p-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6 max-w-xl mx-auto">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <BookOpen size={20} />
                <span className="font-semibold">Did you know?</span>
              </div>
              <p className="text-blue-900">{rank.fact}</p>
            </div>

            <div className="flex justify-center w-full">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Rank'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
