import styles from './Modal.module.css';

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <section className={styles.modalOverlay}>
            <article className={styles.modal}>
                {children}
                <footer className={styles.modalActions}>
                    <button onClick={onClose}>Cerrar</button>
                </footer>
            </article>
        </section>
    );
}