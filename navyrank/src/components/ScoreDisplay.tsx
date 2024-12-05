import { RotateCcw, Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  correct: number;
  total: number;
  highScore: number;
  onRestart: () => void;
  isFinished: boolean;
  totalQuestions: number;
}

export function ScoreDisplay({ 
  correct, 
  total, 
  highScore, 
  onRestart,
  isFinished,
  totalQuestions
}: ScoreDisplayProps) {
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 text-lg font-semibold">
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Score: </span>
          <span className="text-blue-600">{correct}/{total}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Accuracy: </span>
          <span className="text-blue-600">{percentage}%</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">High Score: </span>
          <span className="text-blue-600">{highScore}</span>
        </div>
      </div>

      {isFinished && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-4">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="text-yellow-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">
            You correctly identified {correct} out of {totalQuestions} ranks.
          </p>
          {correct > highScore && (
            <p className="text-green-600 font-semibold mb-4">New High Score!</p>
          )}
        </div>
      )}

      <button
        onClick={onRestart}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        <RotateCcw size={16} />
        {isFinished ? 'Start New Quiz' : 'Restart Quiz'}
      </button>
    </div>
  );
}
