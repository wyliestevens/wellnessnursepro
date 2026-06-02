'use client';

import { useEffect, useState } from 'react';

type Deployment = {
  uid: string;
  url: string;
  created: string;
  state: string;
  readyState: string;
  isCurrent: boolean;
};

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [rolling, setRolling] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchDeployments();
  }, []);

  async function fetchDeployments() {
    try {
      const res = await fetch('/api/admin/deployments');
      const data = await res.json();
      if (res.ok) {
        setDeployments(data.deployments || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleRollback(uid: string) {
    setRolling(uid);
    setConfirmId(null);

    try {
      const res = await fetch('/api/admin/deployments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deploymentId: uid }),
      });

      if (res.ok) {
        showToast('Rollback initiated. It may take a minute to complete.');
        // Refresh after a short delay
        setTimeout(fetchDeployments, 5000);
      } else {
        const data = await res.json();
        showToast(data.error || 'Rollback failed');
      }
    } catch {
      showToast('Rollback failed');
    } finally {
      setRolling(null);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 5000);
  }

  function getStatusBadge(deployment: Deployment) {
    const state = deployment.readyState || deployment.state;
    if (state === 'READY') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Ready
        </span>
      );
    }
    if (state === 'BUILDING' || state === 'INITIALIZING') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          Building
        </span>
      );
    }
    if (state === 'ERROR') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Error
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        {state}
      </span>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm max-w-sm">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Deployments</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your site versions</p>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
        <div className="flex gap-2 items-start">
          <span className="text-amber-600 text-sm mt-0.5">&#x26A0;</span>
          <p className="text-sm text-amber-800">
            Rolling back will restore a previous version of your site. Any changes made since that deployment will be lost.
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : deployments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-gray-500">No deployments found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deployments.map((dep) => (
            <div
              key={dep.uid}
              className={`bg-white rounded-xl shadow-sm p-5 border ${
                dep.isCurrent ? 'border-[#2d6a4f] ring-1 ring-[#2d6a4f]/20' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {getStatusBadge(dep)}
                    {dep.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2d6a4f] text-white">
                        Production
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-900 font-medium mt-2 truncate">
                    {dep.url}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(dep.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {dep.url && (
                    <a
                      href={`https://${dep.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Visit
                    </a>
                  )}
                  {!dep.isCurrent && (dep.readyState === 'READY' || dep.state === 'READY') && (
                    <>
                      {confirmId === dep.uid ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Are you sure?</span>
                          <button
                            onClick={() => handleRollback(dep.uid)}
                            disabled={rolling === dep.uid}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-50"
                          >
                            {rolling === dep.uid ? 'Rolling back...' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(dep.uid)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          Rollback
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
