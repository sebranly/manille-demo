import * as React from 'react';
import { Card } from 'manille/lib/types';
import { PlayingCard } from './PlayingCard';
import { NUMBER_PLAYERS } from '../constants';

export interface PlayingTableProps {
  className?: string;
  cards: (Card | undefined)[];
}

const PlayingTable: React.FC<PlayingTableProps> = (props) => {
  const { cards } = props;

  if (cards.length !== NUMBER_PLAYERS) return null;

  const [playerCard0, playerCard1, playerCard2, playerCard3] = cards;

  return (
    <div className="flex-one">
      <div className="demo-table demo-container">
        <div className="flex-one flex-center">
          <PlayingCard className="width-one-card" />
        </div>
        <div className="flex-one">
          <div className="demo-container flex-column">
            <PlayingCard className="width-one-card" />
            <PlayingCard className="width-one-card" />
          </div>
        </div>
        <div className="flex-one flex-center">
          <PlayingCard className="width-one-card" />
        </div>
      </div>
    </div>
  );
};

export { PlayingTable };
