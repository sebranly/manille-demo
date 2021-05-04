import * as React from "react";
import { IoIosConstruct } from "react-icons/io";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { isMobile } from "react-device-detect";

import TenClubs from "./img/cards/10clubs.svg";
import AceClubs from "./img/cards/aceclubs.svg";
import KingClubs from "./img/cards/kingclubs.svg";
import QueenClubs from "./img/cards/queenclubs.svg";
import JackClubs from "./img/cards/jackclubs.svg";
import NineClubs from "./img/cards/9clubs.svg";
import EightClubs from "./img/cards/8clubs.svg";
import SevenClubs from "./img/cards/7clubs.svg";

import TenDiamonds from "./img/cards/10diamonds.svg";
import AceDiamonds from "./img/cards/acediamonds.svg";
import KingDiamonds from "./img/cards/kingdiamonds.svg";
import QueenDiamonds from "./img/cards/queendiamonds.svg";
import JackDiamonds from "./img/cards/jackdiamonds.svg";
import NineDiamonds from "./img/cards/9diamonds.svg";
import EightDiamonds from "./img/cards/8diamonds.svg";
import SevenDiamonds from "./img/cards/7diamonds.svg";

import TenHearts from "./img/cards/10hearts.svg";
import AceHearts from "./img/cards/acehearts.svg";
import KingHearts from "./img/cards/kinghearts.svg";
import QueenHearts from "./img/cards/queenhearts.svg";
import JackHearts from "./img/cards/jackhearts.svg";
import NineHearts from "./img/cards/9hearts.svg";
import EightHearts from "./img/cards/8hearts.svg";
import SevenHearts from "./img/cards/7hearts.svg";

import TenSpades from "./img/cards/10spades.svg";
import AceSpades from "./img/cards/acespades.svg";
import KingSpades from "./img/cards/kingspades.svg";
import QueenSpades from "./img/cards/queenspades.svg";
import JackSpades from "./img/cards/jackspades.svg";
import NineSpades from "./img/cards/9spades.svg";
import EightSpades from "./img/cards/8spades.svg";
import SevenSpades from "./img/cards/7spades.svg";

const App = () => {
  if (isMobile) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Manille Demo</title>
          <link
            rel="canonical"
            href="https://sebranly.github.io/manille-demo"
          />
        </Helmet>
        <div className="mobile">
          <h1>Manille Demo</h1>
          <div>
            We are working hard to make this website accessible on mobile. In
            the meantime, please visit it on a computer instead. Thank you for
            your understanding!
          </div>
        </div>
        <br />
        <IoIosConstruct className="icon-mobile" size="100px" />
      </HelmetProvider>
    );
  }

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
          <div className="flex-three">
            <div className="demo-player demo-player-top">
              <h3>Player 1</h3>
              <div className="demo-cards">
                <img
                  className="demo-card width-eight-cards"
                  src={TenClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={AceClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={KingClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={QueenClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={JackClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={NineClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={EightClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={SevenClubs}
                  alt="React Logo"
                />
              </div>
            </div>

            <div className="demo-container">
              <div className="demo-player demo-player-left flex-one">
                <h3>Player 4</h3>
                <div className="demo-cards">
                  <img
                    className="demo-card width-four-cards"
                    src={TenSpades}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={AceClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={KingClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={QueenClubs}
                    alt="React Logo"
                  />
                </div>
                <div className="demo-cards">
                  <img
                    className="demo-card width-four-cards"
                    src={TenSpades}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={AceClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={KingClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={QueenClubs}
                    alt="React Logo"
                  />
                </div>
              </div>

              <div className="flex-one">
                <h2>Table</h2>
                <div className="demo-table"></div>
              </div>

              <div className="demo-player demo-player-right flex-one">
                <h3>Player 2</h3>
                <div className="demo-cards">
                  <img
                    className="demo-card width-four-cards"
                    src={TenSpades}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={AceClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={KingClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={QueenClubs}
                    alt="React Logo"
                  />
                </div>
                <div className="demo-cards">
                  <img
                    className="demo-card width-four-cards"
                    src={TenSpades}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={AceClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={KingClubs}
                    alt="React Logo"
                  />
                  <img
                    className="demo-card width-four-cards"
                    src={QueenClubs}
                    alt="React Logo"
                  />
                </div>
              </div>
            </div>
            <div className="demo-player demo-player-bottom">
              <h3>Player 3</h3>
              <div className="demo-cards">
                <img
                  className="demo-card width-eight-cards"
                  src={TenClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={AceClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={KingClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={QueenClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={JackClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={NineClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={EightClubs}
                  alt="React Logo"
                />
                <img
                  className="demo-card width-eight-cards"
                  src={SevenClubs}
                  alt="React Logo"
                />
              </div>
            </div>
          </div>{" "}
          <div className="flex-two demo-cards">
            <h2>All cards</h2>
            <div className="demo-cards">
              <img
                className="demo-card width-eight-cards"
                src={TenClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={AceClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={KingClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={QueenClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={JackClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={NineClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={EightClubs}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={SevenClubs}
                alt="React Logo"
              />
            </div>
            <div className="demo-cards">
              <img
                className="demo-card width-eight-cards"
                src={TenDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards demo-card-player-top"
                src={AceDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards demo-card-player-top demo-card-player-right demo-card-player-bottom demo-card-player-left"
                src={KingDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={QueenDiamonds}
                alt="React Logo"
                onClick={() => console.log("oui")}
              />
              <img
                className="demo-card width-eight-cards"
                src={JackDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards demo-card-used"
                src={NineDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={EightDiamonds}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={SevenDiamonds}
                alt="React Logo"
              />
            </div>
            <div className="demo-cards">
              <img
                className="demo-card width-eight-cards"
                src={TenSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={AceSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={KingSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={QueenSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={JackSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={NineSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={EightSpades}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={SevenSpades}
                alt="React Logo"
              />
            </div>
            <div className="demo-cards">
              <img
                className="demo-card width-eight-cards"
                src={TenHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={AceHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={KingHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={QueenHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={JackHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={NineHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={EightHearts}
                alt="React Logo"
              />
              <img
                className="demo-card width-eight-cards"
                src={SevenHearts}
                alt="React Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
