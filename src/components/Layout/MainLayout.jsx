import HeaderNav from '../Navbar/HeaderNav'

export default function MainLayout({ children }) {
  return (
    <>
      <HeaderNav />

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-1 mx-auto">{children}</div>
      </section>
    </>
  )
}
