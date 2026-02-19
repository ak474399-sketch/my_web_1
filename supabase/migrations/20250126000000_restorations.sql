-- Restoration history table (create if not exists)
-- Ensures /api/restore/history and restore flow have a place to read/write

create table if not exists public.restorations (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  original_url    text,
  restored_url    text,
  status          text not null default 'pending',
  created_at      timestamptz not null default now()
);

comment on table public.restorations is 'Photo restoration history per user';

create index if not exists idx_restorations_user_id on public.restorations(user_id);

alter table public.restorations enable row level security;

drop policy if exists "Users can view own restorations" on public.restorations;
create policy "Users can view own restorations"
  on public.restorations for select
  using (auth.uid()::text = user_id::text);
