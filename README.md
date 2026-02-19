# 老照片修复 (Photo Restore) — pSEO 架构

基于 Next.js 15 + Gemini 的老照片修复 Web 应用，架构清晰、可扩展，支持编程化 SEO（pSEO）长尾路由。

## 技术栈

- **框架**: Next.js 15+ (App Router)
- **样式**: Tailwind CSS（深色主题）
- **后端**: Vercel Serverless（`app/api/restore`）
- **AI**: Google Gemini 2.0 Flash API
- **图标**: Lucide React

## 项目结构

```
app/
  api/restore/route.ts    # 修复 API：接收 Base64，调用 Gemini
  restore/
    page.tsx              # 通用修复页
    [slug]/page.tsx       # pSEO 动态路由（如 /restore/old-photo-restoration）
    [slug]/restore-tool.tsx
  layout.tsx
  page.tsx
  globals.css
lib/
  gemini.ts               # Gemini 调用与系统提示词
components/
  tool/
    upload-zone.tsx       # 图片上传
    compare-slider.tsx    # 修复前后对比滑块
  shared/
    navbar.tsx
    footer.tsx
```

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local，填入 GEMINI_API_KEY（从 https://aistudio.google.com/apikey 获取）
```

3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 核心流程

1. **上传**：用户在 `UploadZone` 选择或拖拽图片，前端转为 Base64。
2. **API 调用**：`POST /api/restore` 接收 `{ imageBase64, mimeType?, userPrompt? }`，调用 `lib/gemini.ts` 的 `restorePhoto()`。
3. **结果展示**：返回 `text`（修复方案描述）及可选 `imageBase64`；前端用 `CompareSlider` 做修复前后对比。

MVP 阶段使用 Base64 传输，无需对象存储；后续可改为上传到存储并只传 URL。

## pSEO 说明

- `/restore/[slug]` 为动态路由，可在 `ALLOWED_SLUGS` 中扩展长尾词与 meta。
- 每个 slug 对应独立 `title`、`description`，便于搜索引擎收录。
- 可后续接入 CMS 或静态列表批量生成更多 pSEO 页面。

## 环境要求

- Node.js 20+
- 有效的 Gemini API Key

## 构建与部署

```bash
npm run build
npm run start
```

可一键部署到 Vercel，并在此项目设置中配置 `GEMINI_API_KEY`。
