import styles from './payment.module.css'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from "next/router"

//icon
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'
import IconPaymentCreditCard from '../../assets/logo/payment_credit_card.svg'
import IconBanking from '../../assets/logo/banking.svg'
import IconCreditCard from '../../assets/logo/credit_card.svg'
import IconQRCode from '../../assets/logo/qrcode.svg'

import { useEffect, useState } from 'react'

import { firestore } from '../../config/firebase'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import BasicConsultProcessBar from '../../components/processBar/BasicConsultProcessBar'


export default function Payment({ user, caseType }) {
  const [caseRef, setCase] = useState(null)
  const [selectPayment, setSelectPayment] = useState(false)
  const [paymentType, setPaymentType] = useState('')

  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [subDistrict, setSubDistrict] = useState('')
  const [zipcode, setZipcode] = useState('')

  const [price, setPrice] = useState(0)
  const [vat, setVat] = useState(0)
  const [total, setTotal] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [discountPrice, setDiscountPrice] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData => {
      if (caseData.data() && caseData.data().payment.status == 'Pending') {
        setCase(caseData)
        setPrice(caseData.data().payment.price * 100 / 107)
        setVat(caseData.data().payment.price - (caseData.data().payment.price * 100 / 107))
        setTotal(caseData.data().payment.price)
        setTotalAfterDiscount(caseData.data().payment.price - discountPrice)
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  const selectedPaymentType = (pType) => {
    setSelectPayment(false)
    setPaymentType(pType)
  }

  const onInputCoupon = () => {
    getDocs(query(collection(user.ref, 'coupon'), where('code', '==', coupon))).then(dataList => {
      if (dataList.docs.length > 0) {
        dataList.forEach(cp => {
          setDiscountPrice(cp.data().price)
          setTotalAfterDiscount(caseRef.data().payment.price + (caseRef.data().payment.price * 0.07) - cp.data().price)
        })
      }
    })
  }

  const onSubmitPayment = (e) => {
    e.preventDefault()
    if (paymentType != '') {
      setDoc(doc(collection(firestore, 'payments_history')), {
        case: caseRef.id,
        createdDate: new Date(),
        changedDate: new Date(),
        owner: user.id,
        price: totalAfterDiscount,
        channel: paymentType === 'P01' ? 'Bank Transfer' : paymentType === 'P02' ? 'Credit Card' : 'QR Code',
        channelTH: paymentType === 'P01' ? 'โอนผ่านบัญชีธนาคาร' : paymentType === 'P02' ? 'บัตรเครดิต' : 'คิวอาร์โค้ด',
        status: 'Pending'
      }).then(() => {
        if (paymentType === 'P01') {
          router.push({
            pathname: '/payment/account_transfer',
            query: { case: caseRef.id }
          })
        } else if (paymentType === 'P02') {
          router.push({
            pathname: '/payment/qr_payment',
            query: { case: caseRef.id }
          })
        } else {
          router.push({
            pathname: '/payment/qr_payment',
            query: { case: caseRef.id }
          })
        }
      })
    } else {
      toast.info("กรุณาเลือกวิธีการชำระเงิน", {
        position: 'bottom-right'
      })
    }
  }

  return (
    <div className={styles.content}>
      {caseRef ?
        <>
          {caseRef.data().type === 'Basic Consult' ?
            <BasicConsultProcessBar /> :
            <></>
          }
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <Form onSubmit={onSubmitPayment}>
                <div className={styles.termsBox}>
                  <div className={styles.consultTitle}>รายละเอียดการสั่งซื้อ</div>
                  <div className={styles.problemTitle}>วิธีการชำระเงิน</div>
                  <div className='row'>
                    <div className='col-8'>
                      <div className={styles.paymentBox}>
                        {selectPayment ?
                          <div className={styles.paymentOptionsBox2}>
                            <div className={styles.paymentItem} onClick={() => selectedPaymentType('P01')}>
                              <div className='row w-100'>
                                <div className='col-2 d-flex justify-content-center'>
                                  <Image src={IconBanking} />
                                </div>
                                <div className='col-10'>
                                  <div className={styles.paymentItemTitle}>โอนเงินผ่านธนาคาร</div>
                                  <div className={styles.paymentItemDetail}>สามารถทำการชำระค่าบริการตามรายละเอียดเลขที่บัญชีธนาคาร ด้วยตู้ ATM หรือ Mobile Banking</div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.paymentItem} onClick={() => selectedPaymentType('P02')}>
                              <div className='row w-100'>
                                <div className='col-2 d-flex justify-content-center'>
                                  <Image src={IconCreditCard} />
                                </div>
                                <div className='col-10'>
                                  <div className={styles.paymentItemTitle}>ชำระด้วยบัตรเครดิต</div>
                                  <div className={styles.paymentItemDetail}>ชำระเงินออนไลน์ผ่านบริการ GB-Pay โดยไม่มีค่าธรรมเนียมใดๆ</div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.paymentItem} onClick={() => selectedPaymentType('P03')}>
                              <div className='row w-100'>
                                <div className='col-2 d-flex justify-content-center'>
                                  <Image src={IconQRCode} />
                                </div>
                                <div className='col-10'>
                                  <div className={styles.paymentItemTitle}>ชำระด้วย QR Payment</div>
                                  <div className={styles.paymentItemDetail}>สามารถทำการชำระค่าบริการผ่าน QR-Payment ด้วย Mobile Banking Application โดยไม่มีค่าธรรมเนียมใดๆ</div>
                                </div>
                              </div>
                            </div>
                          </div> :
                          <></>
                        }
                        {paymentType != '' ?
                          <div className={styles.paymentItemSelected}>
                            <div className='d-flex justify-content-end'>
                              <div
                                className={styles.changePayment}
                                onClick={() => setSelectPayment(true)}
                              >
                                เปลี่ยนวิธีการชำระเงิน
                              </div>
                            </div>
                            {paymentType == 'P01' ?
                              <div className='row w-100'>
                                <div className='col-2 d-flex justify-content-center'>
                                  <Image src={IconBanking} />
                                </div>
                                <div className='col-10'>
                                  <div className={styles.paymentItemTitle}>โอนเงินผ่านธนาคาร</div>
                                  <div className={styles.paymentItemDetail}>สามารถทำการชำระค่าบริการตามรายละเอียดเลขที่บัญชีธนาคาร ด้วยตู้ ATM หรือ Mobile Banking</div>
                                </div>
                              </div> :
                              paymentType == 'P02' ?
                                <div className='row w-100'>
                                  <div className='col-2 d-flex justify-content-center'>
                                    <Image src={IconCreditCard} />
                                  </div>
                                  <div className='col-10'>
                                    <div className={styles.paymentItemTitle}>ชำระด้วยบัตรเครดิต</div>
                                    <div className={styles.paymentItemDetail}>ชำระเงินออนไลน์ผ่านบริการ GB-Pay โดยไม่มีค่าธรรมเนียมใดๆ</div>
                                  </div>
                                </div> :
                                paymentType == 'P03' ?
                                  <div className='row w-100'>
                                    <div className='col-2 d-flex justify-content-center'>
                                      <Image src={IconQRCode} />
                                    </div>
                                    <div className='col-10'>
                                      <div className={styles.paymentItemTitle}>ชำระด้วย QR Payment</div>
                                      <div className={styles.paymentItemDetail}>สามารถทำการชำระค่าบริการผ่าน QR-Payment ด้วย Mobile Banking Application โดยไม่มีค่าธรรมเนียมใดๆ</div>
                                    </div>
                                  </div> :
                                  <></>
                            }
                          </div> :
                          <></>
                        }
                        {!selectPayment && paymentType == '' ?
                          <div className={styles.paymentOptionsBox} onClick={() => setSelectPayment(true)}>
                            <Image src={IconPaymentCreditCard} />
                            <div className={styles.paymentOptionsTxt}>เลือกวิธีการชำระเงิน</div>
                          </div> :
                          <></>
                        }
                        <div className={styles.problemTitle}>ข้อมูลสำหรับออกใบเสร็จรับเงิน</div>
                        <div className='row'>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="ชื่อ" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  required
                                  value={user.data().firstname}
                                  disabled
                                  className={styles.inputDisabled}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="นามสกุล" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  required
                                  value={user.data().lastname}
                                  disabled
                                  className={styles.inputDisabled}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="email" style={{ fontWeight: 300, color: '#6E6E6E' }}>
                                <Form.Control
                                  as={'input'}
                                  type='email'
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  required
                                  value={user.data().email}
                                  disabled
                                  className={styles.inputDisabled}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="เบอร์โทรศัพท์" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  type='phone'
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={phone}
                                  onChange={e => setPhone(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="ที่อยู่ 1" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={address1}
                                  onChange={e => setAddress1(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="ที่อยู่ 2 (เพิ่มเติม)" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={address2}
                                  onChange={e => setAddress2(e.target.value)}
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="จังหวัด" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={province}
                                  onChange={e => setProvince(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="อำเภอ / เขต" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={district}
                                  onChange={e => setDistrict(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="ตำบล / แขวง" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={subDistrict}
                                  onChange={e => setSubDistrict(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className={styles.inputBox}>
                              <FloatingLabel controlId="floatingTextarea2" label="รหัสไปรษณีย์" style={{ fontWeight: 300, color: '#CCCCCC' }}>
                                <Form.Control
                                  as={'input'}
                                  placeholder="Leave a comment here"
                                  style={{ height: '46px' }}
                                  value={zipcode}
                                  onChange={e => setZipcode(e.target.value)}
                                  required
                                  className={styles.input}
                                />
                              </FloatingLabel>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className={styles.summaryHead}>
                        <div className={styles.summaryTitle}>บริการให้คำปรึกษาเบื้องต้น</div>
                        <div className={styles.summarySub}>จำนวน {caseRef.data().questions.length} คำถาม</div>
                      </div>
                      <div className={styles.summaryBody}>
                        <div className={styles.summaryItem}>
                          <div>จำนวนเงิน</div>
                          <div>{price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                        <div className={styles.summaryItem}>
                          <div>Vat (7%)</div>
                          <div>{vat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                        <div className={styles.summaryItem}>
                          <div>ยอดรวม</div>
                          <div>{total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                        {discountPrice > 0 ?
                          <div className={styles.summaryItemDiscount}>
                            <div>ส่วนลด</div>
                            <div>{discountPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                          </div>
                          :
                          <div className='d-flex justify-content-between'>
                            <input
                              className={styles.inputCoupon}
                              placeholder='รหัสส่วนลด'
                              value={coupon}
                              onChange={e => setCoupon(e.target.value)}
                              type='text'
                            />
                            <Button
                              className={coupon ? styles.couponBtn : styles.btnDisabled}
                              disabled={coupon ? false : true}
                              onClick={() => onInputCoupon()}
                            >
                              <div>ยืนยัน</div>
                            </Button>
                          </div>
                        }
                        <div className={styles.totalPrice}>
                          <div>ยอดรวมสุทธิ</div>
                          <div>{totalAfterDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <div className='p-1'>
                      <Button
                        className={styles.btnCancel}
                        onClick={() => router.replace('/home/caselist')}
                      >
                        <div>ยกเลิก</div>
                      </Button>
                    </div>
                    <div className='p-1'>
                      <Button
                        className={styles.btn}
                        type='submit'
                      >
                        <div>ชำระเงิน</div>
                      </Button>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </Form>
            </div>
            <div className="col-1"></div>
          </div>
        </>
        : <></>}
    </div>
  )
}