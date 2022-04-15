import { useState } from 'react';
import styles from './login.module.css'
import { Form, Button } from 'react-bootstrap'

import { Google } from 'react-bootstrap-icons'

import { useRouter } from "next/router"

import { firebase } from '../../config/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider()

export default function Login(props) {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const submit = () => {
    console.log('test');
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      router.push('/')
    }).catch(error => {
      
    })
  }

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        onSubmit={() => submit()}
      >
        <div className={styles.titleLogin}>LOGIN</div>
        <Form.Control
          className={styles.input}
          required
          type="text"
          aria-describedby="passwordHelpBlock"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='USERNAME'
        />
        <Form.Control
          className={styles.input}
          required
          type="password"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='PASSWORD'
        />
        <Button
          className={styles.btnSubmit}
          type='submit'
        >
          LOGIN
        </Button>
        <div className={styles.forget}><a className={styles.fotgotText}>Forgot password?</a></div>
        <div>
          <Button
            className={styles.btnGoogle}
            variant="outline-dark"
            onClick={() => loginWithGoogle()}
          >
            <Google className={styles.googleLogo} />
            <div className={styles.googleText}>LOGIN WITH GOOGLE</div>
          </Button>
        </div>
      </Form>
    </div>
  )
}