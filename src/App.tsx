import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { generateDeck, generateSuit, orderCards } from 'manille/lib/cards';

import { PlayingSpace } from './components/PlayingSpace';
import { PlayingDeck } from './components/PlayingDeck';
import { CARDS_PER_PLAYER } from './constants';

import { Status } from './types';
import { CardSelection } from './components/CardSelection';
import classnames from 'classnames';
import { PlayersNames } from './components/PlayersNames';

// TODO: import deeper
import { clone } from 'lodash';

const App = () => {
  const [horizontalSpace, setHorizontalSpace] = React.useState(true);
  const [expandDeck, setExpandDeck] = React.useState(true);
  const [botsCards, setBotsCards] = React.useState<Card[]>([]);
  const [names, setNames] = React.useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [status, setStatus] = React.useState(Status.PlayersNames);
  const [botPlayerId, setBotPlayerId] = React.useState<0 | 1 | 2 | 3>(2);

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

  const isCardsSelection = status === Status.CardsSelection;
  const isPlayersNames = status === Status.PlayersNames;
  const isPlay = status === Status.Play;

  const { Clubs, Diamonds, Hearts, Spades } = CardSuit;
  const emptyHand = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  const botsCardsDisplay = orderCards(botsCards);
  const playerCards: (Card | undefined)[][] = [emptyHand, emptyHand, emptyHand, emptyHand];
  playerCards[botPlayerId] = botsCardsDisplay;

  const onClickCardSelection = (cardRank?: CardRank, cardSuit?: CardSuit) => {
    if (isCardsSelection) {
      // TODO: code function in manille package
      const hasCard = botsCards.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);
      if (hasCard) {
        const newBotsCards = botsCards.filter((card: Card) => card.rank !== cardRank || card.suit !== cardSuit);

        setBotsCards(newBotsCards);
        if (newBotsCards.length === CARDS_PER_PLAYER) setStatus(Status.Play);
      } else if (cardRank && cardSuit) {
        const newBotsCards = [...botsCards, { rank: cardRank, suit: cardSuit }];
        setBotsCards(newBotsCards);
        if (newBotsCards.length === CARDS_PER_PLAYER) setStatus(Status.Play);
      }
    }
  };

  const onChangePlayersNames = (index: number, value: string) => {
    const newNames = clone(names);
    newNames[index] = value;

    setNames(newNames);
  };

  const onChangeBotId = (index: 0 | 1 | 2 | 3) => setBotPlayerId(index);

  const onClickPlayersNamesNextStep = () => setStatus(Status.CardsSelection);
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
                cards={playerCards}
                className={`${tableFlex} demo-space`}
                horizontal={horizontalSpace}
                names={names}
              />
              <div className={classesDeck}>
                <h2>All cards</h2>
                <PlayingDeck botsCards={botsCards} displayMode={deckDisplayMode} cards={generateDeck()} />
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
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
