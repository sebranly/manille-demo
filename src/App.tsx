import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Card, CardRank, CardSuit, InfoSuitHighest, PlayerId } from 'manille/lib/types';
import { getCardsPoints } from 'manille/lib/scores';
import { initializeInfoCards, initializeInfoSuitHighest, updateInfoCards, updateInfoSuitHighest } from 'manille/lib/ia';
import { excludeCards, hasCard, orderCards } from 'manille/lib/cards';
import { getLeaderFold, getPlayerId } from 'manille/lib/game';

import { PlayingSpace } from './components/PlayingSpace';
import { PlayingDeck } from './components/PlayingDeck';
import { CARDS_PER_PLAYER, NUMBER_PLAYERS } from './constants';

import { Step } from './types';
import { CardSelection } from './components/CardSelection';
import classnames from 'classnames';
import { PlayersNames } from './components/PlayersNames';

import clone from 'lodash/clone';
import reverse from 'lodash/reverse';
import { TrumpSuitSelection } from './components/TrumpSuitSelection';
import { getPlayerName } from './utils';

const App = () => {
  const [horizontalSpace, setHorizontalSpace] = React.useState(true);
  const [expandDeck, setExpandDeck] = React.useState(true);
  const [botCards, setBotCards] = React.useState<Card[]>([]);
  const [names, setNames] = React.useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [step, setStep] = React.useState(Step.PlayersNames);
  const [botPlayerId, setBotPlayerId] = React.useState<PlayerId>(2);
  const [trumpSuit, setTrumpSuit] = React.useState<false | CardSuit>(false);
  const [currentPlayerId, setCurrentPlayerId] = React.useState<PlayerId>(0);
  const [startingPlayerId, setStartingPlayerId] = React.useState<PlayerId>(0);
  const [allPlayedCards, setAllPlayedCards] = React.useState<Card[]>([]);
  const [playedCards, setPlayedCards] = React.useState<Card[]>([]);
  const [logs, setLogs] = React.useState<string[]>(['DEBUG LOGS', 'Beginning of game']);
  const [infoSuitHighest, setInfoSuitHighest] = React.useState<InfoSuitHighest[]>(initializeInfoSuitHighest());
  const [infoCards, setInfoCards] = React.useState<Card[][]>(initializeInfoCards(botCards, botPlayerId));

  // TODO: name is awful and redundant. Use playedBy and playedAt from Card instead.
  const [playerPlayedCards, setPlayerPlayedCards] = React.useState<Card[][]>([[], [], [], []]);
  const [remainingCards, setRemainingCards] = React.useState<number[]>([
    CARDS_PER_PLAYER,
    CARDS_PER_PLAYER,
    CARDS_PER_PLAYER,
    CARDS_PER_PLAYER
  ]);

  React.useEffect(() => {
    setInfoCards(initializeInfoCards(botCards, botPlayerId));
  }, [botCards, botPlayerId]);

  const tableFlex = expandDeck ? 'flex-three' : 'flex-two';
  const deckFlex = expandDeck ? 'flex-two' : 'flex-one';
  const deckDisplayMode = expandDeck ? 8 : 4;

  if (isMobile) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Manille Demo</title>
          <link rel="canonical" href="https://sebranly.github.io/manille-demo" />
        </Helmet>
        <div className="mobile">
          <h1>Manille Demo</h1>
          <div>
            We are working hard to make this website accessible on mobile. In the meantime, please visit it on a
            computer instead. Thank you for your understanding!
          </div>
        </div>
        <br />
        <IoIosConstruct className="icon-mobile" size="100px" />
      </HelmetProvider>
    );
  }

  const isCardsSelectionStep = step === Step.CardsSelection;
  const isPlayersNamesStep = step === Step.PlayersNames;
  const isPlayStep = step === Step.Play;
  const isTrumpSuitStep = step === Step.TrumpSuit;

  const emptyHand = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  const botCardsDisplay = orderCards(botCards);
  const playerCards: (Card | undefined)[][] = [emptyHand, emptyHand, emptyHand, emptyHand];

  for (let i = 0; i < NUMBER_PLAYERS; i++) {
    if (i === botPlayerId) playerCards[i] = botCardsDisplay;
    else {
      const knownCards = reverse(clone(playerPlayedCards[i]));
      const unknownCardsLength = CARDS_PER_PLAYER - knownCards.length;
      const unknownCards = emptyHand.slice(0, unknownCardsLength);
      const cardsDisplay = [...unknownCards, ...knownCards];

      playerCards[i] = cardsDisplay;
    }
  }

  const onClickCardSelection = (cardRank?: CardRank, cardSuit?: CardSuit) => {
    if (isCardsSelectionStep && cardRank && cardSuit) {
      const card: Card = { rank: cardRank, suit: cardSuit };
      const botHasCard = hasCard(botCards, card);
      const newBotCards = botHasCard ? excludeCards(botCards, [card]) : [...botCards, card];

      setBotCards(newBotCards);

      if (newBotCards.length === CARDS_PER_PLAYER) setStep(Step.TrumpSuit);
    }
  };

  const onClickCardPlay = (cardRank?: CardRank, cardSuit?: CardSuit) => {
    if (cardRank && cardSuit) {
      const card: Card = { rank: cardRank, suit: cardSuit };
      const hasPlayedCard = hasCard(allPlayedCards, card);
      const infoCardsPlayer = infoCards[currentPlayerId];
      const canPlayCard = hasCard(infoCardsPlayer, card);

      // TODO: use getPlayableCards and have clear UI

      if (!hasPlayedCard && canPlayCard) {
        const newPlayerPlayedCards = clone(playerPlayedCards);
        newPlayerPlayedCards[currentPlayerId].push(card);
        setPlayerPlayedCards(newPlayerPlayedCards);

        const newRemainingCards = clone(remainingCards);
        newRemainingCards[currentPlayerId]--;
        setRemainingCards(newRemainingCards);

        const newAllPlayedCards = [...allPlayedCards, card];
        setAllPlayedCards(newAllPlayedCards);

        const newPlayedCards = [...playedCards, card];
        const newInfoSuitHighest = updateInfoSuitHighest(infoSuitHighest, newPlayedCards, startingPlayerId, trumpSuit);
        setInfoSuitHighest(newInfoSuitHighest);

        // TODO: length should be calculated through manille
        const newInfoCards = updateInfoCards(
          newInfoSuitHighest,
          infoCards,
          allPlayedCards,
          botPlayerId,
          newRemainingCards
        );

        setInfoCards(newInfoCards);

        if (newPlayedCards.length === NUMBER_PLAYERS) {
          const leaderId = getLeaderFold(newPlayedCards, startingPlayerId, trumpSuit);

          if (leaderId !== -1) {
            setStartingPlayerId(leaderId);
            setCurrentPlayerId(leaderId);
            const points = getCardsPoints(newPlayedCards);
            setLogs([...logs, `${getPlayerName(names, leaderId, botPlayerId)} scored ${points} points`]);

            // TODO: find a way to show last card being played for a few ms?
            setPlayedCards([]);
          }
        } else {
          const newId = getPlayerId(currentPlayerId, 1);
          setCurrentPlayerId(newId);
          setPlayedCards(newPlayedCards);
        }
      }
    }
  };

  const onChangePlayersNames = (index: PlayerId, value: string) => {
    const newNames = clone(names);
    newNames[index] = value;

    setNames(newNames);
  };

  const onChangeBotId = (index: PlayerId) => setBotPlayerId(index);
  // TODO: change name to starting
  const onChangeCurrentPlayerId = (index: PlayerId) => {
    setCurrentPlayerId(index);
    setStartingPlayerId(index);
  };

  const onChangeTrumpSuit = (suit: CardSuit | false) => setTrumpSuit(suit);

  const onClickPlayersNamesNextStep = () => setStep(Step.CardsSelection);
  const onClickTrumpSuitSelectionNext = () => setStep(Step.Play);
  const classesDeck = classnames('demo-cards', deckFlex);
  const classesContainer = classnames('demo-container', { 'demo-center': isPlayersNamesStep });

  return (
    <HelmetProvider>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        data-cross-origin="anonymous"
      />
      <Helmet>
        <title>Manille Demo</title>
        <link rel="canonical" href="https://sebranly.github.io/manille-demo" />
      </Helmet>
      <div className="main">
        <h1>Manille</h1>
        {isPlayStep && (
          <>
            <button className="demo-button" onClick={() => setHorizontalSpace(!horizontalSpace)}>
              Change table layout
            </button>
            <button className="demo-button" onClick={() => setExpandDeck(!expandDeck)}>
              Change deck layout
            </button>
          </>
        )}
        <div className={classesContainer}>
          {isPlayStep && (
            <>
              <PlayingSpace
                botPlayerId={botPlayerId}
                currentPlayerId={currentPlayerId}
                startingPlayerId={startingPlayerId}
                playedCards={playedCards}
                cards={playerCards}
                className={`${tableFlex} demo-space`}
                horizontal={horizontalSpace}
                names={names}
              />
              <div className={classesDeck}>
                <h2>All cards</h2>
                <PlayingDeck
                  botCards={botCards}
                  displayMode={deckDisplayMode}
                  infoCards={infoCards}
                  showOwners={true}
                  onClick={onClickCardPlay}
                  allPlayedCards={allPlayedCards}
                  playerPlayedCards={playerPlayedCards}
                />
              </div>
            </>
          )}
          {isCardsSelectionStep && <CardSelection botCards={botCards} onClickCard={onClickCardSelection} />}
          {isPlayersNamesStep && (
            <PlayersNames
              botPlayerId={botPlayerId}
              names={names}
              onClickButton={onClickPlayersNamesNextStep}
              onChange={onChangePlayersNames}
              onChangeBotId={onChangeBotId}
            />
          )}
        </div>{' '}
        <div>
          {isPlayStep &&
            logs.map((log: string, index: number) => {
              return (
                <div className="" key={index}>
                  {log}
                </div>
              );
            })}
        </div>
        {isTrumpSuitStep && (
          <TrumpSuitSelection
            botPlayerId={botPlayerId}
            names={names}
            currentPlayerId={currentPlayerId}
            trumpSuit={trumpSuit}
            onClickButton={onClickTrumpSuitSelectionNext}
            onChangeCurrentPlayerId={onChangeCurrentPlayerId}
            onChangeTrumpSuit={onChangeTrumpSuit}
          />
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
