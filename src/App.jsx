import React from 'react'
import useMusicData from './hooks/useMusicData'
import SongHighlight from './components/SongHighlight/SongHighlight'
import ErrorModal from './components/ErrorModal/ErrorModal'
import './App.css'

function App() {
  const { formattedData, error } = useMusicData()

  return (
    <>
      {error.errorCode ? (
        <ErrorModal error={error} />
      ) : formattedData.length > 0 ? (
        formattedData.map((highlight, index) => (
          <SongHighlight key={index} data={highlight} delay={index * 500} />
        ))
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}

export default App
