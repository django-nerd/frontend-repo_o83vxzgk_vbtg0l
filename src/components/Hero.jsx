export default function Hero({ info }) {
  const bg = info?.hero_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop'
  return (
    <section className="relative h-[80vh] w-full" id="home">
      <img src={bg} alt="Hungarian cuisine" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">{info?.name || 'Paprika & Pálinka'}</h1>
          <p className="mt-4 text-lg sm:text-2xl text-amber-200/90">{info?.tagline || 'Authentic Hungarian flavors in the heart of the city'}</p>
          <a href="#reserve" className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded shadow transition">Reserve a Table</a>
        </div>
      </div>
    </section>
  )
}
