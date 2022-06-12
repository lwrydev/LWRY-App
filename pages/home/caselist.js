import { useEffect, useState } from "react"
import styles from './home.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

//icon
import IconGoogleCircle from '../../assets/logo/google_circle.svg'
import IconFacebookCircle from '../../assets/logo/facebook_circle.svg'
import { Button } from "react-bootstrap"

export default function caselist({ user }) {
  const [cases, setCases] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user])

  useEffect(() => {
    setCases([
      {
        caseNo: 'A-1H969HF',
        type: 'คำปรึกษาเบื้องต้น',
        status: 'รอการชำระเงิน',
        desc: 'บริการที่ช่วยให้คำแนะนำสำหรับคนที่ กำลังประสบปัญหาทางกฎหมาย',
        questions: [
          { question: '' },
          { question: '' },
          { question: '' },
          { question: '' },
          { question: '' }
        ],
        lawyer: '',
        docs: {
          pic: [
            { path: '' },
            { path: '' },
            { path: '' },
            { path: '' }
          ],
          file: [
            { path: '' }
          ]
        },
        payment: {
          status: 'รอการชำระเงิน',
          channel: '',
          number: '',
          price: 550
        }
      },
      {
        caseNo: 'A-1H96963',
        type: 'คำปรึกษาเบื้องต้น',
        status: 'รอตอบรับจากทนายความ',
        desc: 'บริการที่ช่วยให้คำแนะนำสำหรับคนที่ กำลังประสบปัญหาทางกฎหมายแต่ ไม่รู้ว่าจะต้องเริ่มต้น...',
        questions: [
          { question: '' },
          { question: '' },
          { question: '' }
        ],
        lawyer: 'ฤทธา ทำนอง',
        docs: {
          pic: [
            { path: '' },
            { path: '' },
            { path: '' },
            { path: '' }
          ],
          file: [
            { path: '' }
          ]
        },
        payment: {
          status: 'ชำระแล้ว',
          channel: 'QR-CODE',
          number: 'QRC-019345',
          price: 150
        }
      },
      {
        caseNo: 'A-1H19300',
        type: 'คำปรึกษาเบื้องต้น',
        status: 'ทนายได้ให้คำตอบแล้ว',
        desc: 'บริการที่ช่วยให้คำแนะนำสำหรับคนที่ กำลังประสบปัญหาทางกฎหมาย',
        questions: [
          { question: '' }
        ],
        lawyer: 'ฤทธา ทำนอง',
        docs: {
          pic: [
            { path: '' },
            { path: '' },
            { path: '' },
            { path: '' }
          ],
          file: [
            { path: '' }
          ]
        },
        payment: {
          status: 'ชำระแล้ว',
          channel: 'CREDIT-CARD',
          number: 'QRC-019345',
          price: 50
        }
      }
    ])
  }, [])

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.nameTitle}>ยินดีต้อนรับสู่บัญชีของคุณ, {user ? user.displayName : ''}</div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <div className={styles.caseList}>
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.caselistTitle}>บริการของคุณ</div>
              <Button
                className={styles.btn2}
              >
                <div onClick={() => console.log('test')}>เพิ่มบริการ</div>
              </Button>
            </div>
            {cases.map((cs, index) => {
              return <div
                key={index}
                className={styles.caseBox}
              >
                <div className="row">
                  <div className="col-4">
                    <div className={styles.mr16}>
                      <div className={styles.menuCaseTitle}>คดีหมายเลข</div>
                      <div className={styles.caseNo}>{cs.caseNo}</div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>ประเภทบริการ</div>
                        <div className={styles.caseTypeText}>{cs.type}</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>สถานะ</div>
                        <div className={styles.caseStatusText} style={cs.status == 'รอการชำระเงิน' ? { color: '#D89015' } : { color: '#406EAC' }}>{cs.status}</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>ทนายที่รับผิดชอบ</div>
                        <div className={styles.caseLawyerText}>{cs.lawyer}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className={styles.mr16}>
                      <div className={styles.menuCaseTitle}>รายละเอียด</div>
                      <div className="d-flex">
                        <div className={styles.caseDetailsText}>{cs.desc}</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>จำนวนคำถาม</div>
                        <div className={styles.caseTypeText}>{cs.questions.length}</div>
                        <div className={styles.caseTypeText}>คำถาม</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>จำนวนเอกสาร</div>
                        <div className={styles.caseTypeText}>{cs.docs.pic.length}</div>
                        <div className={styles.caseTypeText}>รูปภาพ,</div>
                        <div className={styles.caseTypeText}>{cs.docs.file.length}</div>
                        <div className={styles.caseTypeText}>เอกสาร</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className={styles.mr16}>
                      <div className={styles.menuCaseTitle}>การชำระเงิน</div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>สถานะ</div>
                        <div className={styles.caseTypeText}>{cs.payment.status}</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>ช่องทาง</div>
                        <div className={styles.caseTypeText}>{cs.payment.channel}</div>
                      </div>
                      <div className="d-flex">
                        <div className={styles.caseSubTitle}>หมายเลข</div>
                        <div className={styles.caseTypeText}>{cs.payment.number}</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className={styles.caseSubTitle}>จำนวน</div>
                        <div className={styles.casePriceText}>{cs.payment.price}</div>
                        <div className={styles.casePriceText}>บาท</div>
                      </div>
                      {cs.payment.status == 'ชำระแล้ว' ?
                        <div className={styles.paymentHistory}>ดูประวัติการชำระเงิน</div>
                        :
                        <div>
                          <Button
                            className={styles.btn2}
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
          </div>
        </div>
        <div className="col-3">
          <div className={styles.account}>
            <div className='row justify-content-center align-content-center'>
              <div className={styles.profilePic}>{user ? user.displayName[0] + user.displayName.slice(-1) : ''}</div>
              <div className={styles.displayName}>{user ? user.displayName : ''}</div>
              <div className={styles.editBtn}>แก้ไขโปรไฟล์</div>
            </div>
            <div className={styles.line}></div>
            <div className=''>
              <div className={styles.profileDetail}>
                <div className={styles.emailTxt}>{user ? user.email : ''}</div>
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