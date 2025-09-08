import { useState } from 'react'
import { apiFetch } from '../lib/api'
import { useNavigate } from 'react-router-dom'

type PageCreate = { slug: string; title: string; description?: string; is_published: boolean }

export function PageNew() {
  const navigate = useNavigate()
  const [form, setForm] = useState<PageCreate>({ slug: '', title: '', description: '', is_published: true })
  const [error, setError] = useState<string | null>(null)

  async function create() {
    try {
      const created = await apiFetch<any>('/admin/pages', { method: 'POST', body: form, auth: true })
      navigate(`/pages/${created.id}`)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Create Page</h1>
      {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
      <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
        <label>Title</label>
        <input style={{ padding: 8, border: '1px solid #e5e7eb' }} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <label>Slug</label>
        <input style={{ padding: 8, border: '1px solid #e5e7eb' }} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <label>Description</label>
        <textarea style={{ padding: 8, border: '1px solid #e5e7eb' }} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /> Published
        </label>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button onClick={create} style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', borderRadius: 6 }}>Create</button>
      </div>
    </div>
  )
}


