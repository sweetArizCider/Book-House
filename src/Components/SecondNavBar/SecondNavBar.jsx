import styles from './SecondNavBar.module.css';
import downSVG from '../../assets/svg/down.svg';
import addSVG from '../../assets/svg/add.svg';
import { useAutores } from '../../hooks/autores/useAutores';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export function SecondNavBar({ onAutorSelect}) {
    const { autores, error } = useAutores();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleAutorClick = (autorLicense) => {    
        onAutorSelect({target: {value: autorLicense}});
        toggleModal();
    }


  return (
    <>
        <nav className={styles.navBar}>
            <section className={styles.autorSection}>
                <button onClick={toggleModal} className={styles.filtrar}>
                    Filtrar por autor <img src={downSVG} className={styles.down}/>
                </button>
            </section>
            <section className={styles.buscadorSection}>
            </section>
            <section className={styles.iconsSection}>
            </section>
        </nav>

        <Modal 
            isOpen={isModalOpen} 
            onClose={toggleModal}
        >
            <button 
                className={`${styles.autorButton} ${styles.todos}`}
                onClick={() => handleAutorClick()}
            >
                Todos los Autores
                <figure className={styles.figure}><img src={downSVG}/></figure>
            </button>
            {autores.map((autor) => (
                <button
                    className={styles.autorButton}
                    key={autor.license}
                    onClick={() => handleAutorClick(autor.license)}
                >
                    {autor.name} {autor.lastname}
                    <figure className={styles.figure}><img src={downSVG}/></figure>
                </button>
            ))}
        </Modal>

        
    </>
  );
}