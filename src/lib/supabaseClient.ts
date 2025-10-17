import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// ✅ persistSession: true para que el admin siga logueado
export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true }
})
