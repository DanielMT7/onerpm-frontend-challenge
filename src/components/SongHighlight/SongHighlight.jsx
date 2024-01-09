import styles from './SongHighlight.module.css'
import Player from '../Player/Player'
import useSongHighlight from '../../hooks/useSongHighlight'

function SongHighlight({ data, delay }) {
  const {
    images,
    name,
    artistsName,
    previewUrl,
    containerStyle,
    available,
    animationDelay,
    duration,
    date,
    handleClick
  } = useSongHighlight(data, delay)

  return (
    <div
      className={`${styles.container} ${styles.animationContainer}`}
      style={{ animationDelay }}
    >
      <div className={styles.info_container}>
        <img src={images[0].url} alt="" />

        <div className={styles.split_info_container}>
          <div className={styles.general_info_container}>
            <h1>{name}</h1>
            <p>{artistsName}</p>

            <div className={styles.player_container}>
              <Player song={previewUrl} />
            </div>
          </div>

          <div className={styles.more_info_container}>
            <p>{date}</p>
            <p>{duration}</p>
            <p onClick={handleClick} style={{ cursor: 'pointer' }}>
              Spotify 🔗
            </p>
            <p style={containerStyle}>
              {available ? 'Disponível' : 'Indisponível'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongHighlight
