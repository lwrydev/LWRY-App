import { useEffect, useState } from "react"
import styles from './home.module.css'

import { useRouter } from "next/router"

import { firestore } from '../../config/firebase'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore"

import { Button } from "react-bootstrap"
import InfiniteScroll from 'react-infinite-scroll-component'
import AccountMenu2 from "../../components/home/AccountMenu2/AccountMenu2"

export default function caselist({ user }) {
  const [cases, setCases] = useState([])
  const [moreCase, setMoreCase] = useState(true)
  const [onload, setOnload] = useState(true)
  const [lastCase, setLastCase] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (user.data().role == 'User') {
        getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), orderBy('changedDate', 'desc'), limit(3))).then(caseList => {
          if (caseList.docs.length == 0) {
            router.replace('/home')
          } else {
            setLastCase(caseList.docs[caseList.docs.length - 1])
            setCases(caseList.docs.map(cs => cs))
            setOnload(false)
          }
        })
      } else {
        getDocs(query(collection(firestore, 'cases'), where('lawerID', '==', user.id), orderBy('changedDate', 'desc'), limit(3))).then(caseList => {
          if (caseList.docs.length == 0) {
            router.replace('/home')
          } else {
            setLastCase(caseList.docs[caseList.docs.length - 1])
            setCases(caseList.docs.map(cs => cs))
            setOnload(false)
          }
        })
      }
    }
  }, [])

  const fetchMoreCase = () => {
    if (user.data().role == 'User') {
      getDocs(query(collection(firestore, 'cases'), where('owner', '==', user.id), orderBy('changedDate', 'desc'), startAfter(lastCase), limit(3))).then(caseList => {
        if (caseList.docs.length == 0) {
          setMoreCase(false)
        } else {
          setLastCase(caseList.docs[caseList.docs.length - 1])
          setCases(cases.concat(caseList.docs.map(cs => cs)))
        }
      })
    } else {
      getDocs(query(collection(firestore, 'cases'), where('lawerID', '==', user.id), orderBy('changedDate', 'desc'), startAfter(lastCase), limit(3))).then(caseList => {
        if (caseList.docs.length == 0) {
          setMoreCase(false)
        } else {
          setLastCase(caseList.docs[caseList.docs.length - 1])
          setCases(cases.concat(caseList.docs.map(cs => cs)))
        }
      })
    }
  }

  const onPressPay = (id) => {
    router.push({
      pathname: '/payment',
      query: {
        caseId: id
      }
    })
  }

  const openCase = (cs) => {
    if (cs.data().payment.status == 'Paid') {
      router.push({
        pathname: '/chat',
        query: {
          caseId: cs.id
        }
      })
    }
  }

  return (
    <div className={styles.container}>
      {!onload ?
        <>
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
                      onClick={() => openCase(cs)}
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
              <AccountMenu2 user={user} />
            </div>
            <div className="col-1"></div>
          </div>
        </> :
        <></>
      }
    </div >
  )
}