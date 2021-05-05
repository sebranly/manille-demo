import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { CARDS_PER_PLAYER } from '../constants';
import { generateDeck } from 'manille/lib/cards';
import { PlayingDeck } from './PlayingDeck';

export interface CardSelectionProps {
  className?: string;
  botsCards: Card[];
  onClickButton: () => void;
  onClickCard: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const CardSelection: React.FC<CardSelectionProps> = (props) => {
  const { className, botsCards, onClickButton, onClickCard } = props;

  const renderMessageSelection = () => {
    if (botsCards.length === CARDS_PER_PLAYER) return null;

    if (botsCards.length === 0) return <div>{`Please select your ${CARDS_PER_PLAYER} cards`}</div>;

    const suffix = ` (${botsCards.length}/${CARDS_PER_PLAYER})`;

    if (botsCards.length < CARDS_PER_PLAYER) return <div>{`Please keep selecting cards ${suffix}`}</div>;

    return <div>{`Too many cards being selected ${suffix}`}</div>;
  };

  const renderSelectionButton = () => {
    if (botsCards.length !== CARDS_PER_PLAYER) return null;

    return <button onClick={onClickButton}>Next step</button>;
  };

  return (
    <div className="demo-container">
      <div className="demo-cards">
        <h2>All cards</h2>
        {renderMessageSelection()}
        {renderSelectionButton()}
        <PlayingDeck botsCards={botsCards} cards={generateDeck()} onClick={onClickCard} />
      </div>
    </div>
  );
};

export { CardSelection };