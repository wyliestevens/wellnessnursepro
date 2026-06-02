'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type SitePage = {
  id: string;
  title: string;
  slug: string;
  showInNav: boolean;
  order: number;
  updatedAt: string;
};

export default function PagesManagementPage() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      if (res.ok) {
        setPages(data.pages || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete the "${title}" page? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPages(pages.filter((p) => p.id !== id));
        showToast('Page deleted successfully');
      }
    } catch {
      showToast('Failed to delete page');
    }
  }

  async function toggleNav(page: SitePage) {
    try {
      const res = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...page, showInNav: !page.showInNav }),
      });
      if (res.ok) {
        setPages(pages.map((p) => (p.id === page.id ? { ...p, showInNav: !p.showInNav } : p)));
        showToast(`"${page.title}" ${!page.showInNav ? 'added to' : 'removed from'} navigation`);
      }
    } catch {
      showToast('Failed to update page');
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your site pages</p>
        </div>
        <Link
          href="/admin/dashboard/pages/new"
          className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-white transition-colors duration-200 text-sm hover:opacity-90"
          style={{ backgroundColor: '#2d6a4f' }}
        >
          + New Page
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-4xl mb-4">📄</div>
          <p className="text-gray-500 mb-4">No pages yet.</p>
          <Link
            href="/admin/dashboard/pages/new"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: '#2d6a4f' }}
          >
            Create Your First Page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Order</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">In Nav</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono hidden md:table-cell">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {page.order}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleNav(page)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          page.showInNav ? 'bg-[#2d6a4f]' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            page.showInNav ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/pages/edit/${page.id}`}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
