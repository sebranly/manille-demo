import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { getCardImg } from '../utils';
import classnames from 'classnames';

export interface PlayingCardProps {
  className?: string;
  card?: Card;
  onClick?: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const PlayingCard: React.FC<PlayingCardProps> = (props) => {
  const { card, className, onClick } = props;
  const img = getCardImg(card);
  const alt = card ? `${card.rank} of ${card.suit}` : 'Card back';
  const rank = card?.rank ?? undefined;
  const suit = card?.suit ?? undefined;
  const classImg = classnames(`demo-card ${className}`);

  return (
    <img
      className={classImg}
      src={img}
      alt={alt}
      onClick={() => {
        if (onClick) onClick(rank, suit);
      }}
    />
  );
};

export { PlayingCard };
