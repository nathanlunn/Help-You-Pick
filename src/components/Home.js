import React, {useState, useEffect} from 'react'
import '../styles/Home.css';
import title from '../assets/hyptitle.png';
import instructions from '../assets/hypinstruct.png';
import google from '../assets/goog.png';
import AnimeChoice from './AnimeChoice.js';
import axios from 'axios';

export default function Home({state, setState}) {
  const left = '<';
  const right = '>';
  const roll = () => {
    return Math.floor(Math.random() * 250) + 1;
  }

  useEffect(() => {
    let rollNumber = roll();
    if (state.replace === 'both') {
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

    if (state.replace === 'right') {
      axios.get(`https://kitsu.io/api/edge/anime/${rollNumber}`)
      .then(res => {
        const anime = res.data.data;
        setState(prev => ({...prev, rightSideOption: anime, round: state.round + 1, replace: ''}));
      })
      .catch(err => {
        console.error(err.mesage);
      })
    }

    if (state.replace === 'left') {
      axios.get(`https://kitsu.io/api/edge/anime/${rollNumber}`)
      .then(res => {
        const anime = res.data.data;
        setState(prev => ({...prev, leftSideOption: anime, round: state.round + 1, replace: ''}));
      })
      .catch(err => {
        console.error(err.mesage);
      })
    }
  }, [state.replace])

  const reset = () => {
    setState(prev => ({...prev, playing: false, leftSideOption: {}, rightSideOption: {}, winner: {}, replace: '', numberOfRounds: 5, round: 0}))
  }

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
              className={state.numberOfRounds > 5 ? 'home__button home__button--rollManipulate home__button--less' : 'home__button home__button--rollManipulate hide'}
              onClick={() => {
                if (state.numberOfRounds > 5) {
                  setState(prev => ({...prev, numberOfRounds: state.numberOfRounds - 1}))
                }
              }}
            >{left}</button>
            <div className='home__button home__button--rollNumber'>{state.numberOfRounds}</div>
            <button
              className={state.numberOfRounds < 10 ? 'home__button home__button--rollManipulate home__button--more' : 'home__button home__button--rollManipulate hide'}
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

      {state.playing && !state.winner.attributes && (
        <div className='home__playingContainer'>
          <h3 className='home__roundsLeft'>{state.numberOfRounds - state.round === 1 ? (
            `${state.numberOfRounds - state.round} round left`
          ) : (
            `${state.numberOfRounds - state.round} rounds left`
          )}</h3>
          <div className='home__battleContainer'>
            <div className='home__battlePod'>
              <AnimeChoice
                state={state}
                setState={setState}
                anime={state.leftSideOption}
              />
            </div>
            <div className='home__battlePod'>
              <AnimeChoice 
                state={state}
                setState={setState}
                anime={state.rightSideOption}
              /> 
            </div>
          </div>
          <button
          className='home__button home__button--back'
          onClick={reset}
          >BACK</button>
        </div>
      )}

      {state.playing && state.winner.attributes && (
        <div className='home__winnerContainer'>
          <h3 className='home__winningTitle'>WINNER!</h3>
          <h3 className='home__winningTitle home__winningTitleDescription'>The Next Anime on Your Watch List is:</h3>
          <img 
            className='home__winnerImage'
            src={state.winner.attributes.posterImage.small}
          />
          <div>
            <h3 className='home__winnerName'>{state.winner.attributes.canonicalTitle}</h3>
            <img className='home__googleSearch' src={}/>
          </div>
          <button
          className='home__button home__button--back'
          onClick={reset}
          >BACK</button>
        </div>
      )}
    </div>
  )
}
