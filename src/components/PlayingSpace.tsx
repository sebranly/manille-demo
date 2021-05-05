import * as React from 'react';
import { Card } from 'manille/lib/types';
import { PlayingCards } from './PlayingCards';
import { PlayingTable } from './PlayingTable';

export interface PlayingSpaceProps {
  className?: string;
  cards: (Card | undefined)[][];
  horizontal?: boolean;
}

const PlayingSpace: React.FC<PlayingSpaceProps> = (props) => {
  const { className, cards, horizontal = true } = props;

  if (cards.length !== 4) return null;

  const [playerCards1, playerCards2, playerCards3, playerCards4] = cards;

  if (!horizontal) {
    return (
      <div className={className}>
        <div className="demo-container">
          <div className="demo-player demo-player-left flex-one flex-center">
            <h3>Player 4</h3>
            <PlayingCards cards={playerCards4} displayMode={2} />
          </div>

          <div className="demo-container flex-column flex-one">
            <div className="demo-player demo-player-top flex-one">
              <h3>Player 1</h3>
              <PlayingCards cards={playerCards1} displayMode={4} />
            </div>

            <PlayingTable cards={[undefined, undefined, undefined, undefined]} />

            <div className="demo-player demo-player-bottom flex-one">
              <h3>Player 3</h3>
              <PlayingCards cards={playerCards3} displayMode={4} />
            </div>
          </div>
          <div className="demo-player demo-player-right flex-one flex-center">
            <h3>Player 2</h3>
            <PlayingCards cards={playerCards2} displayMode={2} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="demo-player demo-player-top">
        <h3>Player 1</h3>
        <PlayingCards cards={playerCards1} />
      </div>

      <div className="demo-container">
        <div className="demo-player demo-player-left flex-one">
          <h3>Player 4</h3>
          <PlayingCards cards={playerCards4} displayMode={4} />
        </div>

        <PlayingTable cards={[undefined, undefined, undefined, undefined]} />

        <div className="demo-player demo-player-right flex-one">
          <h3>Player 2</h3>
          <PlayingCards cards={playerCards2} displayMode={4} />
        </div>
      </div>
      <div className="demo-player demo-player-bottom">
        <h3>Player 3</h3>
        <PlayingCards cards={playerCards3} />
      </div>
    </div>
  );
};

export { PlayingSpace };
