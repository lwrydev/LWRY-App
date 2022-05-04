import { useEffect } from "react"
import styles from './home.module.css'
import { useRouter } from "next/router"

export default function Home({ user }) {

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user])

  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.nameTitle}>ยินดีต้อนรับสู่บัญชีของคุณ, {user ? user.displayName : ''}</div>
    </div>
  )
}