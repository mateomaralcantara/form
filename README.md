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
