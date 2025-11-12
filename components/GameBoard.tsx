
import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  const getGridCols = (count: number) => {
    if (count <= 16) return 'grid-cols-4';
    if (count <= 24) return 'grid-cols-6';
    if (count <= 32) return 'grid-cols-8';
    if (count <= 40) return 'grid-cols-10';
    return 'grid-cols-4';
  };

  const gridClass = getGridCols(cards.length);

  return (
    <div className={`grid ${gridClass} gap-2 sm:gap-4 flex-grow p-4 bg-slate-800 rounded-lg shadow-inner w-full`}>
      {cards.map((card, index) => (
        <div key={card.id} className="aspect-square">
          <Card
            card={card}
            onClick={() => onCardClick(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
