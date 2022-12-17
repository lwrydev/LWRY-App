import styles from './chat.module.css'
import Image from 'next/image'
import { Button, Form } from 'react-bootstrap'

import { useRouter } from "next/router"

import FooterAccount from "../../components/footer/FooterAccount"
import { useEffect, useRef, useState } from 'react'

import { firestore } from '../../config/firebase'
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

//icon
import IconClose from '../../assets/logo/close.svg'
import IconJPG from '../../assets/logo/jpg.svg'
import IconPDF from '../../assets/logo/pdf.svg'
import FileChat from '../../assets/logo/file_chat.svg'
import ImageChat from '../../assets/logo/image_chat.svg'
import SentMessage from '../../assets/logo/sent_message.svg'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const storage = getStorage()

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

  const refFile = useRef()
  const refImage = useRef()

  useEffect(() => {
    if (user) {
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
    }
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
    addDoc(collection(firestore, 'chats'), {
      case: caseData.id,
      client: {
        clientID: user.id,
        displayName: user.data().displayName
      },
      lawerID: "FcNzp3MMvbfxRNrvPRuFDPLJI4A3",
      lawer: {
        displayName: "Lawer T01"
      }
    }).then(chatRef => {
      addDoc(collection(chatRef, 'messages'), {
        type: 'cs',
        seq: 1,
        desc: caseData.data().details,
        paymentStatus: 'Paid',
        sender: user.id,
        sendDate: new Date()
      })
      updateDoc(caseData.ref, {
        lawerID: "FcNzp3MMvbfxRNrvPRuFDPLJI4A3",
        lawer: {
          displayName: "Lawer T01"
        },
        status: "Lawer Accept",
        statusTH: "ทนายรับคำถามเรียบร้อยแล้ว",
        chat: chatRef.id
      }).then(() => {
        getDoc(doc(firestore, 'cases', router.asPath.split('?caseId=')[1])).then(caseData2 => {
          setCaseRef(caseData2)
          setLawerName(caseData2.data().lawer.displayName)
          setLawerPic(caseData2.data().lawer.displayName ? caseData2.data().lawer.displayName.split(' ')[0][0] + (caseData2.data().lawer.displayName.split(' ').length > 0 ? caseData2.data().lawer.displayName.split(' ')[1][0] : '') : '')
          retrieveMessages(caseData2)
        })
      })
    })
  }

  const downloadFile = (path, name) => {
    if (!path) {
      return
    }
    const pathReference = ref(storage, path)
    getDownloadURL(pathReference).then(url => {
      window.open(url)
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

  const submitAddQuestion = () => {

  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.replace(/\s/g, '').length) {
      addDoc(collection(chatRef.ref, 'messages'), {
        desc: inputMessage,
        sendDate: new Date(),
        sender: user.id,
        seq: messages.length > 0 ? messages[0].seq + 1 : 1,
        type: user.data().role == 'User' ? "client" : "lawer"
      }).then(() => {
        setInputMessage('')
      })
    } else {
      setInputMessage('')
    }
  }

  const onUploadFile = () => {
    refFile.current.click()
  }

  const onUploadImage = () => {
    refImage.current.click()
  }

  const uploadFile = async (e) => {
    Array.from(e.target.files).forEach(file => {
      if (file.size <= 2000000) {
        let fileName = new Date().getTime().toString()
        const storageRef = ref(storage, '/' + caseRef.id + '/' + fileName,)
        uploadBytes(storageRef, file)
        addDoc(collection(chatRef.ref, 'messages'), {
          doc: {
            path: '/' + caseRef.id + '/' + fileName,
            name: file.name,
            size: file.size,
            type: "PDF",
            createdDate: new Date(),
            expireDate: new Date(new Date().getTime() + 10 * 60 * 60 * 24 * 1000)
          },
          typeMessage: "docs",
          sendDate: new Date(),
          sender: user.id,
          seq: messages.length > 0 ? messages[0].seq + 1 : 1,
          type: user.data().role == 'User' ? "client" : "lawer"
        })
      } else {
        toast.error("ขนาดไฟล์ต้องไม่เกิน 2MB", {
          position: 'bottom-right'
        })
      }
    })
    await resetFile(e)
  }

  const uploadImage = async (e) => {
    Array.from(e.target.files).forEach(file => {
      if (file.size <= 2000000) {

      } else {
        toast.error("ขนาดไฟล์ต้องไม่เกิน 2MB", {
          position: 'bottom-right'
        })
      }
    })
    await resetFile(e)
  }

  const resetFile = (e) => {
    e.target.type = "text"
    e.target.type = "file"
  }

  const fileSize = (size) => {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  return (
    <div className={styles.container}>
      {caseRef ?
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10'>
            <div className={styles.chatBox}>
              <div className='row'>
                <div className='col-4 col-xl-3'>
                  <div className={styles.lawerBox}>
                    <div>
                      <div className={styles.lawerPic}>{lawerPic}</div>
                    </div>
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
                <div className='col-8 col-xl-9'>
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
                        <div
                          className={styles.attachFileItem}
                          onClick={() => onUploadFile()}
                        >
                          <Image src={FileChat} width={30} />
                        </div>
                        <input
                          ref={refFile}
                          accept="application/pdf"
                          type="file"
                          multiple
                          style={{ display: 'none' }}
                          onChange={e => uploadFile(e)}
                        />
                        <div
                          className={styles.attachFileItem}
                          onClick={() => onUploadImage()}
                        >
                          <Image src={ImageChat} width={30} />
                        </div>
                        <input
                          ref={refImage}
                          accept="image/*"
                          type="file"
                          multiple
                          style={{ display: 'none' }}
                          onChange={e => uploadImage(e)}
                        />
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
                      <div className={styles.sentBtn}>
                        <Button
                          className={styles.iconSentBtn}
                          onClick={e => sendMessage(e)}
                        >
                          <Image src={SentMessage} width={34} />
                        </Button>
                      </div>
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
                                minute: '2-digit',
                                second: '2-digit'
                              })}</div>
                              <div className={styles.messageCS}>
                                <div className={styles.descCS}>{ms.desc}</div>
                                <div className={styles.files}>
                                  {caseRef.data().docs ? caseRef.data().docs.map((doc, index) => {
                                    return <div key={index}>
                                      <div
                                        className={styles.uploadFile}
                                        onClick={() => downloadFile(doc.path, doc.name)}
                                      >
                                        {doc.type == 'application/pdf' ?
                                          <Image src={IconPDF} /> :
                                          <Image src={IconJPG} />}
                                        <div>{doc.name.length <= 17 ? doc.name : doc.name.substring(0, 13) + "..." + (doc.type == 'application/pdf' ? "PDF" : "JPG")}</div>
                                      </div>
                                    </div>
                                  }) : <></>}
                                  {caseRef.data().pic ? caseRef.data().pic.map((doc, index) => {
                                    return <div key={index}>
                                      <div
                                        className={styles.uploadFile}
                                        onClick={() => downloadFile(doc.path)}
                                      >
                                        {doc.type == 'application/pdf' ?
                                          <Image src={IconPDF} /> :
                                          <Image src={IconJPG} />}
                                        <div>{doc.name.length <= 17 ? doc.name : doc.name.substring(0, 13) + "..." + (doc.type == 'application/pdf' ? "PDF" : "JPG")}</div>
                                      </div>
                                    </div>
                                  }) : <></>}
                                </div>
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
                                  minute: '2-digit',
                                  second: '2-digit'
                                })}</div>
                                {ms.typeMessage == "docs" ?
                                  <div className={styles.messageClient}>
                                    <div className={styles.messageDocs}>
                                      <div
                                        className={styles.uploadFile}
                                        onClick={() => downloadFile(ms.doc.path)}
                                      >
                                        <Image src={IconPDF} width={50} height={60} />
                                      </div>
                                      <div className={styles.docsDesc}>
                                        <div>{ms.doc.name.length <= 17 ? ms.doc.name : ms.doc.name.substring(0, 13) + "..." + (ms.doc.type == 'application/pdf' ? "PDF" : "JPG")}</div>
                                        <div>ขนาดไฟล์ : {fileSize(ms.doc.size)}</div>
                                        <div>สร้างเมื่อ : {ms.doc.createdDate.toDate().toLocaleDateString('th-TH', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}</div>
                                        <div>หมดอายุ : {ms.doc.expireDate.toDate().toLocaleDateString('th-TH', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}</div>
                                      </div>
                                    </div>
                                  </div> :
                                  ms.typeMessage == "pics" ?
                                    <div className={styles.messageClient}>{ms.desc}</div> :
                                    <div className={styles.messageClient}>{ms.desc}</div>
                                }
                              </div> :
                              <div className='d-flex'>
                                <div className={styles.lawerMsgPic}>{lawerPic}</div>
                                <div className={styles.messageLawer}>{ms.desc}</div>
                                <div className={styles.sendDate}>{ms.sendDate.toDate().toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
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
          <ToastContainer />
        </div> :
        <></>
      }
      <FooterAccount user={user} />
    </div>
  )
}