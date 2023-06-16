
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import styles from './account_management.module.css'
import Image from 'next/image'

import '../../config/firebase'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'

//icon
import IconUpload from '../../assets/logo/upload.svg'
import ChangeProfileName from './Modals/ChangeProfileNameModal'
import ChangeDisplayNameModal from './Modals/ChangeDisplayNameModal'

const auth = getAuth()

export default function PersonalAccount({ user, setUser }) {
  const [userRef, setUserRef] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pf, setPf] = useState("")

  //edit pic
  const [editPic, setEditPic] = useState(false)

  //edit modals
  const [editName, setEditName] = useState(false)
  const [editDisplayName, setEditDisplayName] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      if (userData) {
        setUserRef(userData)
      }
    })
    if (user) {
      if (user.data().displayName.split(" ").length > 1) {
        setPf(user.data().displayName.split(" ")[0][0] + user.data().displayName.split(" ")[1][0])
      } else {
        setPf(user.data().displayName.split(" ")[0][0])
      }
      // setFirstname(user.data().firstname)
      // setLastname(user.data().lastname)
    }
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
            <div className={styles.titleMenu}>ข้อมูลการแสดงผลบัญชี</div>
            <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
            <div className={styles.AccountInformationBox}>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4 d-flex align-items-center'>
                    <div className={styles.titleSubInformation}>รูปโปรไฟล์</div>
                  </div>
                  <div className='col-4 d-flex align-items-center'>
                    <div className={styles.profilePic}>{pf}</div>
                  </div>
                  <div className='col-4 d-flex row align-items-center'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>ลบ</div>
                      </div>
                      <div className='col-6'>
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditPic(true)}
                        >
                          แก้ไข
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>ชื่อและนามสกุล</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data()?.firstname + ' ' + user.data()?.lastname}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditName(true)}
                        >
                          แก้ไข
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.lastItemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>ชื่อ Display</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().displayName}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditDisplayName(true)}
                        >
                          {user.data().displayName ? 'แก้ไข' : 'เพิ่มข้อมูล'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.informationBox}>
            <div className={styles.titleMenu}>ข้อมูลบัญชีและข้อมูลส่วนตัว</div>
            <div className={styles.detailsMenu}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
            <div className={styles.AccountInformationBox}>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>ชื่อบัญชี</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().displayName}</div>
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
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>อีเมล</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{userRef.email}</div>
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
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>อีเมลสำรอง</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().backupEmail ? user.data().backupEmail : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>{user.data().backupEmail ? 'แก้ไข' : 'เพิ่มข้อมูล'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemBox}>
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
              <div className={styles.itemBox}>
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
        </> :
        <></>
      }
      <Modal
        show={editPic}
        onHide={() => setEditPic(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.titleChangeProfile}>รูปโปรไฟล์</div>
          <div className={styles.descChangeProfile}>รูปภาพช่วยให้ผู้อื่นจดจำคุณได้และช่วยให้คุณทราบว่ากำลังลงชื่อเข้าใช้ บัญชีของตนเองอยู่</div>
          <div className='d-flex justify-content-center'>
            <div className={styles.changePic}></div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.setDefaultPic}>ใช้ภาพเริ่มต้นของระบบ</div>
          </div>
          <div className={styles.grpBtn}>
            <div className='col-7'>
              <div className={styles.btnUploadPic}>
                <Image src={IconUpload} width={24} />
                <div>อัปโหลดรูปภาพโปรไฟล์ใหม่</div>
              </div>
            </div>
            <div className='col-5'>
              <div className={styles.btnUploadPic}>
                <Image src={IconUpload} width={24} />
                <div>นำออก</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ChangeProfileName user={user} setUser={setUser} showModal={editName} setShowModal={setEditName} />
      <ChangeDisplayNameModal user={user} setUser={setUser} showModal={editDisplayName} setShowModal={setEditDisplayName} />
    </div>
  )
}