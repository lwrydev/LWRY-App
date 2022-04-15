import { Navbar, Container, Nav } from "react-bootstrap"
import { useRouter } from "next/router"

import { firebase } from '../config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react"

import styles from './navbar.module.css'

const auth = getAuth()

export default function NavBar() {
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, callbackAuth)
  }, [])

  const callbackAuth = (userDoc) => {
    if (userDoc) {
      setUser(userDoc)
    } else {
      setUser(null)
    }
  }

  const signOut = () => {
    console.log('sign out');
    auth.signOut().then(() => {
      router.push('/login')
    })
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LAWLIVERY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link >ABOUT</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" activeKey="/home">
            {user ?
              <></>
              :
              <Nav.Item>
                <Nav.Link href="/login">LOGIN</Nav.Link>
              </Nav.Item>
            }
            <Nav.Item>
              {user ?
                <Nav.Link
                  onClick={() => signOut()}
                >
                  <div className={styles.signoutText}>
                    SIGN OUT
                  </div>
                </Nav.Link>
                :
                <Nav.Link eventKey="link-1" className="">SIGN UP</Nav.Link>
              }
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}