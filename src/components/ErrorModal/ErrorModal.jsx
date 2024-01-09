import React from 'react'
import styles from './ErrorModal.module.css'

const ErrorModal = ({ error }) => {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className={styles.error_modal}>
      <div className={styles.modal_content}>
        <h2>Ocorreu um erro</h2>
        <p>{error.errorMessage}</p>
        <button onClick={handleRefresh}>Tentar novamente</button>
      </div>
    </div>
  )
}

export default ErrorModal
