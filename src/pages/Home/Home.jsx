// hooks
import { useLibros } from "../../hooks/libros/useLibros";
import { usePagination } from "../../hooks/libros/usePagination";
import { useISBN } from "../../hooks/libros/useISBN";
import { useAutorFilter } from "../../hooks/libros/useAutorFilter";

// components
import { Footer } from "../../layout/Footer";
import { NavBar } from "../../layout/NavBar";
import { Card } from "../../Components/Card/Card";
import { SecondNavBar } from "../../Components/SecondNavBar/SecondNavBar";
import Loader from "../../Components/Loader/Loader";

// svgs
import multasSVG from '../../assets/svg/ticket.svg';
import userSVG from '../../assets/svg/user.svg';
import addSVG from '../../assets/svg/add.svg';


// styles
import styles from './Home.module.css';


function Home() {
    const { libros, error, loading: loadingBooks } = useLibros();
    const { currentPage, paginatedItems, handlePageChange } = usePagination(libros, 10);
    const { libro, error: isbnError, handleChange } = useISBN();
    const { autorLibros, error: autorError, autorFilter, loading: autorBooksLoding } = useAutorFilter(libros);

    const { currentPage: autorPage, paginatedItems: paginatedAutorLibros, handlePageChange: handleAutorPageChange } = usePagination(autorLibros, 10);


    const hubIcons = [
      { icon: multasSVG, href: '/multas' },
      { icon: userSVG, href: '/login' },
      { icon: addSVG, href: '/crear/libro' },
    ];

    const booksToDisplay = Array.isArray(autorLibros) && autorLibros.length > 0
        ? paginatedAutorLibros 
        : libro && !isbnError
        ? [libro] 
        : paginatedItems; 

    const isLoading = loadingBooks || autorBooksLoding;
        
        return (
      <>
        {isLoading && <Loader />}
        <header className={styles.header}>
          <NavBar hubIcons={hubIcons} handleSearch={handleChange}/>
        </header>
        <main className={styles.main}>
          <section>
            <SecondNavBar onAutorSelect={autorFilter}/>
          </section>
          <section className={styles.sectionCards}>
          {booksToDisplay.map(libro => (
              <a href={`/libro/${libro.isbn}`}>
                <Card 
                  key={libro.id}
                  title={libro.title}
                  author={libro.author}
                  img={libro.img}
                  pages={libro.pages}
                />
              </a>
            ))}
          </section>
        </main>
        <footer>
          {autorLibros.length > 0 ? (
            <Footer onPageChange={handleAutorPageChange} currentPage={autorPage} />
          ) : (
            <Footer onPageChange={handlePageChange} currentPage={currentPage} />
          )}
        </footer>
      </>
    );
  }
  
  export default Home;