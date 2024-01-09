// useMusicData.js
import { useEffect, useState } from 'react'
import musicData from '../services/music.service'
import { CLIENT_ID, CLIENT_SECRET, ISRC_LIST } from '../constants'

const useMusicData = () => {
  const [accessToken, setAccessToken] = useState('')
  const [formattedData, setFormattedData] = useState([])
  const [error, setError] = useState({})

  function handleError(errorCode = false, errorMessage = '') {
    setError({
      errorCode: errorCode,
      errorMessage: errorMessage
    })
  }

  // Busca o token de acesso.
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        // Corpo da requisição.
        const authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        }

        // Requisição do token de acesso.
        const response = await fetch(
          'https://accounts.spotify.com/api/token',
          authParameters
        )

        if (!response.ok) {
          throw new Error('Erro na chamada da API')
        }

        const data = await response.json()

        // Seta estado com valor do token.
        setAccessToken(data.access_token)
      } catch (error) {
        console.error(`Erro com o Token de acesso da API: ${error.message}`)
        handleError(true, `Erro com o Token de acesso da API: ${error.message}`)
      }
    }

    fetchAccessToken()
  }, [])

  // Executado quando o token está disponível.
  useEffect(() => {
    // Busca as informações pelo ISRC passando o token de acesso.
    async function fetchData() {
      try {
        if (!accessToken) {
          console.warn('Token de acesso ainda não disponível.')
          return
        }

        const data = await musicData(accessToken, ISRC_LIST)
        console.log(data)

        if (data.errorCode) {
          console.log('entrou aqui')
          handleError(data.errorCode, data.errorMessage)
          return
        }

        setFormattedData(data)
      } catch (error) {
        console.error(`Erro ao buscar dados: ${error.message}`)
        handleError(true, `Erro ao buscar dados: ${error.message}`)
      }
    }

    fetchData()
  }, [accessToken])

  return {
    formattedData,
    error
  }
}

export default useMusicData
