import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

type Page = { id: number; slug: string; title: string; is_published: boolean }

export function Dashboard() {
  const [pages, setPages] = useState<Page[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<Page[]>('/admin/pages', { auth: true })
      .then(setPages)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <Layout>
      <div className="grid cols-2">
        <div className="stat">
          <div style={{ opacity: 0.8 }}>Pages</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{pages.length}</div>
        </div>
        <div className="stat">
          <div style={{ opacity: 0.8 }}>Published</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{pages.filter(p => p.is_published).length}</div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Pages</h2>
          <Link to="/pages/new" className="btn">New Page</Link>
        </div>
        {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>ID</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Title</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Slug</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Published</th>
              <th style={{ borderBottom: '1px solid var(--border)', padding: 8, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id}>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{p.id}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{p.title}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{p.slug}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>{p.is_published ? 'Yes' : 'No'}</td>
                <td style={{ borderBottom: '1px solid var(--border)', padding: 8 }}>
                  <Link to={`/pages/${p.id}`} style={{ color: 'var(--primary)' }}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


