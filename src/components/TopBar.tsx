// src/components/TopBar.tsx
import { Link, useLocation } from 'react-router-dom'

export default function TopBar() {
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)
  const embed = params.get('embed') === '1' // modo panel limpio

  // si ?embed=1, no mostramos el TopBar
  if (embed) return null

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">FP</div>
        <div>
          <div style={{fontSize:14, opacity:0.8}}>FORM</div>
          <div style={{fontWeight:800, letterSpacing:1}}>Premium</div>
        </div>
      </div>

      <nav className="nav">
        <Link to="/" className="btn ghost" aria-current={loc.pathname==='/'}>Inicio</Link>
        <Link to="/ds160" className="btn ghost" aria-current={loc.pathname==='/ds160'}>DS-160 RD</Link>
        {/* <Link to="/respuestas" className="btn ghost" aria-current={loc.pathname==='/respuestas'}>Respuestas</Link> */} {/* ← COMENTADO */}
        <a className="btn ghost" href="https://ceac.state.gov/CEAC" target="_blank" rel="noreferrer">Sitio oficial CEAC</a>
      </nav>
    </header>
  )
}
