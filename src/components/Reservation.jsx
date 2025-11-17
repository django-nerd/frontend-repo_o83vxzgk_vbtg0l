import { useState } from 'react'

export default function Reservation(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', date:'', time:'', party_size:2, notes:'' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(res.ok){
        setStatus('Reservation received! We will confirm by email shortly.')
        setForm({ name:'', email:'', phone:'', date:'', time:'', party_size:2, notes:'' })
      } else {
        setStatus(data.detail || 'Something went wrong')
      }
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <section id="reserve" className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-800">Reserve a Table</h2>
        <form onSubmit={submit} className="mt-6 grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl border border-stone-200 shadow">
          <input className="border border-stone-300 rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="border border-stone-300 rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="border border-stone-300 rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border border-stone-300 rounded px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required />
            <input type="time" className="border border-stone-300 rounded px-3 py-2" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">Party size</label>
            <input type="number" min={1} max={20} className="border w-full border-stone-300 rounded px-3 py-2" value={form.party_size} onChange={e=>setForm({...form, party_size:Number(e.target.value)})} required />
          </div>
          <textarea className="md:col-span-2 border border-stone-300 rounded px-3 py-2" rows={4} placeholder="Notes (allergies, occasion, etc.)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
          <div className="md:col-span-2 flex items-center gap-3">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded transition" type="submit">Submit</button>
            {status && <p className="text-sm text-stone-600">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
