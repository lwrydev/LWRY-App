import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Layout from "../components/Layout"

import 'bootstrap/dist/css/bootstrap.min.css'

import { firebase } from "../config/firebase"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

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

  return (
    <Layout >
      <Component {...pageProps} user={user} />
    </Layout>
  )
}