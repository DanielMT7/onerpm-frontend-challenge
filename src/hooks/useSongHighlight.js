function useSongHighlight(data, delay) {
  const { album, name, artists, available_markets, duration_ms, preview_url } =
    data

  // Extraindo imagens
  const { images } = album
  const date = album.release_date

  // Verificando disponibilidade e atribuindo o estilo
  const available = available_markets.includes('BR')
  const containerStyle = {
    backgroundColor: available ? 'green' : 'red',
    color: 'white'
  }

  // Concatenando nome dos artistas da faixa
  const artistsName = artists.map(artist => artist.name).join(', ')

  // Animação de delay
  const animationDelay = `${delay / 1000}s` // Converte o atraso de milissegundos para segundos

  // Tratando duração da faixa
  function convertTime(mili) {
    var totalSec = Math.floor(mili / 1000)
    var min = Math.floor(totalSec / 60)
    var secs = totalSec % 60

    var resultado = `${min}:${secs < 10 ? '0' : ''}${secs}`

    return resultado
  }

  function formatDate(isoFormatDate) {
    var date = new Date(isoFormatDate)

    // Get day, month, and year
    var day = date.getDate()
    var month = date.getMonth() + 1 // Months start from zero, so add 1
    var year = date.getFullYear()

    // Format day and month to always have two digits
    day = day < 10 ? '0' + day : day
    month = month < 10 ? '0' + month : month

    // Return the formatted date in Brazilian format (dd-mm-yyyy)
    return `${day}/${month}/${year}`
  }

  const handleClick = function () {
    window.open(album.external_urls.spotify, '_blank')
  }

  return {
    images,
    name,
    artistsName,
    previewUrl: preview_url,
    containerStyle,
    available,
    animationDelay,
    duration: convertTime(duration_ms),
    date: formatDate(date),
    handleClick
  }
}

export default useSongHighlight
