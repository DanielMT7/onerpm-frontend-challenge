import React from 'react'

function Player({ song }) {
  return (
    <>
      <audio controls id="musicPlayer">
        <source src={song} type="audio/mp3" />
        áudio não suportado.
      </audio>
    </>
  )
}

export default Player
