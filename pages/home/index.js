import Link from "next/link"
import { Button } from "react-bootstrap"
import styles from './home.module.css'

export default function Home({ user }) {
  return (
    <div className={styles.container}>
      <Button href={user ? '/initconsulting' : '/login'} variant="outline-primary">บริการให้คำปรึกษาเบื้องต้น V 12.5403</Button>
    </div>
  )
}