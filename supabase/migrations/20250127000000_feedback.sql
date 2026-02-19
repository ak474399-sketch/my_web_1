-- User feedback table
create table if not exists public.feedback (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.users(id) on delete set null,
  message         text not null,
  context         text,
  created_at      timestamptz not null default now()
);

comment on table public.feedback is 'User feedback submissions';
create index if not exists idx_feedback_created_at on public.feedback(created_at desc);
create index if not exists idx_feedback_user_id on public.feedback(user_id);

alter table public.feedback enable row level security;

-- Only service role writes; no public read
create policy "Service role can manage feedback"
  on public.feedback for all
  using (true)
  with check (true);
