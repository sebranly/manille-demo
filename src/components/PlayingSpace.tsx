import * as React from 'react';
import { Card } from 'manille/lib/types';
import { PlayingCards } from './PlayingCards';
import { PlayingTable } from './PlayingTable';
import { NUMBER_PLAYERS } from '../constants';
import { getPlayerName } from '../utils';

export interface PlayingSpaceProps {
  className?: string;
  cards: (Card | undefined)[][];
  horizontal?: boolean;
  names: string[];
  botPlayerId: 0 | 1 | 2 | 3;
}

const PlayingSpace: React.FC<PlayingSpaceProps> = (props) => {
  const { botPlayerId, className, cards, horizontal = true, names } = props;

  if (cards.length !== NUMBER_PLAYERS || names.length !== NUMBER_PLAYERS) return null;

  const name0 = getPlayerName(names, 0, botPlayerId);
  const name1 = getPlayerName(names, 1, botPlayerId);
  const name2 = getPlayerName(names, 2, botPlayerId);
  const name3 = getPlayerName(names, 3, botPlayerId);

  const [playerCards0, playerCards1, playerCards2, playerCards3] = cards;

  if (!horizontal) {
    return (
      <div className={className}>
        <div className="demo-container">
          <div className="demo-player demo-player-left flex-one flex-center">
            <h3>{name3}</h3>
            <PlayingCards cards={playerCards3} displayMode={2} playerId={3} />
          </div>

          <div className="demo-container flex-column flex-one">
            <div className="demo-player demo-player-top flex-one">
              <h3>{name0}</h3>
              <PlayingCards cards={playerCards0} displayMode={4} playerId={0} />
            </div>

            <PlayingTable cards={[undefined, undefined, undefined, undefined]} />

            <div className="demo-player demo-player-bottom flex-one">
              <h3>{name2}</h3>
              <PlayingCards cards={playerCards2} displayMode={4} playerId={2} />
            </div>
          </div>
          <div className="demo-player demo-player-right flex-one flex-center">
            <h3>{name1}</h3>
            <PlayingCards cards={playerCards1} displayMode={2} playerId={1} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="demo-player demo-player-top">
        <h3>{name0}</h3>
        <PlayingCards cards={playerCards0} playerId={0} />
      </div>

      <div className="demo-container">
        <div className="demo-player demo-player-left flex-one">
          <h3>{name3}</h3>
          <PlayingCards cards={playerCards3} displayMode={4} playerId={3} />
        </div>

        <PlayingTable cards={[undefined, undefined, undefined, undefined]} />

        <div className="demo-player demo-player-right flex-one">
          <h3>{name1}</h3>
          <PlayingCards cards={playerCards1} displayMode={4} playerId={1} />
        </div>
      </div>
      <div className="demo-player demo-player-bottom">
        <h3>{name2}</h3>
        <PlayingCards cards={playerCards2} playerId={2} />
      </div>
    </div>
  );
};

export { PlayingSpace };
