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

export default function ChangeProfileNameModal({ user, setUser, showModal, setShowModal }) {
  const [firstname, setFirstname] = useState(user.data().firstname ? user.data().firstname : "")
  const [lastname, setLastname] = useState(user.data().lastname ? user.data().lastname : "")

  const saveChange = (e) => {
    e.preventDefault()
    if (firstname.trim() && lastname.trim()) {
      if (firstname !== user.data().firstname || lastname !== user.data().lastname) {
        updateDoc(doc(firestore, 'users', user.id), {
          firstname,
          lastname
        }).then(() => {
          getCurrentUser().then(userRef => {
            setUser(userRef)
            setShowModal(false)
            toast.success("เปลี่ยนชื่อและนามสกุลสำเร็จ", {
              position: 'bottom-right'
            })
          })
        })
      } else {
        setShowModal(false)
        toast.success("เปลี่ยนชื่อและนามสกุลสำเร็จ", {
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
            <div className={styles.titleChangeProfile}>ชื่อและนามสกุล</div>
            <div className={styles.descChangeProfile}>ชื่อและนามสกุลช่วยให้ผู้อื่นจดจำคุณได้และช่วยให้คุณทราบว่ากำลัง ลงชื่อเข้าใช้บัญชีของตนเองอยู่</div>
            <div className={styles.inputBox}>
              <FloatingLabel controlId="floatingTextarea2" label="ชื่อ" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                <Form.Control
                  as={'input'}
                  placeholder="Leave a comment here"
                  style={{ height: '46px' }}
                  className={styles.input}
                  maxLength={50}
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  isInvalid={!firstname}
                />
              </FloatingLabel>
            </div>
            <div className={styles.inputBox}>
              <FloatingLabel controlId="floatingTextarea2" label="นามสกุล" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                <Form.Control
                  as={'input'}
                  placeholder="Leave a comment here"
                  style={{ height: '46px' }}
                  className={styles.input}
                  maxLength={50}
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  isInvalid={!lastname}
                />
              </FloatingLabel>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div
                className={styles.backwordBtn}
                onClick={() => {
                  setShowModal(false)
                  setFirstname(user.data().firstname)
                  setLastname(user.data().lastname)
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