'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check auth
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.push('/admin');
      })
      .catch(() => router.push('/admin'));
  }, [router]);

  // Auto-generate slug from title
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setSlug(generated);
  }, [title]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage: coverImage || undefined,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create post');
        setSaving(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--secondary-green)' }}
          >
            &larr; Dashboard
          </Link>
          <h1 className="text-2xl">New Blog Post</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900"
              placeholder="Your blog post title"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900 font-mono text-sm"
              placeholder="your-blog-post-slug"
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900 resize-y"
              placeholder="Brief summary of the post"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={16}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900 resize-y font-mono text-sm"
              placeholder="Write your blog post content here. Use ## for headings, **bold** for emphasis, and - for bullet points."
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900"
              placeholder="nutrition, wellness, health"
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Image URL (optional)
            </label>
            <input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent text-gray-900"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              {saving ? 'Publishing...' : 'Publish Post'}
            </button>
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 rounded-lg font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
