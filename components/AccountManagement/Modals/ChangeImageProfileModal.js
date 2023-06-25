import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import styles from './../account_management.module.css'

//firebase
import { firestore } from "../../../config/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { getAuth, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

//toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//icon
import IconUpload from '../../../assets/logo/upload.svg'
import IconTrash from '../../../assets/logo/trash.svg'

const auth = getAuth()
const storage = getStorage()

export default function ChangeImageProfileModal({ user, setUser, showModal, setShowModal }) {
  const [photoURL, setPhotoURL] = useState("")
  const refImage = useRef()

  useEffect(() => {
    setPhotoURL(auth.currentUser.photoURL)
  }, [])

  const onUploadImage = () => {
    refImage.current.click()
  }

  const uploadImage = async (e) => {
    if (e.target.files) {
      let fileName = new Date().getTime().toString() + e.target.files[0].name
      const storageRef = ref(storage, '/' + user.id + '/' + fileName)
      await uploadBytes(storageRef, e.target.files[0]).then(res => {
        getDownloadURL(ref(storage, '/' + user.id + '/' + fileName,)).then(url => {
          updateProfile(auth.currentUser, {
            photoURL: url
          }).then(() => {
            setPhotoURL(url)
          })
        })
      })
      // const pathReference = ref(storage, '/' + user.id + '/' + fileName)
      // await getDownloadURL(pathReference).then(url => {
      //   console.log(url);
      //   refImage.current.src = url
      //   setPhotoURL(url)
      // })
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
          <div className={styles.titleChangeProfile}>รูปโปรไฟล์</div>
          <div className={styles.descChangeProfile}>รูปภาพช่วยให้ผู้อื่นจดจำคุณได้และช่วยให้คุณทราบว่ากำลังลงชื่อเข้าใช้ บัญชีของตนเองอยู่</div>
          <div className='d-flex justify-content-center'>
            {/* {photoURL ?
              <div className={styles.changePic}></div>
              : */}
            <img className={styles.changePic} src={photoURL} width={140} height={140} />
            {/* } */}
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.setDefaultPic}>ใช้ภาพเริ่มต้นของระบบ</div>
          </div>
          <div className={styles.grpBtn}>
            <div className='col-7'>
              <input
                ref={refImage}
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                onChange={e => uploadImage(e)}
              />
              <div
                className={styles.btnUploadPic}
                onClick={() => onUploadImage()}
              >
                <Image src={IconUpload} width={24} />
                <div>อัปโหลดรูปภาพโปรไฟล์ใหม่</div>
              </div>
            </div>
            <div className='col-5'>
              <div className={styles.btnUploadPic}>
                <Image src={IconTrash} width={24} />
                <div>นำออก</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}