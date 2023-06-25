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

export default function ChangeBackupEmailModal({ user, setUser, showModal, setShowModal }) {
  const [backupEmail, setBackupEmail] = useState(user.data().backupEmail ? user.data().backupEmail : "")

  const saveChange = (e) => {
    e.preventDefault()
    if (backupEmail.trim()) {
      if (backupEmail !== user.data().backupEmail) {
        updateDoc(doc(firestore, 'users', user.id), {
          backupEmail
        }).then(() => {
          getCurrentUser().then(userRef => {
            setUser(userRef)
            setShowModal(false)
            toast.success("เปลี่ยนemail สำรองสำเร็จ", {
              position: 'bottom-right'
            })
          })
        })
      } else {
        setShowModal(false)
        toast.success("เปลี่ยนemail สำรองสำเร็จ", {
          position: 'bottom-right'
        })
      }
    } else {
      updateDoc(doc(firestore, 'users', user.id), {
        backupEmail: ""
      }).then(() => {
        getCurrentUser().then(userRef => {
          setUser(userRef)
          setShowModal(false)
          toast.success("เปลี่ยนemail สำรองสำเร็จ", {
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
            <div className={styles.titleChangeProfile}>email สำรอง</div>
            <div className={styles.descChangeProfile}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการ ปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูล</div>
            <div className={styles.currentChangeProfile}>email สำรองปัจจุบัน : {user.data().backupEmail ? user.data().backupEmail : "-"}</div>
            <div className={styles.inputBox}>
              <FloatingLabel controlId="floatingTextarea1" label="email สำรอง" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                <Form.Control
                  as={'input'}
                  placeholder="Leave a comment here"
                  style={{ height: '46px' }}
                  className={styles.input}
                  maxLength={50}
                  value={backupEmail}
                  onChange={e => setBackupEmail(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div
                className={styles.backwordBtn}
                onClick={() => {
                  setShowModal(false)
                  setBackupEmail(user.data().backupEmail)
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