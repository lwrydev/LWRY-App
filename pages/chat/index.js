import styles from './chat.module.css'
import Image from 'next/image'
import { Button, Form } from 'react-bootstrap'

import { useRouter } from "next/router"

import FooterAccount from "../../components/footer/FooterAccount"
import { useEffect, useState } from 'react'

import { firestore } from '../../config/firebase'
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'

//icon
import IconClose from '../../assets/logo/close.svg'

export default function Chat({ user }) {
  const [caseRef, setCaseRef] = useState(null)
  const [lawerName, setLawerName] = useState("")
  const [lawerPic, setLawerPic] = useState("")
  const [chatRef, setChatRef] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [addQuestion, setAddQuestion] = useState(false)
  const [questionList, setQuestionList] = useState([{ question: '' }])
  const [price, setPrice] = useState(0)

  const router = useRouter()

  useEffect(() => {
    getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData => {
      if (caseData.data()) {
        if (caseData.data().lawer) {
          setCaseRef(caseData)
          setLawerName(caseData.data().lawer.displayName)
          if (user.data().role == 'User') {
            setLawerPic(caseData.data().lawer.displayName ? caseData.data().lawer.displayName.split(' ')[0][0] + (caseData.data().lawer.displayName.split(' ').length > 0 ? caseData.data().lawer.displayName.split(' ')[1][0] : '') : '')
          }
          retrieveMessages(caseData)
        } else {
          updateLawer(caseData)
        }
      } else {
        router.replace('/home/caselist')
      }
    })
  }, [])

  useEffect(() => {
    if (chatRef) {
      const SubscribeRetrieveMessage = onSnapshot(query(collection(chatRef.ref, 'messages'), orderBy('seq', 'desc'), limit(20)), (data) => {
        setMessages(data.docs.map(ms => ms.data()))
      })
      return () => SubscribeRetrieveMessage()
    }
  }, [chatRef])

  useEffect(() => {
    setPrice(questionList.length * 50)
  }, [questionList])

  const retrieveMessages = (caseData) => {
    getDoc(doc(firestore, 'chats', caseData.data().chat)).then(chatData => {
      getDocs(query(collection(chatData.ref, 'messages'), orderBy('seq', 'desc'), limit(20))).then(msList => {
        setMessages(msList.docs.map(ms => ms.data()))
        setChatRef(chatData)
        if (user.data().role == 'Lawer') {
          setLawerPic(chatData.data().client.displayName ? chatData.data().client.displayName.split(' ')[0][0] + (chatData.data().client.displayName.split(' ').length > 0 ? chatData.data().client.displayName.split(' ')[1][0] : '') : '')
        }
      })
    })
  }

  const updateLawer = (caseData) => {
    updateDoc(caseData.ref, {
      lawerID: "41Rhzm7oPaUle3vnIWORTrIYNga2",
      lawer: {
        displayName: "Lawer T01"
      },
      status: "Lawer Accept",
      statusTH: "ทนายรับคำถามเรียบร้อยแล้ว"
    }).then(() => {
      getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData2 => {
        setCaseRef(caseData2)
        setLawerName(caseData2.data().lawer.displayName)
        setLawerPic(caseData2.data().lawer.displayName ? caseData2.data().lawer.displayName.split(' ')[0][0] + (caseData2.data().lawer.displayName.split(' ').length > 0 ? caseData2.data().lawer.displayName.split(' ')[1][0] : '') : '')
        retrieveMessages(caseData2)
      })
    })
  }

  const onClickAddQuestion = () => {
    setAddQuestion(true)
  }

  const onInputQuestion = async (e, index) => {
    let questionsRef = questionList
    questionsRef[index].question = e.target.value
    await setQuestionList(questionsRef.map(item => item))
  }

  const onCancelAddQuestion = () => {
    setAddQuestion(false)
    setQuestionList([{ question: '' }])
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.replace(/\s/g, '').length) {
      addDoc(collection(chatRef.ref, 'messages'), {
        desc: inputMessage,
        sendDate: new Date(),
        sender: user.id,
        seq: messages ? messages[0].seq + 1 : 1,
        type: user.data().role == 'User' ? "client" : "lawer"
      }).then(() => {
        setInputMessage('')
      })
    } else {
      setInputMessage('')
    }
  }

  return (
    <div className={styles.container}>
      {caseRef ?
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10'>
            <div className={styles.chatBox}>
              <div className='row'>
                <div className='col-3'>
                  <div className={styles.lawerBox}>
                    <div className={styles.lawerPic}>{lawerPic}</div>
                    <div className={styles.lawerName}>ทนาย {lawerName}</div>
                    <div className={styles.lawerTitle}>ผู้รับผิดชอบหมายเลขคดี</div>
                    <div className={styles.caseNo}>{caseRef.data().caseNo}</div>
                    <div className='row w-100'>
                      <div className='col-4'>
                        <div className={styles.lawTitle}>ประเภทบริการ</div>
                      </div>
                      <div className='col-8'>
                        <div className={styles.lawTypeName}>{caseRef.data().typeTH}</div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-4'>
                        <div className={styles.lawTitle}>รายละเอียดคดี</div>
                      </div>
                      <div className='col-8'>
                        <div className={styles.lawDesc}>{caseRef.data().details}</div>
                      </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className='row w-100'>
                      <div className='col-3'>
                        <div className={styles.lawTitle}>สถานะคดี</div>
                      </div>
                      <div className='d-flex col-9'>
                        <div className={styles.dotSeqActive}></div>
                        <div className={styles.lawStatusActive}>ส่งข้อความคำถามให้ทนาย</div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.lineSeqActive}></div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.dotSeqActive}></div>
                        <div className={styles.lawStatusActive}>ชำระค่าบริการ</div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.lineSeqActive}></div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.dotSeqActive}></div>
                        <div className={styles.lawStatusActive}>ทนายรับคำถามเรียบร้อยแล้ว</div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.lineSeqInactive}></div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.dotSeqInactive}></div>
                        <div className={styles.lawStatusInactive}>ทนายให้คำตอบเรียบร้อยแล้ว</div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.lineSeqInactive}></div>
                      </div>
                    </div>
                    <div className='row w-100'>
                      <div className='col-3'></div>
                      <div className='d-flex col-9'>
                        <div className={styles.dotSeqInactive}></div>
                        <div className={styles.lawStatusInactive}>ประเมินการใช้บริการ</div>
                      </div>
                    </div>
                    <div className={styles.space}></div>
                    <div className={styles.space}></div>
                    <div className={styles.space}></div>
                    <div className={styles.btnGrp}>
                      <Button
                        className={styles.btnAdd}
                        onClick={() => onClickAddQuestion()}
                      >
                        <div>ส่งคำถามเพิ่มเติม</div>
                      </Button>
                      <Button
                        className={styles.btnFinish}
                      >
                        <div>เสร็จสิ้น</div>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='col-9'>
                  <div className={styles.chatGrp}>
                    {addQuestion ?
                      <div className={styles.addQuestionBox}>
                        <div className='row'>
                          <div className='col-7'>
                            <div className={styles.addQuestionTitle}>ส่งคำถามเพิ่มเติมสำหรับบริการคำปรึกษาเบื้องต้น</div>
                            {questionList.map((question, index) => {
                              return <div key={index}>
                                <div className={styles.questionItem}>คำถามที่ {index + 1}</div>
                                {index != 0 || questionList.length > 1 ?
                                  <div className={styles.closeQuestion}>
                                    <Image
                                      src={IconClose}
                                      height='30'
                                      width='30'
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => setQuestionList(questionList.length > 1 ? questionList.slice(0, index).concat(questionList.slice(index + 1)) : questionList)}
                                    />
                                  </div> :
                                  <></>
                                }
                                <input
                                  className={styles.inputQuestion}
                                  type='text'
                                  value={question.question}
                                  onChange={e => onInputQuestion(e, index)}
                                  required
                                />
                              </div>
                            })}
                            <div className='d-flex justify-content-end'>
                              <div
                                className={styles.addQuestion}
                                onClick={() => setQuestionList(questionList.concat({ question: '' }))}
                              >
                                เพิ่มคำถาม
                              </div>
                            </div>
                          </div>
                          <div className='col-5'>
                            <div className={styles.priceBox}>
                              <div className='d-flex justify-content-between'>
                                <div className={styles.addQuestionTitle}>บริการให้คำปรึกษาเบื้องต้น</div>
                                <div className={styles.countQuestion}>จำนวน {questionList.length} คำถาม</div>
                              </div>
                              <div className='d-flex justify-content-between'>
                                <div className={styles.priceText}>ค่าบริการ</div>
                                <div className={styles.priceText}>{price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                              </div>
                              <div className={styles.btnGrpQuestion}>
                                <Button
                                  className={styles.btnAdd}
                                  onClick={() => onCancelAddQuestion()}
                                >
                                  <div>ยกเลิก</div>
                                </Button>
                                <Button
                                  className={styles.btnFinish}
                                >
                                  <div>ชำระเงิน</div>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> :
                      <></>
                    }
                    <div className={styles.chatInputBox}>
                      <div className={styles.attachFile}>
                        <div className={styles.attachFileItem}></div>
                        <div className={styles.attachFileItem}></div>
                      </div>
                      <Form
                        className='w-100'
                        onSubmit={sendMessage}
                      >
                        <input
                          className={styles.inputMessage}
                          placeholder='Aa'
                          type='text'
                          value={inputMessage}
                          onChange={e => setInputMessage(e.target.value)}
                        />
                      </Form>
                    </div>
                    <div className={styles.messageBox}>
                      {messages.map((ms, index) => {
                        return <div key={index}>

                          {ms.type == 'cs' && ms.sender == user.id ?
                            <div className='d-flex justify-content-end'>
                              <div className={styles.sendDate}>{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}</div>
                              <div className={styles.messageCS}>
                                <div className={styles.descCS}>{ms.desc}</div>
                                <div className={styles.lineCS}></div>
                                <div className={styles.statusCS}>ชำระเงินเรียบร้อยแล้ว</div>
                              </div>
                            </div> : ms.sender == user.id ?
                              <div className='d-flex justify-content-end'>
                                <div className={styles.sendDate}>{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</div>
                                <div className={styles.messageClient}>{ms.desc}</div>
                              </div> :
                              <div className='d-flex'>
                                <div className={styles.lawerMsgPic}>{lawerPic}</div>
                                <div className={styles.messageLawer}>{ms.desc}</div>
                                <div className={styles.sendDate}>{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</div>
                              </div>
                          }
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div> :
        <></>
      }
      <FooterAccount user={user} />
    </div>
  )
}