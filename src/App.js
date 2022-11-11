import axios from 'axios';
import { useState, useEffect } from 'react';
import Home from './components/Home.js';
import background from './assets/background.mp4';
import './styles/App.css';

function App() {
  const [state, setState] = useState({
    numberOfRounds: 5,
    round: 0,
    leftSideOption: {},
    rightSideOption: {},
    winner: {},
    genreFilter: '',
    playing: false,
    replace: '',
  })


  return (
    <div className="App">
      <video 
        className='background'
        src={background}
        autoPlay 
        muted 
        loop
      />
      <Home 
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default App;
