import { Button } from 'react-bootstrap'
import styles from './payment.module.css'

export default function payment({ user }) {
  return (
    <div className={styles.content}>
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-10'>
          <div className={styles.paymentBox}>
            <div className={styles.paymentTitle}>ชำระเงิน</div>
            <div className={styles.paymentBtn}>
              <Button
                className={styles.btn}
              >
                <div>ชำระเงิน</div>
              </Button>
            </div>
          </div>
        </div>
        <div className='col-1'></div>
      </div>
    </div>
  )
}