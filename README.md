<<<<<<< HEAD
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
=======
# FORM Premium

Software minimalista y profesional para **gestión de formularios**, iniciando con un borrador del **DS-160 (República Dominicana)**.
- Sin las últimas *preguntas de seguridad*.
- **Ningún campo es obligatorio.**
- Conexión a **Supabase** para almacenar respuestas.

> **Aviso importante:** Este proyecto NO envía solicitudes oficiales. El DS‑160 solo puede presentarse en el sitio oficial del Departamento de Estado de EE.UU. (CEAC). Usa FORM Premium para recopilar información y prepararte, luego transcribe los datos al portal oficial.

## Stack
- React + Vite + TypeScript
- Supabase (`@supabase/supabase-js`)
- Estilos CSS puros (look moderno, sin tailwind para simplificar)

## Configuración
1. Crea un proyecto en [Supabase](https://supabase.com/).
2. En **SQL Editor**, ejecuta el contenido de `supabase.sql` (incluido en este repo).
3. En **Project Settings → API**, copia la **URL** y **anon key**.
4. Crea un archivo `.env` en la raíz con:

   ```env
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_ANON_KEY=tu_key
   ```

5. Instala dependencias y arranca:

   ```bash
   npm install
   npm run dev
   ```

## Rutas principales
- `/` Inicio
- `/ds160` Formulario DS‑160 (borrador). Todos los campos son opcionales; *no incluye* últimas preguntas de seguridad.
- `/respuestas` Listado de registros guardados en Supabase y descarga en JSON.

## Seguridad y cumplimiento
- Este repositorio **no** valida campos ni aplica reglas del DS‑160. Si planeas usarlo con clientes, añade revisiones y flujos de QA.
- Mantén seguras tus credenciales de Supabase y configura reglas de **Row Level Security** (RLS) según tus necesidades.

---
Hecho con ❤️ para flujos simples, claros y profesionales.
>>>>>>> b99c53b574ed1200ac9a10902dd4dcb2684eb116
