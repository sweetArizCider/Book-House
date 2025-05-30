// components
import { NavBar } from "../../layout/NavBar"
import { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import { Modal } from "../../Components/Modal/Modal";

// styles
import styles from "./Libro.module.css"

// svgs
import ticketSVG from "../../assets/svg/ticket.svg"
import userSVG from "../../assets/svg/user.svg"
import libroImg from "../../assets/svg/book.svg"
import worldImg from "../../assets/svg/world.svg"
import rightImg from "../../assets/svg/right.svg"
import lockImg from "../../assets/svg/lock.svg"
import addSVG from '../../assets/svg/add.svg';

//img
import uploadImg from '../../assets/img/cargarImagen.png';

// hooks
import { useParams } from "react-router"
import { useISBN } from '../../hooks/libros/useISBN';
import { usePrestamos } from '../../hooks/prestamos/usePrestamos';


function Libro() {
    const { isbn } = useParams();
    const { libro, error: isbnError, loading: isbnLoading} = useISBN(isbn);
    const { isAvailable, loading: prestamosLoading, error, returnBook, createLoan } = usePrestamos(isbn);
    const [imageUrl, setImageUrl] = useState(uploadImg); 
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState(""); 
    const [username, setUsername] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const handleReturnBook = async () => {
        setButtonClicked(true);
        const result = await returnBook(isbn);
        if (result) {
            setMessage("Libro devuelto correctamente");
            setMessageColor("green");
        } else {
            setMessage("Error al devolver el libro");
            setMessageColor("red");
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUsername("");
    }

    const handleSubmitLoan = async (e) => {
        e.preventDefault();
    
        const result = await createLoan(username, isbn);
        if (result) {
            setMessage("Prestamo creado con exito");
            setMessageColor("green");
        } else {
            setMessage("Tienes una deuda pendiente o ese usuario no existe");
            setMessageColor("red");
        }
        setIsModalOpen(false);
        setUsername(""); 
    };

    const isLoading = isbnLoading || prestamosLoading;

    const handleImageError = () => {
        setImageUrl(uploadImg); 
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(""); // Clear the message after 3 seconds
            }, 3000);
    
            return () => clearTimeout(timer); // Clean up the timer if the component unmounts or message changes
        }
    }, [message]);

    const hubIcons = [
    { icon: ticketSVG, href: "/multas" },
    { icon: userSVG, href: "/login" },
    { icon: addSVG, href: "/crear/libro" },
    ]

    const localBook = {
    isbn: libro ? libro.isbn : "",
    img: libro ? libro.img : "",
    title: libro ? libro.title : "",
    autor_license: libro ? libro.author_license : "",
    editorial: libro ? libro.editorial : "",
    pages: libro ? libro.pages : "",
    year: libro ? libro.year : "",
    genre: libro ? libro.genre : "",
    language: libro ? libro.language : "",
    format: libro ? libro.format : "",
    sinopsis: libro ? libro.sinopsis : "",
    content: libro ? libro.content : "",
    author: libro ? libro.author : "",
    }

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <NavBar showBuscador={false} returnToHome={true} hubIcons={hubIcons} />
      </header>

      <div className={styles.main}>
            <section className={styles.inputSection}>
                <article className={styles.inputGroup}>
                    <input 
                        type="text"
                        name='title'
                        className={styles.titleInputField} 
                        placeholder="No contamos con este libro..."
                        value={localBook.title}
                        disabled={true}
                    />
                    <input 
                        type="text" 
                        placeholder="(año...)"
                        name='year'
                        value={localBook.year}
                        disabled={true}
                        className={styles.anoInputField} 
                    />
                    <input 
                        id="autor_license"
                        type="text"
                        name='autor_license'
                        value={localBook.author}
                        placeholder="Autor..."
                        disabled={true}
                        className={styles.selectField}
                    >
                        
                    </input>

                    <article className={styles.inlineInputs}>
                        <div className={styles.divInputs}>
                            <figure><img src={libroImg}/></figure>
                            <input 
                                type="text" 
                                name='format'
                                value={localBook.format}
                                placeholder="Formato..."
                                disabled={true}
                                className={`${styles.inputField} ${styles.centeredField}`} 
                            />
                        </div>
                        <div className={styles.separator}></div>

                        <div className={styles.divInputs}>
                            <figure><img src={worldImg}/></figure>
                            <input 
                                type="text" 
                                placeholder="Idioma ..." 
                                name='language'
                                disabled={true}
                                value={localBook.language}
                                className={`${styles.inputField} ${styles.centeredField}`} 
                            />
                        </div>
                        <div className={styles.separator}></div>

                        <div className={styles.divInputs}>
                            <div className={styles.divPages}>{localBook.pages}</div>
                            <input 
                                type="text" 
                                placeholder="Paginas..."
                                name='pages'
                                disabled={true}
                                value="Paginas"
                                className={`${styles.inputField} ${styles.centeredField}`} 
                            />
                        </div>

                    </article>
                    <article className={styles.articleDetails}>
                        <input 
                            type="text"
                            name="isbn"
                            placeholder="ISBN(16)..." 
                            value={localBook.isbn}
                            disabled={true}
                            className={`${styles.inputField} ${styles.detailsFields}`} 
                        />
                        <input 
                            type="text"
                            name="editorial"
                            value={localBook.editorial}
                            placeholder="Editorial..." 
                            disabled={true}
                            className={`${styles.inputField} ${styles.detailsFields}`} 
                        />
                    </article>
                </article>

                <article className={styles.textAreaGroup}>
                    <h4 className={styles.sectionTitle}>
                        Acerca del libro <img src={rightImg}/>
                    </h4>
                    <div className={styles.textAreaContainer}>
                        <label className={styles.label}>Sinopsis</label>
                        <div 
                            placeholder="Redacta la sinopsis de tu nuevo libro" 
                            className={styles.textArea}
                            name="sinopsis"
                        >{localBook.sinopsis}</div>
                    </div>
                    <h4 className={styles.sectionTitle}>Contenido del libro...</h4>
                    <div className={styles.textAreaContainer}>
                        <div
                            placeholder="Escribe el contenido de tu historia..." 
                            className={styles.textArea}
                            name="content"
                        >{localBook.content}</div>
                    </div>
                </article>
            </section>

            <section className={styles.imgSection}>
                <figure className={styles.imageContainer}>
                    <img 
                        src={localBook.img || imageUrl} 
                        className={styles.image} 
                        onError={handleImageError}/>
                </figure>
                <article className={styles.buttonArticle}>
                <button
                    className={
                        isAvailable ? styles.disponible : styles.noDisponible
                    }
                    disabled={!isAvailable}
                    onClick={handleOpenModal}
                >
                    {isAvailable ? "Alquilar" : "Ocupado"}
                </button>
                {!isAvailable && (
                    <button 
                        className={styles.devolver}
                        onClick={handleReturnBook}
                        disabled={prestamosLoading} 
                    >
                        <img src={lockImg} />
                    </button>
                )}
                </article>


                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className={styles.titulo}>Usuario:</h2>
                    <form className={styles.form} onSubmit={handleSubmitLoan}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        <button type="submit" disabled={prestamosLoading}>
                            Confirmar Préstamo
                        </button>
                    </form>
                </Modal>
                
                {message && (
                    <p style={{ color: messageColor }}>{message}</p>
                )}
            </section>
        </div>
    </>
  )
}
export default Libro

