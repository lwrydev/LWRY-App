import { Button } from 'react-bootstrap'
import styles from '../payment.module.css'

import { useRouter } from "next/router"

import { firestore } from '../../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'

export default function basicConsult() {
  const [caseRef, setCase] = useState(null)

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Pending') {
        setCase(caseData)
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  const onSubmitPayment = () => {
    updateDoc(caseRef.ref, {
      status: 'Waiting Lawer',
      statusTH: 'รอตอบรับจากทนายความ',
      payment: {
        status: 'paid',
        statusTH: 'ชำระแล้ว',
        channel: caseRef.data().payment.channel,
        number: caseRef.data().payment.number,
        price: caseRef.data().payment.price
      },
      changedDate: new Date()
    }).then(() => {
      router.replace('/home/caselist')
    })
  }

  return (
    <div className={styles.content}>
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-10'>
          <div className={styles.paymentBox}>
            <div className={styles.paymentTitle}>ชำระเงิน</div>
            <div className={styles.paymentBtn}>
              <Button
                className={styles.btn}
                onClick={() => onSubmitPayment()}
              >
                <div>ชำระเงิน</div>
              </Button>
            </div>
          </div>
        </div>
        <div className='col-1'></div>
      </div>
    </div>
  )
}