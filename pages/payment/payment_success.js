import styles from './payment.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"
import { useEffect, useState } from 'react'

import { firestore } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'
import IconEmailVerified from '../../assets/logo/email_verified.svg'
import { Button } from 'react-bootstrap'

export default function PaymentSuccess() {
  const [caseRef, setCase] = useState(null)

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?case=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Paid') {
        setCase(caseData)
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  return (
    <div className={styles.content}>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div className='row'>
            <div className='d-flex align-items-center justify-content-center'>
              <div className={styles.progressBoxActive}>
                <Image src={IconBook} />
                <div className={styles.progressTxtActive}>ข้อตกลงการใช้บริการ</div>
              </div>
              <div className={styles.progressLineActive}></div>
              <div className={styles.progressBoxActive}>
                <Image src={IconEdit} />
                <div className={styles.progressTxtActive}>กรอกข้อมูลเพื่อรับคำแนะนำเบื้องต้น</div>
              </div>
              <div className={styles.progressLineActive}></div>
              <div className={styles.progressBoxActive}>
                <Image src={IconMoneyCheck} />
                <div className={styles.progressTxtActive}>ชำระค่าบริการ</div>
              </div>
              <div className={styles.progressLineActive}></div>
              <div className={styles.progressBoxActive}>
                <Image src={IconCorrect} />
                <div className={styles.progressTxtActive}>เสร็จสิ้น</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div className={styles.qrPaymentContent}>
            <div className={styles.qrTitle}>ชำระค่าบริการเสร็จสิ้น</div>
            <div className='d-flex justify-content-center'>
              <Image src={IconEmailVerified} height='220' />
            </div>
            <div className={styles.paymentSuccessDetailText}>ขอบคุณที่รับบริการจาก Lawlivery ท่านสามารถเข้าไปใช้บริการ หรือดูรายละเอียดคดีที่ท่านได้ฝากไว้กับทนายของเรา ได้ที่บริการหมายเลขคดี <a className={styles.paymentSuccessNoText}>{caseRef ? caseRef.data().caseNo : ''}</a> หรือสามารถเข้าได้จากหน้าหลักผู้ใช้งานของท่าน (กรณีที่เป็นการโอนเงินผ่านบัญชีธนาคาร จะต้องรอการตรวจสอบการชำระเงิน ไม่เกิน 24 ชั่วโมงหลังการแจ้งโอนเงิน ก่อนจะสามารถเข้าใช้บริการของท่านได้)</div>
            <div className='d-flex justify-content-center'>
              <div className='p-1'>
                <Button
                  className={styles.btn}
                >
                  <div>เข้าไปในคดี</div>
                </Button>
              </div>
              <div className='p-1'>
                <Button
                  className={styles.btnCancel}
                  onClick={() => router.replace('/home/caselist')}
                >
                  <div>กลับไปหน้าหลัก</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  )
}