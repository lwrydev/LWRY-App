import { useEffect, useState } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"

import styles from './navbar.module.css'
import Image from 'next/image'
import { useRouter } from "next/router"

import AccountMenu from "./accountMenu/AccountMenu"

import Logo from '../../assets/logo/lawlivery_app.svg'
import { getAuth } from "firebase/auth"

const auth = getAuth()

export default function NavBar({ user, setUser }) {
  const [selectMenu, setSelectMenu] = useState('menu1')
  const [showAccount, setShowAccount] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (router.pathname.includes('/account_security')) {
      setSelectMenu('menu2')
    } else if (router.pathname.includes('/pricing_payment')) {
      setSelectMenu('menu3')
    }
  }, [])

  const goHomePage = () => {
    setSelectMenu('menu1')
    router.push('/')
  }

  const goAccountPage = () => {
    setSelectMenu('menu2')
    router.push('/account_security')
  }

  const goPricingPage = () => {
    setSelectMenu('menu3')
    router.push('/pricing_payment')
  }

  const goNotiPage = () => {
    setSelectMenu('menu4')
    router.push('/pricing_payment')
  }

  return (
    <Navbar expand="lg" className={styles.content}>
      <div className="col-1"></div>
      <Container className={styles.maxWidth + ' col-10'}>
        <Navbar.Brand>
          <Image
            src={Logo}
            width='200'
            height='36'
            onClick={() => goHomePage()}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto h-100">
            <div
              className={selectMenu == 'menu1' ? styles.focusMenu : styles.menu}
              onClick={() => goHomePage()}
            >
              <Nav.Link>
                ภาพรวม
              </Nav.Link>
            </div>
            {/* <div
              className={selectMenu == 'menu2' ? styles.focusMenu : styles.menu}
              onClick={() => goAccountPage()}
            >
              <Nav.Link>
                บัญชีและความปลอดภัย
              </Nav.Link>
            </div> */}
            <div
              className={selectMenu == 'menu3' ? styles.focusMenu : styles.menu}
              onClick={() => goPricingPage()}
            >
              <Nav.Link>
                ราคาและการชำระเงิน
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu4' ? styles.focusMenu : styles.menu}
              onClick={() => goNotiPage()}
            >
              <Nav.Link>
              แจ้งเตือนและข่าวสาร
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu5' ? styles.focusMenu : styles.menu}
              onClick={() => window.location.assign(process.env.NEXT_PUBLIC_ENDPOINT_PUBLIC)}
            >
              <Nav.Link>
                เว็บไซต์หลัก
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="justify-content-end" >
            <Nav.Item>
              <div onClick={() => setShowAccount(true)}>
                <Nav.Link>
                  <img className={styles.profileImg} src={auth.currentUser.photoURL} width={28} height={28} />
                </Nav.Link>
              </div>
              {showAccount ?
                <AccountMenu setShowAccount={setShowAccount} setSelectMenu={setSelectMenu} user={user} setUser={setUser} />
                :
                <></>
              }
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="col-1"></div>
    </Navbar>
  )
}