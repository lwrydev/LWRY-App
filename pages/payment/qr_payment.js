import styles from './payment.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"
import { useEffect, useState } from 'react'

import { firestore } from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'
import IconQrCodeEx from '../../assets/logo/qrcode_ex.svg'

export default function QrPayment() {
  const [caseRef, setCase] = useState(null)

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?case=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Pending') {
        setCase(caseData)
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  const onPaid = () => {
    updateDoc(caseRef.ref, {
      payment: {
        channel: 'QR-Code',
        number: '',
        price: caseRef.data().payment.price,
        status: 'Paid',
        statusTH: 'ชำระแล้ว'
      },
      status: 'Waiting Lawer',
      statusTH: 'รอตอบรับจากทนายความ',
      changedDate: new Date()
    }).then(() => {
      router.replace({
        pathname: '/payment/payment_success',
        query: { case: caseRef.id }
      })
    })
  }

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
              <div className={styles.progressLineInActive}></div>
              <div className={styles.progressBoxInActive}>
                <Image src={IconCorrect} />
                <div className={styles.progressTxtInActive}>เสร็จสิ้น</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div className={styles.qrPaymentContent} onClick={() => onPaid()}>
            <div className={styles.qrTitle}>ชำระค่าบริการหมายเลข {caseRef ? caseRef.data().caseNo : ''}</div>
            <div className='d-flex justify-content-center'>
              <Image src={IconQrCodeEx} height='450' />
            </div>
            <div className='d-flex mt-4 mb-4 justify-content-center'>
              <div className={styles.countTimeText}>ชำระเงินภายใน</div>
              <div className={styles.countTimeNumber}>14:38</div>
              <div className={styles.countTimeText}>นาที</div>
            </div>
            <div className='d-flex'>
              <div>
                <div className={styles.qrSectionDot}></div>
              </div>
              <div className={styles.qrSectionItem}>ในการชำระการใช้บริการด้วย QR-Payment จะมีการ update สถานะการชำระเงินแบบอัตโนมัติ หลังจากการชำระไม่เกิน 15 นาที กรณีที่ไม่มีการ update สถานะการชำระเงิน กรุณาติดต่อฝ่ายสนับสนุน</div>
            </div>
            <div className='d-flex'>
              <div>
                <div className={styles.qrSectionDot}></div>
              </div>
              <div className={styles.qrSectionItem}>สามารถชำระด้วย mobile banking application ของธนาคารต่างๆ ได้แก่ K+ (ธนาคารกสิกรไทย), SCB easy (ธนาคารไทยพาณิชย์), Next (ธนาคารกรุงไทย), KMA (ธนาคารกรุงศรีอยุธยา), Bualuang mBanking (ธนาคารกรุงเทพ) และ ttb touch (ธนาคารทหารไทยธนชาต)</div>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  )
}