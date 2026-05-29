// src/components/Instructivo.tsx
export default function Instructivo() {
    return (
      <div
        style={{
          marginTop: 12,
          padding: 12,
          border: '1px dashed var(--border)',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)'
        }}
        aria-label="Instructivo de llenado"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <strong>Instructivo de llenado</strong>
          <span className="pill">Importante</span>
        </div>
        <ol style={{ margin: '8px 0 0 18px', lineHeight: 1.6 }}>
          <li><strong>Llene el formulario completo.</strong></li>
          <li>Si no sabe algún dato, <strong>déjelo vacío</strong> (no es obligatorio).</li>
          <li>Al finalizar, presione <strong>Guardar (descargar)</strong>.</li>
          <li>Se descargará un <strong>archivo PDF</strong>. <u>Envíemelo</u> por WhatsApp o correo.</li>
        </ol>
        <p className="muted" style={{ marginTop: 8 }}>
          Nota: Este es un borrador. El envío oficial del DS-160 se hace en CEAC.
        </p>
      </div>
    )
  }
  