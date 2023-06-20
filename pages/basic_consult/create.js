import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import styles from './basicConsult.module.css'
import Image from 'next/image'

import { useRouter } from "next/router"

import { firestore } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage"

//icon
import IconClose from '../../assets/logo/close.svg'
import IconBook from '../../assets/logo/book.svg'
import IconEdit from '../../assets/logo/edit.svg'
import IconMoneyCheck from '../../assets/logo/money_check.svg'
import IconCorrect from '../../assets/logo/correct.svg'
import IconUpload from '../../assets/logo/upload.svg'
import IconJPG from '../../assets/logo/jpg.svg'
import IconPDF from '../../assets/logo/pdf.svg'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRef, useState } from 'react'

const storage = getStorage();

export default function create({ user }) {
  const [termsChecked, setTermsChecked] = useState(false)
  const [conditionChecked, setConditionChecked] = useState(false)
  const [details, setDetails] = useState('')
  const [files, setFiles] = useState([])
  const [questionList, setQuestionList] = useState([{ question: '' }])

  const router = useRouter()
  const refFile = useRef()

  const onUploadFile = () => {
    refFile.current.click()
  }

  const uploadFile = async (e) => {
    let filesRef = []
    Array.from(e.target.files).forEach(file => {
      if (file.size <= 2000000) {
        filesRef.push({
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          name: file.name,
          size: file.size,
          type: file.type,
          name2: new Date().getTime().toString(36).toUpperCase() + file.name
        })
      } else {
        toast.error("ขนาดไฟล์ต้องไม่เกิน 2MB", {
          position: 'bottom-right'
        })
      }
    })
    await setFiles(files.concat(...filesRef))
  }

  const removeFile = (index) => {
    setFiles(files.length > 0 ? files.slice(0, index).concat(files.slice(index + 1)) : [])
  }

  const onInputQuestion = async (e, index) => {
    let questionsRef = questionList
    questionsRef[index].question = e.target.value
    await setQuestionList(questionsRef.map(item => item))
  }

  const onSubmitCase = (e) => {
    e.preventDefault()
    let id = new Date().getTime().toString()
    let docs = files.map(file => ({
      name: file.name,
      path: '/' + id + '/' + file.name2,
      data: file
    }))
    setDoc(doc(firestore, 'cases', id), {
      owner: user.id,
      caseNo: 'A-' + new Date().getTime().toString(36).toUpperCase(),
      acceptPolicy: termsChecked,
      acceptConditions: conditionChecked,
      details: details,
      type: 'Basic Consult',
      typeTH: 'คำปรึกษาเบื้องต้น',
      status: 'Pending Payment',
      statusTH: 'รอการชำระเงิน',
      questions: questionList,
      docs: docs.filter(doc => doc.data.type == "application/pdf").map(doc => ({
        name: doc.name,
        path: doc.path,
        type: doc.data.type
      })),
      pics: docs.filter(doc => doc.data.type != "application/pdf").map(doc => ({
        name: doc.name,
        path: doc.path,
        type: doc.data.type
      })),
      payment: {
        status: 'Pending',
        statusTH: 'รอการชำระเงิน',
        channel: '',
        channelTH: '',
        number: '',
        price: 50 * questionList.length,
        totalPrice: 50 * questionList.length
      },
      createdDate: new Date(),
      changedDate: new Date()
    }).then(() => {
      docs.forEach(doc => {
      console.log(doc);
        const storageRef = ref(storage, doc.path)
        uploadBytes(storageRef, doc.data)
      })
      router.push({
        pathname: '/payment',
        query: {
          caseId: id
        }
      })
    })
  }

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
              <div className={styles.progressLineInActive}></div>
              <div className={styles.progressBoxInActive}>
                <Image src={IconMoneyCheck} />
                <div className={styles.progressTxtInActive}>ชำระค่าบริการ</div>
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
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <Form onSubmit={onSubmitCase}>
            <div className={styles.termsBox}>
              <div className='row'>
                <div className="col-5" style={{ paddingRight: '40px' }}>
                  <div className={styles.consultTitle}>บริการให้คำแนะนำเบื้องต้น</div>
                  <div className={styles.consultList}>
                    <div className='d-flex'>
                      <div>
                        <div className={styles.dot2}></div>
                      </div>
                      <div className={styles.consultItem}>คำถามของท่านจะถูกส่งไปยังทนายที่ออนไลน์อยู่ในระบบ หากต้องการปิดบังตัวตนของท่านกับทนายความก่อน โปรดระมัดระวังการใส่ข้อมูลที่เป็นการเปิดเผยตัวตนของคุณ</div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <div className={styles.dot2}></div>
                      </div>
                      <div className={styles.consultItem}>ท่านสามารถพิมพ์ปัญหาทางกฎหมายได้ไม่เกิน 3000 ตัวอักษร และถามคำถามได้ไม่เกิน 500 ตัวอักษรเพื่อความสะดวกในการให้บริการ ข้อความของท่านควรกระชับ เป็นลำดับขั้นตอน และเข้าใจได้ง่าย</div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <div className={styles.dot2}></div>
                      </div>
                      <div className={styles.consultItem}>หากข้อมูลของท่านไม่เพียงพอที่ทนายความจะให้คำแนะนำเบื้องต้นได้ ทนายความอาจส่งข้อความร้องขอข้อมูลเพิ่มเติมจากท่านก่อนให้คำตอบ</div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <div className={styles.dot2}></div>
                      </div>
                      <div className={styles.consultItem}>เมื่อทนายความให้คำแนะนำเบื้องต้นแก่ท่านแล้วท่านสามารถเลือกใช้บริการอื่นๆ ได้ตามที่ทนายความแนะนำ หรือสามารถใช้บริการให้คำแนะนำเบื้องต้นซ้ำอีกในประเด็นอื่นได้</div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <div className={styles.dot2}></div>
                      </div>
                      <div className={styles.consultItem}>ระบบจะจัดเก็บข้อมูลการใช้บริการเพื่อประโยชน์ในการพัฒนาการให้บริการได้เท่านั้นโดยไม่เปิดเผยข้อมูลส่วนบุคคลให้แก่บุคคลอื่นที่ไม่เกี่ยวข้องกับการพัฒนาผลิตภัณฑ์</div>
                    </div>
                    <div className={styles.policyBlock}>
                      <Form.Check
                        className={styles.polCheck}
                        type={'checkbox'}
                        onClick={() => setTermsChecked(!termsChecked)}
                        defaultChecked={termsChecked}
                        required
                      />
                      <div className='d-flex flex-wrap'>
                        <div className={styles.polText}>ฉันได้อ่านและยอมรับ</div>
                        <div className={styles.polTextLink}>นโยบายคุ้มครองข้อมูลส่วนบุคคล</div>
                      </div>
                    </div>
                    <div className={styles.policyBlock}>
                      <Form.Check
                        className={styles.polCheck}
                        type={'checkbox'}
                        onClick={() => setConditionChecked(!conditionChecked)}
                        defaultChecked={conditionChecked}
                        required
                      />
                      <div className='d-flex flex-wrap'>
                        <div className={styles.polText}>ฉันได้อ่านและยอมรับ</div>
                        <div className={styles.polTextLink}>เงื่อนไขการใช้บริการให้คำแนะนำเบื้องต้น</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-7">
                  <div className={styles.consultTitle}></div>
                  <div className={styles.consultList}>
                    <div className={styles.problemTitle}>อธิบายปัญหาทางกฎหมาย</div>
                    <FloatingLabel controlId="floatingTextarea2" label="รายละเอียดปัญหา..." style={{ fontWeight: 300, color: '#6E6E6E' }}>
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        required
                        className={styles.questionDetails}
                        value={details}
                        onInput={e => setDetails(e.target.value)}
                      />
                    </FloatingLabel>
                    <div className='d-flex'>
                      {files.map((file, index) => {
                        return <div key={index}>
                          <div className={styles.closeQuestion}>
                            <Image
                              src={IconClose}
                              height='30'
                              width='30'
                              style={{ cursor: 'pointer' }}
                              onClick={() => setFiles(files.slice(0, index).concat(files.slice(index + 1)))}
                            />
                          </div>
                          <div
                            className={styles.uploadFile}
                            style={{ cursor: "default" }}
                          >
                            {file.type == 'application/pdf' ?
                              <Image src={IconPDF} /> :
                              <Image src={IconJPG} />}
                            <div>{file.name.length <= 17 ? file.name : file.name.substring(0, 13) + "..." + (file.type == 'application/pdf' ? "PDF" : "JPG")}</div>
                          </div>
                        </div>
                      })}
                      <div>
                        <div className={styles.closeQuestion} style={{ width: "30px", height: "30px" }}></div>
                        <div
                          className={styles.uploadFile}
                          onClick={() => onUploadFile()}
                        >
                          <Image src={IconUpload} />
                          <div>แนบไฟล์ เพิ่มเติม</div>
                        </div>
                      </div>
                    </div>
                    <input
                      ref={refFile}
                      accept="image/*,application/pdf"
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={e => uploadFile(e)}
                    />
                    <div className={styles.problemTitle}>คำถามที่ต้องการคำแนะนำเบื้องต้น</div>
                    {questionList.map((question, index) => {
                      return <div key={index}>
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
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">คำถามที่ {index + 1}</InputGroup.Text>
                          <Form.Control
                            className={styles.questionText}
                            style={{ height: '76px' }}
                            placeholder="คำถามที่ต้องการปรึกษา..."
                            as="textarea"
                            aria-label="question"
                            aria-describedby="basic-addon1"
                            value={question.question}
                            onChange={e => onInputQuestion(e, index)}
                            required
                          />
                        </InputGroup>
                      </div>
                    })}
                  </div>
                  <div className={styles.addQuestion}>
                    <div
                      className={styles.addQuestionBtn}
                      onClick={() => setQuestionList(questionList.concat({ question: '' }))}
                    >
                      เพิ่มคำถาม
                    </div>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <div
                      className={styles.backwordBtn}
                      onClick={() => router.back()}
                    >
                      ย้อนกลับ
                    </div>
                    <Button
                      className={styles.btn}
                      type='submit'
                    >
                      <div>ใช้บริการ</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <ToastContainer />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}