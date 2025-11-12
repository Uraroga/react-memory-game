
import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import PlayerDisplay from './components/PlayerDisplay';
import GameControls from './components/GameControls';
import GameOverModal from './components/GameOverModal';
import { DEFAULT_PAIRS } from './constants';
import { Card } from './types';

const App: React.FC = () => {
  const {
    cards,
    numPairs,
    currentPlayer,
    scores,
    isGameOver,
    winner,
    handleCardClick,
    resetGame,
    handleNumPairsChange,
  } = useGameLogic(DEFAULT_PAIRS);

  const getPlayerCollectedPairs = (player: 1 | 2): Card[] => {
    const collectedValues: string[] = [];
    const collectedPairs: Card[] = [];
    
    cards.forEach(card => {
        if (card.isMatched && !collectedValues.includes(card.value)) {
            collectedValues.push(card.value);
            collectedPairs.push(card);
        }
    });

    // Simple distribution logic, could be enhanced to track who found which pair
    const player1Pairs = collectedPairs.filter((_, index) => index < scores[1]);
    const player2Pairs = collectedPairs.filter((_, index) => index >= scores[1]);
    
    return player === 1 ? player1Pairs : player2Pairs;
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
        <GameControls 
            onRestart={resetGame} 
            onNumPairsChange={handleNumPairsChange} 
            currentNumPairs={numPairs} 
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex md:flex-col gap-4 w-full md:w-auto">
            <PlayerDisplay
              playerName="Player 1"
              score={scores[1]}
              isCurrentTurn={currentPlayer === 1}
              collectedPairs={getPlayerCollectedPairs(1)}
            />
            <PlayerDisplay
              playerName="Player 2"
              score={scores[2]}
              isCurrentTurn={currentPlayer === 2}
              collectedPairs={getPlayerCollectedPairs(2)}
            />
          </div>
          <main className="flex-grow flex items-center justify-center">
            <GameBoard cards={cards} onCardClick={handleCardClick} />
          </main>
        </div>
        <footer className="text-center text-slate-500 text-sm mt-4">
          <p>A classic memory game built with React and Tailwind CSS.</p>
        </footer>
      </div>
      {isGameOver && <GameOverModal winner={winner} onRestart={resetGame} />}
       <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
      `}</style>
    </div>
  );
};

export default App;
