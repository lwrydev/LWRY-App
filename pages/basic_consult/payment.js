import styles from './basicConsult.module.css'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'
import Payments from '../../components/Payments/Payments'


export default function Payment({ user }) {

  return (
    <div className={styles.content}>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div className='row'>
            <div className='d-flex align-items-center justify-content-center'>
              <div className={styles.progressBoxActive}>
                <Image src={IconBook} />
                <div className={styles.progressTxtActive}>ข้อตกลงการใช้บริการ</div>
              </div>
              <div className={styles.progressLineActive}></div>
              <div className={styles.progressBoxActive}>
                <Image src={IconEdit} />
                <div className={styles.progressTxtActive}>กรอกข้อมูลเพื่อรับคำแนะนำเบื้องต้น</div>
              </div>
              <div className={styles.progressLineActive}></div>
              <div className={styles.progressBoxActive}>
                <Image src={IconMoneyCheck} />
                <div className={styles.progressTxtActive}>ชำระค่าบริการ</div>
              </div>
              <div className={styles.progressLineInActive}></div>
              <div className={styles.progressBoxInActive}>
                <Image src={IconCorrect} />
                <div className={styles.progressTxtInActive}>เสร็จสิ้น</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      <Payments user={user} />
    </div>
  )
}