export default function Footer({ info }){
  return (
    <footer id="contact" className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg">{info?.name || 'Paprika & Pálinka'}</h3>
          <p className="text-stone-300 mt-2">{info?.tagline || 'Authentic Hungarian flavors'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-amber-400">Visit us</h4>
          <p className="text-stone-300 mt-2">{info?.address || '60 Andrassy Ave'}</p>
          <p className="text-stone-300">{info?.city || 'Budapest'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-amber-400">Contact</h4>
          <p className="text-stone-300 mt-2">{info?.phone || '(+36) 1 234 5678'}</p>
          <p className="text-stone-300">{info?.email || 'hello@paprikapalinka.hu'}</p>
        </div>
      </div>
      <div className="text-center text-stone-400 mt-6 text-sm">© {new Date().getFullYear()} Paprika & Pálinka</div>
    </footer>
  )
}
