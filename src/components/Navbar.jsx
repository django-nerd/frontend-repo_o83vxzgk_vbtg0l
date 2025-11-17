import { useEffect, useState } from 'react'
import { Menu as MenuIcon, Phone, MapPin } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
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
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        <a href="#" className="font-extrabold tracking-tight text-xl sm:text-2xl">{info?.name || 'Paprika & Pálinka'}</a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#menu" className="hover:text-amber-300 transition-colors">Menu</a>
          <a href="#about" className="hover:text-amber-300 transition-colors">About</a>
          <a href="#testimonials" className="hover:text-amber-300 transition-colors">Reviews</a>
          <a href="#reserve" className="hover:text-amber-300 transition-colors">Reserve</a>
          <a href="#contact" className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"><Phone size={16}/>{info?.phone || '(+36) 1 234 5678'}</a>
        </nav>
        <button className="md:hidden p-2 rounded border border-white/20" onClick={() => setOpen(!open)} aria-label="Menu">
          <MenuIcon />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/70 text-white">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2 text-sm">
            <a href="#menu" onClick={() => setOpen(false)} className="py-2">Menu</a>
            <a href="#about" onClick={() => setOpen(false)} className="py-2">About</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="py-2">Reviews</a>
            <a href="#reserve" onClick={() => setOpen(false)} className="py-2">Reserve</a>
            <a href="#contact" onClick={() => setOpen(false)} className="py-2 inline-flex items-center gap-2"><MapPin size={16}/> {info?.address || 'Budapest'}</a>
          </div>
        </div>
      )}
    </header>
  )
}
