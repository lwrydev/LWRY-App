import { useEffect } from "react"
import styles from './home.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

import { firestore } from '../../config/firebase'
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore"

import IconFeature from '../../assets/logo/icon_feature.svg'
import { Button } from "react-bootstrap"

import FooterAccount from "../../components/footer/FooterAccount"

export default function Home({ user }) {

  const router = useRouter()

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.replace('/login')
    }
  }, [user])

  const initAdviceService = () => {
    router.push('/basic_consult')
  }

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.nameTitle}>ยินดีต้อนรับสู่บัญชีของคุณ, {user ? user.data().displayName : ''}</div>
          <div className={styles.serviceBox}>
            <div className="row justify-content-center align-items-center">
              <div className={styles.serviceTitle}>เลือกใช้บริการเพื่อเริ่มต้นการใช้งานของคุณ</div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                  <div className={styles.serviceDetail}>ปัจจุบันโลกธุรกิจของเรามีการเปลี่ยนแปลงอย่างรวดเร็วตามการพัฒนาของเทคโนโลยีที่มีความก้าวหน้า อย่างไม่หยุดยั้งทำให้ผู้ประกอบการคงจะใช้วิธีการผลิต การจำหน่าย หรือการบริการแบบเดิม ๆ อีกต่อไปไม่ได้ เพราะอาจไม่สามารถตอบสนอง</div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className={styles.serviceItem}>
                      <Image src={IconFeature} height='230' />
                      <div className={styles.serviceItemTitle}>ให้คำปรึกษาเบื้องต้น</div>
                      <div className={styles.serviceItemDetail}>ช่วยให้ท่านเข้าถึงวิธีการแก้ไขในปัญหาเบื้องต้น เพื่อนำทางท่านไปยังบริการอื่นที่เหมาะสม</div>
                      <Button
                        className={styles.btn}
                      >
                        <div onClick={() => initAdviceService()}>เลือกใช้บริการ</div>
                      </Button>
                    </div>
                    <div className={styles.serviceItem}>
                      <Image src={IconFeature} height='230' />
                      <div className={styles.serviceItemTitle}>ปรึกษากับทนาย</div>
                      <div className={styles.serviceItemDetail}>ช่วยให้ท่านเข้าถึงวิธีการแก้ไขในปัญหาเบื้องต้น เพื่อนำทางท่านไปยังบริการอื่นที่เหมาะสม</div>
                      <Button
                        className={styles.btn}
                      >
                        <div>เลือกใช้บริการ</div>
                      </Button>
                    </div>
                    <div className={styles.serviceItem}>
                      <Image src={IconFeature} height='230' />
                      <div className={styles.serviceItemTitle}>ว่าจ้างทนาย</div>
                      <div className={styles.serviceItemDetail}>ช่วยให้ท่านเข้าถึงวิธีการแก้ไขในปัญหาเบื้องต้น เพื่อนำทางท่านไปยังบริการอื่นที่เหมาะสม</div>
                      <Button
                        className={styles.btn}
                      >
                        <div>เลือกใช้บริการ</div>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <FooterAccount user={user} />
    </div>
  )
}