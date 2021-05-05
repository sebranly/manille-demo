import * as React from "react";
import { Card } from "manille/lib/types";
import { PlayingCards } from "./PlayingCards";
import { PlayingCard } from "./PlayingCard";

export interface PlayingTableProps {
  className?: string;
  cards: Card[][];
}

const PlayingTable: React.FC<PlayingTableProps> = (props) => {
  const { className, cards } = props;

  if (cards.length < 4) return null;

  const [playerCards1, playerCards2, playerCards3, playerCards4] = cards;

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

        <div className="flex-one">
          <div className="demo-table demo-container">
            <div className="flex-one flex-center">
              <PlayingCard className="width-one-card" />
            </div>
            <div className="flex-one">
              <div className="demo-container flex-column">
                <div>
                  <PlayingCard className="width-one-card" />
                </div>
                <div>
                  <PlayingCard className="width-one-card" />
                </div>
              </div>
            </div>
            <div className="flex-one flex-center">
              <PlayingCard className="width-one-card" />
            </div>
          </div>
        </div>

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

export { PlayingTable };
