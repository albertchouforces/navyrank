import { Play, Trophy, Clock } from 'lucide-react';

interface BestRun {
  time: number;
  score: number;
  accuracy: number;
}

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
  bestRun: BestRun | null;
}

export function StartScreen({ onStart, highScore, bestRun }: StartScreenProps) {
  return (
    <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to Navy Rank Master
      </h2>
      
      <div className="mb-6 text-gray-600">
        <p className="mb-4">
          Test your knowledge of Royal Canadian Navy ranks. You'll be shown rank insignias
          and need to identify the correct rank from multiple options.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Trophy size={20} />
            <span className="font-semibold">
              High Score: {highScore}
              {bestRun && ` (${bestRun.accuracy}%)`}
            </span>
          </div>
          {bestRun && (
            <div className="flex items-center gap-2 text-blue-600">
              <Clock size={20} />
              <span className="font-semibold">
                Best Time: {Math.floor(bestRun.time / 60000)}:
                {Math.floor((bestRun.time % 60000) / 1000).toString().padStart(2, '0')}.
                {Math.floor((bestRun.time % 1000) / 10).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        <Play size={20} />
        Start Quiz
      </button>
    </div>
  );
}
