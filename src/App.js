import { useState, useEffect } from 'react';

function App() {
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
      Hello
    </div>
  );
}

export default App;
