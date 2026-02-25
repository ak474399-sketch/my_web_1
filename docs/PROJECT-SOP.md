# AI RestorePic 项目 SOP 文档

> 站点地址：https://restorepic.xyz  
> 最后更新：2026-02-25

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈](#2-技术栈)
3. [项目结构](#3-项目结构)
4. [环境变量配置](#4-环境变量配置)
5. [本地开发](#5-本地开发)
6. [数据库（Supabase）](#6-数据库supabase)
7. [认证系统（NextAuth + Google OAuth）](#7-认证系统nextauth--google-oauth)
8. [AI 修复引擎（Gemini）](#8-ai-修复引擎gemini)
9. [积分与会员系统](#9-积分与会员系统)
10. [支付系统（Polar）](#10-支付系统polar)
11. [多语言国际化](#11-多语言国际化)
12. [页面与路由](#12-页面与路由)
13. [API 接口](#13-api-接口)
14. [用户完整流程](#14-用户完整流程)
15. [部署上线（Vercel）](#15-部署上线vercel)
16. [日常运维](#16-日常运维)
17. [常见问题排查](#17-常见问题排查)

---

## 1. 项目概述

AI RestorePic 是一个基于 AI 的老照片修复 Web 应用。用户上传老旧、模糊、损坏的照片，由 Google Gemini AI 进行修复（去划痕、去模糊、上色、增强等），修复后可在线查看、对比和下载。

**核心功能：**
- 12 种专业修复工具（老照片修复、划痕去除、黑白上色、模糊修复等）
- 积分制访问控制（每次修复消耗 5 积分）
- 会员订阅（周/年订阅，定期发放积分）
- 修复历史记录
- 用户评论系统
- 多语言支持（8 种语言）

---

## 2. 技术栈

| 层面 | 技术 | 用途 |
|------|------|------|
| 前端框架 | Next.js 15 + React 19 | SSR/CSR 混合渲染 |
| 样式 | Tailwind CSS 3 | 原子化 CSS |
| 动画 | Framer Motion | 页面动效 |
| 图标 | Lucide React | UI 图标 |
| 认证 | NextAuth 4（Google OAuth） | 用户登录 |
| 数据库 | Supabase（PostgreSQL） | 数据存储 + 文件存储 |
| AI 引擎 | Google Gemini API（gemini-2.5-flash-image） | 图片修复 |
| 支付 | Polar.sh | 积分购买 + 订阅 |
| 分析 | Firebase Analytics | 用户行为追踪 |
| 部署 | Vercel | 自动化部署 |
| 语言 | TypeScript | 类型安全 |

---

## 3. 项目结构

```
my_web_1/
├── app/                              # Next.js App Router
│   ├── api/                          # 后端 API 路由
│   │   ├── auth/[...nextauth]/       #   NextAuth 认证端点
│   │   ├── checkout/                 #   Polar 结算跳转
│   │   ├── feedback/                 #   用户反馈提交
│   │   ├── restore/                  #   照片修复（核心）
│   │   │   └── history/              #   修复历史查询
│   │   ├── reviews/                  #   用户评论 CRUD
│   │   ├── user/                     #   用户相关
│   │   │   ├── credits/              #     积分查询
│   │   │   ├── initial-bonus/        #     初始奖励领取
│   │   │   └── points-history/       #     积分明细
│   │   └── webhooks/polar/           #   Polar 支付回调
│   ├── auth/callback/                # OAuth 回调页
│   ├── cases/                        # 案例展示
│   ├── history/                      # 修复历史
│   ├── login/                        # 登录页（重定向）
│   ├── login-success/                # 登录成功中转页
│   ├── member/                       # 会员中心
│   │   ├── feedback/                 #   反馈页
│   │   ├── points/                   #   积分明细
│   │   ├── review/                   #   发表评论
│   │   └── subscribe/                #   订阅页
│   ├── privacy/                      # 隐私政策
│   ├── restore/                      # 修复工具
│   │   └── [slug]/                   #   各修复工具详情页
│   ├── terms/                        # 服务条款
│   ├── globals.css                   # 全局样式
│   ├── layout.tsx                    # 根布局
│   ├── page.tsx                      # 首页
│   ├── robots.ts                     # SEO robots.txt
│   └── sitemap.ts                    # SEO sitemap.xml
│
├── components/
│   ├── analytics/                    # Firebase 分析组件
│   ├── member/                       # 会员相关组件
│   ├── shared/                       # 通用组件
│   │   ├── navbar.tsx                #   顶部导航栏
│   │   ├── footer.tsx                #   页脚
│   │   ├── hero-section.tsx          #   首屏（视频 + 上传）
│   │   ├── reviews-carousel.tsx      #   评论展示
│   │   ├── feature-section.tsx       #   功能特性展示
│   │   ├── knowledge-section.tsx     #   知识/FAQ
│   │   ├── auth-provider.tsx         #   NextAuth Session Provider
│   │   ├── locale-provider.tsx       #   多语言 Context
│   │   ├── login-modal.tsx           #   登录弹窗
│   │   └── ...
│   └── tool/                         # 工具组件
│       ├── compare-slider.tsx        #   修复前后对比滑块
│       └── upload-zone.tsx           #   图片上传区
│
├── lib/                              # 工具库 / 服务逻辑
│   ├── auth.ts                       #   认证配置与 session 解析
│   ├── supabase.ts                   #   Supabase 客户端（普通 + Admin）
│   ├── gemini.ts                     #   Gemini AI 调用 + 修复提示词
│   ├── credits.ts                    #   积分系统核心逻辑
│   ├── polar.ts                      #   Polar 产品 ID 与结账 URL
│   ├── polar-webhook-handlers.ts     #   Polar Webhook 处理
│   ├── translations.ts              #   多语言翻译文案
│   ├── i18n.ts                       #   国际化配置
│   ├── seo-data.ts                   #   SEO 元数据
│   ├── analytics.ts                  #   Firebase 分析事件
│   ├── firebase.ts                   #   Firebase 初始化
│   ├── storage.ts                    #   Supabase Storage 操作
│   └── ...
│
├── public/
│   ├── images/                       # 静态图片
│   └── videos/                       # 视频资源
│
├── supabase/
│   ├── migrations/                   # 数据库迁移脚本
│   └── schema.sql                    # 完整数据库 Schema
│
├── docs/                             # 项目文档
├── middleware.ts                      # Next.js 中间件
├── tailwind.config.ts                # Tailwind 配置
├── next.config.ts                    # Next.js 配置
└── package.json                      # 依赖管理
```

---

## 4. 环境变量配置

参考 `.env.example`，在本地创建 `.env.local`，在 Vercel 中配置 Environment Variables。

### 必需变量

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `GEMINI_API_KEY` | Google Gemini API 密钥 | [Google AI Studio](https://aistudio.google.com/) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key | 同上 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端 Key（保密） | 同上 |
| `SUPABASE_RESTORATIONS_BUCKET` | 存储桶名称 | 在 Supabase Storage 中创建，如 `restorations` |
| `NEXTAUTH_SECRET` | NextAuth 加密密钥 | 运行 `openssl rand -base64 32` 生成 |
| `NEXTAUTH_URL` | 站点完整 URL | 本地: `http://localhost:3000`，生产: `https://restorepic.xyz` |
| `GOOGLE_CLIENT_ID` | Google OAuth 客户端 ID | [Google Cloud Console](https://console.cloud.google.com/) → Credentials |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 客户端密钥 | 同上 |

### 可选变量

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点规范域名，用于 SEO canonical |
| `POLAR_ACCESS_TOKEN` | Polar 支付 API Token |
| `POLAR_WEBHOOK_SECRET` | Polar Webhook 签名密钥 |
| `POLAR_SUCCESS_URL` | 支付成功回调 URL |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Analytics 相关配置（共 7 个） |

---

## 5. 本地开发

### 前置条件
- Node.js 18+
- npm

### 启动步骤

```bash
# 1. 克隆项目
git clone https://github.com/ak474399-sketch/my_web_1.git
cd my_web_1

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入实际值

# 4. 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 5. 构建检查
npm run build

# 6. 代码检查
npm run lint
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | ESLint 检查 |

---

## 6. 数据库（Supabase）

### 数据表

| 表名 | 用途 | 关键字段 |
|------|------|----------|
| `users` | 用户账户 | id, email, name, avatar_url, role, credits, membership_type, membership_started_at, last_refill_at |
| `accounts` | OAuth 账号关联 | user_id, provider, provider_account_id, access_token |
| `sessions` | 会话（可选） | user_id, session_token, expires |
| `restorations` | 修复历史 | user_id, original_url, restored_url, status |
| `points_history` | 积分流水 | user_id, amount, reason, reference_id |
| `user_reviews` | 用户评论 | email, content, country |
| `feedback` | 用户反馈 | user_id, message, context |

### 初始化数据库

在 Supabase SQL Editor 中按顺序执行：

```
1. supabase/schema.sql                           （基础表结构）
2. supabase/migrations/20250126000000_restorations.sql   （修复历史表）
3. supabase/migrations/20250127000000_feedback.sql       （反馈表）
4. supabase/migrations/20250218_membership_points.sql    （会员+积分字段）
5. supabase/migrations/20250219000000_user_reviews.sql   （评论表）
6. supabase/migrations/20250226000000_initial_bonus_unique.sql  （防重复发放唯一索引）
```

### Storage 配置

在 Supabase Storage 中创建名为 `restorations` 的存储桶：
- 公开访问
- 允许 MIME: `image/jpeg`, `image/png`, `image/webp`
- 单文件大小限制: 10MB

---

## 7. 认证系统（NextAuth + Google OAuth）

### 架构

- 使用 NextAuth 4，JWT 策略（非数据库 session）
- Google OAuth 为唯一登录方式
- 用户数据存储在 Supabase `users` 表
- JWT 中携带 `userId` 和 `role`

### Google OAuth 配置

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 2.0 客户端
2. 添加 Authorized redirect URIs：
   - 本地：`http://localhost:3000/api/auth/callback/google`
   - 生产：`https://restorepic.xyz/api/auth/callback/google`
3. 将 Client ID 和 Secret 填入环境变量

### 登录流程

```
用户点击登录 → 弹出 Login Modal → 选择 Google 登录
→ 跳转 Google OAuth → 授权回调 → NextAuth signIn 回调
→ 新用户: 创建 users + accounts 记录, 赠送 5 积分
→ 老用户: 更新 name/avatar_url
→ 跳转 /login-success → 重定向首页 → 显示登录成功 Toast
```

### 中间件

`middleware.ts` 处理：
- URL 重定向（`/index.html` → `/`）
- NextAuth callback cookie 编码修复（防止 `INVALID_CALLBACK_URL_ERROR`）
- 非认证路由清除 callback cookie

---

## 8. AI 修复引擎（Gemini）

### 调用流程

```
用户上传图片 → 前端转 base64 → POST /api/restore
→ 扣减 5 积分 → 调用 Gemini API（gemini-2.5-flash-image）
→ 返回修复后图片 → 上传到 Supabase Storage → 记录到 restorations 表
→ 失败时退还积分
```

### 修复类型（12 种 slug）

| Slug | 功能 |
|------|------|
| `old-photo-restoration` | 老照片综合修复 |
| `faded-photo-repair` | 褪色照片修复 |
| `scratch-removal` | 划痕去除 |
| `water-damaged-photo-repair` | 水渍损坏修复 |
| `black-and-white-photo-colorization` | 黑白上色 |
| `blurry-photo-fix` | 模糊修复 |
| `photo-noise-reduction` | 噪点去除 |
| `face-enhancement` | 人脸增强 |
| `torn-photo-repair` | 撕裂修复 |
| `vintage-photo-enhancement` | 老照片增强 |
| `polaroid-photo-restoration` | 拍立得修复 |
| `book-photo-restoration` | 书本扫描照片修复 |

每种类型对应一条专业 Prompt（定义在 `lib/gemini.ts` 的 `RESTORE_PROMPTS_BY_SLUG` 中），引导 Gemini 执行对应的修复操作。

### 模型配置

- 模型：`gemini-2.5-flash-image`
- 输出模态：TEXT + IMAGE
- 最大输出 Token：8192
- System Prompt：强制只输出修复后的图片，不输出文字解释

---

## 9. 积分与会员系统

### 积分规则

| 事件 | 积分变动 | reason 标识 |
|------|----------|-------------|
| 新用户注册 | +5 | `signup_bonus` |
| 初始奖励（一次性） | +5 | `initial_bonus` |
| 购买积分包 | +10 | `purchase_credits_10` |
| 开通周订阅 | +100 | `subscribe_weekly` |
| 开通年订阅 | +10000 | `subscribe_yearly` |
| 周订阅续期 | +100 | `refill_weekly` |
| 年订阅续期 | +10000 | `refill_yearly` |
| 修复照片 | -5 | `restore_photo` |
| 修复失败退还 | +5 | `refund_restore_failed` |

### 会员类型

| 类型 | 价格 | 积分额度 | 刷新周期 |
|------|------|----------|----------|
| free | 免费 | 注册送 5 | 无 |
| weekly | $9.99/周 | 100/周 | 每 7 天 |
| yearly | $39.99/年 | 10000/年 | 每 365 天 |

### 防重复发放

- 数据库唯一索引 `idx_points_history_initial_bonus_once` 防止并发重复发放 `initial_bonus`
- 冲突时返回 PostgreSQL 错误码 `23505`，视为已发放

---

## 10. 支付系统（Polar）

### 产品 ID

| 产品 | Polar Product ID |
|------|------------------|
| 10 积分包 | `c18fd350-4d8d-42a6-a3bc-6afdbeeb8b6f` |
| 周订阅 | `86f96d51-7027-4add-9513-c1729df3604a` |
| 年订阅 | `e659ea84-6a99-4a7d-9cd8-43d25fd0e27a` |

### 支付流程

```
用户选择套餐 → 前端跳转 /api/checkout?products=xxx
→ 重定向到 Polar 支付页 → 用户完成支付
→ Polar 发送 Webhook → POST /api/webhooks/polar
→ 根据事件类型处理：
   - order.paid → 积分包加 10 积分
   - subscription.active → 开通/续期会员 + 发放积分
   - subscription.revoked → 撤销会员资格
→ 用户回到 /member/subscribe?checkout=success
```

### Webhook 事件处理

| 事件 | 处理逻辑 |
|------|----------|
| `order.paid` | 根据 productId 判断为积分包时，加 10 积分 |
| `subscription.active` | 开通会员，设置 membership_type，发放对应积分 |
| `subscription.revoked` | 恢复为 free，清空 membership_started_at |

---

## 11. 多语言国际化

### 支持语言

| 代码 | 语言 |
|------|------|
| `en` | English |
| `de` | Deutsch |
| `fr` | Français |
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁體中文 |
| `es` | Español |
| `pt` | Português |
| `ar` | العربية（RTL） |

### 机制

- 翻译文案集中在 `lib/translations.ts`（单文件管理）
- `LocaleProvider` 提供 `useLocale()` Hook，返回 `{ locale, setLocale, t }`
- 语言选择存储在 Cookie `NEXT_LOCALE`（有效期 365 天）
- 默认语言：先读 Cookie → 再读浏览器语言 → 兜底 `en`
- 阿拉伯语支持 RTL 布局

### 新增/修改文案

只需编辑 `lib/translations.ts` 中对应语言的对象即可，所有页面自动生效。

---

## 12. 页面与路由

### 公开页面

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero 视频 + 上传区 + 功能展示 + 工具列表 + 评论 + 案例 |
| `/restore` | 修复工具（通用） | 通用修复入口 |
| `/restore/[slug]` | 修复工具（专项） | 12 种专项修复工具 |
| `/cases` | 案例展示 | 修复前后对比案例 |
| `/privacy` | 隐私政策 | 静态页面 |
| `/terms` | 服务条款 | 静态页面 |

### 需登录页面

| 路由 | 页面 | 说明 |
|------|------|------|
| `/history` | 修复历史 | 查看历史修复记录（前后对比） |
| `/member` | 会员中心 | 积分余额、会员状态、领取奖励 |
| `/member/subscribe` | 订阅页 | 选择套餐购买 |
| `/member/points` | 积分明细 | 积分流水记录（分页） |
| `/member/feedback` | 反馈页 | 提交使用反馈 |
| `/member/review` | 发表评论 | 提交公开评论 |

### 认证相关页面

| 路由 | 说明 |
|------|------|
| `/login` | 重定向到 `/?login=1` |
| `/login-success` | 登录成功中转，写 sessionStorage 后跳首页 |
| `/auth/callback` | OAuth 回调处理 |

---

## 13. API 接口

### 认证

| 方法 | 路由 | 说明 | 鉴权 |
|------|------|------|------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth 认证端点 | 无 |

### 核心业务

| 方法 | 路由 | 说明 | 鉴权 |
|------|------|------|------|
| POST | `/api/restore` | 照片修复 | 需登录 |
| GET | `/api/restore/history` | 修复历史 | 需登录 |
| GET | `/api/user/credits` | 查询积分 | 需登录 |
| GET | `/api/user/initial-bonus` | 领取初始奖励 | 需登录 |
| GET | `/api/user/points-history` | 积分明细（分页） | 需登录 |

### 用户内容

| 方法 | 路由 | 说明 | 鉴权 |
|------|------|------|------|
| GET | `/api/reviews` | 获取评论列表 | 无 |
| POST | `/api/reviews` | 提交评论 | 无 |
| POST | `/api/feedback` | 提交反馈 | 可选 |

### 支付

| 方法 | 路由 | 说明 | 鉴权 |
|------|------|------|------|
| GET | `/api/checkout` | Polar 结算跳转 | 无 |
| POST | `/api/webhooks/polar` | Polar 支付回调 | Webhook Secret |

---

## 14. 用户完整流程

### 新用户首次使用

```
1. 访问首页 → 自动弹出登录弹窗
2. 点击「Sign in with Google」 → Google 授权
3. 授权成功 → 创建用户（5 积分）→ 跳转首页
4. 首页展示「已赠送 5 积分」Toast
5. 首页上传照片 / 点击工具卡片进入修复页
6. 选择照片 → 自动修复（扣 5 积分）
7. 查看修复结果 → 对比滑块查看前后效果
8. 积分用完 → 跳转订阅页购买
```

### 修复照片

```
1. 上传图片（支持 JPEG/PNG/WebP，最大 8MB）
2. 前端转 base64 → POST /api/restore
3. 服务端验证登录 → 扣减 5 积分
4. 调用 Gemini AI → 返回修复图片
5. 上传原图 + 修复图到 Supabase Storage
6. 写入 restorations 表
7. 前端展示对比滑块 + 下载按钮
8. 失败时自动退还积分
```

### 购买积分/订阅

```
1. 进入 /member/subscribe
2. 选择套餐：积分包($0.99) / 周订阅($9.99) / 年订阅($39.99)
3. 跳转 Polar 支付页完成支付
4. Polar Webhook 通知 → 服务端处理
5. 积分/会员状态更新 → 用户回到成功页
```

---

## 15. 部署上线（Vercel）

### 首次部署

1. 在 [Vercel](https://vercel.com) 导入 GitHub 仓库
2. 配置 Environment Variables（见第 4 节）
3. 添加自定义域名（Settings → Domains）
4. 配置 Google OAuth redirect URI 指向生产域名

### 日常部署

```bash
# 代码改动后
git add .
git commit -m "描述改动"
git push origin main
# Vercel 自动触发部署
```

### 部署前检查

```bash
npm run build   # 确认构建无报错
npm run lint    # 确认无 lint 错误
```

### Vercel 配置要点

- Framework Preset: Next.js（自动检测）
- Build Command: `next build`（默认）
- Output Directory: `.next`（默认）
- Node.js Version: 18.x+

---

## 16. 日常运维

### 监控要点

| 监控项 | 方式 |
|--------|------|
| 部署状态 | Vercel Dashboard → Deployments |
| API 报错 | Vercel → Functions → Logs |
| 数据库 | Supabase Dashboard → Table Editor |
| 积分异常 | 查 `points_history` 表 |
| 支付回调 | Polar Dashboard → Webhooks |
| 用户分析 | Firebase Analytics |

### 数据库维护

```sql
-- 查看用户积分余额
SELECT id, email, credits, membership_type FROM users ORDER BY created_at DESC;

-- 查看积分流水
SELECT * FROM points_history WHERE user_id = 'xxx' ORDER BY created_at DESC;

-- 查看最近修复记录
SELECT * FROM restorations ORDER BY created_at DESC LIMIT 20;

-- 查看用户评论
SELECT * FROM user_reviews ORDER BY created_at DESC;
```

### 新增修复工具

1. 在 `lib/gemini.ts` 的 `RESTORE_PROMPTS_BY_SLUG` 中添加新 slug 和 Prompt
2. 在 `lib/seo-data.ts` 中添加 slug 的 SEO 元数据和预览图
3. 在 `lib/translations.ts` 中添加对应的多语言文案
4. 工具页面 `/restore/[slug]` 会自动支持新 slug

---

## 17. 常见问题排查

### 登录失败

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| Google 登录后白屏 | `NEXTAUTH_URL` 配置错误 | 确保与实际域名一致 |
| `INVALID_CALLBACK_URL_ERROR` | Cookie 编码问题 | middleware 已处理，检查是否部署了最新代码 |
| 401 Unauthorized | JWT 解析失败 | 检查 `NEXTAUTH_SECRET` 是否一致 |

### 修复失败

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| Gemini 无响应 | API Key 无效/额度用完 | 检查 `GEMINI_API_KEY`，查看 Google AI Studio 配额 |
| 图片上传失败 | Storage 桶未创建/权限 | 检查 Supabase Storage 配置 |
| 积分未扣除/退还 | 数据库连接问题 | 检查 Supabase 连接和 Service Role Key |

### 支付问题

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| 支付后积分未到账 | Webhook 未触发 | 检查 Polar Webhook 配置和 Secret |
| 503 结账页 | Polar 未配置 | 检查 `POLAR_ACCESS_TOKEN` 和 `POLAR_SUCCESS_URL` |

### 数据库问题

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| `TABLE_MISSING` | 迁移未执行 | 在 Supabase 执行对应 migration SQL |
| Supabase 返回 HTML | URL 配置错误 | 检查 `NEXT_PUBLIC_SUPABASE_URL` 格式 |

---

## 附录：关键文件速查

| 需求 | 文件位置 |
|------|----------|
| 修改首页内容 | `app/page.tsx` + `components/shared/hero-section.tsx` |
| 修改导航栏 | `components/shared/navbar.tsx` |
| 修改翻译文案 | `lib/translations.ts` |
| 修改修复 Prompt | `lib/gemini.ts` → `RESTORE_PROMPTS_BY_SLUG` |
| 修改积分规则 | `lib/credits.ts` |
| 修改支付产品 | `lib/polar.ts` → `POLAR_PRODUCT_IDS` |
| 修改 SEO 数据 | `lib/seo-data.ts` |
| 修改数据库结构 | `supabase/migrations/` 新增迁移文件 |
| 修改环境变量 | `.env.local`（本地）/ Vercel Dashboard（生产） |
| 修改样式主题 | `tailwind.config.ts` → `theme.extend.colors` |
