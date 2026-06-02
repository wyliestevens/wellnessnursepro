'use client';

import { useEffect, useState } from 'react';

const FONT_OPTIONS = [
  'Lora',
  'Inter',
  'Playfair Display',
  'Merriweather',
  'Open Sans',
  'Roboto',
  'Montserrat',
  'Raleway',
];

const DEFAULT_THEME = {
  primaryColor: '#2d6a4f',
  secondaryColor: '#40916c',
  accentColor: '#95d5b2',
  backgroundColor: '#faf9f6',
  textColor: '#1a1a1a',
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  logoText: 'WellnessNursePro',
  tagline: 'Holistic Health & Wellness',
};

export default function ThemeEditorPage() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchTheme();
  }, []);

  async function fetchTheme() {
    try {
      const res = await fetch('/api/admin/theme');
      const data = await res.json();
      if (res.ok && data.theme) {
        setTheme({ ...DEFAULT_THEME, ...data.theme });
      }
    } catch {
      // use defaults
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      });
      if (res.ok) {
        showToast('Theme saved successfully');
      } else {
        showToast('Failed to save theme');
      }
    } catch {
      showToast('Failed to save theme');
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (!confirm('Reset theme to defaults? Your current settings will be lost.')) return;
    setTheme(DEFAULT_THEME);
    showToast('Theme reset to defaults (save to apply)');
  }

  function updateTheme(key: string, value: string) {
    setTheme((prev) => ({ ...prev, [key]: value }));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d6a4f]"></div>
      </div>
    );
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
          <h1 className="text-2xl font-semibold text-gray-900">Theme Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Customize your site appearance</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition-colors duration-200 text-sm hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#2d6a4f' }}
          >
            {saving ? 'Saving...' : 'Save Theme'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Settings panel */}
        <div className="space-y-6">
          {/* Colors */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Colors</h2>
            <div className="space-y-4">
              {[
                { key: 'primaryColor', label: 'Primary' },
                { key: 'secondaryColor', label: 'Secondary' },
                { key: 'accentColor', label: 'Accent' },
                { key: 'backgroundColor', label: 'Background' },
                { key: 'textColor', label: 'Text' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-4">
                  <input
                    type="color"
                    value={theme[key as keyof typeof theme]}
                    onChange={(e) => updateTheme(key, e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      value={theme[key as keyof typeof theme]}
                      onChange={(e) => updateTheme(key, e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fonts</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
                <select
                  value={theme.headingFont}
                  onChange={(e) => updateTheme('headingFont', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
                <select
                  value={theme.bodyFont}
                  onChange={(e) => updateTheme('bodyFont', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Branding</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
                <input
                  type="text"
                  value={theme.logoText}
                  onChange={(e) => updateTheme('logoText', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={theme.tagline}
                  onChange={(e) => updateTheme('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-6 self-start">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
            <div
              className="rounded-xl overflow-hidden border border-gray-200"
              style={{ backgroundColor: theme.backgroundColor }}
            >
              {/* Preview header */}
              <div className="px-6 py-4" style={{ backgroundColor: theme.primaryColor }}>
                <h3
                  className="text-xl text-white font-bold"
                  style={{ fontFamily: theme.headingFont }}
                >
                  {theme.logoText}
                </h3>
                <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: theme.bodyFont }}>
                  {theme.tagline}
                </p>
              </div>

              {/* Preview content */}
              <div className="px-6 py-6" style={{ color: theme.textColor }}>
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: theme.headingFont, color: theme.primaryColor }}
                >
                  Welcome to Your Site
                </h4>
                <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: theme.bodyFont }}>
                  This is a preview of how your content will look with the selected theme settings.
                  The colors, fonts, and branding shown here reflect your current choices.
                </p>
                <div className="flex gap-2">
                  <span
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Primary Button
                  </span>
                  <span
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    Secondary
                  </span>
                  <span
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: theme.accentColor,
                      color: theme.textColor,
                    }}
                  >
                    Accent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
