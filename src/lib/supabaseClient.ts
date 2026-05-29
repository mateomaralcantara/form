import { createClient } from '@supabase/supabase-js'
<<<<<<< HEAD

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('SUPABASE URL:', supabaseUrl)
console.log('SUPABASE ANON:', supabaseAnon?.slice(0, 12) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true },
})
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// ✅ persistSession: true para que el admin siga logueado
export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true }
})
>>>>>>> b99c53b574ed1200ac9a10902dd4dcb2684eb116
