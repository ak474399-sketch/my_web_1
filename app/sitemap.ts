import type { MetadataRoute } from "next";
import { ALL_SLUGS } from "@/lib/seo-data";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://restorepic.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/restore`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/history`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const restorePages: MetadataRoute.Sitemap = ALL_SLUGS.map((slug) => ({
    url: `${baseUrl}/restore/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...restorePages];
}
