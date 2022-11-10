import React, { useState, useEffect } from "react";
import "./App.css";
import SoundButton from "./components/SoundButton.js";

// Node module function that generates a random word.
const randomWords = require("random-words");

// Have to have this globally so that every function can access it and that it is only created once.
// Every time after, we just want to edit the properties.
let morseCodeObj;

function App() {
  const [isFirstSound, setIsFirstSound] = useState(true);
  const [wpm, setWpm] = useState(5);
  const [morseText, setMorseText] = useState("Hello There");

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

  let changeWpm = () => {
    setWpm(25);
  };

  // Next, make another(?) function (or put it in the same function with a useState bool that determines this) or generate single letters in this function.
  const generateRandomWord = () => {
    let ranWord = randomWords();
    setMorseText(ranWord);
  };

  // Load in the morse code library that plays the sound.
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://fkurz.net/ham/jscwlib/src/jscwlib.js";
    script.async = true;

    // If first time, create the object. Otherwise, stop the current sound and then create another object.
    if (isFirstSound) {
      morseCodeObj = new window.jscw({ wpm: wpm, text: morseText });
      morseCodeObj.renderPlayer("player", morseCodeObj);

      setIsFirstSound(false);
    } else {
      createNewSoundInstance();
    }

    document.body.appendChild(script);
  }, [wpm, morseText]);

  return (
    <div className="App">
      <div onClick={() => generateRandomWord()}>
        <SoundButton />
      </div>
      <div id="player"></div>
      <div onClick={() => changeWpm()}>Change to 25 WPM</div>
    </div>
  );
}

export default App;