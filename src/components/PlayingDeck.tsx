import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import classnames from 'classnames';

export interface PlayingDeckProps {
  botsCards: Card[];
  className?: string;
  cards: Card[];
  displayMode: number;
  onClick?: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const PlayingDeck: React.FC<PlayingDeckProps> = (props) => {
  const { botsCards, cards, displayMode, onClick } = props;

  if (cards.length === 0) return null;
  const classCard = displayMode === 8 ? 'width-eight-cards' : 'width-four-cards';

  return (
    <div className="demo-cards">
      {cards.map((card: Card) => {
        const botHasCard = botsCards.some((botCard: Card) => card.rank === botCard.rank && card.suit === botCard.suit);
        const classes = classnames(classCard, {
          'demo-card-used': botHasCard
        });

        return <PlayingCard card={card} className={classes} onClick={onClick} />;
      })}
    </div>
  );
};

export { PlayingDeck };
