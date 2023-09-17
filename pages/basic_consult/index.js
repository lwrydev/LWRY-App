import { Button } from 'react-bootstrap'
import styles from './basicConsult.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'

import { firestore } from '../../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function basicConsult({ user }) {

  const router = useRouter()

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
              <div className={styles.progressLineInActive}></div>
              <div className={styles.progressBoxInActive}>
                <Image src={IconEdit} />
                <div className={styles.progressTxtInActive}>กรอกข้อมูลเพื่อรับคำแนะนำเบื้องต้น</div>
              </div>
              <div className={styles.progressLineInActive}></div>
              <div className={styles.progressBoxInActive}>
                <Image src={IconMoneyCheck} />
                <div className={styles.progressTxtInActive}>ชำระค่าบริการ</div>
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
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.termsBox}>
            <div className={styles.termsTitle}>การใช้บริการให้คำแนะนำเบื้องต้น</div>
            <div className={styles.termsDetail}>บริการให้คำแนะนำเบื้องต้นของ Lawlivery เป็นบริการที่ช่วยให้คำแนะนำสำหรับคนที่กำลังประสบปัญหาทางกฎหมาย แต่ไม่รู้ว่าจะต้องเริ่มต้นอย่างไร ไม่รู้ว่ามี กระบวณการอะไรบ้าง บริการนี้จะช่วยให้สามารถเข้าถึงวิธีการแก้ไขปัญหาอย่างง่ายระดับเบื้องต้นเท่านั้น เพื่อทำทางไปบริการอื่นที่เหมาะสมกับท่านต่อไป</div>
            <div className={styles.termsList}>
              <div className='d-flex align-items-center'>
                <div className={styles.dot}></div>
                <div className={styles.termItem}>ค่าบริการ 50 บาท ต่อ 1 คำถาม โดยไม่จำกัดจำนวนคำถาม</div>
              </div>
              <div className='d-flex align-items-center'>
                <div className={styles.dot}></div>
                <div className={styles.termItem}>ชำระเงินก่อนใช้บริการผ่านระบบ e-Payment</div>
              </div>
              <div className='d-flex align-items-center'>
                <div className={styles.dot}></div>
                <div className={styles.termItem}>ระบบจะตอบกลับภายใน 6 ชั่วโมง โดยทนายมืออาชีพ</div>
              </div>
              <div className='d-flex align-items-center'>
                <div className={styles.dot}></div>
                <div className={styles.termItem}>ได้รับคูปองหลังจากประเมินการใช้บริการ</div>
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
                onClick={() => router.push('/basic_consult/create')}
              >
                <div>ใช้บริการ</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}