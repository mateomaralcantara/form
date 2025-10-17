// src/pages/Admin.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { exportDs160Pdf } from '../lib/pdf'

type Row = { id: number; created_at: string; form_key: string; data: any }

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<any>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => { sub.subscription.unsubscribe() }
  }, [])

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setSession(data.session)
      await load()
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'Error al iniciar sesión')
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setRows([])
  }

  async function load() {
    setLoading(true)
    setErrorMsg(null)
    try {
      const { data, error } = await supabase
        .from('form_responses')
        .select('id, created_at, form_key, data')
        .eq('form_key', 'ds160-do')
        .order('created_at', { ascending: false })
        .limit(500)
      if (error) throw error
      setRows((data ?? []) as Row[])
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'No autorizado o error cargando datos')
    } finally {
      setLoading(false)
    }
  }

  function downloadJSON(row: Row) {
    const blob = new Blob([JSON.stringify(row.data ?? {}, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `ds160_resp_${row.id}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function downloadPDF(row: Row) {
    const full = row.data ?? {}
    const nombre = String(full.nombres ?? 'sin_nombre').trim().replace(/\s+/g, '_')
    const apellidos = String(full.apellidos ?? 'sin_apellido').trim().replace(/\s+/g, '_')
    exportDs160Pdf(full, {
      fileName: `ds160_${apellidos}_${nombre}_#${row.id}.pdf`,
      title: 'FORM Premium — DS-160 (RD) — Preguntas y Respuestas',
      meta: {
        ID: row.id,
        Fecha: new Date(row.created_at).toLocaleString(),
        Nombre: full.nombres,
        Apellidos: full.apellidos,
        Pasaporte: full.numeroPasaporte,
        Cédula: full.cedula,
      },
    })
  }

  if (authLoading) {
    return <div className="container"><div className="card"><p>Cargando…</p></div></div>
  }

  if (!session) {
    return (
      <div className="container">
        <div className="card" style={{maxWidth:460, margin:'0 auto'}}>
          <h2 style={{marginTop:0}}>Admin — Iniciar sesión</h2>
          <form onSubmit={signIn} style={{display:'grid', gap:10}}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input id="password" className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {errorMsg && <p className="muted" style={{color:'#fca5a5'}}>{errorMsg}</p>}
            <button className="btn primary" type="submit">Entrar</button>
          </form>
          <p className="muted" style={{marginTop:8}}>Solo administradores autorizados.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
          <h2 style={{margin:'4px 0'}}>Dashboard — Respuestas DS-160</h2>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={load} disabled={loading}>{loading ? 'Cargando…' : 'Actualizar'}</button>
            <button className="btn" onClick={signOut}>Salir</button>
          </div>
        </div>
        <p className="muted">Solo visible para administradores (RLS + login).</p>
        {errorMsg && <p className="muted" style={{color:'#fca5a5'}}>{errorMsg}</p>}

        <table style={{width:'100%', borderCollapse:'collapse', marginTop:8}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:'8px'}}>ID</th>
              <th style={{textAlign:'left', padding:'8px'}}>Fecha</th>
              <th style={{textAlign:'left', padding:'8px'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{padding:'8px'}}>#{r.id}</td>
                <td style={{padding:'8px'}}>{new Date(r.created_at).toLocaleString()}</td>
                <td style={{padding:'8px', display:'flex', gap:8, flexWrap:'wrap'}}>
                  <button className="btn" onClick={() => downloadJSON(r)}>JSON</button>
                  <button className="btn" onClick={() => downloadPDF(r)}>PDF</button>
                </td>
              </tr>
            ))}
            {rows.length===0 && <tr><td colSpan={3} className="muted" style={{padding:'8px'}}>No hay registros.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
