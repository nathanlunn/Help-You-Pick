import React, {useEffect, useState} from 'react';
import '../styles/AnimeChoice.css';

export default function AnimeChoice({state, setState, anime}) {
  console.log(state.leftSideOption);
  return (
    <div>
      {(state.leftSideOption.attributes && state.rightSideOption.attributes) && (
        <div className='animeChoice'>
          <div className='animeChoice__upperContainer'>
            <img 
              className='animeChoice__image'
              src={anime.attributes.posterImage.small}
            />
            <div className='animeChoice__basicInfo'>
              <div className='animeChoice__infoBlock'>
                <h4 className='animeChoice__category'>Title:</h4>
                <h4 className='animeChoice__info'>{anime.attributes.canonicalTitle}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
