import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { Layout } from '../components/Layout'

type Media = { id: number; url: string; type: string; alt_text?: string }

export function MediaPage() {
  const [items, setItems] = useState<Media[]>([])
  const [url, setUrl] = useState('')
  const [type, setType] = useState('image')
  const [alt, setAlt] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      const data = await apiFetch<Media[]>('/admin/media', { auth: true })
      setItems(data)
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [])

  async function create() {
    try {
      await apiFetch<Media>('/admin/media', { method: 'POST', body: { url, type, alt_text: alt }, auth: true })
      setUrl(''); setAlt('');
      await load()
    } catch (e: any) { setError(e.message) }
  }

  async function upload() {
    if (!file) return
    try {
      const form = new FormData()
      form.append('file', file)
      const token = localStorage.getItem('bw_access_token')
      const res = await fetch(((import.meta as any).env.VITE_API_BASE || 'http://localhost:8000/api/v1') + '/admin/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: form,
      })
      if (!res.ok) throw new Error(await res.text())
      await load()
      setFile(null)
    } catch (e: any) { setError(e.message) }
  }

  async function remove(id: number) {
    try { await apiFetch(`/admin/media/${id}`, { method: 'DELETE', auth: true }); await load() } catch (e: any) { setError(e.message) }
  }

  return (
    <Layout>
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Add Media</h2>
        {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
        <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
          <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input placeholder="Type (image, video, file)" value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input placeholder="Alt text" value={alt} onChange={(e) => setAlt(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <button className="btn" onClick={create}>Add</button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button className="btn" onClick={upload}>Upload</button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Media Library</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {items.map(m => (
            <div key={m.id} className="card" style={{ background: 'transparent' }}>
              <div style={{ fontWeight: 600 }}>{m.type}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{m.url}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{m.alt_text}</div>
              <button className="btn danger" onClick={() => remove(m.id)} style={{ marginTop: 8 }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


