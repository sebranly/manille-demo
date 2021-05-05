import * as React from "react";
import { Card } from "manille/lib/types";
import { PlayingCard } from "./PlayingCard";

export interface PlayingCardsProps {
  className?: string;
  cards: Card[];
  displayMode?: number;
}

const PlayingCards: React.FC<PlayingCardsProps> = (props) => {
  const { cards, displayMode } = props;

  if (cards.length === 0) return null;

  if (displayMode === 4) {
    const [card1, card2, card3, card4, ...lastCards] = cards;
    const firstCards = [card1, card2, card3, card4];

    return (
      <>
        <div className="demo-cards">
          {firstCards.map((card: Card) => (
            <PlayingCard card={card} className="width-four-cards" />
          ))}
        </div>
        <div className="demo-cards">
          {lastCards.map((card: Card) => (
            <PlayingCard card={card} className="width-four-cards" />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="demo-cards">
      {cards.map((card: Card) => (
        <PlayingCard card={card} className="width-eight-cards" />
      ))}
    </div>
  );
};

export { PlayingCards };