import { useEffect, useState } from "react"
import styles from './payment.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

import { firestore } from "../../config/firebase"
import { collection, doc, getDoc, getDocs, limit, orderBy, where } from "firebase/firestore"

import { Button, FloatingLabel, Form } from "react-bootstrap"
import AccountMenu2 from "../../components/home/AccountMenu2/AccountMenu2"
import Dropdown from "../../components/dropdown/Dropdown"

//icon
import IconUpload from '../../assets/logo/upload.svg'
import { query } from "firebase/database"

export default function ProofPayment({ user }) {
  const [caseRef, setCase] = useState(null)
  const [selectCase, setSelectCase] = useState('')
  const [caseDropdownList, setCaseDropdownList] = useState([])

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Pending') {
        setCase(caseData)
        setSelectCase(caseData.data().caseNo)
      } else {
        router.replace('/home/caselist')
      }
    })
    getCasePending()
  }, [])

  const getCasePending = () => {
    getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), where('status', '==', 'Pending Payment'))).then(caseList => {
      if (caseList.docs.length > 0) {
        setCaseDropdownList(caseList.docs.map(cs => (
          {
            cmp: <div className={styles.itemCaseSelect}>{cs.data().caseNo}</div>,
            value: cs.data().caseNo
          }
        )))
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.nameTitle}>แจ้งการชำระเงิน</div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <div className={styles.proofPaymentBox}>
            <div className={styles.proofPaymentTitle}>โอนเงินผ่านธนาคาร</div>
            <div className={styles.proofPaymentTitle2}>รายละเอียดการชำระเงิน</div>
            <div className="row">
              <div className="col-6">
                <div className={styles.attachFileBox}>
                  <Image src={IconUpload} />
                  <div className={styles.attachFileText}>แนบไฟล์หลักฐานการชำระเงิน</div>
                </div>
              </div>
              <div className="col-6">
                <div className={styles.proofPaymentInputBox}>
                  <div className={styles.inputProof}>
                    <Dropdown
                      label='บริการที่ชำระ'
                      items={caseDropdownList}
                      setValue={setSelectCase}
                      value={selectCase}
                    />
                  </div>
                  <div className={styles.inputProof}>
                    <FloatingLabel controlId="floatingTextarea2" label="ชื่อ-นามสกุลที่ชำระ" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                      <Form.Control
                        as={'input'}
                        placeholder="Leave a comment here"
                        style={{ height: '46px', fontWeight: 400, color: '#6E6E6E' }}
                        required
                        className={styles.inputDisabled}
                      />
                    </FloatingLabel>
                  </div>
                  <div className={styles.inputProof}>
                    <FloatingLabel controlId="floatingTextarea2" label="ชำระเข้าบัญชี" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                      <Form.Control
                        as={'input'}
                        placeholder="Leave a comment here"
                        style={{ height: '46px' }}
                        required
                        className={styles.inputDisabled}
                      />
                    </FloatingLabel>
                  </div>
                  <div className={styles.inputProof}>
                    <FloatingLabel controlId="floatingTextarea2" label="วัน/เดือน/ปี เวลา ที่ชำระ" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                      <Form.Control
                        as={'input'}
                        placeholder="Leave a comment here"
                        style={{ height: '46px', fontWeight: 400, color: '#6E6E6E' }}
                        required
                        className={styles.inputDisabled}
                      />
                    </FloatingLabel>
                  </div>
                  <div className={styles.inputProof}>
                    <FloatingLabel controlId="floatingTextarea2" label="จำนวนเงินที่ชำระ" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                      <Form.Control
                        as={'input'}
                        placeholder="Leave a comment here"
                        style={{ height: '46px', fontWeight: 400, color: '#6E6E6E' }}
                        required
                        className={styles.inputDisabled}
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <div
                className={styles.backwordBtn}
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </div>
              <Button
                className={styles.btn}
                type='submit'
              >
                <div>ยืนยัน</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-3">
          <AccountMenu2 user={user} />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}