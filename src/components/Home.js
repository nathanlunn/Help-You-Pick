import React from 'react'
import '../styles/Home.css';
import title from '../assets/hyptitle.png';

export default function Home({state, setState}) {
  return (
    <div className='home'>
      <img 
        className='home__title' 
        src={title}
      />
      {!state.playing && (
        <div className='home__setupContainer'>
          <div className='home__rollContainer'>
            <div className='home__button home__button--rollNumber'>{state.numberOfRolls}</div>
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
