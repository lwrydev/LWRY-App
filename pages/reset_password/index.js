import styles from './resetPassword.module.css'

import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

export default function ResetPassword() {
  const [email, setEmail] = useState()

  const router = useRouter()

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email)
    } else {
      router.replace('/login')
    }
  }, [])

  return (
    <div className={styles.content}>
      <diiv>
        <div className={styles.resetPassBlock}>
          <div className={styles.resetPassTitle}>ตั้งรหัสผ่านใหม่ของคุณ</div>
          <div className={styles.resetPassDetail}>กรอก code ที่เราได้ส่งให้ในอีเมล</div>
          <div className={styles.resetPassEmail}>{email}</div>
          <div>
            <input
              className={styles.inputCode}
              type='tel'
            />
            <input
              className={styles.inputCode}
              type='tel'
            />
            <input
              className={styles.inputCode}
              type='tel'
            />
            <input
              className={styles.inputCode}
              type='tel'
            />
            <input
              className={styles.inputCode}
              type='tel'
            />
            <input
              className={styles.inputCode}
              type='tel'
            />
          </div>
          <div className={styles.btnGrp}>
            <div className={styles.btn}>ย้อนกลับ</div>
            <div className={styles.btn}>ส่ง code ใหม่</div>
          </div>
        </div>
      </diiv>
    </div>
  )
}