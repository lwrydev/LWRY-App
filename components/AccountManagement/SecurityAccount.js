
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import styles from './account_management.module.css'

import '../../config/firebase'
import { Button, Form } from 'react-bootstrap'

const auth = getAuth()

export default function SecurityAccount({ user, setUser }) {
  const [userRef, setUserRef] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      if (userData) {
        console.log(userData);
        setUserRef(userData)
      }
    })
  }, [user])

  useEffect(() => {
    if (userRef)
      setLoading(false)
  }, [userRef])

  return (
    <div>
      {!loading ?
        <>
          <div className={styles.informationBox}>
            <div className={styles.titleMenu}>การเข้าสู่ระบบด้วยบัญชี Social</div>
            <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
            <div className={styles.AccountInformationBox}>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>Google</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{userRef.email}</div>
                  </div>
                  <div className='col-4 d-flex row align-items-center'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>ลบ</div>
                      </div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>แก้ไข</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>Facebook</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().facebook ? user.data().facebook : 'ไม่ได้เชื่อมต่อ'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().facebook ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>Line</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().line ? user.data().line : 'ไม่ได้เชื่อมต่อ'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().line ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>Apple</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().apple ? user.data().apple : 'ไม่ได้เชื่อมต่อ'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().apple ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.informationBox}>
            <div className={styles.titleMenu}>การจัดการรหัสผ่าน</div>
            <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
            <div className={styles.AccountInformationBox}>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>รหัสผ่าน</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().address ? user.data().address : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>แก้ไข</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.noted}>* คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ คำถามของท่านจะถูกส่งไปยัง</div>
          </div>
          <div className={styles.informationBox}>
            <div className={styles.titleMenu}>การเข้าสู่ระบบแบบ 2 Factor-Authentication</div>
            <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
            <div className={styles.AccountInformationBox}>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>การเปิดใช้งาน 2FA</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().twoFA ? '' : 'ไม่ได้ใช้งาน'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>
                          <Form.Check
                            type="switch"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>วันเกิด</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().birthday ? user.data().birthday : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().birthday ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>เพศ</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().gender ? user.data().gender : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().gender ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>ที่อยู่</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().address ? user.data().address : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().address ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.noted}>* คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ คำถามของท่านจะถูกส่งไปยัง</div>
          </div>
          <div className={styles.informationBox}>
            <div className={styles.titleMenu}>Session ที่มีการเข้าระบบ</div>
            <div className='row'>
              <div className='col-7'>
                <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน</div>
              </div>
              <div className='col-5'>
                <Button className={styles.removeSession}>นำ sesson จากอุปกรณ์อื่นออกทั้งหมด</Button>
              </div>
            </div>
          </div>
        </> :
        <></>
      }
    </div>
  )
}