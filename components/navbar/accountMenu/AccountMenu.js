import styles from '../navbar.module.css'

import '../../../config/firebase'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

export default function AccountMenu({ setShowAccount, user }) {

  return (
    <div
      className={styles.accountBox}
      onMouseLeave={() => setShowAccount(false)}
    >
      <div className='d-flex align-items-center flex-column '>
        <div className={styles.profileImg2}>{user ? user.displayName[0] + user.displayName.slice(-1) : ''}</div>
        <div className={styles.nameProfile}>{user.displayName}</div>
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
          onClick={() => signOut(auth)}
        >
          ออกจากระบบ
        </div>
      </div>
    </div>
  )
}