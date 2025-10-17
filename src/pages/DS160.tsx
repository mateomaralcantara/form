// src/pages/DS160.tsx
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Section } from '../data/ds160'
import { DS160_SECTIONS } from '../data/ds160'
import FormField from '../components/FormField'
import { exportDs160Pdf } from '../lib/pdf'
import Instructivo from '../components/Instructivo' // 👈 añadido

type DraftState = Record<string, any>

export default function DS160() {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState<DraftState>({})

  const section = useMemo<Section>(() => DS160_SECTIONS[sectionIndex], [sectionIndex])

  // Carga/Auto-guardado local
  useEffect(() => {
    const saved = localStorage.getItem('fp_ds160_draft')
    if (saved) {
      try { setDraft(JSON.parse(saved)) } catch {}
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('fp_ds160_draft', JSON.stringify(draft))
  }, [draft])

  function updateField(name: string, value: any) {
    setDraft(prev => ({ ...prev, [name]: value }))
  }

  // ---------- UTIL: Exportar PDF
  function handleExportPdf() {
    const fileSafe = (s: any) => (String(s || '').trim().replace(/\s+/g, '_') || 'sin_nombre')
    const nombre = fileSafe(draft['nombres'])
    const apellidos = fileSafe(draft['apellidos'])
    const fileName = `ds160_${apellidos}_${nombre}.pdf`

    exportDs160Pdf(draft, {
      fileName,
      title: 'FORM Premium — DS-160 (RD) — Preguntas y Respuestas',
      meta: {
        Nombre: draft['nombres'],
        Apellidos: draft['apellidos'],
        Pasaporte: draft['numeroPasaporte'],
        Cédula: draft['cedula'],
      },
    })
  }

  // ---------- GUARDAR EN SUPABASE (+ descarga automática)
  async function guardarEnSupabase() {
    setSaving(true)
    try {
      // ⚠️ Evitamos .select() para no forzar return=representation (que choca con RLS).
      // Algunas versiones de supabase-js no tipan 'returning', así que casteamos el options a any.
      const { error } = await supabase
        .from('form_responses')
        // @ts-expect-error for older supabase-js types
        .insert([{ form_key: 'ds160-do', data: draft }], { returning: 'minimal' } as any)

      if (error) throw error

      alert('✅ Guardado en Supabase.')
      handleExportPdf() // descarga automática
    } catch (e: any) {
      const msg = e?.message || e?.error_description || e?.hint || 'desconocido'
      console.error('Error guardando en Supabase:', e)
      if (String(msg).includes('schema cache') || e?.code === 'PGRST205') {
        alert('Error guardando: el esquema REST no está actualizado. En Supabase ejecuta: notify pgrst, \'reload schema\'; y verifica en Settings → API que "public" esté expuesto.')
      } else {
        alert('Error guardando: ' + msg)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
              <div>
                <h2 style={{margin:'4px 0'}}>DS-160 (RD) — Borrador</h2>
                <p className="muted" style={{marginTop:4}}>
                  Campos 100% opcionales{' '}
                  <a href="https://ceac.state.gov/CEAC" target="_blank" rel="noreferrer">
                    (el envío oficial es en CEAC)
                  </a>.
                </p>
              </div>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                <button
                  className="btn"
                  onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
                  disabled={sectionIndex === 0}
                >
                  Atrás
                </button>
                <button
                  className="btn"
                  onClick={() => setSectionIndex(Math.min(DS160_SECTIONS.length - 1, sectionIndex + 1))}
                  disabled={sectionIndex === DS160_SECTIONS.length - 1}
                >
                  Siguiente
                </button>

                {/* Opción 2 (AUTOMÁTICA): Guardar + descargar PDF */}
                <button className="btn success" onClick={guardarEnSupabase} disabled={saving}>
                  {saving ? 'Guardando…' : 'Guardar (y descargar PDF)'}
                </button>

                {/* Opción 1 (MANUAL): Solo descargar PDF sin guardar */}
                <button className="btn" onClick={handleExportPdf}>
                  Descargar PDF
                </button>
              </div>
            </div>

            {/* 👇 Instructivo arriba del formulario */}
            <Instructivo />

            <div style={{marginTop:18}}>
              <div className="section-title">{section.title}</div>
              {section.description && <p className="muted">{section.description}</p>}
              <div className="row" style={{marginTop:12}}>
                {section.fields.map(f => (
                  <FormField
                    key={f.name}
                    field={f as any}
                    value={draft[f.name]}
                    onChange={updateField}
                  />
                ))}
              </div>
            </div>

            <details style={{marginTop:18}}>
              <summary className="muted">Ver JSON del borrador (local)</summary>
              <pre style={{whiteSpace:'pre-wrap', overflowX:'auto'}}>{JSON.stringify(draft, null, 2)}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
