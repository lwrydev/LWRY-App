import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../config/firebase"

const auth = getAuth()

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        getDoc(doc(firestore, 'users', auth.currentUser.uid)).then(userRef => {
            if (userRef) {
                resolve(userRef)
            } else{
                reject("User not found.")
            }
        })
    })
}