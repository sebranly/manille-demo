import * as React from 'react';
import { Card } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';

export interface PlayingDeckProps {
  className?: string;
  cards: Card[];
  displayMode: number;
}

const PlayingDeck: React.FC<PlayingDeckProps> = (props) => {
  const { cards, displayMode } = props;

  if (cards.length === 0) return null;
  const classCard = displayMode === 8 ? 'width-eight-cards' : 'width-four-cards';

  return (
    <div className="demo-cards">
      {cards.map((card: Card) => (
        <PlayingCard card={card} className={classCard} />
      ))}
    </div>
  );
};

export { PlayingDeck };
