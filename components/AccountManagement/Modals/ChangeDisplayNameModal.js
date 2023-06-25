import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import styles from './../account_management.module.css'

//firebase
import { firestore } from "../../../config/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { getAuth, updateProfile } from "firebase/auth"

//toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCurrentUser } from "../../../utility/user"

const auth = getAuth()

export default function ChangeDisplayNameModal({ user, setUser, showModal, setShowModal }) {
  const [displayName, setDisplayName] = useState(user.data().displayName ? user.data().displayName : "")

  const saveChange = (e) => {
    e.preventDefault()
    if (displayName.trim()) {
      if (displayName !== user.data().displayName) {
        updateProfile(auth.currentUser, {
          displayName
        }).then(() => {
          updateDoc(doc(firestore, 'users', user.id), {
            displayName
          }).then(() => {
            getCurrentUser().then(userRef => {
              setUser(userRef)
              setShowModal(false)
              toast.success("เปลี่ยนชื่อ Display สำเร็จ", {
                position: 'bottom-right'
              })
            })
          })
        })
      } else {
        setShowModal(false)
        toast.success("เปลี่ยนชื่อ Display สำเร็จ", {
          position: 'bottom-right'
        })
      }
    } else {
      toast.error("กรุณากรอกข้อมูลให้ครบ", {
        position: 'bottom-right'
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
            <div className={styles.titleChangeProfile}>ชื่อ Display</div>
            <div className={styles.descChangeProfile}>ชื่อ display ช่วยให้ผู้อื่นจดจำคุณได้ง่าย และช่วยให้คุณทราบว่ากำลัง ลงชื่อเข้าใช้บัญชีของตนเองอยู่</div>
            <div className={styles.currentChangeProfile}>ชื่อ display ปัจจุบัน : {user.data().displayName ? user.data().displayName : "-"}</div>
            <div className={styles.inputBox}>
              <FloatingLabel controlId="floatingTextarea1" label="ชื่อ display" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                <Form.Control
                  as={'input'}
                  placeholder="Leave a comment here"
                  style={{ height: '46px' }}
                  className={styles.input}
                  maxLength={50}
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  isInvalid={!displayName}
                />
              </FloatingLabel>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div
                className={styles.backwordBtn}
                onClick={() => {
                  setShowModal(false)
                  setDisplayName(user.data().displayName)
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