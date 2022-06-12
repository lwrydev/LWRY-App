import LayoutHome from "../components/layout/Layout_Home"
import Layout from "../components/layout/Layout"

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import "../config/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const auth = getAuth()

export default function _app({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      setUser(userData)
      console.log(userData);
      setLoading(false)
    })
  }, [user])

  return (
    <>
      {loading
        ?
        <></>
        :
        <>
          {!user || (router.pathname.includes('/login') || router.pathname.includes('/register') || router.pathname.includes('/verification'))
            ?
            <Layout user={user} setUser={setUser} >
              <Component {...pageProps} user={user} setUser={setUser} />
            </Layout>
            :
            <LayoutHome user={user} setUser={setUser} >
              <Component {...pageProps} user={user} setUser={setUser} />
            </LayoutHome>
          }
        </>
      }
    </>
  )
}