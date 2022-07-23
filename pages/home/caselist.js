import { useEffect, useState } from "react"
import styles from './home.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

import { firestore } from '../../config/firebase'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore"

//icon
import IconGoogleCircle from '../../assets/logo/google_circle.svg'
import IconFacebookCircle from '../../assets/logo/facebook_circle.svg'

import { Button } from "react-bootstrap"
import InfiniteScroll from 'react-infinite-scroll-component'

export default function caselist({ user }) {
  const [userRef, setUserRef] = useState(null)
  const [cases, setCases] = useState([])
  const [moreCase, setMoreCase] = useState(true)
  const [onload, setOnload] = useState(true)
  const [lastCase, setLastCase] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), limit(3))).then(caseList => {
        if (caseList.docs.length == 0) {
          router.replace('/home')
        } else {
          setLastCase(caseList.docs[caseList.docs.length - 1])
          setCases(caseList.docs.map(cs => cs))
          setOnload(false)
        }
      })
    }
  }, [])

  const fetchMoreCase = () => {
    getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), startAfter(lastCase), limit(3))).then(caseList => {
      if (caseList.docs.length == 0) {
        setMoreCase(false)
      } else {
        setLastCase(caseList.docs[caseList.docs.length - 1])
        setCases(cases.concat(caseList.docs.map(cs => cs)))
      }
    })
  }

  const onPressPay = (id) => {
    router.push({
      pathname: '/basic_consult/payment',
      query: {
        caseId: id
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.nameTitle}>ยินดีต้อนรับสู่บัญชีของคุณ, {user ? user.data().displayName : ''}</div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <div className={styles.caseList}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className={styles.caselistTitle}>บริการของคุณ</div>
              <Button
                className={styles.btn2}
              >
                <div onClick={() => router.push('/home')}>เพิ่มบริการ</div>
              </Button>
            </div>
            <InfiniteScroll
              dataLength={cases.length}
              next={() => fetchMoreCase()}
              hasMore={moreCase}
              loader={<h4>Loading...</h4>}
              height={600}
              endMessage={<></>}
            >
              {cases.map((cs, index) => {
                return <div
                  key={index}
                  className={styles.caseBox}
                >
                  <div className="row">
                    <div className="col-4">
                      <div className={styles.mr16}>
                        <div className={styles.menuCaseTitle}>คดีหมายเลข</div>
                        <div className={styles.caseNo}>{cs.data().caseNo}</div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>ประเภทบริการ</div>
                          <div className={styles.caseTypeText}>{cs.data().typeTH}</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>สถานะ</div>
                          <div className={styles.caseStatusText} style={cs.data().status == 'Pending Payment' ? { color: '#D89015' } : { color: '#406EAC' }}>{cs.data().statusTH}</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>ทนายที่รับผิดชอบ</div>
                          <div className={styles.caseLawyerText}>{cs.data().lawyer}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className={styles.mr16}>
                        <div className={styles.menuCaseTitle}>รายละเอียด</div>
                        <div className="d-flex">
                          <div className={styles.caseDetailsText}>{cs.data().details}</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>จำนวนคำถาม</div>
                          <div className={styles.caseTypeText}>{cs.data().questions.length}</div>
                          <div className={styles.caseTypeText}>คำถาม</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>จำนวนเอกสาร</div>
                          <div className={styles.caseTypeText}>{cs.data().pic.length}</div>
                          <div className={styles.caseTypeText}>รูปภาพ,</div>
                          <div className={styles.caseTypeText}>{cs.data().docs.length}</div>
                          <div className={styles.caseTypeText}>เอกสาร</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className={styles.mr16}>
                        <div className={styles.menuCaseTitle}>การชำระเงิน</div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>สถานะ</div>
                          <div className={styles.caseTypeText}>{cs.data().payment.statusTH}</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>ช่องทาง</div>
                          <div className={styles.caseTypeText}>{cs.data().payment.channel}</div>
                        </div>
                        <div className="d-flex">
                          <div className={styles.caseSubTitle}>หมายเลข</div>
                          <div className={styles.caseTypeText}>{cs.data().payment.number}</div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className={styles.caseSubTitle}>จำนวน</div>
                          <div className={styles.casePriceText}>{cs.data().payment.price}</div>
                          <div className={styles.casePriceText}>บาท</div>
                        </div>
                        {cs.data().payment.status == 'Paid' ?
                          <div className={styles.paymentHistory}>ดูประวัติการชำระเงิน</div>
                          :
                          <div>
                            <Button
                              className={styles.btn2}
                              onClick={() => onPressPay(cs.id)}
                            >
                              <div>ชำระเงิน</div>
                            </Button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </InfiniteScroll>
          </div>
        </div>
        <div className="col-3">
          <div className={styles.account}>
            <div className='row justify-content-center align-content-center'>
              <div className={styles.profilePic}>{user ? user.data().displayName.split(' ')[0][0] + (user.data().displayName.split(' ').length > 0 ? user.data().displayName.split(' ')[1][0] : '') : ''}</div>
              <div className={styles.displayName}>{user ? user.data().displayName : ''}</div>
              <div className={styles.editBtn}>แก้ไขโปรไฟล์</div>
            </div>
            <div className={styles.line}></div>
            <div className=''>
              <div className={styles.profileDetail}>
                <div className={styles.emailTxt}>{user ? user.data().email : ''}</div>
                <div className={styles.editBtnDetail}>เปลี่ยนอีเมล</div>
              </div>
              <div className={styles.profileDetail}>
                <div className={styles.emailTxt}>แก้ไขรหัสผ่านล่าสุดเมื่อ 1 เดือนที่แล้ว</div>
                <div className={styles.editBtnDetail}>อัปเดตความปลอดภัยรหัสผ่าน</div>
              </div>
              <div className={styles.profileDetail}>
                <div className='flex-wrap'>
                  <Image src={IconGoogleCircle} width='32' height='26' className={styles.pointer} />
                  <Image src={IconFacebookCircle} width='32' height='26' className={styles.pointer} />
                </div>
                <div className={styles.editBtnDetail}>จัดการบัญชี social</div>
              </div>
            </div>
          </div>
          <div className={styles.menu}>
            <div className={styles.menuTitle}>ซัพพอร์ต</div>
            <div className={styles.subMenuGrp}>
              <div className={styles.subMenu}>วิธีการสั่งซื้อบริการ</div>
              <div className={styles.subMenu}>ขั้นตอนการรับคำปรึกษา</div>
              <div className={styles.subMenu}>ขั้นตอนการว่าจ้างทนาย</div>
              <div className={styles.subMenu}>คู่มือการใช้งานเว็บไซต์</div>
            </div>
            <div className={styles.menuTitle}>การสนับสนุน</div>
            <div className={styles.subMenuGrp}>
              <div className={styles.subMenu}>คำถามที่พบบ่อย</div>
              <div className={styles.subMenu}>รับเรื่องร้องเรียน</div>
              <div className={styles.subMenu}>ติดต่อเรา</div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div >
  )
}