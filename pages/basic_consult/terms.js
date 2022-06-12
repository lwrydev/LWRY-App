import { Button } from 'react-bootstrap'
import styles from './basicConsult.module.css'

import { useRouter } from "next/router"

export default function term() {

  const router = useRouter()

  return (
    <div className={styles.content}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.termsBox}>
            <div className={styles.termsTitle}>การใช้บริการให้คำแนะนำเบื้องต้น</div>
            <div className={styles.termsDetail}>บริการให้คำแนะนำเบื้องต้นของ Lawlivery เป็นบริการที่ช่วยให้คำแนะนำสำหรับคนที่กำลังประสบปัญหาทางกฎหมาย แต่ไม่รู้ว่าจะต้องเริ่มต้นอย่างไร ไม่รู้ว่ามี กระบวณการอะไรบ้าง บริการนี้จะช่วยให้สามารถเข้าถึงวิธีการแก้ไขปัญหาอย่างง่ายระดับเบื้องต้นเท่านั้น เพื่อทำทางไปบริการอื่นที่เหมาะสมกับท่านต่อไป</div>
            <div className={styles.termsList}>
              <div className='d-flex align-items-center'>
                <div className={styles.dot}></div>
                <div className={styles.termItem}>ขอคำแนะนำในราคา 50 บาทต่อ 1 คำถาม โดยไม่จำกัดจำนวนคำถาม</div>
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
                <div className={styles.termItem}>ขอคำแนะนำเพิ่มเติมได้ในราคา 50 บาทต่อหนึ่งคำถาม</div>
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