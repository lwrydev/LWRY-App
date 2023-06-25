import styles from './basic_consult_processbar.module.css'
import Image from 'next/image'

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'

export default function BasicConsultProcessBar() {
  return (
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
  )
}