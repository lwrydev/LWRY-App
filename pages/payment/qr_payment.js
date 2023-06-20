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
import BasicConsultProcessBar from '../../components/processBar/BasicConsultProcessBar'
import { Button } from 'react-bootstrap'

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

  // const onPaid = () => {
  //   updateDoc(caseRef.ref, {
  //     payment: {
  //       channel: 'QR-Code',
  //       number: '',
  //       price: caseRef.data().payment.price,
  //       status: 'Paid',
  //       statusTH: 'ชำระแล้ว'
  //     },
  //     status: 'Waiting Lawer',
  //     statusTH: 'รอตอบรับจากทนายความ',
  //     changedDate: new Date()
  //   }).then(() => {
  //     router.replace({
  //       pathname: '/payment/payment_success',
  //       query: { case: caseRef.id }
  //     })
  //   })
  // }

  const onPressProofPayment = () => {
    router.push({
      pathname: '/payment/proof_payment',
      query: {
        caseId: caseRef.id
      }
    })
  }

  return (
    <div className={styles.content}>
      {caseRef ?
        <>
          {caseRef.data().type === 'Basic Consult' ?
            <BasicConsultProcessBar /> :
            <></>
          }
          <div className='row'>
            <div className='col-3'></div>
            <div className='col-6'>
              <div className={styles.qrPaymentContent} >
                <div className={styles.qrTitle}>ชำระค่าบริการหมายเลข {caseRef ? caseRef.data().caseNo : ''}</div>
                <div className='d-flex justify-content-center'>
                  {/* <Image src={IconQrCodeEx} height='450' /> */}
                  <img src={'https://promptpay.io/1129700120276/' + caseRef.data().payment.price + '.png'} height={250} />
                </div>
                <div className='d-flex mt-4 mb-4 justify-content-center'>
                  {/* <div className={styles.countTimeText}>ชำระเงินภายใน</div>
                  <div className={styles.countTimeNumber}>14:38</div>
                  <div className={styles.countTimeText}>นาที</div> */}
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
                <div className='d-flex justify-content-center'>
                  <div className='p-1'>
                    <Button
                      className={styles.btn}
                      onClick={() => onPressProofPayment()}
                    >
                      <div>แจ้งโอนเงิน</div>
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
        </> :
        <></>
      }
    </div>
  )
}