import styles from './accountMenu2.module.css'
import Image from 'next/image'

//icon
import IconGoogleCircle from '../../../assets/logo/google_circle.svg'
import IconFacebookCircle from '../../../assets/logo/facebook_circle.svg'
import { useEffect, useState } from 'react'

export default function AccountMenu2({ user }) {
  const [pf, setPf] = useState("")

  useEffect(() => {
    if (user) {
      if (user.data().displayName.split(" ").length > 1) {
        setPf(user.data().displayName.split(" ")[0][0] + user.data().displayName.split(" ")[1][0])
      } else {
        setPf(user.data().displayName.split(" ")[0][0])
      }
    }
  }, [user])

  return (
    <div>
      <div className={styles.account}>
        <div className='row justify-content-center align-content-center'>
          <div className={styles.profilePic}>{pf}</div>
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
  )
}