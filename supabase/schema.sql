-- ============================================================
-- Memory Restore — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. Users table — stores authenticated user profiles
create table if not exists public.users (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  name        text,
  avatar_url  text,
  role        text not null default 'user',   -- 'user' | 'admin'
  credits     integer not null default 5,      -- free restoration credits
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.users is 'Registered users (synced from NextAuth on sign-in)';
comment on column public.users.role is 'user or admin';
comment on column public.users.credits is 'Remaining free restoration credits';

-- 2. Accounts table — OAuth provider links (Google, etc.)
create table if not exists public.accounts (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users(id) on delete cascade,
  provider              text not null,           -- e.g. 'google'
  provider_account_id   text not null,           -- Google sub / unique id
  access_token          text,
  refresh_token         text,
  expires_at            bigint,
  created_at            timestamptz not null default now(),

  unique (provider, provider_account_id)
);

comment on table public.accounts is 'OAuth provider accounts linked to users';

-- 3. Sessions table (optional — only needed if using database sessions)
create table if not exists public.sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id) on delete cascade,
  session_token text unique not null,
  expires       timestamptz not null,
  created_at    timestamptz not null default now()
);

-- 4. Restoration history — track user restorations
create table if not exists public.restorations (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  original_url    text,
  restored_url    text,
  status          text not null default 'pending',  -- pending | completed | failed
  created_at      timestamptz not null default now()
);

comment on table public.restorations is 'Photo restoration history per user';

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_users_email on public.users(email);
create index if not exists idx_accounts_user_id on public.accounts(user_id);
create index if not exists idx_sessions_user_id on public.sessions(user_id);
create index if not exists idx_sessions_token on public.sessions(session_token);
create index if not exists idx_restorations_user_id on public.restorations(user_id);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.users enable row level security;
alter table public.accounts enable row level security;
alter table public.sessions enable row level security;
alter table public.restorations enable row level security;

-- Users can read their own profile
drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid()::text = id::text);

-- Service role (server-side) has full access via supabaseAdmin
-- No additional policies needed — service role bypasses RLS

-- Users can view their own restorations
drop policy if exists "Users can view own restorations" on public.restorations;
create policy "Users can view own restorations"
  on public.restorations for select
  using (auth.uid()::text = user_id::text);

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_users_updated
  before update on public.users
  for each row execute function public.handle_updated_at();
