import React from 'react'

export default function Home({state, setState}) {
  return (
    <div>
      {state.leftSideOption.attributes.canonicalTitle}
      <img src={state.leftSideOption.attributes.posterImage.tiny}></img>
    </div>
  )
}
