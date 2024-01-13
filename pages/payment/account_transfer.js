import styles from './payment.module.css'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from "next/router"

//icon
import IconKbank from '../../assets/logo/kbank.svg'
import IconSCB from '../../assets/logo/scb.svg'
import IconKT from '../../assets/logo/krungthai.svg'
import IconKMA from '../../assets/logo/kma.svg'

import { useEffect, useState } from 'react'

import { firestore } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import BasicConsultProcessBar from '../../components/processBar/BasicConsultProcessBar'

export default function AccountTransfer({ user }) {
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
      {caseRef && caseRef.data().type === 'Basic Consult' ?
        <BasicConsultProcessBar /> :
        <></>
      }
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div className={styles.qrPaymentContent}>
            <div className={styles.qrTitle}>ชำระค่าบริการหมายเลข {caseRef ? caseRef.data().caseNo : ''}</div>
            <div className={styles.accountCompanyName}>ชื่อบัญชี บริษัท ลอลิเวอร์รี่ จำกัด</div>
            <div className='d-flex justify-content-center'>
            </div>
            <div className={styles.bankAccountGrp}>
              <div className='d-flex'>
                <Image src={IconKbank} />
                <div className='mx-2 mb-2'>
                  <div className={styles.accountNoTitle}>เลขบัญชี</div>
                  <div className={styles.accountNo}>123-4-56789-0</div>
                </div>
              </div>
              <div className='d-flex'>
                <Image src={IconSCB} />
                <div className='mx-2 mb-2'>
                  <div className={styles.accountNoTitle}>เลขบัญชี</div>
                  <div className={styles.accountNo}>123-4-56789-0</div>
                </div>
              </div>
              <div className='d-flex'>
                <Image src={IconKT} />
                <div className='mx-2 mb-2'>
                  <div className={styles.accountNoTitle}>เลขบัญชี</div>
                  <div className={styles.accountNo}>123-4-56789-0</div>
                </div>
              </div>
              <div className='d-flex'>
                <Image src={IconKMA} />
                <div className='mx-2 mb-2'>
                  <div className={styles.accountNoTitle}>เลขบัญชี</div>
                  <div className={styles.accountNo}>123-4-56789-0</div>
                </div>
              </div>
            </div>
            <div className={styles.accountTransferDesc}>สามารถทำการชำระค่าบริการตามรายละเอียดผ่านเคาน์เตอร์ธนาคาร, ตู้ ATM หรือ Mobile Banking โดยหลังจากการชำระเงินต้องทำการ แจ้งโอนเงิน เพื่อทำการตรวจสอบการชำระเงินของท่าน ไม่เกิน 24 ชั่วโมงหลังการแจ้งโอนเงิน ก่อนจะสามารถเข้าใช้บริการของท่านได้</div>
            <div className='d-flex justify-content-center'>
              <div className='p-1'>
                <Button
                  className={styles.btnCancel}
                  onClick={() => router.replace('/home/caselist')}
                >
                  <div>ย้อนกลับ</div>
                </Button>
              </div>
              <div className='p-1'>
                <Button
                  className={styles.btn}
                  onClick={() => onPressProofPayment()}
                >
                  <div>แจ้งโอนเงิน</div>
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