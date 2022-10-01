import styles from './resetPassword.module.css'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

//icon
import IconLock from '../../assets/logo/lock.svg'

import { Form, Button } from 'react-bootstrap'

import { firestore } from '../../config/firebase'
import { getAuth, updatePassword } from 'firebase/auth'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const auth = getAuth()

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [code4, setCode4] = useState('')
  const [code5, setCode5] = useState('')
  const [code6, setCode6] = useState('')
  const [match, setMatch] = useState(1)
  const [resetPWblock, setResetPWblock] = useState(false)
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [pwLevel, setPwLevel] = useState(0)
  const [qaRequire, setQaRequire] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email)
    } else {
      router.replace('/login')
    }
  }, [])

  useEffect(() => {
    if (code1 != '')
      document.getElementById('code2').focus()
  }, [code1])

  useEffect(() => {
    if (code2 != '')
      document.getElementById('code3').focus()
  }, [code2])

  useEffect(() => {
    if (code3 != '')
      document.getElementById('code4').focus()
  }, [code3])

  useEffect(() => {
    if (code4 != '')
      document.getElementById('code5').focus()
  }, [code4])

  useEffect(() => {
    if (code5 != '')
      document.getElementById('code6').focus()
  }, [code5])

  useEffect(() => {
    if (code6) {
      fetch('/api/registration/checkcode', {
        body: JSON.stringify({
          email: email,
          code: code1 + code2 + code3 + code4 + code5 + code6
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(res => {
        res.json().then(valid => {
          if (valid) {
            setMatch(2)
            setTimeout(() => {
              setResetPWblock(true)
            }, 1000);
          } else {
            setMatch(3)
          }
        })
      })
    } else {
      setMatch(1)
    }
  }, [code6])

  const onClearCode2 = (e) => {
    if (e.keyCode == 8) {
      setCode1('')
      document.getElementById('code1').focus()
    }
  }

  const onClearCode3 = (e) => {
    if (e.keyCode == 8) {
      setCode2('')
      document.getElementById('code2').focus()
    }
  }

  const onClearCode4 = (e) => {
    if (e.keyCode == 8) {
      setCode3('')
      document.getElementById('code3').focus()
    }
  }

  const onClearCode5 = (e) => {
    if (e.keyCode == 8) {
      setCode4('')
      document.getElementById('code4').focus()
    }
  }


  const onClearCode6 = (e) => {
    if (e.keyCode == 8 && code6 == '') {
      setCode5('')
      document.getElementById('code5').focus()
    }
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password == cfPassword) {
      updatePassword(auth.currentUser, password).then(() => {
        // Update successful.
      })
    } else {
      toast.error("รหัสผ่านไม่ตรงกัน", {
        position: 'bottom-right'
      })
    }
  }

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.resetPassBlock}>
          {!resetPWblock ?
            <div>
              <div className={styles.resetPassTitle}>ตั้งรหัสผ่านใหม่ของคุณ</div>
              <div className={styles.resetPassDetail}>กรอก code ที่เราได้ส่งให้ในอีเมล</div>
              <div className={styles.resetPassEmail}>{email}</div>
              <div>
                <input
                  id='code1'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code1}
                  onChange={e => setCode1(e.target.value)}
                />
                <input
                  id='code2'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code2}
                  onKeyUp={e => onClearCode2(e)}
                  onChange={e => setCode2(e.target.value)}
                />
                <input
                  id='code3'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code3}
                  onKeyUp={e => onClearCode3(e)}
                  onChange={e => setCode3(e.target.value)}
                />
                <input
                  id='code4'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code4}
                  onKeyUp={e => onClearCode4(e)}
                  onChange={e => setCode4(e.target.value)}
                />
                <input
                  id='code5'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code5}
                  onKeyUp={e => onClearCode5(e)}
                  onChange={e => setCode5(e.target.value)}
                />
                <input
                  id='code6'
                  className={match == 1 ? styles.inputCode : match == 2 ? styles.inputCodeCorrect : styles.inputCodeIncorrect}
                  type='tel'
                  value={code6}
                  onKeyUp={e => onClearCode6(e)}
                  onChange={e => setCode6(e.target.value.length > 1 ? e.target.value[1] : e.target.value)}
                />
              </div>
              <div className={styles.btnGrp}>
                <div className={styles.btn}>ย้อนกลับ</div>
                <div className={styles.btn}>ส่ง code ใหม่</div>
              </div>
            </div> :
            <div>
              <Form onSubmit={handleSubmit} >
                <div className={styles.resetPassTitle}>ตั้งรหัสผ่านใหม่ของคุณ</div>
                <div className={styles.resetPassDetail}>ตั้งรหัสผ่านใหม่ของคุณ พยายามให้คุณภาพรหัสผ่านของคุณเป็นสีเขียว</div>
                <div className={styles.resetPassDetail}></div>
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
                              <div className={styles.qaRequireText2}><label className={styles.qaRequireText1}>อ่อน</label> : มีความยาวน้อยกว่า 8 หลัก มีตัวเลข 0-9 หรือตัวอักษรภาษาอังกฤษ อย่างใดอย่างหนึ่ง</div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-1'>
                            <div className={styles.dotYellow}></div>
                          </div>
                          <div className='col-11'>
                            <div className={styles.qaRequireText}>
                              <div className={styles.qaRequireText2}><label className={styles.qaRequireText1}>ปานกลาง</label> : มีความยาวมากกว่า 8 หลัก มีตัวเลข 0-9 หรือตัวอักษรภาษาอังกฤษ อย่างใดอย่างหนึ่ง</div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-1'>
                            <div className={styles.dotGreen}></div>
                          </div>
                          <div className='col-11'>
                            <div className={styles.qaRequireText}>
                              <div className={styles.qaRequireText2}><label className={styles.qaRequireText1}>แข็งแรง</label> : มีความยาวมากกว่า 8 หลัก มีตัวเลข 0-9 ตัวอักษรภาษาอังกฤษ ทั้งตัวพิมพ์ใหญ่ และตัวพิมพ์เล็ก รวมกัน</div>
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
                <div className='d-flex justify-content-end'>
                  <Button
                    className={styles.btnSubmit}
                    type='submit'
                  >
                    <div>ตั้งรหัสผ่านใหม่</div> :
                  </Button>
                </div>
                <ToastContainer />
              </Form>
            </div>
          }
        </div>
      </div>
    </div>
  )
}