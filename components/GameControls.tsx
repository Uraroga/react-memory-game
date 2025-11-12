
import React from 'react';
import { MAX_PAIRS, MIN_PAIRS } from '../constants';

interface GameControlsProps {
  onRestart: () => void;
  onNumPairsChange: (pairs: number) => void;
  currentNumPairs: number;
}

const GameControls: React.FC<GameControlsProps> = ({ onRestart, onNumPairsChange, currentNumPairs }) => {
  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <h1 className="text-2xl font-bold text-blue-400">Memory Game</h1>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <label htmlFor="pairs-selector" className="text-sm text-slate-300 mb-1">
            Pairs: {currentNumPairs}
          </label>
          <input
            id="pairs-selector"
            type="range"
            min={MIN_PAIRS}
            max={MAX_PAIRS}
            value={currentNumPairs}
            onChange={(e) => onNumPairsChange(Number(e.target.value))}
            className="w-32 accent-blue-500"
          />
        </div>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameControls;
