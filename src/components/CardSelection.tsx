import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { CARDS_PER_PLAYER } from '../constants';
import { PlayingDeck } from './PlayingDeck';

export interface CardSelectionProps {
  className?: string;
  botsCards: Card[];
  onClickCard: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const CardSelection: React.FC<CardSelectionProps> = (props) => {
  const { className, botsCards, onClickCard } = props;

  const renderMessageSelection = () => {
    if (botsCards.length === CARDS_PER_PLAYER) return null;

    if (botsCards.length === 0) return <div>{`Please select your ${CARDS_PER_PLAYER} cards`}</div>;

    const suffix = ` (${botsCards.length}/${CARDS_PER_PLAYER})`;

    return <div>{`Please keep selecting cards ${suffix}`}</div>;
  };

  return (
    <div className="demo-container">
      <div className="demo-cards">
        <h2>Your cards</h2>
        {renderMessageSelection()}
        <PlayingDeck botsCards={botsCards} onClick={onClickCard} />
      </div>
    </div>
  );
};

export { CardSelection };
