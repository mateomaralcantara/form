// src/pages/Debug.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Check = { name: string; ok: boolean; info?: string; error?: string }

export default function Debug() {
  const [checks, setChecks] = useState<Check[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const results: Check[] = []
      const url = import.meta.env.VITE_SUPABASE_URL?.trim()
      const anon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

      // 1) ENV VARS
      results.push({
        name: 'ENV: VITE_SUPABASE_URL presente',
        ok: !!url,
        info: url || 'NO DEFINIDO',
      })
      results.push({
        name: 'ENV: VITE_SUPABASE_ANON_KEY presente',
        ok: !!anon,
        info: anon ? anon.slice(0, 8) + '…' : 'NO DEFINIDO',
      })

      // 2) Formato URL
      const urlLooksGood = !!url && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)
      results.push({
        name: 'Formato URL Supabase',
        ok: urlLooksGood,
        info: 'Debe ser https://<ref>.supabase.co (sin /rest, /auth, etc.)'
      })

      // 3) HEAD contra REST (debe responder algo > 0, 401/404/200 todos sirven para ver que resuelve DNS)
      try {
        const r = await fetch(`${url}/rest/v1/`, { method: 'HEAD' })
        results.push({ name: 'DNS/Reachability REST', ok: r.ok || r.status >= 200, info: `status ${r.status}` })
      } catch (e:any) {
        results.push({ name: 'DNS/Reachability REST', ok: false, error: String(e) })
      }

      // 4) SELECT HEAD a form_responses (si no existe -> 404)
      try {
        const { error, count } = await supabase
          .from('form_responses')
          .select('*', { head: true, count: 'exact' })
        if (error) {
          results.push({ name: 'Tabla form_responses visible por REST', ok: false, error: `${error.code || ''} ${error.message}` })
        } else {
          results.push({ name: 'Tabla form_responses visible por REST', ok: true, info: `ok (count head: ${count ?? 'N/A'})` })
        }
      } catch (e:any) {
        results.push({ name: 'Tabla form_responses visible por REST', ok: false, error: String(e) })
      }

      // 5) INSERT de prueba (no ejecuta, solo valida policy estimando)
      try {
        const { error } = await supabase.from('form_responses').insert([{ form_key: 'healthcheck', data: { ok: true } }]).select().limit(1)
        results.push({
          name: 'Policy INSERT (public) funcionando',
          ok: !error,
          error: error ? `${error.code || ''} ${error.message}` : undefined
        })
      } catch (e:any) {
        results.push({ name: 'Policy INSERT (public) funcionando', ok: false, error: String(e) })
      }

      setChecks(results)
      setLoading(false)
    })()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h2 style={{marginTop:0}}>Debug Supabase</h2>
        {loading ? <p>Corriendo pruebas…</p> : (
          <ul style={{lineHeight:1.8}}>
            {checks.map((c,i) => (
              <li key={i}>
                <strong>{c.ok ? '✅' : '❌'} {c.name}</strong>
                {c.info && <div className="muted">• {c.info}</div>}
                {c.error && <div style={{color:'#fca5a5'}}>• {c.error}</div>}
              </li>
            ))}
          </ul>
        )}
        <p className="muted" style={{marginTop:8}}>
          Si “Tabla form_responses visible por REST” falla con 404/“schema cache”, corre <code>notify pgrst, 'reload schema';</code> en el SQL Editor y confirma que <em>public</em> está en <em>Exposed Schemas</em>.
        </p>
      </div>
    </div>
  )
}
