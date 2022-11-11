import React, {useEffect, useState} from 'react'

export default function AnimeChoice({state, setState, anime}) {
  console.log(state.leftSideOption);
  return (
    <div>
      {(state.leftSideOption.attributes || state.rightSideOption.attributes) && (
        <div className='animeChoice'>
          <img 
            className='animeChoice__image'
            src={anime.attributes.coverImage.tiny}
          />
        </div>
      )}
    </div>
  )
}
