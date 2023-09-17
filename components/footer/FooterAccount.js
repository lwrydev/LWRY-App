import styles from './footer.module.css'
import Image from 'next/image'

import '../../config/firebase'
import { getAuth } from 'firebase/auth'

import { useRouter } from "next/router"

//icon
import IconGoogleCircle from '../../assets/logo/google_circle.svg'
import IconFacebookCircle from '../../assets/logo/facebook_circle.svg'

const auth = getAuth()

export default function FooterAccount({ user }) {

  const router = useRouter()

  return (
    <div className={styles.contentAcc}>
      <div className='row'>
        <div className="col-1"></div>
        <div className="col-10">
          <div className='row'>
            <div className='col-7'>
              <div className={styles.account}>
                <div className='row'>
                  <div className='col-4 row justify-content-center align-content-center'>
                    <img className={styles.profilePic} src={auth.currentUser.photoURL} width={60} height={60} />
                    <div className={styles.displayName}>{user ? user.data().displayName : ''}</div>
                    <div className={styles.editBtn}>แก้ไขโปรไฟล์</div>
                  </div>
                  <div className='col-8'>
                    <div className={styles.profileDetail}>
                      <div className={styles.emailTxt}>{user ? user.data().email : ''}</div>
                      <div
                        className={styles.editBtnDetail}
                        onClick={() => router.push("/account_security")}
                      >
                        เปลี่ยนอีเมล
                      </div>
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
              </div>
            </div>
            <div className='col-5'>
              <div className={styles.menu}>
                <div className='row'>
                  <div className='col-6'>
                    <div className={styles.menuTitle}>Support</div>
                    <div className={styles.subMenuGrp}>
                      <div className={styles.subMenu}>วิธีการสั่งซื้อบริการ</div>
                      <div className={styles.subMenu}>ขั้นตอนการรับคำปรึกษา</div>
                      <div className={styles.subMenu}>ขั้นตอนการว่าจ้างทนาย</div>
                      <div className={styles.subMenu}>คู่มือการใช้งานเว็บไซต์</div>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={styles.menuTitle}>การสนับสนุน</div>
                    <div className={styles.subMenuGrp}>
                      <div className={styles.subMenu}>คำถามที่พบบ่อย</div>
                      <div className={styles.subMenu}>รับเรื่องร้องเรียน</div>
                      <div className={styles.subMenu}>ติดต่อเรา</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}