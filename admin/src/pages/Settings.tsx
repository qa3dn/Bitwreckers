import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { Layout } from '../components/Layout'

type Setting = { id: number; key: string; value?: string }

export function SettingsPage() {
  const [items, setItems] = useState<Setting[]>([])
  const [keyName, setKeyName] = useState('')
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try { setItems(await apiFetch<Setting[]>('/admin/settings', { auth: true })) } catch (e: any) { setError(e.message) }
  }
  useEffect(() => { load() }, [])

  async function create() {
    try { await apiFetch('/admin/settings', { method: 'POST', body: { key: keyName, value }, auth: true }); setKeyName(''); setValue(''); await load() } catch (e: any) { setError(e.message) }
  }
  async function update(id: number, newValue: string) {
    try { await apiFetch(`/admin/settings/${id}`, { method: 'PUT', body: { value: newValue }, auth: true }); await load() } catch (e: any) { setError(e.message) }
  }
  async function remove(id: number) { try { await apiFetch(`/admin/settings/${id}`, { method: 'DELETE', auth: true }); await load() } catch (e: any) { setError(e.message) } }

  return (
    <Layout>
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Add Setting</h2>
        {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
        <div style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
          <input placeholder="Key" value={keyName} onChange={(e) => setKeyName(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <button className="btn" onClick={create}>Add</button>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Key</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Value</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(s => (
              <tr key={s.id}>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{s.key}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>
                  <input defaultValue={s.value || ''} onBlur={(e) => update(s.id, e.target.value)} style={{ padding: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                </td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>
                  <button className="btn danger" onClick={() => remove(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


