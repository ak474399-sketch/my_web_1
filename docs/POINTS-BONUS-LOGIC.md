# 一次性 5 积分发放逻辑梳理

## 1. 两种发放来源

| 来源 | reason | 触发时机 | 谁会拿到 |
|-----|--------|----------|----------|
| **signup_bonus** | `signup_bonus` | 新用户首次用 Google 注册时，在 `lib/auth.ts` 的 `signIn` 回调里 | 仅新注册用户（创建 users 时同时写 `users.credits=5` + `points_history(amount=5, reason=signup_bonus)`） |
| **initial_bonus** | `initial_bonus` | 登录后前端调 `GET /api/user/initial-bonus`，后端执行 `grantInitialBonusIfEligible` | 任何**从未**拿过「一次性 5 积分」的用户（没有 signup_bonus 且没有 initial_bonus 记录即发） |

新用户只会有 signup_bonus，不会再有 initial_bonus（因为已有记录）。老用户只要没有任一条 signup_bonus/initial_bonus，就会在调用 initial-bonus API 时拿到 5 并写入 initial_bonus。

## 2. 后端判定（唯一真相）

- **文件**：`lib/credits.ts` → `grantInitialBonusIfEligible(userId)`
- **步骤**：
  1. 查 `points_history` 是否已有该 `user_id` 的任一条 `reason in ('signup_bonus','initial_bonus')`。
  2. 有 → 返回 `{ granted: false }`，不写库、不加积分。
  3. 无 → 先插入 `points_history(amount=5, reason='initial_bonus')`，再 `users.credits += 5`，返回 `{ granted: true }`。
- **并发**：依赖唯一索引 `idx_points_history_initial_bonus_once`（`(user_id) WHERE reason = 'initial_bonus'`），重复请求会 insert 冲突 23505，视为已发过，返回 `granted: false`。

## 3. 前端行为（仅缓存与展示）

- **localStorage**：`lib/initial-bonus-storage.ts`，按 `initial_bonus_granted_${userId}` 存是否「已展示过/已请求过」，用于：
  - 减少重复请求 initial-bonus API；
  - 登录成功 toast 与积分页展示「已赠送 5 积分」等。
- **是否真的发过**：以后端 DB 为准；前端本地记录不参与鉴权。

## 4. 调用链简述

1. 用户登录成功（新用户 signIn 里已给 5 + signup_bonus；老用户 signIn 只更新资料）。
2. 前端（登录成功 toast 或进入积分页）在未命中本地记录时请求 `GET /api/user/initial-bonus`（带 cookie）。
3. 服务端 `getSessionFromRequest` 识人 → `grantInitialBonusIfEligible(userId)` 按上面规则决定是否发 5。
4. 若返回 `granted: true`，前端写本地记录并刷新积分/明细展示。

## 5. 小结

- **新用户**：只在 signIn 时拿 5（signup_bonus），之后调 initial-bonus 会因已有记录而不重复发。
- **老用户（从未拿过 5）**：登录后调 initial-bonus 会发 5 并写 initial_bonus，积分与明细由后续请求刷新。
- **老用户（已拿过）**：DB 已有 signup_bonus 或 initial_bonus，initial-bonus API 始终返回 `granted: false`。
