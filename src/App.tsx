import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { CardSuit } from 'manille/lib/types';
import { generateSuit } from 'manille/lib/cards';

import { PlayingCards } from './components/PlayingCards';
import { PlayingTable } from './components/PlayingTable';

const App = () => {
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
        <div className="demo-container">
          <PlayingTable cards={playerCards} className="flex-three" />
          <div className="flex-two demo-cards">
            <h2>All cards</h2>
            <PlayingCards cards={generateSuit(Clubs)} />
            <PlayingCards cards={generateSuit(Diamonds)} />
            <PlayingCards cards={generateSuit(Spades)} />
            <PlayingCards cards={generateSuit(Hearts)} />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
