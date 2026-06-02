'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        router.push('/admin');
        return;
      }
      setEmail(data.email);
      fetchPosts();
    } catch {
      router.push('/admin');
    }
  }

  async function fetchPosts() {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch {
      alert('Failed to delete post');
    }
  }

  async function handleLogout() {
    // Clear cookie by setting expired
    document.cookie =
      'wnp-admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin');
  }

  if (loading) {
    return (
      <section className="section-padding min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl mb-1">Blog Dashboard</h1>
            <p className="text-sm text-gray-500">Signed in as {email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/dashboard/new-post"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-white transition-colors duration-200 text-sm"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              + New Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Posts Table */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-500 mb-4">No blog posts yet.</p>
            <Link
              href="/admin/dashboard/new-post"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200" style={{ backgroundColor: 'var(--light-green)' }}>
                    <th className="px-6 py-4 text-sm font-semibold" style={{ color: 'var(--primary-green)' }}>
                      Title
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold hidden md:table-cell" style={{ color: 'var(--primary-green)' }}>
                      Date
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold hidden lg:table-cell" style={{ color: 'var(--primary-green)' }}>
                      Tags
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-right" style={{ color: 'var(--primary-green)' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: 'var(--light-green)',
                                color: 'var(--primary-green)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/dashboard/edit/${post.id}`}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
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
    </section>
  );
}
