import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import classnames from 'classnames';
import { getCardLabelDeck } from '../utils';
import { generateDeck } from 'manille/lib/cards';
import { NUMBER_PLAYERS } from '../constants';

export interface PlayingDeckProps {
  botsCards: Card[];
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
    botsCards,
    displayMode = 8,
    infoCards,
    onClick,
    showOwners = false
  } = props;
  const cards = generateDeck();

  const classCard = displayMode === 8 ? 'width-eight-cards' : 'width-four-cards';

  if (showOwners && (!infoCards || infoCards.length !== NUMBER_PLAYERS)) return null;

  return (
    <div className="demo-cards">
      {cards.map((card: Card, index: number) => {
        // TODO: code function in manille package
        const botHasCard = botsCards.some((botCard: Card) => card.rank === botCard.rank && card.suit === botCard.suit);
        const hasCard =
          allPlayedCards &&
          allPlayedCards.some((playedCard: Card) => card.rank === playedCard.rank && card.suit === playedCard.suit);

        // TODO: factorize
        const classes = classnames(classCard, {
          'demo-card-used': (!showOwners && botHasCard) || (showOwners && hasCard),
          'demo-card-player-top':
            showOwners &&
            (infoCards![0].some((infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit) ||
              playerPlayedCards![0].some(
                (infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit
              )),
          'demo-card-player-right':
            showOwners &&
            (infoCards![1].some((infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit) ||
              playerPlayedCards![1].some(
                (infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit
              )),
          'demo-card-player-bottom':
            showOwners &&
            (infoCards![2].some((infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit) ||
              playerPlayedCards![2].some(
                (infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit
              )),
          'demo-card-player-left':
            showOwners &&
            (infoCards![3].some((infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit) ||
              playerPlayedCards![3].some(
                (infoCard: Card) => card.rank === infoCard.rank && card.suit === infoCard.suit
              ))
        });

        return <PlayingCard card={card} className={classes} key={getCardLabelDeck(index, card)} onClick={onClick} />;
      })}
    </div>
  );
};

export { PlayingDeck };
