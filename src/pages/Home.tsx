import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h1 style={{marginTop:0}}>FORM Premium</h1>
            <p className="muted">Suite minimalista para gestión de formularios. Comenzamos con un borrador del <strong>DS-160 (República Dominicana)</strong> sin preguntas de seguridad y con todos los campos opcionales.</p>
            <div style={{display:'flex', gap:12, marginTop:12}}>
              <Link className="btn primary" to="/ds160">Abrir DS-160 (RD)</Link>
              <Link className="btn" to="/respuestas">Ver respuestas guardadas</Link>
            </div>
            <div style={{marginTop:18}}>
              <span className="pill">Beta</span> <span className="pill">Supabase</span> <span className="pill">No oficial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
