'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

type MediaItem = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      if (res.ok) {
        setItems(data.files || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          setItems((prev) => [data.file, ...prev]);
        } else {
          showToast(`Failed to upload ${file.name}`);
        }
      } catch {
        showToast(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    showToast(`${fileArray.length} file${fileArray.length > 1 ? 's' : ''} uploaded`);
  }

  async function handleDelete(pathname: string) {
    if (!confirm('Delete this image? This cannot be undone.')) return;

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname }),
      });
      if (res.ok) {
        setItems(items.filter((i) => i.pathname !== pathname));
        showToast('Image deleted');
      }
    } catch {
      showToast('Failed to delete image');
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    showToast('URL copied to clipboard');
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }, []);

  function formatBytes(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} file{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-white transition-colors duration-200 text-sm hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#2d6a4f' }}
        >
          {uploading ? 'Uploading...' : '+ Upload'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-8 transition-colors ${
          dragActive
            ? 'border-[#2d6a4f] bg-emerald-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      >
        <div className="text-3xl mb-2">🖼️</div>
        <p className="text-gray-600 text-sm">Drag and drop images here, or click Upload above</p>
        <p className="text-gray-400 text-xs mt-1">Supports JPG, PNG, GIF, WebP</p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-4xl mb-4">🖼️</div>
          <p className="text-gray-500">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.pathname}
              className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.pathname}
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(item.pathname)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="px-3 py-2">
                <p className="text-xs text-gray-600 truncate">{item.pathname.split('/').pop()}</p>
                <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
