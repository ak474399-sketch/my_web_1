# 积分未到账 & 历史加载失败 — 可能原因与分步排查

本文档只做**可能性列举**和**排查步骤**，不直接改代码。按顺序执行可逐步缩小问题范围。

---

## 一、积分没有获取到 — 可能原因 List

### A. 前端未发起或未带登录态

| # | 可能性 | 说明 |
|---|--------|------|
| A1 | 登录成功页没有带 `?login=success` | Toast 只在 `searchParams.get("login") === "success"` 时请求 initial-bonus，若回调跳转没带上该参数则不会调 API。 |
| A2 | `useSession()` 在请求时尚未 `authenticated` | 页面先渲染，session 稍后才就绪，initial-bonus 在 400ms 后发；若 session 更晚才拿到，可能 `session.user.id` 仍为空。 |
| A3 | `session.user.id` 在前端为空 | 客户端拿到的 session 来自 JWT/session 回调；若 JWT 里没有 `userId`，则 `userId` 为空，Toast 里不会调用 initial-bonus（或调了但没带有效 cookie）。 |
| A4 | 请求未带 cookie（`credentials`） | 若 fetch 未设置 `credentials: "include"` 或跨域导致 cookie 未发送，服务端拿不到登录态。当前代码已带 `credentials: "include"`，需确认部署/代理未改写请求。 |
| A5 | 用户没进「积分页」或没触发 Toast | 积分页和 Toast 都会请求 initial-bonus；若用户从未进入这些场景，API 不会被调用。 |

### B. 服务端识人失败（401）

| # | 可能性 | 说明 |
|---|--------|------|
| B1 | 请求里没有 Cookie 头 | 部署环境（如 Edge/Serverless）或反向代理未把 Cookie 透传到 API，或域名/路径不一致导致未带上。 |
| B2 | Cookie 名不匹配 | NextAuth 在 HTTPS 下用 `__Secure-next-auth.session-token`，否则 `next-auth.session-token`；若 NEXTAUTH_URL 与实际访问协议不一致，可能读不到。 |
| B3 | `getToken` 拿不到 token | `reqForJwt(request)` 依赖 `request.headers.get("cookie")`；若运行环境对 Request 做了处理，可能 cookie 为空或格式不对。 |
| B4 | JWT 里没有 `userId` | 新用户首次登录时，jwt 回调在 signIn 之后执行；若 DB 查 user 失败或未重试成功，token 里不会写入 `userId`，仅靠 email 回退。 |
| B5 | Email 回退失败 | `getSessionFromRequest` 里用 `token.email` 查 `users`；若 Supabase 未就绪、网络失败、或 users 表里还没有该 email（时序问题），则拿不到 userId。 |
| B6 | `NEXTAUTH_SECRET` 缺失或不一致 | 本地与部署、或多次部署间 secret 不同，会导致 JWT 解密失败，getToken 返回 null。 |

### C. 服务端认为「已发过」或不满足发放条件

| # | 可能性 | 说明 |
|---|--------|------|
| C1 | 已有 signup_bonus / initial_bonus 记录 | `grantInitialBonusIfEligible` 查到该 user_id 在 points_history 中已有任一条，则返回 `granted: false`。新用户若 signIn 已写入 signup_bonus，就不会再发 initial_bonus。 |
| C2 | 新用户 signIn 未写入 signup_bonus | signIn 里插入 points_history 失败（含重试后仍失败），则 users.credits 可能为 5 但无 signup_bonus；后续 initial-bonus 会再发 5 并写 initial_bonus。若 signIn 和 initial-bonus 都因识人失败未执行，则表现为「没积分」。 |
| C3 | 并发导致唯一约束冲突 | 同一用户短时间内多次调 initial-bonus，第二次插入 initial_bonus 触发 23505，返回 `granted: false`，属预期；不会多发，但若第一次也失败则用户会以为没发。 |

### D. 积分已发放但前端未展示

| # | 可能性 | 说明 |
|---|--------|------|
| D1 | `/api/user/credits` 返回 401 | 与 B 类相同：识人失败导致 credits 接口也 401，前端拿不到积分数字，显示为 0 或占位。 |
| D2 | 前端未刷新 credits / 积分页 | initial-bonus 返回 granted 后，若未再请求 credits 或未更新 state，界面会仍显示旧值。 |
| D3 | 积分页/导航栏请求时机早于 initial-bonus | 先请求 credits 得到 0，再请求 initial-bonus 发放 5；若之后没有再次请求 credits，会一直显示 0。 |

