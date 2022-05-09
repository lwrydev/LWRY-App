import styles from './login.module.css'
import Image from 'next/image'

//firebase
import '../../config/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

//icon
import IconLock from '../../assets/logo/lock.svg'

import { Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import LawliveryApp from '../../components/lawliveryApp/LawliveryApp'

const auth = getAuth()

export default function pw({ user, setUser }) {
  const [onload, setOnload] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/home')
    }
    if (router.query.email && router.query.email.replace(' ', '')) {
      setEmail(router.query.email)
    } else {
      router.push('/login')
    }
  }, [])

  const submitPassword = (e) => {
    setOnload(true)
    e.preventDefault()
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password).then(userData => {
      setUser(userData)
      sessionStorage.setItem('user', userData.user.uid)
      console.log(userData);
      setSessionUser(userData)
      router.replace('/')
      setOnload(false)
    }).catch(() => {
      setOnload(false)
      alert('รหัสผ่านไม่ถูกต้อง')
    })
  }

  const setSessionUser = (userData) => {
    fetch('/api/redis/create_bykey', {
      body: JSON.stringify({
        key: userData.id,
        user: userData
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  return (
    <div className={styles.content}>
      <div className='h-100 row align-items-center w-100'>
        <div className='col-xl-2 col-lg-1 col-md-0 col-sm-0 col-0'></div>
        <div className="col-xl-5 col-lg-6 col-md-6 col-sm-0 col-0 h-100 d-none justify-content-center align-items-center d-md-flex">
          <LawliveryApp />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
          <div className={styles.loginBlock}>
            <div className={styles.loginTitle}>กรอกรหัสผ่านของคุณ</div>
            <div className='d-flex align-items-center'>
              <div className={styles.profileImg}></div>
              <div className={styles.accBlock}>
                <div className={styles.accText}>บัญชีผู้ใช้</div>
                <div className={styles.emailText}>{email}</div>
              </div>
            </div>
            <Form
              onSubmit={submitPassword}
              className={styles.formBlock}
            >
              <div className='d-flex align-items-center'>
                <input
                  autoFocus
                  className={styles.inputEmail}
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.logoEmail}><Image src={IconLock} /></div>
              </div>
              <div className='d-flex justify-content-end'>
                <Button
                  className={styles.nextButton}
                  type='submit'
                >
                  {!onload ?
                    <div>ถัดไป</div> :
                    <div className={styles.onload + " spinner-border text-light"} role="status"></div>
                  }
                </Button>
              </div>
            </Form>
            <div className={styles.otherOptions}>
              <div className={styles.optionLink}>ตั้งรหัสผ่านของคุณใหม่</div>
              <div className={styles.optionLink}>เข้าสู่ระบบด้วยบัญชีอื่น</div>
            </div>
          </div>
        </div>
        <div className='col-xl-2 col-lg-2 col-md-0 col-sm-0 col-0'></div>
      </div>
    </div>
  )
}