
import React from 'react';
import { Card } from '../types';

interface PlayerDisplayProps {
  playerName: string;
  score: number;
  isCurrentTurn: boolean;
  collectedPairs: Card[];
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ playerName, score, isCurrentTurn, collectedPairs }) => {
  const turnIndicatorClass = isCurrentTurn
    ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-300'
    : 'bg-slate-600 text-slate-300';

  return (
    <div className={`p-4 rounded-lg transition-all duration-300 ${turnIndicatorClass} w-full md:w-auto md:min-w-[200px]`}>
      <h2 className="text-xl font-bold">{playerName}</h2>
      <p className="text-lg">Pairs: {score}</p>
      <div className="mt-4 bg-slate-900/50 p-2 rounded-md min-h-[50px]">
        <h3 className="text-sm font-semibold mb-2">Collected:</h3>
        {collectedPairs.length > 0 ? (
          <div className="grid grid-cols-5 gap-1">
            {collectedPairs.map((card) => (
              <div key={card.id} className="bg-slate-700 rounded flex items-center justify-center aspect-square text-lg">
                {card.value}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No pairs yet.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerDisplay;
