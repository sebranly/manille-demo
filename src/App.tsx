import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { initializeInfoCards } from 'manille/lib/ia';
import { generateSuit, orderCards } from 'manille/lib/cards';

import { PlayingSpace } from './components/PlayingSpace';
import { PlayingDeck } from './components/PlayingDeck';
import { CARDS_PER_PLAYER } from './constants';

import { Status } from './types';
import { CardSelection } from './components/CardSelection';
import classnames from 'classnames';
import { PlayersNames } from './components/PlayersNames';

// TODO: import deeper
import { clone } from 'lodash';
import { TrumpSuitSelection } from './components/TrumpSuitSelection';

const App = () => {
  const [horizontalSpace, setHorizontalSpace] = React.useState(true);
  const [expandDeck, setExpandDeck] = React.useState(true);
  // TODO: put empty again
  const [botsCards, setBotsCards] = React.useState<Card[]>(generateSuit(CardSuit.Clubs));
  const [names, setNames] = React.useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [status, setStatus] = React.useState(Status.TrumpSuit);
  const [botPlayerId, setBotPlayerId] = React.useState<0 | 1 | 2 | 3>(2);
  const [trumpSuit, setTrumpSuit] = React.useState<false | CardSuit>(false);
  const [currentPlayerId, setCurrentPlayerId] = React.useState<0 | 1 | 2 | 3>(0);

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

  // TODO: add step suffix to all
  const isCardsSelection = status === Status.CardsSelection;
  const isPlayersNames = status === Status.PlayersNames;
  const isPlay = status === Status.Play;
  const isTrumpSuitStep = status === Status.TrumpSuit;

  const emptyHand = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  const botsCardsDisplay = orderCards(botsCards);
  const playerCards: (Card | undefined)[][] = [emptyHand, emptyHand, emptyHand, emptyHand];
  playerCards[botPlayerId] = botsCardsDisplay;

  // TODO: rename from bots to bot
  const infoCards: Card[][] = initializeInfoCards(botsCards, botPlayerId);

  const onClickCardSelection = (cardRank?: CardRank, cardSuit?: CardSuit) => {
    if (isCardsSelection) {
      // TODO: code function in manille package
      const hasCard = botsCards.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);
      if (hasCard) {
        const newBotsCards = botsCards.filter((card: Card) => card.rank !== cardRank || card.suit !== cardSuit);

        setBotsCards(newBotsCards);
        // TODO: factorize
        if (newBotsCards.length === CARDS_PER_PLAYER) setStatus(Status.TrumpSuit);
      } else if (cardRank && cardSuit) {
        const newBotsCards = [...botsCards, { rank: cardRank, suit: cardSuit }];
        setBotsCards(newBotsCards);
        if (newBotsCards.length === CARDS_PER_PLAYER) setStatus(Status.TrumpSuit);
      }
    }
  };

  const onChangePlayersNames = (index: number, value: string) => {
    const newNames = clone(names);
    newNames[index] = value;

    setNames(newNames);
  };

  const onChangeBotId = (index: 0 | 1 | 2 | 3) => setBotPlayerId(index);
  const onChangeCurrentPlayerId = (index: 0 | 1 | 2 | 3) => setCurrentPlayerId(index);
  const onChangeTrumpSuit = (suit: CardSuit | false) => setTrumpSuit(suit);

  const onClickPlayersNamesNextStep = () => setStatus(Status.CardsSelection);
  const onClickTrumpSuitSelectionNext = () => setStatus(Status.Play);
  const classesDeck = classnames('demo-cards', deckFlex);
  const classesContainer = classnames('demo-container', { 'demo-center': isPlayersNames });

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
        {isPlay && (
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
          {isPlay && (
            <>
              <PlayingSpace
                botPlayerId={botPlayerId}
                currentPlayerId={currentPlayerId}
                cards={playerCards}
                className={`${tableFlex} demo-space`}
                horizontal={horizontalSpace}
                names={names}
              />
              <div className={classesDeck}>
                <h2>All cards</h2>
                <PlayingDeck
                  botsCards={botsCards}
                  displayMode={deckDisplayMode}
                  infoCards={infoCards}
                  showOwners={true}
                />
              </div>
            </>
          )}
          {isCardsSelection && <CardSelection botsCards={botsCards} onClickCard={onClickCardSelection} />}
          {isPlayersNames && (
            <PlayersNames
              botPlayerId={botPlayerId}
              names={names}
              onClickButton={onClickPlayersNamesNextStep}
              onChange={onChangePlayersNames}
              onChangeBotId={onChangeBotId}
            />
          )}
        </div>{' '}
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
