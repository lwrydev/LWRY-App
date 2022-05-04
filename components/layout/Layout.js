import Footer from '../footer/Footer'

export default function Layout({ user, setUser, children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}