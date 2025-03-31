import logo from '../assets/img/logo.png';
import styles from './NavBar.module.css';
import leftSVG from '../assets/svg/left.svg';

export function NavBar({ hubIcons = [], showBuscador = true, returnToHome = false, handleSearch }) {
  
  return (
    <nav className={styles.navBar}>
      <section className={styles.logoSection}>
        <a 
          href="/home">
            <img 
              src={leftSVG} 
              style={{ display: returnToHome ? 'flex' : 'none'}}
            />
        </a>
        <figure><img src={logo} alt="Book House Logo" /></figure>
        <h2>Book House</h2>
      </section>
      <section className={styles.buscadorSection}>
        <input 
          type="text" 
          className={styles.buscador}
          style={{ display: showBuscador ? 'flex' : 'none'}} 
          placeholder="Buscar por ISBN..." 
          onChange={handleSearch}/>
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