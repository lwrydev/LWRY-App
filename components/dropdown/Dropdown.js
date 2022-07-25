import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from './dropdown.module.css'

export default function Dropdown({ label, items, setValue, value }) {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState(value)
  const [select, setSelect] = useState(false)

  const selected = (item) => {
    setFocus(false)
    setValue(item.value)
    setInput(item.value)
  }

  return (
    <div>
      {/* <div className={styles.arrowDown}>&#9698;</div> */}
      <div className="sticky-top" onClick={() => setSelect(false)} onMouseLeave={() => setSelect(false)}>
        {select ?
          <div className={styles.itemBox}>
            <div className={styles.labelOnSelect}>บริการที่ชำระ</div>
            {items.map((item, index) => {
              return <div
                key={index}
                onClick={() => selected(item)}
              >
                {item.cmp}
              </div>
            })}
          </div> :
          <></>
        }
      </div>
      <div onClick={() => setSelect(true)}>
        <FloatingLabel controlId="floatingTextarea2" label={label} style={{ fontWeight: 300, color: '#6E6E6E' }}>
          <Form.Control
            as={'input'}
            placeholder="Leave a comment here"
            style={{ height: '46px', cursor: 'pointer', color: '#6E6E6E', fontWeight: 400 }}
            value={value}
            required
            disabled
            className={styles.inputDisabled}
          />
        </FloatingLabel>
      </div>
    </div>
  )
}