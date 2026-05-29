import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h1 style={{ marginTop: 0 }}>FORM Premium</h1>

            <p className="muted">
              Suite profesional para gestión de formularios. Comenzamos con un borrador del{' '}
              <strong>DS-160 República Dominicana</strong>, con campos opcionales, guardado en
              Supabase y descarga automática en PDF.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              <Link className="btn primary" to="/ds160">
                Abrir DS-160 RD
              </Link>

              <Link className="btn" to="/admin">
                Panel administrador
              </Link>
            </div>

            <div style={{ marginTop: 18 }}>
              <span className="pill">FORM Premium</span>{' '}
              <span className="pill">Supabase</span>{' '}
              <span className="pill">PDF</span>{' '}
              <span className="pill">Admin seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
