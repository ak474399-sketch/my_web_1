# Vercel 部署与生产环境配置

## 1. 生产环境变量 (Environment Variables)

在 Vercel 项目 **Settings → Environment Variables** 中配置以下变量，并勾选 **Production**（如需在 Preview 环境使用可同时勾选）。

### 必需 (Required)

| 变量名 | 说明 | 示例 / 获取方式 |
|--------|------|------------------|
| `GEMINI_API_KEY` | Google AI (Gemini) API 密钥，用于照片修复 | Google AI Studio 创建 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名（公开）Key | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端 Key（保密） | Supabase → Settings → API |
| `SUPABASE_RESTORATIONS_BUCKET` | 存储修复图的桶名称 | 如 `restorations`，需在 Storage 中创建 |
| `NEXTAUTH_SECRET` | NextAuth 加密与签名密钥 | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | 生产环境站点完整 URL | `https://你的自定义域名.com` |
| `GOOGLE_CLIENT_ID` | Google OAuth 客户端 ID | Google Cloud Console → 凭据 |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 客户端密钥 | Google Cloud Console → 凭据 |

### 可选 (Optional)

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点规范域名，用于 canonical、OG 等 | `https://你的自定义域名.com` |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase (Analytics) 配置，用于统计 | 见 `.env.example` 中 Firebase 段，从 Firebase Console 复制 |

- 若不设置 `NEXT_PUBLIC_SITE_URL`，将回退为 `NEXTAUTH_URL` 或 `https://你的域名.com`，建议与 `NEXTAUTH_URL` 一致。

### 支付 (Stripe / Lemon Squeezy / Paddle)

接入支付时再在 Vercel 中增加对应变量，例如：

**Stripe**

- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`（若前端需直连）
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_WEEKLY` / `STRIPE_PRICE_ID_YEARLY`（或你使用的 Price ID 变量名）

**Lemon Squeezy**

- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_STORE_ID`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `LEMONSQUEEZY_VARIANT_ID_WEEKLY` / `LEMONSQUEEZY_VARIANT_ID_YEARLY`

**Paddle**

- `PADDLE_VENDOR_ID`、`PADDLE_API_KEY`、`PADDLE_WEBHOOK_SECRET` 等（按 Paddle 文档配置）

---

## 2. Google OAuth 生产配置

1. 打开 [Google Cloud Console](https://console.cloud.google.com/) → 你的项目 → **APIs & Services** → **Credentials**。
2. 编辑用于登录的 **OAuth 2.0 客户端 ID**（Web 应用）。
3. 在 **Authorized redirect URIs** 中添加：  
   `https://你的自定义域名.com/api/auth/callback/google`
4. 保存。

---

## 3. 自定义域名与 Canonical

- 在 Vercel 项目 **Settings → Domains** 中添加自定义域名并按要求解析。
- 根布局已使用 `NEXT_PUBLIC_SITE_URL`（或回退到 `NEXTAUTH_URL`）生成 **canonical** 和 `metadataBase`，避免重复收录与 SEO 问题。部署后请确保上述环境变量在生产环境中已正确设置。

---

## 4. 部署前本地检查

```bash
# 安装依赖
npm ci

# 类型与构建
npm run build

# 代码检查
npm run lint
```

在 Vercel 上部署时，`next build` 会自动执行；若构建失败，请根据报错修正类型或语法后再部署。
