import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { apiFetch } from '../lib/api'
import { ensurePage } from '../lib/pages'
import { BlockEditor, Block } from '../components/BlockEditor'

type Section = { id: number; page_id: number; key: string; heading?: string; subheading?: string; order_index: number }

export function ProductsPage() {
  const [page, setPage] = useState<any>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [blocks, setBlocks] = useState<Record<number, Block[]>>({})

  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    (async () => {
      try {
        const p = await ensurePage('products', 'Products')
        setPage(p)
        const secs = await apiFetch<Section[]>(`/admin/sections?page_id=${p.id}`, { auth: true })
        setSections(secs)
        const b: Record<number, Block[]> = {}
        for (const s of secs) b[s.id] = await apiFetch<Block[]>(`/admin/blocks?section_id=${s.id}`, { auth: true })
        setBlocks(b)
      } catch (e: any) { setError(e.message) }
    })()
  }, [])

  if (!page) return <Layout>{error ? (<div><div style={{ color: '#fca5a5' }}>{error}</div><a href="/login" className="btn" style={{ marginTop: 12, display: 'inline-block' }}>Go to Login</a></div>) : 'Loading...'}</Layout>

  return (
    <Layout>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Products Page</h1>
        <button className="btn" onClick={async () => {
          const created = await apiFetch<Section>(`/admin/sections`, { method: 'POST', body: { page_id: page.id, key: 'products-hero', order_index: sections.length }, auth: true })
          setSections([...(sections || []), created])
        }}>Add Section</button>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {sections.map(sec => (
            <div key={sec.id} className="card" style={{ background: 'transparent' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <strong>{sec.key}</strong>
                <input defaultValue={sec.heading || ''} placeholder="Heading" onBlur={(e) => apiFetch(`/admin/sections/${sec.id}`, { method: 'PUT', body: { heading: e.target.value }, auth: true })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
              </div>
              <div style={{ marginTop: 8 }}>
                <BlockEditor
                  blocks={blocks[sec.id] || []}
                  onCreate={async (data) => { await apiFetch(`/admin/blocks`, { method: 'POST', body: { ...data, section_id: sec.id }, auth: true }); const updated = await apiFetch<Block[]>(`/admin/blocks?section_id=${sec.id}`, { auth: true }); setBlocks({ ...blocks, [sec.id]: updated }) }}
                  onUpdate={async (id, data) => { await apiFetch(`/admin/blocks/${id}`, { method: 'PUT', body: data, auth: true }) }}
                  onDelete={async (id) => { await apiFetch(`/admin/blocks/${id}`, { method: 'DELETE', auth: true }); const updated = await apiFetch<Block[]>(`/admin/blocks?section_id=${sec.id}`, { auth: true }); setBlocks({ ...blocks, [sec.id]: updated }) }}
                  pageKind="products"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


