import { useEffect, useState } from 'react'
import styles from './pricing_payment.module.css'

import { firestore } from '../../config/firebase'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export default function PaymentHistory({ user }) {
  const [paymentHistoryList, setPaymentHistoryList] = useState([])

  useEffect(() => {
    if (user) {
      getDocs(query(collection(firestore, 'payments_history'), where('owner', '==', user.id), orderBy('changedDate', 'desc'), limit(20))).then(dataList => {
        if (dataList.docs.length > 0) {
          setPaymentHistoryList(dataList.docs)
        }
      })
    }
  }, [user])

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
          {paymentHistoryList.map((payhis, index) => {
            return <div
              key={index}
              className={styles.boxBody}
            >
              <div className={'col-2 ' + styles.boxBodyText}>{payhis.data().createdDate.toDate().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</div>
              <div className={'col-3 ' + styles.boxBodyText}>{payhis.data().number}</div>
              <div className={'col-2 ' + styles.boxBodyText}>{payhis.data().caseNo}</div>
              <div className={'col-2 ' + styles.boxBodyText}>{payhis.data().price}</div>
              <div className={'col-3 ' + styles.boxBodyText}></div>
            </div>
          })}
        </div>
        <div className={styles.note}>* คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ คำถามของท่านจะถูกส่งไปยัง</div>
      </div>
    </div>
  )
}