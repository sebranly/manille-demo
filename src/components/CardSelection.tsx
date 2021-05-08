import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { CARDS_PER_PLAYER } from '../constants';
import { PlayingDeck } from './PlayingDeck';

export interface CardSelectionProps {
  className?: string;
  botCards: Card[];
  onClickCard: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const CardSelection: React.FC<CardSelectionProps> = (props) => {
  const { className, botCards, onClickCard } = props;

  const renderMessageSelection = () => {
    if (botCards.length === CARDS_PER_PLAYER) return null;

    if (botCards.length === 0) return <div>{`Please select your ${CARDS_PER_PLAYER} cards`}</div>;

    const suffix = ` (${botCards.length}/${CARDS_PER_PLAYER})`;

    return <div>{`Please keep selecting cards ${suffix}`}</div>;
  };

  return (
    <div className="demo-container">
      <div className="demo-cards">
        <h2>Your cards</h2>
        {renderMessageSelection()}
        <PlayingDeck botCards={botCards} onClick={onClickCard} />
      </div>
    </div>
  );
};

export { CardSelection };
