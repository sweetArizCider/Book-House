// svg
import userSVG from '../../assets/svg/user.svg';
// styles
import styles from './CrearLibro.module.css';

// components
import { NavBar } from '../../layout/NavBar';

function CrearLibro() {

    const hubIcons = [
        { icon: userSVG, href: '/user' },
      ];

    return (
      <>
        <header>
            <NavBar showBuscador={false} returnToHome = {true} hubIcons={hubIcons} generateButton = {true}/>
        </header>
        <main className={styles.main}>
            <section className={styles.inputSection}>
                <article>
                    <input type="text" placeholder='Titulo de su libro...'/>
                    <input type="text" placeholder='(año...'/>
                    <select id="autor_license">
                        // una opcion por cada autor
                    </select>
                    <article>
                        <input type="text" placeholder='Formato...' />
                        <div className={styles.separator}></div>
                        <input type="text" placeholder='Idioma...' />
                        <div className={styles.separator}></div>
                        <input type="text" placeholder='Paginas...' />
                    </article>
                    <input type="text" placeholder='ISBN(16)...' />
                    <input type="text" placeholder='Editorial...' />
                </article>
                <article>
                    <h4>Acerca del libro <img src=""/></h4>
                    <div>
                        <label>Sinopsis</label>
                        <textarea placeholder='Sinopsis...'></textarea>
                    </div>
                    <h4>Genero del libro...</h4>
                    <div>
                        <label>Contenido</label>
                        <textarea placeholder='Contenido...'></textarea>
                    </div>
                </article>
            </section>
            <section className={styles.imgSection}>
                <figure><img src="" alt="" /></figure>
                <input type='text' placeholder='URL...' />
            </section>
        </main>
      </>
    );
  }
  
  export default CrearLibro;