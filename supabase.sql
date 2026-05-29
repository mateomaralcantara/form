-- Tabla simple para almacenar respuestas
create table if not exists public.form_responses (
  id bigserial primary key,
  form_key text not null,
  data jsonb,
  created_at timestamptz default now()
);
create index if not exists form_responses_form_key_idx on public.form_responses(form_key);
-- Reglas de RLS (ajústalas a tu contexto). Por defecto, habilitamos lectura/escritura pública del ejemplo.
alter table public.form_responses enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'form_responses' and policyname = 'Public read') then
    create policy "Public read" on public.form_responses for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'form_responses' and policyname = 'Public insert') then
    create policy "Public insert" on public.form_responses for insert with check (true);
  end if;
end $$;
