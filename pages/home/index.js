import Link from 'next/link'

export default function Home(props) {
  const user = props.extraData.name

  return (
    <div>
      <h1>Home</h1>
      <Link href={user ? "/test" : "/login"}>
        <Button variant="contained">บริการให้คำปรึกษา</Button>
      </Link>
    </div>
  )
}