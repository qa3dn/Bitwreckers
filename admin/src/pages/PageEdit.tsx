import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'

type Page = { id: number; slug: string; title: string; description?: string; is_published: boolean }
type Section = { id: number; page_id: number; key: string; heading?: string; subheading?: string; order_index: number }
type Block = { id: number; section_id: number; type: string; content?: string; media_asset_id?: number; order_index: number }

export function PageEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pageId = Number(id)
  const [page, setPage] = useState<Page | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [blocksBySection, setBlocksBySection] = useState<Record<number, Block[]>>({})

  useEffect(() => {
    if (!pageId) return
    apiFetch<Page>(`/admin/pages/${pageId}`, { auth: true })
      .then(setPage)
      .catch((e) => setError(e.message))
    apiFetch<Section[]>(`/admin/sections?page_id=${pageId}`, { auth: true }).then(setSections)
    ;(async () => {
      const sec = await apiFetch<Section[]>(`/admin/sections?page_id=${pageId}`, { auth: true })
      const m: Record<number, Block[]> = {}
      for (const s of sec) {
        m[s.id] = await apiFetch<Block[]>(`/admin/blocks?section_id=${s.id}`, { auth: true })
      }
      setBlocksBySection(m)
    })()
  }, [pageId])

  async function save() {
    if (!page) return
    try {
      const updated = await apiFetch<Page>(`/admin/pages/${pageId}`, { method: 'PUT', body: page, auth: true })
      setPage(updated)
      alert('Saved')
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function del() {
    try {
      await apiFetch(`/admin/pages/${pageId}`, { method: 'DELETE', auth: true })
      navigate('/')
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (!page) return <Layout>Loading...</Layout>

  return (
    <Layout>
      <div className="card">
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Edit Page</h1>
        {error && <div style={{ color: '#fca5a5', marginBottom: 12 }}>{error}</div>}
        <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
          <label>Title</label>
          <input style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
          <label>Slug</label>
          <input style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} value={page.slug} onChange={(e) => setPage({ ...page, slug: e.target.value })} />
          <label>Description</label>
          <textarea style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} value={page.description || ''} onChange={(e) => setPage({ ...page, description: e.target.value })} />
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={page.is_published} onChange={(e) => setPage({ ...page, is_published: e.target.checked })} /> Published
          </label>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
          <button onClick={save} className="btn">Save</button>
          <button onClick={del} className="btn danger">Delete</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Sections</h2>
        <button className="btn" onClick={async () => {
          await apiFetch<Section>(`/admin/sections`, { method: 'POST', body: { page_id: pageId, key: 'section', order_index: sections.length }, auth: true })
          const updated = await apiFetch<Section[]>(`/admin/sections?page_id=${pageId}`, { auth: true })
          setSections(updated)
        }}>Add Section</button>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {sections.map(sec => (
            <div key={sec.id} className="card" style={{ background: 'transparent' }}>
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                <input defaultValue={sec.key} onBlur={async (e) => { await apiFetch(`/admin/sections/${sec.id}`, { method: 'PUT', body: { key: e.target.value }, auth: true }) }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                <input defaultValue={sec.heading || ''} placeholder="Heading" onBlur={async (e) => { await apiFetch(`/admin/sections/${sec.id}`, { method: 'PUT', body: { heading: e.target.value }, auth: true }) }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                <input defaultValue={sec.subheading || ''} placeholder="Subheading" onBlur={async (e) => { await apiFetch(`/admin/sections/${sec.id}`, { method: 'PUT', body: { subheading: e.target.value }, auth: true }) }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
              </div>
              <div style={{ marginTop: 8 }}>
                <button className="btn danger" onClick={async () => { await apiFetch(`/admin/sections/${sec.id}`, { method: 'DELETE', auth: true }); setSections(sections.filter(s => s.id !== sec.id)) }}>Delete Section</button>
              </div>
              <div style={{ marginTop: 8 }}>
                <h3>Blocks</h3>
                <button className="btn" onClick={async () => { await apiFetch(`/admin/blocks`, { method: 'POST', body: { section_id: sec.id, type: 'text', content: '{}', order_index: (blocksBySection[sec.id]?.length || 0) }, auth: true }); const updated = await apiFetch<Block[]>(`/admin/blocks?section_id=${sec.id}`, { auth: true }); setBlocksBySection({ ...blocksBySection, [sec.id]: updated }) }}>Add Block</button>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  {(blocksBySection[sec.id] || []).map(b => (
                    <div key={b.id} className="card" style={{ background: 'transparent' }}>
                      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                        <input defaultValue={b.type} onBlur={async (e) => { await apiFetch(`/admin/blocks/${b.id}`, { method: 'PUT', body: { type: e.target.value }, auth: true }) }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                        <input defaultValue={b.content || ''} placeholder="Content (JSON)" onBlur={async (e) => { await apiFetch(`/admin/blocks/${b.id}`, { method: 'PUT', body: { content: e.target.value }, auth: true }) }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <button className="btn danger" onClick={async () => { await apiFetch(`/admin/blocks/${b.id}`, { method: 'DELETE', auth: true }); const updated = await apiFetch<Block[]>(`/admin/blocks?section_id=${sec.id}`, { auth: true }); setBlocksBySection({ ...blocksBySection, [sec.id]: updated }) }}>Delete Block</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


