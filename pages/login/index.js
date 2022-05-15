import styles from './login.module.css'
import Image from 'next/image'

//firebase
import '../../config/firebase'
import { getAuth } from 'firebase/auth'

//icon
import IconEmail from '../../assets/logo/email.svg'
import IconGoogle from '../../assets/logo/google.svg'
import IconFacebook2 from '../../assets/logo/facebook_sq.svg'
import IconLine from '../../assets/logo/line.svg'
import IconApple from '../../assets/logo/Icon_metro_apple.svg'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

import { Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import LawliveryApp from '../../components/lawliveryApp/LawliveryApp'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const auth = getAuth()

export default function Login({ user }) {
  const [email, setEmail] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [])

  const nextLogin = (e) => {
    e.preventDefault()
    getDocs(query(collection(firestore, 'users'), where('email', '==', email))).then(users => {
      if (users.size > 0) {
        users.docs.forEach(userRef => {
          router.push({
            pathname: '/login/pw',
            query: { userRef: JSON.stringify({ email: userRef.data().email }) }
          })
        })
      } else {
        toast.error("อีเมลไม่ถูกต้อง", {
          position: 'bottom-right'
        })
      }
    })
  }

  return (
    <div className={styles.content}>
      <div className='h-100 row align-items-center w-100'>
        <div className='col-xl-2 col-lg-1 d-md-none col-sm-1 col-1'></div>
        <div className="col-xl-5 col-lg-6 col-md-6 d-sm-none d-md-flex col-0 h-100 justify-content-center align-items-center d-none">
          <LawliveryApp />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10 col-10 d-flex justify-content-center align-items-center">
          <div className={styles.loginBlock}>
            <div className={styles.loginTitle}>เข้าสู่ระบบ</div>
            <div className='d-flex'>
              <div className={styles.qaText}>ยังไม่มีบัญชีใช่หรือไม่?</div>
              <Link href='/register'>
                <div className={styles.createText}>สร้างบัญชี</div>
              </Link>
            </div>
            <Form onSubmit={nextLogin}>
              <div className='d-flex align-items-center'>
                <input
                  className={styles.inputEmail}
                  placeholder='Email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <div className={styles.logoEmail}><Image src={IconEmail} /></div>
              </div>
              <div className='d-flex justify-content-end'>
                <Button
                  className={styles.nextButton}
                  type='submit'
                >
                  ถัดไป
                </Button>
              </div>
            </Form>
            <ToastContainer />
            <div>
              <div className={styles.line}>
                <div className={styles.orText}>หรือ</div>
              </div>
            </div>
            <div className={styles.googleBtn + ' ' + styles.btn} variant="light">
              <Image src={IconGoogle} />
              <div className={styles.googleTitle}>เข้าสู่ระบบด้วย Google</div>
            </div>
            <div className={styles.facebookBtn + ' ' + styles.btn} variant="primary">
              <Image src={IconFacebook2} />
              <div className={styles.facebookTitle}>เข้าสู่ระบบด้วย Facebook</div>
            </div>
            <div className={styles.lineBtn + ' ' + styles.btn} variant="success">
              <Image src={IconLine} />
              <div className={styles.lineTitle}>เข้าสู่ระบบด้วย Line</div>
            </div>
            <div className={styles.appleBtn + ' ' + styles.btn} variant="dark">
              <Image src={IconApple} />
              <div className={styles.appleTitle}>เข้าสู่ระบบด้วย Apple</div>
            </div>
          </div>
        </div>
        <div className='col-xl-1 col-lg-1 d-md-none col-sm-1 col-1'></div>
      </div>
    </div>
  )
}