---

## 二、历史加载失败 — 可能原因 List

### E. 前端未带登录态或未发起请求

| # | 可能性 | 说明 |
|---|--------|------|
| E1 | 历史页请求时 `status !== "authenticated"` | useEffect 依赖 `status`；若在 authenticated 之前就跑完或未重新跑，不会请求 `/api/restore/history`。 |
| E2 | 请求未带 cookie | 同上 A4；当前代码用相对路径 fetch，一般会带同源 cookie，需确认部署后是否仍同源、是否有代理剥离 cookie。 |
| E3 | 请求被取消或报错未处理 | 组件卸载会 cancel；若网络错误或 CORS 等导致抛错，会进入 catch，设置 error 状态，展示错误文案。 |

### F. 服务端识人失败（401）

| # | 可能性 | 说明 |
|---|--------|------|
| F1 | 与 B 类相同 | 历史接口同样用 `getUserIdFromRequest`，cookie/JWT/email 回退任一失败都会 401，前端会显示「请先登录」等。 |

### G. 服务端 DB 报错（500）

| # | 可能性 | 说明 |
|---|--------|------|
| G1 | `restorations` 表不存在 | 未在 Supabase 执行 `20250126000000_restorations.sql` 或执行失败，会报 42P01，接口返回 code TABLE_MISSING。 |
| G2 | Supabase 连接/权限/配额问题 | 网络超时、key 错误、或项目暂停等，会得到非 42P01 的 error，接口返回 code DB_ERROR。 |
| G3 | RLS 与 service role | 当前接口用 supabaseAdmin（service role），应绕过 RLS；若误用 anon key 或 policy 过严，可能查不到数据或报错。 |

### H. 返回 200 但前端仍显示「加载失败」

| # | 可能性 | 说明 |
|---|--------|------|
| H1 | 响应体不是合法 JSON | 若中间层改写响应或报错返回 HTML，前端 `res.json()` 可能抛错，进入 catch，显示错误。 |
| H2 | 前端把 200 当错误处理 | 逻辑错误导致只有 401/500 才 setError，若误判 200 也会 setError，需核对 history 页的 then/catch 分支。 |

---

## 三、分步排查步骤（按顺序做）

### 第一步：确认「是前端问题还是接口问题」

1. **积分**
   - 浏览器打开开发者工具 → Network。
   - 登录后触发会调 initial-bonus 的路径（带 `?login=success` 的页或进入积分页）。
   - 找到请求 `GET /api/user/initial-bonus` 和 `GET /api/user/credits`：
     - **状态码**：200 / 401 / 500？
     - **Request Headers** 里是否有 `Cookie`（含 `next-auth.session-token` 或 `__Secure-next-auth.session-token`）？
     - **Response**：initial-bonus 是 `{ granted: true }` 还是 `{ granted: false }` 或 `{ error: "Unauthorized" }`？
   - 记录：initial-bonus 状态码 + 响应 body；credits 状态码 + 响应 body。

2. **历史**
   - 同上，找到 `GET /api/restore/history`：
     - **状态码**：200 / 401 / 500？
     - **Request Headers** 里是否有 Cookie？
     - **Response**：若 200，是否为 `{ items: [] }` 或 `{ items: [...] }`？若 401/500，body 里是否有 `code`？
   - 记录：状态码 + 完整响应 body。

**结论**：
- 若 **401**：问题在「识人」（B/F 类），继续第二步。
- 若 **500**：问题在「DB 或服务端异常」（G 类），继续第三步。
- 若 **200 且数据正确**：问题在前端展示或请求时机（A/D/E/H 类），继续第四步。
- 若 **根本没有请求**：问题在前端未发起（A1/A2/A5/E1 等），继续第四步。

---

### 第二步：定位「为什么识人失败（401）」

1. **确认 Cookie 是否到达服务端**
   - 在 `app/api/user/initial-bonus/route.ts` 或 `app/api/restore/history/route.ts` 最开头临时加一行：
     - `console.log("cookie present", !!request.headers.get("cookie"));`
   - 部署后再次复现，看服务端日志是否打印 `cookie present true`。
   - 若为 `false`：请求未带 cookie（A4/B1）或部署/代理问题。

2. **确认 NEXTAUTH_SECRET**
   - 部署环境变量里是否配置了 `NEXTAUTH_SECRET`，且与生成 JWT 时一致（不能换一次部署就换一个 secret）。

