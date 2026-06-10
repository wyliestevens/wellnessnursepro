import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-data'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wellnessnursepro.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-06-02',
    },
    {
      url: `${baseUrl}/eight-laws-of-health`,
      lastModified: '2026-06-02',
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-06-10',
    },
  ]

  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    }))
  } catch {
    // Blog posts unavailable during build — use static pages only
  }

  return [...staticPages, ...blogPosts]
}
