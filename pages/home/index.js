import Link from 'next/link'

export default function Home(props) {
  const user = props.extraData

  return (
    <div>
      <h1>Home</h1>
      <Link href={user ? "/test" : "/login"}>
        <a>บริการให้คำปรึกษา</a>
      </Link>
    </div>
  )
}