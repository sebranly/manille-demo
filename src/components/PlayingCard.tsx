import * as React from "react";
import { Card } from "manille/lib/types";
import { getCardImg } from "../utils";
import classnames from "classnames";

export interface PlayingCardProps {
  className?: string;
  card?: Card;
}

const PlayingCard: React.FC<PlayingCardProps> = (props) => {
  const { card, className } = props;
  const img = getCardImg(card);
  const alt = card ? `${card.rank} of ${card.suit}` : "Card back";
  const classImg = classnames(`demo-card ${className}`);

  return <img className={classImg} src={img} alt={alt} />;
};

export { PlayingCard };
