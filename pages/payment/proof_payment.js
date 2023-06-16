import { useEffect, useRef, useState } from "react"
import styles from './payment.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

import { firestore } from "../../config/firebase"
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, updateDoc, where } from "firebase/firestore"

import { Button, FloatingLabel, Form } from "react-bootstrap"
import AccountMenu2 from "../../components/home/AccountMenu2/AccountMenu2"
import Dropdown from "../../components/dropdown/Dropdown"

//icon
import IconUpload from '../../assets/logo/upload.svg'
import IconClose from '../../assets/logo/close.svg'
import { query } from "firebase/database"
import { getStorage, ref, uploadBytes } from "firebase/storage"

const storage = getStorage();

export default function ProofPayment({ user }) {
  const [caseRef, setCase] = useState(null)
  const [hisRef, setHisRef] = useState(null)
  const [selectCase, setSelectCase] = useState('')
  const [caseDropdownList, setCaseDropdownList] = useState([])
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)

  const router = useRouter()

  const refFile = useRef()

  const onUploadFile = () => {
    refFile.current.click()
  }

  useEffect(() => {
    // getCasePending()
    getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Pending') {
        setCase(caseData)
        getDocs(query(collection(firestore, 'payments_history'), where('case', '==', router.asPath.split('?caseId=')[1]), where('owner', '==', user.id), orderBy('changedDate', 'desc'), limit(1))).then(phList => {
          if (phList.docs.length > 0) {
            setHisRef(phList.docs[0])
          }
        })
        // setSelectCase(caseData.data().caseNo)
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  // useEffect(() => {
  //   if (selectCase)
  //     setCase(caseDropdownList.find(cs => cs.value === selectCase).case)
  //     getDocs(query(collection(firestore, 'payments_history'), where('case', '==', router.asPath.split('?caseId=')[1]), orderBy('changedDate', 'desc'), limit(1))).then(phList => {
  //       if (caseList.docs.length > 0) {
  //         setHisRef(phList.docs[0])
  //       }
  //     })
  // }, [selectCase])

  // const getCasePending = () => {
  //   getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), where('status', '==', 'Pending Payment'))).then(caseList => {
  //     if (caseList.docs.length > 0) {
  //       setCaseDropdownList(caseList.docs.map(cs => (
  //         {
  //           cmp: <div className={styles.itemCaseSelect}>{cs.data().caseNo}</div>,
  //           value: cs.data().caseNo,
  //           case: cs
  //         }
  //       )))
  //     }
  //   })
  // }

  const uploadFile = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0])
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addDoc(collection(firestore, 'payments_verify'), {
      paymentHistory: hisRef.id,
      pic: {
        name: file.name,
        path: '/' + caseRef.id + '/' + file.name,
        type: file.type
      },
      owner: user.id
    }).then(() => {
      updateDoc(caseRef.ref, {
        payment: {
          channel: 'Bank Transfer',
          channelTH: 'โอนผ่านบัญชีธนาคาร',
          number: '',
          price: caseRef.data().payment.price,
          status: 'Paid',
          statusTH: 'ชำระแล้ว'
        },
        status: 'Waiting Lawer',
        statusTH: 'รอตอบรับจากทนายความ',
        changedDate: new Date()
      })
      updateDoc(hisRef.ref, {
        channel: 'Bank Transfer',
        channel: 'โอนผ่านบัญชีธนาคาร',
        number: '',
        price: caseRef.data().payment.price,
        status: 'Paid',
        statusTH: 'ชำระแล้ว',
        changedDate: new Date()
      }).then(() => {
        const storageRef = ref(storage, '/' + caseRef.id + '/' + file.name)
        uploadBytes(storageRef, file).then(() => {
          router.replace({
            pathname: '/payment/payment_success',
            query: { case: caseRef.id }
          })
        })
      })
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
            <Form onSubmit={onSubmit}>
              <div className="row">
                <input
                  ref={refFile}
                  accept="image/*,application/pdf"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={e => uploadFile(e)}
                />
                <div className="col-6">
                  {!image ?
                    <div
                      className={styles.attachFileBox}
                      onClick={() => onUploadFile()}
                    >
                      <Image src={IconUpload} />
                      <div className={styles.attachFileText}>แนบไฟล์หลักฐานการชำระเงิน</div>
                    </div>
                    :
                    <div className='d-flex'>
                      <img src={image} style={{ width: '90%' }} />
                      <div>
                        <Image
                          src={IconClose}
                          height='30'
                          width='30'
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setImage(null)
                            refFile.current.value = ''
                          }}
                        />
                      </div>
                    </div>
                  }
                </div>
                <div className="col-6">
                  <div className={styles.proofPaymentInputBox}>
                    <div className={styles.inputProof}>{selectCase}
                      {/* <Dropdown
                        label='บริการที่ชำระ'
                        items={caseDropdownList}
                        setValue={setSelectCase}
                        value={selectCase}
                      /> */}
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
            </Form>
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