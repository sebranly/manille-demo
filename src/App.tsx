import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Card, CardRank, CardSuit, InfoSuitHighest } from 'manille/lib/types';
import { getCardsPoints } from 'manille/lib/scores';
import { initializeInfoCards, initializeInfoSuitHighest, updateInfoCards, updateInfoSuitHighest } from 'manille/lib/ia';
import { orderCards } from 'manille/lib/cards';
import { getLeaderFold } from 'manille/lib/game';

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
  const [botPlayerId, setBotPlayerId] = React.useState<0 | 1 | 2 | 3>(2);
  const [trumpSuit, setTrumpSuit] = React.useState<false | CardSuit>(false);
  const [currentPlayerId, setCurrentPlayerId] = React.useState<0 | 1 | 2 | 3>(0);
  const [startingPlayerId, setStartingPlayerId] = React.useState<0 | 1 | 2 | 3>(0);
  const [allPlayedCards, setAllPlayedCards] = React.useState<Card[]>([]);
  const [playedCards, setPlayedCards] = React.useState<Card[]>([]);
  const [logs, setLogs] = React.useState<string[]>(['Beginning of game']);
  const [infoSuitHighest, setInfoSuitHighest] = React.useState<InfoSuitHighest[]>(initializeInfoSuitHighest());
  const [infoCards, setInfoCards] = React.useState<Card[][]>(initializeInfoCards(botCards, botPlayerId));

  // TODO: name is awful and redundant
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
    if (isCardsSelectionStep) {
      // TODO: code function in manille package
      const hasCard = botCards.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);

      if (cardRank && cardSuit) {
        const newBotCards = hasCard
          ? botCards.filter((card: Card) => card.rank !== cardRank || card.suit !== cardSuit)
          : [...botCards, { rank: cardRank, suit: cardSuit }];
        setBotCards(newBotCards);
        if (newBotCards.length === CARDS_PER_PLAYER) setStep(Step.TrumpSuit);
      }
    }
  };

  const onClickCardPlay = (cardRank?: CardRank, cardSuit?: CardSuit) => {
    if (cardRank && cardSuit) {
      const hasPlayedCard = allPlayedCards.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);
      const infoCardsPlayer = infoCards[currentPlayerId];
      const canPlayCard = infoCardsPlayer.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);

      // TODO: use getPlayableCards and have clear UI

      if (!hasPlayedCard && canPlayCard) {
        const newPlayerPlayedCards = clone(playerPlayedCards);
        const card = { rank: cardRank, suit: cardSuit };
        newPlayerPlayedCards[currentPlayerId].push(card);
        setPlayerPlayedCards(newPlayerPlayedCards);

        const newAllPlayedCards = [...allPlayedCards, card];
        const newRemainingCards = clone(remainingCards);
        newRemainingCards[currentPlayerId]--;
        setRemainingCards(newRemainingCards);
        setAllPlayedCards(newAllPlayedCards);

        const newPlayedCards = [...playedCards, card];
        const newInfoSuitHighest = updateInfoSuitHighest(infoSuitHighest, newPlayedCards, startingPlayerId, trumpSuit);

        // TODO: length should be calculated through manille
        const newInfoCards = updateInfoCards(
          newInfoSuitHighest,
          infoCards,
          allPlayedCards,
          botPlayerId,
          newRemainingCards
        );

        console.log('🚀 ~ file: App.tsx ~ line 110 ~ onClickCardPlay ~ InfoCards', newInfoCards);

        setInfoSuitHighest(newInfoSuitHighest);
        setInfoCards(newInfoCards);

        if (newPlayedCards.length === NUMBER_PLAYERS) {
          const leaderId = getLeaderFold(newPlayedCards, startingPlayerId, trumpSuit);

          // TODO: fix it on the package level
          const castLeaderId = leaderId as 0 | 1 | 2 | 3;
          setStartingPlayerId(castLeaderId);
          setCurrentPlayerId(castLeaderId);
          const points = getCardsPoints(newPlayedCards);
          setLogs([...logs, `${getPlayerName(names, castLeaderId, botPlayerId)} scored ${points} points`]);

          setPlayedCards([]);
        } else {
          setCurrentPlayerId(((currentPlayerId + 1) % NUMBER_PLAYERS) as 0 | 1 | 2 | 3);
          setPlayedCards(newPlayedCards);
        }
      }
    }
  };

  const onChangePlayersNames = (index: number, value: string) => {
    const newNames = clone(names);
    newNames[index] = value;

    setNames(newNames);
  };

  const onChangeBotId = (index: 0 | 1 | 2 | 3) => setBotPlayerId(index);
  const onChangeCurrentPlayerId = (index: 0 | 1 | 2 | 3) => {
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
