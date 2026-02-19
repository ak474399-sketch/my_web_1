-- User reviews table (用户评论：邮箱、反馈内容、时间、国家)
create table if not exists public.user_reviews (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  content    text not null,
  country    text,
  created_at timestamptz not null default now()
);

comment on table public.user_reviews is 'User reviews for display (email, content, time, country)';
comment on column public.user_reviews.email is 'User email';
comment on column public.user_reviews.content is 'Review/feedback content';
comment on column public.user_reviews.country is 'User country';

create index if not exists idx_user_reviews_created_at on public.user_reviews(created_at desc);

alter table public.user_reviews enable row level security;

-- Allow public read so homepage carousel can fetch reviews
create policy "Anyone can read user_reviews"
  on public.user_reviews for select
  using (true);

-- Insert/update/delete: use service role in API (bypasses RLS)
