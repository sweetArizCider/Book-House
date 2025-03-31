import styles from './Footer.module.css';
import leftSVG from '../assets/svg/left.svg';
import rightSVG from '../assets/svg/right.svg';
import downSVG from '../assets/svg/down.svg';
export function Footer({ onPageChange, currentPage }) {
    return (
        <footer className={styles.footer}>
            <section className={styles.footerSection}>
                <figure>
                    <img 
                        src={downSVG} 
                        className={styles.left} 
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))} // Go to the previous page
                    />
                </figure>
                <button 
                    className={`${styles.footerButton} ${currentPage === 1 ? styles.selected : ''}`} 
                    onClick={() => onPageChange(1)}
                >
                    1
                </button>
                <button 
                    className={`${styles.footerButton} ${currentPage === 2 ? styles.selected : ''}`} 
                    onClick={() => onPageChange(2)}
                >
                    2
                </button>
                <button 
                    className={`${styles.footerButton} ${currentPage === 3 ? styles.selected : ''}`} 
                    onClick={() => onPageChange(3)}
                >
                    3
                </button>
                <button 
                    className={`${styles.footerButton} ${currentPage === 15 ? styles.selected : ''}`} 
                    onClick={() => onPageChange(15)}
                >
                    15
                </button>
                <figure>
                    <img 
                        src={downSVG} 
                        className={styles.right} 
                        onClick={() => onPageChange(currentPage + 1)} // Go to the next page
                    />
                </figure>
            </section>
        </footer>
    );
}