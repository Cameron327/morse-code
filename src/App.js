import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button.js";
import styles from "./styles/App.module.scss";
const morseCodeConverter = require("morse-code-converter");

// Node module function that generates a random word.
const randomWords = require("random-words");
const commonWpm = [5, 10, 15, 20, 25];
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Have to have this globally so that every function can access it and that it is only created once.
// Every time after, we just want to edit the properties.
let morseCodeObj;
let isFirstSound = true;

function App() {
  const [wpm, setWpm] = useState(5);
  const [morseText, setMorseText] = useState("Cameron Yee");
  const [morseCode, setMorseCode] = useState(
    "-.-. .- -- . .-. --- -.   -.-- . ."
  );
  const [showMorseCode, setShowMorseCode] = useState(false);
  const [showMorseText, setShowMorseText] = useState(false);

  let changeWpm = (speed) => {
    setWpm(speed);
  };

  const generateRandomWord = () => {
    let ranWord = randomWords();
    setMorseText(ranWord);
    let morseCode = morseCodeConverter.textToMorse(ranWord);
    setMorseCode(morseCode);

    setShowMorseCode(false);
    setShowMorseText(false);
  };

  const generateRandomLetter = () => {
    console.log(alphabet.length);
    let ranNumIndex = Math.floor(Math.random() * alphabet.length);
    let letter = alphabet[ranNumIndex].toUpperCase();
    setMorseText(letter);
    let morseCode = morseCodeConverter.textToMorse(letter);
    setMorseCode(morseCode);

    setShowMorseCode(false);
    setShowMorseText(false);
  };

  // Load in the morse code library and create an instance.
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://fkurz.net/ham/jscwlib/src/jscwlib.js";
    script.async = true;

    let createNewSoundInstance = () => {
      // Stop the previous iteration only if in the middle of it. Otherwise, can just create a new player without stopping the previous one.
      // Basically, only stop if something is playing.
      if (morseCodeObj.getLength() !== 0) {
        morseCodeObj.stop();
      }

      // To access code from an external js script tag, access it from the window.
      morseCodeObj = new window.jscw({ wpm: wpm, text: morseText });
      morseCodeObj.renderPlayer("player", morseCodeObj);
    };

    // If first time, create the object. Otherwise, stop the current sound and then create another object.
    if (isFirstSound) {
      morseCodeObj = new window.jscw({ wpm: wpm, text: morseText });
      morseCodeObj.renderPlayer("player", morseCodeObj);

      isFirstSound = false;
    } else {
      createNewSoundInstance();
    }

    document.body.appendChild(script);
  }, [wpm, morseText]);

  return (
    <div className="App">
      <div className={styles.settings}>
        <div className={styles.clickable} onClick={() => generateRandomWord()}>
          <Button text={"Random Word"} />
        </div>
        <div className={styles.clickable} onClick={() => generateRandomLetter()}>
          <Button text={"Random Letter"} />
        </div>
        {commonWpm.map((speed, key) => {
          return (
            <div key={key} onClick={() => changeWpm(speed)} className={styles.clickable}>
              <Button key={key} text={`${speed} WPM`} />
            </div>
          );
        })}
      </div>
      <div className={styles.player}>
        <div id="player"></div>
      </div>

      {showMorseCode ? (
        <div onClick={() => setShowMorseCode(false)}>
          <p className={styles.text}>{morseCode}</p>
        </div>
      ) : (
        <div onClick={() => setShowMorseCode(true)}>
          <p className={styles.text}>Click to show Morse Code</p>
        </div>
      )}

      {showMorseText ? (
        <div onClick={() => setShowMorseText(false)}>
          <p className={styles.text}>{morseText}</p>
        </div>
      ) : (
        <div onClick={() => setShowMorseText(true)}>
          <p className={styles.text}>Click to show Morse Text</p>
        </div>
      )}
    </div>
  );
}

export default App;
