import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

function App() {
  const [info, setInfo] = useState(null)
  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/info`)
        const data = await res.json()
        setInfo(data)
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="bg-white text-stone-800">
      <Navbar />
      <main className="pt-14">
        <Hero info={info} />
        <Menu />
        <section id="about" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
            <div>
              <img src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=1400&auto=format&fit=crop" alt="Interior" className="rounded-xl shadow"/>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold tracking-tight">About Us</h2>
              <p className="mt-4 text-stone-600">We celebrate the rich culinary heritage of Hungary, from hearty gulyásleves to delicate dobos torte. Our chefs source local ingredients and craft each dish with authentic techniques and a touch of modern flair.</p>
              <p className="mt-4 text-stone-600">Enjoy a warm, welcoming atmosphere inspired by Budapest cafes, perfect for family dinners, cozy dates, and special occasions.</p>
            </div>
          </div>
        </section>
        <Testimonials />
        <Reservation />
      </main>
      <Footer info={info} />
    </div>
  )
}

export default App
