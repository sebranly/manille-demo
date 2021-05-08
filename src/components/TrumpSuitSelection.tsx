import { CardSuit, PlayerId } from 'manille/lib/types';
import * as React from 'react';
import { NUMBER_PLAYERS } from '../constants';
import { getPlayerName, getPlayerSuffix } from '../utils';

export interface TrumpSuitSelectionProps {
  className?: string;
  onClickButton: () => void;
  onChangeTrumpSuit: (suit: CardSuit | false) => void;
  onChangeCurrentPlayerId: (index: PlayerId) => void;
  botPlayerId: PlayerId;
  names: string[];
  currentPlayerId: PlayerId;
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
  const allIds: PlayerId[] = [0, 1, 2, 3];
  const allSuits: (CardSuit | false)[] = [Clubs, Diamonds, Hearts, Spades, false];

  return (
    <>
      <div className="demo-container demo-half-width margin-auto">
        <div className="flex-one margin-auto text-align-left">
          <h2>Starting player</h2>
          {allIds.map((id: PlayerId) => {
            return (
              <div
                className={`demo-padding-left demo-margin-y demo-margin-x min demo-player-${getPlayerSuffix(id)}`}
                key={id}
              >
                <input
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
          <h2>Trump suit</h2>
          {allSuits.map((suit: CardSuit | false) => {
            const labelSuit = suit || 'no-trump-suit';
            return (
              <div className={`demo-padding-left demo-margin-y demo-margin-x demo-suit-${labelSuit}`} key={labelSuit}>
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
