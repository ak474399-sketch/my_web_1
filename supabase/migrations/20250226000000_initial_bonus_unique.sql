-- 每个用户最多一条 initial_bonus 记录，防止并发请求重复发放
create unique index if not exists idx_points_history_initial_bonus_once
  on public.points_history (user_id)
  where reason = 'initial_bonus';
