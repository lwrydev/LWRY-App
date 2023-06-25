import { useState } from 'react'
import styles from './pricing_payment.module.css'
import Image from 'next/image'

//Component
import PricingDetails from '../../components/PricingAndPayment/PricingDetails'
import PaymentHistory from '../../components/PricingAndPayment/PaymentHistory'
import PrivacyAccount from '../../components/AccountManagement/PrivacyAccount'

//Icon
import IconCashInfo from '../../assets/logo/cash_info.svg'
import IconCashInfoInactive from '../../assets/logo/cash_info_inactive.svg'
import IconCashHistory from '../../assets/logo/cash_history.svg'
import IconCashHistoryInactive from '../../assets/logo/cash_history_inactive.svg'
import IconCashDiscount from '../../assets/logo/cash_discount.svg'
import IconCashDiscountInactive from '../../assets/logo/cash_discount_inactive.svg'
import IconCashCoin from '../../assets/logo/cash_coin.svg'
import IconCashCoinInactive from '../../assets/logo/cash_coin_inactive.svg'
import IconCashCard from '../../assets/logo/cash_card.svg'
import IconCashCardInactive from '../../assets/logo/cash_card_inactive.svg'

export default function PricingAndPayment({ user, setUser }) {
  const [selectedMenu, setSelectedMenu] = useState("Menu1")

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
                  <Image src={selectedMenu == "Menu1" ? IconCashInfo : IconCashInfoInactive} width={25} color="#15355F" />
                  <div>รายละเอียดและราคา</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu2" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu2")}
              >
                <div
                  className={selectedMenu == "Menu2" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu2" ? IconCashHistory : IconCashHistoryInactive} width={25} color="#15355F" />
                  <div>ประวัติการชำระเงิน</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu3" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu3")}
              >
                <div
                  className={selectedMenu == "Menu3" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu3" ? IconCashDiscount : IconCashDiscountInactive} width={25} color="#15355F" />
                  <div>ส่วนลด</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu4" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu4")}
              >
                <div
                  className={selectedMenu == "Menu4" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu4" ? IconCashCoin : IconCashCoinInactive} width={25} color="#15355F" />
                  <div>coin</div>
                </div>
              </div>
              <div
                className={selectedMenu == "Menu5" ? styles.menuActive : styles.menuInactive}
                onClick={() => setSelectedMenu("Menu5")}
              >
                <div
                  className={selectedMenu == "Menu5" ? styles.menuLabelActive : styles.menuLabelInactive}
                >
                  <Image src={selectedMenu == "Menu5" ? IconCashCard : IconCashCardInactive} width={25} color="#15355F" />
                  <div>ช่องทางการชำระเงิน</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className={styles.informationBox}>
              {selectedMenu == "Menu1" ?
                <PricingDetails /> :
                <></>
              }
              {selectedMenu == "Menu2" ?
                <PaymentHistory user={user} /> :
                <></>
              }
              {selectedMenu == "Menu3" ?
                <PrivacyAccount user={user} setUser={setUser} /> :
                <></>
              }
              {selectedMenu == "Menu4" ?
                <PrivacyAccount user={user} setUser={setUser} /> :
                <></>
              }
              {selectedMenu == "Menu5" ?
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