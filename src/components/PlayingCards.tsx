import * as React from 'react';
import { Card, PlayerId } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import { getCardLabel } from '../utils';

export interface PlayingCardsProps {
  className?: string;
  cards: (Card | undefined)[];
  displayMode?: 2 | 4 | 8;
  playerId: PlayerId;
}

const PlayingCards: React.FC<PlayingCardsProps> = (props) => {
  const { cards, displayMode, playerId } = props;

  if (cards.length === 0) return null;

  if (displayMode === 4) {
    const [card0, card1, card2, card3, ...lastCards] = cards;
    const firstCards = [card0, card1, card2, card3];
    const displayCards = [firstCards, lastCards];

    return (
      <>
        {displayCards.map((c, index: number) => {
          return (
            <div className="demo-cards" key={index}>
              {c.map((card: Card | undefined, index: number) => (
                <PlayingCard card={card} className="width-four-cards" key={getCardLabel(index, playerId, card)} />
              ))}
            </div>
          );
        })}
      </>
    );
  } else if (displayMode === 2) {
    const [card0, card1, card2, card3, card4, card5, ...lastCards] = cards;
    const displayCards = [[card0, card1], [card2, card3], [card4, card5], lastCards];

    return (
      <>
        {displayCards.map((c, index: number) => {
          return (
            <div className="demo-cards" key={index}>
              {c.map((card: Card | undefined, index: number) => (
                <PlayingCard card={card} className="width-two-cards" key={getCardLabel(index, playerId, card)} />
              ))}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="demo-cards">
      {cards.map((card: Card | undefined, index: number) => (
        <PlayingCard card={card} className="width-eight-cards" key={getCardLabel(index, playerId, card)} />
      ))}
    </div>
  );
};

export { PlayingCards };
