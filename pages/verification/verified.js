import styles from './verify.module.css'
import Image from 'next/image'

import IconLawliveryApp from '../../assets/logo/lawlivery_app.svg'
import IconEmailVerified from '../../assets/logo/email_verified.svg'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const auth = getAuth()

export default function Verified() {

  const router = useRouter()

  useEffect(() => {
    if (router.asPath.split('?token=')[1]) {
      verify()
    } else {
      router.replace('/login')
    }
  }, [])

  const verify = async () => {
    fetch('/api/token/decode', {
      body: JSON.stringify({
        token: router.asPath.split('?token=')[1]
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(res => {
      if (res.status == 200) {
        res.json().then(decoded => {
          checkVerified(decoded)
        })
      }
    })
  }

  const checkVerified = (decoded) => {
    fetch('/api/redis/get_bykey', {
      body: JSON.stringify({
        key: decoded.email
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(res => {
      if (res.status == 200) {
        res.json().then(user => {
          user.email_verified = false
          setVerification(user)
        })
      }
    })
  }

  const setVerification = (user) => {
    fetch('/api/registration/verification', {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(res => {
      if (res.status == 200) {
        res.json().then(data => {
          createUserWithEmailAndPassword(auth, data.user.email, data.pw).then(userData => {
            setDoc(doc(firestore, 'users', userData.user.uid), {
              firstname: user.firstname,
              lastname: user.lastname,
              displayName: user.firstname + ' ' + user.lastname,
              email: user.email,
              createdDate: new Date(),
              changedDate: new Date(),
              role: 'User'
            })
            updateProfile(userData.user, { displayName: user.firstname + ' ' + user.lastname }).then(() => {
              signOut(auth)
              deleteUserOnRedis(userData)
            })
          })
        })
      }
    })
  }

  const deleteUserOnRedis = (user) => {
    fetch('/api/redis/delete_bykey', {
      body: JSON.stringify({
        key: user.email
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  const loginPage = () => {
    router.replace('/login')
  }

  return (
    <div className={styles.content}>
      <div className={styles.resultBlock}>
        <Image src={IconLawliveryApp} width='200' height='50' />
        <div className={styles.verifyPass}>Email ของคุณได้รับ การยืนยันเรียบร้อย!</div>
        <div className='d-flex justify-content-center'>
          <Image src={IconEmailVerified} width='160' />
        </div>
        <div className={styles.tyText}>ขอบคุณที่สมัคร Lawlivery ตอนนี้คุณสามารถเข้าสู่ระบบเพื่อสั่งซื้อและใช้บริการของเราได้แล้ว</div>
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