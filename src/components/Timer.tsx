import { Clock } from 'lucide-react';

interface TimerProps {
  time: number;
}

export function Timer({ time }: TimerProps) {
  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
      <Clock size={16} className="text-gray-600" />
      <span className="text-gray-600">Time: </span>
      <span className="text-blue-600 font-mono">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}.
        {milliseconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
