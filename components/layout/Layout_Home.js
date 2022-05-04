import NavBar from "../navbar/Navbar"

export default function LayoutHome({ user, setUser, children }) {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>{children}</main>
    </>
  )
}