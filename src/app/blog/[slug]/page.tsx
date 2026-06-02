import { getAllPosts, getPostBySlug } from '@/lib/blog-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found — Wellness Nurse Pro' };
  }
  return {
    title: `${post.title} — Wellness Nurse Pro`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like rendering: convert ## headings, **bold**, and line breaks
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      // Headings
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="text-lg mt-8 mb-3">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl mt-10 mb-4">
            {block.replace('## ', '')}
          </h2>
        );
      }

      // List items
      if (block.includes('\n- ')) {
        const lines = block.split('\n');
        const heading = !lines[0].startsWith('- ') ? lines.shift() : null;
        return (
          <div key={i}>
            {heading && <p className="mb-2">{heading}</p>}
            <ul className="list-disc list-inside space-y-1.5 ml-4 mb-4">
              {lines
                .filter((l) => l.startsWith('- '))
                .map((line, j) => (
                  <li
                    key={j}
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace('- ', '')
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-[var(--primary-green)]">$1</strong>'
                        ),
                    }}
                  />
                ))}
            </ul>
          </div>
        );
      }

      // Numbered list
      if (/^\d+\.\s/.test(block.split('\n')[0])) {
        const lines = block.split('\n').filter((l) => /^\d+\.\s/.test(l));
        return (
          <ol key={i} className="list-decimal list-inside space-y-1.5 ml-4 mb-4">
            {lines.map((line, j) => (
              <li
                key={j}
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/^\d+\.\s/, '')
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-[var(--primary-green)]">$1</strong>'
                    ),
                }}
              />
            ))}
          </ol>
        );
      }

      // Regular paragraph
      return (
        <p
          key={i}
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{
            __html: block.replace(
              /\*\*(.*?)\*\*/g,
              '<strong>$1</strong>'
            ),
          }}
        />
      );
    });
  };

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium mb-8 hover:underline"
          style={{ color: 'var(--secondary-green)' }}
        >
          &larr; Back to Blog
        </Link>

        <article>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
            />
          )}

          <div className="flex flex-wrap gap-2 mb-4">
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

          <h1 className="text-3xl md:text-4xl mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
            <span>By {post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <div className="prose-content">{renderContent(post.content)}</div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-colors duration-200"
            style={{ backgroundColor: 'var(--primary-green)' }}
          >
            Read More Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
