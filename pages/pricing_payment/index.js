import { useState } from 'react'
import styles from './pricing_payment.module.css'
import Image from 'next/image'

//Icon
import IconCashInfo from '../../assets/logo/cash_info.svg'
import IconCashInfoInactive from '../../assets/logo/cash_info_inactive.svg'

export default function PricingAndPayment({ user }) {
  return (
    <div className={styles.container}>
      {user ?
        <div className="row">
          <div className="col-1"></div>
          <div className="col-3">
            <div className={styles.menuBox}>
              <div
                className={selectedMenu == "Menu1" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu1")}
              >
                <div
                  className={selectedMenu == "Menu1" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu1" ? IconAccountCircle : IconAccountCircleInactive} width={25} color="#15355F" />
                  <div>บัญชีและข้อมูลส่วนตัว</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu2" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu2")}
              >
                <div
                  className={selectedMenu == "Menu2" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu2" ? IconUserShield : IconUserShieldInactive} width={25} color="#15355F" />
                  <div>การเข้าระบบและความปลอดภัย</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu3" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu3")}
              >
                <div
                  className={selectedMenu == "Menu3" ? styles.menuLabelActive : styles.menuLabelInactive}
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