import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  const messages = [
    "Buscando entre los estantes...",
    "Preparando tu lectura...",
    "Cargando nuevas aventuras..."
  ];

  return (
    <div className={styles.loaderOverlay} role="status" aria-live="polite">
      <div className={styles.loader} aria-hidden="true"></div>
      <p className={styles.loadingMessage}>
        {messages[Math.floor(Math.random() * messages.length)]}
      </p>
      <span className={styles.visuallyHidden}>Cargando contenido, por favor espere...</span>
    </div>
  );
};

export default Loader;