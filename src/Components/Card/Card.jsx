import styles from './Card.module.css';

export function Card({ title, author, img, pages }) {

  return (
    <article className={styles.card}>
      <figure className={styles.cover}>
        <img src={img} alt={title} />
        <div className={styles.pages}>{pages}</div>
      </figure>
      <section className={styles.info}>
          <h3 className={styles.bold}>{title}</h3>
          <h3 className={styles.regular}><p id="para">{author}</p></h3>
      </section>
    </article>
  );
}