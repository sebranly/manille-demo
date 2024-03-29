import * as React from 'react';
import { getPlayerName } from '../utils';
import classnames from 'classnames';
import { PlayerId } from 'manille/lib/types';

export interface PlayerNameProps {
  className?: string;
  names: string[];
  botPlayerId: PlayerId;
  currentPlayerId: PlayerId;
  playerId: PlayerId;
}

const PlayerName: React.FC<PlayerNameProps> = (props) => {
  const { names, className, botPlayerId, currentPlayerId, playerId } = props;
  const name = getPlayerName(names, playerId, botPlayerId);
  const classes = classnames({ 'demo-current-player': playerId === currentPlayerId });

  return <h3 className={classes}>{name}</h3>;
};

export { PlayerName };
