import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import classnames from 'classnames';
import { getCardLabelDeck } from '../utils';
import { hasCard, generateDeck } from 'manille/lib/cards';
import { NUMBER_PLAYERS } from '../constants';

export interface PlayingDeckProps {
  botCards: Card[];
  allPlayedCards?: Card[];
  infoCards?: Card[][];
  playerPlayedCards?: Card[][];
  className?: string;
  displayMode?: 4 | 8;
  showOwners?: boolean;
  onClick?: (cardRank?: CardRank, cardSuit?: CardSuit) => void;
}

const PlayingDeck: React.FC<PlayingDeckProps> = (props) => {
  const {
    allPlayedCards,
    playerPlayedCards,
    botCards,
    displayMode = 8,
    infoCards,
    onClick,
    showOwners = false
  } = props;
  const cards = generateDeck();

  const classCard = displayMode === 8 ? 'width-eight-cards' : 'width-four-cards';

  if (showOwners && infoCards?.length !== NUMBER_PLAYERS) return null;

  return (
    <div className="demo-cards">
      {cards.map((card: Card, index: number) => {
        const botHasCard = hasCard(botCards, card);
        const alreadyHasCard = allPlayedCards && hasCard(allPlayedCards, card);

        // TODO: factorize?
        const classes = classnames(classCard, {
          'demo-card-used': (!showOwners && botHasCard) || (showOwners && alreadyHasCard),
          'demo-card-player-top': showOwners && (hasCard(infoCards![0], card) || hasCard(playerPlayedCards![0], card)),
          'demo-card-player-right':
            showOwners && (hasCard(infoCards![1], card) || hasCard(playerPlayedCards![1], card)),
          'demo-card-player-bottom':
            showOwners && (hasCard(infoCards![2], card) || hasCard(playerPlayedCards![2], card)),
          'demo-card-player-left': showOwners && (hasCard(infoCards![3], card) || hasCard(playerPlayedCards![3], card))
        });

        return <PlayingCard card={card} className={classes} key={getCardLabelDeck(index, card)} onClick={onClick} />;
      })}
    </div>
  );
};

export { PlayingDeck };
