import styles from '../navbar.module.css'

import '../../../config/firebase'
import { getAuth, signOut } from 'firebase/auth'

import { useRouter } from "next/router"

const auth = getAuth()

export default function AccountMenu({ setShowAccount, setSelectMenu,  user, setUser }) {

  const router = useRouter()

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
        <img className={styles.profileImg2} src={auth.currentUser.photoURL} width={40} height={40} />
        <div className={styles.nameProfile}>{user.data().displayName}</div>
      </div>
      <div>
        <div
          className={styles.accountListMenu}
          onClick={() => {
            router.push("/account_security")
            setSelectMenu('menu2')
            setShowAccount(false)
          }}
        >
          จัดการบัญชี
        </div>
        <div
          className={styles.accountListMenu}
        >
          ประวัติการชำระเงิน
        </div>
        <div
          className={styles.logoutText}
          onClick={() => logOut()}
        >
          ออกจากระบบ
        </div>
      </div>
    </div>
  )
}