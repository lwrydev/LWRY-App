import { useState } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"

import styles from './navbar.module.css'
import Image from 'next/image'

import AccountMenu from "./accountMenu/AccountMenu"

import Logo from '../../assets/logo/lawlivery_app.svg'

export default function NavBar({ user }) {
  const [selectMenu, setSelectMenu] = useState('menu1')
  const [showAccount, setShowAccount] = useState(false)

  return (
    <Navbar expand="lg" className={styles.content}>
      <Container className={styles.maxWidth}>
        <Navbar.Brand><Image src={Logo} width='200' height='36' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto h-100">
            <div
              className={selectMenu == 'menu1' ? styles.focusMenu : styles.menu}
              onClick={() => setSelectMenu('menu1')}
            >
              <Nav.Link>
                รับคำปรึกษา
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu2' ? styles.focusMenu : styles.menu}
              onClick={() => setSelectMenu('menu2')}
            >
              <Nav.Link>
                เอกสาร
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu3' ? styles.focusMenu : styles.menu}
              onClick={() => setSelectMenu('menu3')}
            >
              <Nav.Link>
                ว่าจ้างทนาย
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu4' ? styles.focusMenu : styles.menu}
              onClick={() => setSelectMenu('menu4')}
            >
              <Nav.Link>
                ราคา
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="justify-content-end" >
            <Nav.Item>
              <div onClick={() => setShowAccount(true)}>
                <Nav.Link>
                  <div className={styles.profileImg}></div>
                  <div className={styles.userBtn}>{user.email}</div>
                </Nav.Link>
              </div>
              {showAccount ?
                <AccountMenu setShowAccount={setShowAccount} user={user} />
                :
                <></>
              }
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}