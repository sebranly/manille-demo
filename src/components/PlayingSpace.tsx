import * as React from 'react';
import { Card } from 'manille/lib/types';
import { PlayingCards } from './PlayingCards';
import { PlayingTable } from './PlayingTable';
import { NUMBER_PLAYERS } from '../constants';
import { getPlayerName } from '../utils';
import { PlayerName } from './PlayerName';

export interface PlayingSpaceProps {
  className?: string;
  cards: (Card | undefined)[][];
  horizontal?: boolean;
  names: string[];
  botPlayerId: 0 | 1 | 2 | 3;
  currentPlayerId: 0 | 1 | 2 | 3;
  startingPlayerId: 0 | 1 | 2 | 3;
  playedCards: Card[];
}

const PlayingSpace: React.FC<PlayingSpaceProps> = (props) => {
  const {
    botPlayerId,
    startingPlayerId,
    className,
    cards,
    playedCards,
    horizontal = true,
    currentPlayerId,
    names
  } = props;

  if (cards.length !== NUMBER_PLAYERS || names.length !== NUMBER_PLAYERS) return null;

  const [playerCards0, playerCards1, playerCards2, playerCards3] = cards;

  const cardsTable: (Card | undefined)[] = [undefined, undefined, undefined, undefined];
  for (let i = 0; i < playedCards.length; i++) {
    // TODO: use package instead
    const id = (startingPlayerId + i) % NUMBER_PLAYERS;
    cardsTable[id] = playedCards[i];
  }
  console.log('🚀 ~ file: PlayingSpace.tsx ~ line 41 ~ cardsTable', cardsTable);

  if (!horizontal) {
    return (
      <div className={className}>
        <div className="demo-container">
          <div className="demo-player demo-player-left flex-one flex-center">
            <PlayerName names={names} playerId={3} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
            <PlayingCards cards={playerCards3} displayMode={2} playerId={3} />
          </div>

          <div className="demo-container flex-column flex-one">
            <div className="demo-player demo-player-top flex-one">
              <PlayerName names={names} playerId={0} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
              <PlayingCards cards={playerCards0} displayMode={4} playerId={0} />
            </div>

            <PlayingTable cards={cardsTable} />

            <div className="demo-player demo-player-bottom flex-one">
              <PlayerName names={names} playerId={2} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
              <PlayingCards cards={playerCards2} displayMode={4} playerId={2} />
            </div>
          </div>
          <div className="demo-player demo-player-right flex-one flex-center">
            <PlayerName names={names} playerId={1} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
            <PlayingCards cards={playerCards1} displayMode={2} playerId={1} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="demo-player demo-player-top">
        <PlayerName names={names} playerId={0} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
        <PlayingCards cards={playerCards0} playerId={0} />
      </div>

      <div className="demo-container">
        <div className="demo-player demo-player-left flex-one">
          <PlayerName names={names} playerId={3} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
          <PlayingCards cards={playerCards3} displayMode={4} playerId={3} />
        </div>

        <PlayingTable cards={cardsTable} />

        <div className="demo-player demo-player-right flex-one">
          <PlayerName names={names} playerId={1} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
          <PlayingCards cards={playerCards1} displayMode={4} playerId={1} />
        </div>
      </div>
      <div className="demo-player demo-player-bottom">
        <PlayerName names={names} playerId={2} currentPlayerId={currentPlayerId} botPlayerId={botPlayerId} />
        <PlayingCards cards={playerCards2} playerId={2} />
      </div>
    </div>
  );
};

export { PlayingSpace };
