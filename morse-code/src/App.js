import React, { useEffect } from "react";
import "./App.css";
import SoundButton from "./components/SoundButton.js";

function App() {
  // Load in the morse code library that plays the sound.
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://fkurz.net/ham/jscwlib/src/jscwlib.js";
    script.async = true;

    // To access code from an external js script tag, access it from the window.
    let m = new window.jscw({"wpm": 25});

    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <SoundButton />
      <div id="player"></div>
    </div>
  );
}

export default App;
