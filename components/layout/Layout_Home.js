import NavBar from "../navbar/Navbar"
import Footer from "../footer/Footer"

export default function LayoutHome({ user, setUser, children }) {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>{children}</main>
      <Footer user={user} setUser={setUser} />
    </>
  )
}