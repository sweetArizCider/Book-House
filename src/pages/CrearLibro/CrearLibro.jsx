// svg
import userSVG from '../../assets/svg/user.svg';
import libroImg from '../../assets/svg/book.svg';
import worldImg from '../../assets/svg/world.svg';
import rightImg from '../../assets/svg/right.svg';
// styles
import styles from './CrearLibro.module.css';
// img
import uploadImg from '../../assets/img/cargarImagen.png';

// hooks
import { useState } from 'react';
import { useCrearLibro } from '../../hooks/crearLibros/useCrearLibro';
import { useAutores } from '../../hooks/autores/useAutores';
import Loader from '../../Components/Loader/Loader';
import { useCrearLibroAI } from '../../hooks/crearLibros/useCrearLibroAI';

// components
import { NavBar } from '../../layout/NavBar';

function CrearLibro() {
    const { formData, loading, error, success, handleChange, handleSubmit } = useCrearLibro();
    const [imageUrl, setImageUrl] = useState(uploadImg); 
    const { autores, error: autoresError } = useAutores();
    const { crearLibroAI, loading: aiLoading, error: aiError, success: aiSuccess } = useCrearLibroAI();

    const isLoading = loading || aiLoading || !autores;


    const handleUrlChange = (e) => {
        const url = e.target.value.trim(); 
        if (url === '') {
            setImageUrl(uploadImg); 
        } else {
            setImageUrl(url); 
        }
        handleChange(e);
    };

    const handleImageError = () => {
        setImageUrl(uploadImg); 
    };

    const handleGenerateAI = async () => {
        await crearLibroAI(); 
    };

    const hubIcons = [
        { icon: userSVG, href: '/login' },
      ];

    return (
      <>
        {isLoading && <Loader />}
        <header className={styles.header}>
            <NavBar 
                showBuscador={false} 
                returnToHome={true} 
                hubIcons={hubIcons} 
                generateButton={true}
                handleGenerate={handleGenerateAI}
            />
        </header>
        <form className={styles.main} onSubmit={handleSubmit}>
            <section className={styles.inputSection}>
                <article className={styles.inputGroup}>
                    <input 
                        type="text"
                        name='title'
                        placeholder="Titulo de su libro..." 
                        className={styles.titleInputField} 
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="(año...)"
                        name='year'
                        value={formData.year}
                        onChange={handleChange}
                        className={styles.anoInputField} 
                    />
                    <select 
                        id="autor_license"
                        name='autor_license'
                        value={formData.autor_license}
                        onChange={handleChange}
                        className={styles.selectField}
                    >
                        <option value="" disabled={true}>Autor...</option>

                        {autores.map((autor) => (
                                <option key={autor.license} value={autor.license}>
                                    {autor.name} {autor.lastname}
                                </option>
                        ))}
                        
                    </select>

                    <article className={styles.inlineInputs}>
                        <div className={styles.divInputs}>
                            <figure><img src={libroImg}/></figure>
                            <input 
                                type="text" 
                                placeholder="Formato..." 
                                name='format'
                                value={formData.format}
                                onChange={handleChange}
                                className={styles.inputField} 
                            />
                        </div>
                        <div className={styles.separator}></div>

                        <div className={styles.divInputs}>
                            <figure><img src={worldImg}/></figure>
                            <input 
                                type="text" 
                                placeholder="Idioma ..." 
                                name='language'
                                value={formData.language}
                                onChange={handleChange}
                                className={styles.inputField} 
                            />
                        </div>
                        <div className={styles.separator}></div>

                        <div className={styles.divInputs}>
                            <div>000...</div>
                            <input 
                                type="text" 
                                placeholder="Paginas..."
                                name='pages'
                                value={formData.pages}
                                onChange={handleChange}
                                className={styles.inputField} 
                            />
                        </div>

                    </article>
                    <article className={styles.articleDetails}>
                        <input 
                            type="text"
                            name="isbn"
                            placeholder="ISBN(16)..." 
                            value={formData.isbn}
                            onChange={handleChange}
                            className={`${styles.inputField} ${styles.detailsFields}`} 
                        />
                        <input 
                            type="text"
                            name="editorial"
                            value={formData.editorial}
                            onChange={handleChange}
                            placeholder="Editorial..." 
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
                        <textarea 
                            placeholder="Redacta la sinopsis de tu nuevo libro" 
                            className={styles.textArea}
                            name="sinopsis"
                            value={formData.sinopsis}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <h4 className={styles.sectionTitle}>Genero del libro...</h4>
                    <div className={styles.textAreaContainer}>
                        <label className={styles.label}>Contenido</label>
                        <textarea 
                            placeholder="Escribe el contenido de tu historia..." 
                            className={styles.textArea}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </article>
            </section>

            <section className={styles.imgSection}>
                <figure className={styles.imageContainer}>
                    <img 
                        src={imageUrl} 
                        className={styles.image} 
                        onError={handleImageError}/>
                </figure>
                <input 
                    type="text" 
                    placeholder="URL..."
                    name="img"
                    className={`${styles.inputField} ${styles.urlField}`}
                    value={formData.img}
                    onChange={handleUrlChange}
                />
                <button 
                    className={styles.crearLibro} 
                    type='submit' 
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Crear Libro'}
                </button>
                {error && <p style={{ color: 'red' }}>Error al crear el libro... Por favor ingresa todos los campos!</p>}
                {success || aiSuccess && <p style={{ color: 'green' }}>Libro creado con Éxito!</p>}
            </section>
        </form>
      </>
    );
  }
  
  export default CrearLibro;