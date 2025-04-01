// src/pages/Multas/Multas.jsx
import Loader from '../../Components/Loader/Loader';
import styles from './Multas.module.css';
import userSVG from '../../assets/svg/user.svg';
import { NavBar } from '../../layout/NavBar';
import useMultas from '../../hooks/multas/multas';
import { usePagination } from '../../hooks/libros/usePagination'; // Importar hook de paginación
import { Footer } from '../../layout/Footer'; // Importar componente Footer

function Multas() {
  const { loading, error, multasData } = useMultas();
  // Configurar paginación con máximo de 3 elementos por página
  const { currentPage, paginatedItems: paginatedMultas, handlePageChange } = usePagination(multasData, 3);
  
  const hubIcons = [
    { icon: userSVG, href: '/user' },
  ];

  return (
    <>
      {loading && <Loader />}
      <header className={styles.header}>
        <NavBar 
          showBuscador={false} 
          returnToHome={true} 
          hubIcons={hubIcons} 
          generateButton={false}
        />
      </header>
    
      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            Error: {error}
          </div>
        )}

        {!loading && multasData.length === 0 && (
          <div className={styles.noResults}>
            No hay usuarios con multas pendientes
          </div>
        )}

        {paginatedMultas.map((usuario, index) => (
          <article key={index} className={styles.multaCard}>
            <div className={styles.userRow}>
              <h2 className={styles.nombreUsuario}>
                {usuario.username}
              </h2>
              <p className={styles.total}>
                Total de multas: ${usuario.total?.toFixed(2)}
              </p>
            </div>
            
            <div className={styles.accionesRow}>
              <button className={styles.pagarButton}>
                Pagar con PayPal
              </button>
              <span className={styles.multaNumber}>
                #{(currentPage - 1) * 3 + index + 1}
              </span>
            </div>
          </article>
        ))}
      </main>

      <footer>
        {multasData.length > 3 && (
          <Footer 
            onPageChange={handlePageChange} 
            currentPage={currentPage} 
          />
        )}
      </footer>
    </>
  );
}

export default Multas;