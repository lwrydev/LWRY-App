import styles from '../navbar.module.css'

import '../../../config/firebase'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

export default function AccountMenu({ setShowAccount, user, setUser }) {

  const logOut = () => {
    signOut(auth)
    setUser(null)
  }

  return (
    <div
      className={styles.accountBox}
      onMouseLeave={() => setShowAccount(false)}
    >
      <div className='d-flex align-items-center flex-column '>
        <div className={styles.profileImg2}>{user ? user.data().displayName.split(' ')[0][0] + (user.data().displayName.split(' ').length > 0 ? user.data().displayName.split(' ')[1][0] : '') : ''}</div>
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