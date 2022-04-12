import { useEffect, useState } from "react";

import { firestore } from "../../config/firebase"
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";

import Home from "../home";

const auth = getAuth();

export default function MainContainer(props) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribAuth = onAuthStateChanged(auth, onAuthChanged)
    return () => unsubscribAuth()
  }, [])

  function onAuthChanged(userDoc) {
    if (userDoc) {
      setUser(userDoc)
      /*getDoc(doc(firestore, 'users', userDoc.uid)).then(data => {
        setUser(data.data())
      })*/
    } else {
      
    }
  }

  return (
    <Home extraData={{name: ''}}/>
  )
}