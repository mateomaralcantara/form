// src/pages/DS160.tsx
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Field, Section } from '../data/ds160'
import { DS160_SECTIONS } from '../data/ds160'
import FormField from '../components/FormField'
import { exportDs160Pdf } from '../lib/pdf'

type DraftState = Record<string, any>

/*
 * Ocultamos la sección inicial application_start.
 * El formulario comienza directamente en Datos personales.
 */
const FORM_SECTIONS = DS160_SECTIONS.filter(
  (section) => section.key !== 'application_start'
)

function evaluateCondition(
  condition: Field['condition'],
  draft: DraftState
) {
  if (!condition?.field) return true

  const currentValue = draft[condition.field]
  const operator = condition.operator ?? 'equals'

  if (operator === 'not_empty') {
    return (
      currentValue !== undefined &&
      currentValue !== null &&
      String(currentValue).trim() !== ''
    )
  }

  if (operator === 'empty') {
    return (
      currentValue === undefined ||
      currentValue === null ||
      String(currentValue).trim() === ''
    )
  }

  if (operator === 'includes') {
    if (Array.isArray(condition.value)) {
      return condition.value.includes(currentValue)
    }

    return String(currentValue ?? '').includes(
      String(condition.value ?? '')
    )
  }

  if (operator === 'not_equals') {
    return currentValue !== condition.value
  }

  return currentValue === condition.value
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

  const section = useMemo<Section>(() => {
    return FORM_SECTIONS[
      Math.min(sectionIndex, FORM_SECTIONS.length - 1)
    ]
  }, [sectionIndex])

  const visibleFields = useMemo(() => {
    return section.fields.filter((field) =>
      evaluateCondition(field.condition, draft)
    )
  }, [section, draft])

  /*
   * Cargar borrador guardado en este navegador.
   */
  useEffect(() => {
    const savedDraft = localStorage.getItem('fp_ds160_draft')

    if (!savedDraft) return

    try {
      setDraft(JSON.parse(savedDraft))
    } catch {
      localStorage.removeItem('fp_ds160_draft')
    }
  }, [])

  /*
   * Autoguardado local silencioso.
   */
  useEffect(() => {
    localStorage.setItem(
      'fp_ds160_draft',
      JSON.stringify(draft)
    )
  }, [draft])

  function updateField(name: string, value: any) {
    setDraft((previousDraft) => ({
      ...previousDraft,
      [name]: value,
    }))
  }

  function goBack() {
    setSectionIndex((currentIndex) =>
      Math.max(0, currentIndex - 1)
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function goNext() {
    setSectionIndex((currentIndex) =>
      Math.min(
        FORM_SECTIONS.length - 1,
        currentIndex + 1
      )
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function clearForm() {
    const confirmed = window.confirm(
      '¿Seguro que desea borrar todos los datos escritos en este formulario?'
    )

    if (!confirmed) return

    setDraft({})
    setSectionIndex(0)

    localStorage.removeItem('fp_ds160_draft')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleExportPdf() {
    const nombres = safeFileName(draft.nombres)
    const apellidos = safeFileName(draft.apellidos)
    const pasaporte = safeFileName(
      draft.numeroPasaporte
    )

    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)

    const fileName =
      `ds160_${apellidos}_${nombres}_${pasaporte}_${currentDate}.pdf`

    exportDs160Pdf(draft, {
      fileName,
      title:
        'FORM Premium — DS-160 RD — Preguntas y Respuestas',
      meta: {
        Nombre: draft.nombres,
        Apellidos: draft.apellidos,
        Pasaporte: draft.numeroPasaporte,
        Cédula: draft.cedula,
        Email: draft.correo,
        Teléfono:
          draft.primaryPhone ||
          draft.telefono,
      },
    })
  }

  /*
   * Guarda en Supabase y luego descarga el PDF.
   *
   * No usamos .select() porque el visitante tiene permiso
   * para insertar, pero no para leer respuestas.
   */
  async function guardarYDescargarPdf() {
    if (saving) return

    setSaving(true)

    try {
      const { error } = await supabase
        .from('form_responses')
        .insert([
          {
            form_key: 'ds160-do',
            data: draft,
          },
        ])

      if (error) throw error

      handleExportPdf()

      window.alert(
        '✅ Formulario guardado correctamente. El PDF fue descargado.'
      )
    } catch (error: any) {
      console.error(
        'Error guardando en Supabase:',
        error
      )

      const message =
        error?.message ||
        error?.error_description ||
        error?.hint ||
        'Error desconocido'

      window.alert(
        'Error guardando: ' + message
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            {/* Encabezado simple */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <h2 style={{ margin: 0 }}>
                FORM Premium — DS-160 RD
              </h2>

              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  className="btn"
                  onClick={goBack}
                  disabled={sectionIndex === 0}
                >
                  Atrás
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={goNext}
                  disabled={
                    sectionIndex ===
                    FORM_SECTIONS.length - 1
                  }
                >
                  Siguiente
                </button>

                <button
                  type="button"
                  className="btn success"
                  onClick={guardarYDescargarPdf}
                  disabled={saving}
                >
                  {saving
                    ? 'Guardando…'
                    : 'Guardar PDF'}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={handleExportPdf}
                  disabled={saving}
                >
                  Descargar
                </button>

                <button
                  type="button"
                  className="btn ghost"
                  onClick={clearForm}
                  disabled={saving}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Sección y preguntas */}
            <div style={{ marginTop: 22 }}>
              <div className="section-title">
                {section.title}
              </div>

              <div
                className="row"
                style={{ marginTop: 14 }}
              >
                {visibleFields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={draft[field.name]}
                    onChange={updateField}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}