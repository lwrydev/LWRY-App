import styles from './footer.module.css'

export default function Footer() {
  return (
    <div className={styles.content}>
      <div className={styles.item}>Lawlivery©2022</div>
      <div className={styles.item}>Privacy & Legal</div>
      <div className={styles.item}>Contact</div>
      <div className={styles.item}>News</div>
      <div className={styles.item}>Location</div>
      <div className={styles.item}>Support</div>
    </div>
  )
}