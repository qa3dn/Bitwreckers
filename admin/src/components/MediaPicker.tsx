import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

type Media = { id: number; url: string; type: string; alt_text?: string }

export function MediaPicker({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (url: string) => void }) {
  const [items, setItems] = useState<Media[]>([])
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return
    (async () => {
      try { setItems(await apiFetch<Media[]>('/admin/media', { auth: true })) } catch (e: any) { setError(e.message) }
    })()
  }, [isOpen])

  if (!isOpen) return null

  const filtered = items.filter(i => i.url.toLowerCase().includes(query.toLowerCase()) || (i.alt_text || '').toLowerCase().includes(query.toLowerCase()))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div className="card" style={{ width: '90%', maxWidth: 900, maxHeight: '80%', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Select Media</h3>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
        <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', marginBottom: 12 }} />
        {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {filtered.map(m => (
            <div key={m.id} className="card" style={{ background: 'transparent', cursor: 'pointer' }} onClick={() => { onSelect(m.url); onClose() }}>
              {m.url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i) ? (
                <img src={m.url} alt={m.alt_text || ''} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
              ) : (
                <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>{m.type}</div>
              )}
              <div style={{ fontSize: 12, marginTop: 6, wordBreak: 'break-all' }}>{m.alt_text || m.url}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


