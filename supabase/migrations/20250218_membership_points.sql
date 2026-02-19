-- Membership & points: add columns to users and create points_history
-- Run in Supabase SQL Editor if not using migrations

alter table public.users
  add column if not exists membership_type text not null default 'free',
  add column if not exists membership_started_at timestamptz,
  add column if not exists last_refill_at timestamptz;

comment on column public.users.membership_type is 'free | weekly | yearly';
comment on column public.users.membership_started_at is 'When user subscribed (for refill period)';
comment on column public.users.last_refill_at is 'Last time we refilled points for this period';

create table if not exists public.points_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount integer not null,
  reason text not null,
  reference_id uuid,
  created_at timestamptz not null default now()
);

comment on table public.points_history is 'Points balance changes: subscribe, refill, restore, refund';
create index if not exists idx_points_history_user_id on public.points_history(user_id);
create index if not exists idx_points_history_created_at on public.points_history(created_at desc);

alter table public.points_history enable row level security;
drop policy if exists "Users can view own points_history" on public.points_history;
create policy "Users can view own points_history"
  on public.points_history for select
  using (auth.uid()::text = user_id::text);
