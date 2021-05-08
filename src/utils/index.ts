import TenClubs from '../img/cards/clubs/ten.svg';
import AceClubs from '../img/cards/clubs/ace.svg';
import KingClubs from '../img/cards/clubs/king.svg';
import QueenClubs from '../img/cards/clubs/queen.svg';
import JackClubs from '../img/cards/clubs/jack.svg';
import NineClubs from '../img/cards/clubs/nine.svg';
import EightClubs from '../img/cards/clubs/eight.svg';
import SevenClubs from '../img/cards/clubs/seven.svg';

import TenDiamonds from '../img/cards/diamonds/ten.svg';
import AceDiamonds from '../img/cards/diamonds/ace.svg';
import KingDiamonds from '../img/cards/diamonds/king.svg';
import QueenDiamonds from '../img/cards/diamonds/queen.svg';
import JackDiamonds from '../img/cards/diamonds/jack.svg';
import NineDiamonds from '../img/cards/diamonds/nine.svg';
import EightDiamonds from '../img/cards/diamonds/eight.svg';
import SevenDiamonds from '../img/cards/diamonds/seven.svg';

import TenHearts from '../img/cards/hearts/ten.svg';
import AceHearts from '../img/cards/hearts/ace.svg';
import KingHearts from '../img/cards/hearts/king.svg';
import QueenHearts from '../img/cards/hearts/queen.svg';
import JackHearts from '../img/cards/hearts/jack.svg';
import NineHearts from '../img/cards/hearts/nine.svg';
import EightHearts from '../img/cards/hearts/eight.svg';
import SevenHearts from '../img/cards/hearts/seven.svg';

import TenSpades from '../img/cards/spades/ten.svg';
import AceSpades from '../img/cards/spades/ace.svg';
import KingSpades from '../img/cards/spades/king.svg';
import QueenSpades from '../img/cards/spades/queen.svg';
import JackSpades from '../img/cards/spades/jack.svg';
import NineSpades from '../img/cards/spades/nine.svg';
import EightSpades from '../img/cards/spades/eight.svg';
import SevenSpades from '../img/cards/spades/seven.svg';

import CardBack from '../img/cards/back.svg';

import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { NUMBER_PLAYERS } from '../constants';

const getPlayerName = (names: string[], playerId: 0 | 1 | 2 | 3, botPlayerId: 0 | 1 | 2 | 3) => {
  if (names.length !== NUMBER_PLAYERS) return '';

  const isBot = playerId === botPlayerId;

  const playerName = names[playerId];

  if (!isBot) return playerName;

  return `${playerName} (you)`;
};

const getPlayerSuffix = (playerId: 0 | 1 | 2 | 3) => {
  const suffixes = ['top', 'right', 'bottom', 'left'];

  return suffixes[playerId];
};

const getCardLabelCommon = (card?: Card) => {
  const cardLabel = card && card.rank && card.suit ? `${card.rank} ${card.suit}` : 'back';

  return cardLabel;
};

const getCardLabelDeck = (index: number, card?: Card) => {
  const cardLabel = getCardLabelCommon(card);
  const newCardLabel = `${cardLabel}:deck:${index}`;

  return newCardLabel;
};

const getCardLabel = (index: number, playerId: number, card?: Card) => {
  const cardLabel = getCardLabelCommon(card);
  const newCardLabel = `${cardLabel}:p-id${playerId}:${index}`;

  return newCardLabel;
};

const getCardImg = (card?: Card) => {
  const { Ten, Ace, King, Queen, Jack, Nine, Eight, Seven } = CardRank;
  const { Clubs, Diamonds, Hearts, Spades } = CardSuit;

  if (!card) return CardBack;
  const { rank, suit } = card;

  switch (suit) {
    case Clubs:
      switch (rank) {
        case Ten:
          return TenClubs;

        case Ace:
          return AceClubs;

        case King:
          return KingClubs;

        case Queen:
          return QueenClubs;

        case Jack:
          return JackClubs;

        case Nine:
          return NineClubs;

        case Eight:
          return EightClubs;

        case Seven:
          return SevenClubs;
      }

    case Diamonds:
      switch (rank) {
        case Ten:
          return TenDiamonds;

        case Ace:
          return AceDiamonds;

        case King:
          return KingDiamonds;

        case Queen:
          return QueenDiamonds;

        case Jack:
          return JackDiamonds;

        case Nine:
          return NineDiamonds;

        case Eight:
          return EightDiamonds;

        case Seven:
          return SevenDiamonds;
      }

    case Hearts:
      switch (rank) {
        case Ten:
          return TenHearts;

        case Ace:
          return AceHearts;

        case King:
          return KingHearts;

        case Queen:
          return QueenHearts;

        case Jack:
          return JackHearts;

        case Nine:
          return NineHearts;

        case Eight:
          return EightHearts;

        case Seven:
          return SevenHearts;
      }

    case Spades:
      switch (rank) {
        case Ten:
          return TenSpades;

        case Ace:
          return AceSpades;

        case King:
          return KingSpades;

        case Queen:
          return QueenSpades;

        case Jack:
          return JackSpades;

        case Nine:
          return NineSpades;

        case Eight:
          return EightSpades;

        case Seven:
          return SevenSpades;
      }
  }
};

export { getCardLabel, getPlayerName, getCardLabelDeck, getCardImg, getPlayerSuffix };
