
import React from 'react';

interface GameOverModalProps {
  winner: string | null;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ winner, onRestart }) => {
  if (!winner) return null;

  const message = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 shadow-2xl text-center transform scale-95 transition-transform duration-300 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 text-blue-400">Game Over</h2>
        <p className="text-2xl mb-8">{message}</p>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg text-lg transition-colors duration-300"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default GameOverModal;
