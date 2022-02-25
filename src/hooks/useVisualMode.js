import React, { useState } from "react";


export default function useVisualMode(initial) {
  const[mode/*string of actions (empty, add, etc)*/, setMode] = useState(initial);
  const [history/*array of previous modes*/, setHistory] = useState([initial]); // This line is new!

  function transition(newMode, replace = false) {
    
    if (replace) {
      setMode(newMode)
    } else {
      history.push(newMode);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length-2 >= 0) {
      setMode(history[history.length-2]);
      history.pop();
    }
  }

  return {mode, transition, back};
}
