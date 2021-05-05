import { CardSuit } from 'manille/lib/types';
import * as React from 'react';
import { NUMBER_PLAYERS } from '../constants';
import { getPlayerName, getPlayerSuffix } from '../utils';

export interface TrumpSuitSelectionProps {
  className?: string;
  onClickButton: () => void;
  onChangeTrumpSuit: (suit: CardSuit | false) => void;
  onChangeCurrentPlayerId: (index: 0 | 1 | 2 | 3) => void;
  botPlayerId: 0 | 1 | 2 | 3;
  names: string[];
  currentPlayerId: 0 | 1 | 2 | 3;
  trumpSuit: CardSuit | false;
}

const TrumpSuitSelection: React.FC<TrumpSuitSelectionProps> = (props) => {
  const {
    className,
    trumpSuit,
    currentPlayerId,
    botPlayerId,
    onClickButton,
    names,
    onChangeTrumpSuit,
    onChangeCurrentPlayerId
  } = props;

  const { Clubs, Diamonds, Hearts, Spades } = CardSuit;

  if (names.length !== NUMBER_PLAYERS) return null;

  // TODO: loop for 4
  const allIds: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3];
  const allSuits: (CardSuit | false)[] = [Clubs, Diamonds, Hearts, Spades, false];

  return (
    <>
      <div className="demo-container demo-half-width margin-auto">
        <div className="flex-one margin-auto text-align-left">
          {allIds.map((id: 0 | 1 | 2 | 3) => {
            return (
              <div className="demo-margin-y demo-margin-x min" key={id}>
                <input
                  className={`demo-player-${getPlayerSuffix(id)}`}
                  type="radio"
                  checked={currentPlayerId === id}
                  value="0"
                  name="currentPlayerId"
                  onChange={() => onChangeCurrentPlayerId(id)}
                />{' '}
                {getPlayerName(names, id, botPlayerId)}
              </div>
            );
          })}
        </div>
        <div className="flex-one margin-auto text-align-left">
          {allSuits.map((suit: CardSuit | false) => {
            return (
              <div className="demo-margin-y demo-margin-x" key={suit || 'envoiture'}>
                <input
                  type="radio"
                  checked={trumpSuit === suit}
                  value="0"
                  name="trumpSuit"
                  onChange={() => onChangeTrumpSuit(suit)}
                />{' '}
                {suit || 'En voiture (no trump suit)'}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={onClickButton}>Next step</button>
    </>
  );
};

export { TrumpSuitSelection };
