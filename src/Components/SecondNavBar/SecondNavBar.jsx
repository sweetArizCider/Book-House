import styles from './SecondNavBar.module.css';
import downSVG from '../../assets/svg/down.svg';
import addSVG from '../../assets/svg/add.svg';
import trashSVG from '../../assets/svg/trash.svg';
import { useAutores } from '../../hooks/autores/useAutores';
import { useState } from 'react';
import { Modal } from '../Modal/AutorModal';

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
                <button onClick={toggleModal}>
                    Filtrar por autor <img src={downSVG} className={styles.down}/>
                </button>
            </section>
            <section className={styles.buscadorSection}>
            </section>
            <section className={styles.iconsSection}>
                <figure>
                    <img src={addSVG}/>
                </figure>
                <figure>
                    <img src={trashSVG}/>
                </figure>
            </section>
        </nav>

        <Modal 
            isOpen={isModalOpen} 
            onClose={toggleModal}
        >
            {autores.map((autor) => (
                <button
                    className={styles.autorButton}
                    key={autor.license}
                    onClick={() => handleAutorClick(autor.license)}
                >
                    {autor.name} {autor.lastname}
                </button>
            ))}
        </Modal>
    </>
  );
}