import { useState, useEffect, useRef } from 'react';
import './index.css';
import { NavyRank, navyRanks } from './data/navyRanks';
import { FlashCard } from './components/FlashCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { StartScreen } from './components/StartScreen';
import { Anchor } from 'lucide-react';

type GameState = 'start' | 'playing' | 'finished';

interface BestRun {
  time: number;
  score: number;
  accuracy: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [shuffledRanks, setShuffledRanks] = useState<NavyRank[]>([]);
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('navyRanksHighScore');
    return saved ? parseInt(saved) : 0;
  });
  
  // Timer states
  const [currentTime, setCurrentTime] = useState(0);
  const [bestRun, setBestRun] = useState<BestRun>(() => {
    const saved = localStorage.getItem('navyRanksBestRun');
    return saved ? JSON.parse(saved) : null;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const generateNewOptions = (currentRank: NavyRank) => {
    const otherRanks = navyRanks
      .filter((r) => r.rank !== currentRank.rank)
      .map((r) => r.rank);
    
    // Get 3 random wrong answers
    const wrongOptions = otherRanks
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Combine correct answer with wrong options and shuffle
    return [...wrongOptions, currentRank.rank]
      .sort(() => Math.random() - 0.5);
  };

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        if (lastTickRef.current) {
          const delta = now - lastTickRef.current;
          setCurrentTime(time => time + delta);
        }
        lastTickRef.current = now;
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastTickRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Set initial options
  useEffect(() => {
    if (shuffledRanks.length > 0) {
      setCurrentOptions(generateNewOptions(shuffledRanks[currentRankIndex]));
    }
  }, [currentRankIndex, shuffledRanks]);

  const handleAnswer = (correct: boolean) => {
    setIsTimerRunning(false);
    if (correct) setCorrectAnswers((prev) => prev + 1);
    setTotalAnswers((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentRankIndex === shuffledRanks.length - 1) {
      setGameState('finished');
      // Calculate final accuracy
      const accuracy = Math.round((correctAnswers / navyRanks.length) * 100);
      
      // Update best run if:
      // 1. There is no previous best run
      // 2. Current score is higher than best score
      // 3. Current score equals best score but time is better
      if (!bestRun || 
          correctAnswers > bestRun.score || 
          (correctAnswers === bestRun.score && currentTime < bestRun.time)) {
        const newBestRun = {
          time: currentTime,
          score: correctAnswers,
          accuracy: accuracy
        };
        setBestRun(newBestRun);
        localStorage.setItem('navyRanksBestRun', JSON.stringify(newBestRun));
      }
    } else {
      setCurrentRankIndex((prev) => prev + 1);
      setIsTimerRunning(true);
    }
  };

  const handleStartQuiz = () => {
    // Shuffle the ranks array
    const shuffled = [...navyRanks].sort(() => Math.random() - 0.5);
    setShuffledRanks(shuffled);
    setCurrentRankIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setGameState('playing');
    setCurrentTime(0);
    setIsTimerRunning(true);
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentTime(0);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    if (correctAnswers > highScore) {
      setHighScore(correctAnswers);
      localStorage.setItem('navyRanksHighScore', correctAnswers.toString());
    }
  }, [correctAnswers, highScore]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 bg-slate-50 p-8">
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Anchor className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Royal Canadian Navy Ranks
          </h1>
        </div>
        <p className="text-gray-600">Test your knowledge of naval ranks</p>
      </header>

      {gameState === 'start' ? (
        <StartScreen onStart={handleStartQuiz} highScore={highScore} bestRun={bestRun} />
      ) : (
        <div className="flex flex-col items-center gap-6">
          <ScoreDisplay 
            correct={correctAnswers} 
            total={totalAnswers} 
            highScore={highScore}
            onRestart={handleRestart}
            isFinished={gameState === 'finished'}
            totalQuestions={navyRanks.length}
            currentTime={currentTime}
            bestRun={bestRun}
          />

          {gameState === 'playing' && shuffledRanks.length > 0 && (
            <FlashCard
              rank={shuffledRanks[currentRankIndex]}
              options={currentOptions}
              onAnswer={handleAnswer}
              onNext={handleNext}
              questionNumber={currentRankIndex + 1}
              totalQuestions={shuffledRanks.length}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
