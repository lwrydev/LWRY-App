import { useState } from 'react'
import styles from './account_security.module.css'
import Image from 'next/image'

//Component
import PersonalAccount from '../../components/AccountManagement/PersonalAccount'
import SecurityAccount from '../../components/AccountManagement/SecurityAccount'
import PrivacyAccount from '../../components/AccountManagement/PrivacyAccount'

//Icon
import IconAccountCircle from '../../assets/logo/account_circle.svg'
import IconAccountCircleInactive from '../../assets/logo/account_circle_inactive.svg'
import IconUserShield from '../../assets/logo/user_shield.svg'
import IconUserShieldInactive from '../../assets/logo/user_shield_inactive.svg'
import IconSub20 from '../../assets/logo/subtraction20.svg'
import IconSub20Inactive from '../../assets/logo/subtraction20_inactive.svg'

export default function AccountAndSecurity({ user, setUser }) {
  const [selectedMenu, setSelectedMenu] = useState("Menu1")

  return (
    <div className={styles.container}>
      {user ?
        <div className="row">
          <div className="col-1"></div>
          <div className="col-3">
            <div className={styles.accountMenuBox}>
              <div
                className={selectedMenu == "Menu1" ? styles.accountMenuActive : styles.accountMenuInactive}
                onClick={() => setSelectedMenu("Menu1")}
              >
                <div
                  className={selectedMenu == "Menu1" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu1" ? IconAccountCircle : IconAccountCircleInactive} width={25} color="#15355F" />
                  <div>บัญชีและข้อมูลส่วนตัว</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu2" ? styles.accountMenuActive : styles.accountMenuInactive}
                onClick={() => setSelectedMenu("Menu2")}
              >
                <div
                  className={selectedMenu == "Menu2" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu2" ? IconUserShield : IconUserShieldInactive} width={25} color="#15355F" />
                  <div>การเข้าระบบและความปลอดภัย</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu3" ? styles.accountMenuActive : styles.accountMenuInactive}
                onClick={() => setSelectedMenu("Menu3")}
              >
                <div
                  className={selectedMenu == "Menu3" ? styles.accountMenuLabelActive : styles.accountMenuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu3" ? IconSub20 : IconSub20Inactive} width={25} color="#15355F" />
                  <div>นโยบายและความเป็นส่วนตัว</div>
                </div>
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
        </div> :
        <></>
      }
    </div>
  )
}