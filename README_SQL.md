# Documentación SQL – CooLab (Supabase)

Este documento describe el modelo de datos y las políticas recomendadas en Supabase para el registro y administración de Organizaciones y Usuarios, alineado con la app actual. Incluye estructuras de tablas, RLS, índices e inserciones de ejemplo.

## 1) Esquema y convenciones
- **Esquema**: `public`
- **Codificación**: UTF-8
- **Fechas**: `timestamptz` (UTC)
- **JSON**: usar `jsonb`
- **Arrays**: `integer[]` para ODS, `text[]` para temáticas

## 2) Tabla: organizations
Representa organizaciones registradas (básico/extendido). Estructura flexible para redes sociales y proyectos.

```sql
create table if not exists public.organizations (
  id                 bigserial primary key,
  name               text not null,
  country            text not null,
  city               text not null,
  address            text,
  contact_person     text not null,
  contact_role       text,
  social_object      text not null,                       -- máx 50 palabras (validar en app)
  lat                double precision,
  lng                double precision,
  ods                integer[] default '{}',              -- ODS como enteros (1..17)
  target_population  text[] default '{}',                 -- Temáticas de interés
  contact            jsonb default '{}'::jsonb,           -- { email, phone, website, social: {linkedin, instagram, ...} }
  projects           jsonb default '[]'::jsonb,           -- Lista de proyectos (ver estructura abajo)
  created_at         timestamptz not null default now()
);
```

Estructura recomendada para `contact`:
```json
{
  "email": "contacto@org.org",
  "phone": "+57 300 000 0000",
  "website": "https://org.org",
  "social": {
    "linkedin": "https://linkedin.com/company/...",
    "instagram": "https://instagram.com/...",
    "facebook": "https://facebook.com/...",
    "x": "https://twitter.com/...",
    "tiktok": "https://tiktok.com/@...",
    "whatsapp": "https://wa.me/+57300..."
  }
}
```

Estructura recomendada para `projects` (lista de objetos):
```json
[
  {
    "title": "Laboratorio Digital",
    "description": "Resumen breve del proyecto",
    "country": "Colombia",
    "city": "Bogotá",
    "address": "Calle 10 # 1-23",
    "beneficiaries": {
      "direct": { "men": 100, "women": 120 },
      "indirect": { "men": 200, "women": 250 }
    },
    "photos": ["https://.../foto1.jpg"],
    "videos": ["https://.../video1.mp4"]
  }
]
```

### Índices sugeridos
```sql
-- Búsquedas por ubicación
create index if not exists idx_org_country on public.organizations (country);
create index if not exists idx_org_city    on public.organizations (city);

-- Arrays (ODS / Temáticas)
create index if not exists idx_org_ods_gin     on public.organizations using gin (ods);
create index if not exists idx_org_topics_gin  on public.organizations using gin (target_population);

-- JSONB
create index if not exists idx_org_contact_gin  on public.organizations using gin (contact);
create index if not exists idx_org_projects_gin on public.organizations using gin (projects);
```

## 3) Tabla: users (perfil básico)
Si la app manejará usuarios propios (además de `auth.users`), sugerimos un perfil simple:
```sql
create table if not exists public.users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  phone       text,
  role        text default 'user',
  created_at  timestamptz not null default now()
);
```

Opcional: relación `organizations.owner_user_id uuid references public.users(id)` para propiedad.

## 4) RLS (Row Level Security)
Activar RLS y políticas. Si la app es pública (lectura libre), y escritura desde `anon` (opcional), usar:
```sql
alter table public.organizations enable row level security;

-- Lectura pública
create policy if not exists org_select_public
  on public.organizations for select using (true);

-- Inserción abierta (opcional; valorar riesgos)
create policy if not exists org_insert_public
  on public.organizations for insert with check (true);

-- Actualización por servicio (o ajustar a propiedad con auth.uid())
create policy if not exists org_update_public
  on public.organizations for update using (true) with check (true);
```

Para producción se recomienda restringir `insert/update` a `authenticated` y/o propietarios.

## 5) Inserciones de ejemplo
```sql
insert into public.organizations
(name, country, city, address, contact_person, contact_role, social_object, lat, lng, ods, target_population, contact, projects)
values
(
  'Fundación Andina', 'Colombia', 'Bogotá', 'Calle 10 #1-23', 'María Pérez', 'Directora',
  'Educación e inclusión con énfasis en juventud', 4.7110, -74.0721,
  array[4,10,17], array['Jóvenes','Mujeres'],
  '{"email":"contacto@andina.org","phone":"+57 1 222 3344","website":"https://andina.org","social":{"linkedin":"https://linkedin.com/company/andina"}}',
  '[{"title":"Laboratorio Digital","description":"Proyecto piloto","country":"Colombia","city":"Bogotá","address":"Cll 10 #1-23","beneficiaries":{"direct":{"men":50,"women":60},"indirect":{"men":100,"women":120}},"photos":["https://.../foto.jpg"],"videos":[]} ]'
);
```

## 6) Actualizaciones desde la app
La app envía objetos con esta forma al crear/actualizar organización:
- `name, country, city, address, contactPerson, contactRole`
- `socialObject, lat, lng, ods (string[] o int[]), targetPopulation (text[])`
- `contact: { email, phone, website, social: { linkedin, instagram, facebook, x, tiktok, whatsapp } }`
- `projects: []` (como se definió arriba)

Si recibes ODS como strings, puedes normalizarlos en SQL:
```sql
-- Convertir strings a enteros (si hace falta)
update public.organizations
set ods = array(
  select cast(regexp_replace(x, '\\D', '', 'g') as integer)
  from unnest(ods) as x
  where x ~ '\\d+'
)
where ods is not null;
```

## 7) Variables de entorno (frontend)
Configura en `.env` del frontend (CRA):
```
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...
REACT_APP_SUPABASE_SCHEMA=public
REACT_APP_SUPABASE_TABLE_ORGS=organizations
```

## 8) Consultas útiles
- Últimas organizaciones:
```sql
select id, name, country, city, created_at
from public.organizations
order by created_at desc
limit 20;
```

- Filtrar por ODS (ej. ODS 4):
```sql
select * from public.organizations where 4 = any(ods);
```

- Buscar por temática:
```sql
select * from public.organizations where 'Jóvenes' = any(target_population);
```

- Extraer redes sociales desde `contact`:
```sql
select
  contact->'social'->>'linkedin'  as linkedin,
  contact->'social'->>'instagram' as instagram
from public.organizations;
```

## 9) Índices adicionales (opcional)
Para búsquedas por texto:
```sql
create extension if not exists pg_trgm;
create index if not exists idx_org_name_trgm on public.organizations using gin (name gin_trgm_ops);
create index if not exists idx_org_social_object_trgm on public.organizations using gin (social_object gin_trgm_ops);
```

---

Con esta guía podrás crear, consultar y escalar los datos de organizaciones y usuarios en Supabase, manteniendo flexibilidad (JSONB) y buen rendimiento (índices GIN/BTREE). Ajusta las políticas RLS según tu modelo de autenticación para entornos productivos.
