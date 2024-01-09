// Função que realiza de fato a busca e trata os dados
async function musicData(accessToken, isrcList) {
  try {
    //corpo da requisição
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }

    // Função que busca as músicas da lista de isrc em paralelo
    async function search(isrcList) {
      const results = await Promise.all(
        isrcList.map(async isrc => {
          try {
            const response = await fetch(
              `https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`,
              searchParameters
            )

            if (!response.ok) {
              throw new Error('Erro na chamada da API')
            }

            const data = await response.json()
            const isrcID = data.tracks.items[0]

            // Retorna null caso a música buscada seja undefined para tratamento
            return isrcID || null
          } catch (error) {
            console.error(`Erro ao buscar ISRC ${isrc}: ${error.message}`)
            return {
              errorCode: true,
              errorMessage: `Erro ao buscar ISRC ${isrc}: ${error.message}`
            }
          }
        })
      )

      return results
    }

    const data = await search(isrcList)
    //const data = [null, null, null]

    // Pode acontecer de todos as buscas serem nulas mesmo sem nenhum error acontecer

    if (data.every(item => item === null)) {
      throw new Error(
        'Todos os itens da lista de ISRC passados pra busca não foram encontrados'
      )
    }

    // Função responsável por tratar os dados recebidos.
    function buildData(data) {
      // Filtra a lista dos ISRC deixando só os que realmente têm dados.
      const validData = data.filter(item => item !== null && item !== undefined)

      // Desestrutura somente as informações do objeto da ISRC que serão usados no front.
      const formattedData = validData.map(item => {
        const {
          album,
          artists,
          available_markets,
          duration_ms,
          external_urls,
          name,
          preview_url
        } = item

        return {
          album,
          artists,
          available_markets,
          duration_ms,
          external_urls,
          name,
          preview_url
        }
      })

      // sort ordena o array baseado na função que foi passada como critério, mas é perigoso já que sua complexidade pode gerar grande custo de desempenho.
      // localeCompare usa dois parametros (strings) para serem comparados entre sí. Nesse caso, checa se a vem antes de b, sendo case-sensitivy e usando o ingles como padrão.
      // O sort se utiliza de valores como (0, 1, -1) para executar as ações, e o localeCompare retorna esses valores pra indicar se um palavra vem antes ou nao da outra, ou se são iguais.
      // se "a" vem antes de "b" ele retorna 1, isso significa que 1 é parametro de troca pro sort.
      const formattedAndSortedData = formattedData.sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      )

      return formattedAndSortedData
    }

    return buildData(data)
  } catch (error) {
    console.error(`Erro na função musicData: ${error.message}`)
    return {
      errorCode: true,
      errorMessage: `Erro na função musicData: ${error.message}`
    }
  }
}

export default musicData
