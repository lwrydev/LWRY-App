import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import styles from './../account_management.module.css'

//firebase
import { firestore } from "../../../config/firebase"
import { doc, updateDoc } from "firebase/firestore"

//toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCurrentUser } from "../../../utility/user"

export default function ChangePhoneNumberModal({ user, setUser, showModal, setShowModal }) {
  const [phoneNumber, setPhoneNumber] = useState(user.data().phoneNumber ? user.data().phoneNumber : "")

  const saveChange = (e) => {
    e.preventDefault()
    if (phoneNumber.trim()) {
      if (phoneNumber !== user.data().phoneNumber) {
        updateDoc(doc(firestore, 'users', user.id), {
          phoneNumber
        }).then(() => {
          getCurrentUser().then(userRef => {
            setUser(userRef)
            setShowModal(false)
            toast.success("เปลี่ยนเบอร์โทรศัพท์สำเร็จ", {
              position: 'bottom-right'
            })
          })
        })
      } else {
        setShowModal(false)
        toast.success("เปลี่ยนเบอร์โทรศัพท์สำเร็จ", {
          position: 'bottom-right'
        })
      }
    } else {
      updateDoc(doc(firestore, 'users', user.id), {
        phoneNumber: ""
      }).then(() => {
        getCurrentUser().then(userRef => {
          setUser(userRef)
          setShowModal(false)
          toast.success("เปลี่ยนเบอร์โทรศัพท์สำเร็จ", {
            position: 'bottom-right'
          })
        })
      })
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveChange}>
            <div className={styles.titleChangeProfile}>แก้ไขเบอร์โทรศัพท์</div>
            <div className={styles.descChangeProfile}>ใช้เบอร์โทรศัพท์ของคุณในการรับการแจ้งเตือน ข่าวสาร หรือการเข้าสู่ ระบบ multi factor authentication</div>
            <div className={styles.currentChangeProfile}>เบอร์โทรศัพท์ที่กำลังใช้งาน : {user.data().phoneNumber ? user.data().phoneNumber : "-"}</div>
            <div className={styles.inputBox}>
              <FloatingLabel controlId="floatingTextarea1" label="เบอร์โทรศัพท์ที่ต้องการใช้งาน" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                <Form.Control
                  as={'input'}
                  placeholder="Leave a comment here"
                  style={{ height: '46px' }}
                  className={styles.input}
                  maxLength={50}
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div
                className={styles.backwordBtn}
                onClick={() => {
                  setShowModal(false)
                  setPhoneNumber(user.data().phoneNumber)
                }}
              >
                ยกเลิก
              </div>
              <Button
                className={styles.btn}
                onClick={saveChange}
              >
                <div>บันทึก</div>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}