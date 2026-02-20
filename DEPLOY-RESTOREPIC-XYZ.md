# 域名 restorepic.xyz 与品牌 AI RestorePic 上线清单

## 已完成的代码更新

- **默认站点 URL**：`layout.tsx` 中 `metadataBase` 回退地址已改为 `https://restorepic.xyz`。
- **Metadata**：首页 title 为 `AI RestorePic - Professional AI Photo Restoration`，template 为 `%s | AI RestorePic`。
- **SEO Description**：已包含 “AI RestorePic helps you restore, colorize, and sharpen old photos in seconds”。
- **导航栏**：左上角 Logo 文案已通过多语言改为 **AI RestorePic**（所有语言）。
- **页脚**：版权声明已改为 **© 2026 AI RestorePic. All rights reserved.**
- **Terms / Privacy**：页面 title 与 description 已改为 AI RestorePic。

---

## 你需要完成的事项（按顺序）

### 1. Vercel 环境变量（使用 restorepic.xyz）

在 Vercel 项目 **Settings → Environment Variables** 中设置（并勾选 Production）：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://restorepic.xyz` | 站点正式地址，用于 canonical、OG 等 |
| `NEXTAUTH_URL` | `https://restorepic.xyz` | NextAuth 回调与 session，必须与访问域名一致 |

其余变量（如 `NEXTAUTH_SECRET`、`GOOGLE_CLIENT_ID`、`GOOGLE_CLIENT_SECRET`、Supabase 相关）若已配置可保持不变。

### 2. Google OAuth 已授权重定向 URI

在 [Google Cloud Console](https://console.cloud.google.com/) → 你的项目 → **APIs & Services** → **Credentials** → 使用的 OAuth 2.0 客户端 ID：

- 在 **已授权的重定向 URI** 中新增：  
  `https://restorepic.xyz/api/auth/callback/google`
- 保存。

（若仍要支持 Vercel 默认域名，可保留如 `https://xxx.vercel.app/api/auth/callback/google`。）

### 3. Vercel 域名绑定（若尚未绑定）

- 在 Vercel 项目 **Settings → Domains** 中添加 `restorepic.xyz`（以及是否需要 `www.restorepic.xyz`）。
- 按 Vercel 提示在域名注册商处添加给出的 **CNAME** 或 **A** 记录，并等待 DNS 生效。

### 4. 本地 .env.local（可选）

若本地也要模拟生产环境，可设置：

- `NEXT_PUBLIC_SITE_URL=https://restorepic.xyz`
- `NEXTAUTH_URL=https://restorepic.xyz`（仅当本地通过该域名访问时使用，否则继续用 `http://localhost:3000`）

### 5. 部署与验证

- 将当前修改 **提交并推送到 Git**，触发 Vercel 自动部署；或在 Vercel 控制台手动 **Redeploy**。
- **若出现 NextAuth `INVALID_CALLBACK_URL_ERROR`（Received: https%3A%2F%2Frestorepic.xyz）**：
  - 部署时务必执行 `npm install`（会跑 postinstall，给 next-auth 打补丁）。若使用 `npm ci --ignore-scripts`，需改为允许 scripts 或改为 `npm install`。
  - 在 Vercel 控制台 **Redeploy** 时勾选 **Clear Build Cache** 再部署，确保用打补丁后的 node_modules 重新打包。
- 部署完成后访问 `https://restorepic.xyz`，确认：
  - 页面标题、导航栏、页脚版权为 **AI RestorePic**。
  - 使用 Google 登录可正常跳转并回到 `https://restorepic.xyz`。
  - 登录后积分/历史等接口不再报 500。

---

## 简要检查表

- [ ] Vercel 环境变量：`NEXT_PUBLIC_SITE_URL`、`NEXTAUTH_URL` 已设为 `https://restorepic.xyz`
- [ ] Google OAuth：已添加 `https://restorepic.xyz/api/auth/callback/google`
- [ ] Vercel Domains：已添加 `restorepic.xyz` 并完成 DNS 解析
- [ ] 代码已推送，Vercel 部署成功
- [ ] 浏览器访问 https://restorepic.xyz 并测试登录与版权文案

完成以上步骤后，站点即可在 **restorepic.xyz** 上以品牌 **AI RestorePic** 正式对外使用。
