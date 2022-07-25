import styles from './register.module.css'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LawliveryApp from '../../components/lawliveryApp/LawliveryApp'

//icon
import IconGoogle from '../../assets/logo/google_circle.svg'
import IconFacebook from '../../assets/logo/facebook_circle.svg'
import IconLine from '../../assets/logo/line_circle.svg'
import IconApple from '../../assets/logo/apple_circle.svg'
import IconEmail from '../../assets/logo/email.svg'
import IconPersonal from '../../assets/logo/personal.svg'
import IconLock from '../../assets/logo/lock.svg'
import { Form, Button } from 'react-bootstrap'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { firestore } from '../../config/firebase'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Registration({ user, setUser }) {
  const [onload, setOnload] = useState(false)

  const [landscape, setLandscape] = useState(false)
  const { width, height } = useWindowSize()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [pwLevel, setPwLevel] = useState(0)
  const [polCheck, setPolCheck] = useState(false)
  const [match, setMatch] = useState(true)
  const [qaRequire, setQaRequire] = useState(false)

  const router = useRouter()

  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const userCol = collection(firestore, 'users')

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (width > height) {
      setLandscape(true)
    } else {
      setLandscape(false)
    }
  }, [width])

  useEffect(() => {
    if (password) {
      if (password.length < 8) {
        setPwLevel(1)
      } else if (password.length >= 8 && password.match(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])"))) {
        setPwLevel(3)
      } else {
        setPwLevel(2)
      }
    } else {
      setPwLevel(0)
    }
  }, [password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOnload(true)
    getDocs(query(userCol, where('email', '==', email))).then(users => {
      if (users.size == 0) {
        if (password == cfPassword) {
          fetch('/api/registration/create', {
            body: JSON.stringify({
              email: email,
              firstname: firstName,
              lastname: lastName,
              password: password,
              cfPassword: cfPassword
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(res => {
            if (res.status == 200) {
              res.json().then(data => {
                sendEmail(data)
              })
            } else {
              setOnload(false)
            }
          })
        } else {
          setOnload(false)
          toast.error("รหัสผ่านไม่ตรงกัน", {
            position: 'bottom-right'
          })
        }
      } else {
        setOnload(false)
        toast.error("อีเมลนี้ได้ลงทะเบียนไปแล้ว", {
          position: 'bottom-right'
        })
      }
    })
  }

  const sendEmail = async (req) => {
    const res = await fetch('/api/email/verification', {
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.status == 200) {
      router.push({
        pathname: '/register/regis_result',
        query: { email: email }
      })
    } else {
      setOnload(false)
    }
  }

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      const userData = result.user
      getDoc(doc(firestore, 'users', userData.uid)).then(userRef => {
        if (!userRef.data()) {
          console.log(userData);
          setDoc(doc(firestore, 'users', userData.uid), {
            displayName: userData.displayName,
            email: userData.email,
            createdDate: new Date(),
            changedDate: new Date(),
            role: 'User',
          }).then(() => {
            setUser(userData)
            sessionStorage.setItem('user', userData.uid)
            setSessionUser(userData)
            //router.replace('/')
          })
        } else {
          setUser(userRef)
          sessionStorage.setItem('user', userRef.uid)
          setSessionUser(userRef)
          router.replace('/')
        }
      })
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
        <div className={landscape ? "col-md-6 h-100 d-none justify-content-center align-items-center d-md-flex" : "d-none"}>
          <LawliveryApp />
        </div>
        <div className={landscape ? "col-md-6" : "d-flex justify-content-center align-items-center w-100"}>
          <div className={styles.regisBlock}>
            <div className={styles.regisTitle}>สร้างบัญชีใหม่</div>
            <div className='d-flex'>
              <div className={styles.qaText}>คุณมีบัญชีอยู่แล้วหรือไม่?</div>
              <Link href='/login'>
                <div className={styles.loginText}>เข้าสู่ระบบ</div>
              </Link>
            </div>
            <div className={styles.createTitle}>สร้างบัญชีด้วยบัญชีโซเชียล</div>
            <div className={styles.createGrp}>
              <div className={styles.createIcon} onClick={() => signUpWithGoogle()}>
                <Image src={IconGoogle} width='50' />
              </div>
              <div className={styles.createIcon}>
                <Image src={IconFacebook} width='50' />
              </div>
              <div className={styles.createIcon}>
                <Image src={IconLine} width='50' />
              </div>
              <div className={styles.createIcon}>
                <Image src={IconApple} width='50' />
              </div>
            </div>
            <Form onSubmit={handleSubmit} >
              <div className={styles.createTitle}>สร้างบัญชีด้วยอีเมล</div>
              <div className={styles.input}>
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
              <div className={styles.input}>
                <input
                  className={styles.inputFirstName}
                  placeholder='ชื่อ'
                  type='text'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
                <div className={styles.logoEmail}><Image src={IconPersonal} /></div>
              </div>
              <div className={styles.inputName}>
                <input
                  className={styles.inputLastName}
                  placeholder='นามสกุล'
                  type='text'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.passQuality}>
                <div>คุณภาพรหัสผ่าน</div>
                <div
                  className={styles.qaBox}
                  onMouseOver={() => setQaRequire(true)}
                  onMouseLeave={() => setQaRequire(false)}
                >
                  <div className={styles.qaT}>?</div>
                </div>
                {qaRequire ?
                  <div>
                    <div className={styles.qaRequireBox}>
                      <div className='row'>
                        <div className='col-1'>
                          <div className={styles.dotRed}></div>
                        </div>
                        <div className='col-11'>
                          <div className={styles.qaRequireText}>
                            <text className={styles.qaRequireText1}>อ่อน</text>
                            <text className={styles.qaRequireText2}> : มีความยาวน้อยกว่า 8 หลัก มีตัวเลข 0-9 หรือตัวอักษรภาษาอังกฤษ อย่างใดอย่างหนึ่ง</text>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-1'>
                          <div className={styles.dotYellow}></div>
                        </div>
                        <div className='col-11'>
                          <div className={styles.qaRequireText}>
                            <text className={styles.qaRequireText1}>ปานกลาง</text>
                            <text className={styles.qaRequireText2}> : มีความยาวมากกว่า 8 หลัก มีตัวเลข 0-9 หรือตัวอักษรภาษาอังกฤษ อย่างใดอย่างหนึ่ง</text>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-1'>
                          <div className={styles.dotGreen}></div>
                        </div>
                        <div className='col-11'>
                          <div className={styles.qaRequireText}>
                            <text className={styles.qaRequireText1}>แข็งแรง</text>
                            <text className={styles.qaRequireText2}> : มีความยาวมากกว่า 8 หลัก มีตัวเลข 0-9 ตัวอักษรภาษาอังกฤษ ทั้งตัวพิมพ์ใหญ่ และตัวพิมพ์เล็ก รวมกัน</text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> :
                  <></>
                }
              </div>
              {pwLevel == 0 ?
                <div className='d-flex'>
                  <div className={styles.qaBar}></div>
                  <div className={styles.qaBar}></div>
                  <div className={styles.qaBar}></div>
                </div>
                :
                <></>
              }
              {pwLevel == 1 ?
                <div className='d-flex'>
                  <div className={styles.qaBar + ' ' + styles.barLow}></div>
                  <div className={styles.qaBar}></div>
                  <div className={styles.qaBar}></div>
                </div>
                :
                <></>
              }
              {pwLevel == 2 ?
                <div className='d-flex'>
                  <div className={styles.qaBar + ' ' + styles.barMd}></div>
                  <div className={styles.qaBar + ' ' + styles.barMd}></div>
                  <div className={styles.qaBar}></div>
                </div>
                :
                <></>
              }
              {pwLevel == 3 ?
                <div className='d-flex'>
                  <div className={styles.qaBar + ' ' + styles.barHg}></div>
                  <div className={styles.qaBar + ' ' + styles.barHg}></div>
                  <div className={styles.qaBar + ' ' + styles.barHg}></div>
                </div>
                :
                <></>
              }
              <div className={styles.input}>
                <input
                  className={styles.inputFirstName}
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className={styles.logoEmail}><Image src={IconLock} /></div>
              </div>
              <div className={styles.inputName}>
                <input
                  className={match ? styles.inputLastName : styles.inputLastName + ' ' + styles.notMatch}
                  placeholder='Confirm Password'
                  type='password'
                  value={cfPassword}
                  onChange={e => setCfPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.policyBlock}>
                <Form.Check
                  className={styles.polCheck}
                  type={'checkbox'}
                  onClick={() => setPolCheck(!polCheck)}
                  defaultChecked={polCheck}
                  required
                />
                <div className='d-flex flex-wrap'>
                  <div className={styles.polText}>ฉันได้อ่านและยอมรับ</div>
                  <div className={styles.polTextLink}>เงื่อนไขการให้บริการ</div>
                  <div className={styles.polText}>และ</div>
                  <div className={styles.polTextLink}>นโยบายความเป็นส่วนตัว</div>
                  <div className={styles.polText}>เรียบร้อยแล้ว</div>
                </div>
              </div>
              <div className='d-flex justify-content-end'>
                <Button
                  className={styles.createAcc}
                  type='submit'
                >
                  {!onload ?
                    <div>สร้างบัญชี</div> :
                    <div class={styles.onload + " spinner-border text-light"} role="status"></div>
                  }
                </Button>
              </div>
              <ToastContainer />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}