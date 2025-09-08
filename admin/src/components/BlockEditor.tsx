import { useState } from 'react'
import { MediaPicker } from './MediaPicker'

export type Block = { id?: number; section_id: number; type: string; content?: string; media_asset_id?: number | null; order_index: number }

type Template = { type: string; label: string; fields: { key: string; label: string; placeholder?: string }[] }

const BASE_TEMPLATES: Template[] = [
  { type: 'text', label: 'Text', fields: [ { key: 'text', label: 'Text', placeholder: 'Paragraph text' } ] },
  { type: 'cta', label: 'Call To Action', fields: [ { key: 'title', label: 'Title' }, { key: 'button', label: 'Button Text' }, { key: 'href', label: 'Link' } ] },
  { type: 'card', label: 'Card', fields: [ { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }, { key: 'image', label: 'Image URL' } ] },
  { type: 'list', label: 'List', fields: [ { key: 'items', label: 'Items (comma separated)' } ] },
]

const SOLUTIONS_TEMPLATES: Template[] = [
  { type: 'case_study', label: 'Case Study', fields: [ { key: 'company', label: 'Company' }, { key: 'logo', label: 'Logo URL' }, { key: 'summary', label: 'Summary' }, { key: 'result', label: 'Result' } ] },
]

const SERVICES_TEMPLATES: Template[] = [
  { type: 'pricing_plan', label: 'Pricing Plan', fields: [ { key: 'name', label: 'Plan Name' }, { key: 'price', label: 'Price' }, { key: 'cycle', label: 'Billing Cycle (mo/yr)' }, { key: 'features', label: 'Features (comma separated)' }, { key: 'cta', label: 'CTA Text' } ] },
  { type: 'pricing_tier', label: 'Pricing Tier', fields: [ { key: 'title', label: 'Title' }, { key: 'price', label: 'Price' }, { key: 'badge', label: 'Badge (e.g., Popular)' }, { key: 'features', label: 'Features (comma separated)' } ] },
]

const STUDENTS_TEMPLATES: Template[] = [
  { type: 'student_project', label: 'Student Project', fields: [ { key: 'title', label: 'Title' }, { key: 'tech', label: 'Tech' }, { key: 'link', label: 'Link' } ] },
]

const PRODUCTS_TEMPLATES: Template[] = [
  { type: 'product_card', label: 'Product Card', fields: [ { key: 'name', label: 'Name' }, { key: 'price', label: 'Price' }, { key: 'image', label: 'Image URL' } ] },
  { type: 'gallery', label: 'Gallery', fields: [ { key: 'images', label: 'Images (comma separated URLs)' } ] },
]

function fieldsToContentJSON(type: string, values: Record<string, string>): string {
  return JSON.stringify({ type, ...values })
}

function contentToValues(content?: string): Record<string, string> {
  if (!content) return {}
  try { const obj = JSON.parse(content); delete (obj as any).type; return obj } catch { return {} }
}

export function BlockEditor({ blocks, onCreate, onUpdate, onDelete, pageKind }: {
  blocks: Block[]
  onCreate: (data: Omit<Block, 'id'>) => Promise<void>
  onUpdate: (id: number, data: Partial<Block>) => Promise<void>
  onDelete: (id: number) => Promise<void>
  pageKind?: 'solutions' | 'services' | 'students' | 'products'
}) {
  const EXTRA = pageKind === 'solutions' ? SOLUTIONS_TEMPLATES
    : pageKind === 'services' ? SERVICES_TEMPLATES
    : pageKind === 'students' ? STUDENTS_TEMPLATES
    : pageKind === 'products' ? PRODUCTS_TEMPLATES
    : []
  const TEMPLATES = [...BASE_TEMPLATES, ...EXTRA]
  const [newType, setNewType] = useState(TEMPLATES[0].type)
  const template = TEMPLATES.find(t => t.type === newType)!
  const [newValues, setNewValues] = useState<Record<string, string>>({})

  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerField, setPickerField] = useState<{ blockId?: number; field?: string } | null>(null)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MediaPicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={async (url) => {
          if (!pickerField) return
          if (!pickerField.blockId) {
            const content = fieldsToContentJSON(newType, { ...newValues, [pickerField.field || 'image']: url })
            setNewValues({ ...newValues, [pickerField.field || 'image']: url })
          } else {
            const blk = blocks.find(b => b.id === pickerField.blockId)
            if (!blk) return
            const vals = contentToValues(blk.content)
            const updated = { ...vals, [pickerField.field || 'image']: url }
            await onUpdate(blk.id!, { content: fieldsToContentJSON(blk.type, updated) })
          }
          setPickerField(null)
        }}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select value={newType} onChange={(e) => setNewType(e.target.value)} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}>
          {TEMPLATES.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
        </select>
        {template.fields.map(f => (
          <div key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input placeholder={f.placeholder || f.label} value={newValues[f.key] || ''} onChange={(e) => setNewValues({ ...newValues, [f.key]: e.target.value })} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
            {(f.key.toLowerCase().includes('image') || f.key.toLowerCase().includes('logo')) && (
              <button className="btn secondary" type="button" onClick={() => { setPickerField({ field: f.key }); setPickerOpen(true) }}>Pick</button>
            )}
          </div>
        ))}
        <button className="btn" onClick={async () => {
          const content = fieldsToContentJSON(newType, newValues)
          await onCreate({ section_id: blocks[0]?.section_id || 0, type: newType, content, media_asset_id: null, order_index: blocks.length })
          setNewValues({})
        }}>Add</button>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {blocks.map(b => {
          const tpl = TEMPLATES.find(t => t.type === b.type)
          const vals = contentToValues(b.content)
          return (
            <div key={b.id} className="card" style={{ background: 'transparent' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <strong>{tpl?.label || b.type}</strong>
                {(tpl?.fields || []).map(f => (
                  <div key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input defaultValue={vals[f.key] || ''} placeholder={f.label} onBlur={async (e) => {
                      const updated = { ...vals, [f.key]: e.target.value }
                      await onUpdate(b.id!, { content: fieldsToContentJSON(b.type, updated) })
                    }} style={{ padding: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
                    {(f.key.toLowerCase().includes('image') || f.key.toLowerCase().includes('logo')) && (
                      <button className="btn secondary" type="button" onClick={() => { setPickerField({ blockId: b.id!, field: f.key }); setPickerOpen(true) }}>Pick</button>
                    )}
                  </div>
                ))}
                <button className="btn danger" onClick={() => onDelete(b.id!)}>Delete</button>
              </div>
              {b.type === 'gallery' && vals.images && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginTop: 8 }}>
                  {(vals.images as string).split(',').map((u: string, idx: number) => (
                    <img key={idx} src={u.trim()} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />
                  ))}
                </div>
              )}
              {b.type === 'case_study' && vals.logo && (
                <div style={{ marginTop: 8 }}>
                  <img src={(vals.logo as string)} style={{ height: 40 }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


