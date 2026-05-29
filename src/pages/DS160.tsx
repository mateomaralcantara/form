// src/pages/DS160.tsx
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Field, Section } from '../data/ds160'
import { DS160_SECTIONS } from '../data/ds160'
import FormField from '../components/FormField'
import { exportDs160Pdf } from '../lib/pdf'
import Instructivo from '../components/Instructivo'

type DraftState = Record<string, any>

function evaluateCondition(condition: Field['condition'], draft: DraftState) {
  if (!condition?.field) return true

  const value = draft[condition.field]
  const operator = condition.operator ?? 'equals'

  if (operator === 'not_empty') return value !== undefined && value !== null && String(value).trim() !== ''
  if (operator === 'empty') return value === undefined || value === null || String(value).trim() === ''
  if (operator === 'includes') {
    if (Array.isArray(condition.value)) return condition.value.includes(value)
    return String(value ?? '').includes(String(condition.value ?? ''))
  }
  if (operator === 'not_equals') return value !== condition.value

  return value === condition.value
}

function safeFileName(value: any) {
  return (
    String(value || '')
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w.-]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '') || 'sin_nombre'
  )
}

export default function DS160() {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState<DraftState>({})
  const [savedAt, setSavedAt] = useState<string | null>(null)

  const loc = useLocation()
  const isEmbed = new URLSearchParams(loc.search).get('embed') === '1'

  const section = useMemo<Section>(() => {
    return DS160_SECTIONS[Math.min(sectionIndex, DS160_SECTIONS.length - 1)]
  }, [sectionIndex])

  const visibleFields = useMemo(() => {
    return section.fields.filter((field) => evaluateCondition(field.condition, draft))
  }, [section, draft])

  const progress = useMemo(() => {
    return Math.round(((sectionIndex + 1) / DS160_SECTIONS.length) * 100)
  }, [sectionIndex])

  const answeredCount = useMemo(() => {
    return Object.values(draft).filter((value) => {
      if (value === undefined || value === null) return false
      if (typeof value === 'string') return value.trim() !== ''
      return true
    }).length
  }, [draft])

  useEffect(() => {
    const saved = localStorage.getItem('fp_ds160_draft')
    if (saved) {
      try {
        setDraft(JSON.parse(saved))
      } catch {
        localStorage.removeItem('fp_ds160_draft')
      }
    }

    const lastSaved = localStorage.getItem('fp_ds160_saved_at')
    if (lastSaved) setSavedAt(lastSaved)
  }, [])

  useEffect(() => {
    localStorage.setItem('fp_ds160_draft', JSON.stringify(draft))
    const now = new Date().toLocaleString()
    localStorage.setItem('fp_ds160_saved_at', now)
    setSavedAt(now)
  }, [draft])

  function updateField(name: string, value: any) {
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  function goPrev() {
    setSectionIndex((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNext() {
    setSectionIndex((current) => Math.min(DS160_SECTIONS.length - 1, current + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToSection(index: number) {
    setSectionIndex(Math.min(Math.max(index, 0), DS160_SECTIONS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function clearDraft() {
    const ok = confirm(
      '¿Seguro que deseas limpiar todo el formulario local? Esta acción no borra registros ya enviados a Supabase.'
    )

    if (!ok) return

    setDraft({})
    localStorage.removeItem('fp_ds160_draft')
    localStorage.removeItem('fp_ds160_saved_at')
    setSavedAt(null)
    setSectionIndex(0)
  }

  function handleExportPdf() {
    const nombre = safeFileName(draft.nombres)
    const apellidos = safeFileName(draft.apellidos)
    const pasaporte = safeFileName(draft.numeroPasaporte)
    const stamp = new Date().toISOString().slice(0, 10)
    const fileName = `ds160_${apellidos}_${nombre}_${pasaporte}_${stamp}.pdf`

    exportDs160Pdf(draft, {
      fileName,
      title: 'FORM Premium — DS-160 RD — Preguntas y Respuestas',
      meta: {
        Nombre: draft.nombres,
        Apellidos: draft.apellidos,
        Pasaporte: draft.numeroPasaporte,
        Cédula: draft.cedula,
        Email: draft.correo,
        Teléfono: draft.primaryPhone || draft.telefono,
      },
    })
  }

  async function guardarEnSupabase() {
    setSaving(true)

    try {
      const { error } = await supabase.from('form_responses').insert([
        {
          form_key: 'ds160-do',
          data: draft,
          source: 'web',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        },
      ])

      if (error) throw error

      alert('✅ Guardado correctamente. Se descargará el PDF.')
      handleExportPdf()
    } catch (error: any) {
      const msg = error?.message || error?.error_description || error?.hint || 'desconocido'
      console.error('Error guardando en Supabase:', error)
      alert('Error guardando: ' + msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: '4px 0' }}>DS-160 RD — Borrador profesional</h2>

                {!isEmbed && (
                  <p className="muted" style={{ marginTop: 4, maxWidth: 760 }}>
                    Formulario de recopilación no oficial. Campos opcionales. El envío oficial debe realizarse en{' '}
                    <a href="https://ceac.state.gov/CEAC" target="_blank" rel="noreferrer">
                      CEAC
                    </a>.
                  </p>
                )}

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                  <span className="pill">Sección {sectionIndex + 1} de {DS160_SECTIONS.length}</span>
                  <span className="pill">{progress}% completado</span>
                  <span className="pill">{answeredCount} campos llenados</span>
                  {savedAt && <span className="pill">Autoguardado: {savedAt}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn" onClick={goPrev} disabled={sectionIndex === 0}>
                  Atrás
                </button>

                <button className="btn" onClick={goNext} disabled={sectionIndex === DS160_SECTIONS.length - 1}>
                  Siguiente
                </button>

                <button className="btn success" onClick={guardarEnSupabase} disabled={saving}>
                  {saving ? 'Guardando…' : 'Guardar y descargar PDF'}
                </button>

                <button className="btn" onClick={handleExportPdf}>
                  Descargar PDF
                </button>

                {!isEmbed && (
                  <button className="btn ghost" onClick={clearDraft} disabled={saving}>
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                height: 10,
                borderRadius: 999,
                border: '1px solid var(--border)',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                }}
              />
            </div>

            <Instructivo />

            {!isEmbed && (
              <div className="card" style={{ marginTop: 16, padding: 12 }}>
                <div className="muted" style={{ marginBottom: 8 }}>
                  Navegación rápida por secciones
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DS160_SECTIONS.map((item, index) => (
                    <button
                      key={item.key}
                      className={`btn ${index === sectionIndex ? 'primary' : 'ghost'}`}
                      onClick={() => goToSection(index)}
                      type="button"
                    >
                      {index + 1}. {item.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 18 }}>
              <div className="section-title">{section.title}</div>
              {section.description && <p className="muted">{section.description}</p>}

              <div className="row" style={{ marginTop: 12 }}>
                {visibleFields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field as any}
                    value={draft[field.name]}
                    onChange={updateField}
                  />
                ))}
              </div>

              {visibleFields.length === 0 && (
                <p className="muted" style={{ marginTop: 12 }}>
                  No hay campos visibles en esta sección por las condiciones actuales.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              <button className="btn" onClick={goPrev} disabled={sectionIndex === 0}>
                Atrás
              </button>

              <button className="btn" onClick={goNext} disabled={sectionIndex === DS160_SECTIONS.length - 1}>
                Siguiente
              </button>
            </div>

            {!isEmbed && (
              <details style={{ marginTop: 18 }}>
                <summary className="muted">Ver JSON del borrador local</summary>
                <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                  {JSON.stringify(draft, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
