'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPageEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [showInNav, setShowInNav] = useState(false);
  const [order, setOrder] = useState(0);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, metaDescription, content, showInNav, order }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create page');
        setSaving(false);
        return;
      }

      router.push('/admin/dashboard/pages');
    } catch {
      setError('Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard/pages"
            className="text-sm font-medium text-[#2d6a4f] hover:underline"
          >
            &larr; Pages
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">New Page</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900"
              placeholder="Page title"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-1">/</span>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900 font-mono text-sm"
                placeholder="page-slug"
              />
            </div>
          </div>

          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900 resize-y"
              placeholder="Brief description for search engines"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content (HTML)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900 resize-y font-mono text-sm"
              placeholder="<h2>Page content here</h2>"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInNav}
                onChange={(e) => setShowInNav(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#2d6a4f] focus:ring-[#2d6a4f]"
              />
              <span className="text-sm font-medium text-gray-700">Show in Navigation</span>
            </label>

            <div className="flex items-center gap-2">
              <label htmlFor="order" className="text-sm font-medium text-gray-700">
                Order
              </label>
              <input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 disabled:opacity-50 hover:opacity-90"
              style={{ backgroundColor: '#2d6a4f' }}
            >
              {saving ? 'Creating...' : 'Create Page'}
            </button>
            <Link
              href="/admin/dashboard/pages"
              className="px-6 py-3 rounded-lg font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
