import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { Layout } from '../components/Layout'

type NavItem = { id: number; label: string; href: string; order_index: number; is_visible: boolean; location: string }

export function NavigationPage() {
  const [items, setItems] = useState<NavItem[]>([])
  const [form, setForm] = useState<Partial<NavItem>>({ label: '', href: '', order_index: 0, is_visible: true, location: 'main' })
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try { setItems(await apiFetch<NavItem[]>('/admin/navigation', { auth: true })) } catch (e: any) { setError(e.message) }
  }
  useEffect(() => { load() }, [])

  async function create() {
    try { await apiFetch('/admin/navigation', { method: 'POST', body: form, auth: true }); setForm({ label: '', href: '', order_index: 0, is_visible: true, location: 'main' }); await load() } catch (e: any) { setError(e.message) }
  }
  async function remove(id: number) { try { await apiFetch(`/admin/navigation/${id}`, { method: 'DELETE', auth: true }); await load() } catch (e: any) { setError(e.message) } }

  return (
    <Layout>
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Add Navigation Item</h2>
        {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
        <div style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
          <input placeholder="Label" value={form.label || ''} onChange={(e) => setForm({ ...form, label: e.target.value })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input placeholder="Href" value={form.href || ''} onChange={(e) => setForm({ ...form, href: e.target.value })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input placeholder="Order" type="number" value={form.order_index || 0} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}>
            <option value="main">main</option>
            <option value="footer">footer</option>
          </select>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={!!form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} /> Visible
          </label>
          <button className="btn" onClick={create}>Add</button>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Navigation</h2>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Label</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Href</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Order</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Location</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Visible</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{it.label}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{it.href}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{it.order_index}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{it.location}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{it.is_visible ? 'Yes' : 'No'}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>
                  <button className="btn danger" onClick={() => remove(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


