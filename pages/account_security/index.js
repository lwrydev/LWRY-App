

import { useState } from 'react'
import styles from './account_security.module.css'

//Component
import PersonalAccount from '../../components/AccountManagement/PersonalAccount'
import SecurityAccount from '../../components/AccountManagement/SecurityAccount'
import PrivacyAccount from '../../components/AccountManagement/PrivacyAccount'

export default function AccountAndSecurity({ user, setUser }) {
  const [selectedMenu, setSelectedMenu] = useState("Menu1")

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-3">
          <div className={styles.accountMenuBox}>
            <div
              className={selectedMenu == "Menu1" ? styles.accountMenuActive : styles.accountMenuInactive}
              onClick={() => setSelectedMenu("Menu1")}
            >
              <div className={selectedMenu == "Menu1" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}>บัญชีและข้อมูลส่วนตัว</div>
            </div>
            <div
              className={selectedMenu == "Menu2" ? styles.accountMenuActive : styles.accountMenuInactive}
              onClick={() => setSelectedMenu("Menu2")}
            >
              <div className={selectedMenu == "Menu2" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}>การเข้าระบบและความปลอดภัย</div>
            </div>
            <div
              className={selectedMenu == "Menu3" ? styles.accountMenuActive : styles.accountMenuInactive}
              onClick={() => setSelectedMenu("Menu3")}
            >
              <div className={selectedMenu == "Menu3" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}>นโยบายและความเป็นส่วนตัว</div>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className={styles.informationBox}>
            {selectedMenu == "Menu1" ?
              <PersonalAccount user={user} setUser={setUser} /> :
              <></>
            }
            {selectedMenu == "Menu2" ?
              <SecurityAccount user={user} setUser={setUser} /> :
              <></>
            }
            {selectedMenu == "Menu3" ?
              <PrivacyAccount user={user} setUser={setUser} /> :
              <></>
            }
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}