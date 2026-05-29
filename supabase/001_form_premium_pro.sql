-- supabase/001_form_premium_pro.sql
-- FORM Premium PRO Schema
-- Ejecutar completo en Supabase SQL Editor.

create extension if not exists pgcrypto;

-- Helpers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admin allowlist
create table if not exists public.admin_allowlist (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;
revoke all on table public.admin_allowlist from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where a.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Forms catalog
create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  form_key text unique not null,
  name text not null,
  description text,
  country_code text,
  category text,
  status text not null default 'active'
    check (status in ('draft', 'active', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_forms_updated_at on public.forms;
create trigger trg_forms_updated_at
before update on public.forms
for each row execute function public.set_updated_at();

create table if not exists public.form_versions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  version_number integer not null default 1,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  schema_json jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (form_id, version_number)
);

drop trigger if exists trg_form_versions_updated_at on public.form_versions;
create trigger trg_form_versions_updated_at
before update on public.form_versions
for each row execute function public.set_updated_at();

create table if not exists public.form_sections (
  id uuid primary key default gen_random_uuid(),
  form_version_id uuid not null references public.form_versions(id) on delete cascade,
  section_key text not null,
  title text not null,
  description text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  unique (form_version_id, section_key)
);

create table if not exists public.form_fields (
  id uuid primary key default gen_random_uuid(),
  form_version_id uuid not null references public.form_versions(id) on delete cascade,
  section_id uuid not null references public.form_sections(id) on delete cascade,
  field_key text not null,
  label text not null,
  placeholder text,
  field_type text not null default 'text'
    check (field_type in ('text', 'date', 'number', 'email', 'select', 'textarea', 'checkbox', 'file')),
  options jsonb not null default '[]'::jsonb,
  span integer not null default 6,
  sort_order integer not null default 0,
  is_required boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  unique (form_version_id, field_key)
);

create index if not exists form_sections_version_order_idx
on public.form_sections(form_version_id, sort_order);

create index if not exists form_fields_version_order_idx
on public.form_fields(form_version_id, sort_order);

create index if not exists form_fields_section_order_idx
on public.form_fields(section_id, sort_order);

-- Compatibility table: current frontend inserts here
create table if not exists public.form_responses (
  id bigserial primary key,
  form_key text not null,
  data jsonb not null default '{}'::jsonb,
  source text not null default 'web',
  client_ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists form_responses_form_key_idx
on public.form_responses(form_key);

create index if not exists form_responses_created_at_idx
on public.form_responses(created_at desc);

create index if not exists form_responses_data_gin_idx
on public.form_responses using gin(data);

-- Professional submissions
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  legacy_response_id bigint unique references public.form_responses(id) on delete set null,
  form_id uuid references public.forms(id) on delete set null,
  form_version_id uuid references public.form_versions(id) on delete set null,
  form_key text not null,
  status text not null default 'submitted'
    check (status in ('draft', 'submitted', 'reviewing', 'completed', 'archived')),
  client_name text,
  client_email text,
  client_phone text,
  document_number text,
  submission_code text unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
  data jsonb not null default '{}'::jsonb,
  pdf_generated boolean not null default false,
  pdf_path text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_form_submissions_updated_at on public.form_submissions;
create trigger trg_form_submissions_updated_at
before update on public.form_submissions
for each row execute function public.set_updated_at();

create index if not exists form_submissions_form_key_idx
on public.form_submissions(form_key);

create index if not exists form_submissions_status_idx
on public.form_submissions(status);

create index if not exists form_submissions_created_at_idx
on public.form_submissions(created_at desc);

create index if not exists form_submissions_data_gin_idx
on public.form_submissions using gin(data);

create table if not exists public.form_submission_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.form_submissions(id) on delete cascade,
  form_version_id uuid references public.form_versions(id) on delete set null,
  section_key text,
  field_key text not null,
  question_label text not null,
  answer_text text,
  answer_json jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (submission_id, field_key)
);

create index if not exists form_submission_answers_submission_idx
on public.form_submission_answers(submission_id);

create index if not exists form_submission_answers_field_idx
on public.form_submission_answers(field_key);

create index if not exists form_submission_answers_json_gin_idx
on public.form_submission_answers using gin(answer_json);

create table if not exists public.submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.form_submissions(id) on delete cascade,
  file_kind text not null default 'pdf'
    check (file_kind in ('pdf', 'json', 'attachment')),
  bucket text,
  path text,
  file_name text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists submission_files_submission_idx
on public.submission_files(submission_id);

-- Audit logs
create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_logs_actor_idx
on public.admin_audit_logs(actor_id);

create index if not exists admin_audit_logs_created_at_idx
on public.admin_audit_logs(created_at desc);

-- Auto-normalization trigger
create or replace function public.normalize_form_response()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_form_id uuid;
  v_version_id uuid;
  v_submission_id uuid;
begin
  select f.id
  into v_form_id
  from public.forms f
  where f.form_key = new.form_key
  limit 1;

  select fv.id
  into v_version_id
  from public.form_versions fv
  where fv.form_id = v_form_id
    and fv.status = 'published'
  order by fv.version_number desc
  limit 1;

  insert into public.form_submissions (
    legacy_response_id,
    form_id,
    form_version_id,
    form_key,
    status,
    client_name,
    client_email,
    client_phone,
    document_number,
    data,
    submitted_at,
    created_at
  )
  values (
    new.id,
    v_form_id,
    v_version_id,
    new.form_key,
    'submitted',
    nullif(trim(coalesce(new.data->>'nombres', '') || ' ' || coalesce(new.data->>'apellidos', '')), ''),
    nullif(new.data->>'correo', ''),
    coalesce(nullif(new.data->>'primaryPhone', ''), nullif(new.data->>'telefono', '')),
    coalesce(nullif(new.data->>'cedula', ''), nullif(new.data->>'numeroPasaporte', '')),
    new.data,
    new.created_at,
    new.created_at
  )
  returning id into v_submission_id;

  insert into public.form_submission_answers (
    submission_id,
    form_version_id,
    section_key,
    field_key,
    question_label,
    answer_text,
    answer_json,
    sort_order
  )
  select
    v_submission_id,
    v_version_id,
    coalesce(fs.section_key, 'sin_seccion'),
    e.key,
    coalesce(ff.label, e.key),
    case
      when jsonb_typeof(e.value) = 'string' then trim(both '"' from e.value::text)
      else e.value::text
    end,
    e.value,
    coalesce(ff.sort_order, 9999)
  from jsonb_each(new.data) as e(key, value)
  left join public.form_fields ff
    on ff.form_version_id = v_version_id
   and ff.field_key = e.key
  left join public.form_sections fs
    on fs.id = ff.section_id
  on conflict (submission_id, field_key) do update
    set answer_text = excluded.answer_text,
        answer_json = excluded.answer_json,
        question_label = excluded.question_label,
        section_key = excluded.section_key;

  return new;
end;
$$;

drop trigger if exists trg_normalize_form_response on public.form_responses;

create trigger trg_normalize_form_response
after insert on public.form_responses
for each row
execute function public.normalize_form_response();

-- Seed DS-160
insert into public.forms (form_key, name, description, country_code, category, status)
values (
  'ds160-do',
  'DS-160 República Dominicana',
  'Borrador no oficial del DS-160 para recopilación de datos del cliente.',
  'DO',
  'visas',
  'active'
)
on conflict (form_key) do update
set name = excluded.name,
    description = excluded.description,
    country_code = excluded.country_code,
    category = excluded.category,
    status = excluded.status,
    updated_at = now();

insert into public.form_versions (form_id, version_number, status, published_at, schema_json)
select id, 1, 'published', now(), '{}'::jsonb
from public.forms
where form_key = 'ds160-do'
on conflict (form_id, version_number) do update
set status = 'published',
    published_at = coalesce(public.form_versions.published_at, now()),
    updated_at = now();

-- RLS
alter table public.forms enable row level security;
alter table public.form_versions enable row level security;
alter table public.form_sections enable row level security;
alter table public.form_fields enable row level security;
alter table public.form_responses enable row level security;
alter table public.form_submissions enable row level security;
alter table public.form_submission_answers enable row level security;
alter table public.submission_files enable row level security;
alter table public.admin_audit_logs enable row level security;

drop policy if exists "Public can read active forms" on public.forms;
drop policy if exists "Public can read published versions" on public.form_versions;
drop policy if exists "Public can read visible sections" on public.form_sections;
drop policy if exists "Public can read visible fields" on public.form_fields;

drop policy if exists "Anyone can insert responses" on public.form_responses;
drop policy if exists "Admins can read responses" on public.form_responses;
drop policy if exists "Admins can update responses" on public.form_responses;
drop policy if exists "Admins can delete responses" on public.form_responses;

drop policy if exists "Anyone can insert submissions" on public.form_submissions;
drop policy if exists "Admins can read submissions" on public.form_submissions;
drop policy if exists "Admins can update submissions" on public.form_submissions;
drop policy if exists "Admins can delete submissions" on public.form_submissions;

drop policy if exists "Admins can read answers" on public.form_submission_answers;
drop policy if exists "Admins can manage answers" on public.form_submission_answers;

drop policy if exists "Admins can read files" on public.submission_files;
drop policy if exists "Admins can manage files" on public.submission_files;

drop policy if exists "Admins can read audit logs" on public.admin_audit_logs;
drop policy if exists "Admins can insert audit logs" on public.admin_audit_logs;

create policy "Public can read active forms"
on public.forms
for select
to public
using (status = 'active' or public.is_admin());

create policy "Public can read published versions"
on public.form_versions
for select
to public
using (status = 'published' or public.is_admin());

create policy "Public can read visible sections"
on public.form_sections
for select
to public
using (is_visible = true or public.is_admin());

create policy "Public can read visible fields"
on public.form_fields
for select
to public
using (is_visible = true or public.is_admin());

create policy "Anyone can insert responses"
on public.form_responses
for insert
to public
with check (true);

create policy "Admins can read responses"
on public.form_responses
for select
to authenticated
using (public.is_admin());

create policy "Admins can update responses"
on public.form_responses
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete responses"
on public.form_responses
for delete
to authenticated
using (public.is_admin());

create policy "Anyone can insert submissions"
on public.form_submissions
for insert
to public
with check (true);

create policy "Admins can read submissions"
on public.form_submissions
for select
to authenticated
using (public.is_admin());

create policy "Admins can update submissions"
on public.form_submissions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete submissions"
on public.form_submissions
for delete
to authenticated
using (public.is_admin());

create policy "Admins can read answers"
on public.form_submission_answers
for select
to authenticated
using (public.is_admin());

create policy "Admins can manage answers"
on public.form_submission_answers
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can read files"
on public.submission_files
for select
to authenticated
using (public.is_admin());

create policy "Admins can manage files"
on public.submission_files
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can read audit logs"
on public.admin_audit_logs
for select
to authenticated
using (public.is_admin());

create policy "Admins can insert audit logs"
on public.admin_audit_logs
for insert
to authenticated
with check (public.is_admin());

-- Grants
grant usage on schema public to anon, authenticated;

grant select on public.forms to anon, authenticated;
grant select on public.form_versions to anon, authenticated;
grant select on public.form_sections to anon, authenticated;
grant select on public.form_fields to anon, authenticated;

grant insert on public.form_responses to anon, authenticated;
grant select, update, delete on public.form_responses to authenticated;

grant insert on public.form_submissions to anon, authenticated;
grant select, update, delete on public.form_submissions to authenticated;

grant select, insert, update, delete on public.form_submission_answers to authenticated;
grant select, insert, update, delete on public.submission_files to authenticated;
grant select, insert on public.admin_audit_logs to authenticated;

revoke all on public.admin_allowlist from anon, authenticated;

grant usage, select on sequence public.form_responses_id_seq to anon, authenticated;

notify pgrst, 'reload schema';
