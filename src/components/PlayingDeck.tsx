import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import classnames from 'classnames';
import { getCardLabelDeck } from '../utils';

export interface PlayingDeckProps {
  botsCards: Card[];
  className?: string;
  cards: Card[];
  displayMode?: 4 | 8;
  onClick?: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const PlayingDeck: React.FC<PlayingDeckProps> = (props) => {
  const { botsCards, cards, displayMode = 8, onClick } = props;

  if (cards.length === 0) return null;
  const classCard = displayMode === 8 ? 'width-eight-cards' : 'width-four-cards';

  return (
    <div className="demo-cards">
      {cards.map((card: Card, index: number) => {
        // TODO: code function in manille package
        const botHasCard = botsCards.some((botCard: Card) => card.rank === botCard.rank && card.suit === botCard.suit);
        const classes = classnames(classCard, {
          'demo-card-used': botHasCard
        });

        return <PlayingCard card={card} className={classes} key={getCardLabelDeck(index, card)} onClick={onClick} />;
      })}
    </div>
  );
};

export { PlayingDeck };
