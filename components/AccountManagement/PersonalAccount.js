
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import styles from './account_management.module.css'

import '../../config/firebase'

//icon
import ChangeProfileName from './Modals/ChangeProfileNameModal'
import ChangeDisplayNameModal from './Modals/ChangeDisplayNameModal'
import ChangeBackupEmailModal from './Modals/ChangeBackupEmailModal'
import ChangePhoneNumberModal from './Modals/ChangePhoneNumberModal'
import ChangeImageProfileModal from './Modals/ChangeImageProfileModal'

const auth = getAuth()

export default function PersonalAccount({ user, setUser }) {
  const [userRef, setUserRef] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pf, setPf] = useState("")

  //edit modals
  const [editName, setEditName] = useState(false)
  const [editDisplayName, setEditDisplayName] = useState(false)
  const [editBackupEmail, setEditBackupEmail] = useState(false)
  const [editPhoneNumber, setEditPhoneNumber] = useState(false)
  const [editImageProfile, setEditImageProfile] = useState(false)

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
                    {/* <div className={styles.profilePic}>{pf}</div> */}
                    <img className={styles.profilePic} src={userRef.photoURL} width={60} height={60} />
                  </div>
                  <div className='col-4 d-flex row align-items-center'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className={styles.titleEdit}>ลบ</div>
                      </div>
                      <div className='col-6'>
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditImageProfile(true)}
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
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditBackupEmail(true)}
                        >
                          {user.data().backupEmail ? 'แก้ไข' : 'เพิ่มข้อมูล'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={styles.titleSubInformation}>เบอร์โทรศัพท์</div>
                  </div>
                  <div className='col-4'>
                    <div className={styles.valueInformation}>{user.data().phoneNumber ? user.data().phoneNumber : '-'}</div>
                  </div>
                  <div className='col-4'>
                    <div className='row'>
                      <div className='col-6'></div>
                      <div className='col-6'>
                        <div
                          className={styles.titleEdit}
                          onClick={() => setEditPhoneNumber(true)}
                        >
                          {user.data().phoneNumber ? 'แก้ไข' : 'เพิ่มข้อมูล'}
                        </div>
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
      <ChangeImageProfileModal user={user} setUser={setUser} showModal={editImageProfile} setShowModal={setEditImageProfile} />
      <ChangeProfileName user={user} setUser={setUser} showModal={editName} setShowModal={setEditName} />
      <ChangeDisplayNameModal user={user} setUser={setUser} showModal={editDisplayName} setShowModal={setEditDisplayName} />
      <ChangeBackupEmailModal user={user} setUser={setUser} showModal={editBackupEmail} setShowModal={setEditBackupEmail} />
      <ChangePhoneNumberModal user={user} setUser={setUser} showModal={editPhoneNumber} setShowModal={setEditPhoneNumber} />
    </div>
  )
}