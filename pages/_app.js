import LayoutHome from "../components/layout/Layout_Home"
import Layout from "../components/layout/Layout"

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../config/firebase"

const auth = getAuth()

export default function _app({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (user && router.pathname == '/') {
      router.push('/home/caselist')
    }
  }, [router])

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, userData => {
      if (userData) {
        getDoc(doc(firestore, 'users', userData.uid)).then(userRef => {
          setUser(userRef)
          console.log(userRef.data());
          setLoading(false)
        })
      } else {
        if (!(router.pathname.includes('/verification') || router.pathname.includes('/register'))) {
          router.replace('/login')
        }
        setLoading(false)
      }
    })
  }, [])

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