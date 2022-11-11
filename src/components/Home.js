import React, {useState, useEffect} from 'react'
import '../styles/Home.css';
import title from '../assets/hyptitle.png';
import instructions from '../assets/hypinstruct.png';
import AnimeChoice from './AnimeChoice.js';
import axios from 'axios';

export default function Home({state, setState}) {
  const left = '<';
  const right = '>';
  const roll = () => {
    return Math.floor(Math.random() * 250) + 1;
  }

  useEffect(() => {
    if (state.replace === 'both') {
      console.log('here')
      let rollNumber = roll();
      axios.get(`https://kitsu.io/api/edge/anime/${rollNumber}`)
      .then(res => {
        const anime = res.data.data;
        setState(prev => ({...prev, leftSideOption: anime}));
        rollNumber = roll();
        axios.get(`https://kitsu.io/api/edge/anime/${rollNumber}`)
        .then(res => {
          const anime = res.data.data;
          setState(prev => ({...prev, rightSideOption: anime}));
        })
      })
      .catch(err => {
        console.error(err.mesage);
      })
    }
  }, [state.replace])

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
              className={state.numberOfRounds > 5 ? 'home__button home__button--rollManipulate' : 'home__button home__button--rollManipulate hide'}
              onClick={() => {
                if (state.numberOfRounds > 5) {
                  setState(prev => ({...prev, numberOfRounds: state.numberOfRounds - 1}))
                }
              }}
            >{left}</button>
            <div className='home__button home__button--rollNumber'>{state.numberOfRounds}</div>
            <button
              className={state.numberOfRounds < 10 ? 'home__button home__button--rollManipulate' : 'home__button home__button--rollManipulate hide'}
              onClick={() => {
                if (state.numberOfRounds < 10) {
                  setState(prev => ({...prev, numberOfRounds: state.numberOfRounds + 1}))
                }
              }}
              >{right}</button>
          </div>
          <button
            className='home__button home__button--startChoosing'
            onClick={() => {setState(prev => ({...prev, playing: true, replace: 'both'}))}}
          >Start Choosing</button>
        </div>
      )}

      {state.playing && (
        <div className='home__playingContainer'>
          <h3 className='home__roundsLeft'>{state.numberOfRounds - state.round === 1 ? (
            `${state.numberOfRounds - state.round} round left`
          ) : (
            `${state.numberOfRounds - state.round} rounds left`
          )}</h3>
          <div className='home__battleContainer'>
            <AnimeChoice
              state={state}
              setState={setState}
              anime={state.leftSideOption}
            />
            <AnimeChoice 
              state={state}
              setState={setState}
              anime={state.rightSideOption}
            /> 
          </div>
        </div>
      )}
    </div>
  )
}
