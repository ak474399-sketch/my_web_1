# SEO 长尾词获客 — 已做优化与后续建议

## 已完成的优化（本次）

### 1. 技术 SEO
- **sitemap.xml**（`app/sitemap.ts`）：自动生成，包含首页、所有 `/restore/[slug]` 工具页、案例、历史、条款、隐私。便于搜索引擎发现和抓取长尾页。
- **robots.txt**（`app/robots.ts`）：允许抓取全站，禁止 `/api/`、`/member/`，并指向 `sitemap.xml`。

### 2. 元数据与分享
- **根 layout**：增加 `openGraph`、`twitter`，利于首页在社交与搜索结果中的展示。
- **每个 restore 工具页**：独立 `title`、`description`、`canonical`、`openGraph`、`twitter`，避免重复内容问题，并利于长尾词对应单页在搜索结果中的点击率。

### 3. 结构化数据
- **FAQPage JSON-LD**：每个 `/restore/[slug]` 页面输出该页 FAQ 的 FAQPage 结构化数据，有机会在搜索结果中展示 FAQ 富媒体片段，提升长尾词曝光和点击。

### 4. 已有基础（你之前就做得好的）
- 每个工具页有独立长尾 **title / description**（如 "Old Photo Restoration Online Free"、"Faded Photo Repair" 等）。
- 每页 **H1 = 核心关键词**，正文与 **FAQ 自然包含长尾表达**。
- **generateStaticParams** 静态生成所有工具页，利于抓取与收录。

---

## 建议你后续做的（按优先级）

### 高优先级
1. **提交 sitemap**
   - 在 [Google Search Console](https://search.google.com/search-console) 添加站点 `https://restorepic.xyz`，在「站点地图」中提交 `https://restorepic.xyz/sitemap.xml`。
   - 可选：在 Bing Webmaster Tools 同样提交 sitemap。

2. **确认 canonical 与索引**
   - 确保线上 `NEXT_PUBLIC_SITE_URL` / `NEXTAUTH_URL` 为 `https://restorepic.xyz`，这样 sitemap 与 canonical 都会指向正确域名。
   - 在 Search Console 中查看「覆盖率 / 网页」是否有不该被索引的路径（如重复参数页）；若有，再在 `robots` 或 meta robots 里微调。

3. **内链从首页/案例到工具页**
   - 首页「工具」区域已有到各工具页的链接，可再在文案或按钮上多用**具体长尾词**做锚文本（如 "Fix faded photos" → `/restore/faded-photo-repair`），而不是全部用 "Restore"。
   - 案例页 `/cases` 在每则案例下可加 1～2 个「推荐工具」链接到对应 `/restore/xxx`，用长尾锚文本。

### 中优先级
4. **为工具页增加 1～2 个 H2 长尾小标题**
   - 在 "How It Works"、FAQ 之间或之下，加小段文字并用 H2 包裹，例如："Free Faded Photo Repair Online"、"How to Restore Old Photos at Home"。保持自然、不堆砌。

5. **图片 SEO**
   - 工具页若有 before/after 示例图，给 `img` 加上有长尾词的 `alt`（如 "Old photo before and after AI restoration"）。
   - 若使用 Next.js Image，确保 `alt` 从 `seo-data` 或 props 传入，每页不重复。

6. **案例页 SEO**
   - `/cases` 的 metadata 目前是中文；若主要做英文长尾，可增加英文版 title/description，或按语言/地区做多版本（后续可再考虑 hreflang）。

### 低优先级 / 长期
7. **博客或「知识」页**
   - 你已有 `knowledge.article0/1/2` 等文案，若做成真实页面（如 `/blog/old-photo-restoration-guide`），每篇围绕 1～2 个长尾主题（如 "how to fix water damaged photos"），并内链到对应 `/restore/xxx`，会持续带来长尾流量。

8. **监控与迭代**
   - 在 Search Console 看「查询」：哪些长尾词已有展示/点击，哪些有展示无点击。
   - 针对高展示低点击的页面，微调 title/description，使其更贴近搜索意图；针对有潜力的长尾词，在对应工具页或新文章中自然覆盖。

---

## 长尾词覆盖情况概览

当前每个工具页已对应明确长尾主题，例如：

| 路径 | 典型长尾意图 |
|------|----------------|
| `/restore/old-photo-restoration` | old photo restoration online free |
| `/restore/faded-photo-repair` | faded photo repair, restore color |
| `/restore/scratch-removal` | photo scratch removal, remove scratches |
| `/restore/black-and-white-photo-colorization` | black and white photo colorization |
| `/restore/blurry-photo-fix` | fix blurry photos online, AI sharpening |
| `/restore/water-damaged-photo-repair` | water damaged photo repair |
| … 等其余 slug | 见 `lib/seo-data.ts` |

sitemap、canonical、Open Graph、FAQ 结构化数据已就绪，有利于这些长尾页被收录并在搜索结果中更好展示。后续重点放在：提交 sitemap、内链优化、少量 H2/alt 补充，以及用 Search Console 数据持续优化标题与描述。
