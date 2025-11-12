
import { useState, useEffect, useCallback } from 'react';
import { Card } from '../types';
import { EMOJIS, DEFAULT_PAIRS } from '../constants';

export const useGameLogic = (initialPairs: number = DEFAULT_PAIRS) => {
  const [numPairs, setNumPairs] = useState(initialPairs);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const createAndShuffleDeck = useCallback((pairs: number) => {
    const selectedEmojis = EMOJIS.slice(0, pairs);
    const duplicatedEmojis = [...selectedEmojis, ...selectedEmojis];
    
    const shuffledDeck = duplicatedEmojis
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledDeck);
  }, []);

  const resetGame = useCallback((pairs: number) => {
    setNumPairs(pairs);
    createAndShuffleDeck(pairs);
    setFlippedCards([]);
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
    setIsBoardLocked(false);
    setIsGameOver(false);
    setWinner(null);
  }, [createAndShuffleDeck]);

  useEffect(() => {
    resetGame(numPairs);
  }, [numPairs, resetGame]);

  const checkForMatch = useCallback(() => {
    if (flippedCards.length !== 2) return;

    setIsBoardLocked(true);
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.value === secondCard.value) {
      // Match
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        )
      );
      setScores(prevScores => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      setFlippedCards([]);
      setIsBoardLocked(false);
      // Current player gets another turn
    } else {
      // No match
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setCurrentPlayer(prevPlayer => (prevPlayer === 1 ? 2 : 1));
        setFlippedCards([]);
        setIsBoardLocked(false);
      }, 1000);
    }
  }, [flippedCards, cards, currentPlayer]);

  useEffect(() => {
    checkForMatch();
  }, [checkForMatch]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameOver(true);
      if (scores[1] > scores[2]) {
        setWinner('Player 1');
      } else if (scores[2] > scores[1]) {
        setWinner('Player 2');
      } else {
        setWinner('Draw');
      }
    }
  }, [cards, scores]);

  const handleCardClick = (index: number) => {
    if (isBoardLocked || flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };
  
  const handleNumPairsChange = (newNumPairs: number) => {
    resetGame(newNumPairs);
  };

  return {
    cards,
    numPairs,
    currentPlayer,
    scores,
    isBoardLocked,
    isGameOver,
    winner,
    handleCardClick,
    resetGame: () => resetGame(numPairs),
    handleNumPairsChange,
  };
};
