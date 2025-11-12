
import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const { isFlipped, isMatched, value } = card;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  const cardVisibility = isMatched ? 'opacity-0 scale-75' : 'opacity-100 scale-100';
  const cardTransform = isFlipped ? 'rotate-y-180' : 'rotate-y-0';

  return (
    <div className={`perspective-1000 w-full h-full ${cardVisibility} transition-all duration-500`}>
      <button
        onClick={onClick}
        onKeyDown={handleKeyDown}
        disabled={isFlipped || isMatched}
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-lg shadow-lg ${cardTransform}`}
        aria-label={`Card ${isFlipped ? value : 'face down'}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-blue-500 rounded-lg border-2 border-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-slate-700 rounded-lg border-2 border-slate-500">
          <span className="text-4xl md:text-5xl">{value}</span>
        </div>
      </button>
    </div>
  );
};

export default Card;