3. **确认 NEXTAUTH_URL**
   - 是否与用户实际访问的地址一致（协议、域名、端口）；影响 NextAuth 的 cookie 名（Secure 前缀）和回调地址。

4. **确认 JWT 内是否有 userId**
   - 在 `lib/auth.ts` 的 `getUserIdFromRequest` 里，getToken 之后临时打 log：`console.log("token userId", (token as any)?.userId, "email", (token as any)?.email);`
   - 若 userId 一直为空、仅有 email：说明 jwt 回调里未写入 userId（B4），或 signIn 完成后 users 表里还没有该 email（B5 时序）。

5. **确认 users 表是否有对应用户**
   - 用 Supabase Dashboard 查 `users` 表：登录用的 Google 邮箱是否已存在，且 `id` 与 JWT 里后续写入的（或 email 回退查到的）一致。

**结论**：根据上面哪一步不满足，对应回「一、B」或「二、F」的具体项。

---

### 第三步：定位「DB/500 问题」

1. **历史接口 500 时看响应 body**
   - 若 `code === "TABLE_MISSING"`：在 Supabase SQL Editor 执行 `supabase/migrations/20250126000000_restorations.sql`，确保 `public.restorations` 存在。
   - 若 `code === "DB_ERROR"`：看服务端日志里 `[/api/restore/history]` 后的 `error.message`、`error.code`（Supabase 的错误码）。

2. **检查 Supabase 状态**
   - 项目是否 pause、是否欠费；Dashboard 里该项目的 API 请求是否报错。

3. **检查环境变量**
   - `SUPABASE_SERVICE_ROLE_KEY`（或你用来初始化 supabaseAdmin 的 key）是否配置正确、是否有权访问 `restorations` 和 `users`、`points_history`。

**结论**：对应到「二、G」的某一项。

---

### 第四步：定位「前端未发起或展示错误」

1. **积分：是否真的发起了 initial-bonus 请求**
   - 若 Network 里没有 `/api/user/initial-bonus`：
     - 检查登录成功后跳转的 URL 是否带 `?login=success`（A1）。
     - 检查 Toast 的 useEffect 条件：`status === "authenticated"` 且 `searchParams.get("login") === "success"` 且 `!done`（A2/A5）。

2. **积分：session.user.id 是否为空**
   - 在 Toast 里临时 `console.log(session?.user)`，看是否有 `id`。若没有，说明客户端拿到的 session 里就没有 id（A3），根因通常是 JWT 里没 userId（回到第二步）。

3. **历史：是否发起了 history 请求**
   - 若没有 `/api/restore/history`：看 history 页 useEffect 是否在 `status === "authenticated"` 后才执行（E1）。

4. **历史：200 却显示错误**
   - 看 Response 的 Content-Type 是否为 `application/json`，body 是否为 `{ items: [] }`；若前端在 200 时仍 setError，检查 then/catch 逻辑（H2）。

**结论**：对应到「一、A/D」或「二、E/H」。

---

### 第五步：确认「积分是否已在库里」

1. 在 Supabase 查 `users` 表：对应用户的 `credits` 当前值。
2. 查 `points_history` 表：该 `user_id` 下是否有 `reason in ('signup_bonus','initial_bonus')` 的记录。
3. 若库里已有 5 积分且有一条 bonus 记录，但前端显示 0：必是「识人失败导致 credits 接口 401」或「前端未刷新 credits」（D1/D2/D3），回到第一步看 credits 请求的状态码和响应。

---

## 四、快速对照表

| 你看到的现象 | 优先排查 |
|--------------|----------|
| 登录后从没有「获得 5 积分」提示，积分一直 0 | 第一步看 initial-bonus、credits 请求状态码；401 → 第二步；200 且 granted:true → 第四步 D2/D3、第五步 |
| 点击历史一直「加载失败」或「请先登录」 | 第一步看 history 请求状态码；401 → 第二步；500 → 第三步；200 → 第四步 H |
| 有时有积分有时没有 / 换设备就没有 | 第二步（cookie、NEXTAUTH_SECRET/URL、JWT userId） |
| 新用户没有、老用户有（或反过来） | 第一步看 initial-bonus 的 granted；再结合 C1/C2、第二步 B4/B5 |

按上述顺序做完，即可把问题归到具体某一两条可能性，再针对那几条做修改或加 log 即可精确定位。
