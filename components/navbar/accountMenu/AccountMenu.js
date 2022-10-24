import styles from '../navbar.module.css'

import '../../../config/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useRouter } from "next/router"

const auth = getAuth()

export default function AccountMenu({ setShowAccount, user, setUser }) {
  const [pf, setPf] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (user.data().displayName.split(" ").length > 1) {
        setPf(user.data().displayName.split(" ")[0][0] + user.data().displayName.split(" ")[1][0])
      } else {
        setPf(user.data().displayName.split(" ")[0][0])
      }
    }
  }, [user])

  const logOut = () => {
    signOut(auth).then(() => {
      
    })
    setUser(null)
  }

  return (
    <div
      className={styles.accountBox}
      onMouseLeave={() => setShowAccount(false)}
    >
      <div className='d-flex align-items-center flex-column '>
        <div className={styles.profileImg2}>{pf}</div>
        <div className={styles.nameProfile}>{user.data().displayName}</div>
      </div>
      <div>
        <div
          className={styles.accountListMenu}
        >
          จัดการบัญชี
        </div>
        <div
          className={styles.accountListMenu}
        >
          ประวัติการชำระเงิน
        </div>
        <div
          className={styles.accountListMenu}
          onClick={() => logOut()}
        >
          ออกจากระบบ
        </div>
      </div>
    </div>
  )
}