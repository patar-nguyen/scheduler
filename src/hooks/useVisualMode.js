import React, { useState } from "react";


export default function useVisualMode(initial) {
  const[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  //Transitions user from one page to the next
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
    } else {
      history.push(newMode);
      setMode(newMode);
    }
  }
  //Function that returns user back one page
  function back() {
    if (history.length-2 >= 0) {
      setMode(history[history.length-2]);
      history.pop();
    }
  }

  return {mode, transition, back};
}
