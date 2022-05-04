import styles from './register.module.css'
import Image from 'next/image'

import IconLawliveryApp from '../../assets/logo/lawlivery_app.svg'
import IconSentEmail from '../../assets/logo/sent_email.svg'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function RegisterResult() {

  const router = useRouter()

  useEffect(() => {
    if (!router.query.email)
      router.replace('/login')
  }, [])

  const loginPage = () => {
    router.replace('/login')
  }

  return (
    <div className={styles.content}>
      <div className={styles.resultBlock}>
        <Image src={IconLawliveryApp} width='200' height='50' />
        <div className={styles.tyMsg}>ขอบคุณที่สมัครใช้บริการ กับทาง Lawlivery</div>
        <div className='d-flex justify-content-center'>
          <Image src={IconSentEmail} width='160' />
        </div>
        <div className={styles.verifyText}>เพื่อตรวจสอบการยืนยันตัวตน และเข้าใช้งานเว็บไซต์ให้กดปุ่มยืนยันที่ lawlivery ได้ส่งให้ใน email ของท่าน</div>
        <div className='d-flex justify-content-end'>
          <Button
            className={styles.loginBtn}
            onClick={() => loginPage()}
          >
            ไปที่หน้าเข้าสู่ระบบ
          </Button>
        </div>
      </div>
    </div>
  )
}