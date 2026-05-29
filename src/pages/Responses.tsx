import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Row = { id: number; form_key: string; data: any; created_at: string }

export default function Responses() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('form_responses')
        .select('*')
        .eq('form_key', 'ds160-do')
        .order('created_at', { ascending: false })
        .limit(200)
      if (error) throw error
      setRows((data ?? []) as Row[])
    } catch (e:any) {
      console.error(e)
      alert('Error cargando: ' + (e?.message ?? 'desconocido'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function downloadJSON(row: Row) {
    const blob = new Blob([JSON.stringify(row.data, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ds160_do_${row.id}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:'4px 0'}}>Respuestas guardadas</h2>
          <button className="btn" onClick={load} disabled={loading}>{loading ? 'Actualizando…' : 'Actualizar'}</button>
        </div>
        <p className="muted">Listado de entradas almacenadas en Supabase (form_key = <code>ds160-do</code>).</p>
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Fecha</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>#{r.id}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn" onClick={()=>downloadJSON(r)}>Descargar JSON</button>
                </td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr>
                <td colSpan={3} className="muted">No hay registros aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
