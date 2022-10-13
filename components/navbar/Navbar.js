import { useEffect, useState } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"

import styles from './navbar.module.css'
import Image from 'next/image'
import { useRouter } from "next/router"

import AccountMenu from "./accountMenu/AccountMenu"

import Logo from '../../assets/logo/lawlivery_app.svg'

export default function NavBar({ user, setUser }) {
  const [selectMenu, setSelectMenu] = useState('menu1')
  const [showAccount, setShowAccount] = useState(false)
  const [pf, setPf] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (user.data().displayName.split(" ").length > 1) {
        setPf(user.data().displayName.split(" ")[0][0] + user.data().displayName.split(" ")[1][0])
      } else {
        setPf(user.data().displayName.split(" ")[0][0])
      }
    }
  }, [user])

  useEffect(() => {
    if (router.pathname.includes('/account_security')) {
      setSelectMenu('menu2')
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

  const goPaymentDetailsPage = () => {
    setSelectMenu('menu3')
    router.push('/payment_details')
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
            <div
              className={selectMenu == 'menu2' ? styles.focusMenu : styles.menu}
              onClick={() => goAccountPage()}
            >
              <Nav.Link>
                บัญชีและความปลอดภัย
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu3' ? styles.focusMenu : styles.menu}
              onClick={() => goPaymentDetailsPage()}
            >
              <Nav.Link>
                ราคาและการชำระเงิน
              </Nav.Link>
            </div>
            <div
              className={selectMenu == 'menu4' ? styles.focusMenu : styles.menu}
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
                  <div className={styles.profileImg}>{pf}</div>
                </Nav.Link>
              </div>
              {showAccount ?
                <AccountMenu setShowAccount={setShowAccount} user={user} setUser={setUser} />
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