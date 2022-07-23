import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from './verify.module.css'
import Image from 'next/image'

//icon
import IconLawliveryApp from '../../assets/logo/lawlivery_app.svg'
import { Button } from 'react-bootstrap'

export default function Verification() {
  const [pass, setPass] = useState('T1')
  const [message, setMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (router.asPath.split('?token=')[1].split('&utm_campaign')[0]) {
      verify()
    } else {
      router.replace('/login')
    }
  }, [])

  const verify = async () => {
    fetch('/api/token/decode', {
      body: JSON.stringify({
        token: router.asPath.split('?token=')[1].split('&utm_campaign')[0]
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(res => {
      if (res.status == 200) {
        res.json().then(decoded => {
          console.log(decoded);
          checkExpire(decoded)
        })
      } else {
        setPass('T2')
        setMessage('ไม่สามารถถอดรหัสได้ กรุณาตรวจสอบ URL ของคุณใหม่')
      }
    })
  }

  const checkExpire = async (decoded) => {
    fetch('/api/redis/get_bykey', {
      body: JSON.stringify({
        key: decoded.email
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
    }).then(res => {
      if (res.status == 200) {
        res.json().then(user => {
          console.log(user);
          if (user.id == decoded.uuid) {
            if (user.email_verified) {
              setPass('T2')
              setMessage('คุณได้ยืนยันตัวตนอีเมลไปแล้ว')
            }
          } else {
            setPass('T3')
            setMessage('ไม่สามารถถอดรหัสได้ กรุณาตรวจสอบ URL ของคุณใหม่')
          }
        })
      } else {
        setPass("T4")
        setMessage('การลงทะเบียนด้วยอีเมลของคุณหมดอายุ กรุณาลงทะเบียนใหม่')
      }
    })
  }

  const confirm = () => {
    router.replace({
      pathname: '/verification/verified',
      query: { token: router.asPath.split('?token=')[1].split('&utm_campaign')[0] }
    })
  }

  const login = () => {
    router.replace('/login')
  }

  const register = () => {
    router.replace('/register')
  }

  return (
    <div className={styles.content}>
      <div className={styles.emailBlock}>
        <Image src={IconLawliveryApp} width='200' height='50' />
        <div className={styles.formBlock}>
          {
            pass == "T1"
              ?
              <div></div>
              :
              <div>{message}</div>
          }
        </div>
        <div className='d-flex justify-content-end'>
          {
            pass == 'T1'
              ?
              <Button
                className={styles.loginBtn}
                onClick={() => confirm()}
              >
                ยืนยัน
              </Button>
              :
              pass == 'T2'
                ?
                <Button
                  className={styles.loginBtn}
                  onClick={() => login()}
                >
                  ไปที่หน้าเข้าสู่ระบบ
                </Button>
                :
                <Button
                  className={styles.loginBtn}
                  onClick={() => register()}
                >
                  ไปที่หน้าลงทะเบียน
                </Button>
          }
        </div>
      </div>
    </div>
  )
}