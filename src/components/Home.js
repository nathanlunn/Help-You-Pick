import React from 'react'
import '../styles/Home.css';
import title from '../assets/hyptitle.png';
import instructions from '../assets/hypinstruct.png';

export default function Home({state, setState}) {
  const left = '<';
  const right = '>';


  return (
    <div className='home'>
      <img 
        className='home__title' 
        src={title}
      />
      {!state.playing && (
        <div className='home__setupContainer'>
          <img 
            className='home__instructions'
            src={instructions}
          />
          <h2 className='home__rollNumberDescription'>Number Of Rounds:</h2>
          <div className='home__rollContainer'>
            <button
              className={state.numberOfRolls > 5 ? 'home__button home__button--rollManipulate' : 'home__button home__button--rollManipulate hide'}
              onClick={() => {
                if (state.numberOfRolls > 5) {
                  setState(prev => ({...prev, numberOfRolls: state.numberOfRolls - 1}))
                }
              }}
            >{left}</button>
            <div className='home__button home__button--rollNumber'>{state.numberOfRolls}</div>
            <button
              className={state.numberOfRolls < 10 ? 'home__button home__button--rollManipulate' : 'home__button home__button--rollManipulate hide'}
              onClick={() => {
                if (state.numberOfRolls < 10) {
                  setState(prev => ({...prev, numberOfRolls: state.numberOfRolls + 1}))
                }
              }}
              >{right}</button>
          </div>
          <button
            className='home__button home__button--startChoosing'
            onClick={() => {setState(prev => ({...prev, playing: true}))}}
          >Start Choosing</button>
        </div>
      )}
    </div>
  )
}
