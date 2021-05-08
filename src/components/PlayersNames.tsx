import { PlayerId } from 'manille/lib/types';
import * as React from 'react';
import { NUMBER_PLAYERS } from '../constants';
import { getPlayerSuffix } from '../utils';

export interface PlayersNamesProps {
  className?: string;
  onClickButton: () => void;
  onChange: (index: PlayerId, value: string) => void;
  onChangeBotId: (index: PlayerId) => void;
  botPlayerId: PlayerId;
  names: string[];
}

const PlayersNames: React.FC<PlayersNamesProps> = (props) => {
  const { className, botPlayerId, onClickButton, onChange, onChangeBotId, names } = props;

  if (names.length !== NUMBER_PLAYERS) return null;

  // TODO: loop for 4
  const allIds: PlayerId[] = [0, 1, 2, 3];
  return (
    <div className="demo-center">
      {allIds.map((id: PlayerId) => {
        const isBot = botPlayerId === id;

        return (
          <div className="demo-margin-y" key={id}>
            <input
              className={`demo-player-${getPlayerSuffix(id)}`}
              type="text"
              value={names[id]}
              onChange={(e) => onChange(id, e.target.value)}
            />
            <input
              className="demo-margin-left"
              type="radio"
              value={`${id}`}
              name=""
              checked={isBot}
              onChange={() => onChangeBotId(id)}
            />{' '}
            Is myself
          </div>
        );
      })}
      <button onClick={onClickButton}>Next step</button>
    </div>
  );
};

export { PlayersNames };
