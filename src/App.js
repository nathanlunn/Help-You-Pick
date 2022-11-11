import axios from 'axios';
import { useState, useEffect } from 'react';
import Home from './Home.js';
import background from './assets/background.mp4';

function App() {
  const roll = () => {
    return Math.floor(Math.random() * 250) + 1;
  }

  useEffect(() => {
    const rollNumber = roll();
    axios.get(`https://kitsu.io/api/edge/anime/${rollNumber}`)
    .then(res => {
      const anime = res.data.data;
      console.log(anime.attributes.synopsis);
      setState(prev => ({...prev, leftSideOption: anime}));
    })
    .catch(err => {
      console.error(err.mesage);
    })

  },[])

  const [state, setState] = useState({
    numberOfRolls: 5,
    roll: 0,
    leftSideOption: {},
    rightSideOption: {},
    winner: {},
    genreFilter: '',
  })


  return (
    <div className="App">
      <video 
        src={background}
        autoPlay 
        muted 
        loop
      />
      {state.leftSideOption.attributes && (<Home 
        state={state}
        setState={setState}
      />)}
    </div>
  );
}

export default App;
