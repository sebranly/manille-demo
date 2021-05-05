import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Card, CardRank, CardSuit } from 'manille/lib/types';
import { generateDeck, generateSuit } from 'manille/lib/cards';

import { PlayingSpace } from './components/PlayingSpace';
import { PlayingDeck } from './components/PlayingDeck';

const App = () => {
  const [horizontalSpace, setHorizontalSpace] = React.useState(true);
  const [expandDeck, setExpandDeck] = React.useState(true);
  const [botsCards, setBotsCards] = React.useState<Card[]>([]);
  const [start, setStart] = React.useState(false);

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

  const { Clubs, Diamonds, Hearts, Spades } = CardSuit;
  const playerCards = [generateSuit(Clubs), generateSuit(Diamonds), generateSuit(Spades), generateSuit(Hearts)];

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
        <button onClick={() => setHorizontalSpace(!horizontalSpace)}>Change layout table</button>
        <button onClick={() => setExpandDeck(!expandDeck)}>Change layout deck</button>
        {botsCards.length === 8 && <button onClick={() => setStart(true)}>Start!</button>}
        {botsCards.length < 8 && <div>Not enough cards for the bot</div>}
        {botsCards.length > 8 && <div>Too many cards for the bot</div>}
        <div className="demo-container">
          <PlayingSpace cards={playerCards} className={`${tableFlex} demo-space`} horizontal={horizontalSpace} />
          <div className={`${deckFlex} demo-cards`}>
            <h2>All cards</h2>
            <PlayingDeck
              botsCards={botsCards}
              cards={generateDeck()}
              displayMode={deckDisplayMode}
              onClick={(cardRank?: CardRank, cardSuit?: CardSuit) => {
                const hasCard = botsCards.some((card: Card) => card.rank === cardRank && card.suit === cardSuit);
                if (hasCard) {
                  const newBotsCards = botsCards.filter(
                    (card: Card) => card.rank !== cardRank || card.suit !== cardSuit
                  );

                  setBotsCards(newBotsCards);
                } else if (cardRank && cardSuit) {
                  setBotsCards([...botsCards, { rank: cardRank, suit: cardSuit }]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
