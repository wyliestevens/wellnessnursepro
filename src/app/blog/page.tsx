import { getAllPosts } from '@/lib/blog-data';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Wellness Nurse Pro',
  description:
    'Health and wellness articles rooted in the NEWSTART lifestyle principles. Nutrition, rest, hydration, and natural remedies for vibrant living.',
  openGraph: {
    title: 'Blog — Wellness Nurse Pro',
    description:
      'Health and wellness articles rooted in the NEWSTART lifestyle principles.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">Wellness Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evidence-based health insights rooted in God&apos;s design for
            vibrant living. Explore nutrition, rest, hydration, and natural
            remedies.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--light-green)',
                          color: 'var(--primary-green)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl mb-2 leading-tight">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <time
                      className="text-xs text-gray-400"
                      dateTime={post.publishedAt}
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: 'var(--primary-green)' }}
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
