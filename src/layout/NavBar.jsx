import logo from '../assets/img/logo.png';
import styles from './NavBar.module.css';
import leftSVG from '../assets/svg/left.svg';
import deepseekSVG from '../assets/svg/deepseek.svg';

export function NavBar({ hubIcons = [], showBuscador = true, returnToHome = false, handleSearch, generateButton = false }) {
  
  return (
    <nav className={styles.navBar}>
      <section className={styles.logoSection}>
        <a 
          className={styles.returnToHome}
          href="/home">
            <img 
              src={leftSVG} 
              style={{ display: returnToHome ? 'flex' : 'none'}}
            />
        </a>
        <a href="/home"><figure><img src={logo} alt="Book House Logo" /></figure></a>
        <a className={styles.bookHouseText} href="/home"><h2>Book House</h2></a>
      </section>
      <section className={styles.buscadorSection}>
        <input 
          type="text" 
          style={{ display: showBuscador ? 'flex' : 'none'}}
          className={styles.buscador}
          placeholder="Buscar por ISBN..." 
          onChange={handleSearch}/>
      </section>
      <section className={styles.generateButtonSection} style={{ display: generateButton ? 'flex' : 'none'}}>
        <button 
          className={styles.generateButton}
        >
          Generar con IA
          <figure><img src={deepseekSVG} /></figure>
        </button>
      </section>
      <section className={styles.hubSection}>
        {hubIcons.map((item, index) => (
          <figure key={index}>
            <a href={item.href}>
              <img src={item.icon}/>
            </a>
          </figure>
        ))}
      </section>
    </nav>
  );
}