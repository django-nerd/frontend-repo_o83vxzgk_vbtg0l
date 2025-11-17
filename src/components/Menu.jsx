import { useEffect, useState, useMemo } from 'react'

export default function Menu() {
  const [menu, setMenu] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/menu`)
        const data = await res.json()
        setMenu(data)
      } catch {}
    }
    load()
  }, [])

  const categories = useMemo(() => ['All', ...Array.from(new Set(menu.map(m => m.category)))], [menu])
  const filtered = useMemo(() => filter === 'All' ? menu : menu.filter(m => m.category === filter), [menu, filter])

  return (
    <section id="menu" className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-800">Our Menu</h2>
        <p className="text-stone-600 mt-2">Classic Hungarian dishes prepared with love.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm border ${filter===c? 'bg-amber-500 border-amber-500 text-black' : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow border border-stone-200 overflow-hidden">
              {item.image && <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <p className="text-sm text-stone-600 mt-1">{item.description}</p>
                  </div>
                  <span className="font-semibold text-amber-600">€{item.price.toFixed(2)}</span>
                </div>
                {item.vegetarian && <span className="inline-block mt-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Vegetarian</span>}
                {item.spicy && <span className="inline-block mt-3 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded ml-2">Spicy</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
