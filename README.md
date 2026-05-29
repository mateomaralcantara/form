# FORM Premium Pro — DS-160 + SQL

## Archivos
- `src/data/ds160.ts`: esquema amplio del formulario DS-160 para FORM Premium.
- `supabase/001_form_premium_pro.sql`: base de datos profesional para Supabase.

## Uso
1. Copia `src/data/ds160.ts` en tu proyecto.
2. Ejecuta completo `supabase/001_form_premium_pro.sql` en Supabase SQL Editor.
3. En tu `DS160.tsx`, guarda así:
   ```ts
   await supabase.from('form_responses').insert([{ form_key: 'ds160-do', data: draft }])
   ```
4. Crea tu usuario admin en Authentication → Users.
5. Agrégalo:
   ```sql
   insert into public.admin_allowlist (user_id, email)
   select id, email
   from auth.users
   where email = 'TU_CORREO_ADMIN@DOMINIO.COM'
   on conflict (user_id) do nothing;

   notify pgrst, 'reload schema';
   ```
