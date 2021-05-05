import * as React from 'react';
import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { CARDS_PER_PLAYER, NUMBER_PLAYERS } from '../constants';
import { generateDeck } from 'manille/lib/cards';
import { PlayingDeck } from './PlayingDeck';

export interface PlayersNamesProps {
  className?: string;
  onClickButton: () => void;
  onChange: (index: number, value: string) => void;
  names: string[];
}

const PlayersNames: React.FC<PlayersNamesProps> = (props) => {
  const { className, onClickButton, onChange, names } = props;

  if (names.length !== NUMBER_PLAYERS) return null;

  return (
    <div className="demo-center">
      <input className="demo-block" type="text" value={names[0]} onChange={(e) => onChange(0, e.target.value)} />
      <input className="demo-block" type="text" value={names[1]} onChange={(e) => onChange(1, e.target.value)} />
      <input className="demo-block" type="text" value={names[2]} onChange={(e) => onChange(2, e.target.value)} />
      <input className="demo-block" type="text" value={names[3]} onChange={(e) => onChange(3, e.target.value)} />
      <button onClick={onClickButton}>Next step</button>
    </div>
  );
};

export { PlayersNames };
