import { useEffect, useState } from 'react'

export default function Testimonials(){
  const [items, setItems] = useState([])
  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/testimonials`)
        const data = await res.json()
        setItems(data)
      } catch {}
    }
    load()
  }, [])

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-800">What Guests Say</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="rounded-xl border border-stone-200 shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800">{t.name?.[0] || 'G'}</div>
                <div>
                  <p className="font-semibold text-stone-800">{t.name}</p>
                  <p className="text-amber-600 text-sm">{'★'.repeat(t.rating || 5)}</p>
                </div>
              </div>
              <p className="text-stone-600 mt-3">{t.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
