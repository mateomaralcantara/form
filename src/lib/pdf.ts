import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DS160_SECTIONS } from '../data/ds160'

type PDFOpts = {
  fileName?: string
  title?: string
  meta?: Record<string, string | number | undefined | null>
}

export function exportDs160Pdf(data: Record<string, any>, opts: PDFOpts = {}) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 36
  const pageWidth = doc.internal.pageSize.getWidth()
  const title = opts.title ?? 'DS-160 (RD) — Preguntas y Respuestas'

  // Encabezado
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(title, margin, margin)

  doc.setFont('helvetica', '')
  doc.setFontSize(10)
  doc.text(new Date().toLocaleString(), pageWidth - margin, margin, { align: 'right' })

  // Meta opcional (Nombre, Apellidos, etc.)
  const metaEntries = Object.entries(opts.meta ?? {}).filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
  if (metaEntries.length) {
    const head = [['Campo', 'Valor']]
    const body = metaEntries.map(([k, v]) => [k, String(v ?? '')])
    autoTable(doc, {
      startY: margin + 10,
      head,
      body,
      styles: { font: 'helvetica', fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [124, 92, 255], textColor: 255 },
      margin: { left: margin, right: margin }
    })
  }

  // Secciones y preguntas (todas las preguntas, con '-' si no hay respuesta)
  DS160_SECTIONS.forEach((sec, idx) => {
    if (idx > 0) doc.addPage()
    const startY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 18 : margin + 36

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(sec.title, margin, startY)

    const qa = sec.fields.map(f => [f.label, stringify((data as any)[f.name])])
    autoTable(doc, {
      startY: startY + 12,
      head: [['Pregunta', 'Respuesta']],
      body: qa.length ? qa : [['(sin datos)', '']],
      styles: { font: 'helvetica', fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
      headStyles: { fillColor: [124, 92, 255], textColor: 255 },
      columnStyles: { 0: { cellWidth: 220 }, 1: { cellWidth: pageWidth - 2 * margin - 220 } },
      margin: { left: margin, right: margin }
    })
  })

  doc.save(opts.fileName ?? 'ds160_respuestas.pdf')
}

function stringify(v: any) {
  if (v === null || v === undefined || v === '') return '-'
  if (Array.isArray(v)) return v.join(', ')
  if (typeof v === 'object') return JSON.stringify(v, null, 2)
  return String(v)
}
