import styles from './pricing_payment.module.css'

export default function PaymentHistory() {
  return (
    <div>
      <div className={styles.informationContent}>
        <div className={styles.titleMenu}>การชำระเงินทั้งหมดของฉัน</div>
        <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน</div>
        <div className={styles.informationBox}>
          <div className={styles.boxHeader}>
            <div className={'col-2 ' + styles.boxHeaderText}>วันที่</div>
            <div className={'col-3 ' + styles.boxHeaderText}>หมายเลขการชำระเงิน</div>
            <div className={'col-2 ' + styles.boxHeaderText}>หมายเลขคดี</div>
            <div className={'col-2 ' + styles.boxHeaderText}>ราคา</div>
            <div className={'col-3 ' + styles.boxHeaderText}></div>
          </div>
          <div className={styles.boxBody}>

          </div>
        </div>
      </div>
    </div>
  )
}