import styles from './footer.module.css'

export default function Footer() {
  return (
    <div className={styles.content}>
      <div className={styles.lwry}>
        <div className={styles.item}>Lawlivery©2022</div>
        <div className={styles.item + ' ' + styles.pointer}>Privacy & Legal</div>
        <div className={styles.item + ' ' + styles.pointer}>Contact</div>
        <div className={styles.item + ' ' + styles.pointer}>News</div>
        <div className={styles.item + ' ' + styles.pointer}>Location</div>
        <div className={styles.item + ' ' + styles.pointer}>Support</div>
      </div>
    </div>
  )
}